'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { Star, Calendar, Heart, MapPin, Users, BedDouble, Bath, Wifi, Car, UtensilsCrossed } from 'lucide-react';
import Image from 'next/image';

const properties = {
  'penthouse-jacuzzi': {
    id: 'penthouse-jacuzzi',
    title: 'Penthouse with Jacuzzi & BBQ',
    location: 'Kerem HaTeimanim, Tel Aviv',
    description: 'Luxurious penthouse featuring a private jacuzzi, BBQ area, and breathtaking sea views.',
    price: 500,
    rating: 4.9,
    reviewCount: 128,
    image: '/penthouse/1-jacuzzi-angle.JPEG',
    maxGuests: 6,
    bedrooms: 3,
    bathrooms: 2,
    amenities: ['Jacuzzi', 'BBQ', 'Sea View', 'WiFi']
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
    maxGuests: 2,
    bedrooms: 1,
    bathrooms: 1,
    amenities: ['Beach', 'WiFi', 'Kitchen', 'AC']
  },
};

function PropertyCard({ property }: { property: (typeof properties)[keyof typeof properties] }) {
  const router = useRouter();

  return (
    <div className="group relative bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 hover:scale-[1.02] aspect-square">
      {/* Gradient overlay on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-secondary/10 to-tertiary/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"></div>
      
      {/* Image Section - Square */}
      <div className="relative h-1/2 overflow-hidden">
        <Image 
          src={property.image} 
          alt={property.title} 
          fill 
          className="object-cover group-hover:scale-110 transition-transform duration-700" 
        />
        
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent"></div>
        
        {/* Price badge */}
        <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm px-3 py-1 rounded-full">
          <span className="font-bold text-primary">${property.price}</span>
          <span className="text-primary/70 text-sm">/night</span>
        </div>
        
        {/* Heart button */}
        <button
          className="absolute top-4 right-4 p-2 bg-white/95 backdrop-blur-sm rounded-full shadow-lg hover:bg-white transition-all duration-300 hover:scale-110"
          onClick={(e) => {
            e.stopPropagation();
            // Handle favorite
          }}
        >
          <Heart className="w-4 h-4 text-primary" />
        </button>
        
        {/* Rating badge */}
        <div className="absolute bottom-4 right-4 bg-white/95 backdrop-blur-sm px-2 py-1 rounded-full flex items-center">
          <Star className="w-3 h-3 text-tertiary fill-current mr-1" />
          <span className="font-semibold text-primary text-sm">{property.rating}</span>
        </div>
      </div>

      {/* Content Section - Compact */}
      <div className="p-5 h-1/2 flex flex-col justify-between relative z-20">
        {/* Title and Location */}
        <div>
          <h3 className="font-playfair text-lg font-bold text-primary mb-1 group-hover:text-secondary transition-colors duration-300 line-clamp-2">
            {property.title}
          </h3>
          <div className="flex items-center text-primary/60 mb-2">
            <MapPin className="w-3 h-3 mr-1" />
            <span className="text-xs">{property.location}</span>
          </div>
          <p className="text-primary/80 text-sm leading-relaxed line-clamp-2 mb-3">{property.description}</p>
        </div>

        {/* Property Stats - Compact Grid */}
        <div className="grid grid-cols-3 gap-2 mb-3 p-2 bg-cream rounded-lg">
          <div className="text-center">
            <Users className="w-4 h-4 mx-auto mb-1 text-primary" />
            <div className="text-xs text-primary/80">{property.maxGuests}</div>
          </div>
          <div className="text-center">
            <BedDouble className="w-4 h-4 mx-auto mb-1 text-primary" />
            <div className="text-xs text-primary/80">{property.bedrooms}</div>
          </div>
          <div className="text-center">
            <Bath className="w-4 h-4 mx-auto mb-1 text-primary" />
            <div className="text-xs text-primary/80">{property.bathrooms}</div>
          </div>
        </div>

        {/* Amenities - Compact */}
        <div className="mb-3">
          <div className="flex flex-wrap gap-1">
            {property.amenities.map((amenity, index) => (
              <span 
                key={index}
                className="px-2 py-1 bg-secondary/20 text-primary text-xs rounded-full"
              >
                {amenity}
              </span>
            ))}
          </div>
        </div>

        {/* Action Buttons - Compact */}
        <div className="flex gap-2">
          <button
            onClick={() => router.push(`/properties/${property.id}`)}
            className="flex-1 bg-gradient-to-r from-primary to-primary-light text-white py-2 px-3 rounded-full font-semibold text-sm hover:from-primary-light hover:to-primary transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
          >
            Details
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              router.push('/reservation');
            }}
            className="bg-gradient-to-r from-secondary to-secondary-light text-primary py-2 px-3 rounded-full font-semibold text-sm hover:from-secondary-light hover:to-secondary transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center"
          >
            <Calendar className="w-3 h-3 mr-1" />
            Book
          </button>
        </div>
      </div>

      {/* Decorative corner elements */}
      <div className="absolute top-3 left-3 w-1.5 h-1.5 bg-secondary rounded-full opacity-50 group-hover:opacity-100 transition-opacity duration-300"></div>
      <div className="absolute bottom-3 right-3 w-1.5 h-1.5 bg-tertiary rounded-full opacity-50 group-hover:opacity-100 transition-opacity duration-300"></div>
    </div>
  );
}

export default function Properties() {
  return (
    <div className="min-h-screen pt-24 pb-20 bg-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section - Compact */}
        <div className="text-center mb-12">
          <div className="inline-block mb-3">
            <span className="text-tertiary font-semibold tracking-wider uppercase">
              Our Accommodations
            </span>
          </div>
          <h1 className="font-playfair text-4xl md:text-5xl font-bold text-primary mb-4 leading-tight">
            Luxury Properties
          </h1>
          <p className="text-primary/80 text-lg max-w-2xl mx-auto leading-relaxed">
            Discover our premium accommodations in Tel Aviv's vibrant Kerem HaTeimanim neighborhood.
          </p>
        </div>

        {/* Properties Grid - Square Layout with More Space */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 max-w-7xl mx-auto mb-12">
          {Object.values(properties).map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
          
          {/* Coming Soon Card */}
          <div className="group relative bg-white/50 border-2 border-dashed border-primary/30 rounded-2xl overflow-hidden aspect-square flex items-center justify-center hover:border-primary/50 transition-all duration-300">
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🏠</span>
              </div>
              <h3 className="font-playfair text-lg font-bold text-primary mb-2">Coming Soon</h3>
              <p className="text-primary/60 text-sm">More luxury properties</p>
            </div>
          </div>
          
          {/* Add Property Card */}
          <div className="group relative bg-gradient-to-br from-secondary/20 to-tertiary/20 rounded-2xl overflow-hidden aspect-square flex items-center justify-center hover:from-secondary/30 hover:to-tertiary/30 transition-all duration-300 cursor-pointer">
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-white/80 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                <span className="text-2xl text-primary">+</span>
              </div>
              <h3 className="font-playfair text-lg font-bold text-primary mb-2">List Your Property</h3>
              <p className="text-primary/60 text-sm">Join our collection</p>
            </div>
          </div>
        </div>

        {/* Call to Action - Compact */}
        <div className="text-center">
          <div className="inline-block relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-secondary to-tertiary rounded-full blur-lg opacity-50 group-hover:opacity-75 transition-opacity duration-300"></div>
            <button
              onClick={() => window.location.href = '/reservation'}
              className="relative inline-flex items-center bg-gradient-to-r from-primary to-primary-light text-white px-6 py-3 rounded-full font-semibold hover:from-primary-light hover:to-primary transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:scale-105"
            >
              <Calendar className="w-5 h-5 mr-2" />
              <span>Book Your Stay</span>
            </button>
          </div>
          <p className="text-primary/70 text-sm mt-3 font-medium">
            Experience luxury in Tel Aviv's heart
          </p>
        </div>
      </div>
    </div>
  );
}