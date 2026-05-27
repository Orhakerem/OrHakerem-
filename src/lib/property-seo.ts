import type { BookablePropertyId } from '@/lib/bookable-properties';
import { SITE_URL } from '@/app/seo';

export interface PropertySeoMeta {
  title: string;
  description: string;
  keywords: string;
  image: string;
  imageAlt: string;
  bedrooms: number;
  bathrooms: number;
  maxGuests: number;
  priceFrom: number;
  priceTo: number;
}

export const PROPERTY_SEO: Record<BookablePropertyId, PropertySeoMeta> = {
  'penthouse-jacuzzi': {
    title: 'Luxury Penthouse with Private Jacuzzi & Sea Views | Tel Aviv | Or Hakerem',
    description:
      'Spacious 3-bedroom luxury penthouse in Kerem HaTeimanim, Tel Aviv. Private rooftop jacuzzi, BBQ terrace, panoramic sea views. Steps from Carmel Market & Banana Beach. Book direct and save 15%.',
    keywords:
      'penthouse jacuzzi Tel Aviv, luxury penthouse Kerem HaTeimanim, sea view apartment Tel Aviv, BBQ terrace rental Tel Aviv, rooftop apartment Tel Aviv, luxury short-term rental Tel Aviv',
    image: '/penthouse/1-jacuzzi-angle.JPEG',
    imageAlt:
      'Luxury penthouse rooftop terrace with private jacuzzi and Tel Aviv sea views at Or Hakerem',
    bedrooms: 3,
    bathrooms: 3,
    maxGuests: 7,
    priceFrom: 1850,
    priceTo: 3900,
  },
  'cozy-studio': {
    title: 'Renovated Studio Apartment 2 Min from Beach | Kerem HaTeimanim, Tel Aviv | Or Hakerem',
    description:
      'Charming renovated studio in a historic Ottoman building in Kerem HaTeimanim, Tel Aviv. 2 minutes from Banana Beach and Carmel Market. Perfect for short, medium, or long stays. Book direct and save 15%.',
    keywords:
      'studio apartment Tel Aviv, short-term rental Carmel Market, historic building apartment Tel Aviv, studio near beach Tel Aviv, cozy apartment Kerem HaTeimanim, long-term rental Tel Aviv',
    image: '/studio/lit_angle_1.jpg',
    imageAlt:
      'Cozy renovated studio apartment in historic Ottoman building, Kerem HaTeimanim Tel Aviv',
    bedrooms: 1,
    bathrooms: 1,
    maxGuests: 4,
    priceFrom: 550,
    priceTo: 850,
  },
};

export function getPropertyStructuredData(id: BookablePropertyId) {
  const seo = PROPERTY_SEO[id];
  return {
    '@context': 'https://schema.org',
    '@type': 'LodgingBusiness',
    name: `Or Hakerem — ${id === 'penthouse-jacuzzi' ? 'Luxury Penthouse' : 'Spacious & Cosy Apartment'}`,
    url: `${SITE_URL}/properties/${id}`,
    image: `${SITE_URL}${seo.image}`,
    description: seo.description,
    numberOfRooms: seo.bedrooms,
    priceRange: `₪${seo.priceFrom}–₪${seo.priceTo}`,
    makesOffer: {
      '@type': 'Offer',
      priceSpecification: {
        '@type': 'UnitPriceSpecification',
        price: seo.priceFrom,
        priceCurrency: 'ILS',
        unitText: 'NIGHT',
      },
      availability: 'https://schema.org/InStock',
      url: `${SITE_URL}/properties/${id}`,
    },
    amenityFeature:
      id === 'penthouse-jacuzzi'
        ? [
            { '@type': 'LocationFeatureSpecification', name: 'Private Jacuzzi', value: true },
            { '@type': 'LocationFeatureSpecification', name: 'BBQ Terrace', value: true },
            { '@type': 'LocationFeatureSpecification', name: 'Sea Views', value: true },
            { '@type': 'LocationFeatureSpecification', name: 'WiFi', value: true },
            { '@type': 'LocationFeatureSpecification', name: 'Air Conditioning', value: true },
          ]
        : [
            { '@type': 'LocationFeatureSpecification', name: 'Beach Access', value: true },
            { '@type': 'LocationFeatureSpecification', name: 'Fully Equipped Kitchen', value: true },
            { '@type': 'LocationFeatureSpecification', name: 'WiFi', value: true },
            { '@type': 'LocationFeatureSpecification', name: 'Air Conditioning', value: true },
          ],
    address: {
      '@type': 'PostalAddress',
      streetAddress: '35 Hakovshim Street',
      addressLocality: 'Tel Aviv',
      addressCountry: 'IL',
    },
    containedInPlace: {
      '@type': 'Place',
      name: 'Kerem HaTeimanim',
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Tel Aviv',
        addressCountry: 'IL',
      },
    },
  };
}
