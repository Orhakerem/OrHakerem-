'use server';

import { fallbackImages } from '@/constants';
import Image from 'next/image';

export default function BuildingDescription() {
  return (
    <section className="py-20 bg-cream relative">
      <div className="absolute inset-0 bg-tertiary/5"></div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="relative h-[400px] rounded-lg overflow-hidden shadow-xl">
            <div className="absolute inset-0 border-2 border-tertiary/20 rounded-lg"></div>
            <Image
              src={fallbackImages.buildingDescription}
              alt="Building Interior"
              fill
              className="object-cover"
            />
          </div>
          <div>
            <div className="inline-block mb-2">
              <span className="text-tertiary font-semibold">Our Property</span>
            </div>
            <h2 className="font-playfair text-3xl font-bold text-primary mb-6">
              Luxury Living in Jerusalem
            </h2>
            <p className="text-primary/80 leading-relaxed mb-4">
              Located in the heart of Jerusalem, our property offers a unique blend of modern luxury
              and traditional charm. Each apartment is thoughtfully designed to provide the perfect
              balance of comfort and sophistication.
            </p>
            <p className="text-primary/80 leading-relaxed">
              Whether you&apos;re visiting for business or pleasure, our prime location and exceptional
              amenities ensure an unforgettable stay. Experience the warmth of Jerusalem hospitality
              combined with the luxury you deserve.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}