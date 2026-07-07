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

const CALENDAR_CACHE_TTL_MS = 30 * 60 * 1000;
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

async function getInternalBlockedDates(propertyId: BookablePropertyId) {
  try {
    const { fetchAdminCalendarSnapshot } = await import('./admin-calendar');
    const snapshot = await fetchAdminCalendarSnapshot();

    return snapshot.blockedDatesByProperty[propertyId] ?? [];
  } catch {
    return [];
  }
}

async function refreshPropertyAvailability(propertyId: BookablePropertyId): Promise<PropertyAvailability> {
  const icalUrls = BOOKABLE_PROPERTIES[propertyId].icalUrls;
  const results = await Promise.allSettled(icalUrls.map((url) => fetchBlockedDatesFromUrl(url)));

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
    throw new Error(`All iCal sources failed for ${propertyId}`);
  }

  for (const blockedDate of await getInternalBlockedDates(propertyId)) {
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
    .catch((error) => {
      console.warn(`Airbnb iCal sync failed for ${propertyId}:`, error);

      if (cachedAvailability) {
        return {
          ...cachedAvailability.data,
          status: 'stale',
        } satisfies PropertyAvailability;
      }

      return {
        blockedDates: [],
        fetchedAtIso: null,
        status: 'error',
      } satisfies PropertyAvailability;
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
