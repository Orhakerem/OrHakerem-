'use client';

import React from 'react';
import Link from 'next/link';

const EventsCTA: React.FC = () => {
  return (
    <div className="mt-8 text-center">
      <span className="text-secondary font-semibold text-sm tracking-[0.2em] uppercase block mb-3">
        Special Events
      </span>
      <h3 className="font-playfair text-2xl md:text-3xl font-light text-primary mb-4">
        Host Your Celebration
      </h3>
      <p className="text-primary/70 text-lg mb-6 max-w-2xl mx-auto font-lato">
        Our properties are the perfect venue for unforgettable moments. Discover exclusive events and private gatherings.
      </p>
      <Link
        href="/events"
        className="inline-flex items-center bg-gradient-to-r from-secondary to-secondary-light text-primary px-8 py-3 rounded-full font-semibold text-base hover:from-secondary-light hover:to-secondary transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:scale-105"
      >
        <span className="mr-2">Explore Events</span>
        <div className="w-5 h-5 bg-primary/20 rounded-full flex items-center justify-center">
          <span className="text-primary text-xs">→</span>
        </div>
      </Link>
    </div>
  );
};

export default EventsCTA;
