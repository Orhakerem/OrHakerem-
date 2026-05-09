import 'server-only';

import {
  BOOKABLE_PROPERTIES,
  BOOKABLE_PROPERTY_IDS,
  type BookablePropertyId,
  type CalendarSyncStatus,
  type PropertyAvailabilityStatusMap,
  type PropertyBlockedDatesMap,
} from '@/lib/bookable-properties';
import { addNights, compareIsoDates } from '@/lib/booking-dates';

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

function unfoldIcalLines(calendarText: string) {
  const lines = calendarText.split(/\r?\n/);
  const unfoldedLines: string[] = [];

  for (const line of lines) {
    if ((line.startsWith(' ') || line.startsWith('\t')) && unfoldedLines.length > 0) {
      unfoldedLines[unfoldedLines.length - 1] += line.slice(1);
      continue;
    }

    unfoldedLines.push(line);
  }

  return unfoldedLines;
}

function extractIcalPropertyValue(eventLines: readonly string[], propertyName: 'DTSTART' | 'DTEND') {
  const line = eventLines.find(
    (candidateLine) =>
      candidateLine.startsWith(`${propertyName}:`) ||
      candidateLine.startsWith(`${propertyName};`),
  );

  if (!line) {
    return null;
  }

  const separatorIndex = line.indexOf(':');

  return separatorIndex === -1 ? null : line.slice(separatorIndex + 1).trim();
}

function parseIcalDate(value: string | null) {
  if (!value) {
    return null;
  }

  const match = value.match(/^(\d{4})(\d{2})(\d{2})/);

  if (!match) {
    return null;
  }

  return `${match[1]}-${match[2]}-${match[3]}`;
}

function parseBlockedDatesFromCalendar(calendarText: string) {
  const blockedDates = new Set<string>();
  const unfoldedLines = unfoldIcalLines(calendarText);
  let currentEventLines: string[] | null = null;

  for (const line of unfoldedLines) {
    if (line === 'BEGIN:VEVENT') {
      currentEventLines = [];
      continue;
    }

    if (line === 'END:VEVENT') {
      if (currentEventLines) {
        const startDate = parseIcalDate(
          extractIcalPropertyValue(currentEventLines, 'DTSTART'),
        );
        const endDate = parseIcalDate(
          extractIcalPropertyValue(currentEventLines, 'DTEND'),
        );

        if (startDate && endDate && compareIsoDates(startDate, endDate) < 0) {
          for (
            let dateCursor = startDate;
            compareIsoDates(dateCursor, endDate) < 0;
            dateCursor = addNights(dateCursor, 1)
          ) {
            blockedDates.add(dateCursor);
          }
        }
      }

      currentEventLines = null;
      continue;
    }

    currentEventLines?.push(line);
  }

  return Array.from(blockedDates).sort(compareIsoDates);
}

async function refreshPropertyAvailability(propertyId: BookablePropertyId): Promise<PropertyAvailability> {
  const response = await fetch(BOOKABLE_PROPERTIES[propertyId].airbnbIcalUrl, {
    cache: 'no-store',
    headers: {
      Accept: 'text/calendar, text/plain;q=0.9, */*;q=0.1',
    },
    signal: AbortSignal.timeout(FETCH_TIMEOUT_MS),
  });

  if (!response.ok) {
    throw new Error(`Airbnb iCal request failed with status ${response.status}`);
  }

  const calendarText = await response.text();

  return {
    blockedDates: parseBlockedDatesFromCalendar(calendarText),
    fetchedAtIso: new Date().toISOString(),
    status: 'ready',
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
    .catch(() => {
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
