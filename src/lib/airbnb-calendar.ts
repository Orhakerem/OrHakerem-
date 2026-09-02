import 'server-only';

import {
  BOOKABLE_PROPERTIES,
  BOOKABLE_PROPERTY_IDS,
  type BookablePropertyId,
  type CalendarSyncStatus,
  type PropertyAvailabilityStatusMap,
  type PropertyBlockedDatesMap,
} from '@/lib/bookable-properties';
import { compareIsoDates } from '@/lib/booking-dates';
import { parseBlockedDatesFromCalendar } from '@/lib/calendar-ical';
import { getBlockedDatesFromEvents, isInternalCalendarEvent } from '@/lib/calendar-rules';

const CALENDAR_CACHE_TTL_MS = 30 * 60 * 1000;
const CALENDAR_ERROR_CACHE_TTL_MS = 60 * 1000;
const FETCH_TIMEOUT_MS = 15 * 1000;

export interface PropertyAvailability {
  blockedDates: string[];
  fetchedAtIso: string | null;
  status: CalendarSyncStatus;
}

interface CachedPropertyAvailability {
  data: PropertyAvailability;
  expiresAt: number;
}

/**
 * Thrown when every iCal source for a property is unreachable. It carries the internal blocks so
 * the degraded response can still close dates the owner deliberately blocked.
 */
class AllCalendarSourcesFailedError extends Error {
  readonly internalBlockedDates: string[];

  constructor(propertyId: BookablePropertyId, internalBlockedDates: string[]) {
    super(`All iCal sources failed for ${propertyId}`);
    this.name = 'AllCalendarSourcesFailedError';
    this.internalBlockedDates = internalBlockedDates;
  }
}

const availabilityCache = new Map<BookablePropertyId, CachedPropertyAvailability>();
const inflightAvailabilityRequests = new Map<BookablePropertyId, Promise<PropertyAvailability>>();

async function fetchBlockedDatesFromUrl(icalUrl: string) {
  const response = await fetch(icalUrl, {
    cache: 'no-store',
    headers: {
      Accept: 'text/calendar, text/plain;q=0.9, */*;q=0.1',
      'Accept-Language': 'en-US,en;q=0.9',
      'User-Agent': 'OrHakeremCalendarSync/1.0 (+https://www.orhakerem.com)',
    },
    signal: AbortSignal.timeout(FETCH_TIMEOUT_MS),
  });

  if (!response.ok) {
    throw new Error(`iCal request failed with status ${response.status}`);
  }

  const calendarText = await response.text();

  if (!calendarText.includes('BEGIN:VCALENDAR')) {
    throw new Error('iCal response did not contain a VCALENDAR payload');
  }

  return parseBlockedDatesFromCalendar(calendarText);
}

/**
 * Owner-authored blocks only. OTA rows in `calendar_events` are a snapshot of a feed we already
 * fetch live here; merging them back in would resurrect bookings that have since been cancelled.
 */
async function getInternalBlockedDates(propertyId: BookablePropertyId) {
  try {
    const { fetchAdminCalendarSnapshot } = await import('./admin-calendar');
    const snapshot = await fetchAdminCalendarSnapshot();

    return getBlockedDatesFromEvents(snapshot.events.filter(isInternalCalendarEvent), [propertyId]);
  } catch {
    return [];
  }
}

async function refreshPropertyAvailability(propertyId: BookablePropertyId): Promise<PropertyAvailability> {
  const icalUrls = BOOKABLE_PROPERTIES[propertyId].icalUrls;
  const [results, internalBlockedDates] = await Promise.all([
    Promise.allSettled(icalUrls.map((url) => fetchBlockedDatesFromUrl(url))),
    getInternalBlockedDates(propertyId),
  ]);

  const mergedBlockedDates = new Set<string>();
  let hasFailure = false;

  for (const [index, result] of results.entries()) {
    if (result.status === 'fulfilled') {
      for (const blockedDate of result.value) {
        mergedBlockedDates.add(blockedDate);
      }
    } else {
      hasFailure = true;
      console.warn(`iCal sync failed for ${propertyId} (${icalUrls[index]}):`, result.reason);
    }
  }

  if (results.every((result) => result.status === 'rejected')) {
    throw new AllCalendarSourcesFailedError(propertyId, internalBlockedDates);
  }

  for (const blockedDate of internalBlockedDates) {
    mergedBlockedDates.add(blockedDate);
  }

  return {
    blockedDates: Array.from(mergedBlockedDates).sort(compareIsoDates),
    fetchedAtIso: new Date().toISOString(),
    status: hasFailure ? 'stale' : 'ready',
  };
}

export async function getPropertyAvailability(
  propertyId: BookablePropertyId,
): Promise<PropertyAvailability> {
  const now = Date.now();
  const cachedAvailability = availabilityCache.get(propertyId);

  if (cachedAvailability && cachedAvailability.expiresAt > now) {
    return cachedAvailability.data;
  }

  const existingRequest = inflightAvailabilityRequests.get(propertyId);

  if (existingRequest) {
    return existingRequest;
  }

  const request = refreshPropertyAvailability(propertyId)
    .then((availability) => {
      availabilityCache.set(propertyId, {
        data: availability,
        expiresAt: Date.now() + CALENDAR_CACHE_TTL_MS,
      });

      return availability;
    })
    .catch(async (error) => {
      console.warn(`Airbnb iCal sync failed for ${propertyId}:`, error);

      const degradedAvailability: PropertyAvailability = cachedAvailability
        ? { ...cachedAvailability.data, status: 'stale' }
        : {
            blockedDates:
              error instanceof AllCalendarSourcesFailedError
                ? error.internalBlockedDates
                : await getInternalBlockedDates(propertyId),
            fetchedAtIso: null,
            status: 'error',
          };

      // Cache the degraded result briefly so a failing feed cannot make every request pay the
      // full fetch timeout again.
      availabilityCache.set(propertyId, {
        data: degradedAvailability,
        expiresAt: Date.now() + CALENDAR_ERROR_CACHE_TTL_MS,
      });

      return degradedAvailability;
    })
    .finally(() => {
      inflightAvailabilityRequests.delete(propertyId);
    });

  inflightAvailabilityRequests.set(propertyId, request);

  return request;
}

async function getAllPropertyAvailability() {
  const availabilityEntries = await Promise.all(
    BOOKABLE_PROPERTY_IDS.map(async (propertyId) => {
      const availability = await getPropertyAvailability(propertyId);

      return [propertyId, availability] as const;
    }),
  );

  return Object.fromEntries(availabilityEntries) as Record<BookablePropertyId, PropertyAvailability>;
}

export async function getBookablePropertyCalendarSnapshot() {
  const availabilityByProperty = await getAllPropertyAvailability();

  const blockedDatesByProperty = Object.fromEntries(
    BOOKABLE_PROPERTY_IDS.map((propertyId) => [
      propertyId,
      availabilityByProperty[propertyId].blockedDates,
    ]),
  ) as PropertyBlockedDatesMap;

  const availabilityStatusByProperty = Object.fromEntries(
    BOOKABLE_PROPERTY_IDS.map((propertyId) => [
      propertyId,
      availabilityByProperty[propertyId].status,
    ]),
  ) as PropertyAvailabilityStatusMap;

  return {
    blockedDatesByProperty,
    availabilityStatusByProperty,
  };
}
