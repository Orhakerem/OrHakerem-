import React from 'react';
import {
  ArrowRight,
  Bath,
  BedDouble,
  Calendar,
  CheckCircle,
  Clock,
  ExternalLink,
  MapPin,
  Shield,
  Users,
  UtensilsCrossed,
  Wifi,
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

import LiquidGlassCTA from '@/components/LiquidGlassCTA';

export const dynamic = 'force-dynamic';

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
      className="property-card relative aspect-square overflow-hidden rounded-2xl bg-white shadow-xl"
    >
      <Link
        href={propertyHref}
        aria-label={`View ${property.title}`}
        className="absolute inset-0 z-10 rounded-2xl"
      />

      {/* Image Section - Square format - Clean without price and heart */}
      <div className="property-card-image relative h-1/2 overflow-hidden pointer-events-none" data-animate="zoom">
        <Image 
          src={property.image} 
          alt={property.title} 
          fill 
          className="object-cover" 
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
          <h3 className="mb-1 line-clamp-2 font-playfair text-xl font-bold text-primary">
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

        {/* Action Buttons */}
        <div className="property-card-footer space-y-3">
          {/* Action Buttons - Compact */}
          <div className="property-card-actions pointer-events-auto relative z-20 flex gap-2">
            <Link
              href={propertyHref}
              className="property-card-button property-card-button-primary button-hover-clean flex flex-1 items-center justify-center rounded-full bg-gradient-to-r from-primary to-primary-light px-3 py-2 text-sm font-semibold text-white shadow-lg"
            >
              <span>Details</span>
              <ArrowRight className="w-3 h-3 ml-1" />
            </Link>
            <LiquidGlassCTA
              href={reservationHref}
              className="liquid-cta--sm liquid-cta--light property-card-button property-card-button-secondary"
            >
              <Calendar className="w-3 h-3 mr-1" />
              <span>Book</span>
            </LiquidGlassCTA>
          </div>
        </div>
      </div>
    </article>
  );
}

export default function Properties() {
  return (
    <div className="min-h-screen bg-cream pt-28 pb-20 md:pt-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="text-center mb-16" data-animate="fade-up">
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

        <div className="max-w-6xl mx-auto mb-16" data-animate="fade-up">
          <div className="rounded-2xl bg-gradient-to-r from-secondary/20 via-tertiary/15 to-secondary/20 border border-tertiary/30 px-6 py-5 md:px-8 md:py-6 text-center shadow-md">
            <p className="font-playfair text-xl md:text-2xl font-semibold text-primary">
              Booking directly with us is up to 15% cheaper than platforms!
            </p>
          </div>
        </div>

        <section className="max-w-6xl mx-auto mb-16" data-animate="fade-up">
          <div className="text-center mb-10">
            <span className="text-tertiary font-semibold text-sm md:text-base tracking-[0.2em] uppercase block mb-3">
              Included in Every Stay
            </span>
            <h2 className="font-playfair text-3xl md:text-4xl font-bold text-primary">
              Thoughtful essentials, consistently delivered
            </h2>
          </div>

          <div className="grid gap-10 md:grid-cols-2 xl:grid-cols-4">
            {stayHighlights.map((highlight) => (
              <div key={highlight.title}>
                <highlight.icon className="w-7 h-7 text-tertiary mb-4" />
                <h3 className="font-playfair text-2xl font-semibold text-primary mb-3">
                  {highlight.title}
                </h3>
                <p className="text-primary/75 leading-relaxed">
                  {highlight.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section className="max-w-4xl mx-auto mb-16" data-animate="fade-up">
          <div className="text-center mb-10">
            <span className="text-tertiary font-semibold text-sm md:text-base tracking-[0.2em] uppercase block mb-3">
              Nearby Landmarks
            </span>
            <h2 className="font-playfair text-3xl md:text-4xl font-bold text-primary">
              Prime location in Tel Aviv
            </h2>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            {nearbyLandmarks.map((landmark) => (
              <div key={landmark.name} className="text-center">
                <MapPin className="w-5 h-5 mx-auto mb-3 text-tertiary" />
                <h3 className="font-playfair text-xl font-semibold text-primary mb-1">
                  {landmark.name}
                </h3>
                <p className="text-primary/70 font-medium">{landmark.distance}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="max-w-6xl mx-auto mb-16" data-animate="fade-up">
          <div className="text-center mb-10">
            <span className="text-tertiary font-semibold text-sm md:text-base tracking-[0.2em] uppercase block mb-3">
              Also Available On
            </span>
            <h2 className="font-playfair text-3xl md:text-4xl font-bold text-primary">
              Our listings on different platforms
            </h2>
            <p className="text-primary/70 mt-4 max-w-2xl mx-auto">
              Find us on the platforms you trust. Remember, booking directly with us is up to 15% cheaper.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <div className="rounded-2xl bg-white p-6 md:p-8 shadow-xl border border-primary/10">
              <h3 className="font-playfair text-2xl font-semibold text-primary mb-2">
                Luxury Penthouse
              </h3>
              <p className="text-primary/70 text-sm mb-5">Available on Airbnb and Booking.com</p>
              <div className="flex flex-col sm:flex-row gap-3 items-center">
                <LiquidGlassCTA
                  href="https://www.airbnb.com/rooms/1247678225456455722"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="liquid-cta--sm liquid-cta--light"
                >
                  <span>View on Airbnb</span>
                  <ExternalLink className="w-4 h-4 ml-2" />
                </LiquidGlassCTA>
                <LiquidGlassCTA
                  href="https://www.booking.com/hotel/il/penthouse-with-jacuzzi-bbq-2mn-from-sea-or-hakerem.fr.html?label=gen173bo-10CAsoakIycGVudGhvdXNlLXdpdGgtamFjdXp6aS1iYnEtMm1uLWZyb20tc2VhLW9yLWhha2VyZW1IM1gDaGqIAQGYATO4AQfIAQzYAQPoAQH4AQGIAgGYAgaoAgG4ArzUsNAGwAIB0gIkODQ1YTJkYmItOWI2NS00YWUwLTg4ZGEtNGUwMGJiNTAyMjZl2AIB4AIB&sid=d76cf1f6818f7b442a6ed091d7429070&dist=0&keep_landing=1&sb_price_type=total&type=total&"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="liquid-cta--sm liquid-cta--light"
                >
                  <span>View on Booking.com</span>
                  <ExternalLink className="w-4 h-4 ml-2" />
                </LiquidGlassCTA>
              </div>
            </div>

            <div className="rounded-2xl bg-white p-6 md:p-8 shadow-xl border border-primary/10">
              <h3 className="font-playfair text-2xl font-semibold text-primary mb-2">
                Spacious & Cosy Apartment
              </h3>
              <p className="text-primary/70 text-sm mb-5">Available on Airbnb</p>
              <div className="flex flex-col sm:flex-row gap-3 items-center">
                <LiquidGlassCTA
                  href="https://www.airbnb.com/rooms/1273005083237819919"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="liquid-cta--sm liquid-cta--light"
                >
                  <span>View on Airbnb</span>
                  <ExternalLink className="w-4 h-4 ml-2" />
                </LiquidGlassCTA>
              </div>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}
