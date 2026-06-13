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
  Utensils,
  UtensilsCrossed,
  Users,
  Waves,
  Wifi,
  Wind,
  X,
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
      '/penthouse/4-terrasse-ext-coucher-soleil.jpg',
      '/penthouse/salon_angle_1.JPG',
      '/penthouse/IMG_0961.jpg',
      '/penthouse/IMG_0933.jpg',
      '/penthouse/IMG_0911.jpg',
      '/penthouse/IMG_0966.jpg',
      '/penthouse/IMG_0994.jpg',
      '/penthouse/26-jacuzzi-angle-2.JPEG',
      '/penthouse/IMG_0917.jpg',
      '/penthouse/chaises_hautes_angle 1.JPG',
      '/penthouse/7-vue-mer.jpg',
      '/penthouse/salon_angle_2.JPG',
      '/penthouse/IMG_0926.jpg',
      '/penthouse/IMG_0934.jpg',
      '/penthouse/IMG_0940.jpg',
      '/penthouse/IMG_0945.jpg',
      '/penthouse/IMG_0913.jpg',
      '/penthouse/IMG_0947.jpg',
      '/penthouse/IMG_0949.jpg',
      '/penthouse/IMG_0951.jpg',
      '/penthouse/IMG_0984.jpg',
      '/penthouse/IMG_0967.jpg',
      '/penthouse/IMG_0971.jpg',
      '/penthouse/6-salle-de-bain-douche-angle-2.jpg',
      '/penthouse/15-douche.jpg',
      '/penthouse/20-toilette-lavabo-angle-1.jpg',
      '/penthouse/19-toilette-lavabo-angle-2.jpg',
      '/penthouse/chaises_hautes_angle 2.JPG',
      '/penthouse/14-espace-laverie.jpg',
      '/penthouse/24-ext-drone-4.jpg',
      '/penthouse/9-ext-drone-3.jpg',
      '/penthouse/ext_drone_5.jpg',
      '/penthouse/23-ext-drone-12.jpg',
      '/penthouse/8-ext-drone-13.jpg',
    ],
    rooms: [
      {
        name: 'Living Room',
        description: 'Bright open-plan lounge with a large sofa and rooftop access',
        images: [
          { src: '/penthouse/salon_angle_1.JPG', alt: 'Living room with sofa and round mirror' },
          { src: '/penthouse/salon_angle_2.JPG', alt: 'Lounge with balcony access' },
          { src: '/penthouse/IMG_0911.jpg', alt: 'Open living and dining area' },
          { src: '/penthouse/IMG_0926.jpg', alt: 'Living room with smart TV' },
        ],
      },
      {
        name: 'Kitchen',
        description: 'Fully equipped kitchen with a city-view window and modern appliances',
        images: [
          { src: '/penthouse/IMG_0933.jpg', alt: 'Kitchen with city view' },
          { src: '/penthouse/IMG_0934.jpg', alt: 'Kitchen worktop and sink' },
          { src: '/penthouse/IMG_0940.jpg', alt: 'Kitchen with fridge' },
          { src: '/penthouse/IMG_0945.jpg', alt: 'Coffee machine, kettle and toaster' },
        ],
      },
      {
        name: 'Dining Area',
        description: 'Round dining table for shared meals next to the kitchen',
        images: [
          { src: '/penthouse/IMG_0917.jpg', alt: 'Dining table with smart TV' },
          { src: '/penthouse/IMG_0913.jpg', alt: 'Dining table by the kitchen' },
        ],
      },
      {
        name: 'Bedroom 1',
        description: 'Master bedroom with a queen bed, wardrobe and blackout curtains',
        images: [
          { src: '/penthouse/IMG_0947.jpg', alt: 'Master bedroom with queen bed' },
          { src: '/penthouse/IMG_0961.jpg', alt: 'Master bedroom with pendant light' },
          { src: '/penthouse/IMG_0949.jpg', alt: 'Master bedroom, second angle' },
          { src: '/penthouse/IMG_0951.jpg', alt: 'Bedroom wardrobe and door' },
        ],
      },
      {
        name: 'Bedroom 2',
        description: 'Comfortable bedroom with a queen bed and natural light',
        images: [
          { src: '/penthouse/IMG_0994.jpg', alt: 'Second bedroom with queen bed' },
          { src: '/penthouse/IMG_0984.jpg', alt: 'Second bedroom with terrace access' },
        ],
      },
      {
        name: 'Bedroom 3',
        description: 'Cosy bedroom with a queen bed, wardrobe and full-length mirror',
        images: [
          { src: '/penthouse/IMG_0966.jpg', alt: 'Third bedroom with queen bed' },
          { src: '/penthouse/IMG_0967.jpg', alt: 'Third bedroom with mirror' },
          { src: '/penthouse/IMG_0971.jpg', alt: 'Bedroom wardrobe' },
        ],
      },
      {
        name: 'Full Bathroom 1',
        description: 'Full bathroom with a walk-in shower and vanity',
        images: [
          { src: '/penthouse/6-salle-de-bain-douche-angle-2.jpg', alt: 'Bathroom with walk-in shower and sink' },
        ],
      },
      {
        name: 'Full Bathroom 2',
        description: 'Second full bathroom with a rain shower',
        images: [{ src: '/penthouse/15-douche.jpg', alt: 'Walk-in rain shower' }],
      },
      {
        name: 'Toilet with Sink',
        description: 'Separate WC with a vessel sink',
        images: [
          { src: '/penthouse/20-toilette-lavabo-angle-1.jpg', alt: 'Vessel sink and vanity' },
          { src: '/penthouse/19-toilette-lavabo-angle-2.jpg', alt: 'Toilet with sink' },
        ],
      },
      {
        name: 'Terrace',
        description: 'Private rooftop terrace with lounge seating, BBQ, sea views and aerial views',
        images: [
          { src: '/penthouse/4-terrasse-ext-coucher-soleil.jpg', alt: 'Rooftop terrace at sunset' },
          { src: '/penthouse/chaises_hautes_angle 1.JPG', alt: 'Terrace high table and bench' },
          { src: '/penthouse/chaises_hautes_angle 2.JPG', alt: 'Terrace high table with city view' },
          { src: '/penthouse/7-vue-mer.jpg', alt: 'Sea view down the street' },
          { src: '/penthouse/24-ext-drone-4.jpg', alt: 'Aerial view of the rooftop terrace' },
          { src: '/penthouse/9-ext-drone-3.jpg', alt: 'Rooftop terrace from above' },
          { src: '/penthouse/ext_drone_5.jpg', alt: 'Terrace and jacuzzi from above' },
          { src: '/penthouse/23-ext-drone-12.jpg', alt: 'Rooftop and city view' },
          { src: '/penthouse/8-ext-drone-13.jpg', alt: 'Aerial view of the building and street' },
        ],
      },
      {
        name: 'Laundry Area',
        description: 'Utility area with a washer and sink',
        images: [{ src: '/penthouse/14-espace-laverie.jpg', alt: 'Laundry area with washing machine' }],
      },
      {
        name: 'Jacuzzi',
        description: 'Private rooftop jacuzzi with panoramic city views',
        images: [
          { src: '/penthouse/1-jacuzzi-angle.JPEG', alt: 'Rooftop jacuzzi' },
          { src: '/penthouse/26-jacuzzi-angle-2.JPEG', alt: 'Jacuzzi with city skyline' },
        ],
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
    propertyType: 'Entire penthouse',
    highlights: [
      {
        icon: Waves,
        title: 'Panoramic sea views',
        description: 'A full Tel Aviv coastline panorama from the private rooftop.',
      },
      {
        icon: Bath,
        title: 'Private rooftop jacuzzi',
        description: 'Soak under the stars on your own terrace, no shared space.',
      },
      {
        icon: MapPin,
        title: 'Heart of Kerem HaTeimanim',
        description: 'Steps from the beach, the Carmel Market, and the city center.',
      },
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
      '/studio/IMG_0814.jpg',
      '/studio/Salon_angle_1.jpg',
      '/studio/Cuisine_angle_1.jpg',
      '/studio/Salon_angle_3_Zoom.jpg',
      '/studio/IMG_0800.jpg',
      '/studio/Salon_angle_1_Zoom.jpg',
      '/studio/Salon_angle_4.jpg',
      '/studio/cuisine_angle_2.jpg',
      '/studio/IMG_0806.jpg',
      '/studio/lit_angle_1.jpg',
      '/studio/IMG_0821.jpg',
      '/studio/IMG_0828.jpg',
      '/studio/IMG_0825.jpg',
      '/studio/IMG_0795.jpg',
      '/studio/IMG_0809.jpg',
      '/studio/IMG_0810.jpg',
      '/studio/Canape_ouvert_angle_1.jpg',
      '/studio/Canape_ouvert_angle_2.jpg',
    ],
    rooms: [
      {
        name: 'Living Room',
        description: 'Open-plan lounge by the entrance with a comfortable sofa',
        images: [
          { src: '/studio/Salon_angle_1.jpg', alt: 'Living room with sofa and dining table' },
          { src: '/studio/Salon_angle_1_Zoom.jpg', alt: 'Lounge area near the entrance' },
          { src: '/studio/Salon_angle_4.jpg', alt: 'Living room sofa and dining table' },
        ],
      },
      {
        name: 'Kitchenette',
        description: 'Compact kitchen fully equipped for everyday cooking',
        images: [
          { src: '/studio/Cuisine_angle_1.jpg', alt: 'Kitchenette with sink and oven' },
          { src: '/studio/cuisine_angle_2.jpg', alt: 'Kitchenette with fridge' },
          { src: '/studio/IMG_0806.jpg', alt: 'Cooktop and toaster oven' },
        ],
      },
      {
        name: 'Dining Area',
        description: 'Round dining table by the window',
        images: [
          { src: '/studio/Salon_angle_3_Zoom.jpg', alt: 'Dining table by the window' },
        ],
      },
      {
        name: 'Bedroom',
        description: 'Comfortable queen bed with storage',
        images: [
          { src: '/studio/IMG_0814.jpg', alt: 'Bedroom with queen bed' },
          { src: '/studio/lit_angle_1.jpg', alt: 'Bed with fresh towels' },
          { src: '/studio/IMG_0821.jpg', alt: 'Bedroom with arched window' },
          { src: '/studio/IMG_0828.jpg', alt: 'Bedroom with mirror and dresser' },
          { src: '/studio/IMG_0825.jpg', alt: 'Bedroom with TV and desk' },
        ],
      },
      {
        name: 'Bathroom',
        description: 'Private bathroom with walk-in shower',
        images: [
          { src: '/studio/IMG_0800.jpg', alt: 'Walk-in shower' },
          { src: '/studio/IMG_0795.jpg', alt: 'Vanity with arched window' },
        ],
      },
      {
        name: 'Workspace',
        description: 'Dedicated desk and chair for remote work',
        images: [
          { src: '/studio/IMG_0809.jpg', alt: 'Desk with wall-mounted TV' },
          { src: '/studio/IMG_0810.jpg', alt: 'Workspace with desk and chair' },
        ],
      },
      {
        name: 'Sofa Bed Area',
        description: 'Convertible sofa near the entrance for additional sleeping space',
        images: [
          { src: '/studio/Canape_ouvert_angle_1.jpg', alt: 'Convertible sofa bed made up' },
          { src: '/studio/Canape_ouvert_angle_2.jpg', alt: 'Sofa bed area' },
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
    propertyType: 'Entire studio apartment',
    highlights: [
      {
        icon: MapPin,
        title: 'Steps from everything',
        description: '2 minutes to the beach, the Shouk HaCarmel, and the Kerem entrance.',
      },
      {
        icon: BedDouble,
        title: 'Sleeps four comfortably',
        description: 'Queen bed plus a convertible sofa near the entrance.',
      },
      {
        icon: Wifi,
        title: 'Set up to work',
        description: 'Fully renovated and equipped — ideal for medium and long stays.',
      },
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
  const [isPhotosModalOpen, setIsPhotosModalOpen] = useState(false);
  const [isAmenitiesModalOpen, setIsAmenitiesModalOpen] = useState(false);
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);
  const [isBookingSheetOpen, setIsBookingSheetOpen] = useState(false);
  const [heroPhotoIndex, setHeroPhotoIndex] = useState(0);
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
          ? 'font-head text-3xl font-bold text-black mb-2'
          : 'text-2xl font-bold text-black mb-4'
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

  useEffect(() => {
    setHeroPhotoIndex(0);
  }, [propertyKey]);

  const anyOverlayOpen =
    isPhotosModalOpen || isAmenitiesModalOpen || isBookingSheetOpen;

  useEffect(() => {
    if (!anyOverlayOpen) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key !== 'Escape') return;
      setIsPhotosModalOpen(false);
      setIsAmenitiesModalOpen(false);
      setIsBookingSheetOpen(false);
    };
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', onKey);
    };
  }, [anyOverlayOpen]);

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

  const reservationForm = (
    <form onSubmit={handleBookNowSubmit} noValidate className="space-y-6">
                  <input type="hidden" name="property" value={property.title} />
                  <input type="hidden" name="listing_id" value={selectedListingId} />
                  <input type="hidden" name="checkIn" value={dateRange.checkIn ?? ''} />
                  <input type="hidden" name="checkOut" value={dateRange.checkOut ?? ''} />

                  <div className="grid grid-cols-2 overflow-hidden rounded-[10px] border border-primary/15">
                    <button
                      type="button"
                      onClick={() => {
                        setIsBookingSheetOpen(false);
                        setTimeout(() => {
                          document
                            .getElementById('select-checkin-date')
                            ?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                        }, 0);
                      }}
                      className="tap-reset border-r border-primary/15 px-4 py-3 text-left transition hover:bg-primary/5"
                    >
                      <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-black/55">
                        Check-in
                      </p>
                      <p className="mt-1 text-sm font-semibold text-black">
                        {dateRange.checkIn ?? 'Add date'}
                      </p>
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setIsBookingSheetOpen(false);
                        setTimeout(() => {
                          document
                            .getElementById('select-checkin-date')
                            ?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                        }, 0);
                      }}
                      className="tap-reset px-4 py-3 text-left transition hover:bg-primary/5"
                    >
                      <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-black/55">
                        Checkout
                      </p>
                      <p className="mt-1 text-sm font-semibold text-black">
                        {dateRange.checkOut ?? 'Add date'}
                      </p>
                    </button>
                  </div>

                  {formErrors.dates ? (
                    <p className="rounded-[10px] border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
                      {formErrors.dates}
                    </p>
                  ) : null}

                  {visibleFormErrors.length > 0 ? (
                    <div
                      role="alert"
                      className="rounded-[10px] border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
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
                      className="rounded-[10px] border border-green-200 bg-green-50 px-4 py-3 text-sm font-medium text-green-700"
                    >
                      Thank you. Your reservation request was sent and our team will contact you within 24 hours.
                    </div>
                  ) : null}

                  {hasValidDateRange ? (
                    <AccommodationPriceSummary
                      nights={selectedNights}
                      quote={activePriceQuote}
                      isLoading={isPriceLoading}
                      priceError={priceError}
                      validationError={formErrors.price}
                      className="bg-white rounded-[10px] p-6 border border-primary/10 shadow-sm"
                      totalValueClassName="font-head text-xl font-bold"
                    />
                  ) : null}

                  <div className="grid gap-4 md:grid-cols-2">
                    <div>
                      <label htmlFor="property-reservation-name" className="block text-sm font-medium text-black/80 mb-1">
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
                        className="w-full rounded-[10px] border border-gray-300 px-4 py-2"
                      />
                      {formErrors.name ? (
                        <p id="property-reservation-name-error" className="mt-2 text-sm font-medium text-red-700">
                          {formErrors.name}
                        </p>
                      ) : null}
                    </div>

                    <div>
                      <label htmlFor="property-reservation-email" className="block text-sm font-medium text-black/80 mb-1">
                        Email Address
                      </label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-black/60" />
                        <input
                          type="email"
                          id="property-reservation-email"
                          name="email"
                          autoComplete="email"
                          aria-invalid={Boolean(formErrors.email)}
                          aria-describedby={formErrors.email ? 'property-reservation-email-error' : undefined}
                          onChange={() => clearFormError('email')}
                          className="w-full rounded-[10px] border border-gray-300 py-2 pl-10 pr-4"
                        />
                      </div>
                      {formErrors.email ? (
                        <p id="property-reservation-email-error" className="mt-2 text-sm font-medium text-red-700">
                          {formErrors.email}
                        </p>
                      ) : null}
                    </div>

                    <div>
                      <label htmlFor="property-reservation-phone" className="block text-sm font-medium text-black/80 mb-1">
                        Phone Number
                      </label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-black/60" />
                        <input
                          type="tel"
                          id="property-reservation-phone"
                          name="phone"
                          autoComplete="tel"
                          aria-invalid={Boolean(formErrors.phone)}
                          aria-describedby={formErrors.phone ? 'property-reservation-phone-error' : undefined}
                          onChange={() => clearFormError('phone')}
                          className="w-full rounded-[10px] border border-gray-300 py-2 pl-10 pr-4"
                        />
                      </div>
                      {formErrors.phone ? (
                        <p id="property-reservation-phone-error" className="mt-2 text-sm font-medium text-red-700">
                          {formErrors.phone}
                        </p>
                      ) : null}
                    </div>

                    <div>
                      <label htmlFor="property-reservation-guests" className="block text-sm font-medium text-black/80 mb-1">
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
                        className="w-full rounded-[10px] border border-gray-300 px-4 py-2"
                      />
                      {formErrors.guestsCount ? (
                        <p id="property-reservation-guests-error" className="mt-2 text-sm font-medium text-red-700">
                          {formErrors.guestsCount}
                        </p>
                      ) : null}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-black/80 mb-3">
                      <span>Preferred Contact Method</span>
                    </label>
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                      <label className={`tap-reset relative flex cursor-pointer items-center justify-center rounded-[10px] border p-4 ${contactMethod === 'email' ? 'border-black/10 bg-black/[0.03] shadow-sm' : 'border-gray-200 bg-white'}`}>
                        <input
                          type="radio"
                          name="contactMethod"
                          value="email"
                          checked={contactMethod === 'email'}
                          onChange={(e) => setContactMethod(e.target.value as ContactMethod)}
                          className="absolute opacity-0"
                        />
                        <Mail className="h-5 w-5 text-black" />
                        <span className="ml-2 text-black">Email</span>
                      </label>

                      <label className={`tap-reset relative flex cursor-pointer items-center justify-center rounded-[10px] border p-4 ${contactMethod === 'phone' ? 'border-black/10 bg-black/[0.03] shadow-sm' : 'border-gray-200 bg-white'}`}>
                        <input
                          type="radio"
                          name="contactMethod"
                          value="phone"
                          checked={contactMethod === 'phone'}
                          onChange={(e) => setContactMethod(e.target.value as ContactMethod)}
                          className="absolute opacity-0"
                        />
                        <Phone className="h-5 w-5 text-black" />
                        <span className="ml-2 text-black">Phone</span>
                      </label>

                      <label className={`tap-reset relative flex cursor-pointer items-center justify-center rounded-[10px] border p-4 ${contactMethod === 'whatsapp' ? 'border-black/10 bg-black/[0.03] shadow-sm' : 'border-gray-200 bg-white'}`}>
                        <input
                          type="radio"
                          name="contactMethod"
                          value="whatsapp"
                          checked={contactMethod === 'whatsapp'}
                          onChange={(e) => setContactMethod(e.target.value as ContactMethod)}
                          className="absolute opacity-0"
                        />
                        <MessageSquare className="h-5 w-5 text-black" />
                        <span className="ml-2 text-black">WhatsApp</span>
                      </label>
                    </div>
                  </div>

                  <div className="relative">
                    <LiquidGlassButton type="submit" className="w-full" disabled={isSubmitting}>
                      <Calendar className="w-6 h-6 mr-3" />
                      <span>{isSubmitting ? 'SENDING...' : 'BOOK NOW'}</span>
                    </LiquidGlassButton>

                    <p className="mt-4 text-black/70 text-sm font-medium text-center">
                      Response within 24 hours guaranteed
                    </p>
                  </div>
                </form>
  );

  const heroPhotos = property.images.slice(0, 5);
  const heroPhotoCount = property.images.length;
  const activeHeroPhotoIndex = heroPhotoIndex % heroPhotoCount;
  const activeHeroPhoto = property.images[activeHeroPhotoIndex] ?? property.images[0];
  const amenitiesPreview = property.amenities.slice(0, 10);
  const quickFacts = [
    `${property.maxGuests} guest${property.maxGuests === 1 ? '' : 's'}`,
    `${property.bedrooms} bedroom${property.bedrooms === 1 ? '' : 's'}`,
    `${property.beds} bed${property.beds === 1 ? '' : 's'}`,
    `${property.baths} bath${property.baths === 1 ? '' : 's'}`,
  ];
  const showPreviousHeroPhoto = () => {
    setHeroPhotoIndex((currentIndex) =>
      currentIndex === 0 ? heroPhotoCount - 1 : currentIndex - 1,
    );
  };
  const showNextHeroPhoto = () => {
    setHeroPhotoIndex((currentIndex) =>
      currentIndex === heroPhotoCount - 1 ? 0 : currentIndex + 1,
    );
  };


  return (
    <div className="property-detail-page min-h-screen pt-0 lg:pt-24 pb-32 lg:pb-20" style={{ backgroundColor: '#e8e4dc' }}>
      {/* Responsive: full-bleed photo with back button, carousel arrows + gallery counter */}
      <div className="lg:hidden relative h-[44vh] w-full overflow-hidden">
        <Image
          src={activeHeroPhoto}
          alt={`${property.title} — photo ${activeHeroPhotoIndex + 1}`}
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <button
          type="button"
          onClick={() => router.push('/properties')}
          aria-label="Back to properties"
          className="tap-reset absolute top-4 left-4 flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-md"
        >
          <ChevronLeft className="h-5 w-5 text-black" />
        </button>
        <div className="absolute inset-y-0 left-0 right-0 flex items-center justify-between px-3 pointer-events-none">
          <button
            type="button"
            onClick={showPreviousHeroPhoto}
            aria-label="Show previous photo"
            className="tap-reset pointer-events-auto flex h-10 w-10 items-center justify-center rounded-full bg-white/90 shadow-md backdrop-blur-sm transition hover:bg-white"
          >
            <ChevronLeft className="h-5 w-5 text-black" />
          </button>
          <button
            type="button"
            onClick={showNextHeroPhoto}
            aria-label="Show next photo"
            className="tap-reset pointer-events-auto flex h-10 w-10 items-center justify-center rounded-full bg-white/90 shadow-md backdrop-blur-sm transition hover:bg-white"
          >
            <ChevronRight className="h-5 w-5 text-black" />
          </button>
        </div>
        <button
          type="button"
          onClick={() => setIsPhotosModalOpen(true)}
          aria-haspopup="dialog"
          aria-label="View all photos"
          className="tap-reset absolute bottom-4 right-4 rounded-full bg-black/50 px-3 py-1.5 text-xs font-semibold text-white backdrop-blur-sm"
        >
          {activeHeroPhotoIndex + 1} / {property.images.length}
        </button>
      </div>

      {/* Desktop: Airbnb 5-up photo grid */}
      <section className="hidden lg:block max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-4 md:mt-6">
        <div className="relative grid aspect-[2/1] grid-cols-4 grid-rows-2 gap-2 overflow-hidden rounded-[6px]">
          {heroPhotos.map((src, index) => (
            <button
              key={src}
              type="button"
              onClick={() => setIsPhotosModalOpen(true)}
              aria-label={`Open photo gallery (photo ${index + 1})`}
              className={`tap-reset relative overflow-hidden bg-cream transition hover:brightness-95 ${
                index === 0 ? 'col-span-2 row-span-2' : ''
              }`}
            >
              <Image
                src={src}
                alt={`${property.title} — photo ${index + 1}`}
                fill
                className="object-cover"
                priority={index === 0}
                loading={index === 0 ? 'eager' : 'lazy'}
                sizes={index === 0 ? '(max-width: 1280px) 50vw, 640px' : '(max-width: 1280px) 25vw, 320px'}
              />
            </button>
          ))}
          <button
            type="button"
            onClick={() => setIsPhotosModalOpen(true)}
            aria-haspopup="dialog"
            aria-expanded={isPhotosModalOpen}
            className="absolute bottom-4 right-4 rounded-full bg-white px-4 py-2 text-sm font-semibold text-black shadow-md transition hover:bg-cream"
          >
            Show all {property.images.length} photos
          </button>
        </div>
      </section>

      {/* Main content + sticky booking */}
      <div className="relative z-10 -mt-6 rounded-t-[1.75rem] bg-cream shadow-[0_-8px_24px_-16px_rgba(0,0,0,0.25)] lg:mt-0 lg:rounded-none lg:shadow-none max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 lg:pt-14 grid gap-10 lg:gap-14 lg:grid-cols-[1.55fr_1fr]">
        {/* Left content column */}
        <div className="min-w-0">
          {/* Responsive editorial header */}
          <div className="lg:hidden pb-4">
            <h1 className="mt-2 font-head text-2xl font-bold text-black leading-tight">
              {property.title}
            </h1>
            <p className="mt-2 text-sm text-black/70 leading-relaxed">
              {property.description}
            </p>
            <div className="mt-4 flex flex-wrap gap-x-4 gap-y-1.5 text-sm text-black/80">
              <span className="flex items-center gap-1.5">
                <Users className="h-4 w-4 shrink-0" />
                {property.maxGuests} guests
              </span>
              <span className="flex items-center gap-1.5">
                <BedDouble className="h-4 w-4 shrink-0" />
                {property.bedrooms} bedroom{property.bedrooms !== 1 ? 's' : ''} · {property.beds} bed{property.beds !== 1 ? 's' : ''}
              </span>
              <span className="flex items-center gap-1.5">
                <Bath className="h-4 w-4 shrink-0" />
                {property.baths} bath{property.baths !== 1 ? 's' : ''}
              </span>
            </div>
          </div>

          {/* 2. Title + property type subtitle (desktop) */}
          <header className="hidden lg:block">
            <h1 className="font-head text-3xl md:text-4xl font-bold text-black leading-tight">
              {property.title}
            </h1>
            <p className="mt-3 text-black/70">
              {property.propertyType} in {property.location}
            </p>

            {/* 3. Quick facts */}
            <p className="mt-2 text-sm text-black/65">
              {quickFacts.join(' · ')}
            </p>
          </header>

          {/* Divider */}
          <hr className="hidden lg:block mt-10 mb-5 border-t border-primary/10" />

          {/* 5. Feature highlights */}
          <section className="hidden lg:grid grid-cols-3 gap-3 py-1">
            {property.highlights.map((highlight) => (
              <div key={highlight.title} className="flex flex-col gap-2">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[10px] bg-primary/5 text-black">
                  <highlight.icon className="h-4 w-4" />
                </div>
                <h3 className="text-sm font-semibold text-black leading-snug">{highlight.title}</h3>
              </div>
            ))}
          </section>

          <hr className="hidden lg:block mt-5 mb-10 border-t border-primary/10" />

          {/* 6. Select check-in date — inline calendar (moved above About this space) */}
          <section id="select-checkin-date">
            <h2 className="font-head text-2xl md:text-3xl font-bold text-black">
              Plan your stay
            </h2>
            <p className="mt-2 text-black/70">
              Add your travel dates for exact pricing.
            </p>
            <div className="mt-6">
              <BookingRangeCalendar
                value={dateRange}
                onChange={handleDateRangeChange}
                onClearDates={clearPriceEstimate}
                blockedDates={blockedDates}
                availabilityStatus={availabilityStatus}
              />
            </div>
            {hasValidDateRange ? (
              <AccommodationPriceSummary
                nights={selectedNights}
                quote={activePriceQuote}
                isLoading={isPriceLoading}
                priceError={priceError}
                validationError={formErrors.price}
                className="lg:hidden mt-4 rounded-[10px] border border-primary/10 bg-white/80 px-4 py-3 text-sm shadow-sm"
                totalValueClassName="font-head text-lg font-bold"
              />
            ) : null}
          </section>

          <hr className="my-10 border-t border-primary/10" />

          {/* 7. About this space */}
          <section>
            <h2 className="font-head text-2xl md:text-3xl font-bold text-black">
              About this space
            </h2>
            <div
              className={`mt-5 space-y-4 text-black/80 leading-relaxed ${
                isDescriptionExpanded
                  ? ''
                  : 'relative max-h-44 overflow-hidden after:pointer-events-none after:absolute after:inset-x-0 after:bottom-0 after:h-16 after:bg-gradient-to-t after:from-cream after:to-transparent'
              }`}
            >
              {property.longDescription.split('\n\n').map((paragraph, index) => (
                <p key={index}>{paragraph.trim()}</p>
              ))}
            </div>
            <button
              type="button"
              onClick={() => setIsDescriptionExpanded((value) => !value)}
              className="tap-reset mt-4 inline-flex items-center gap-1 text-sm font-semibold text-black underline underline-offset-4 decoration-navy/40 hover:decoration-navy"
            >
              {isDescriptionExpanded ? 'Show less' : 'Show more'}
              <ChevronRight
                className={`h-4 w-4 transition-transform ${
                  isDescriptionExpanded ? '-rotate-90' : 'rotate-90'
                }`}
              />
            </button>
          </section>

          <hr className="my-10 border-t border-primary/10" />

          {/* 8. Responsive photos by room */}
          {property.rooms?.length ? (
            <section className="lg:hidden">
              <h2 className="font-head text-2xl font-bold text-black">
                Photos by room
              </h2>
              <div className="mt-5 space-y-5">
                {property.rooms.map((room) => (
                  <button
                    key={room.name}
                    type="button"
                    onClick={() => setIsPhotosModalOpen(true)}
                    className="tap-reset block w-full text-left"
                    aria-label={`View ${room.name} photos`}
                  >
                    <span className="flex gap-3 overflow-x-auto pb-2">
                      {room.images.slice(0, 4).map((image, index) => (
                        <span
                          key={image.src}
                          className="relative block h-24 w-32 shrink-0 overflow-hidden rounded-[6px] bg-white"
                        >
                          <Image
                            src={image.src}
                            alt={image.alt}
                            fill
                            className="object-cover"
                            loading="lazy"
                            sizes="128px"
                          />
                          {index === 3 && room.images.length > 4 ? (
                            <span className="absolute inset-0 grid place-items-center bg-black/45 text-xs font-semibold text-white">
                              +{room.images.length - 3}
                            </span>
                          ) : null}
                        </span>
                      ))}
                    </span>
                    <span className="mt-2 flex items-center justify-between gap-3">
                      <span className="font-head text-base font-bold text-black">
                        {room.name}
                      </span>
                      <span className="text-xs font-semibold uppercase tracking-[0.16em] text-primary">
                        {room.images.length} photos
                      </span>
                    </span>
                  </button>
                ))}
              </div>
            </section>
          ) : null}

          <hr className="my-10 border-t border-primary/10 lg:hidden" />

          {/* 9. What this place offers */}
          <section>
            <h2 className="font-head text-2xl md:text-3xl font-bold text-black">
              What this place offers
            </h2>
            <div className="mt-6 grid gap-y-4 sm:grid-cols-2 sm:gap-x-8">
              {amenitiesPreview.map((amenity) => (
                <div key={amenity.name} className="flex items-center gap-4">
                  <amenity.icon className="h-5 w-5 shrink-0 text-black" />
                  <span className="text-sm text-black">{amenity.name}</span>
                </div>
              ))}
            </div>
            <button
              type="button"
              onClick={() => setIsAmenitiesModalOpen(true)}
              aria-haspopup="dialog"
              aria-expanded={isAmenitiesModalOpen}
              className="tap-reset mt-8 rounded-full border border-navy/30 px-5 py-2.5 text-sm font-semibold text-black transition hover:bg-navy/5"
            >
              Show all {property.amenities.length} amenities
            </button>
          </section>
        </div>

        {/* Right sticky booking column (lg+) */}
        <aside className="hidden lg:block self-start lg:sticky lg:top-28">
          <div>
            <div className="rounded-[10px] border border-primary/10 bg-white shadow-xl p-5 lg:max-h-[calc(100vh-8rem)] lg:overflow-y-auto">
              <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-secondary">
                Reservation
              </p>
              <h2 className="mt-1 font-head text-xl font-bold text-black">
                Book your stay
              </h2>
              <p className="mt-1 text-xs text-black/75">
                Pick your dates and send your request — we reply within 24 hours.
              </p>
              <div className="mt-4">
                {reservationForm}
              </div>
            </div>
          </div>
        </aside>
      </div>

      {/* Mobile fixed booking bar (<lg) */}
      <div className="lg:hidden fixed inset-x-0 bottom-0 z-40 border-t border-primary/10 bg-white/95 backdrop-blur-sm px-4 py-3 shadow-[0_-8px_24px_-12px_rgba(0,0,0,0.18)]">
        <div className="flex items-center justify-between gap-4 max-w-3xl mx-auto">
          <div className="min-w-0">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-black/50">
              Request to book
            </p>
            <p className="text-sm font-semibold text-black truncate">
              {selectedNights > 0
                ? `${selectedNights} night${selectedNights !== 1 ? 's' : ''} · ${dateRange.checkIn} → ${dateRange.checkOut}`
                : 'Add dates for pricing'}
            </p>
          </div>
          <button
            type="button"
            onClick={() => setIsBookingSheetOpen(true)}
            aria-controls="booking-sheet"
            aria-expanded={isBookingSheetOpen}
            className="tap-reset shrink-0 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-white shadow-md transition hover:bg-primary/90"
          >
            Inquire
          </button>
        </div>
      </div>

      {/* Photos modal */}
      {isPhotosModalOpen ? (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="All photos"
          className="fixed inset-0 z-50 overflow-y-auto bg-cream"
        >
          <div className="sticky top-0 z-10 flex items-center justify-between border-b border-primary/10 bg-cream/95 backdrop-blur-sm px-4 sm:px-6 py-4">
            <p className="font-head text-lg font-bold text-black">
              {property.title} — All photos
            </p>
            <button
              type="button"
              onClick={() => setIsPhotosModalOpen(false)}
              aria-label="Close photos"
              className="tap-reset rounded-full bg-white p-2 text-black shadow-md transition hover:bg-cream"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
          <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
            <RoomGallery rooms={property.rooms || []} />
          </div>
        </div>
      ) : null}

      {/* Amenities modal */}
      {isAmenitiesModalOpen ? (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="All amenities"
          className="fixed inset-0 z-[2000] grid place-items-end sm:place-items-center bg-black/50 px-0 sm:px-4"
          onClick={(event) => {
            if (event.target === event.currentTarget) {
              setIsAmenitiesModalOpen(false);
            }
          }}
        >
          <div className="w-full sm:max-w-lg max-h-[85vh] overflow-y-auto rounded-t-3xl sm:rounded-3xl bg-cream shadow-2xl">
            <div className="sticky top-0 z-10 flex items-center justify-between border-b border-primary/10 bg-cream/95 backdrop-blur-sm px-6 py-4">
              <p className="font-head text-lg font-bold text-black">
                What this place offers
              </p>
              <button
                type="button"
                onClick={() => setIsAmenitiesModalOpen(false)}
                aria-label="Close amenities"
                className="tap-reset rounded-full bg-white p-2 text-black shadow-md transition hover:bg-cream"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            <div className="px-6 py-6 space-y-5">
              {property.amenities.map((amenity, index) => (
                <div
                  key={amenity.name}
                  className={`flex items-start gap-4 pb-5 ${
                    index < property.amenities.length - 1 ? 'border-b border-primary/10' : ''
                  }`}
                >
                  <amenity.icon className="h-5 w-5 shrink-0 text-black mt-0.5" />
                  <div>
                    <h3 className="font-semibold text-black">{amenity.name}</h3>
                    <p className="mt-0.5 text-sm text-black/65">{amenity.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : null}

      {/* Mobile booking sheet */}
      {isBookingSheetOpen ? (
        <div
          id="booking-sheet"
          role="dialog"
          aria-modal="true"
          aria-label="Reservation"
          className="lg:hidden fixed inset-x-0 bottom-0 top-12 z-50 overflow-y-auto rounded-t-3xl bg-cream shadow-2xl"
        >
          <div className="sticky top-0 z-10 flex items-center justify-between border-b border-primary/10 bg-cream/95 backdrop-blur-sm px-5 py-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-secondary">
                Reservation
              </p>
              <p className="mt-0.5 font-head text-lg font-bold text-black">Book your stay</p>
            </div>
            <button
              type="button"
              onClick={() => setIsBookingSheetOpen(false)}
              aria-label="Close reservation"
              className="tap-reset rounded-full bg-white p-2 text-black shadow-md transition hover:bg-cream"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
          <div className="px-5 py-6 pb-12">
            {reservationForm}
          </div>
        </div>
      ) : null}
    </div>
  );
}
