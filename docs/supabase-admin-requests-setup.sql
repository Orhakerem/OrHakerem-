-- Supabase setup for the admin request inbox.
-- Run this whole file in the Supabase SQL editor for the Or Hakerem project.
-- It is safe to run more than once.

begin;

create extension if not exists pgcrypto;

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

create index if not exists admin_quote_history_source_idx
  on public.admin_quote_history (source_type, source_id, sent_at desc);

create index if not exists event_requests_created_at_idx
  on public.event_requests (created_at desc);

create index if not exists event_requests_guest_email_idx
  on public.event_requests (guest_email);

create index if not exists admin_request_statuses_status_idx
  on public.admin_request_statuses (status, updated_at desc);

alter table public.event_requests enable row level security;
alter table public.admin_request_statuses enable row level security;

revoke all on table public.event_requests from public, anon, authenticated;
revoke all on table public.admin_request_statuses from public, anon, authenticated;

grant all on table public.event_requests to service_role;
grant all on table public.admin_request_statuses to service_role;
grant all on table public.admin_quote_history to service_role;

comment on table public.event_requests is
  'Admin-only public event inquiries captured before a personalized quote is prepared.';

comment on table public.admin_request_statuses is
  'Admin-only status tracker for apartment reservation requests and event inquiries.';

commit;

notify pgrst, 'reload schema';
