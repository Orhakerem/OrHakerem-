'use client';

import {
  Baby,
  Bath,
  BedDouble,
  Calendar,
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
          <button
            onClick={() => router.push('/properties')}
            className="button-hover-clean rounded-md bg-gold px-6 py-2 text-navy transition"
          >
            Back to Properties
          </button>
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

  return (
    <div className="min-h-screen pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
<div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="relative">
            <div className="relative h-[60vh]">
              <Image
                src={property.images[currentImageIndex]}
                alt={property.title}
                fill
                className="object-cover"
                priority={currentImageIndex === 0}
                loading={currentImageIndex === 0 ? 'eager' : 'lazy'}
                sizes="(max-width: 768px) 100vw, 1200px"
              />
              <div className="absolute bottom-4 right-4 bg-black/50 px-3 py-1 rounded-full text-white text-sm">
                {currentImageIndex + 1} / {property.images.length}
              </div>
              <button
                onClick={prevImage}
                className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-white p-2 shadow-lg"
              >
                ←
              </button>
              <button
                onClick={nextImage}
                className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-white p-2 shadow-lg"
              >
                →
              </button>
            </div>
          </div>

          <div className="p-8">
            <div className="max-w-4xl mx-auto">
              <div className="mb-6">
                <div>
                  {propertyPageHeading}
                  <div className="flex items-center text-navy/60">
                    <MapPin className="w-5 h-5 mr-1" />
                    {property.location}
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between p-4 border-y border-gray-200 mb-8">
                <div className="text-center">
                  <BedDouble className="w-6 h-6 mx-auto mb-1 text-navy" />
                  <div className="text-sm text-navy/80">{property.bedrooms} bedroom</div>
                </div>
                <div className="text-center">
                  <BedDouble className="w-6 h-6 mx-auto mb-1 text-navy" />
                  <div className="text-sm text-navy/80">{property.beds} bed</div>
                </div>
                <div className="text-center">
                  <Bath className="w-6 h-6 mx-auto mb-1 text-navy" />
                  <div className="text-sm text-navy/80">{property.baths} bath</div>
                </div>
                <div className="text-center">
                  <Users className="w-6 h-6 mx-auto mb-1 text-navy" />
                  <div className="text-sm text-navy/80">Up to {property.maxGuests} guests</div>
                </div>
              </div>

              <div className="prose prose-navy max-w-none mb-8">
                <h2 className="font-playfair text-2xl font-bold text-navy mb-4">
                  About this space
                </h2>
                {property.longDescription.split('\n\n').map((paragraph, index) => (
                  <p key={index} className="text-navy/80 mb-4">
                    {paragraph}
                  </p>
                ))}
              </div>

              <div className="mb-8">
                <h2 className="font-playfair text-2xl font-bold text-navy mb-6">
                  What this place offers
                </h2>
                <div className="grid md:grid-cols-2 gap-4">
                  {property.amenities.map((amenity, index) => (
                    <div key={index} className="flex items-start p-4 bg-cream rounded-lg">
                      <amenity.icon className="w-6 h-6 text-navy mr-3 shrink-0" />
                      <div>
                        <h3 className="font-semibold text-navy">{amenity.name}</h3>
                        <p className="text-sm text-navy/60">{amenity.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mb-8">
                <h2 className="font-playfair text-2xl font-bold text-primary mb-6">
                  Room Gallery
                </h2>
                <p className="text-primary/80 mb-6">
                  Explore each room and area of the property with our organized photo collections.
                </p>
                <RoomGallery rooms={property.rooms || []} />
              </div>

              <div className="bg-gradient-to-br from-cream to-white rounded-2xl p-8 border border-secondary/20 shadow-lg">
                <div className="mb-6">
                  <h3 className="font-playfair text-2xl font-bold text-primary mb-3">
                    Book your stay
                  </h3>
                  <p className="text-primary/75 max-w-2xl">
                    Choose your dates, enter your contact details, and send the reservation request
                    directly from this page.
                  </p>
                </div>

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
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="button-hover-clean inline-flex w-full items-center justify-center rounded-full bg-gradient-to-r from-secondary to-secondary-light px-12 py-4 text-lg font-semibold text-primary shadow-xl transition-all duration-300 disabled:cursor-not-allowed disabled:opacity-60"
                    >
                      <Calendar className="w-6 h-6 mr-3" />
                      <span>{isSubmitting ? 'SENDING...' : 'BOOK NOW'}</span>
                    </button>

                    <p className="mt-4 text-primary/70 text-sm font-medium text-center">
                      Response within 24 hours guaranteed
                    </p>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
