'use client';

import React from 'react';
import {
  ArrowRight,
  Bath,
  BedDouble,
  Calendar,
  CheckCircle,
  Clock,
  MapPin,
  Shield,
  Users,
  UtensilsCrossed,
  Wifi,
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

import ReservationForm from '@/app/reservation/reservation-form';

const nearbyLandmarks = [
  { name: 'Carmel Market', distance: '400m' },
  { name: 'Banana Beach', distance: '600m' },
  { name: 'Nachalat Binyamin', distance: '450m' },
];

const stayHighlights = [
  {
    icon: Wifi,
    title: 'High-speed WiFi',
    description: 'Reliable connectivity for work, planning, and longer stays in the city.',
  },
  {
    icon: UtensilsCrossed,
    title: 'Fully equipped kitchens',
    description: 'Thoughtful essentials for breakfast at home, relaxed evenings, or extended visits.',
  },
  {
    icon: Shield,
    title: 'Secure, private setting',
    description: 'A calm and well-kept address in one of central Tel Aviv’s most characterful neighborhoods.',
  },
  {
    icon: Clock,
    title: 'Responsive hosting',
    description: 'Fast communication before arrival and attentive support throughout the stay.',
  },
];

const neighborhoodHighlights = [
  'Carmel Market for local produce, cafes, and everyday Tel Aviv energy',
  'Banana Beach and the shoreline for morning walks and sunset swims',
  'Nachalat Binyamin for galleries, design, and a lively cultural scene',
  'Rothschild Boulevard and central Tel Aviv within easy reach',
];

const properties = {
  'penthouse-jacuzzi': {
    id: 'penthouse-jacuzzi',
    title: 'Luxury Penthouse',
    location: 'Kerem HaTeimanim, Tel Aviv',
    description: 'This unique penthouse is perfect for both friendly or family stays equipped with amenities like the jacuzzi and barbecue, and live an unforgettable experience in a special place.',
    price: 2500,
    rating: 4.9,
    reviewCount: 128,
    image: '/penthouse/1-jacuzzi-angle.JPEG',
    maxGuests: 6,
    bedrooms: 3,
    bathrooms: 3,
    features: ['Private Jacuzzi', 'BBQ Terrace', 'Sea Views', 'Historic Building']
  },
  'cozy-studio': {
    id: 'cozy-studio',
    title: 'Spacious & Cosy Apartment',
    location: 'Kerem HaTeimanim, Tel Aviv',
    description: 'This renovated apartment is perfect for short and medium term stays. Fully equipped and located a short walk from the beach, Carmel Market, and the entrance to Kerem HaTeimanim.',
    price: 500,
    rating: 4.8,
    reviewCount: 96,
    image: '/studio/lit_angle_1.jpg',
    maxGuests: 3,
    bedrooms: 1,
    bathrooms: 1,
    features: ['Beach Access', 'Fully Equipped', 'Historic Charm', 'City Center']
  },
};

function PropertyCard({ property }: { property: (typeof properties)[keyof typeof properties] }) {
  const propertyHref = `/properties/${property.id}`;
  const reservationHref = `/reservation?property=${encodeURIComponent(property.title)}`;

  return (
    <article
      data-animate="scale"
      className="property-card group relative bg-white rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-700 hover:scale-[1.02] aspect-square cursor-pointer"
    >
      <Link
        href={propertyHref}
        aria-label={`View ${property.title}`}
        className="absolute inset-0 z-10 rounded-2xl"
      />

      {/* Gradient overlay on hover */}
      <div className="pointer-events-none absolute inset-0 z-10 rounded-2xl bg-gradient-to-br from-secondary/5 to-tertiary/5 opacity-0 transition-opacity duration-500 group-hover:opacity-100"></div>
      
      {/* Image Section - Square format - Clean without price and heart */}
      <div className="property-card-image relative h-1/2 overflow-hidden pointer-events-none" data-animate="zoom">
        <Image 
          src={property.image} 
          alt={property.title} 
          fill 
          className="object-cover group-hover:scale-110 transition-transform duration-700" 
          loading="lazy"
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 90vw, 40vw"
        />
        
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
      </div>

      {/* Content Section - Bottom half */}
      <div className="property-card-content pointer-events-none p-6 h-1/2 flex flex-col justify-between relative z-20">
        {/* Title and Location */}
        <div className="property-card-copy mb-4 pointer-events-none">
          <h3 className="font-playfair text-xl font-bold text-primary mb-1 group-hover:text-secondary transition-colors duration-300 line-clamp-2">
            {property.title}
          </h3>
          <div className="flex items-center text-primary/60 mb-2">
            <MapPin className="w-3 h-3 mr-1" />
            <span className="text-xs">{property.location}</span>
          </div>
          <p className="text-primary/80 text-sm leading-relaxed line-clamp-2">{property.description}</p>
        </div>

        {/* Property Stats - Compact */}
        <div className="property-card-stats grid grid-cols-3 gap-2 mb-4 p-3 bg-cream rounded-xl pointer-events-none">
          <div className="text-center">
            <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-1">
              <Users className="w-3 h-3 text-primary" />
            </div>
            <div className="text-xs font-semibold text-primary">{property.maxGuests}</div>
          </div>
          <div className="text-center">
            <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-1">
              <BedDouble className="w-3 h-3 text-primary" />
            </div>
            <div className="text-xs font-semibold text-primary">{property.bedrooms}</div>
          </div>
          <div className="text-center">
            <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-1">
              <Bath className="w-3 h-3 text-primary" />
            </div>
            <div className="text-xs font-semibold text-primary">{property.bathrooms}</div>
          </div>
        </div>

        {/* Price and Action Buttons */}
        <div className="property-card-footer space-y-3">
          {/* Price Display */}
          <div className="text-center pointer-events-none">
            <span className="font-bold text-xl text-primary">{property.price}₪</span>
            <span className="text-primary/70 text-sm ml-1">/night</span>
          </div>

          {/* Action Buttons - Compact */}
          <div className="property-card-actions pointer-events-auto relative z-20 flex gap-2">
            <Link
              href={propertyHref}
              className="property-card-button property-card-button-primary flex-1 bg-gradient-to-r from-primary to-primary-light text-white py-2 px-3 rounded-full font-semibold hover:from-primary-light hover:to-primary transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center justify-center text-sm"
            >
              <span>Details</span>
              <ArrowRight className="w-3 h-3 ml-1" />
            </Link>
            <Link
              href={reservationHref}
              className="button-hover-clean property-card-button property-card-button-secondary bg-gradient-to-r from-secondary to-secondary-light text-primary py-2 px-3 rounded-full font-semibold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center justify-center text-sm"
            >
              <Calendar className="w-3 h-3 mr-1" />
              <span>Book</span>
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}

export default function Properties() {
  return (
    <div className="min-h-screen pt-24 pb-20 bg-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="text-center mb-16" data-animate="fade-up">
          <div className="inline-block mb-4">
            <span className="text-tertiary font-semibold text-lg tracking-wider uppercase">
              Our Accommodations
            </span>
          </div>
          <h1 className="font-playfair text-5xl md:text-6xl font-bold text-primary mb-6 leading-tight" data-animate="text">
            Luxury Apartments in Tel Aviv
          </h1>
        </div>

        {/* Properties Grid - Square Cards */}
        <div id="properties-listing" className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-16 scroll-mt-32" data-animate-group="cards">
          {Object.values(properties).map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>

        <section className="max-w-6xl mx-auto mb-16" data-animate="fade-up">
          <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
            <div className="rounded-3xl bg-white p-8 md:p-10 shadow-xl border border-primary/10">
              <span className="text-secondary font-semibold text-sm md:text-base tracking-[0.2em] uppercase block mb-3">
                Stay Experience
              </span>
              <h2 className="font-playfair text-3xl md:text-4xl font-bold text-primary mb-5">
                A more local way to stay in Tel Aviv
              </h2>
              <p className="text-primary/80 text-lg leading-relaxed">
                Located in Kerem HaTeimanim, our apartments combine modern comfort with the character of one of Tel Aviv&apos;s most established neighborhoods. The setting feels central and connected, yet calmer and more personal than a conventional hotel stay.
              </p>
              <p className="text-primary/80 text-lg leading-relaxed mt-5">
                Whether you are visiting for a weekend by the sea, a longer city stay, or time between business meetings and local plans, Or HaKerem offers a polished base within easy reach of the beach, the market, and the cultural center of the city.
              </p>

              <div className="mt-8 rounded-2xl bg-cream border border-primary/10 px-6 py-6">
                <h3 className="font-playfair text-2xl font-semibold text-primary mb-4">
                  Best enjoyed on foot
                </h3>
                <ul className="space-y-3">
                  {neighborhoodHighlights.map((highlight) => (
                    <li key={highlight} className="flex items-start text-primary/80">
                      <CheckCircle className="w-5 h-5 text-secondary mr-3 mt-0.5 flex-shrink-0" />
                      <span>{highlight}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="relative" data-animate="zoom">
              <div className="relative h-[420px] md:h-[540px] overflow-hidden rounded-3xl shadow-2xl">
                <Image
                  src="/penthouse/7-vue-mer.jpg"
                  alt="Or HaKerem apartment view in Tel Aviv"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 45vw"
                />
              </div>

              <div className="absolute -bottom-5 left-5 right-5 md:left-auto md:right-6 md:max-w-xs rounded-2xl bg-white p-5 shadow-xl border border-primary/10">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-12 h-12 rounded-full bg-secondary/20 flex items-center justify-center text-primary">
                    <CheckCircle className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="font-playfair text-2xl font-bold text-primary">4.9/5</div>
                    <div className="text-sm text-primary/70">Verified guest rating</div>
                  </div>
                </div>
                <p className="text-sm text-primary/75 leading-relaxed">
                  A stay shaped by responsive hosting, strong reviews, and a location guests return to.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="max-w-6xl mx-auto mb-16" data-animate="fade-up">
          <div className="bg-white rounded-3xl p-8 md:p-10 shadow-xl border border-primary/10">
            <div className="text-center mb-8">
              <span className="text-tertiary font-semibold text-sm md:text-base tracking-[0.2em] uppercase block mb-3">
                Included in Every Stay
              </span>
              <h2 className="font-playfair text-3xl md:text-4xl font-bold text-primary">
                Thoughtful essentials, consistently delivered
              </h2>
            </div>

            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
              {stayHighlights.map((highlight) => (
                <div
                  key={highlight.title}
                  className="rounded-2xl bg-cream border border-primary/10 p-6"
                >
                  <div className="w-12 h-12 rounded-full bg-secondary/20 text-primary flex items-center justify-center mb-4">
                    <highlight.icon className="w-6 h-6" />
                  </div>
                  <h3 className="font-playfair text-2xl font-semibold text-primary mb-3">
                    {highlight.title}
                  </h3>
                  <p className="text-primary/75 leading-relaxed">
                    {highlight.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="max-w-4xl mx-auto mb-16" data-animate="fade-up">
          <div className="bg-white rounded-3xl p-8 md:p-10 shadow-xl border border-primary/10">
            <div className="text-center mb-8">
              <span className="text-secondary font-semibold text-sm md:text-base tracking-[0.2em] uppercase block mb-3">
                Nearby Landmarks
              </span>
              <h2 className="font-playfair text-3xl md:text-4xl font-bold text-primary">
                Prime location in Tel Aviv
              </h2>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
              {nearbyLandmarks.map((landmark) => (
                <div
                  key={landmark.name}
                  className="rounded-2xl bg-cream border border-primary/10 px-5 py-6 text-center"
                >
                  <div className="w-10 h-10 mx-auto mb-4 rounded-full bg-secondary/20 text-primary flex items-center justify-center">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <h3 className="font-playfair text-xl font-semibold text-primary mb-2">
                    {landmark.name}
                  </h3>
                  <p className="text-primary/70 font-medium">{landmark.distance}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="max-w-4xl mx-auto" data-animate="fade-up">
          <div className="text-center mb-8">
            <span className="text-tertiary font-semibold text-sm md:text-base tracking-[0.2em] uppercase block mb-3">
              Reservation
            </span>
            <h2 className="font-playfair text-3xl md:text-4xl font-bold text-primary mb-4">
              Request your stay
            </h2>
            <p className="text-primary/80 text-lg leading-relaxed max-w-2xl mx-auto">
              Share your dates and preferred apartment, and our team will come back to you with availability and next steps.
            </p>
          </div>

          <ReservationForm embedded showIntro={false} />
        </section>
      </div>
    </div>
  );
}
