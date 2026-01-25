'use client';

import toast from 'react-hot-toast';

import React, { useState } from 'react';

import Image from 'next/image';
import Link from 'next/link';

import { sendContactEmail } from '@/actions/contact';
import FAQ from '@/components/FAQ';
import TestimonialsCarousel from '@/components/TestimonialsCarousel';
import PromotionalCarousel from '@/components/PromotionalCarousel';

const Home: React.FC = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const result = await sendContactEmail(new FormData(e.currentTarget));
      if (result.success) {
        toast.success(result.message || 'Message sent successfully!');
        (e.target as HTMLFormElement).reset();
      } else {
        toast.error(result.error || 'Failed to send message');
      }
    } catch (error) {
      console.error('Contact form submission error:', error);
      toast.error('Failed to send message. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section with Video Background - No Margin Top */}
      <div className="relative w-full h-screen overflow-hidden">
        {/* Video Background */}
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
          style={{ filter: 'brightness(0.85)' }}
        >
          <source src="/hero.mp4" type="video/mp4" />
          {/* Fallback for browsers that don't support video */}
          <div className="absolute inset-0 bg-primary"></div>
        </video>

        {/* Title Overlay */}
        <div className="hero-title">
          <h1 className="font-playfair font-bold hero-subtitle">
            Premium Short Term Apartments in the heart of Tel Aviv
          </h1>
          <p className="text-lg md:text-xl max-w-2xl leading-relaxed mt-4 hero-subtitle">
            Experience Or Hakerem – where exceptional hospitality meets contemporary elegance in the heart of Tel Aviv
          </p>
        </div>
      </div>


      {/* Welcome Section */}
      <section className="py-16 bg-cream relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-6 left-6 w-16 h-16 bg-secondary/10 rounded-full blur-2xl"></div>
          <div className="absolute bottom-6 right-6 w-20 h-20 bg-tertiary/10 rounded-full blur-2xl"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col items-center">
            <div className="flex-1 text-center">
              <div className="mb-6">
                <span className="text-secondary font-semibold text-lg tracking-[0.2em] uppercase block mb-3">
                  Welcome to
                </span>
                <h2 className="font-playfair text-4xl md:text-5xl lg:text-6xl font-bold text-primary leading-tight mb-6">
                  Or Hakerem
                </h2>
              </div>

              <div className="flex items-center justify-center mb-8">
                <div className="w-12 h-px bg-gradient-to-r from-secondary to-tertiary"></div>
                <div className="w-2 h-2 bg-secondary rounded-full mx-3 shadow-lg"></div>
                <div className="w-12 h-px bg-gradient-to-l from-secondary to-tertiary"></div>
              </div>

              <div className="max-w-4xl space-y-6 text-lg md:text-xl">
                <p className="text-primary/90 leading-relaxed font-light font-lato">
                  Discover the art of refined living at Or Hakerem, Tel Aviv&apos;s premier destination for <span className="font-medium text-secondary">luxury rental</span> accommodations. Nestled in the historic and vibrant neighborhood of Kerem HaTeimanim, our meticulously curated properties redefine <span className="font-medium text-secondary">short term rental</span> experiences for discerning international travelers and local guests seeking an extraordinary escape in Israel&apos;s cultural capital.
                </p>

                <p className="text-primary/85 leading-relaxed font-light font-lato">
                  Whether you&apos;re planning an intimate celebration, a family gathering, or simply desire a sophisticated urban retreat, our <span className="font-medium text-tertiary">luxury apartment</span> offerings in Tel Aviv provide the perfect sanctuary. Each property has been thoughtfully designed to combine timeless elegance with modern convenience, ensuring every moment of your stay exceeds expectations.
                </p>
              </div>

              <div className="mt-10 flex justify-center">
                <Link
                  href="/properties"
                  className="inline-flex items-center bg-gradient-to-r from-secondary to-secondary-light text-primary px-8 py-4 rounded-full font-semibold text-lg hover:from-secondary-light hover:to-secondary transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:scale-105"
                >
                  <span className="mr-2">Explore Properties</span>
                  <div className="w-5 h-5 bg-primary/20 rounded-full flex items-center justify-center">
                    <span className="text-primary text-xs">→</span>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* White Separator */}
      <div className="h-12 bg-white"></div>

      {/* Your Luxury Apartment Section */}
      <section className="py-16 bg-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col items-center">
            <div className="flex-1 text-center">
              <div className="mb-6">
                <h2 className="font-playfair text-3xl md:text-4xl lg:text-5xl font-bold text-primary leading-tight mb-6">
                  Your Luxury Apartment in Tel Aviv Awaits
                </h2>
              </div>

              <div className="flex items-center justify-center mb-8">
                <div className="w-12 h-px bg-gradient-to-r from-secondary to-tertiary"></div>
                <div className="w-2 h-2 bg-secondary rounded-full mx-3 shadow-lg"></div>
                <div className="w-12 h-px bg-gradient-to-l from-secondary to-tertiary"></div>
              </div>

              <div className="max-w-4xl space-y-6 text-lg md:text-xl">
                <p className="text-primary/90 leading-relaxed font-light font-lato">
                  Or Hakerem specializes in premium <span className="font-medium text-secondary">short term rental</span> properties that embody the essence of sophisticated Tel Aviv living. Our exclusive collection features two distinguished apartments: an intimate Studio perfect for couples and romantic getaways, and an expansive Penthouse complete with a private rooftop jacuzzi and panoramic city views. Both properties are located steps from the pulsing energy of Carmel Market and the serene Mediterranean coastline.
                </p>

                <p className="text-primary/85 leading-relaxed font-light font-lato">
                  Kerem HaTeimanim, one of Tel Aviv&apos;s most authentic and charming districts, offers guests an unparalleled blend of historical character and modern vitality. This centuries-old Yemenite quarter is renowned for its culinary excellence, artisanal boutiques, and architectural heritage. From our prime location, you&apos;re mere minutes from Rothschild Boulevard, the bustling city center, world-class dining establishments, and Tel Aviv&apos;s legendary nightlife.
                </p>
              </div>

              <div className="mt-10">
                <h3 className="font-playfair text-2xl md:text-3xl font-semibold text-primary mb-6">
                  Elevate Your Stay with Bespoke Concierge Services
                </h3>
                <p className="text-primary/85 leading-relaxed font-light font-lato text-lg md:text-xl max-w-4xl mx-auto">
                  At Or Hakerem, luxury extends beyond exceptional accommodations. Our dedicated concierge team provides personalized services designed to enhance every aspect of your Tel Aviv experience. From pre-arrival grocery delivery and private airport transfers to restaurant reservations and curated city tours, we anticipate your needs before they arise. Professional babysitting services are available for families, ensuring parents can explore Tel Aviv&apos;s vibrant culture with complete peace of mind.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* White Separator */}
      <div className="h-12 bg-white"></div>

      {/* Promotional Carousel with Events CTA */}
      <PromotionalCarousel />

      {/* White Separator */}
      <div className="h-12 bg-white"></div>

      {/* Events Tel Aviv Section */}
      <section className="py-16 bg-cream relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-10 left-10 w-24 h-24 bg-secondary/10 rounded-full blur-2xl"></div>
          <div className="absolute bottom-10 right-10 w-32 h-32 bg-tertiary/10 rounded-full blur-2xl"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col items-center">
            <div className="flex-1 text-center">
              <div className="mb-6">
                <h2 className="font-playfair text-3xl md:text-4xl lg:text-5xl font-bold text-primary leading-tight mb-6">
                  Events Tel Aviv – Your Private Celebration Venue
                </h2>
              </div>

              <div className="flex items-center justify-center mb-8">
                <div className="w-12 h-px bg-gradient-to-r from-secondary to-tertiary"></div>
                <div className="w-2 h-2 bg-secondary rounded-full mx-3 shadow-lg"></div>
                <div className="w-12 h-px bg-gradient-to-l from-secondary to-tertiary"></div>
              </div>

              <div className="max-w-4xl space-y-6 text-lg md:text-xl">
                <p className="text-primary/90 leading-relaxed font-light font-lato">
                  Transform your special occasions into unforgettable memories at Or Hakerem. Our <span className="font-medium text-secondary">luxury apartments in Tel Aviv</span> serve as exclusive venues for intimate events, from milestone celebrations and engagement dinners to corporate gatherings and private parties. The Penthouse, with its expansive terrace and rooftop jacuzzi, provides a breathtaking backdrop for <span className="font-medium text-tertiary">events Tel Aviv</span> accommodating up to 30 guests. Our event coordination team manages every detail, from catering arrangements to ambiance creation, allowing you to focus solely on celebrating with your loved ones.
                </p>

                <p className="text-primary/85 leading-relaxed font-light font-lato">
                  Choosing Or Hakerem for <span className="font-medium text-secondary">events Tel Aviv</span> means selecting a venue that combines residential warmth with boutique hotel sophistication. Unlike traditional event spaces, our properties offer the intimacy and comfort of a private home while delivering professional event services. Whether hosting a sunset cocktail reception or an elegant dinner party, your celebration benefits from our prime Kerem HaTeimanim location and comprehensive concierge support.
                </p>
              </div>

              <div className="mt-10 flex justify-center">
                <Link
                  href="/events"
                  className="inline-flex items-center bg-gradient-to-r from-secondary to-secondary-light text-primary px-8 py-4 rounded-full font-semibold text-lg hover:from-secondary-light hover:to-secondary transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:scale-105"
                >
                  <span className="mr-2">Discover Event Spaces</span>
                  <div className="w-5 h-5 bg-primary/20 rounded-full flex items-center justify-center">
                    <span className="text-primary text-xs">→</span>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* White Separator */}
      <div className="h-12 bg-white"></div>

      {/* Property Management Section */}
      <section className="py-16 bg-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col items-center">
            <div className="flex-1 text-center">
              <div className="mb-6">
                <h2 className="font-playfair text-3xl md:text-4xl lg:text-5xl font-bold text-primary leading-tight mb-6">
                  Professional Property Management Services
                </h2>
              </div>

              <div className="flex items-center justify-center mb-8">
                <div className="w-12 h-px bg-gradient-to-r from-secondary to-tertiary"></div>
                <div className="w-2 h-2 bg-secondary rounded-full mx-3 shadow-lg"></div>
                <div className="w-12 h-px bg-gradient-to-l from-secondary to-tertiary"></div>
              </div>

              <div className="max-w-4xl space-y-6 text-lg md:text-xl">
                <p className="text-primary/90 leading-relaxed font-light font-lato">
                  Property owners throughout Tel Aviv trust Or Hakerem to maximize their <span className="font-medium text-secondary">short term rental</span> income while maintaining the highest hospitality standards. Our comprehensive property management services include professional photography, dynamic pricing optimization, guest communication, 24/7 maintenance support, and meticulous housekeeping. We handle every operational aspect, from listing optimization across major booking platforms to guest screening and review management.
                </p>

                <p className="text-primary/85 leading-relaxed font-light font-lato">
                  With an intimate understanding of Tel Aviv&apos;s <span className="font-medium text-tertiary">luxury rental</span> market and a commitment to delivering five-star guest experiences, Or Hakerem transforms properties into profitable investments. Our proven track record in Kerem HaTeimanim and surrounding neighborhoods demonstrates our ability to consistently achieve superior occupancy rates and maximize returns while preserving the integrity and condition of your valuable asset.
                </p>
              </div>

              <div className="mt-10 flex justify-center">
                <Link
                  href="/contact"
                  className="inline-flex items-center bg-gradient-to-r from-tertiary to-tertiary/90 text-white px-8 py-4 rounded-full font-semibold text-lg hover:from-tertiary/90 hover:to-tertiary transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:scale-105"
                >
                  <span className="mr-2">Partner With Or Hakerem</span>
                  <div className="w-5 h-5 bg-white/20 rounded-full flex items-center justify-center">
                    <span className="text-white text-xs">→</span>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* White Separator */}
      <div className="h-12 bg-white"></div>

      {/* Why Choose Or Hakerem Section */}
      <section className="py-16 bg-cream relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-6 left-6 w-16 h-16 bg-secondary/10 rounded-full blur-2xl"></div>
          <div className="absolute bottom-6 right-6 w-20 h-20 bg-tertiary/10 rounded-full blur-2xl"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col items-center">
            <div className="flex-1 text-center">
              <div className="mb-6">
                <h3 className="font-playfair text-2xl md:text-3xl lg:text-4xl font-semibold text-primary leading-tight mb-6">
                  Why Choose Or Hakerem for Your Tel Aviv Stay
                </h3>
              </div>

              <div className="flex items-center justify-center mb-8">
                <div className="w-12 h-px bg-gradient-to-r from-secondary to-tertiary"></div>
                <div className="w-2 h-2 bg-secondary rounded-full mx-3 shadow-lg"></div>
                <div className="w-12 h-px bg-gradient-to-l from-secondary to-tertiary"></div>
              </div>

              <div className="max-w-4xl space-y-6 text-lg md:text-xl">
                <p className="text-primary/90 leading-relaxed font-light font-lato">
                  Unlike conventional hotels or impersonal rental platforms, Or Hakerem offers boutique hospitality with authentic local expertise. Every guest receives personalized attention from our multilingual team, who provide insider recommendations and ensure seamless experiences from booking through departure. Our <span className="font-medium text-secondary">luxury apartments in Tel Aviv</span> feature premium furnishings, fully equipped kitchens with high-end appliances, premium bedding and linens, fast fiber-optic WiFi, and thoughtful amenities that make you feel instantly at home.
                </p>

                <p className="text-primary/85 leading-relaxed font-light font-lato">
                  The Or Hakerem difference lies in our obsessive attention to detail and genuine passion for hospitality. We&apos;ve cultivated a collection of properties that reflect Tel Aviv&apos;s unique character while meeting international luxury standards. From the moment you inquire about availability until long after your departure, our commitment to exceptional service remains unwavering. This dedication has earned us countless five-star reviews and a loyal community of returning guests who consider Or Hakerem their Tel Aviv home away from home.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* White Separator */}
      <div className="h-12 bg-white"></div>

      {/* Book Your Luxury Rental Section */}
      <section className="py-16 bg-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col items-center">
            <div className="flex-1 text-center">
              <div className="mb-6">
                <h2 className="font-playfair text-3xl md:text-4xl lg:text-5xl font-bold text-primary leading-tight mb-6">
                  Book Your Luxury Rental in Tel Aviv Today
                </h2>
              </div>

              <div className="flex items-center justify-center mb-8">
                <div className="w-12 h-px bg-gradient-to-r from-secondary to-tertiary"></div>
                <div className="w-2 h-2 bg-secondary rounded-full mx-3 shadow-lg"></div>
                <div className="w-12 h-px bg-gradient-to-l from-secondary to-tertiary"></div>
              </div>

              <div className="max-w-4xl space-y-6 text-lg md:text-xl mb-10">
                <p className="text-primary/90 leading-relaxed font-light font-lato">
                  Ready to experience Tel Aviv through the lens of refined hospitality? Or Hakerem invites you to discover why discerning travelers consistently choose our properties for their Kerem HaTeimanim accommodations. Browse our exclusive <span className="font-medium text-secondary">apartment Tel Aviv</span> collection, explore our comprehensive concierge services, and contact our reservations team to begin planning your unforgettable Tel Aviv journey. Whether seeking a romantic weekend escape, an extended family vacation, or an elegant venue for <span className="font-medium text-tertiary">events Tel Aviv</span>, your perfect <span className="font-medium text-secondary">luxury rental</span> awaits.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Link
                  href="/properties"
                  className="inline-flex items-center bg-gradient-to-r from-secondary to-secondary-light text-primary px-8 py-4 rounded-full font-semibold text-lg hover:from-secondary-light hover:to-secondary transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:scale-105"
                >
                  <span className="mr-2">Book Your Luxury Apartment Now</span>
                  <div className="w-5 h-5 bg-primary/20 rounded-full flex items-center justify-center">
                    <span className="text-primary text-xs">→</span>
                  </div>
                </Link>
                <p className="text-primary/70 text-base font-medium">
                  Experience world-class hospitality in the heart of Tel Aviv
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* White Separator */}
      <div className="h-12 bg-white"></div>

      {/* Concierge Services */}
      <section className="py-12 bg-gradient-to-br from-primary via-primary to-primary-light relative overflow-hidden rounded-3xl mx-4">
        <div className="absolute inset-0">
          <div className="absolute top-10 left-10 w-24 h-24 bg-secondary/10 rounded-full blur-2xl"></div>
          <div className="absolute bottom-10 right-10 w-32 h-32 bg-tertiary/10 rounded-full blur-2xl"></div>
        </div>

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-10">
            <span className="text-secondary font-semibold tracking-wider uppercase">
              Luxury Services
            </span>
            <h2 className="font-playfair text-3xl md:text-4xl font-bold text-white mb-4 leading-tight">
              Conciergerie Services
            </h2>
            <p className="text-white/90 text-lg max-w-2xl mx-auto leading-relaxed">
              Experience personalized luxury with our dedicated concierge team
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8 max-w-5xl mx-auto">
            <div className="group relative text-center p-4 bg-white/10 backdrop-blur-sm rounded-xl transition-all duration-500 hover:scale-105 hover:bg-white/20 hover:shadow-xl border border-white/20">
              <div className="relative inline-block mb-3">
                <div className="relative p-3 bg-gradient-to-br from-secondary to-secondary-light rounded-full shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110">
                  <span className="text-2xl relative z-10">🛒</span>
                </div>
              </div>
              <h3 className="font-playfair text-lg font-bold text-white mb-2 group-hover:text-secondary transition-colors duration-300 relative z-10">
                Grocery Delivery
              </h3>
              <p className="text-white/90 text-sm leading-relaxed group-hover:text-white transition-colors duration-300 relative z-10">
                Fresh groceries and supplies delivered to your door
              </p>
            </div>

            <div className="group relative text-center p-4 bg-white/10 backdrop-blur-sm rounded-xl transition-all duration-500 hover:scale-105 hover:bg-white/20 hover:shadow-xl border border-white/20">
              <div className="relative inline-block mb-3">
                <div className="relative p-3 bg-gradient-to-br from-secondary to-secondary-light rounded-full shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110">
                  <span className="text-2xl relative z-10">🚗</span>
                </div>
              </div>
              <h3 className="font-playfair text-lg font-bold text-white mb-2 group-hover:text-secondary transition-colors duration-300 relative z-10">
                Private Transfers
              </h3>
              <p className="text-white/90 text-sm leading-relaxed group-hover:text-white transition-colors duration-300 relative z-10">
                Luxury chauffeur services
              </p>
            </div>

            <div className="group relative text-center p-4 bg-white/10 backdrop-blur-sm rounded-xl transition-all duration-500 hover:scale-105 hover:bg-white/20 hover:shadow-xl border border-white/20">
              <div className="relative inline-block mb-3">
                <div className="relative p-3 bg-gradient-to-br from-secondary to-secondary-light rounded-full shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110">
                  <span className="text-2xl relative z-10">📅</span>
                </div>
              </div>
              <h3 className="font-playfair text-lg font-bold text-white mb-2 group-hover:text-secondary transition-colors duration-300 relative z-10">
                Event Planning
              </h3>
              <p className="text-white/90 text-sm leading-relaxed group-hover:text-white transition-colors duration-300 relative z-10">
                Access to events and private celebrations
              </p>
            </div>

            <div className="group relative text-center p-4 bg-white/10 backdrop-blur-sm rounded-xl transition-all duration-500 hover:scale-105 hover:bg-white/20 hover:shadow-xl border border-white/20">
              <div className="relative inline-block mb-3">
                <div className="relative p-3 bg-gradient-to-br from-secondary to-secondary-light rounded-full shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110">
                  <span className="text-2xl relative z-10">👶</span>
                </div>
              </div>
              <h3 className="font-playfair text-lg font-bold text-white mb-2 group-hover:text-secondary transition-colors duration-300 relative z-10">
                Baby Sitting
              </h3>
              <p className="text-white/90 text-sm leading-relaxed group-hover:text-white transition-colors duration-300 relative z-10">
                Certified childcare professionals
              </p>
            </div>
          </div>

          <div className="text-center">
            <Link
              href="/concierge-services"
              className="inline-flex items-center bg-gradient-to-r from-secondary to-secondary-light text-primary px-6 py-2 rounded-full font-semibold hover:from-secondary-light hover:to-secondary transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:scale-105"
            >
              <span className="mr-2">View All Services</span>
              <div className="w-4 h-4 bg-primary/20 rounded-full flex items-center justify-center">
                <span className="text-primary text-xs">→</span>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* White Separator */}
      <div className="h-12 bg-white"></div>

      {/* Contact Section */}
      <section id="contact" className="py-12 bg-gradient-to-br from-primary via-primary to-primary-light relative overflow-hidden rounded-3xl mx-4">
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-32 h-32 bg-secondary/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-40 h-40 bg-tertiary/10 rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-10">
            <span className="text-secondary font-semibold text-lg tracking-wider uppercase">
              Contact Us
            </span>
            <h2 className="font-playfair text-3xl md:text-4xl font-bold text-white mb-4 leading-tight">
              Get in Touch
            </h2>
            <p className="text-white/90 text-lg max-w-2xl mx-auto leading-relaxed">
              Have questions? We&apos;re here to help make your stay exceptional
            </p>
          </div>

          <div className="max-w-2xl mx-auto">
            <div className="group relative bg-white/10 backdrop-blur-sm rounded-3xl p-6 transition-all duration-500 hover:bg-white/20 hover:shadow-2xl border border-white/20">
              <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="group/input">
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-white/90 mb-2 group-hover/input:text-secondary transition-colors duration-300"
                    >
                      Your Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      placeholder="Enter your name"
                      required
                      className="w-full h-12 px-4 bg-white/10 backdrop-blur-sm border-2 border-white/20 hover:border-secondary/50 focus:border-secondary focus:ring-2 focus:ring-secondary/20 rounded-xl transition-all duration-300 outline-none text-base text-white placeholder-white/60 group-hover/input:bg-white/20"
                    />
                  </div>

                  <div className="group/input">
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-white/90 mb-2 group-hover/input:text-secondary transition-colors duration-300"
                    >
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      placeholder="your@email.com"
                      required
                      className="w-full h-12 px-4 bg-white/10 backdrop-blur-sm border-2 border-white/20 hover:border-secondary/50 focus:border-secondary focus:ring-2 focus:ring-secondary/20 rounded-xl transition-all duration-300 outline-none text-base text-white placeholder-white/60 group-hover/input:bg-white/20"
                    />
                  </div>
                </div>

                <div className="group/input">
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-white/90 mb-2 group-hover/input:text-secondary transition-colors duration-300"
                  >
                    Your Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    placeholder="Write your message here..."
                    rows={4}
                    required
                    className="w-full px-4 py-3 bg-white/10 backdrop-blur-sm border-2 border-white/20 hover:border-secondary/50 focus:border-secondary focus:ring-2 focus:ring-secondary/20 rounded-xl transition-all duration-300 outline-none resize-none text-base text-white placeholder-white/60 group-hover/input:bg-white/20"
                  ></textarea>
                </div>

                <div className="text-center">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="inline-flex items-center bg-gradient-to-r from-secondary to-secondary-light text-primary px-8 py-3 rounded-full font-semibold text-lg hover:from-secondary-light hover:to-secondary transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <span className="mr-2">
                      {isSubmitting ? 'Sending...' : 'Send Message'}
                    </span>
                    <div className="w-5 h-5 bg-primary/20 rounded-full flex items-center justify-center">
                      <span className="text-primary text-sm">→</span>
                    </div>
                  </button>

                  <p className="text-white/70 text-sm mt-4 font-medium">
                    We&apos;ll get back to you within 24 hours
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* White Separator */}
      <div className="h-12 bg-white"></div>

      {/* Testimonials Carousel */}
      <TestimonialsCarousel />

      {/* FAQ Section */}
      <FAQ />
    </div>
  );
};

export default Home;
