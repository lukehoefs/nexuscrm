-- Phase 1 of the LinkedIn Content Engine: capture layer.
-- Stores raw operational material from the floor team (photos, quotes, metrics, moments).
-- The posts table is forward-declared so phase 2 (drafting agent) plugs in without a migration.

create type content_type as enum (
  'photo',
  'metric',
  'customer_quote',
  'behind_the_scenes',
  'team_milestone',
  'industry_observation'
);

create type content_pillar as enum (
  'one_roof',
  'nearshore',
  'tech',
  'culture'
);

create type sensitivity as enum (
  'public_ok',
  'anonymize_customer',
  'internal_only'
);

create type raw_material_status as enum (
  'new',
  'used',
  'archived'
);

create type post_status as enum (
  'draft',
  'pending_approval',
  'approved',
  'published',
  'rejected'
);

create table content_raw_material (
  id           uuid primary key default gen_random_uuid(),
  created_at   timestamptz not null default now(),
  type         content_type not null,
  raw_note     text not null check (length(trim(raw_note)) > 0),
  image_url    text,
  pillars      content_pillar[] not null default '{}',
  sensitivity  sensitivity not null default 'public_ok',
  submitted_by text,
  status       raw_material_status not null default 'new'
);

create index content_raw_material_created_at_idx
  on content_raw_material (created_at desc);

create index content_raw_material_type_idx
  on content_raw_material (type);

create index content_raw_material_status_idx
  on content_raw_material (status);

create index content_raw_material_pillars_idx
  on content_raw_material using gin (pillars);

-- Approval is non-negotiable. Status enum exists from day one so nothing
-- can ship without passing through 'approved'.
create table posts (
  id               uuid primary key default gen_random_uuid(),
  created_at       timestamptz not null default now(),
  updated_at       timestamptz not null default now(),
  status           post_status not null default 'draft',
  body             text not null,
  pillars          content_pillar[] not null default '{}',
  source_material  uuid[] not null default '{}',
  approved_at      timestamptz,
  approved_by      text,
  published_at     timestamptz,
  external_post_id text,
  rejection_reason text
);

create index posts_status_created_at_idx
  on posts (status, created_at desc);

create or replace function set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger posts_set_updated_at
  before update on posts
  for each row execute function set_updated_at();

alter table content_raw_material enable row level security;
alter table posts enable row level security;

-- Phase 1 policy: any authenticated dashboard user can read/write everything.
-- Tighten with role-based rules once auth roles exist (e.g. only the
-- submitter and admins can read 'internal_only' rows).
create policy "auth read raw"
  on content_raw_material for select
  to authenticated using (true);

create policy "auth insert raw"
  on content_raw_material for insert
  to authenticated with check (true);

create policy "auth update raw"
  on content_raw_material for update
  to authenticated using (true) with check (true);

create policy "auth read posts"
  on posts for select
  to authenticated using (true);

create policy "auth insert posts"
  on posts for insert
  to authenticated with check (true);

create policy "auth update posts"
  on posts for update
  to authenticated using (true) with check (true);
