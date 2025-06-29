'use client';

import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Star, Quote } from 'lucide-react';

interface Testimonial {
  name: string;
  location?: string;
  rating: number;
  date: string;
  stayType: string;
  text: string;
}

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
  {
    name: "Pascal",
    rating: 5,
    date: "April 2025",
    stayType: "About one week",
    text: "Amazing location – 5 minutes from the beach and 5 minutes from the shuk. Fantastic terrace for eating or hanging out with a perfect sunset view. Super responsive and thoughtful host. The apartment is actually larger than it appears in the photos, which is a great bonus. Strongly recommended!"
  },
  {
    name: "Boris",
    location: "Winterthur, Switzerland",
    rating: 5,
    date: "April 2025",
    stayType: "Group trip",
    text: "An absolutely amazing stay in this beautiful Airbnb! Unbeatable location – just a few minutes' walk from the beach. The apartment is spacious, tastefully decorated, and perfectly maintained. Three bedrooms, two full bathrooms, and a guest toilet made it super comfortable for our group. The rooftop with hot tub was a true luxury. Smooth check-in and friendly communication. Highly recommended!"
  },
  {
    name: "Elliot",
    location: "Toronto, Canada",
    rating: 5,
    date: "May 2025",
    stayType: "Few nights stay",
    text: "Excellent host with quick responses. The apartment is terrific and the wraparound deck is a perfect place to take in Tel Aviv. Thank you!"
  },
  {
    name: "Micael",
    location: "Ra'anana, Israel",
    rating: 5,
    date: "May 2025",
    stayType: "One-night stay",
    text: "The perfect place! Right next to the market with a beautiful rooftop and sea view. Would absolutely come back."
  },
  {
    name: "Matan",
    location: "Plano, Texas",
    rating: 5,
    date: "April 2025",
    stayType: "One-night stay",
    text: "Amazing house, very clean, incredible rooftop. Everything was spotless. The host answered all my needs. I'm definitely coming back."
  },
  {
    name: "Ava",
    location: "Philadelphia, USA",
    rating: 5,
    date: "November 2024",
    stayType: "Group trip",
    text: "Most amazing stay!!! This apartment was all we dreamed of – perfect location, perfect amenities, just perfect! The hosts were amazing and so hospitable. Couldn't have asked for a better weekend!!"
  },
  {
    name: "Sandrine",
    location: "France",
    rating: 5,
    date: "April 2025",
    stayType: "About one week",
    text: "The apartment was true to the photos, and the location is one of the best in Tel Aviv. But most of all, the host and his father treated us like family from the moment we arrived. They were responsive to all our requests and even offered an extra night due to a minor plumbing issue that was solved immediately. Truly exceptional and rare hosts. We'll definitely return."
  },
  {
    name: "Alex",
    rating: 5,
    date: "May 2025",
    stayType: "One-night stay",
    text: "Of all the Airbnb hosts I've ever had, the host was by far the best. His communication and friendliness were unmatched. Any request we had was addressed within the hour. Truly an amazing stay – we will be back. Highly recommend!"
  },
  {
    name: "Carol",
    location: "Buenos Aires, Argentina",
    rating: 5,
    date: "May 2025",
    stayType: "One-night stay",
    text: "The apartment was beautiful, very comfortable, well located and peaceful. My flight was very delayed, but I managed to have dinner nearby and stroll around early the next morning. The beach is only 200 meters away – what a luxury! I'd definitely come back. The host made sure I had water and coffee – so thoughtful. Thank you!"
  },
  {
    name: "Chaya",
    location: "New York, USA",
    rating: 5,
    date: "April 2025",
    stayType: "Few nights stay",
    text: "Absolutely wonderful place, great location, and the host couldn't have been nicer or more helpful. I'll definitely stay here again and can't recommend it enough!"
  },
  {
    name: "Miguel",
    rating: 5,
    date: "November 2024",
    stayType: "One-night stay",
    text: "The host might just be the best I've ever had. Amazing communication, great recommendations, and a beautiful apartment! Highly recommend – it was a pleasure to meet someone like him. I'll definitely stay here again."
  },
  {
    name: "Andrea",
    location: "Fribourg, Switzerland",
    rating: 5,
    date: "December 2024",
    stayType: "Few nights stay",
    text: "Charming place in a great location with a lovely host – we loved it and would return anytime!"
  }
];

export default function TestimonialsCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => 
        prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000); // Change every 5 seconds

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const goToNext = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
    );
  };

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
    );
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-5 h-5 ${
          i < rating ? 'text-secondary fill-current' : 'text-gray-300'
        }`}
      />
    ));
  };

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
                  {renderStars(testimonials[currentIndex].rating)}
                </div>
              </div>

              {/* Testimonial Text */}
              <blockquote className="text-center mb-8">
                <p className="text-primary/90 text-lg md:text-xl leading-relaxed font-light italic">
                  "{testimonials[currentIndex].text}"
                </p>
              </blockquote>

              {/* Guest Info */}
              <div className="text-center">
                <div className="inline-block p-6 bg-gradient-to-br from-cream to-white rounded-2xl shadow-lg border border-secondary/20">
                  <h4 className="font-playfair text-2xl font-bold text-primary mb-2">
                    {testimonials[currentIndex].name}
                  </h4>
                  {testimonials[currentIndex].location && (
                    <p className="text-primary/70 text-lg mb-2">
                      {testimonials[currentIndex].location}
                    </p>
                  )}
                  <div className="flex items-center justify-center space-x-4 text-sm text-primary/60">
                    <span>{testimonials[currentIndex].date}</span>
                    <span>•</span>
                    <span>{testimonials[currentIndex].stayType}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={goToPrevious}
            className="absolute left-4 top-1/2 -translate-y-1/2 p-4 bg-white/90 backdrop-blur-sm rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-110 border border-secondary/20 group"
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="w-6 h-6 text-primary group-hover:text-secondary transition-colors duration-300" />
          </button>

          <button
            onClick={goToNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 p-4 bg-white/90 backdrop-blur-sm rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-110 border border-secondary/20 group"
            aria-label="Next testimonial"
          >
            <ChevronRight className="w-6 h-6 text-primary group-hover:text-secondary transition-colors duration-300" />
          </button>
        </div>

        {/* Pagination Dots */}
        <div className="flex justify-center mt-12 space-x-3">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentIndex
                  ? 'bg-secondary scale-125 shadow-lg'
                  : 'bg-primary/30 hover:bg-primary/50'
              }`}
              aria-label={`Go to testimonial ${index + 1}`}
            />
          ))}
        </div>

        {/* Stats Section */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <div className="text-center p-6 bg-white rounded-2xl shadow-lg border border-secondary/10">
            <div className="text-4xl font-bold text-primary mb-2">5.0</div>
            <div className="flex justify-center mb-2">
              {renderStars(5)}
            </div>
            <div className="text-primary/70">Average Rating</div>
          </div>
          
          <div className="text-center p-6 bg-white rounded-2xl shadow-lg border border-secondary/10">
            <div className="text-4xl font-bold text-primary mb-2">{testimonials.length}+</div>
            <div className="text-primary/70">Happy Guests</div>
          </div>
          
          <div className="text-center p-6 bg-white rounded-2xl shadow-lg border border-secondary/10">
            <div className="text-4xl font-bold text-primary mb-2">100%</div>
            <div className="text-primary/70">5-Star Reviews</div>
          </div>
        </div>
      </div>
    </section>
  );
}