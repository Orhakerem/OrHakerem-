export interface AccommodationPriceQuote {
  available: true;
  listing_id: string;
  nights: number;
  night_total: number;
  cleaning_fee: number;
  total_price: number;
  currency: string;
  nightly_subtotal?: number;
  discount_amount?: number;
  discount_label?: string | null;
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
    typeof value.currency === 'string' &&
    (value.nightly_subtotal === undefined || typeof value.nightly_subtotal === 'number') &&
    (value.discount_amount === undefined || typeof value.discount_amount === 'number') &&
    (
      value.discount_label === undefined ||
      value.discount_label === null ||
      typeof value.discount_label === 'string'
    )
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

function getNightlySubtotal(quote: AccommodationPriceQuote) {
  const discountAmount = Math.max(0, quote.discount_amount ?? 0);

  return quote.nightly_subtotal ?? quote.night_total + discountAmount;
}

export default function AccommodationPriceSummary({
  nights,
  quote,
  isLoading = false,
  priceError = null,
  validationError = null,
  className,
  totalValueClassName = 'font-playfair text-lg font-bold',
}: AccommodationPriceSummaryProps) {
  if (nights <= 0) {
    return null;
  }

  const displayedNights = quote?.nights ?? nights;
  const discountAmount = quote ? Math.max(0, quote.discount_amount ?? 0) : 0;
  const discountLabel =
    discountAmount > 0
      ? quote?.discount_label ?? `Long stay discount for ${displayedNights} nights`
      : 'Long stay discount';

  return (
    <div className={className}>
      <div className="flex items-center justify-between gap-4">
        <span className="text-primary/70">Nights</span>
        <span className="font-semibold text-primary">
          {displayedNights} night{displayedNights === 1 ? '' : 's'}
        </span>
      </div>

      {isLoading ? (
        <p className="mt-3 border-t border-primary/10 pt-3 text-sm text-primary/70">
          Calculating price...
        </p>
      ) : null}

      {quote ? (
        <div className="mt-3 space-y-2 border-t border-primary/10 pt-3 text-sm">
          <div className="flex items-center justify-between gap-4 text-primary/70">
            <span>Nightly subtotal</span>
            <span className="font-semibold text-primary">
              {formatMoney(getNightlySubtotal(quote), quote.currency)}
            </span>
          </div>

          <div className="flex items-center justify-between gap-4 text-primary/70">
            <span>{discountLabel}</span>
            {discountAmount > 0 ? (
              <span className="font-semibold text-primary">
                -{formatMoney(discountAmount, quote.currency)}
              </span>
            ) : (
              <span className="font-medium text-primary/60">Not applied</span>
            )}
          </div>

          <div className="flex items-center justify-between gap-4 text-primary/70">
            <span>Cleaning fee</span>
            <span className="font-semibold text-primary">
              {formatMoney(quote.cleaning_fee, quote.currency)}
            </span>
          </div>

          <div className="flex items-center justify-between gap-4 border-t border-primary/10 pt-2 text-base text-primary">
            <span className="font-semibold">Final total</span>
            <span className={totalValueClassName}>
              {formatMoney(quote.total_price, quote.currency)}
            </span>
          </div>
        </div>
      ) : null}

      {priceError && !isLoading ? (
        <p className="mt-3 border-t border-primary/10 pt-3 text-sm text-primary/70">
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
