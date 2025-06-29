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
    name: "Ran",
    location: "Ramat Yishai, Israel",
    rating: 5,
    date: "April 2025",
    stayType: "Group trip",
    text: "We had a great time. Could've used more towels, but we never asked the host – that's on us."
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
    name: "קרין",
    location: "Israel",
    rating: 5,
    date: "February 2025",
    stayType: "Group trip",
    text: "We arrived to a super clean and organized apartment. We asked for extra towels for the jacuzzi and got them immediately. The host and his father were always available and smiling. The jacuzzi was hot and cozy, and the terrace was huge. Great location near the beach and market. Israelis – note the VAT is added after payment. Highly recommend!"
  },
  {
    name: "ליטל",
    location: "Cyprus",
    rating: 5,
    date: "February 2025",
    stayType: "Few nights stay",
    text: "The host and his father are truly wonderful. The apartment is gorgeous and comfortable, with a dreamy rooftop. A little slice of paradise in the heart of Tel Aviv. We stayed as a family of five and had a perfect, spacious experience. Highly recommend 💜"
  },
  {
    name: "תקווה",
    location: "Israel",
    rating: 5,
    date: "November 2024",
    stayType: "Few nights stay",
    text: "This apartment exceeded all our expectations! Great location – close to everything but still peaceful. Beautifully decorated, super clean, fully equipped kitchen, comfy beds, and a stunning terrace that became our favorite spot. The host was responsive and gave great local tips. We had an amazing experience and would gladly return!"
  },
  {
    name: "דינה",
    location: "Israel",
    rating: 5,
    date: "May 2025",
    stayType: "Group trip",
    text: "Fun apartment for a vacation, perfect and spacious rooftop. The host was kind and very available for any questions. Clean apartment, comfortable beds, and the perfect beachside location. Highly recommended 🙏"
  },
  {
    name: "Ofek",
    location: "Tel Aviv-Yafo, Israel",
    rating: 5,
    date: "May 2025",
    stayType: "Group trip",
    text: "We were a group of 7. The apartment was clean and organized. The big terrace, barbecue, and jacuzzi made our stay amazing! The host was always available and super friendly. Highly recommend."
  },
  {
    name: "Gabriel",
    rating: 5,
    date: "May 2025",
    stayType: "One-night stay",
    text: "Great place, great communication, worth every shekel! Will be back!"
  },
  {
    name: "Nitzan",
    location: "Tel Aviv, Israel",
    rating: 5,
    date: "March 2025",
    stayType: "Group trip",
    text: "The host was very nice and flexible! I had a reservation issue and he immediately helped and adjusted. Amazing service!"
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
    name: "Omer",
    location: "Israel",
    rating: 5,
    date: "February 2025",
    stayType: "Group trip",
    text: "Lovely place, spacious and clean, right next to Carmel Market and the heart of Tel Aviv. The host was kind and responsive at any hour. Highly recommend."
  },
  {
    name: "Idan",
    location: "Jerusalem, Israel",
    rating: 5,
    date: "February 2025",
    stayType: "Group trip",
    text: "Stunning penthouse with a huge and fun terrace. Two minutes from the beach. The host was communicative and took care of everything before and during our stay. Amazing experience."
  },
  {
    name: "Sarel & Michal",
    rating: 5,
    date: "December 2024",
    stayType: "Few nights stay",
    text: "The host and his father are such wonderful people. They welcomed us warmly, the communication was excellent, and the home was absolutely lovely – beyond all expectations. Thank you, we will definitely come again 🫶🏻"
  },
  {
    name: "דורית",
    location: "Israel",
    rating: 5,
    date: "December 2024",
    stayType: "Group trip",
    text: "Three of us stayed for a long weekend – it was perfect! The apartment is luxurious and comfortable with a dream terrace. The host gave us a warm, homey feeling and was always available. Highly recommended – this will be our go-to place in Tel Aviv!"
  },
  {
    name: "Sagi",
    location: "Israel",
    rating: 5,
    date: "November 2024",
    stayType: "Group trip",
    text: "Perfect stay! The hosts were kind and responsive, the apartment was clean, well-equipped, and just like the photos. Great location. Amazing experience – can't wait to return!"
  },
  {
    name: "אורי",
    location: "Israel",
    rating: 5,
    date: "March 2025",
    stayType: "One-night stay",
    text: "Wonderful host and a lovely place. Looking forward to staying here again."
  },
  {
    name: "אורן",
    location: "Israel",
    rating: 5,
    date: "February 2025",
    stayType: "Group trip",
    text: "Stunning rooftop apartment, clean and tidy. Well-equipped terrace, great host – responsive and attentive. Highly recommended!"
  },
  {
    name: "שון",
    location: "Israel",
    rating: 5,
    date: "January 2025",
    stayType: "Group trip",
    text: "Excellent location. Large and comfy terrace. Met all expectations. We'll be back next year."
  },
  {
    name: "ירדן",
    location: "Israel",
    rating: 5,
    date: "November 2024",
    stayType: "Few nights stay",
    text: "No words – it was perfect. The host and his father were incredibly kind, took care of everything, the apartment was spotless and fully equipped. Wholeheartedly recommend. We'll definitely return!"
  },
  {
    name: "Avi",
    location: "Israel",
    rating: 5,
    date: "March 2025",
    stayType: "Group trip",
    text: "Great location, great apartment."
  },
  {
    name: "דביר",
    location: "Israel",
    rating: 5,
    date: "November 2024",
    stayType: "Few nights stay",
    text: "The host was amazing and kind. The place was spacious and close to everything. Definitely coming back again! Highly recommend."
  },
  {
    name: "Lidor",
    location: "Israel",
    rating: 5,
    date: "December 2024",
    stayType: "Few nights stay",
    text: "Awesome place!"
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
    name: "Lea",
    location: "France",
    rating: 5,
    date: "January 2025",
    stayType: "About one week",
    text: "Incredible stay. A peaceful haven – everything was perfect. I'll come back for sure. Thank you!"
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
    name: "Tamara",
    rating: 5,
    date: "May 2025",
    stayType: "About one week",
    text: "This place is beautiful! The reviews are right – it's even better than the photos. The host was wonderful and easy to communicate with. The apartment is central, clean, and spacious. I really enjoyed my stay!"
  },
  {
    name: "Atar",
    location: "Baltimore, USA",
    rating: 5,
    date: "May 2025",
    stayType: "Few nights stay",
    text: "The host was incredible – flexible and helpful! I extended my stay several times. Perfectly sized and located apartment. I'll definitely return."
  },
  {
    name: "Karin",
    rating: 5,
    date: "May 2025",
    stayType: "About one week",
    text: "The host was very friendly and helpful. The area between Carmel Market and the beach is wonderful, with lots of restaurants and shops. Quiet bedroom, fully equipped kitchen – perfect for cooking. Merci!"
  },
  {
    name: "Liraz",
    location: "Israel",
    rating: 5,
    date: "December 2024",
    stayType: "Over one week stay",
    text: "I stayed 13 nights and the host was attentive to every question and request before and during the stay. It was perfect for my long workdays – quiet, comfortable, and central. I'll definitely return for my next business trip."
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
    name: "Juliette",
    rating: 5,
    date: "March 2025",
    stayType: "One-night stay",
    text: "The host took care of everything and went above and beyond. Great place in a fantastic location. Highly recommended."
  },
  {
    name: "Assaf",
    location: "Israel",
    rating: 5,
    date: "March 2025",
    stayType: "One-night stay",
    text: "Excellent place. The host was very available and helpful. The apartment looks just like the pictures – maybe even cooler. Central location, close to the sea and the market. Small note: the bedroom ceiling is low if you're over 1.9m :)"
  },
  {
    name: "Malka",
    location: "Bet Shemesh, Israel",
    rating: 5,
    date: "March 2025",
    stayType: "One-night stay",
    text: "Beautiful place! Fantastic location near the beach. The apartment was tidy and spacious. I'd love to stay again ♡"
  },
  {
    name: "נדב",
    location: "Israel",
    rating: 5,
    date: "February 2025",
    stayType: "One-night stay",
    text: "Excellent! The host let us check in at 2:00 PM, a few hours early. Amazing location, spacious, beautifully designed, and very clean."
  },
  {
    name: "גמא",
    location: "Hadera, Israel",
    rating: 5,
    date: "February 2025",
    stayType: "One-night stay",
    text: "Wonderful! The host was lovely, communicative, and made us feel like we could reach out anytime. The apartment was beautiful, clean, and very pleasant. Great location. We had a great experience."
  },
  {
    name: "Yuval",
    location: "Israel",
    rating: 5,
    date: "February 2025",
    stayType: "One-night stay",
    text: "Stunning apartment! The host answered questions even before booking and made sure we had the best possible stay :) Perfect location by the sea 😊😊"
  },
  {
    name: "Eran",
    rating: 5,
    date: "January 2025",
    stayType: "Few nights stay",
    text: "Had a great time! Friendly, responsive, and helpful host. Great location."
  },
  {
    name: "Miguel",
    rating: 5,
    date: "November 2024",
    stayType: "One-night stay",
    text: "The host might just be the best I've ever had. Amazing communication, great recommendations, and a beautiful apartment! Highly recommend – it was a pleasure to meet someone like him. I'll definitely stay here again."
  },
  {
    name: "Yaniv",
    location: "Miami, USA",
    rating: 5,
    date: "April 2025",
    stayType: "One-night stay",
    text: "Great location!!!"
  },
  {
    name: "Chaya",
    location: "New York, USA",
    rating: 5,
    date: "April 2025",
    stayType: "Few nights stay",
    text: "Perfect!"
  },
  {
    name: "Garry",
    location: "Fawkner, Australia",
    rating: 5,
    date: "December 2024",
    stayType: "Few nights stay",
    text: "Great host, quick replies. Amazing location – close to the market. Perfect for a solo traveler or a couple."
  },
  {
    name: "Andrea",
    location: "Fribourg, Switzerland",
    rating: 5,
    date: "December 2024",
    stayType: "Few nights stay",
    text: "Charming place in a great location with a lovely host – we loved it and would return anytime!"
  },
  {
    name: "Adina",
    rating: 5,
    date: "November 2024",
    stayType: "Few nights stay",
    text: "Really cute little place right near the beach. The host was very responsive and kind :)"
  },
  {
    name: "Itay",
    rating: 5,
    date: "February 2025",
    stayType: "One-night stay",
    text: "Great apartment – clean, excellent location."
  },
  {
    name: "Or",
    location: "Be'er Sheva, Israel",
    rating: 5,
    date: "December 2024",
    stayType: "Few nights stay",
    text: "Beautiful, clean apartment in a perfect location! The host and his father were warm and helpful. We'll definitely stay here again."
  },
  {
    name: "Mor",
    rating: 5,
    date: "December 2024",
    stayType: "One-night stay",
    text: "Amazing host – quick to respond and super helpful. Everything was perfect. Gorgeous apartment. Great location – peaceful yet central."
  },
  {
    name: "מאיה",
    rating: 5,
    date: "November 2024",
    stayType: "One-night stay",
    text: "Lovely area, apartment exactly like in the photos. The host made us feel very welcome and answered all our questions. Clean, comfortable – highly recommended!"
  },
  {
    name: "Michael",
    rating: 5,
    date: "November 2024",
    stayType: "Few nights stay",
    text: "Great apartment, great location, and a great host!"
  },
  {
    name: "Tatiana",
    rating: 5,
    date: "November 2024",
    stayType: "Few nights stay",
    text: "Cute apartment in the perfect location!"
  },
  {
    name: "Eduardo",
    location: "Jerusalem, Israel",
    rating: 5,
    date: "November 2024",
    stayType: "Few nights stay",
    text: "Excellent experience! The apartment exceeded our expectations with its beautiful design and perfect location. The host was incredibly welcoming and made sure we had everything we needed for a comfortable stay."
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
    }, 4000); // Change every 4 seconds

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
        <div className="flex justify-center mt-12 space-x-2 flex-wrap max-w-4xl mx-auto">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-2 h-2 rounded-full transition-all duration-300 m-1 ${
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
            <div className="text-4xl font-bold text-primary mb-2">80+</div>
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