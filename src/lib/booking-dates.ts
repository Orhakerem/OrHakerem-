export const BUSINESS_TIME_ZONE = 'Asia/Jerusalem';
export const ISO_DATE_REGEX = /^\d{4}-\d{2}-\d{2}$/;

const DAY_IN_MS = 24 * 60 * 60 * 1000;
const EMPTY_BLOCKED_DATES: readonly string[] = [];

export interface BookingDateRange {
  checkIn: string | null;
  checkOut: string | null;
}

function getDateParts(date: Date, timeZone: string) {
  const parts = new Intl.DateTimeFormat('en-CA', {
    timeZone,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).formatToParts(date);

  return {
    year: parts.find((part) => part.type === 'year')?.value ?? '',
    month: parts.find((part) => part.type === 'month')?.value ?? '',
    day: parts.find((part) => part.type === 'day')?.value ?? '',
  };
}

function formatUtcDate(date: Date) {
  const year = date.getUTCFullYear();
  const month = String(date.getUTCMonth() + 1).padStart(2, '0');
  const day = String(date.getUTCDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
}

export function isIsoDateString(value: string) {
  if (!ISO_DATE_REGEX.test(value)) {
    return false;
  }

  const [year, month, day] = value.split('-').map(Number);
  const candidate = new Date(Date.UTC(year, month - 1, day, 12));

  return formatUtcDate(candidate) === value;
}

export function createDateFromIso(value: string) {
  const [year, month, day] = value.split('-').map(Number);

  return new Date(Date.UTC(year, month - 1, day, 12));
}

export function toIsoDateString(date: Date, timeZone = BUSINESS_TIME_ZONE) {
  const { year, month, day } = getDateParts(date, timeZone);

  return `${year}-${month}-${day}`;
}

export function formatIsoDate(value: string, locale = 'en-US', timeZone = BUSINESS_TIME_ZONE) {
  return new Intl.DateTimeFormat(locale, {
    timeZone,
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(createDateFromIso(value));
}

export function getTodayIsoInTimeZone(timeZone = BUSINESS_TIME_ZONE) {
  return toIsoDateString(new Date(), timeZone);
}

export function compareIsoDates(left: string, right: string) {
  if (left === right) {
    return 0;
  }

  return left < right ? -1 : 1;
}

export function addNights(value: string, nights: number) {
  const nextDate = new Date(createDateFromIso(value).getTime() + nights * DAY_IN_MS);

  return formatUtcDate(nextDate);
}

export function getNightCount(range: BookingDateRange) {
  if (!range.checkIn || !range.checkOut) {
    return 0;
  }

  const diff = createDateFromIso(range.checkOut).getTime() - createDateFromIso(range.checkIn).getTime();

  return Math.max(0, Math.round(diff / DAY_IN_MS));
}

function normalizeCheckIn(
  value: string | null | undefined,
  todayIso = getTodayIsoInTimeZone(),
) {
  if (!value || !isIsoDateString(value)) {
    return null;
  }

  return compareIsoDates(value, todayIso) >= 0 ? value : null;
}

function normalizeCheckOut(value: string | null | undefined, checkIn: string | null) {
  if (!value || !checkIn || !isIsoDateString(value)) {
    return null;
  }

  return compareIsoDates(value, checkIn) > 0 ? value : null;
}

function isCheckInBlocked(
  value: string,
  blockedDates: readonly string[] = EMPTY_BLOCKED_DATES,
) {
  return blockedDates.includes(value);
}

export function getFirstBlockedDateAfter(
  value: string,
  blockedDates: readonly string[] = EMPTY_BLOCKED_DATES,
) {
  for (const blockedDate of blockedDates) {
    if (compareIsoDates(blockedDate, value) > 0) {
      return blockedDate;
    }
  }

  return null;
}

function clampCheckOutToAvailability(
  checkIn: string,
  checkOut: string | null | undefined,
  blockedDates: readonly string[] = EMPTY_BLOCKED_DATES,
) {
  if (!checkOut || compareIsoDates(checkOut, checkIn) <= 0) {
    return null;
  }

  const firstBlockedDate = getFirstBlockedDateAfter(checkIn, blockedDates);

  if (firstBlockedDate && compareIsoDates(checkOut, firstBlockedDate) > 0) {
    return firstBlockedDate;
  }

  return checkOut;
}

function isBookingRangeAvailable(
  range: BookingDateRange,
  blockedDates: readonly string[] = EMPTY_BLOCKED_DATES,
) {
  if (!range.checkIn || !range.checkOut || isCheckInBlocked(range.checkIn, blockedDates)) {
    return false;
  }

  const firstBlockedDate = getFirstBlockedDateAfter(range.checkIn, blockedDates);

  return firstBlockedDate === null || compareIsoDates(range.checkOut, firstBlockedDate) <= 0;
}

export function sanitizeBookingDateRange(
  checkInValue: string | null | undefined,
  checkOutValue: string | null | undefined,
  todayIso = getTodayIsoInTimeZone(),
  autoSelectCheckOut = false,
  blockedDates: readonly string[] = EMPTY_BLOCKED_DATES,
): BookingDateRange {
  const checkIn = normalizeCheckIn(checkInValue, todayIso);
  const checkOut = normalizeCheckOut(checkOutValue, checkIn);

  if (!checkIn) {
    return { checkIn: null, checkOut: null };
  }

  if (isCheckInBlocked(checkIn, blockedDates)) {
    return { checkIn: null, checkOut: null };
  }

  const availableCheckOut = clampCheckOutToAvailability(checkIn, checkOut, blockedDates);

  if (availableCheckOut) {
    return { checkIn, checkOut: availableCheckOut };
  }

  return {
    checkIn,
    checkOut: autoSelectCheckOut ? addNights(checkIn, 1) : null,
  };
}

export function isValidBookingRange(
  range: BookingDateRange,
  todayIso = getTodayIsoInTimeZone(),
  blockedDates: readonly string[] = EMPTY_BLOCKED_DATES,
) {
  return getBookingDateRangeValidationMessage(range, todayIso, blockedDates) === null;
}

export function getBookingDateRangeValidationMessage(
  range: BookingDateRange,
  todayIso = getTodayIsoInTimeZone(),
  blockedDates: readonly string[] = EMPTY_BLOCKED_DATES,
) {
  if (!range.checkIn || !range.checkOut) {
    return 'Please choose both check-in and check-out dates.';
  }

  if (!isIsoDateString(range.checkIn) || !isIsoDateString(range.checkOut)) {
    return 'Please choose valid check-in and check-out dates.';
  }

  if (compareIsoDates(range.checkIn, todayIso) < 0) {
    return 'Please choose a current or future check-in date.';
  }

  if (compareIsoDates(range.checkOut, range.checkIn) <= 0) {
    return 'Check-out must be after check-in.';
  }

  if (!isBookingRangeAvailable(range, blockedDates)) {
    return 'Those dates are unavailable on Airbnb. Please choose different dates.';
  }

  return null;
}
