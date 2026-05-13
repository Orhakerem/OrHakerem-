'use client';

import { Mail, MessageSquare, Phone, ArrowLeft, Home } from 'lucide-react';
import toast from 'react-hot-toast';

import React, { useEffect, useState } from 'react';

import { useRouter } from 'next/navigation';
import Link from 'next/link';

import { sendEmail } from '@/actions/email';
import BookingRangeCalendar from '@/components/BookingRangeCalendar';
import {
  type BookingDateRange,
  getBookingDateRangeValidationMessage,
  getNightCount,
  getTodayIsoInTimeZone,
  sanitizeBookingDateRange,
} from '@/lib/booking-dates';
import {
  BOOKABLE_PROPERTY_OPTIONS,
  type BookablePropertyId,
  type PropertyAvailabilityStatusMap,
  type PropertyBlockedDatesMap,
  getBookablePropertyListingId,
  getBookablePropertyIdFromLabel,
  getBookablePropertyTitle,
} from '@/lib/bookable-properties';

interface ReservationFormProps {
  initialSearchParams?: { [key: string]: string | string[] | undefined };
  embedded?: boolean;
  showIntro?: boolean;
  availabilityByProperty?: PropertyBlockedDatesMap;
  availabilityStatusByProperty?: PropertyAvailabilityStatusMap;
}

const EMPTY_SEARCH_PARAMS: { [key: string]: string | string[] | undefined } = {};
const EMPTY_BLOCKED_DATES: string[] = [];
const EMPTY_AVAILABILITY_BY_PROPERTY = {
  'penthouse-jacuzzi': EMPTY_BLOCKED_DATES,
  'cozy-studio': EMPTY_BLOCKED_DATES,
} as PropertyBlockedDatesMap;
const EMPTY_AVAILABILITY_STATUS_BY_PROPERTY = {
  'penthouse-jacuzzi': 'ready',
  'cozy-studio': 'ready',
} as PropertyAvailabilityStatusMap;

function getSingleSearchParam(value: string | string[] | undefined) {
  return typeof value === 'string' ? value : value?.[0];
}

function areDateRangesEqual(left: BookingDateRange, right: BookingDateRange) {
  return left.checkIn === right.checkIn && left.checkOut === right.checkOut;
}

interface PriceQuote {
  available: true;
  listing_id: string;
  nights: number;
  night_total: number;
  cleaning_fee: number;
  total_price: number;
  currency: string;
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null;
}

function isPriceQuote(value: unknown): value is PriceQuote {
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

function getPriceErrorMessage(value: unknown) {
  if (!isRecord(value) || !isRecord(value.error)) {
    return 'Unable to calculate price';
  }

  return typeof value.error.message === 'string'
    ? value.error.message
    : 'Unable to calculate price';
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

export default function ReservationForm({
  initialSearchParams = EMPTY_SEARCH_PARAMS,
  embedded = false,
  showIntro = true,
  availabilityByProperty = EMPTY_AVAILABILITY_BY_PROPERTY,
  availabilityStatusByProperty = EMPTY_AVAILABILITY_STATUS_BY_PROPERTY,
}: ReservationFormProps) {
  const router = useRouter();
  const todayIso = getTodayIsoInTimeZone();
  const initialProperty = getSingleSearchParam(initialSearchParams?.property);
  const initialCheckIn = getSingleSearchParam(initialSearchParams?.checkIn);
  const initialCheckOut = getSingleSearchParam(initialSearchParams?.checkOut);
  const initialPropertyId = getBookablePropertyIdFromLabel(initialProperty) ?? '';
  const initialBlockedDates =
    initialPropertyId === ''
      ? EMPTY_BLOCKED_DATES
      : availabilityByProperty[initialPropertyId as BookablePropertyId] ?? EMPTY_BLOCKED_DATES;
  const [propertyId, setPropertyId] = useState<BookablePropertyId | ''>(initialPropertyId);
  const [dateRange, setDateRange] = useState<BookingDateRange>(() =>
    sanitizeBookingDateRange(
      initialCheckIn,
      initialCheckOut,
      todayIso,
      true,
      initialBlockedDates,
    ),
  );
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [contactMethod, setContactMethod] = useState('email');
  const [priceQuote, setPriceQuote] = useState<PriceQuote | null>(null);
  const [priceError, setPriceError] = useState<string | null>(null);
  const [isPriceLoading, setIsPriceLoading] = useState(false);
  const selectedBlockedDates =
    propertyId === ''
      ? EMPTY_BLOCKED_DATES
      : availabilityByProperty[propertyId] ?? EMPTY_BLOCKED_DATES;
  const selectedAvailabilityStatus =
    propertyId === '' ? 'ready' : availabilityStatusByProperty[propertyId] ?? 'ready';
  const propertyTitle = propertyId === '' ? '' : getBookablePropertyTitle(propertyId);
  const selectedListingId =
    propertyId === '' ? '' : getBookablePropertyListingId(propertyId);
  const nights = getNightCount(dateRange);
  const dateValidationMessage = getBookingDateRangeValidationMessage(
    dateRange,
    todayIso,
    selectedBlockedDates,
  );
  const hasValidDateSelection = dateValidationMessage === null;
  const activePriceQuote =
    priceQuote && priceQuote.listing_id === selectedListingId && priceQuote.nights === nights
      ? priceQuote
      : null;

  useEffect(() => {
    setDateRange(
      sanitizeBookingDateRange(
        initialCheckIn,
        initialCheckOut,
        todayIso,
        true,
        initialBlockedDates,
      ),
    );
    setPropertyId(initialPropertyId);
  }, [initialBlockedDates, initialCheckIn, initialCheckOut, initialPropertyId, todayIso]);

  useEffect(() => {
    setDateRange((currentRange) => {
      const nextRange = sanitizeBookingDateRange(
        currentRange.checkIn,
        currentRange.checkOut,
        todayIso,
        true,
        selectedBlockedDates,
      );

      return areDateRangesEqual(currentRange, nextRange) ? currentRange : nextRange;
    });
  }, [selectedBlockedDates, todayIso]);

  useEffect(() => {
    if (
      !selectedListingId ||
      !dateRange.checkIn ||
      !dateRange.checkOut ||
      !hasValidDateSelection
    ) {
      setPriceQuote(null);
      setPriceError(null);
      setIsPriceLoading(false);
      return;
    }

    const controller = new AbortController();

    setPriceQuote(null);
    setPriceError(null);
    setIsPriceLoading(true);

    async function calculatePrice() {
      try {
        const response = await fetch('/api/calculate-price', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            listing_id: selectedListingId,
            check_in: dateRange.checkIn,
            check_out: dateRange.checkOut,
          }),
          signal: controller.signal,
        });
        const payload: unknown = await response.json().catch(() => null);

        if (!response.ok) {
          throw new Error(getPriceErrorMessage(payload));
        }

        if (!isPriceQuote(payload)) {
          throw new Error('Unexpected price response');
        }

        if (payload.listing_id !== selectedListingId || payload.nights !== nights) {
          throw new Error('Unexpected price response');
        }

        setPriceQuote(payload);
      } catch (error) {
        if (controller.signal.aborted || (error instanceof Error && error.name === 'AbortError')) {
          return;
        }

        console.error('Price calculation error:', error);
        setPriceQuote(null);
        setPriceError('Price estimate is temporarily unavailable. Please try again before sending your request.');
      } finally {
        if (!controller.signal.aborted) {
          setIsPriceLoading(false);
        }
      }
    }

    calculatePrice();

    return () => controller.abort();
  }, [
    dateRange.checkIn,
    dateRange.checkOut,
    hasValidDateSelection,
    nights,
    selectedListingId,
  ]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!propertyId) {
      toast.error('Please select a property before choosing your stay.');
      return;
    }

    if (selectedAvailabilityStatus === 'error') {
      toast.error('Airbnb availability is temporarily unavailable. Please try again shortly.');
      return;
    }

    if (!selectedListingId) {
      toast.error('Please select a valid property before sending your request.');
      return;
    }

    if (dateValidationMessage) {
      toast.error(dateValidationMessage);
      return;
    }

    if (isPriceLoading) {
      toast.error('Please wait for the price estimate to finish.');
      return;
    }

    if (priceError) {
      toast.error(priceError);
      return;
    }

    if (!activePriceQuote) {
      toast.error('Please wait for the price estimate before sending your request.');
      return;
    }

    setIsSubmitting(true);

    try {
      const result = await sendEmail(new FormData(e.currentTarget));
      if (result.success) {
        toast.success(result.message || 'Reservation request sent successfully!');
        setIsSuccess(true);
      } else {
        toast.error(result.error || 'Failed to send reservation request');
      }
    } catch (error) {
      console.error('Submission error:', error);
      toast.error('Failed to submit reservation. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    const successCard = (
      <div className="bg-white p-8 rounded-3xl shadow-xl border border-primary/10 text-center">
        <h2 className="font-playfair text-2xl font-bold text-primary mb-4">
          Thank you for your reservation request!
        </h2>
        <p className="text-primary/80 mb-6">
          We&apos;ll contact you via your chosen method within 24 hours.
        </p>
        <button
          onClick={() => router.push(embedded ? '/properties' : '/')}
          className="button-hover-clean bg-secondary text-primary px-6 py-2 rounded-md font-semibold transition"
        >
          {embedded ? 'Back to Properties' : 'Return to Home'}
        </button>
      </div>
    );

    if (embedded) {
      return successCard;
    }

    return (
      <div className="min-h-screen pt-24 pb-20 bg-cream">
        <div className="reservation-container max-w-2xl mx-auto px-4">
          {successCard}
        </div>
      </div>
    );
  }

  const displayedNights = activePriceQuote?.nights ?? nights;
  const formCard = (
    <div
      className={`bg-white rounded-3xl shadow-xl border border-primary/10 ${embedded ? 'p-6 md:p-8' : 'p-8 rounded-lg border-0 shadow-lg'}`}
      data-animate="scale"
    >
      {showIntro ? (
        <>
          {embedded ? (
            <h2 className="font-playfair text-3xl font-bold text-primary mb-2" data-animate="text">
              Reservation Request
            </h2>
          ) : (
            <h1 className="font-playfair text-3xl font-bold text-primary mb-2" data-animate="text">
              Reservation Request
            </h1>
          )}
          <p className="text-primary/80 mb-8" data-animate="fade-up" data-delay="1">
            Your reservation request will be handled by our team. Please provide your contact
            preferences.
          </p>
        </>
      ) : null}

      <form onSubmit={handleSubmit} className="reservation-form space-y-6" data-animate="fade-up" data-delay="2">
        <input type="hidden" name="property" value={propertyTitle} />
        <input type="hidden" name="listing_id" value={selectedListingId} />
        <input type="hidden" name="checkIn" value={dateRange.checkIn ?? ''} />
        <input type="hidden" name="checkOut" value={dateRange.checkOut ?? ''} />
        <input type="hidden" name="guestsCount" value="1" />

        <div>
          <label htmlFor="property" className="block text-sm font-medium text-primary/80 mb-1">
            Property
          </label>
          <select
            id="property"
            value={propertyId}
            onChange={(e) => setPropertyId(e.target.value as BookablePropertyId | '')}
            required
            className="w-full cursor-pointer rounded-md border border-gray-300 bg-white px-4 py-2 transition-colors focus:border-black/15 focus:outline-none focus:ring-2 focus:ring-black/10"
          >
            <option value="" disabled>Select a property</option>
            {BOOKABLE_PROPERTY_OPTIONS.map((propertyOption) => (
              <option key={propertyOption.id} value={propertyOption.id}>
                {propertyOption.title}
              </option>
            ))}
          </select>
        </div>

        <BookingRangeCalendar
          value={dateRange}
          onChange={setDateRange}
          blockedDates={selectedBlockedDates}
          availabilityStatus={selectedAvailabilityStatus}
        />

        {nights > 0 ? (
          <div className="rounded-xl border border-secondary/20 bg-secondary/10 px-4 py-3 text-sm text-primary">
            <div className="flex items-center justify-between gap-4">
              <span className="text-primary/70">Nights</span>
              <span className="font-semibold">
                {displayedNights} night{displayedNights === 1 ? '' : 's'}
              </span>
            </div>

            {isPriceLoading ? (
              <p className="mt-3 border-t border-primary/10 pt-3 text-primary/70">
                Calculating price...
              </p>
            ) : null}

            {activePriceQuote ? (
              <div className="mt-3 space-y-2 border-t border-primary/10 pt-3">
                <div className="flex items-center justify-between gap-4">
                  <span className="text-primary/70">Nightly total</span>
                  <span className="font-semibold">
                    {formatMoney(activePriceQuote.night_total, activePriceQuote.currency)}
                  </span>
                </div>
                <div className="flex items-center justify-between gap-4">
                  <span className="text-primary/70">Cleaning fee</span>
                  <span className="font-semibold">
                    {formatMoney(activePriceQuote.cleaning_fee, activePriceQuote.currency)}
                  </span>
                </div>
                <div className="flex items-center justify-between gap-4 border-t border-primary/10 pt-2 text-base">
                  <span className="font-semibold">Final total</span>
                  <span className="font-playfair text-lg font-bold">
                    {formatMoney(activePriceQuote.total_price, activePriceQuote.currency)}
                  </span>
                </div>
              </div>
            ) : null}

            {priceError && !isPriceLoading ? (
              <p className="mt-3 border-t border-primary/10 pt-3 text-primary/70">
                {priceError}
              </p>
            ) : null}
          </div>
        ) : null}

        <div>
          <label htmlFor="name" className="block text-sm font-medium text-primary/80 mb-1">
            Full Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md"
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-primary/80 mb-1">
            Email Address
          </label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-primary/60" />
            <input
              type="email"
              id="email"
              name="email"
              required
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md"
            />
          </div>
        </div>

        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-primary/80 mb-1">
            Phone Number
          </label>
          <div className="relative">
            <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-primary/60" />
            <input
              type="tel"
              id="phone"
              name="phone"
              required
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md"
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-primary/80 mb-3">
            <span>Preferred Contact Method</span>
          </label>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <label className={`tap-reset relative flex cursor-pointer items-center justify-center rounded-md border p-4 ${contactMethod === 'email' ? 'border-black/10 bg-black/[0.03] shadow-sm' : 'border-gray-200 bg-white'}`}>
              <input
                type="radio"
                name="contactMethod"
                value="email"
                checked={contactMethod === 'email'}
                onChange={(e) => setContactMethod(e.target.value)}
                className="absolute opacity-0"
              />
              <Mail className="h-5 w-5 text-primary" />
              <span className="ml-2 text-primary">Email</span>
            </label>

            <label className={`tap-reset relative flex cursor-pointer items-center justify-center rounded-md border p-4 ${contactMethod === 'phone' ? 'border-black/10 bg-black/[0.03] shadow-sm' : 'border-gray-200 bg-white'}`}>
              <input
                type="radio"
                name="contactMethod"
                value="phone"
                checked={contactMethod === 'phone'}
                onChange={(e) => setContactMethod(e.target.value)}
                className="absolute opacity-0"
              />
              <Phone className="h-5 w-5 text-primary" />
              <span className="ml-2 text-primary">Phone</span>
            </label>

            <label className={`tap-reset relative flex cursor-pointer items-center justify-center rounded-md border p-4 ${contactMethod === 'whatsapp' ? 'border-black/10 bg-black/[0.03] shadow-sm' : 'border-gray-200 bg-white'}`}>
              <input
                type="radio"
                name="contactMethod"
                value="whatsapp"
                checked={contactMethod === 'whatsapp'}
                onChange={(e) => setContactMethod(e.target.value)}
                className="absolute opacity-0"
              />
              <MessageSquare className="h-5 w-5 text-primary" />
              <span className="ml-2 text-primary">WhatsApp</span>
            </label>
          </div>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="button-hover-clean w-full bg-secondary text-primary py-3 rounded-md font-semibold transition disabled:opacity-50"
        >
          <span>
            {isSubmitting ? 'Sending...' : 'Send Request'}
          </span>
        </button>
      </form>
    </div>
  );

  if (embedded) {
    return formCard;
  }

  return (
    <div className="min-h-screen pt-24 pb-20 bg-cream">
      <div className="reservation-container max-w-2xl mx-auto px-4">
        {/* Enhanced Back Navigation */}
        <div className="mb-8" data-animate="fade-right">
          <Link
            href="/"
            className="inline-flex items-center rounded-full border border-primary/20 bg-white/80 px-6 py-3 text-lg font-semibold text-primary shadow-lg transition-all duration-300"
          >
            <div className="relative mr-3">
              <ArrowLeft className="w-5 h-5" />
            </div>
            <Home className="w-5 h-5 mr-2 opacity-70" />
            <span className="relative z-10">Back to Home</span>
          </Link>
        </div>

        {formCard}
      </div>
    </div>
  );
}
