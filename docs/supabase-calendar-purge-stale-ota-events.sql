-- One-shot cleanup: retire the frozen OTA snapshot from calendar_events.
--
-- Background
-- ----------
-- `syncAdminCalendarSources` used to be wired to a "Sync now" button in the admin calendar.
-- The button was added in 2847682 and removed in dc2aa10 a few hours later, so the action is
-- now dead code with no caller. What it wrote stayed behind: a snapshot of the Airbnb and
-- Booking.com feeds taken on 2026-07-06, never refreshed since.
--
-- Public availability used to union those rows with the live iCal fetch. A union never removes
-- anything, so reservations that were later cancelled on the channel kept blocking the site --
-- 8 phantom nights on cozy-studio (2026-09-03 to 2026-09-10) at the time of the fix. They could
-- not be cleared from the admin either: the delete control and `cancelAdminCalendarEvent` both
-- only accept 'manual' and 'direct' events.
--
-- The application no longer reads OTA rows for availability (see `isInternalCalendarEvent` in
-- src/lib/calendar-rules.ts), so this script is about clearing the misleading rows still shown
-- in /admin/calendar. Run it once in the Supabase SQL editor.
--
-- Rows are marked cancelled rather than deleted: `fetchRows` already filters on
-- `status <> 'cancelled'`, and the history stays auditable.

begin;

-- Preview first: how many rows will be retired, per property and channel.
select property_id, source, count(*) as rows_to_cancel
  from public.calendar_events
 where source in ('airbnb', 'booking', 'vrbo')
   and status <> 'cancelled'
 group by property_id, source
 order by property_id, source;

update public.calendar_events
   set status = 'cancelled'
 where source in ('airbnb', 'booking', 'vrbo')
   and status <> 'cancelled';

-- Expected after the update: zero rows.
select count(*) as remaining_active_ota_rows
  from public.calendar_events
 where source in ('airbnb', 'booking', 'vrbo')
   and status <> 'cancelled';

commit;
