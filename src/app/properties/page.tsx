'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { Star, Calendar, Heart, MapPin } from 'lucide-react';
import Image from 'next/image';

const properties = {
  'penthouse-jacuzzi': {
    id: 'penthouse-jacuzzi',
    title: 'Penthouse with Jacuzzi & BBQ',
    location: 'Kerem HaTeimanim, Tel Aviv',
    description:
      'Luxurious penthouse featuring a private jacuzzi, BBQ area, and breathtaking sea views.',
    price: 500,
    rating: 4.9,
    reviewCount: 128,
    image: '/penthouse/1-jacuzzi-angle.JPEG',
  },
  'cozy-studio': {
    id: 'cozy-studio',
    title: 'Cozy Studio, 2 Minutes from Sea',
    location: 'Kerem HaTeimanim, Tel Aviv',
    description: 'Completely renovated studio perfect for short to long term stays.',
    price: 150,
    rating: 4.8,
    reviewCount: 96,
    image: '/studio/1.jpg',
  },
};

function PropertyCard({ property }: { property: (typeof properties)[keyof typeof properties] }) {
  const router = useRouter();

  return (
    <div
      className="bg-white rounded-xl shadow-lg overflow-hidden cursor-pointer transform transition-all hover:scale-[1.02]"
      onClick={() => router.push(`/properties/${property.id}`)}
    >
      <div className="relative h-64">
        <Image src={property.image} width={500} height={500} alt={property.title} className="w-full h-full object-cover" />
        <button
          className="absolute top-4 right-4 p-2 bg-white rounded-full shadow-lg hover:bg-gray-100"
          onClick={e => {
            e.stopPropagation();
            // Handle favorite
          }}
        >
          <Heart className="w-5 h-5 text-navy" />
        </button>
      </div>
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="font-playfair text-xl font-bold text-navy mb-1">{property.title}</h3>
            <div className="flex items-center text-navy/60 text-sm">
              <MapPin className="w-4 h-4 mr-1" />
              {property.location}
            </div>
          </div>
          <div className="flex items-center">
            <Star className="w-5 h-5 text-gold fill-current" />
            <span className="ml-1 font-semibold">{property.rating}</span>
            <span className="text-navy/60 ml-1">({property.reviewCount})</span>
          </div>
        </div>
        <p className="text-navy/80 mb-4">{property.description}</p>
        <div className="flex items-center justify-between">
          <div className="text-navy">
            <span className="font-bold text-xl">${property.price}</span>
            <span className="text-navy/60"> / night</span>
          </div>
          <button
            onClick={e => {
              e.stopPropagation();
              router.push('/reservation');
            }}
            className="bg-gold text-navy px-4 py-2 rounded-full font-semibold hover:bg-gold/90 transition flex items-center"
          >
            <Calendar className="w-4 h-4 mr-2" />
            Book Now
          </button>
        </div>
      </div>
    </div>
  );
}

export default function Properties() {
  return (
    <div className="pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-center font-playfair text-4xl font-bold text-navy mb-12">
          Our Properties
        </h1>
        <div className="grid md:grid-cols-2 gap-8">
          {Object.values(properties).map(property => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>
      </div>
    </div>
  );
}