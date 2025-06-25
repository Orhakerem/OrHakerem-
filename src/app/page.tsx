'use client';

import toast from 'react-hot-toast';

import React, { useState } from 'react';

import Image from 'next/image';
import Link from 'next/link';

import { sendContactEmail } from '@/actions/contact';
import FAQ from '@/components/FAQ';

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
      {/* Hero Section - Proper spacing below navbar */}
      <div className="relative h-screen" style={{ marginTop: '80px' }}>
        <div className="absolute inset-0 bg-gradient-to-r from-primary/80 to-primary/60">
          <div className="max-w-7xl mx-auto px-4 h-full flex items-center justify-center">
            <div className="text-center text-white">
              <h1 className="font-playfair text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                Discover Or Hakerem
              </h1>
              <p className="text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
                Experience luxury living in the heart of Tel Aviv with our premium accommodations
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* White Separator */}
      <div className="h-8 bg-white"></div>

      {/* Luxury Living Section */}
      <section className="py-12 bg-cream relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-6 left-6 w-24 h-24 bg-secondary/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-6 right-6 w-32 h-32 bg-tertiary/10 rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-8">
            {/* Logo Section */}
            <div className="flex-shrink-0">
              <div className="relative w-40 h-40 lg:w-48 lg:h-48 group">
                <Image
                  src="/OR_HAKEERM_logo_beige_NOTEXT.jpg"
                  alt="Or Hakerem Logo"
                  fill
                  className="object-contain group-hover:scale-105 transition-transform duration-500 rounded-2xl"
                />
                <div className="absolute inset-0 border-2 border-secondary/20 rounded-3xl group-hover:border-secondary/40 transition-colors duration-500"></div>
              </div>
            </div>

            {/* Content Section */}
            <div className="flex-1 text-center lg:text-left">
              <div className="mb-6">
                <span className="text-secondary font-semibold text-lg tracking-[0.2em] uppercase block mb-3">
                  Luxury Living
                </span>
                <h2 className="font-playfair text-4xl md:text-5xl lg:text-6xl font-light text-primary leading-none mb-3">
                  <span className="font-normal italic text-3xl md:text-4xl lg:text-5xl block mb-1">in the</span>
                  <span className="font-bold block">Kerem</span>
                </h2>
              </div>

              <div className="flex items-center justify-center lg:justify-start mb-6">
                <div className="w-12 h-px bg-gradient-to-r from-secondary to-tertiary"></div>
                <div className="w-2 h-2 bg-secondary rounded-full mx-3 shadow-lg"></div>
                <div className="w-12 h-px bg-gradient-to-l from-secondary to-tertiary"></div>
              </div>

              <div className="max-w-3xl space-y-5 text-lg md:text-xl">
                <p className="text-primary/90 leading-relaxed font-light font-lato">
                  Nestled in the heart of Tel Aviv&apos;s most distinguished neighborhood, our properties offer an 
                  <span className="font-medium text-secondary"> unparalleled fusion </span>
                  of contemporary sophistication and timeless elegance.
                </p>
                
                <p className="text-primary/80 leading-relaxed font-light font-lato">
                  Whether seeking a romantic retreat, a family sanctuary, or an intimate gathering space, 
                  Or Hakerem presents the epitome of luxury living where every detail has been 
                  <span className="font-medium text-tertiary"> meticulously curated </span>
                  to create unforgettable memories.
                </p>

                <p className="text-primary/70 text-base md:text-lg leading-relaxed italic font-playfair">
                  Kerem Hatemanim is a very lively district, known for its historical charm. You are only a few minutes from the city center 🌆
                </p>
              </div>

              <div className="mt-8 flex justify-center lg:justify-start">
                <Link
                  href="/properties"
                  className="inline-flex items-center bg-gradient-to-r from-secondary to-secondary-light text-primary px-6 py-3 rounded-full font-semibold text-base hover:from-secondary-light hover:to-secondary transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:scale-105"
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
                  <span className="text-2xl relative z-10">🍽️</span>
                </div>
              </div>
              <h3 className="font-playfair text-lg font-bold text-white mb-2 group-hover:text-secondary transition-colors duration-300 relative z-10">
                Dining Reservations
              </h3>
              <p className="text-white/90 text-sm leading-relaxed group-hover:text-white transition-colors duration-300 relative z-10">
                Priority booking and recommendation for restaurants
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

      {/* FAQ Section */}
      <FAQ />
    </div>
  );
};

export default Home;