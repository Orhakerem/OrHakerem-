'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface Slide {
  id: number;
  src: string;
  alt: string;
  title: string;
}

const PromotionalCarousel: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(true);

  const slides: Slide[] = [
    {
      id: 1,
      src: '/penthouse/7-vue-mer.jpg',
      alt: 'Penthouse Sea View',
      title: 'Stunning Sea Views',
    },
    {
      id: 2,
      src: '/penthouse/4-terrasse-ext-coucher-soleil.png',
      alt: 'Penthouse Sunset Terrace',
      title: 'Sunset Terrace Experience',
    },
    {
      id: 3,
      src: '/penthouse/1-jacuzzi-angle.JPEG',
      alt: 'Luxury Jacuzzi',
      title: 'Private Jacuzzi',
    },
    {
      id: 4,
      src: '/penthouse/5-cuisine-angle-1.jpg',
      alt: 'Luxury Kitchen',
      title: 'Modern Chef\'s Kitchen',
    },
    {
      id: 5,
      src: '/studio/Salon_angle_1.jpg',
      alt: 'Studio Living Room',
      title: 'Elegant Living Spaces',
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
    <section className="w-full bg-white py-12 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className="relative w-full h-96 md:h-[500px] lg:h-[600px] rounded-3xl overflow-hidden group"
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
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>

              <div className="absolute inset-0 flex items-end justify-center pb-8">
                <h3 className="text-white text-2xl md:text-3xl lg:text-4xl font-playfair font-light">
                  {slide.title}
                </h3>
              </div>
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

        <div className="text-center mt-8">
          <span className="text-secondary font-semibold text-sm tracking-[0.2em] uppercase">
            Featured Properties
          </span>
          <p className="text-primary/70 text-lg mt-2 font-lato">
            Explore our curated collection of luxury accommodations
          </p>
        </div>
      </div>
    </section>
  );
};

export default PromotionalCarousel;
