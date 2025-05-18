import React from 'react';
import { Star, Calendar, Heart, MapPin } from 'lucide-react';
import { propertyImages, fallbackImages } from '@/constants';
import { useRouter } from 'next/navigation';

type PropertyId = 'penthouse-jacuzzi' | 'cozy-studio';

const properties = {
  'penthouse-jacuzzi': {
    id: 'penthouse-jacuzzi' as PropertyId,
    title: 'Penthouse with Jacuzzi & BBQ',
    location: 'Kerem HaTeimanim, Tel Aviv',
    description:
      'Luxurious penthouse featuring a private jacuzzi, BBQ area, and breathtaking sea views.',
    price: 450,
    rating: 4.9,
    reviewCount: 128,
    get image() {
      const localImages = propertyImages[this.id as PropertyId];
      return localImages && localImages.length > 0 ? localImages[0].src : fallbackImages[this.id as PropertyId];
    },
  },
  'cozy-studio': {
    id: 'cozy-studio' as PropertyId,
    title: 'Cozy Studio, 2 Minutes from Sea',
    location: 'Kerem HaTeimanim, Tel Aviv',
    description: 'Completely renovated studio perfect for short to long term stays.',
    price: 150,
    rating: 4.8,
    reviewCount: 96,
    get image() {
      const localImages = propertyImages[this.id as PropertyId];
      return localImages && localImages.length > 0 ? localImages[0].src : fallbackImages[this.id as PropertyId];
    },
  },
};

function PropertyCard({ property }: { property: (typeof properties)[keyof typeof properties] }) {
  const router = useRouter();

  return (
    <div
      className="bg-white rounded-xl shadow-lg overflow-hidden cursor-pointer transform transition-all hover:scale-[1.02] relative group"
      onClick={() => router.push(`/properties/${property.id}`)}
    >
      <div className="absolute inset-0 border-2 border-tertiary/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
      <div className="relative h-64">
        <img src={property.image} alt={property.title} className="w-full h-full object-cover" />
        <button
          className="absolute top-4 right-4 p-2 bg-white rounded-full shadow-lg hover:bg-tertiary/5 transition-colors"
          onClick={e => {
            e.stopPropagation();
            // Handle favorite
          }}
        >
          <Heart className="w-5 h-5 text-primary" />
        </button>
      </div>
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="font-playfair text-xl font-bold text-primary mb-1">{property.title}</h3>
            <div className="flex items-center text-primary/60 text-sm">
              <MapPin className="w-4 h-4 mr-1" />
              {property.location}
            </div>
          </div>
          <div className="flex items-center">
            <Star className="w-5 h-5 text-tertiary fill-current" />
            <span className="ml-1 font-semibold">{property.rating}</span>
            <span className="text-primary/60 ml-1">({property.reviewCount})</span>
          </div>
        </div>
        <p className="text-primary/80 mb-4">{property.description}</p>
        <div className="flex items-center justify-between">
          <div className="text-primary">
            <span className="font-bold text-xl">${property.price}</span>
            <span className="text-primary/60"> / night</span>
          </div>
          <button
            onClick={e => {
              e.stopPropagation();
              router.push('/reservation');
            }}
            className="bg-primary text-secondary px-8 py-3 rounded-full font-semibold hover:bg-primary-light transition flex items-center relative overflow-hidden group"
          >
            <div className="absolute inset-0 bg-tertiary/10 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></div>
            <Calendar className="w-4 h-4 mr-2 relative z-10" />
            <span className="relative z-10">Book Now</span>
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
        <div className="text-center mb-12">
          <span className="text-tertiary font-semibold">Our Accommodations</span>
          <h1 className="font-playfair text-4xl font-bold text-primary mt-2">Our Properties</h1>
        </div>
        <div className="grid md:grid-cols-2 gap-8">
          {Object.values(properties).map(property => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>
      </div>
    </div>
  );
}
