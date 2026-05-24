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

function formatMoney(value: number, currency: string) {
  try {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency,
      maximumFractionDigits: Number.isInteger(value) ? 0 : 2,
    }).format(value);
  } catch {
    return `${value.toLocaleString('en-US')} ${currency}`;
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
  if (nights <= 0) {
    return null;
  }

  const displayedNights = quote?.nights ?? nights;

  return (
    <div className={className}>
      <div className="flex items-center justify-between gap-4">
        <span className="text-black/70">Nights</span>
        <span className="font-semibold text-black">
          {displayedNights} night{displayedNights === 1 ? '' : 's'}
        </span>
      </div>

      {isLoading ? (
        <p className="mt-3 border-t border-primary/10 pt-3 text-sm text-black/70">
          Calculating price...
        </p>
      ) : null}

      {quote ? (
        <div className="mt-3 space-y-2 border-t border-primary/10 pt-3 text-sm">
          <div className="flex items-center justify-between gap-4 text-black/70">
            <span>Night total</span>
            <span className="font-semibold text-black">
              {formatMoney(quote.night_total, quote.currency)}
            </span>
          </div>

          <div className="flex items-center justify-between gap-4 text-black/70">
            <span>Cleaning fee</span>
            <span className="font-semibold text-black">
              {formatMoney(quote.cleaning_fee, quote.currency)}
            </span>
          </div>

          <div className="flex items-center justify-between gap-4 border-t border-primary/10 pt-2 text-base text-black">
            <span className="font-semibold">Final total</span>
            <span className={totalValueClassName}>
              {formatMoney(quote.total_price, quote.currency)}
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
