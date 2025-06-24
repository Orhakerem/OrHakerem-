'use client';

import {
  Baby,
  Bath,
  BedDouble,
  Calendar,
  Coffee,
  Dumbbell,
  Heart,
  Laptop,
  MapPin,
  Share,
  Shirt,
  Sofa,
  Tv,
  Users,
  Utensils,
  UtensilsCrossed,
  Waves,
  Wifi,
  Wind,
  ArrowLeft,
  Home,
} from 'lucide-react';

import React, { useState } from 'react';

import Image from 'next/image';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';

import RoomGallery from '@/components/RoomGallery';

//import PropertyCalendar from '../components/PropertyCalendar';

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
    price: 500,
    images: [
      '/penthouse/1-jacuzzi-angle.JPEG',
      '/penthouse/2-salon-angle.jpg',
      '/penthouse/3-chambre-master-angle-1.jpg',
      '/penthouse/4-terrasse-ext-coucher-soleil.png',
      '/penthouse/5-cuisine-angle-1.jpg',
      '/penthouse/6-salle-de-bain-douche-angle-2.jpg',
      '/penthouse/7-vue-mer.jpg',
      '/penthouse/8-ext-drone-13.jpg',
      '/penthouse/9-ext-drone-3.jpg',
      '/penthouse/10-salon-angle-2.jpg',
      '/penthouse/11-espace-repas-angle.JPEG',
      '/penthouse/12-chambre-entre-angle-2.jpg',
      '/penthouse/13-chambre-entrée-angle-1.jpg',
      '/penthouse/14-espace-laverie.jpg',
      '/penthouse/15-douche.jpg',
      '/penthouse/16-salon-complet-lumière-naturelle.jpg',
      '/penthouse/17-chambre-master-angle-2.jpg',
      '/penthouse/18-chambre-master-angle-3.jpg',
      '/penthouse/19-toilette-lavabo-angle-2.jpg',
      '/penthouse/20-toilette-lavabo-angle-1.jpg',
      '/penthouse/21-chambre-fenêtre-angle-3.jpg',
      '/penthouse/22-chambre-fenêtre-angle-1.jpg',
      '/penthouse/23-ext-drone-12.jpg',
      '/penthouse/24-ext-drone-4.jpg',
      '/penthouse/25-ext-drone-10.jpg',
      '/penthouse/26-jacuzzi-angle-2.JPEG',
      '/penthouse/27-chambre-fenêtre-angle-2.jpg',
      '/penthouse/28-toilette-lavabo-angle-1.jpg',
      '/penthouse/29-toilette-lavabo-angle-2.jpg',
    ],
    rooms: [
      {
        name: 'Master Bedroom',
        description: 'Spacious master bedroom with queen size bed and sea views',
        images: [
          { src: '/penthouse/3-chambre-master-angle-1.jpg', alt: 'Master bedroom view 1' },
          { src: '/penthouse/17-chambre-master-angle-2.jpg', alt: 'Master bedroom view 2' },
          { src: '/penthouse/18-chambre-master-angle-3.jpg', alt: 'Master bedroom view 3' },
        ]
      },
      {
        name: 'Second Bedroom',
        description: 'Comfortable bedroom with queen size bed and storage',
        images: [
          { src: '/penthouse/12-chambre-entre-angle-2.jpg', alt: 'Second bedroom view 1' },
          { src: '/penthouse/13-chambre-entrée-angle-1.jpg', alt: 'Second bedroom view 2' },
        ]
      },
      {
        name: 'Third Bedroom',
        description: 'Cozy bedroom with queen size bed and blackout curtains',
        images: [
          { src: '/penthouse/21-chambre-fenêtre-angle-3.jpg', alt: 'Third bedroom view 1' },
          { src: '/penthouse/22-chambre-fenêtre-angle-1.jpg', alt: 'Third bedroom view 2' },
          { src: '/penthouse/27-chambre-fenêtre-angle-2.jpg', alt: 'Third bedroom view 3' },
        ]
      },
      {
        name: 'Living Areas',
        description: 'Bright and spacious living room and dining area',
        images: [
          { src: '/penthouse/2-salon-angle.jpg', alt: 'Living room main view' },
          { src: '/penthouse/10-salon-angle-2.jpg', alt: 'Living room alternative view' },
          { src: '/penthouse/16-salon-complet-lumière-naturelle.jpg', alt: 'Living room with natural light' },
          { src: '/penthouse/11-espace-repas-angle.JPEG', alt: 'Dining area' },
        ]
      },
      {
        name: 'Kitchen',
        description: 'Fully equipped modern kitchen with all amenities',
        images: [
          { src: '/penthouse/5-cuisine-angle-1.jpg', alt: 'Kitchen view' },
        ]
      },
      {
        name: 'Bathrooms',
        description: 'Three modern bathrooms with shower and toilet facilities',
        images: [
          { src: '/penthouse/6-salle-de-bain-douche-angle-2.jpg', alt: 'Main bathroom' },
          { src: '/penthouse/15-douche.jpg', alt: 'Shower area' },
          { src: '/penthouse/19-toilette-lavabo-angle-2.jpg', alt: 'Toilet and sink 1' },
          { src: '/penthouse/20-toilette-lavabo-angle-1.jpg', alt: 'Toilet and sink 2' },
          { src: '/penthouse/28-toilette-lavabo-angle-1.jpg', alt: 'Additional toilet 1' },
          { src: '/penthouse/29-toilette-lavabo-angle-2.jpg', alt: 'Additional toilet 2' },
        ]
      },
      {
        name: 'Terrace & Jacuzzi',
        description: 'Private terrace with jacuzzi, BBQ area and sea views',
        images: [
          { src: '/penthouse/1-jacuzzi-angle.JPEG', alt: 'Jacuzzi main view' },
          { src: '/penthouse/26-jacuzzi-angle-2.JPEG', alt: 'Jacuzzi alternative view' },
          { src: '/penthouse/4-terrasse-ext-coucher-soleil.png', alt: 'Terrace sunset view' },
          { src: '/penthouse/7-vue-mer.jpg', alt: 'Sea view from terrace' },
        ]
      },
      {
        name: 'Building & Exterior',
        description: 'Historic building and stunning aerial views',
        images: [
          { src: '/penthouse/8-ext-drone-13.jpg', alt: 'Aerial view 1' },
          { src: '/penthouse/9-ext-drone-3.jpg', alt: 'Aerial view 2' },
          { src: '/penthouse/23-ext-drone-12.jpg', alt: 'Aerial view 3' },
          { src: '/penthouse/24-ext-drone-4.jpg', alt: 'Aerial view 4' },
          { src: '/penthouse/25-ext-drone-10.jpg', alt: 'Aerial view 5' },
        ]
      },
      {
        name: 'Utilities',
        description: 'Laundry area and additional facilities',
        images: [
          { src: '/penthouse/14-espace-laverie.jpg', alt: 'Laundry area' },
        ]
      }
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
    maxGuests: 6,
    bedrooms: 3,
    beds: 3,
    baths: 3,
    calendarId:
      'ca294cd4b18c3afc09b054d0a7432e2c79a16ccfde54f326f84b661e626d4f18@group.calendar.google.com',
  },
  'cozy-studio': {
    title: 'Spacious & Cosy Apartment',
    location: 'Kerem HaTeimanim, Tel Aviv',
    description: 'Completely renovated studio perfect for short to long term stays.',
    longDescription: `This renovated apartment is perfect for short, medium, and long-term rentals. Fully equipped and located 2 minutes walk from the beach, the Shouk Hacarmel and the entrance of Kerem Hateimanim, live a unique experience.

Enjoy the comfort of this cosy studio apartment in the heart of Tel Aviv ☀️ 

The apartment is a large room divided into two parts: on one side you'll find the entrance, equipped with an opening sofa, a table with chairs, a TV hanging on the wall and the bathroom just behind it. On the other side you'll find the bed, the wardrobe and the mini-kitchen with everything you need to prepare your meals.

*Please Note: The ceiling in the room where the bed is is quite low, so if you're taller than 1m85 this could be a problem.

The studio is located on the 1st floor of a unique building that is described as a historical monument dating from the Ottoman Empire.`,
    price: 150,
    images: [
      '/studio/1.jpg',
      '/studio/2.png',
      '/studio/3.jpg',
      '/studio/4.jpg',
      '/studio/5.jpg',
      '/studio/6.jpg',
      '/studio/7.jpg',
      '/studio/8.JPG',
      '/studio/9.jpg',
      '/studio/10.jpg',
      '/studio/11.png',
      '/studio/12.png',
    ],
    rooms: [
      {
        name: 'Studio Living Area',
        description: 'Open plan living space with sofa and dining area',
        images: [
          { src: '/studio/1.jpg', alt: 'Studio main view' },
          { src: '/studio/2.png', alt: 'Living area' },
          { src: '/studio/3.jpg', alt: 'Dining space' },
          { src: '/studio/4.jpg', alt: 'Seating area' },
        ]
      },
      {
        name: 'Bedroom Area',
        description: 'Comfortable sleeping area with storage',
        images: [
          { src: '/studio/5.jpg', alt: 'Bedroom view 1' },
          { src: '/studio/6.jpg', alt: 'Bedroom view 2' },
          { src: '/studio/7.jpg', alt: 'Bedroom storage' },
        ]
      },
      {
        name: 'Kitchen & Bathroom',
        description: 'Compact kitchen and modern bathroom facilities',
        images: [
          { src: '/studio/8.JPG', alt: 'Kitchen area' },
          { src: '/studio/9.jpg', alt: 'Bathroom' },
          { src: '/studio/10.jpg', alt: 'Kitchen details' },
        ]
      },
      {
        name: 'Building Views',
        description: 'Historic building and surrounding area',
        images: [
          { src: '/studio/11.png', alt: 'Building exterior' },
          { src: '/studio/12.png', alt: 'Area view' },
        ]
      }
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
    maxGuests: 3,
    bedrooms: 1,
    beds: 1,
    baths: 1,
    calendarId:
      '1612c5568a7fef5df0dd4bcd0db49f267c2fe0dd5c5f5a52860d7d408562dba7@group.calendar.google.com',
  },
};

export default function PropertyDetails() {
  const params = useParams();
  const router = useRouter();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const property = properties[params.id as keyof typeof properties];

  if (!property) {
    return (
      <div className="min-h-screen pt-24 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-2xl font-bold text-navy mb-4">Property Not Found</h1>
          <button
            onClick={() => router.push('/properties')}
            className="bg-gold text-navy px-6 py-2 rounded-md hover:bg-gold/90 transition"
          >
            Back to Properties
          </button>
        </div>
      </div>
    );
  }

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % property.images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + property.images.length) % property.images.length);
  };

  return (
    <div className="min-h-screen pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Enhanced Back Navigation */}
        <div className="mb-6">
          <div className="inline-block relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-full blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <Link
              href="/properties"
              className="relative inline-flex items-center bg-white/80 backdrop-blur-sm text-primary px-6 py-3 rounded-full font-semibold text-lg hover:bg-white hover:text-secondary transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 border border-primary/20"
            >
              <div className="relative mr-3">
                <ArrowLeft className="w-5 h-5 transition-transform duration-300 group-hover:-translate-x-1" />
                <div className="absolute inset-0 bg-secondary/20 rounded-full scale-0 group-hover:scale-150 transition-transform duration-300"></div>
              </div>
              <Home className="w-5 h-5 mr-2 opacity-70 group-hover:opacity-100 transition-opacity duration-300" />
              <span className="relative z-10">Back to Properties</span>
            </Link>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="relative">
            <div className="relative h-[60vh]">
              <Image
                src={property.images[currentImageIndex]}
                alt={property.title}
                fill
                className="object-cover"
                priority={currentImageIndex === 0}
              />
              <div className="absolute bottom-4 right-4 bg-black/50 px-3 py-1 rounded-full text-white text-sm">
                {currentImageIndex + 1} / {property.images.length}
              </div>
              <button
                onClick={prevImage}
                className="absolute left-4 top-1/2 -translate-y-1/2 p-2 bg-white rounded-full shadow-lg hover:bg-gray-100"
              >
                ←
              </button>
              <button
                onClick={nextImage}
                className="absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-white rounded-full shadow-lg hover:bg-gray-100"
              >
                →
              </button>
              <div className="absolute top-4 right-4 flex space-x-2">
                <button className="p-2 bg-white rounded-full shadow-lg hover:bg-gray-100">
                  <Share className="w-5 h-5 text-navy" />
                </button>
                <button className="p-2 bg-white rounded-full shadow-lg hover:bg-gray-100">
                  <Heart className="w-5 h-5 text-navy" />
                </button>
              </div>
            </div>
          </div>

          <div className="p-8">
            <div className="max-w-4xl mx-auto">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h1 className="font-playfair text-3xl font-bold text-navy mb-2">
                    {property.title}
                  </h1>
                  <div className="flex items-center text-navy/60">
                    <MapPin className="w-5 h-5 mr-1" />
                    {property.location}
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-navy">
                    <span className="font-bold text-2xl">${property.price}</span>
                    <span className="text-navy/60"> / night</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between p-4 border-y border-gray-200 mb-8">
                <div className="text-center">
                  <BedDouble className="w-6 h-6 mx-auto mb-1 text-navy" />
                  <div className="text-sm text-navy/80">{property.bedrooms} bedroom</div>
                </div>
                <div className="text-center">
                  <BedDouble className="w-6 h-6 mx-auto mb-1 text-navy" />
                  <div className="text-sm text-navy/80">{property.beds} bed</div>
                </div>
                <div className="text-center">
                  <Bath className="w-6 h-6 mx-auto mb-1 text-navy" />
                  <div className="text-sm text-navy/80">{property.baths} bath</div>
                </div>
                <div className="text-center">
                  <Users className="w-6 h-6 mx-auto mb-1 text-navy" />
                  <div className="text-sm text-navy/80">Up to {property.maxGuests} guests</div>
                </div>
              </div>

              <div className="prose prose-navy max-w-none mb-8">
                <h2 className="font-playfair text-2xl font-bold text-navy mb-4">
                  About this space
                </h2>
                {property.longDescription.split('\n\n').map((paragraph, index) => (
                  <p key={index} className="text-navy/80 mb-4">
                    {paragraph}
                  </p>
                ))}
              </div>

              <div className="mb-8">
                <h2 className="font-playfair text-2xl font-bold text-navy mb-6">
                  What this place offers
                </h2>
                <div className="grid md:grid-cols-2 gap-4">
                  {property.amenities.map((amenity, index) => (
                    <div key={index} className="flex items-start p-4 bg-cream rounded-lg">
                      <amenity.icon className="w-6 h-6 text-navy mr-3 shrink-0" />
                      <div>
                        <h3 className="font-semibold text-navy">{amenity.name}</h3>
                        <p className="text-sm text-navy/60">{amenity.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Room Gallery Section */}
              <div className="mb-8">
                <h2 className="font-playfair text-2xl font-bold text-primary mb-6">
                  Room Gallery
                </h2>
                <p className="text-primary/80 mb-6">
                  Explore each room and area of the property with our organized photo collections.
                </p>
                <RoomGallery rooms={property.rooms || []} />
              </div>

              <div className="mb-8">
                <h2 className="font-playfair text-2xl font-bold text-navy mb-6">
                  Availability Calendar
                </h2>
                {/*<PropertyCalendar propertyId={params.id as string} calendarId={property.calendarId} />*/}
              </div>

              <div className="flex justify-center">
                <button
                  onClick={() => router.push('/reservation')}
                  className="bg-gold text-navy px-8 py-3 rounded-full font-semibold hover:bg-gold/90 transition flex items-center"
                >
                  <Calendar className="w-5 h-5 mr-2" />
                  Book Now
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}