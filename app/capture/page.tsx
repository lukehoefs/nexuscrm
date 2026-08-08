'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  AlertCircle,
  CheckCircle2,
  Filter,
  Image as ImageIcon,
  Loader2,
  Plus,
  Send,
  X,
} from 'lucide-react';
import AppShell from '@/components/AppShell';
import {
  CAPTURE_BUCKET,
  CONTENT_TYPE_LABELS,
  PILLAR_LABELS,
  SENSITIVITY_LABELS,
  STATUS_LABELS,
  supabase,
  type ContentPillar,
  type ContentRawMaterial,
  type ContentType,
  type RawMaterialStatus,
  type Sensitivity,
} from '@/lib/supabase';

const TYPE_OPTIONS: ContentType[] = [
  'photo',
  'metric',
  'customer_quote',
  'behind_the_scenes',
  'team_milestone',
  'industry_observation',
];
const PILLAR_OPTIONS: ContentPillar[] = ['one_roof', 'nearshore', 'tech', 'culture'];
const SENSITIVITY_OPTIONS: Sensitivity[] = ['public_ok', 'anonymize_customer', 'internal_only'];
const STATUS_OPTIONS: RawMaterialStatus[] = ['new', 'used', 'archived'];

const STATUS_STYLES: Record<RawMaterialStatus, string> = {
  new: 'bg-accent-blue-light text-accent-blue-primary',
  used: 'bg-brand-gray-100 text-brand-gray-600',
  archived: 'bg-brand-gray-50 text-brand-gray-400',
};

const SENSITIVITY_STYLES: Record<Sensitivity, string> = {
  public_ok: 'text-accent-green',
  anonymize_customer: 'text-accent-amber',
  internal_only: 'text-accent-red',
};

export default function CapturePage() {
  return (
    <AppShell
      activeKey="capture"
      title={<span className="text-brand-gray-900 font-medium">Capture</span>}
    >
      <CaptureView />
    </AppShell>
  );
}

function CaptureView() {
  const [items, setItems] = useState<ContentRawMaterial[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [typeFilter, setTypeFilter] = useState<ContentType | 'all'>('all');
  const [pillarFilter, setPillarFilter] = useState<ContentPillar | 'all'>('all');

  const fetchItems = useCallback(async () => {
    const { data, error } = await supabase
      .from('content_raw_material')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(200);
    if (error) {
      setLoadError(error.message);
      setItems([]);
    } else {
      setLoadError(null);
      setItems((data ?? []) as ContentRawMaterial[]);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    // setState calls inside fetchItems all run after `await`, so the cascading-render concern doesn't apply.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    void fetchItems();
  }, [fetchItems]);

  const filtered = useMemo(() => {
    return items.filter((item) => {
      if (typeFilter !== 'all' && item.type !== typeFilter) return false;
      if (pillarFilter !== 'all' && !item.pillars.includes(pillarFilter)) return false;
      return true;
    });
  }, [items, typeFilter, pillarFilter]);

  return (
    <div className="max-w-[1440px] mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-header font-bold text-brand-gray-900 tracking-tight">
            Capture
          </h1>
          <p className="text-sm text-brand-gray-500 mt-1">
            Raw material from the floor. The drafting agent will only generate posts grounded in
            entries here.
          </p>
        </div>
      </div>

      <CaptureForm onSubmitted={fetchItems} />

      <div className="bg-brand-surface border border-brand-gray-200 rounded-[16px] p-6 shadow-sm">
        <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
          <h2 className="text-lg font-header font-semibold text-brand-gray-900">
            Recent submissions
          </h2>
          <div className="flex items-center gap-2 flex-wrap">
            <Filter className="w-4 h-4 text-brand-gray-400" />
            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value as ContentType | 'all')}
              className="bg-brand-gray-50 border border-brand-gray-200 rounded-lg px-3 py-1.5 text-sm text-brand-gray-900 focus:outline-none focus:border-accent-blue-primary focus:ring-1 focus:ring-accent-blue-primary transition-colors"
            >
              <option value="all">All types</option>
              {TYPE_OPTIONS.map((t) => (
                <option key={t} value={t}>
                  {CONTENT_TYPE_LABELS[t]}
                </option>
              ))}
            </select>
            <select
              value={pillarFilter}
              onChange={(e) => setPillarFilter(e.target.value as ContentPillar | 'all')}
              className="bg-brand-gray-50 border border-brand-gray-200 rounded-lg px-3 py-1.5 text-sm text-brand-gray-900 focus:outline-none focus:border-accent-blue-primary focus:ring-1 focus:ring-accent-blue-primary transition-colors"
            >
              <option value="all">All pillars</option>
              {PILLAR_OPTIONS.map((p) => (
                <option key={p} value={p}>
                  {PILLAR_LABELS[p]}
                </option>
              ))}
            </select>
          </div>
        </div>

        {loadError && (
          <div className="flex items-start gap-3 p-4 mb-4 bg-accent-red/10 border border-accent-red/30 rounded-lg text-sm text-accent-red">
            <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" />
            <div>
              <p className="font-medium">Could not load submissions</p>
              <p className="text-brand-gray-600 mt-1">{loadError}</p>
            </div>
          </div>
        )}

        {loading ? (
          <div className="flex items-center justify-center py-16 text-brand-gray-400">
            <Loader2 className="w-5 h-5 animate-spin" />
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-sm text-brand-gray-500">
              {items.length === 0
                ? 'Nothing captured yet. Drop the first piece of raw material above.'
                : 'No submissions match the current filters.'}
            </p>
          </div>
        ) : (
          <ul className="divide-y divide-brand-gray-100">
            {filtered.map((item) => (
              <SubmissionRow
                key={item.id}
                item={item}
                onStatusChange={(next) =>
                  setItems((prev) =>
                    prev.map((row) => (row.id === item.id ? { ...row, status: next } : row)),
                  )
                }
              />
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

function CaptureForm({ onSubmitted }: { onSubmitted: () => void }) {
  const [type, setType] = useState<ContentType>('behind_the_scenes');
  const [rawNote, setRawNote] = useState('');
  const [pillars, setPillars] = useState<ContentPillar[]>([]);
  const [sensitivity, setSensitivity] = useState<Sensitivity>('public_ok');
  const [submittedBy, setSubmittedBy] = useState('');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const togglePillar = (pillar: ContentPillar) => {
    setPillars((prev) =>
      prev.includes(pillar) ? prev.filter((p) => p !== pillar) : [...prev, pillar],
    );
  };

  const reset = () => {
    setType('behind_the_scenes');
    setRawNote('');
    setPillars([]);
    setSensitivity('public_ok');
    setSubmittedBy('');
    setImageFile(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);

    const trimmed = rawNote.trim();
    if (!trimmed) {
      setError('Raw note is required.');
      return;
    }

    setSubmitting(true);
    try {
      let imageUrl: string | null = null;
      if (imageFile) {
        const ext = imageFile.name.split('.').pop()?.toLowerCase() ?? 'bin';
        const path = `${new Date().toISOString().slice(0, 10)}/${crypto.randomUUID()}.${ext}`;
        const { error: uploadError } = await supabase.storage
          .from(CAPTURE_BUCKET)
          .upload(path, imageFile, { contentType: imageFile.type, upsert: false });
        if (uploadError) throw new Error(`Upload failed: ${uploadError.message}`);
        const { data: pub } = supabase.storage.from(CAPTURE_BUCKET).getPublicUrl(path);
        imageUrl = pub.publicUrl;
      }

      const { error: insertError } = await supabase.from('content_raw_material').insert({
        type,
        raw_note: trimmed,
        image_url: imageUrl,
        pillars,
        sensitivity,
        submitted_by: submittedBy.trim() || null,
      });
      if (insertError) throw new Error(insertError.message);

      reset();
      setSuccess(true);
      onSubmitted();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-brand-surface border border-brand-gray-200 rounded-[16px] p-6 shadow-sm space-y-5"
    >
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-header font-semibold text-brand-gray-900">New entry</h2>
        {success && (
          <div className="flex items-center gap-2 text-sm text-accent-green">
            <CheckCircle2 className="w-4 h-4" />
            Saved
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <Field label="Type">
          <select
            value={type}
            onChange={(e) => setType(e.target.value as ContentType)}
            className="w-full bg-brand-gray-50 border border-brand-gray-200 rounded-lg px-3 py-2 text-sm text-brand-gray-900 focus:outline-none focus:border-accent-blue-primary focus:ring-1 focus:ring-accent-blue-primary transition-colors"
          >
            {TYPE_OPTIONS.map((t) => (
              <option key={t} value={t}>
                {CONTENT_TYPE_LABELS[t]}
              </option>
            ))}
          </select>
        </Field>

        <Field label="Sensitivity">
          <select
            value={sensitivity}
            onChange={(e) => setSensitivity(e.target.value as Sensitivity)}
            className="w-full bg-brand-gray-50 border border-brand-gray-200 rounded-lg px-3 py-2 text-sm text-brand-gray-900 focus:outline-none focus:border-accent-blue-primary focus:ring-1 focus:ring-accent-blue-primary transition-colors"
          >
            {SENSITIVITY_OPTIONS.map((s) => (
              <option key={s} value={s}>
                {SENSITIVITY_LABELS[s]}
              </option>
            ))}
          </select>
        </Field>
      </div>

      <Field label="Raw note" required>
        <textarea
          value={rawNote}
          onChange={(e) => setRawNote(e.target.value)}
          required
          rows={4}
          placeholder="What happened? Plain language. Names, numbers, specifics — the more grounded, the better."
          className="w-full bg-brand-gray-50 border border-brand-gray-200 rounded-lg px-3 py-2 text-sm text-brand-gray-900 placeholder:text-brand-gray-400 focus:outline-none focus:border-accent-blue-primary focus:ring-1 focus:ring-accent-blue-primary transition-colors resize-y"
        />
      </Field>

      <Field label="Pillars">
        <div className="flex flex-wrap gap-2">
          {PILLAR_OPTIONS.map((pillar) => {
            const active = pillars.includes(pillar);
            return (
              <button
                type="button"
                key={pillar}
                onClick={() => togglePillar(pillar)}
                className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-colors ${
                  active
                    ? 'bg-accent-blue-primary text-white border-accent-blue-primary'
                    : 'bg-brand-gray-50 text-brand-gray-600 border-brand-gray-200 hover:border-accent-blue-primary hover:text-accent-blue-primary'
                }`}
              >
                {PILLAR_LABELS[pillar]}
              </button>
            );
          })}
        </div>
      </Field>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <Field label="Image (optional)">
          <ImageInput file={imageFile} onChange={setImageFile} />
        </Field>

        <Field label="Submitted by">
          <input
            type="text"
            value={submittedBy}
            onChange={(e) => setSubmittedBy(e.target.value)}
            placeholder="Your name"
            className="w-full bg-brand-gray-50 border border-brand-gray-200 rounded-lg px-3 py-2 text-sm text-brand-gray-900 placeholder:text-brand-gray-400 focus:outline-none focus:border-accent-blue-primary focus:ring-1 focus:ring-accent-blue-primary transition-colors"
          />
        </Field>
      </div>

      {error && (
        <div className="flex items-start gap-3 p-3 bg-accent-red/10 border border-accent-red/30 rounded-lg text-sm text-accent-red">
          <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      <div className="flex justify-end">
        <button
          type="submit"
          disabled={submitting}
          className="inline-flex items-center gap-2 bg-accent-blue-primary hover:bg-accent-blue-hover text-white text-sm font-semibold rounded-lg px-4 py-2 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {submitting ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <Send className="w-4 h-4" />
          )}
          {submitting ? 'Saving' : 'Save entry'}
        </button>
      </div>
    </form>
  );
}

function Field({
  label,
  required,
  children,
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="block text-xs font-medium uppercase tracking-wider text-brand-gray-500 mb-1.5">
        {label}
        {required && <span className="text-accent-red ml-1">*</span>}
      </span>
      {children}
    </label>
  );
}

function ImageInput({
  file,
  onChange,
}: {
  file: File | null;
  onChange: (f: File | null) => void;
}) {
  if (file) {
    return (
      <div className="flex items-center gap-3 bg-brand-gray-50 border border-brand-gray-200 rounded-lg px-3 py-2">
        <ImageIcon className="w-4 h-4 text-brand-gray-400 shrink-0" />
        <span className="text-sm text-brand-gray-900 truncate flex-1">{file.name}</span>
        <button
          type="button"
          onClick={() => onChange(null)}
          className="text-brand-gray-400 hover:text-brand-gray-900 transition-colors shrink-0"
          aria-label="Remove image"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    );
  }

  return (
    <label className="flex items-center gap-2 bg-brand-gray-50 border border-dashed border-brand-gray-200 rounded-lg px-3 py-2 cursor-pointer hover:border-accent-blue-primary hover:text-accent-blue-primary transition-colors text-sm text-brand-gray-500">
      <Plus className="w-4 h-4" />
      <span>Attach image</span>
      <input
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => onChange(e.target.files?.[0] ?? null)}
      />
    </label>
  );
}

function SubmissionRow({
  item,
  onStatusChange,
}: {
  item: ContentRawMaterial;
  onStatusChange: (next: RawMaterialStatus) => void;
}) {
  const [updating, setUpdating] = useState(false);

  const handleStatusChange = async (next: RawMaterialStatus) => {
    if (next === item.status) return;
    setUpdating(true);
    const previous = item.status;
    onStatusChange(next);
    const { error } = await supabase
      .from('content_raw_material')
      .update({ status: next })
      .eq('id', item.id);
    if (error) {
      onStatusChange(previous);
    }
    setUpdating(false);
  };

  return (
    <li className="py-4 flex gap-4 items-start">
      {item.image_url ? (
        <img
          src={item.image_url}
          alt=""
          className="w-16 h-16 rounded-lg object-cover border border-brand-gray-200 shrink-0"
        />
      ) : (
        <div className="w-16 h-16 rounded-lg bg-brand-gray-50 border border-brand-gray-200 flex items-center justify-center shrink-0">
          <ImageIcon className="w-5 h-5 text-brand-gray-300" />
        </div>
      )}

      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-xs font-semibold uppercase tracking-wider text-brand-gray-500">
            {CONTENT_TYPE_LABELS[item.type]}
          </span>
          <span className={`text-[11px] font-medium ${SENSITIVITY_STYLES[item.sensitivity]}`}>
            {SENSITIVITY_LABELS[item.sensitivity]}
          </span>
          <span className="text-xs text-brand-gray-400">
            {formatRelative(item.created_at)}
            {item.submitted_by && ` · ${item.submitted_by}`}
          </span>
        </div>

        <p className="text-sm text-brand-gray-900 mt-1.5 whitespace-pre-wrap">{item.raw_note}</p>

        {item.pillars.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mt-2">
            {item.pillars.map((pillar) => (
              <span
                key={pillar}
                className="px-2 py-0.5 rounded-full text-[11px] font-medium bg-accent-blue-light text-accent-blue-primary"
              >
                {PILLAR_LABELS[pillar]}
              </span>
            ))}
          </div>
        )}
      </div>

      <div className="shrink-0">
        <select
          value={item.status}
          disabled={updating}
          onChange={(e) => handleStatusChange(e.target.value as RawMaterialStatus)}
          className={`text-xs font-medium rounded-full px-2.5 py-1 border-0 focus:outline-none focus:ring-1 focus:ring-accent-blue-primary cursor-pointer ${STATUS_STYLES[item.status]}`}
        >
          {STATUS_OPTIONS.map((s) => (
            <option key={s} value={s}>
              {STATUS_LABELS[s]}
            </option>
          ))}
        </select>
      </div>
    </li>
  );
}

function formatRelative(iso: string): string {
  const then = new Date(iso).getTime();
  const diffMs = Date.now() - then;
  const min = Math.round(diffMs / 60000);
  if (min < 1) return 'just now';
  if (min < 60) return `${min}m ago`;
  const hr = Math.round(min / 60);
  if (hr < 24) return `${hr}h ago`;
  const day = Math.round(hr / 24);
  if (day < 7) return `${day}d ago`;
  return new Date(iso).toLocaleDateString();
}
