-- Supabase setup for the internal admin multi-calendar.
-- Run this in the Supabase SQL editor for the Or Hakerem project.
-- These tables are internal only. Do not expose writeback/export endpoints.

begin;

create extension if not exists pgcrypto;

create table if not exists public.calendar_sources (
  id uuid primary key default gen_random_uuid(),
  property_id text not null check (property_id in ('penthouse-jacuzzi', 'cozy-studio')),
  channel text not null check (channel in ('airbnb', 'booking', 'vrbo')),
  name text not null check (length(btrim(name)) > 0),
  ical_url text not null check (ical_url ~ '^https://'),
  is_enabled boolean not null default true,
  status text not null default 'ready' check (status in ('ready', 'stale', 'error')),
  last_sync_at timestamptz,
  last_success_at timestamptz,
  last_error text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint calendar_sources_property_channel_url_unique unique (property_id, channel, ical_url)
);

delete from public.calendar_sources duplicate
using public.calendar_sources original
where duplicate.ctid < original.ctid
  and duplicate.property_id = original.property_id
  and duplicate.channel = original.channel
  and duplicate.ical_url = original.ical_url;

do $$
begin
  if not exists (
    select 1
    from pg_constraint
    where conname = 'calendar_sources_property_channel_url_unique'
      and conrelid = 'public.calendar_sources'::regclass
  ) then
    alter table public.calendar_sources
      add constraint calendar_sources_property_channel_url_unique
      unique (property_id, channel, ical_url);
  end if;
end $$;

create table if not exists public.calendar_events (
  id uuid primary key default gen_random_uuid(),
  source_id uuid references public.calendar_sources(id) on update cascade on delete set null,
  external_uid text,
  external_hash text,
  property_id text not null check (property_id in ('penthouse-jacuzzi', 'cozy-studio')),
  source text not null check (source in ('airbnb', 'booking', 'vrbo', 'direct', 'manual')),
  event_type text not null check (
    event_type in ('booking', 'hold', 'manual_block', 'maintenance', 'owner_block', 'private_event')
  ),
  status text not null default 'confirmed' check (status in ('confirmed', 'tentative', 'cancelled')),
  check_in date not null,
  check_out date not null,
  title text not null default '',
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint calendar_events_date_range_check check (check_out > check_in),
  constraint calendar_events_source_uid_unique unique (source_id, external_uid)
);

create table if not exists public.sync_runs (
  id uuid primary key default gen_random_uuid(),
  source_id uuid references public.calendar_sources(id) on update cascade on delete set null,
  started_at timestamptz not null default now(),
  finished_at timestamptz,
  status text not null check (status in ('ready', 'stale', 'error')),
  imported_count integer not null default 0 check (imported_count >= 0),
  error text
);

create table if not exists public.calendar_rules (
  id uuid primary key default gen_random_uuid(),
  property_id text check (property_id in ('penthouse-jacuzzi', 'cozy-studio')),
  rule_type text not null check (
    rule_type in (
      'min_nights',
      'max_nights',
      'allowed_check_in_days',
      'allowed_check_out_days',
      'advance_notice',
      'booking_window',
      'gap_prevention',
      'turnover_buffer',
      'cleaning_buffer',
      'property_combination',
      'manual_exception'
    )
  ),
  name text not null check (length(btrim(name)) > 0),
  is_active boolean not null default true,
  priority integer not null default 0 check (priority >= 0),
  severity text not null default 'block' check (severity in ('allow', 'warn', 'block')),
  starts_on date,
  ends_on date,
  min_nights integer check (min_nights is null or min_nights >= 0),
  max_nights integer check (max_nights is null or max_nights >= 0),
  allowed_check_in_days integer[],
  allowed_check_out_days integer[],
  min_days_before_check_in integer check (
    min_days_before_check_in is null or min_days_before_check_in >= 0
  ),
  max_days_before_check_in integer check (
    max_days_before_check_in is null or max_days_before_check_in >= 0
  ),
  gap_size_nights integer check (gap_size_nights is null or gap_size_nights >= 0),
  buffer_nights integer check (buffer_nights is null or buffer_nights >= 0),
  applies_to_combination boolean not null default false,
  reason text not null default '',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint calendar_rules_date_range_check check (
    starts_on is null or ends_on is null or ends_on >= starts_on
  ),
  constraint calendar_rules_nights_range_check check (
    min_nights is null or max_nights is null or max_nights >= min_nights
  ),
  constraint calendar_rules_lead_time_range_check check (
    min_days_before_check_in is null
    or max_days_before_check_in is null
    or max_days_before_check_in >= min_days_before_check_in
  )
);

create table if not exists public.calendar_conflict_resolutions (
  id uuid primary key default gen_random_uuid(),
  conflict_key text not null unique,
  resolved_at timestamptz not null default now(),
  resolution_note text not null default ''
);

create table if not exists public.property_operational_statuses (
  property_id text primary key check (property_id in ('penthouse-jacuzzi', 'cozy-studio')),
  status text not null default 'clean' check (status in ('clean', 'dirty', 'occupied')),
  note text not null default '',
  updated_by text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create or replace function public.set_calendar_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists set_calendar_sources_updated_at on public.calendar_sources;
create trigger set_calendar_sources_updated_at
before update on public.calendar_sources
for each row execute function public.set_calendar_updated_at();

drop trigger if exists set_calendar_events_updated_at on public.calendar_events;
create trigger set_calendar_events_updated_at
before update on public.calendar_events
for each row execute function public.set_calendar_updated_at();

drop trigger if exists set_calendar_rules_updated_at on public.calendar_rules;
create trigger set_calendar_rules_updated_at
before update on public.calendar_rules
for each row execute function public.set_calendar_updated_at();

drop trigger if exists set_property_operational_statuses_updated_at on public.property_operational_statuses;
create trigger set_property_operational_statuses_updated_at
before update on public.property_operational_statuses
for each row execute function public.set_calendar_updated_at();

create index if not exists calendar_sources_property_idx
  on public.calendar_sources (property_id, is_enabled, status);

create index if not exists calendar_events_property_range_idx
  on public.calendar_events (property_id, status, check_in, check_out);

create index if not exists calendar_events_source_uid_idx
  on public.calendar_events (source_id, external_uid);

create index if not exists calendar_rules_active_lookup_idx
  on public.calendar_rules (property_id, is_active, rule_type, priority desc);

create index if not exists sync_runs_source_started_idx
  on public.sync_runs (source_id, started_at desc);

create index if not exists property_operational_statuses_status_idx
  on public.property_operational_statuses (status, updated_at desc);

alter table public.calendar_sources enable row level security;
alter table public.calendar_events enable row level security;
alter table public.sync_runs enable row level security;
alter table public.calendar_rules enable row level security;
alter table public.calendar_conflict_resolutions enable row level security;
alter table public.property_operational_statuses enable row level security;

revoke all on table public.calendar_sources from public, anon, authenticated;
revoke all on table public.calendar_events from public, anon, authenticated;
revoke all on table public.sync_runs from public, anon, authenticated;
revoke all on table public.calendar_rules from public, anon, authenticated;
revoke all on table public.calendar_conflict_resolutions from public, anon, authenticated;
revoke all on table public.property_operational_statuses from public, anon, authenticated;

grant all on table public.calendar_sources to service_role;
grant all on table public.calendar_events to service_role;
grant all on table public.sync_runs to service_role;
grant all on table public.calendar_rules to service_role;
grant all on table public.calendar_conflict_resolutions to service_role;
grant all on table public.property_operational_statuses to service_role;

insert into public.calendar_sources (property_id, channel, name, ical_url)
values
  (
    'penthouse-jacuzzi',
    'airbnb',
    'Luxury Penthouse Airbnb',
    'https://www.airbnb.fr/calendar/ical/1247678225456455722.ics?t=183619b2f1764ec89198da07de1de912'
  ),
  (
    'penthouse-jacuzzi',
    'booking',
    'Luxury Penthouse Booking',
    'https://ical.booking.com/v1/export?t=a56d0b9d-3637-42e9-8430-f6122fa65ee7'
  ),
  (
    'cozy-studio',
    'airbnb',
    'Spacious & Cosy Apartment Airbnb',
    'https://www.airbnb.fr/calendar/ical/1273005083237819919.ics?t=510782b0f337456babc7c59e9c087978'
  )
on conflict (property_id, channel, ical_url) do nothing;

insert into public.property_operational_statuses (property_id, status, note)
values
  ('penthouse-jacuzzi', 'clean', ''),
  ('cozy-studio', 'clean', '')
on conflict (property_id) do nothing;

comment on table public.calendar_sources is
  'Internal read-only OTA iCal sources for admin calendar sync.';
comment on table public.calendar_events is
  'Internal normalized calendar events, manual blocks, holds, and direct reservations.';
comment on table public.calendar_rules is
  'Internal calendar rule engine configuration. Server-only admin access.';
comment on table public.property_operational_statuses is
  'Internal current housekeeping/operational status per apartment. Server-only admin access.';

commit;

notify pgrst, 'reload schema';
