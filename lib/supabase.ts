import { createClient } from '@supabase/supabase-js';

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!url || !anonKey) {
  throw new Error(
    'Missing NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY. Set them in .env.local.',
  );
}

export const supabase = createClient(url, anonKey);

export const CAPTURE_BUCKET = 'capture-images';

export type ContentType =
  | 'photo'
  | 'metric'
  | 'customer_quote'
  | 'behind_the_scenes'
  | 'team_milestone'
  | 'industry_observation';

export type ContentPillar = 'one_roof' | 'nearshore' | 'tech' | 'culture';

export type Sensitivity = 'public_ok' | 'anonymize_customer' | 'internal_only';

export type RawMaterialStatus = 'new' | 'used' | 'archived';

export interface ContentRawMaterial {
  id: string;
  created_at: string;
  type: ContentType;
  raw_note: string;
  image_url: string | null;
  pillars: ContentPillar[];
  sensitivity: Sensitivity;
  submitted_by: string | null;
  status: RawMaterialStatus;
}

export const CONTENT_TYPE_LABELS: Record<ContentType, string> = {
  photo: 'Photo',
  metric: 'Metric',
  customer_quote: 'Customer quote',
  behind_the_scenes: 'Behind-the-scenes',
  team_milestone: 'Team milestone',
  industry_observation: 'Industry observation',
};

export const PILLAR_LABELS: Record<ContentPillar, string> = {
  one_roof: 'One-roof',
  nearshore: 'Nearshore',
  tech: 'Tech',
  culture: 'Culture',
};

export const SENSITIVITY_LABELS: Record<Sensitivity, string> = {
  public_ok: 'Public OK',
  anonymize_customer: 'Anonymize customer',
  internal_only: 'Internal only',
};

export const STATUS_LABELS: Record<RawMaterialStatus, string> = {
  new: 'New',
  used: 'Used',
  archived: 'Archived',
};
