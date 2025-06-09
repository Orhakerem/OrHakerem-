'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { Star, Calendar, Heart, MapPin, Users, BedDouble, Bath, ArrowRight } from 'lucide-react';
import Image from 'next/image';

const properties = {
  'penthouse-jacuzzi': {
    id: 'penthouse-jacuzzi',
    title: 'Penthouse with Jacuzzi & BBQ',
    location: 'Kerem HaTeimanim, Tel Aviv',
    description: 'Luxurious penthouse featuring a private jacuzzi, BBQ area, and breathtaking sea views. Perfect for families and groups seeking an unforgettable experience.',
    price: 500,
    rating: 4.9,
    reviewCount: 128,
    image: '/penthouse/1-jacuzzi-angle.JPEG',
    maxGuests: 6,
    bedrooms: 3,
    bathrooms: 2,
    features: ['Private Jacuzzi', 'BBQ Terrace', 'Sea Views', 'Historic Building']
  },
  'cozy-studio': {
    id: 'cozy-studio',
    title: 'Cozy Studio, 2 Minutes from Sea',
    location: 'Kerem HaTeimanim, Tel Aviv',
    description: 'Completely renovated studio perfect for short to long term stays. Modern amenities in a charming historic setting.',
    price: 150,
    rating: 4.8,
    reviewCount: 96,
    image: '/studio/1.jpg',
    maxGuests: 2,
    bedrooms: 1,
    bathrooms: 1,
    features: ['Beach Access', 'Fully Equipped', 'Historic Charm', 'City Center']
  },
};

function PropertyCard({ property }: { property: (typeof properties)[keyof typeof properties] }) {
  const router = useRouter();

  return (
    <div className="group relative bg-white rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-700 hover:scale-[1.02]">
      {/* Gradient overlay on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-secondary/5 to-tertiary/5 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10"></div>
      
      {/* Image Section */}
      <div className="relative h-80 overflow-hidden">
        <Image 
          src={property.image} 
          alt={property.title} 
          fill 
          className="object-cover group-hover:scale-110 transition-transform duration-700" 
        />
        
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
        
        {/* Price badge - Enhanced */}
        <div className="absolute top-6 left-6 bg-white/95 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg">
          <span className="font-bold text-primary text-lg">${property.price}</span>
          <span className="text-primary/70 text-sm ml-1">/night</span>
        </div>
        
        {/* Heart button - Enhanced */}
        <button
          className="absolute top-6 right-6 p-3 bg-white/95 backdrop-blur-sm rounded-full shadow-lg hover:bg-white transition-all duration-300 hover:scale-110"
          onClick={(e) => {
            e.stopPropagation();
            // Handle favorite
          }}
        >
          <Heart className="w-5 h-5 text-primary" />
        </button>
        
        {/* Rating badge - Enhanced */}
        <div className="absolute bottom-6 right-6 bg-white/95 backdrop-blur-sm px-3 py-2 rounded-full flex items-center shadow-lg">
          <Star className="w-4 h-4 text-tertiary fill-current mr-1" />
          <span className="font-semibold text-primary">{property.rating}</span>
          <span className="text-primary/60 text-sm ml-1">({property.reviewCount})</span>
        </div>
      </div>

      {/* Content Section - Enhanced */}
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
          <p className="text-primary/80 leading-relaxed">{property.description}</p>
        </div>

        {/* Property Stats - Enhanced Grid */}
        <div className="grid grid-cols-3 gap-4 mb-6 p-4 bg-cream rounded-2xl">
          <div className="text-center">
            <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-2">
              <Users className="w-5 h-5 text-primary" />
            </div>
            <div className="text-sm font-semibold text-primary">{property.maxGuests} Guests</div>
          </div>
          <div className="text-center">
            <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-2">
              <BedDouble className="w-5 h-5 text-primary" />
            </div>
            <div className="text-sm font-semibold text-primary">{property.bedrooms} Bedroom{property.bedrooms > 1 ? 's' : ''}</div>
          </div>
          <div className="text-center">
            <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-2">
              <Bath className="w-5 h-5 text-primary" />
            </div>
            <div className="text-sm font-semibold text-primary">{property.bathrooms} Bath{property.bathrooms > 1 ? 's' : ''}</div>
          </div>
        </div>

        {/* Features - Enhanced */}
        <div className="mb-6">
          <h4 className="font-semibold text-primary mb-3">Key Features</h4>
          <div className="grid grid-cols-2 gap-2">
            {property.features.map((feature, index) => (
              <div 
                key={index}
                className="flex items-center p-2 bg-secondary/10 rounded-lg"
              >
                <div className="w-2 h-2 bg-secondary rounded-full mr-2"></div>
                <span className="text-primary text-sm">{feature}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Action Buttons - Enhanced */}
        <div className="flex gap-3">
          <button
            onClick={() => router.push(`/properties/${property.id}`)}
            className="flex-1 bg-gradient-to-r from-primary to-primary-light text-white py-3 px-6 rounded-full font-semibold hover:from-primary-light hover:to-primary transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center justify-center"
          >
            <span>View Details</span>
            <ArrowRight className="w-4 h-4 ml-2" />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              router.push('/reservation');
            }}
            className="bg-gradient-to-r from-secondary to-secondary-light text-primary py-3 px-6 rounded-full font-semibold hover:from-secondary-light hover:to-secondary transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center justify-center"
          >
            <Calendar className="w-4 h-4 mr-2" />
            <span>Book Now</span>
          </button>
        </div>
      </div>

      {/* Decorative corner elements */}
      <div className="absolute top-4 left-4 w-3 h-3 bg-secondary rounded-full opacity-50 group-hover:opacity-100 transition-opacity duration-300"></div>
      <div className="absolute bottom-4 right-4 w-3 h-3 bg-tertiary rounded-full opacity-50 group-hover:opacity-100 transition-opacity duration-300"></div>
    </div>
  );
}

export default function Properties() {
  return (
    <div className="min-h-screen pt-24 pb-20 bg-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section - Enhanced */}
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
            Discover our premium accommodations in Tel Aviv's vibrant Kerem HaTeimanim neighborhood. 
            Each property offers a unique blend of modern luxury and historic charm.
          </p>
        </div>

        {/* Properties Grid - Enhanced Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto mb-16">
          {Object.values(properties).map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>

        {/* Call to Action Section - Enhanced */}
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
              Experience luxury in Tel Aviv's most charming neighborhood
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}