'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface Slide {
  id: number;
  src: string;
  alt: string;
}

const PromotionalCarousel: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(true);

  const slides: Slide[] = [
    {
      id: 1,
      src: '/penthouse/ext_drone_3.jpg',
      alt: 'Property Aerial View',
    },
    {
      id: 2,
      src: '/penthouse/chaises_hautes_angle_2.jpg',
      alt: 'Terrace Seating',
    },
    {
      id: 3,
      src: '/penthouse/ext_drone_5.jpg',
      alt: 'Drone Property Overview',
    },
    {
      id: 4,
      src: '/penthouse/ext_drone_13.jpg',
      alt: 'Stunning Aerial Perspective',
    },
    {
      id: 5,
      src: '/img_5322.jpg',
      alt: 'Or Hakerem Property',
    },
  ];

  useEffect(() => {
    if (!isAutoPlay) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlay, slides.length]);

  const goToPrevious = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    setIsAutoPlay(false);
  };

  const goToNext = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
    setIsAutoPlay(false);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
    setIsAutoPlay(false);
  };

  const handleMouseEnter = () => {
    setIsAutoPlay(false);
  };

  const handleMouseLeave = () => {
    setIsAutoPlay(true);
  };

  return (
    <section className="w-full bg-white py-16 md:py-20 overflow-hidden" data-animate="fade-up">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className="relative w-full h-96 md:h-[500px] lg:h-[600px] rounded-3xl overflow-hidden group"
          data-animate="zoom"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          {slides.map((slide, index) => (
            <div
              key={slide.id}
              className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                index === currentSlide ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <Image
                src={slide.src}
                alt={slide.alt}
                fill
                className="object-cover"
                priority={index === 0}
                loading={index === 0 ? 'eager' : 'lazy'}
                sizes="(max-width: 768px) 100vw, (max-width: 1280px) 90vw, 1200px"
              />
            </div>
          ))}

          <button
            onClick={goToPrevious}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-10 p-3 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/40 transition-all duration-300 opacity-0 group-hover:opacity-100 transform hover:scale-110"
            aria-label="Previous slide"
          >
            <ChevronLeft className="w-6 h-6 text-white" />
          </button>

          <button
            onClick={goToNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-10 p-3 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/40 transition-all duration-300 opacity-0 group-hover:opacity-100 transform hover:scale-110"
            aria-label="Next slide"
          >
            <ChevronRight className="w-6 h-6 text-white" />
          </button>

          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex gap-3">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`rounded-full transition-all duration-300 ${
                  index === currentSlide
                    ? 'bg-white w-8 h-3'
                    : 'bg-white/40 hover:bg-white/60 w-3 h-3'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>

        <div className="text-center mt-12" data-animate="fade-up" data-delay="1">
          <span className="text-secondary font-semibold text-sm tracking-[0.2em] uppercase block mb-3">
            Special Events
          </span>
          <h3 className="font-playfair text-3xl md:text-4xl font-light text-primary mb-4" data-animate="text" data-delay="2">
            Host Your Celebration
          </h3>
          <p className="text-primary/70 text-lg mb-8 font-lato max-w-2xl mx-auto">
            Our properties are the perfect venue for unforgettable moments. Discover exclusive events and private gatherings.
          </p>
          <Link
            href="/events"
            className="button-hover-clean inline-flex items-center justify-center bg-gradient-to-r from-secondary to-secondary-light text-primary px-8 py-3 rounded-full font-semibold text-base transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:scale-105"
          >
            <span className="mr-2">Explore Events</span>
            <div className="w-5 h-5 bg-primary/20 rounded-full flex items-center justify-center">
              <span className="text-primary text-xs">→</span>
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default PromotionalCarousel;
