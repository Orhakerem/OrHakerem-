'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { Star, Quote } from 'lucide-react';

interface Testimonial {
  name: string;
  location?: string;
  rating: number;
  date: string;
  stayType: string;
  text: string;
}

// Déplacer les données vers un fichier séparé pour éviter la re-création
const testimonials: Testimonial[] = [
  {
    name: "Emmanuelle",
    rating: 5,
    date: "November 2024",
    stayType: "One-night stay",
    text: "Magnificent! The location is perfect, everything is within walking distance: beach, restaurants, bars. The rooftop with the jacuzzi is incredible, even after the rain! The water is warm enough to relax in during winter – pure bliss. The host is exceptional, always attentive, responsive, and thoughtful about every detail to make the stay perfect. I'll definitely be back 🥰"
  },
  {
    name: "Kim",
    location: "Nashville, Tennessee",
    rating: 5,
    date: "April 2025",
    stayType: "Group trip",
    text: "This place was perfection. The location was everything – from the sea view on the rooftop to the Carmel Market behind us, it couldn't have been better! The kitchen had what we needed, the hot tub was a bonus, and the hosts being nearby was helpful. The host was responsive and available. I highly, highly, highly recommend this place!"
  },
  {
    name: "Shmuel",
    rating: 5,
    date: "March 2025",
    stayType: "Group trip",
    text: "I had an amazing stay! The place was spotless, incredibly well-maintained, and in the perfect location – everything I needed was just a short walk away. The host was fantastic, very responsive, and made sure I had everything for a comfortable stay. Highly recommend and would definitely return!"
  },
  // Ajouter plus de témoignages ici...
];

export default function OptimizedTestimonialsCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Mémoriser le rendu des étoiles pour éviter les re-calculs
  const renderStars = useMemo(() => {
    return (rating: number) => {
      return Array.from({ length: 5 }, (_, i) => (
        <Star
          key={i}
          className={`w-5 h-5 ${
            i < rating ? 'text-secondary fill-current' : 'text-gray-300'
          }`}
        />
      ));
    };
  }, []);

  // Auto-play optimisé avec cleanup
  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => 
        prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
      );
    }, 4000);

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  // Mémoriser le témoignage actuel
  const currentTestimonial = useMemo(() => {
    return testimonials[currentIndex];
  }, [currentIndex]);

  return (
    <section className="py-20 bg-cream relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0">
        <div className="absolute top-10 left-10 w-32 h-32 bg-secondary/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-40 h-40 bg-tertiary/10 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header section */}
        <div className="text-center mb-16">
          <div className="inline-block mb-4">
            <span className="text-tertiary font-semibold text-lg tracking-wider uppercase">
              Guest Reviews
            </span>
          </div>
          <h2 className="font-playfair text-5xl md:text-6xl font-bold text-primary mb-6 leading-tight">
            What Our Guests Say
          </h2>
          <p className="text-primary/80 text-xl max-w-3xl mx-auto leading-relaxed">
            Discover why our guests choose Or Hakerem for their luxury stays in Tel Aviv
          </p>
        </div>

        {/* Carousel Container */}
        <div 
          className="relative max-w-5xl mx-auto"
          onMouseEnter={() => setIsAutoPlaying(false)}
          onMouseLeave={() => setIsAutoPlaying(true)}
        >
          {/* Main Testimonial Card */}
          <div className="relative bg-white rounded-3xl shadow-2xl p-8 md:p-12 border border-secondary/10 overflow-hidden">
            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-secondary/5 to-tertiary/5 rounded-3xl"></div>
            
            {/* Quote icon */}
            <div className="absolute top-6 right-6 opacity-10">
              <Quote className="w-24 h-24 text-primary" />
            </div>

            <div className="relative z-10">
              {/* Stars */}
              <div className="flex justify-center mb-6">
                <div className="flex space-x-1">
                  {renderStars(currentTestimonial.rating)}
                </div>
              </div>

              {/* Testimonial Text */}
              <blockquote className="text-center mb-8">
                <p className="text-primary/90 text-lg md:text-xl leading-relaxed font-light italic">
                  "{currentTestimonial.text}"
                </p>
              </blockquote>

              {/* Guest Info */}
              <div className="text-center">
                <div className="inline-block p-6 bg-gradient-to-br from-cream to-white rounded-2xl shadow-lg border border-secondary/20">
                  <h4 className="font-playfair text-2xl font-bold text-primary mb-2">
                    {currentTestimonial.name}
                  </h4>
                  {currentTestimonial.location && (
                    <p className="text-primary/70 text-lg mb-2">
                      {currentTestimonial.location}
                    </p>
                  )}
                  <div className="flex items-center justify-center space-x-4 text-sm text-primary/60">
                    <span>{currentTestimonial.date}</span>
                    <span>•</span>
                    <span>{currentTestimonial.stayType}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}