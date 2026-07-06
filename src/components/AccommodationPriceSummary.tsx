'use client';

import { useLocale } from '@/i18n/useLocale';
import { bookingMessages, DISPLAY_LOCALE } from '@/i18n/messages/booking';

export interface AccommodationPriceQuote {
  available: true;
  listing_id: string;
  nights: number;
  night_total: number;
  cleaning_fee: number;
  total_price: number;
  currency: string;
}

interface AccommodationPriceSummaryProps {
  nights: number;
  quote: AccommodationPriceQuote | null;
  isLoading?: boolean;
  priceError?: string | null;
  validationError?: string | null;
  className: string;
  totalValueClassName?: string;
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null;
}

export function isAccommodationPriceQuote(value: unknown): value is AccommodationPriceQuote {
  if (!isRecord(value)) {
    return false;
  }

  return (
    value.available === true &&
    typeof value.listing_id === 'string' &&
    typeof value.nights === 'number' &&
    typeof value.night_total === 'number' &&
    typeof value.cleaning_fee === 'number' &&
    typeof value.total_price === 'number' &&
    typeof value.currency === 'string'
  );
}

function formatMoney(value: number, currency: string, displayLocale: string) {
  try {
    return new Intl.NumberFormat(displayLocale, {
      style: 'currency',
      currency,
      maximumFractionDigits: Number.isInteger(value) ? 0 : 2,
    }).format(value);
  } catch {
    return `${value.toLocaleString(displayLocale)} ${currency}`;
  }
}

export default function AccommodationPriceSummary({
  nights,
  quote,
  isLoading = false,
  priceError = null,
  validationError = null,
  className,
  totalValueClassName = 'font-head text-lg font-bold',
}: AccommodationPriceSummaryProps) {
  const locale = useLocale();
  const t = bookingMessages[locale];
  const displayLocale = DISPLAY_LOCALE[locale];

  if (nights <= 0) {
    return null;
  }

  const displayedNights = quote?.nights ?? nights;

  return (
    <div className={className}>
      <div className="flex items-center justify-between gap-4">
        <span className="text-black/70">{t.price.nights}</span>
        <span className="font-semibold text-black">{t.calendar.nightsCount(displayedNights)}</span>
      </div>

      {isLoading ? (
        <p className="mt-3 border-t border-primary/10 pt-3 text-sm text-black/70">
          {t.price.calculating}
        </p>
      ) : null}

      {quote ? (
        <div className="mt-3 space-y-2 border-t border-primary/10 pt-3 text-sm">
          <div className="flex items-center justify-between gap-4 text-black/70">
            <span>{t.price.nightTotal}</span>
            <span className="font-semibold text-black" dir="ltr">
              {formatMoney(quote.night_total, quote.currency, displayLocale)}
            </span>
          </div>

          <div className="flex items-center justify-between gap-4 text-black/70">
            <span>{t.price.cleaningFee}</span>
            <span className="font-semibold text-black" dir="ltr">
              {formatMoney(quote.cleaning_fee, quote.currency, displayLocale)}
            </span>
          </div>

          <div className="flex items-center justify-between gap-4 border-t border-primary/10 pt-2 text-base text-black">
            <span className="font-semibold">{t.price.finalTotal}</span>
            <span className={totalValueClassName} dir="ltr">
              {formatMoney(quote.total_price, quote.currency, displayLocale)}
            </span>
          </div>
        </div>
      ) : null}

      {priceError && !isLoading ? (
        <p className="mt-3 border-t border-primary/10 pt-3 text-sm text-black/70">
          {priceError}
        </p>
      ) : null}

      {validationError ? (
        <p className="mt-3 border-t border-primary/10 pt-3 text-sm font-medium text-red-700">
          {validationError}
        </p>
      ) : null}
    </div>
  );
}
