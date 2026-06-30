import {
  createDateFromIso,
  getNightCount,
  isIsoDateString,
  toIsoDateString,
} from './booking-dates';
import { normalizeAdminApartment } from './admin-availability';
import { DEFAULT_RESERVATION_QUOTE, type ReservationQuoteData } from './reservation-quote';

const ADMIN_DATE_PATTERN = /^(\d{1,2})\s*\/\s*(\d{1,2})\s*\/\s*(\d{4})$/;
const SHEKEL_SIGN = '₪';
const REMOVED_QUOTE_FIELDS = new Set(['dueOn', 'securityDeposit', 'senderName', 'vatNote']);

export type AdminQuoteCalculationInput = Partial<ReservationQuoteData> &
  Record<string, unknown> & {
    lineItems?: Array<Partial<ReservationQuoteData['lineItems'][number]> & Record<string, unknown>>;
  };

export interface CalculateAdminQuoteOptions {
  todayIso?: string;
}

export type AdminQuoteCalculationResult = Omit<AdminQuoteCalculationInput, 'lineItems'> &
  Pick<
    ReservationQuoteData,
    | 'issuedOn'
    | 'orderDate'
    | 'nights'
    | 'lineItems'
    | 'subtotal'
    | 'total'
    | 'balanceDue'
    | 'balanceRemaining'
  >;

function formatCurrencyAmount(amount: number) {
  const roundedAmount = Math.round(amount);

  return `${new Intl.NumberFormat('en-US', {
    maximumFractionDigits: 0,
    minimumFractionDigits: 0,
    useGrouping: true,
  }).format(roundedAmount)} ${SHEKEL_SIGN}`;
}

export function formatIsoDateForAdmin(value: string) {
  if (!isIsoDateString(value)) {
    return '';
  }

  const [year, month, day] = value.split('-');

  return `${day} / ${month} / ${year}`;
}

export const formatIsoToAdminDate = formatIsoDateForAdmin;

export function formatDateForAdmin(date: Date) {
  return formatIsoDateForAdmin(toIsoDateString(date));
}

export function parseAdminDateToIso(value: string) {
  const match = value.trim().match(ADMIN_DATE_PATTERN);

  if (!match) {
    return null;
  }

  const [, rawDay, rawMonth, rawYear] = match;
  const isoDate = `${rawYear}-${rawMonth.padStart(2, '0')}-${rawDay.padStart(2, '0')}`;

  return isIsoDateString(isoDate) ? isoDate : null;
}

export function parseCurrencyAmount(value: string) {
  const normalizedValue = value.trim();

  if (!normalizedValue || /included/i.test(normalizedValue)) {
    return 0;
  }

  const firstNumber = normalizedValue.match(/-?\d[\d,]*(?:\.\d+)?/);

  if (!firstNumber) {
    return 0;
  }

  const parsedAmount = Number(firstNumber[0].replace(/,/g, ''));

  return Number.isFinite(parsedAmount) ? parsedAmount : 0;
}

export const parseShekelAmount = parseCurrencyAmount;

export function calculateAdminNights(checkInDate: string, checkOutDate: string) {
  const checkInIso = parseAdminDateToIso(checkInDate);
  const checkOutIso = parseAdminDateToIso(checkOutDate);

  if (!checkInIso || !checkOutIso) {
    return null;
  }

  const nights = getNightCount({ checkIn: checkInIso, checkOut: checkOutIso });

  return nights > 0 ? nights : null;
}

function sanitizeLineItems(lineItems: AdminQuoteCalculationInput['lineItems']) {
  return (lineItems ?? []).map((item) => ({
    description: String(item.description ?? ''),
    unit: String(item.unit ?? ''),
    amount: String(item.amount ?? ''),
  }));
}

function stripRemovedQuoteFields(input: AdminQuoteCalculationInput) {
  const stripped: Record<string, unknown> = {};

  for (const [key, value] of Object.entries(input)) {
    if (!REMOVED_QUOTE_FIELDS.has(key)) {
      stripped[key] = value;
    }
  }

  return stripped;
}

function calculateNightsField(data: AdminQuoteCalculationInput) {
  const nights =
    typeof data.checkInDate === 'string' && typeof data.checkOutDate === 'string'
      ? calculateAdminNights(data.checkInDate, data.checkOutDate)
      : null;

  return nights === null ? String(data.nights ?? '') : String(nights);
}

export function calculateAdminQuoteTotals(data: AdminQuoteCalculationInput) {
  const lineItems = sanitizeLineItems(data.lineItems);
  const totalAmount = lineItems.reduce((sum, item) => sum + parseCurrencyAmount(item.amount), 0);
  const total = formatCurrencyAmount(totalAmount);
  const depositPaidAmount = parseCurrencyAmount(String(data.depositPaid ?? ''));

  return {
    nights: calculateNightsField(data),
    subtotal: total,
    total,
    balanceDue: total,
    balanceRemaining: formatCurrencyAmount(Math.max(totalAmount - depositPaidAmount, 0)),
  } satisfies Pick<
    ReservationQuoteData,
    'nights' | 'subtotal' | 'total' | 'balanceDue' | 'balanceRemaining'
  >;
}

export function calculateAdminQuote(
  input: ReservationQuoteData,
  options?: CalculateAdminQuoteOptions,
): ReservationQuoteData;
export function calculateAdminQuote(
  input: AdminQuoteCalculationInput,
  options?: CalculateAdminQuoteOptions,
): AdminQuoteCalculationResult;
export function calculateAdminQuote(
  input: AdminQuoteCalculationInput,
  options: CalculateAdminQuoteOptions = {},
): AdminQuoteCalculationResult | ReservationQuoteData {
  const today = formatIsoDateForAdmin(options.todayIso ?? toIsoDateString(new Date()));
  const strippedInput = stripRemovedQuoteFields(input);

  return {
    ...strippedInput,
    apartment: normalizeAdminApartment(String(input.apartment ?? DEFAULT_RESERVATION_QUOTE.apartment)),
    issuedOn: String(input.issuedOn || today),
    orderDate: String(input.orderDate || today),
    lineItems: sanitizeLineItems(input.lineItems),
    ...calculateAdminQuoteTotals(input),
  };
}

export function applyAdminQuoteCalculations(data: ReservationQuoteData): ReservationQuoteData {
  return calculateAdminQuote(data) as ReservationQuoteData;
}

export function createInitialAdminQuote(now = new Date()): ReservationQuoteData {
  const today = formatDateForAdmin(now);

  return calculateAdminQuote({
    ...DEFAULT_RESERVATION_QUOTE,
    issuedOn: today,
    orderDate: today,
  }) as ReservationQuoteData;
}

export function createDateFromAdminDate(value: string) {
  const isoDate = parseAdminDateToIso(value);

  return isoDate ? createDateFromIso(isoDate) : undefined;
}
