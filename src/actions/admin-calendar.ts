'use server';

import { revalidatePath } from 'next/cache';
import { ZodError } from 'zod';

import {
  buildCalendarEventRow,
  buildCalendarRuleRow,
  fetchAdminCalendarSnapshot,
  validateAdminCalendarStay,
  type AdminCalendarBlockInput,
  type AdminCalendarRuleInput,
  type AdminCalendarValidationInput,
  type AdminCalendarValidationOutput,
  type AdminPropertyStatusInput,
} from '@/lib/admin-calendar';
import { buildPropertyStatusRow } from '@/lib/admin-calendar-status';
import { getAdminSession } from '@/lib/admin-session';
import { parseIcalEvents } from '@/lib/calendar-ical';
import { getSupabaseAdminClient } from '@/lib/supabase-admin';

type AdminCalendarActionResult =
  | {
      success: true;
      message: string;
    }
  | {
      success: false;
      error: string;
    };

function getActionErrorMessage(error: unknown, fallback: string) {
  if (error instanceof ZodError) {
    return error.issues[0]?.message ?? fallback;
  }

  return error instanceof Error ? error.message : fallback;
}

function assertAdminSession() {
  return getAdminSession();
}

function revalidateAdminCalendar() {
  revalidatePath('/admin');
  revalidatePath('/admin/calendar');
  revalidatePath('/admin/devis');
  for (const locale of ['en', 'fr', 'he']) {
    revalidatePath(`/${locale}/reservation`);
    revalidatePath(`/${locale}/properties`);
    revalidatePath(`/${locale}/events`);
  }
}

function getChannelFromSource(channel: string) {
  if (channel === 'booking' || channel === 'vrbo' || channel === 'airbnb') {
    return channel;
  }

  return 'airbnb';
}

async function fetchCalendarText(icalUrl: string) {
  const response = await fetch(icalUrl, {
    cache: 'no-store',
    headers: {
      Accept: 'text/calendar, text/plain;q=0.9, */*;q=0.1',
      'Accept-Language': 'en-US,en;q=0.9',
      'User-Agent': 'OrHakeremCalendarSync/1.0 (+https://www.orhakerem.com)',
    },
    signal: AbortSignal.timeout(15_000),
  });

  if (!response.ok) {
    throw new Error(`iCal request failed with status ${response.status}`);
  }

  const calendarText = await response.text();

  if (!calendarText.includes('BEGIN:VCALENDAR')) {
    throw new Error('iCal response did not contain a VCALENDAR payload');
  }

  return calendarText;
}

async function updateSourceStatus(
  sourceId: string,
  status: 'ready' | 'stale' | 'error',
  lastError: string | null,
) {
  const now = new Date().toISOString();
  const payload = {
    status,
    last_sync_at: now,
    last_error: lastError,
    ...(status === 'ready' ? { last_success_at: now } : {}),
  };

  await getSupabaseAdminClient()
    .from('calendar_sources')
    .update(payload)
    .eq('id', sourceId);
}

export async function syncAdminCalendarSources(): Promise<AdminCalendarActionResult> {
  if (!assertAdminSession()) {
    return { success: false, error: 'Not authenticated' };
  }

  try {
    const supabase = getSupabaseAdminClient();
    const snapshot = await fetchAdminCalendarSnapshot(supabase);
    let importedCount = 0;

    for (const source of snapshot.sources.filter((candidate) => candidate.isEnabled)) {
      const runStartedAt = new Date().toISOString();

      try {
        const calendarText = await fetchCalendarText(source.icalUrl);
        const events = parseIcalEvents(calendarText);
        const channel = getChannelFromSource(source.channel);
        const rows = events.map((event) => ({
          source_id: source.id.startsWith('default:') ? null : source.id,
          external_uid: event.uid,
          external_hash: `${event.uid}:${event.checkIn}:${event.checkOut}`,
          property_id: source.propertyId,
          source: channel,
          event_type: 'booking',
          status: 'confirmed',
          check_in: event.checkIn,
          check_out: event.checkOut,
          title: event.summary || `${channel} booking`,
          notes: null,
        }));

        if (rows.length > 0 && !source.id.startsWith('default:')) {
          const { error } = await supabase
            .from('calendar_events')
            .upsert(rows, { onConflict: 'source_id,external_uid' });

          if (error) {
            throw new Error(error.message);
          }
        }

        if (!source.id.startsWith('default:')) {
          await updateSourceStatus(source.id, 'ready', null);
          await supabase.from('sync_runs').insert({
            source_id: source.id,
            started_at: runStartedAt,
            finished_at: new Date().toISOString(),
            status: 'ready',
            imported_count: rows.length,
            error: null,
          });
        }

        importedCount += rows.length;
      } catch (error) {
        const message = error instanceof Error ? error.message : 'Unknown sync error';

        if (!source.id.startsWith('default:')) {
          await updateSourceStatus(source.id, 'error', message);
          await supabase.from('sync_runs').insert({
            source_id: source.id,
            started_at: runStartedAt,
            finished_at: new Date().toISOString(),
            status: 'error',
            imported_count: 0,
            error: message,
          });
        }
      }
    }

    revalidateAdminCalendar();

    return {
      success: true,
      message: `Calendar sync complete. Imported ${importedCount} events.`,
    };
  } catch (error) {
    console.error('Admin calendar sync failed:', error);
    return {
      success: false,
      error: getActionErrorMessage(error, 'Failed to sync calendar sources'),
    };
  }
}

export async function saveAdminCalendarBlock(
  input: AdminCalendarBlockInput,
): Promise<AdminCalendarActionResult> {
  if (!assertAdminSession()) {
    return { success: false, error: 'Not authenticated' };
  }

  try {
    const row = buildCalendarEventRow(input);
    const supabase = getSupabaseAdminClient();
    const id = 'id' in row ? row.id : null;
    const payload = { ...row };
    delete payload.id;
    const result = id
      ? await supabase.from('calendar_events').update(payload).eq('id', id)
      : await supabase.from('calendar_events').insert(row);

    if (result.error) {
      throw new Error(result.error.message);
    }

    revalidateAdminCalendar();

    return { success: true, message: 'Calendar block saved.' };
  } catch (error) {
    console.error('Admin calendar block save failed:', error);
    return {
      success: false,
      error: getActionErrorMessage(error, 'Failed to save calendar block'),
    };
  }
}

export async function cancelAdminCalendarEvent(eventId: string): Promise<AdminCalendarActionResult> {
  if (!assertAdminSession()) {
    return { success: false, error: 'Not authenticated' };
  }

  try {
    const { error } = await getSupabaseAdminClient()
      .from('calendar_events')
      .update({ status: 'cancelled' })
      .eq('id', eventId)
      .in('source', ['manual', 'direct']);

    if (error) {
      throw new Error(error.message);
    }

    revalidateAdminCalendar();

    return { success: true, message: 'Calendar event removed.' };
  } catch (error) {
    console.error('Admin calendar event cancel failed:', error);
    return {
      success: false,
      error: getActionErrorMessage(error, 'Failed to remove calendar event'),
    };
  }
}

export async function saveAdminCalendarRule(
  input: AdminCalendarRuleInput,
): Promise<AdminCalendarActionResult> {
  if (!assertAdminSession()) {
    return { success: false, error: 'Not authenticated' };
  }

  try {
    const row = buildCalendarRuleRow(input);
    const id = 'id' in row ? row.id : null;
    const payload = { ...row };
    delete payload.id;
    const result = id
      ? await getSupabaseAdminClient().from('calendar_rules').update(payload).eq('id', id)
      : await getSupabaseAdminClient().from('calendar_rules').insert(row);

    if (result.error) {
      throw new Error(result.error.message);
    }

    revalidateAdminCalendar();

    return { success: true, message: 'Calendar rule saved.' };
  } catch (error) {
    console.error('Admin calendar rule save failed:', error);
    return {
      success: false,
      error: getActionErrorMessage(error, 'Failed to save calendar rule'),
    };
  }
}

export async function saveAdminPropertyStatus(
  input: AdminPropertyStatusInput,
): Promise<AdminCalendarActionResult> {
  if (!assertAdminSession()) {
    return { success: false, error: 'Not authenticated' };
  }

  try {
    const row = buildPropertyStatusRow(input, 'admin');
    const { error } = await getSupabaseAdminClient()
      .from('property_operational_statuses')
      .upsert(row, { onConflict: 'property_id' });

    if (error) {
      throw new Error(error.message);
    }

    revalidateAdminCalendar();

    return { success: true, message: 'Apartment status saved.' };
  } catch (error) {
    console.error('Admin property status save failed:', error);
    return {
      success: false,
      error: getActionErrorMessage(error, 'Failed to save apartment status'),
    };
  }
}

export async function validateAdminCalendarRange(
  input: AdminCalendarValidationInput,
): Promise<AdminCalendarValidationOutput> {
  if (!assertAdminSession()) {
    return {
      available: false,
      severity: 'block',
      reasons: ['Not authenticated'],
      blockingRuleIds: [],
      warnings: [],
      conflictingEventIds: [],
      sourceStatus: 'error',
    };
  }

  const snapshot = await fetchAdminCalendarSnapshot(getSupabaseAdminClient());

  return validateAdminCalendarStay(snapshot, input);
}
