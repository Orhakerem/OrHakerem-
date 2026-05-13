import {
  addNights,
  compareIsoDates,
  createDateFromIso,
  isIsoDateString,
} from './booking-dates';

export type PricingNightKind = 'weekday' | 'weekend';

export interface ClassifiedPricingNight {
  date: string;
  kind: PricingNightKind;
}

export interface PricingNightKindCounts {
  total: number;
  weekday: number;
  weekend: number;
}

const PRICING_NIGHT_KIND_BY_DAY = [
  'weekday',
  'weekday',
  'weekday',
  'weekday',
  'weekend',
  'weekend',
  'weekday',
] as const satisfies readonly PricingNightKind[];

function assertIsoDate(value: string, fieldName: string): void {
  if (!isIsoDateString(value)) {
    throw new RangeError(`${fieldName} must be a valid ISO date in YYYY-MM-DD format.`);
  }
}

export function getNightsBetween(checkIn: string, checkOut: string): string[] {
  assertIsoDate(checkIn, 'checkIn');
  assertIsoDate(checkOut, 'checkOut');

  const nights: string[] = [];

  for (
    let dateCursor = checkIn;
    compareIsoDates(dateCursor, checkOut) < 0;
    dateCursor = addNights(dateCursor, 1)
  ) {
    nights.push(dateCursor);
  }

  return nights;
}

export function countNights(checkIn: string, checkOut: string): number {
  return getNightsBetween(checkIn, checkOut).length;
}

export function getPricingNightKind(date: string): PricingNightKind {
  assertIsoDate(date, 'date');

  return PRICING_NIGHT_KIND_BY_DAY[createDateFromIso(date).getUTCDay()];
}

export function isWeekendNight(date: string): boolean {
  return getPricingNightKind(date) === 'weekend';
}

export function isWeekdayNight(date: string): boolean {
  return getPricingNightKind(date) === 'weekday';
}

export function getClassifiedPricingNights(
  checkIn: string,
  checkOut: string,
): ClassifiedPricingNight[] {
  return getNightsBetween(checkIn, checkOut).map((date) => ({
    date,
    kind: getPricingNightKind(date),
  }));
}

export function countPricingNightKinds(checkIn: string, checkOut: string): PricingNightKindCounts {
  const counts: PricingNightKindCounts = {
    total: 0,
    weekday: 0,
    weekend: 0,
  };

  for (const night of getClassifiedPricingNights(checkIn, checkOut)) {
    counts.total += 1;
    counts[night.kind] += 1;
  }

  return counts;
}
