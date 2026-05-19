'use client';

import {
  Baby,
  Bath,
  BedDouble,
  Calendar,
  ChevronLeft,
  ChevronRight,
  Coffee,
  Dumbbell,
  Laptop,
  Mail,
  MapPin,
  MessageSquare,
  Phone,
  Shirt,
  Sofa,
  Tv,
  Users,
  Utensils,
  UtensilsCrossed,
  Waves,
  Wifi,
  Wind,
} from 'lucide-react';

import React, { useEffect, useState } from 'react';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

import { sendEmail } from '@/actions/email';
import AccommodationPriceSummary, {
  isAccommodationPriceQuote,
  type AccommodationPriceQuote,
} from '@/components/AccommodationPriceSummary';
import BookingRangeCalendar from '@/components/BookingRangeCalendar';
import LiquidGlassButton from '@/components/LiquidGlassButton';
import RoomGallery from '@/components/RoomGallery';
import {
  type BookingDateRange,
  getBookingDateRangeValidationMessage,
  getNightCount,
  getTodayIsoInTimeZone,
} from '@/lib/booking-dates';
import {
  getBookablePropertyListingId,
  type CalendarSyncStatus,
} from '@/lib/bookable-properties';

interface PropertyDetailsClientProps {
  propertyId: string;
  blockedDates?: readonly string[];
  availabilityStatus?: CalendarSyncStatus;
}

const properties = {
  'penthouse-jacuzzi': {
    title: 'Luxury Penthouse',
    location: 'Kerem HaTeimanim, Tel Aviv',
    description:
      'Luxurious penthouse featuring a private jacuzzi, BBQ area, and breathtaking sea views.',
    longDescription: `This unique penthouse located in the heart of Tel Aviv, just steps from the beach and the Carmel Market.

Perfect for both friendly or family stays equipped with amenities like the jacuzzi and barbecue, and live a unforgettable experience in a special place.

All bedrooms are equipped with a queen size bed, storage cupboards and curtains for total darkness if desired, the large bedroom is equipped with a baby bed. The kitchen is fully equipped; coffee machine, microwave, oven…

The outdoor dining area is perfect for BBQ evenings.

The main feature of this apartment is the terrace, with amenities such as BBQ, jacuzzi and sea views you can be sure to have an unforgettable experience and leave with wonderful memories!`,
    cleaningFee: 650,
    images: [
      '/penthouse/1-jacuzzi-angle.JPEG',
      '/penthouse/salon_angle_1.JPG',
      '/penthouse/3-chambre-master-angle-1.jpg',
      '/penthouse/4-terrasse-ext-coucher-soleil.png',
      '/penthouse/5-cuisine-angle-1.jpg',
      '/penthouse/6-salle-de-bain-douche-angle-2.jpg',
      '/penthouse/7-vue-mer.jpg',
      '/penthouse/salon_angle_2.JPG',
      '/penthouse/8-ext-drone-13.jpg',
      '/penthouse/9-ext-drone-3.jpg',
      '/penthouse/11-espace-repas-angle.JPEG',
      '/penthouse/12-chambre-entre-angle-2.jpg',
      '/penthouse/13-chambre-entrée-angle-1.jpg',
      '/penthouse/14-espace-laverie.jpg',
      '/penthouse/15-douche.jpg',
      '/penthouse/salon_angle_3.JPG',
      '/penthouse/17-chambre-master-angle-2.jpg',
      '/penthouse/18-chambre-master-angle-3.jpg',
      '/penthouse/19-toilette-lavabo-angle-2.jpg',
      '/penthouse/20-toilette-lavabo-angle-1.jpg',
      '/penthouse/21-chambre-fenêtre-angle-3.jpg',
      '/penthouse/22-chambre-fenêtre-angle-1.jpg',
      '/penthouse/23-ext-drone-12.jpg',
      '/penthouse/24-ext-drone-4.jpg',
      '/penthouse/25-ext-drone-10.jpg',
      '/penthouse/26-jacuzzi-angle-2.JPEG',
      '/penthouse/27-chambre-fenêtre-angle-2.jpg',
      '/penthouse/chaises_hautes_angle 1.JPG',
      '/penthouse/chaises_hautes_angle 2.JPG',
    ],
    rooms: [
      {
        name: 'Master Bedroom',
        description: 'Spacious master bedroom with queen size bed and sea views',
        images: [
          { src: '/penthouse/3-chambre-master-angle-1.jpg', alt: 'Master bedroom view 1' },
          { src: '/penthouse/17-chambre-master-angle-2.jpg', alt: 'Master bedroom view 2' },
          { src: '/penthouse/18-chambre-master-angle-3.jpg', alt: 'Master bedroom view 3' },
        ],
      },
      {
        name: 'Second Bedroom',
        description: 'Comfortable bedroom with queen size bed and storage',
        images: [
          { src: '/penthouse/12-chambre-entre-angle-2.jpg', alt: 'Second bedroom view 1' },
          { src: '/penthouse/13-chambre-entrée-angle-1.jpg', alt: 'Second bedroom view 2' },
        ],
      },
      {
        name: 'Third Bedroom',
        description: 'Cozy bedroom with queen size bed and blackout curtains',
        images: [
          { src: '/penthouse/21-chambre-fenêtre-angle-3.jpg', alt: 'Third bedroom view 1' },
          { src: '/penthouse/22-chambre-fenêtre-angle-1.jpg', alt: 'Third bedroom view 2' },
          { src: '/penthouse/27-chambre-fenêtre-angle-2.jpg', alt: 'Third bedroom view 3' },
        ],
      },
      {
        name: 'Living Areas',
        description: 'Bright and spacious living room and dining area',
        images: [
          { src: '/penthouse/salon_angle_1.JPG', alt: 'Living room angle 1' },
          { src: '/penthouse/salon_angle_2.JPG', alt: 'Living room angle 2' },
          { src: '/penthouse/salon_angle_3.JPG', alt: 'Living room angle 3' },
          { src: '/penthouse/11-espace-repas-angle.JPEG', alt: 'Dining area' },
        ],
      },
      {
        name: 'Kitchen',
        description: 'Fully equipped modern kitchen with all amenities',
        images: [{ src: '/penthouse/5-cuisine-angle-1.jpg', alt: 'Kitchen view' }],
      },
      {
        name: 'Bathrooms',
        description: 'Three modern bathrooms with shower and toilet facilities',
        images: [
          { src: '/penthouse/6-salle-de-bain-douche-angle-2.jpg', alt: 'Main bathroom' },
          { src: '/penthouse/15-douche.jpg', alt: 'Shower area' },
          { src: '/penthouse/19-toilette-lavabo-angle-2.jpg', alt: 'Toilet and sink 1' },
          { src: '/penthouse/20-toilette-lavabo-angle-1.jpg', alt: 'Toilet and sink 2' },
          { src: '/penthouse/28-toilette-lavabo-angle-1.jpg', alt: 'Additional toilet 1' },
          { src: '/penthouse/29-toilette-lavabo-angle-2.jpg', alt: 'Additional toilet 2' },
        ],
      },
      {
        name: 'Terrace & Jacuzzi',
        description: 'Private terrace with jacuzzi, BBQ area and sea views',
        images: [
          { src: '/penthouse/1-jacuzzi-angle.JPEG', alt: 'Jacuzzi main view' },
          { src: '/penthouse/26-jacuzzi-angle-2.JPEG', alt: 'Jacuzzi alternative view' },
          { src: '/penthouse/4-terrasse-ext-coucher-soleil.png', alt: 'Terrace sunset view' },
          { src: '/penthouse/7-vue-mer.jpg', alt: 'Sea view from terrace' },
          { src: '/penthouse/chaises_hautes_angle 1.JPG', alt: 'Terrace high chairs angle 1' },
          { src: '/penthouse/chaises_hautes_angle 2.JPG', alt: 'Terrace high chairs angle 2' },
        ],
      },
      {
        name: 'Building & Exterior',
        description: 'Historic building and stunning aerial views',
        images: [
          { src: '/penthouse/8-ext-drone-13.jpg', alt: 'Aerial view 1' },
          { src: '/penthouse/9-ext-drone-3.jpg', alt: 'Aerial view 2' },
          { src: '/penthouse/23-ext-drone-12.jpg', alt: 'Aerial view 3' },
          { src: '/penthouse/24-ext-drone-4.jpg', alt: 'Aerial view 4' },
          { src: '/penthouse/25-ext-drone-10.jpg', alt: 'Aerial view 5' },
        ],
      },
      {
        name: 'Utilities',
        description: 'Laundry area and additional facilities',
        images: [{ src: '/penthouse/14-espace-laverie.jpg', alt: 'Laundry area' }],
      },
    ],
    amenities: [
      { icon: Waves, name: 'Beach Access', description: '2 minutes walk to the beach' },
      { icon: UtensilsCrossed, name: 'BBQ Area', description: 'Outdoor BBQ with all utensils' },
      { icon: Bath, name: 'Jacuzzi', description: 'Private rooftop jacuzzi' },
      { icon: Wind, name: 'Air Conditioning', description: 'Central air throughout' },
      { icon: Coffee, name: 'Coffee Station', description: 'Espresso machine & coffee maker' },
      { icon: Baby, name: 'Family Friendly', description: 'Baby cot and high chair available' },
      { icon: Dumbbell, name: 'Fitness Equipment', description: 'Basic exercise equipment' },
      { icon: Shirt, name: 'Laundry', description: 'Washer/dryer in unit' },
      { icon: Laptop, name: 'Work Space', description: 'Dedicated desk and chair' },
      { icon: Wifi, name: 'High-speed WiFi', description: 'Throughout the property' },
    ],
    maxGuests: 7,
    bedrooms: 3,
    beds: 3,
    baths: 3,
  },
  'cozy-studio': {
    title: 'Spacious & Cosy Apartment',
    location: 'Kerem HaTeimanim, Tel Aviv',
    description: 'Completely renovated studio perfect for short to long term stays.',
    longDescription: `This renovated apartment is perfect for short, medium, and long-term stays. Fully equipped and located 2 minutes walk from the beach, the Shouk Hacarmel and the entrance of Kerem Hateimanim, live a unique experience.

    Enjoy the comfort of this cosy studio apartment in the heart of Tel Aviv ☀️ 

    The apartment is a large room divided into two parts: on one side you'll find the entrance, equipped with an opening sofa, a table with chairs, a TV hanging on the wall and the bathroom just behind it. On the other side you'll find the bed, the wardrobe and the mini-kitchen with everything you need to prepare your meals.

    The studio is located on the 1st floor of a unique building that is described as a historical monument dating from the Ottoman Empire.`,
    cleaningFee: 200,
    images: [
      '/studio/Salon_angle_1.jpg',
      '/studio/lit_angle_1.jpg',
      '/studio/Salon_angle_1_Zoom.jpg',
      '/studio/cuisine_angle_2.jpg',
      '/studio/Salle_de_bain_angle_1.jpg',
      '/studio/Chambre_angle_3.jpg',
      '/studio/Salon_angle_3.jpg',
      '/studio/Salon_angle_2.jpg',
      '/studio/Salle_de_bain_angle_2.jpg',
      '/studio/Chambre_angle_2.jpg',
      '/studio/Chambre_angle_1.jpg',
      '/studio/Cuisine_angle_1.jpg',
      '/studio/Salon_angle_3_Zoom.jpg',
      '/studio/Salle_de_bain_angle_3.jpg',
      '/studio/Salon_angle_4.jpg',
      '/studio/Canape_ouvert_angle_1.jpg',
      '/studio/Canape_ouvert_angle_2.jpg',
    ],
    rooms: [
      {
        name: 'Bedroom',
        description: 'Comfortable sleeping area with storage',
        images: [
          { src: '/studio/Chambre_angle_1.jpg', alt: 'Chambre angle 1' },
          { src: '/studio/Chambre_angle_2.jpg', alt: 'Chambre angle 2' },
          { src: '/studio/Chambre_angle_3.jpg', alt: 'Chambre angle 3' },
          { src: '/studio/lit_angle_1.jpg', alt: 'Lit angle 1' },
        ],
      },
      {
        name: 'Kitchen',
        description: 'Compact kitchen fully equipped for everyday cooking',
        images: [
          { src: '/studio/Cuisine_angle_1.jpg', alt: 'Cuisine angle 1' },
          { src: '/studio/cuisine_angle_2.jpg', alt: 'Cuisine angle 2' },
        ],
      },
      {
        name: 'Living Area',
        description: 'Open plan living space with dining area and lounge seating',
        images: [
          { src: '/studio/Salon_angle_1.jpg', alt: 'Salon angle 1' },
          { src: '/studio/Salon_angle_1_Zoom.jpg', alt: 'Salon angle 1 zoom' },
          { src: '/studio/Salon_angle_2.jpg', alt: 'Salon angle 2' },
          { src: '/studio/Salon_angle_3.jpg', alt: 'Salon angle 3' },
          { src: '/studio/Salon_angle_3_Zoom.jpg', alt: 'Salon angle 3 zoom' },
          { src: '/studio/Salon_angle_4.jpg', alt: 'Salon angle 4' },
        ],
      },
      {
        name: 'Sofa Bed Area',
        description: 'Convertible sofa area near the entrance for additional sleeping space',
        images: [
          { src: '/studio/Canape_ouvert_angle_1.jpg', alt: 'Canape ouvert angle 1' },
          { src: '/studio/Canape_ouvert_angle_2.jpg', alt: 'Canape ouvert angle 2' },
        ],
      },
      {
        name: 'Bathroom',
        description: 'Private bathroom with shower and vanity',
        images: [
          { src: '/studio/Salle_de_bain_angle_1.jpg', alt: 'Salle de bain angle 1' },
          { src: '/studio/Salle_de_bain_angle_2.jpg', alt: 'Salle de bain angle 2' },
          { src: '/studio/Salle_de_bain_angle_3.jpg', alt: 'Salle de bain angle 3' },
        ],
      },
    ],
    amenities: [
      { icon: Waves, name: 'Beach Access', description: '2 minutes to beach' },
      { icon: Wind, name: 'Air Conditioning', description: 'Central air conditioning' },
      { icon: Coffee, name: 'Coffee Setup', description: 'Electric kettle & coffee maker' },
      { icon: UtensilsCrossed, name: 'Mini Kitchen', description: 'Equipped for meal prep' },
      { icon: Tv, name: 'Smart TV', description: 'Wall-mounted TV' },
      { icon: Sofa, name: 'Convertible Sofa', description: 'Additional sleeping space' },
      { icon: BedDouble, name: 'Comfortable Bed', description: 'Quality bedding provided' },
      { icon: Utensils, name: 'Full Amenities', description: 'All essentials provided' },
      { icon: Wifi, name: 'High-speed WiFi', description: 'Throughout the studio' },
    ],
    maxGuests: 4,
    bedrooms: 1,
    beds: 1,
    baths: 1,
  },
};

type PropertyId = keyof typeof properties;

type PriceQuote = AccommodationPriceQuote;

interface PriceQuoteResult {
  key: string;
  quote: PriceQuote;
}

type ContactMethod = 'email' | 'phone' | 'whatsapp';

interface ReservationFormErrors {
  dates?: string;
  price?: string;
  name?: string;
  email?: string;
  phone?: string;
  guestsCount?: string;
  form?: string;
}

function isPropertyId(value: string): value is PropertyId {
  return value in properties;
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null;
}

function getPriceErrorMessage(value: unknown) {
  if (!isRecord(value) || !isRecord(value.error)) {
    return 'Unable to calculate price';
  }

  return typeof value.error.message === 'string'
    ? value.error.message
    : 'Unable to calculate price';
}

function getFormFieldValue(formData: FormData, name: string) {
  return formData.get(name)?.toString().trim() ?? '';
}

function getFirstValidationError(errors: ReservationFormErrors) {
  return (
    errors.form ??
    errors.dates ??
    errors.price ??
    errors.name ??
    errors.email ??
    errors.phone ??
    errors.guestsCount ??
    null
  );
}

export default function PropertyDetailsClient({
  propertyId,
  blockedDates = [],
  availabilityStatus = 'ready',
}: PropertyDetailsClientProps) {
  const router = useRouter();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [dateRange, setDateRange] = useState<BookingDateRange>({
    checkIn: null,
    checkOut: null,
  });
  const [priceQuoteResult, setPriceQuoteResult] = useState<PriceQuoteResult | null>(null);
  const [priceError, setPriceError] = useState<string | null>(null);
  const [isPriceLoading, setIsPriceLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitSuccess, setIsSubmitSuccess] = useState(false);
  const [contactMethod, setContactMethod] = useState<ContactMethod>('email');
  const [formErrors, setFormErrors] = useState<ReservationFormErrors>({});
  const propertyKey = isPropertyId(propertyId) ? propertyId : null;
  const property = propertyKey ? properties[propertyKey] : null;
  const selectedListingId = propertyKey ? getBookablePropertyListingId(propertyKey) : '';
  const selectedNights = getNightCount(dateRange);
  const todayIso = getTodayIsoInTimeZone();
  const dateValidationMessage = getBookingDateRangeValidationMessage(
    dateRange,
    todayIso,
    blockedDates,
  );
  const hasValidDateRange = dateValidationMessage === null;
  const priceRequestKey =
    selectedListingId && dateRange.checkIn && dateRange.checkOut && hasValidDateRange
      ? `${selectedListingId}|${dateRange.checkIn}|${dateRange.checkOut}`
      : '';
  const activePriceQuote =
    priceQuoteResult?.key === priceRequestKey &&
    priceQuoteResult.quote.listing_id === selectedListingId &&
    priceQuoteResult.quote.nights === selectedNights
      ? priceQuoteResult.quote
      : null;
  const propertyPageHeading = (
    <h1
      className={
        property
          ? 'font-playfair text-3xl font-bold text-navy mb-2'
          : 'text-2xl font-bold text-navy mb-4'
      }
    >
      {property ? property.title : 'Property Not Found'}
    </h1>
  );

  useEffect(() => {
    if (!priceRequestKey || !dateRange.checkIn || !dateRange.checkOut || !selectedListingId) {
      setPriceQuoteResult(null);
      setPriceError(null);
      setIsPriceLoading(false);
      return;
    }

    const controller = new AbortController();
    const checkIn = dateRange.checkIn;
    const checkOut = dateRange.checkOut;

    setPriceQuoteResult(null);
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
            check_in: checkIn,
            check_out: checkOut,
          }),
          signal: controller.signal,
        });
        const payload: unknown = await response.json().catch(() => null);

        if (!response.ok) {
          throw new Error(getPriceErrorMessage(payload));
        }

        if (!isAccommodationPriceQuote(payload)) {
          throw new Error('Unexpected price response');
        }

        if (
          `${payload.listing_id}|${checkIn}|${checkOut}` !== priceRequestKey ||
          payload.nights !== selectedNights
        ) {
          throw new Error('Unexpected price response');
        }

        setPriceQuoteResult({
          key: priceRequestKey,
          quote: payload,
        });
      } catch (error) {
        if (controller.signal.aborted || (error instanceof Error && error.name === 'AbortError')) {
          return;
        }

        console.error('Property price calculation error:', error);
        setPriceQuoteResult(null);
        setPriceError('Dynamic price is temporarily unavailable.');
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
    priceRequestKey,
    selectedListingId,
    selectedNights,
  ]);

  if (!property) {
    return (
      <div className="min-h-screen pt-24 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {propertyPageHeading}
          <LiquidGlassButton onClick={() => router.push('/properties')}>
            Back to Properties
          </LiquidGlassButton>
        </div>
      </div>
    );
  }

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % property.images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + property.images.length) % property.images.length);
  };

  const clearFormError = (field: keyof ReservationFormErrors) => {
    setFormErrors((currentErrors) => {
      if (!currentErrors[field]) {
        return currentErrors;
      }

      const nextErrors = { ...currentErrors };
      delete nextErrors[field];
      delete nextErrors.form;
      return nextErrors;
    });
    setIsSubmitSuccess(false);
  };

  const handleDateRangeChange = (nextDateRange: BookingDateRange) => {
    setDateRange(nextDateRange);
    clearFormError('dates');
    clearFormError('price');
  };

  const validateReservationForm = (formData: FormData) => {
    const nextErrors: ReservationFormErrors = {};
    const guestName = getFormFieldValue(formData, 'name');
    const guestEmail = getFormFieldValue(formData, 'email');
    const guestPhone = getFormFieldValue(formData, 'phone');
    const guestsCountValue = getFormFieldValue(formData, 'guestsCount');
    const guestsCount = Number.parseInt(guestsCountValue, 10);

    if (!selectedListingId) {
      nextErrors.form = 'Please select a valid property before sending your request.';
    }

    if (availabilityStatus === 'error') {
      nextErrors.dates = 'Airbnb availability is temporarily unavailable. Please try again shortly.';
    } else if (dateValidationMessage) {
      nextErrors.dates = dateValidationMessage;
    }

    if (!nextErrors.dates) {
      if (isPriceLoading) {
        nextErrors.price = 'Please wait for the price estimate to finish.';
      } else if (priceError) {
        nextErrors.price = priceError;
      } else if (!activePriceQuote) {
        nextErrors.price = 'Please wait for a valid price estimate before sending your request.';
      }
    }

    if (!guestName) {
      nextErrors.name = 'Please enter your full name.';
    }

    if (!guestEmail) {
      nextErrors.email = 'Please enter your email address.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(guestEmail)) {
      nextErrors.email = 'Please enter a valid email address.';
    }

    if (!guestPhone) {
      nextErrors.phone = 'Please enter your phone number.';
    }

    if (!guestsCountValue) {
      nextErrors.guestsCount = 'Please enter the number of guests.';
    } else if (!Number.isInteger(guestsCount) || guestsCount < 1) {
      nextErrors.guestsCount = 'Please enter at least 1 guest.';
    } else if (guestsCount > property.maxGuests) {
      nextErrors.guestsCount = `This property can host up to ${property.maxGuests} guests.`;
    }

    return nextErrors;
  };

  const clearPriceEstimate = () => {
    setPriceQuoteResult(null);
    setPriceError(null);
    setIsPriceLoading(false);
  };

  const handleBookNowSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget;
    const formData = new FormData(form);
    const nextErrors = validateReservationForm(formData);
    const firstError = getFirstValidationError(nextErrors);

    setFormErrors(nextErrors);
    setIsSubmitSuccess(false);

    if (firstError) {
      toast.error(firstError);
      return;
    }

    setIsSubmitting(true);

    try {
      const result = await sendEmail(formData);

      if (result.success) {
        toast.success(result.message || 'Reservation request sent successfully!');
        setIsSubmitSuccess(true);
        form.reset();
        setContactMethod('email');
        setFormErrors({});
      } else {
        const errorMessage = result.error || 'Failed to send reservation request.';
        setFormErrors({ form: errorMessage });
        toast.error(errorMessage);
      }
    } catch (error) {
      console.error('Property reservation submission error:', error);
      const errorMessage = 'Failed to submit reservation. Please try again.';
      setFormErrors({ form: errorMessage });
      toast.error(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  const visibleFormErrors = Object.values(formErrors).filter(
    (errorMessage): errorMessage is string => Boolean(errorMessage),
  );

  const featuredAmenities = property.amenities.slice(0, 4);
  const reservationForm = (
    <form onSubmit={handleBookNowSubmit} noValidate className="space-y-6">
                  <input type="hidden" name="property" value={property.title} />
                  <input type="hidden" name="listing_id" value={selectedListingId} />
                  <input type="hidden" name="checkIn" value={dateRange.checkIn ?? ''} />
                  <input type="hidden" name="checkOut" value={dateRange.checkOut ?? ''} />

                  <BookingRangeCalendar
                    value={dateRange}
                    onChange={handleDateRangeChange}
                    onClearDates={clearPriceEstimate}
                    blockedDates={blockedDates}
                    availabilityStatus={availabilityStatus}
                  />

                  {formErrors.dates ? (
                    <p className="rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
                      {formErrors.dates}
                    </p>
                  ) : null}

                  {visibleFormErrors.length > 0 ? (
                    <div
                      role="alert"
                      className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
                    >
                      <p className="font-semibold">Please fix the highlighted details before sending.</p>
                      <ul className="mt-2 list-disc space-y-1 pl-5">
                        {visibleFormErrors.map((errorMessage) => (
                          <li key={errorMessage}>{errorMessage}</li>
                        ))}
                      </ul>
                    </div>
                  ) : null}

                  {isSubmitSuccess ? (
                    <div
                      role="status"
                      className="rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm font-medium text-green-700"
                    >
                      Thank you. Your reservation request was sent and our team will contact you within 24 hours.
                    </div>
                  ) : null}

                  <div className="grid gap-5 md:grid-cols-2">
                    {hasValidDateRange ? (
                      <AccommodationPriceSummary
                        nights={selectedNights}
                        quote={activePriceQuote}
                        isLoading={isPriceLoading}
                        priceError={priceError}
                        validationError={formErrors.price}
                        className="bg-white rounded-xl p-6 border border-primary/10 shadow-sm"
                        totalValueClassName="font-playfair text-xl font-bold"
                      />
                    ) : null}

                    <div className="bg-white rounded-xl p-5 border border-secondary/20 shadow-sm text-left">
                      <p className="text-xs font-semibold uppercase tracking-[0.22em] text-primary/45 mb-3">
                        Reservation status
                      </p>
                      {isSubmitSuccess ? (
                        <p className="text-primary font-semibold">
                          Request sent. We&apos;ll contact you within 24 hours.
                        </p>
                      ) : hasValidDateRange ? (
                        <p className="text-primary font-semibold">
                          {selectedNights} night{selectedNights === 1 ? '' : 's'} selected. Your
                          request is ready once your contact details are complete.
                        </p>
                      ) : (
                        <p className="text-primary/70">
                          Select a valid, available check-in and check-out to prepare your request.
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="grid gap-4 md:grid-cols-2">
                    <div>
                      <label htmlFor="property-reservation-name" className="block text-sm font-medium text-primary/80 mb-1">
                        Full Name
                      </label>
                      <input
                        type="text"
                        id="property-reservation-name"
                        name="name"
                        autoComplete="name"
                        aria-invalid={Boolean(formErrors.name)}
                        aria-describedby={formErrors.name ? 'property-reservation-name-error' : undefined}
                        onChange={() => clearFormError('name')}
                        className="w-full rounded-md border border-gray-300 px-4 py-2"
                      />
                      {formErrors.name ? (
                        <p id="property-reservation-name-error" className="mt-2 text-sm font-medium text-red-700">
                          {formErrors.name}
                        </p>
                      ) : null}
                    </div>

                    <div>
                      <label htmlFor="property-reservation-email" className="block text-sm font-medium text-primary/80 mb-1">
                        Email Address
                      </label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-primary/60" />
                        <input
                          type="email"
                          id="property-reservation-email"
                          name="email"
                          autoComplete="email"
                          aria-invalid={Boolean(formErrors.email)}
                          aria-describedby={formErrors.email ? 'property-reservation-email-error' : undefined}
                          onChange={() => clearFormError('email')}
                          className="w-full rounded-md border border-gray-300 py-2 pl-10 pr-4"
                        />
                      </div>
                      {formErrors.email ? (
                        <p id="property-reservation-email-error" className="mt-2 text-sm font-medium text-red-700">
                          {formErrors.email}
                        </p>
                      ) : null}
                    </div>

                    <div>
                      <label htmlFor="property-reservation-phone" className="block text-sm font-medium text-primary/80 mb-1">
                        Phone Number
                      </label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-primary/60" />
                        <input
                          type="tel"
                          id="property-reservation-phone"
                          name="phone"
                          autoComplete="tel"
                          aria-invalid={Boolean(formErrors.phone)}
                          aria-describedby={formErrors.phone ? 'property-reservation-phone-error' : undefined}
                          onChange={() => clearFormError('phone')}
                          className="w-full rounded-md border border-gray-300 py-2 pl-10 pr-4"
                        />
                      </div>
                      {formErrors.phone ? (
                        <p id="property-reservation-phone-error" className="mt-2 text-sm font-medium text-red-700">
                          {formErrors.phone}
                        </p>
                      ) : null}
                    </div>

                    <div>
                      <label htmlFor="property-reservation-guests" className="block text-sm font-medium text-primary/80 mb-1">
                        Guests
                      </label>
                      <input
                        type="number"
                        id="property-reservation-guests"
                        name="guestsCount"
                        min={1}
                        max={property.maxGuests}
                        defaultValue={1}
                        aria-invalid={Boolean(formErrors.guestsCount)}
                        aria-describedby={formErrors.guestsCount ? 'property-reservation-guests-error' : undefined}
                        onChange={() => clearFormError('guestsCount')}
                        className="w-full rounded-md border border-gray-300 px-4 py-2"
                      />
                      {formErrors.guestsCount ? (
                        <p id="property-reservation-guests-error" className="mt-2 text-sm font-medium text-red-700">
                          {formErrors.guestsCount}
                        </p>
                      ) : null}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-primary/80 mb-3">
                      <span>Preferred Contact Method</span>
                    </label>
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                      <label className={`tap-reset relative flex cursor-pointer items-center justify-center rounded-md border p-4 ${contactMethod === 'email' ? 'border-black/10 bg-black/[0.03] shadow-sm' : 'border-gray-200 bg-white'}`}>
                        <input
                          type="radio"
                          name="contactMethod"
                          value="email"
                          checked={contactMethod === 'email'}
                          onChange={(e) => setContactMethod(e.target.value as ContactMethod)}
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
                          onChange={(e) => setContactMethod(e.target.value as ContactMethod)}
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
                          onChange={(e) => setContactMethod(e.target.value as ContactMethod)}
                          className="absolute opacity-0"
                        />
                        <MessageSquare className="h-5 w-5 text-primary" />
                        <span className="ml-2 text-primary">WhatsApp</span>
                      </label>
                    </div>
                  </div>

                  <div className="relative">
                    <LiquidGlassButton type="submit" className="w-full" disabled={isSubmitting}>
                      <Calendar className="w-6 h-6 mr-3" />
                      <span>{isSubmitting ? 'SENDING...' : 'BOOK NOW'}</span>
                    </LiquidGlassButton>

                    <p className="mt-4 text-primary/70 text-sm font-medium text-center">
                      Response within 24 hours guaranteed
                    </p>
                  </div>
                </form>
  );

  return (
    <div className="min-h-screen bg-cream pt-24 pb-20">
      {/* 1. Hero carousel */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-4 md:mt-6">
        <div className="relative h-[55vh] md:h-[65vh] overflow-hidden rounded-2xl md:rounded-[2rem] shadow-xl">
          <Image
            src={property.images[currentImageIndex]}
            alt={property.title}
            fill
            className="object-cover"
            priority={currentImageIndex === 0}
            loading={currentImageIndex === 0 ? 'eager' : 'lazy'}
            sizes="(max-width: 768px) 100vw, 1280px"
          />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black/40 to-transparent" />
          <div className="absolute bottom-5 right-5 rounded-full bg-black/55 px-3.5 py-1 text-xs font-medium tracking-wide text-white backdrop-blur-sm">
            {currentImageIndex + 1} / {property.images.length}
          </div>
          <button
            type="button"
            onClick={prevImage}
            aria-label="Previous photo"
            className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-white/95 p-2.5 text-primary shadow-lg transition hover:bg-white"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            type="button"
            onClick={nextImage}
            aria-label="Next photo"
            className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-white/95 p-2.5 text-primary shadow-lg transition hover:bg-white"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </section>

      {/* 2. Title block */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 md:pt-14">
        <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.22em] text-secondary">
          <MapPin className="h-3.5 w-3.5" />
          {property.location}
        </p>
        <h1 className="mt-3 font-playfair text-4xl md:text-5xl font-bold text-navy leading-tight">
          {property.title}
        </h1>
        <p className="mt-4 max-w-2xl text-navy/70 leading-relaxed">
          {property.description}
        </p>
      </section>

      {/* 3. Metadata strip */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <div className="flex flex-wrap items-stretch gap-y-3 rounded-2xl border border-primary/10 bg-white/60 backdrop-blur-sm px-2 py-3 md:px-4">
          {[
            { icon: BedDouble, label: `${property.bedrooms} bedroom${property.bedrooms === 1 ? '' : 's'}` },
            { icon: BedDouble, label: `${property.beds} bed${property.beds === 1 ? '' : 's'}` },
            { icon: Bath, label: `${property.baths} bath${property.baths === 1 ? '' : 's'}` },
            { icon: Users, label: `Up to ${property.maxGuests} guests` },
          ].map(({ icon: Icon, label }, index, arr) => (
            <div
              key={label}
              className={`flex flex-1 min-w-[140px] items-center justify-center gap-2.5 px-4 py-2 text-sm text-navy ${
                index < arr.length - 1 ? 'md:border-r md:border-primary/10' : ''
              }`}
            >
              <Icon className="h-5 w-5 text-primary" />
              <span className="font-medium">{label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* 4. Booking + Description split */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 md:pt-16">
        <div className="grid gap-8 lg:gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          {/* Booking — first on mobile, sticky on lg */}
          <div className="order-1 lg:order-1 lg:sticky lg:top-32 self-start">
            <div className="rounded-3xl border border-primary/10 bg-white/85 backdrop-blur-sm shadow-xl p-5 md:p-6">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-secondary">
                Reservation
              </p>
              <h2 className="mt-2 font-playfair text-2xl md:text-3xl font-bold text-primary">
                Book your stay
              </h2>
              <p className="mt-2 text-sm text-primary/75">
                Pick your dates and send your request — we reply within 24 hours.
              </p>
              <div className="mt-5">
                {reservationForm}
              </div>
            </div>
          </div>

          {/* Description + featured amenities */}
          <div className="order-2 lg:order-2">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-secondary">
              About this space
            </p>
            <h2 className="mt-2 font-playfair text-3xl md:text-4xl font-bold text-navy">
              A home for your Tel Aviv stay
            </h2>
            <div className="mt-5 space-y-4 text-navy/80 leading-relaxed">
              {property.longDescription.split('\n\n').map((paragraph, index) => (
                <p key={index}>{paragraph.trim()}</p>
              ))}
            </div>

            {featuredAmenities.length > 0 ? (
              <div className="mt-8 grid grid-cols-2 gap-3">
                {featuredAmenities.map((amenity) => (
                  <div
                    key={amenity.name}
                    className="flex items-center gap-3 rounded-2xl border border-primary/10 bg-white/70 px-4 py-3"
                  >
                    <amenity.icon className="h-5 w-5 shrink-0 text-primary" />
                    <span className="text-sm font-medium text-navy">{amenity.name}</span>
                  </div>
                ))}
              </div>
            ) : null}
          </div>
        </div>
      </section>

      {/* 5. Room gallery */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 md:pt-20">
        <div className="max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-secondary">
            Photo tour
          </p>
          <h2 className="mt-2 font-playfair text-3xl md:text-4xl font-bold text-navy">
            Room gallery
          </h2>
          <p className="mt-3 text-navy/70 leading-relaxed">
            Step through each space — tap any room to open the full set of photos.
          </p>
        </div>
        <div className="mt-8 [&>div>button:first-child]:lg:col-span-2 [&>div>button:first-child>span:first-child]:lg:!h-72">
          <RoomGallery rooms={property.rooms || []} />
        </div>
      </section>

      {/* 6. Amenities & facilities */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 md:pt-20">
        <div className="max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-secondary">
            Comforts
          </p>
          <h2 className="mt-2 font-playfair text-3xl md:text-4xl font-bold text-navy">
            Amenities &amp; facilities
          </h2>
          <p className="mt-3 text-navy/70 leading-relaxed">
            Everything provided for a smooth, comfortable stay.
          </p>
        </div>
        <div className="mt-8 grid gap-x-8 gap-y-5 sm:grid-cols-2">
          {property.amenities.map((amenity, index) => (
            <div
              key={amenity.name}
              className={`flex items-start gap-4 py-4 ${
                index < property.amenities.length - (property.amenities.length % 2 === 0 ? 2 : 1)
                  ? 'border-b border-primary/10'
                  : ''
              }`}
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/5 text-primary">
                <amenity.icon className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-semibold text-navy">{amenity.name}</h3>
                <p className="mt-0.5 text-sm text-navy/65">{amenity.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
