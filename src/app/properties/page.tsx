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
    longDescription: 'Welcome to this unique penthouse in the heart of Tel Aviv, a stone\'s throw from the beach and Shouk Hacarmel. Ideal for stays with friends or families and for private events.',
    price: 500,
    rating: 4.9,
    reviewCount: 128,
    image: '/penthouse/1-jacuzzi-angle.JPEG',
    maxGuests: 6,
    bedrooms: 3,
    bathrooms: 2,
    amenities: ['Jacuzzi', 'BBQ Area', 'Sea View', 'WiFi', 'Parking', 'Kitchen']
  },
  'cozy-studio': {
    id: 'cozy-studio',
    title: 'Cozy Studio, 2 Minutes from Sea',
    location: 'Kerem HaTeimanim, Tel Aviv',
    description: 'Completely renovated studio perfect for short to long term stays.',
    longDescription: 'Welcome to my precious accommodation in the heart of Tel Aviv! This completely renovated studio is perfect for short, medium and long term rentals.',
    price: 150,
    rating: 4.8,
    reviewCount: 96,
    image: '/studio/1.jpg',
    maxGuests: 2,
    bedrooms: 1,
    bathrooms: 1,
    amenities: ['Beach Access', 'WiFi', 'Kitchen', 'AC', 'Smart TV', 'Sofa Bed']
  },
};

function PropertyCard({ property }: { property: (typeof properties)[keyof typeof properties] }) {
  const router = useRouter();

  return (
    <div className="group relative bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 hover:scale-[1.02]">
      {/* Gradient overlay on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-secondary/10 to-tertiary/10 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"></div>
      
      {/* Image Section */}
      <div className="relative h-80 overflow-hidden">
        <Image 
          src={property.image} 
          alt={property.title} 
          fill 
          className="object-cover group-hover:scale-110 transition-transform duration-700" 
        />
        
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
        
        {/* Price badge */}
        <div className="absolute top-6 left-6 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full">
          <span className="font-bold text-primary text-lg">${property.price}</span>
          <span className="text-primary/70 text-sm ml-1">/ night</span>
        </div>
        
        {/* Heart button */}
        <button
          className="absolute top-6 right-6 p-3 bg-white/90 backdrop-blur-sm rounded-full shadow-lg hover:bg-white transition-all duration-300 hover:scale-110"
          onClick={(e) => {
            e.stopPropagation();
            // Handle favorite
          }}
        >
          <Heart className="w-5 h-5 text-primary" />
        </button>
        
        {/* Rating badge */}
        <div className="absolute bottom-6 right-6 bg-white/90 backdrop-blur-sm px-3 py-2 rounded-full flex items-center">
          <Star className="w-4 h-4 text-tertiary fill-current mr-1" />
          <span className="font-semibold text-primary text-sm">{property.rating}</span>
          <span className="text-primary/60 text-xs ml-1">({property.reviewCount})</span>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-8 relative z-20">
        {/* Title and Location */}
        <div className="mb-6">
          <h3 className="font-playfair text-2xl font-bold text-primary mb-2 group-hover:text-secondary transition-colors duration-300">
            {property.title}
          </h3>
          <div className="flex items-center text-primary/60 mb-3">
            <MapPin className="w-4 h-4 mr-2" />
            <span className="text-sm">{property.location}</span>
          </div>
          <p className="text-primary/80 leading-relaxed">{property.longDescription}</p>
        </div>

        {/* Property Stats */}
        <div className="grid grid-cols-3 gap-4 mb-6 p-4 bg-cream rounded-xl">
          <div className="text-center">
            <Users className="w-5 h-5 mx-auto mb-1 text-primary" />
            <div className="text-xs text-primary/80">Up to {property.maxGuests}</div>
            <div className="text-xs text-primary/60">guests</div>
          </div>
          <div className="text-center">
            <BedDouble className="w-5 h-5 mx-auto mb-1 text-primary" />
            <div className="text-xs text-primary/80">{property.bedrooms}</div>
            <div className="text-xs text-primary/60">bedroom{property.bedrooms > 1 ? 's' : ''}</div>
          </div>
          <div className="text-center">
            <Bath className="w-5 h-5 mx-auto mb-1 text-primary" />
            <div className="text-xs text-primary/80">{property.bathrooms}</div>
            <div className="text-xs text-primary/60">bathroom{property.bathrooms > 1 ? 's' : ''}</div>
          </div>
        </div>

        {/* Amenities */}
        <div className="mb-6">
          <h4 className="font-semibold text-primary mb-3">Key Amenities</h4>
          <div className="flex flex-wrap gap-2">
            {property.amenities.slice(0, 4).map((amenity, index) => (
              <span 
                key={index}
                className="px-3 py-1 bg-secondary/20 text-primary text-xs rounded-full"
              >
                {amenity}
              </span>
            ))}
            {property.amenities.length > 4 && (
              <span className="px-3 py-1 bg-tertiary/20 text-primary text-xs rounded-full">
                +{property.amenities.length - 4} more
              </span>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3">
          <button
            onClick={() => router.push(`/properties/${property.id}`)}
            className="flex-1 bg-gradient-to-r from-primary to-primary-light text-white py-3 px-6 rounded-full font-semibold hover:from-primary-light hover:to-primary transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
          >
            View Details
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              router.push('/reservation');
            }}
            className="bg-gradient-to-r from-secondary to-secondary-light text-primary py-3 px-6 rounded-full font-semibold hover:from-secondary-light hover:to-secondary transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center"
          >
            <Calendar className="w-4 h-4 mr-2" />
            Book Now
          </button>
        </div>
      </div>

      {/* Decorative corner elements */}
      <div className="absolute top-4 left-4 w-2 h-2 bg-secondary rounded-full opacity-50 group-hover:opacity-100 transition-opacity duration-300"></div>
      <div className="absolute bottom-4 right-4 w-2 h-2 bg-tertiary rounded-full opacity-50 group-hover:opacity-100 transition-opacity duration-300"></div>
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
            Luxury Properties
          </h1>
          <p className="text-primary/80 text-xl max-w-3xl mx-auto leading-relaxed">
            Discover our carefully curated collection of premium accommodations in the heart of Tel Aviv, 
            each offering unique experiences and exceptional comfort.
          </p>
        </div>

        {/* Properties Grid */}
        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {Object.values(properties).map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <div className="inline-block relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-secondary to-tertiary rounded-full blur-lg opacity-50 group-hover:opacity-75 transition-opacity duration-300"></div>
            <button
              onClick={() => window.location.href = '/reservation'}
              className="relative inline-flex items-center bg-gradient-to-r from-primary to-primary-light text-white px-8 py-4 rounded-full font-semibold text-lg hover:from-primary-light hover:to-primary transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:scale-105"
            >
              <Calendar className="w-6 h-6 mr-3" />
              <span>Book Your Stay Today</span>
            </button>
          </div>
          <p className="text-primary/70 text-sm mt-4 font-medium">
            Experience luxury accommodations in Tel Aviv's most vibrant neighborhood
          </p>
        </div>
      </div>
    </div>
  );
}