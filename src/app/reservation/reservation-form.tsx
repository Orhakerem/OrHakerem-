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
  getNightCount,
  getTodayIsoInTimeZone,
  isValidBookingRange,
  sanitizeBookingDateRange,
} from '@/lib/booking-dates';

interface ReservationFormProps {
  initialSearchParams?: { [key: string]: string | string[] | undefined };
  embedded?: boolean;
  showIntro?: boolean;
}

const EMPTY_SEARCH_PARAMS: { [key: string]: string | string[] | undefined } = {};

const PROPERTY_OPTIONS = ['Luxury Penthouse', 'Spacious & Cosy Apartment'] as const;

const LEGACY_PROPERTY_LABELS: Record<string, string> = {
  Penthouse: 'Luxury Penthouse',
  Studio: 'Spacious & Cosy Apartment',
};

function getSingleSearchParam(value: string | string[] | undefined) {
  return typeof value === 'string' ? value : value?.[0];
}

function normalizePropertyLabel(value: string | undefined) {
  if (!value) {
    return '';
  }

  return LEGACY_PROPERTY_LABELS[value] ?? value;
}

export default function ReservationForm({
  initialSearchParams = EMPTY_SEARCH_PARAMS,
  embedded = false,
  showIntro = true,
}: ReservationFormProps) {
  const router = useRouter();
  const todayIso = getTodayIsoInTimeZone();
  const initialProperty = getSingleSearchParam(initialSearchParams?.property);
  const initialCheckIn = getSingleSearchParam(initialSearchParams?.checkIn);
  const initialCheckOut = getSingleSearchParam(initialSearchParams?.checkOut);
  const [propertyTitle, setPropertyTitle] = useState(() =>
    normalizePropertyLabel(initialProperty),
  );
  const [dateRange, setDateRange] = useState<BookingDateRange>(() =>
    sanitizeBookingDateRange(
      initialCheckIn,
      initialCheckOut,
      todayIso,
      true,
    ),
  );
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [contactMethod, setContactMethod] = useState('email');

  useEffect(() => {
    setPropertyTitle(
      normalizePropertyLabel(initialProperty),
    );
    setDateRange(
      sanitizeBookingDateRange(
        initialCheckIn,
        initialCheckOut,
        todayIso,
        true,
      ),
    );
  }, [initialCheckIn, initialCheckOut, initialProperty, todayIso]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!isValidBookingRange(dateRange, todayIso)) {
      toast.error('Please choose a valid stay with a future check-in and a later check-out.');
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

  const nights = getNightCount(dateRange);
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
        <input type="hidden" name="checkIn" value={dateRange.checkIn ?? ''} />
        <input type="hidden" name="checkOut" value={dateRange.checkOut ?? ''} />

        <div>
          <label htmlFor="property" className="block text-sm font-medium text-primary/80 mb-1">
            Property
          </label>
          <select
            id="property"
            name="property"
            value={propertyTitle}
            onChange={(e) => setPropertyTitle(e.target.value)}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md bg-white cursor-pointer focus:outline-none focus:ring-2 focus:ring-secondary/50 focus:border-secondary"
          >
            <option value="" disabled>Select a property</option>
            {PROPERTY_OPTIONS.map((propertyOption) => (
              <option key={propertyOption} value={propertyOption}>
                {propertyOption}
              </option>
            ))}
          </select>
        </div>

        <BookingRangeCalendar value={dateRange} onChange={setDateRange} />

        {nights > 0 ? (
          <div className="rounded-xl border border-secondary/20 bg-secondary/10 px-4 py-3 text-sm text-primary">
            {nights} night{nights === 1 ? '' : 's'} selected.
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
            <span className="transition-colors duration-300 hover:text-secondary">
              Preferred Contact Method
            </span>
          </label>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <label className="relative flex items-center justify-center p-4 border rounded-md cursor-pointer transition-colors hover:border-secondary hover:bg-secondary/5 group">
              <input
                type="radio"
                name="contactMethod"
                value="email"
                checked={contactMethod === 'email'}
                onChange={(e) => setContactMethod(e.target.value)}
                className="absolute opacity-0"
              />
              <Mail
                className={`w-5 h-5 ${contactMethod === 'email' ? 'text-secondary' : 'text-primary'} transition-colors duration-300 group-hover:text-secondary`}
              />
              <span
                className={`ml-2 ${contactMethod === 'email' ? 'text-secondary' : 'text-primary'} transition-colors duration-300 group-hover:text-secondary`}
              >
                Email
              </span>
            </label>

            <label className="relative flex items-center justify-center p-4 border rounded-md cursor-pointer transition-colors hover:border-secondary hover:bg-secondary/5 group">
              <input
                type="radio"
                name="contactMethod"
                value="phone"
                checked={contactMethod === 'phone'}
                onChange={(e) => setContactMethod(e.target.value)}
                className="absolute opacity-0"
              />
              <Phone
                className={`w-5 h-5 ${contactMethod === 'phone' ? 'text-secondary' : 'text-primary'} transition-colors duration-300 group-hover:text-secondary`}
              />
              <span
                className={`ml-2 ${contactMethod === 'phone' ? 'text-secondary' : 'text-primary'} transition-colors duration-300 group-hover:text-secondary`}
              >
                Phone
              </span>
            </label>

            <label className="relative flex items-center justify-center p-4 border rounded-md cursor-pointer transition-colors hover:border-secondary hover:bg-secondary/5 group">
              <input
                type="radio"
                name="contactMethod"
                value="whatsapp"
                checked={contactMethod === 'whatsapp'}
                onChange={(e) => setContactMethod(e.target.value)}
                className="absolute opacity-0"
              />
              <MessageSquare
                className={`w-5 h-5 ${contactMethod === 'whatsapp' ? 'text-secondary' : 'text-primary'} transition-colors duration-300 group-hover:text-secondary`}
              />
              <span
                className={`ml-2 ${contactMethod === 'whatsapp' ? 'text-secondary' : 'text-primary'} transition-colors duration-300 group-hover:text-secondary`}
              >
                WhatsApp
              </span>
            </label>
          </div>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="button-hover-clean w-full bg-secondary text-primary py-3 rounded-md font-semibold transition disabled:opacity-50"
        >
          <span className="transition-colors duration-300 hover:text-primary">
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
          <div className="inline-block relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-full blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <Link
              href="/"
              className="relative inline-flex items-center bg-white/80 backdrop-blur-sm text-primary px-6 py-3 rounded-full font-semibold text-lg hover:bg-white hover:text-secondary transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 border border-primary/20"
            >
              <div className="relative mr-3">
                <ArrowLeft className="w-5 h-5 transition-transform duration-300 group-hover:-translate-x-1" />
                <div className="absolute inset-0 bg-secondary/20 rounded-full scale-0 group-hover:scale-150 transition-transform duration-300"></div>
              </div>
              <Home className="w-5 h-5 mr-2 opacity-70 group-hover:opacity-100 transition-opacity duration-300" />
              <span className="relative z-10">Back to Home</span>
            </Link>
          </div>
        </div>

        {formCard}
      </div>
    </div>
  );
}
