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

alter table public.pricing_adjustment_rules enable row level security;
alter table public.admin_quote_history enable row level security;

revoke all on table public.pricing_adjustment_rules from public;
revoke all on table public.pricing_adjustment_rules from anon;
revoke all on table public.pricing_adjustment_rules from authenticated;

revoke all on table public.admin_quote_history from public;
revoke all on table public.admin_quote_history from anon;
revoke all on table public.admin_quote_history from authenticated;

grant select on table public.pricing_adjustment_rules to anon;
grant select on table public.pricing_adjustment_rules to authenticated;

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

commit;
