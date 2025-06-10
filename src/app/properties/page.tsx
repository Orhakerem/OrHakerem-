'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { Calendar, MapPin, Users, BedDouble, Bath, ArrowRight } from 'lucide-react';
import Image from 'next/image';

const properties = {
  'penthouse-jacuzzi': {
    id: 'penthouse-jacuzzi',
    title: 'Luxury Penthouse',
    location: 'Kerem HaTeimanim, Tel Aviv',
    description: 'Luxurious penthouse featuring a private jacuzzi, BBQ area, and breathtaking sea views. Perfect for families and groups seeking an unforgettable experience.',
    price: 500,
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
    description: 'Completely renovated studio perfect for short to long term stays. Modern amenities in a charming historic setting.',
    price: 150,
    rating: 4.8,
    reviewCount: 96,
    image: '/studio/1.jpg',
    maxGuests: 3,
    bedrooms: 1,
    bathrooms: 1,
    features: ['Beach Access', 'Fully Equipped', 'Historic Charm', 'City Center']
  },
};

function PropertyCard({ property }: { property: (typeof properties)[keyof typeof properties] }) {
  const router = useRouter();

  return (
    <div 
      className="group relative bg-white rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-700 hover:scale-[1.02] aspect-square cursor-pointer"
      onClick={() => router.push(`/properties/${property.id}`)}
    >
      {/* Gradient overlay on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-secondary/5 to-tertiary/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10"></div>
      
      {/* Image Section - Square format - Clean without price and heart */}
      <div className="relative h-1/2 overflow-hidden">
        <Image 
          src={property.image} 
          alt={property.title} 
          fill 
          className="object-cover group-hover:scale-110 transition-transform duration-700" 
        />
        
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
      </div>

      {/* Content Section - Bottom half */}
      <div className="p-6 h-1/2 flex flex-col justify-between relative z-20">
        {/* Title and Location */}
        <div className="mb-4">
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
        <div className="grid grid-cols-3 gap-2 mb-4 p-3 bg-cream rounded-xl">
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
        <div className="space-y-3">
          {/* Price Display */}
          <div className="text-center">
            <span className="font-bold text-xl text-primary">${property.price}</span>
            <span className="text-primary/70 text-sm ml-1">/night</span>
          </div>

          {/* Action Buttons - Compact */}
          <div className="flex gap-2">
            <button
              onClick={(e) => {
                e.stopPropagation();
                router.push(`/properties/${property.id}`);
              }}
              className="flex-1 bg-gradient-to-r from-primary to-primary-light text-white py-2 px-3 rounded-full font-semibold hover:from-primary-light hover:to-primary transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center justify-center text-sm"
            >
              <span>Details</span>
              <ArrowRight className="w-3 h-3 ml-1" />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                router.push('/reservation');
              }}
              className="bg-gradient-to-r from-secondary to-secondary-light text-primary py-2 px-3 rounded-full font-semibold hover:from-secondary-light hover:to-secondary transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center justify-center text-sm"
            >
              <Calendar className="w-3 h-3 mr-1" />
              <span>Book</span>
            </button>
          </div>
        </div>
      </div>

      {/* Decorative corner elements */}
      <div className="absolute top-3 left-3 w-2 h-2 bg-secondary rounded-full opacity-50 group-hover:opacity-100 transition-opacity duration-300"></div>
      <div className="absolute bottom-3 right-3 w-2 h-2 bg-tertiary rounded-full opacity-50 group-hover:opacity-100 transition-opacity duration-300"></div>
    </div>
  );
}

export default function Properties() {
  return (
    <div className="min-h-screen pt-24 pb-20 bg-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="inline-block mb-4">
            <span className="text-tertiary font-semibold text-lg tracking-wider uppercase">
              Our Accommodations
            </span>
          </div>
          <h1 className="font-playfair text-5xl md:text-6xl font-bold text-primary mb-6 leading-tight">
            Properties
          </h1>
          <p className="text-primary/80 text-xl max-w-3xl mx-auto leading-relaxed">
            Discover our premium accommodations in Tel Aviv&apos;s vibrant Kerem HaTeimanim neighborhood. 
            Each property offers a unique blend of modern luxury and historic charm.
          </p>
        </div>

        {/* Properties Grid - Square Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-16">
          {Object.values(properties).map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>

        {/* Call to Action Section */}
        <div className="text-center bg-gradient-to-br from-primary via-primary to-primary-light rounded-3xl p-12 relative overflow-hidden">
          {/* Background decorative elements */}
          <div className="absolute inset-0">
            <div className="absolute top-10 left-10 w-32 h-32 bg-secondary/10 rounded-full blur-3xl"></div>
            <div className="absolute bottom-10 right-10 w-40 h-40 bg-tertiary/10 rounded-full blur-3xl"></div>
          </div>
          
          <div className="relative z-10">
            <h2 className="font-playfair text-3xl md:text-4xl font-bold text-white mb-4">
              Ready to Experience Luxury?
            </h2>
            <p className="text-white/90 text-lg mb-8 max-w-2xl mx-auto">
              Book your stay today and discover the perfect blend of comfort, style, and location 
              in the heart of Tel Aviv.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <div className="inline-block relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-secondary to-tertiary rounded-full blur-lg opacity-50 group-hover:opacity-75 transition-opacity duration-300"></div>
                <button
                  onClick={() => window.location.href = '/reservation'}
                  className="relative inline-flex items-center bg-gradient-to-r from-secondary to-secondary-light text-primary px-8 py-4 rounded-full font-semibold text-lg hover:from-secondary-light hover:to-secondary transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:scale-105"
                >
                  <Calendar className="w-6 h-6 mr-3" />
                  <span>Book Your Stay</span>
                </button>
              </div>
              
              <button
                onClick={() => window.location.href = '/concierge-services'}
                className="inline-flex items-center bg-white/20 backdrop-blur-sm text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-white/30 transition-all duration-300 border border-white/30"
              >
                <span>Explore Services</span>
                <ArrowRight className="w-6 h-6 ml-3" />
              </button>
            </div>
            
            <p className="text-white/70 text-sm mt-6 font-medium">
              Experience luxury in Tel Aviv&apos;s most charming neighborhood
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}