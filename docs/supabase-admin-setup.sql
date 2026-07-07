-- Supabase setup for admin-only pricing adjustments and quote history.
-- Run this in the Supabase SQL editor for the Or Hakerem project.
-- The Next.js server writes with SUPABASE_SECRET_KEY, falling back to
-- SUPABASE_SERVICE_ROLE_KEY. Do not expose either key to the browser.

begin;

create extension if not exists pgcrypto;

create table if not exists public.pricing_adjustment_rules (
  id uuid primary key default gen_random_uuid(),
  listing_id text references public.listings(id) on update cascade on delete cascade,
  name text not null check (length(btrim(name)) > 0),
  rule_type text not null check (
    rule_type in ('last_minute', 'early_booking', 'duration')
  ),
  is_active boolean not null default true,
  priority integer not null default 0,
  adjustment_basis_points integer not null,
  min_days_before_check_in integer check (
    min_days_before_check_in is null
    or min_days_before_check_in >= 0
  ),
  max_days_before_check_in integer check (
    max_days_before_check_in is null
    or max_days_before_check_in >= 0
  ),
  day_type text check (day_type in ('weekday', 'weekend')),
  season_type text check (season_type in ('current', 'low', 'high')),
  starts_on date,
  ends_on date,
  min_nights integer check (min_nights is null or min_nights >= 0),
  max_nights integer check (max_nights is null or max_nights >= 0),
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint pricing_adjustment_rules_days_before_check_in_range_check check (
    min_days_before_check_in is null
    or max_days_before_check_in is null
    or max_days_before_check_in >= min_days_before_check_in
  ),
  constraint pricing_adjustment_rules_date_range_check check (
    starts_on is null
    or ends_on is null
    or ends_on >= starts_on
  ),
  constraint pricing_adjustment_rules_nights_range_check check (
    min_nights is null
    or max_nights is null
    or max_nights >= min_nights
  )
);

create table if not exists public.admin_quote_history (
  id uuid primary key default gen_random_uuid(),
  sent_at timestamptz not null default now(),
  reservation_number text not null,
  customer_email text not null,
  guest_name text not null,
  apartment text not null,
  check_in date,
  check_out date,
  nights integer check (nights is null or nights > 0),
  total_amount numeric(12, 2) not null default 0,
  total_label text not null default '',
  currency_label text not null default 'NIS',
  resend_email_id text,
  send_status text not null default 'sent' check (send_status in ('sent')),
  quote_payload jsonb not null,
  created_at timestamptz not null default now(),
  constraint admin_quote_history_date_range_check check (
    check_in is null
    or check_out is null
    or check_out >= check_in
  )
);

alter table public.admin_quote_history
  add column if not exists quote_status text not null default 'sent',
  add column if not exists source_type text,
  add column if not exists source_id text,
  add column if not exists expires_at timestamptz;

do $$
begin
  if not exists (
    select 1
    from pg_constraint
    where conname = 'admin_quote_history_quote_status_check'
      and conrelid = 'public.admin_quote_history'::regclass
  ) then
    alter table public.admin_quote_history
      add constraint admin_quote_history_quote_status_check
      check (quote_status in ('sent', 'accepted', 'declined', 'expired', 'confirmed'));
  end if;

  if not exists (
    select 1
    from pg_constraint
    where conname = 'admin_quote_history_source_type_check'
      and conrelid = 'public.admin_quote_history'::regclass
  ) then
    alter table public.admin_quote_history
      add constraint admin_quote_history_source_type_check
      check (source_type is null or source_type in ('reservation', 'event_request'));
  end if;
end $$;

create table if not exists public.event_requests (
  id uuid primary key default gen_random_uuid(),
  event_type text not null check (length(btrim(event_type)) > 0),
  event_date date not null,
  guest_count_label text not null default '',
  guest_name text not null check (length(btrim(guest_name)) > 0),
  guest_email text not null check (guest_email ~* '^[^@[:space:]]+@[^@[:space:]]+\.[^@[:space:]]+$'),
  guest_phone text not null default '',
  contact_method text not null default '',
  message text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.admin_request_statuses (
  id uuid primary key default gen_random_uuid(),
  source_type text not null check (source_type in ('reservation', 'event_request')),
  source_id text not null,
  status text not null default 'new' check (
    status in ('new', 'in_progress', 'quote_sent', 'accepted', 'declined', 'expired', 'confirmed')
  ),
  note text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint admin_request_statuses_source_unique unique (source_type, source_id)
);

create or replace function public.set_admin_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists set_pricing_adjustment_rules_updated_at
  on public.pricing_adjustment_rules;

create trigger set_pricing_adjustment_rules_updated_at
before update on public.pricing_adjustment_rules
for each row
execute function public.set_admin_updated_at();

drop trigger if exists set_event_requests_updated_at
  on public.event_requests;

create trigger set_event_requests_updated_at
before update on public.event_requests
for each row
execute function public.set_admin_updated_at();

drop trigger if exists set_admin_request_statuses_updated_at
  on public.admin_request_statuses;

create trigger set_admin_request_statuses_updated_at
before update on public.admin_request_statuses
for each row
execute function public.set_admin_updated_at();

create index if not exists pricing_adjustment_rules_active_lookup_idx
  on public.pricing_adjustment_rules (
    listing_id,
    is_active,
    rule_type,
    starts_on,
    ends_on,
    priority desc
  );

create index if not exists admin_quote_history_sent_at_idx
  on public.admin_quote_history (send_status, sent_at desc);

create index if not exists admin_quote_history_customer_email_idx
  on public.admin_quote_history (customer_email);

create index if not exists admin_quote_history_source_idx
  on public.admin_quote_history (source_type, source_id, sent_at desc);

create index if not exists event_requests_created_at_idx
  on public.event_requests (created_at desc);

create index if not exists event_requests_guest_email_idx
  on public.event_requests (guest_email);

create index if not exists admin_request_statuses_status_idx
  on public.admin_request_statuses (status, updated_at desc);

alter table public.pricing_adjustment_rules enable row level security;
alter table public.admin_quote_history enable row level security;
alter table public.event_requests enable row level security;
alter table public.admin_request_statuses enable row level security;

revoke all on table public.pricing_adjustment_rules from public;
revoke all on table public.pricing_adjustment_rules from anon;
revoke all on table public.pricing_adjustment_rules from authenticated;

revoke all on table public.admin_quote_history from public;
revoke all on table public.admin_quote_history from anon;
revoke all on table public.admin_quote_history from authenticated;

revoke all on table public.event_requests from public;
revoke all on table public.event_requests from anon;
revoke all on table public.event_requests from authenticated;

revoke all on table public.admin_request_statuses from public;
revoke all on table public.admin_request_statuses from anon;
revoke all on table public.admin_request_statuses from authenticated;

grant select on table public.pricing_adjustment_rules to anon;
grant select on table public.pricing_adjustment_rules to authenticated;
grant all on table public.admin_quote_history to service_role;
grant all on table public.event_requests to service_role;
grant all on table public.admin_request_statuses to service_role;

drop policy if exists pricing_adjustment_rules_public_active_select
  on public.pricing_adjustment_rules;

create policy pricing_adjustment_rules_public_active_select
on public.pricing_adjustment_rules
for select
to anon, authenticated
using (is_active = true);

comment on table public.pricing_adjustment_rules is
  'Pricing adjustment rules. Public reads are limited by RLS to active rows; writes use the server admin key.';

comment on table public.admin_quote_history is
  'Admin-only history of successfully sent reservation quotes, including the sent quote payload.';

comment on table public.event_requests is
  'Admin-only public event inquiries captured before a personalized quote is prepared.';

comment on table public.admin_request_statuses is
  'Admin-only status tracker for apartment reservation requests and event inquiries.';

commit;
