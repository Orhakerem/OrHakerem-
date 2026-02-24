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
             Short-term rental apartments in Tel Aviv
          </h1>
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
                  Start your experience in a city that never stops, but differently. At Orhakerem, we offer a unique type of <span className="font-medium text-secondary">short term rental</span> accommodations where you feel at home. Nestled in the historic neighborhood of Kerem HaTeimanim, this unique building has a historical past, and his perfect location offers new apartments for short-term rental and events.
                </p>

                <p className="text-primary/85 leading-relaxed font-light font-lato">
                  Whether you&apos;re planning an intimate celebration, a family gathering, or simply desire a sophisticated urban retreat, our <span className="font-medium text-tertiary">unique place</span> offers the perfect sanctuary in Tel Aviv for all of your demands. Each property has been thoughtfully designed to combine modern design with the history of this building and of the Kerem Hateimanim.
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

      {/* Promotional Carousel with Events CTA */}
      <PromotionalCarousel/>

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

      {/* Location Section */}
      <section className="py-16 bg-cream relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-6 left-6 w-16 h-16 bg-secondary/10 rounded-full blur-2xl"></div>
          <div className="absolute bottom-6 right-6 w-20 h-20 bg-tertiary/10 rounded-full blur-2xl"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col items-center">
            <div className="text-center mb-12">
              <span className="text-secondary font-semibold text-lg tracking-[0.2em] uppercase block mb-3">
                Our Location
              </span>
              <h2 className="font-playfair text-4xl md:text-5xl lg:text-6xl font-bold text-primary leading-tight mb-6">
                At the Heart of Tel Aviv
              </h2>
            </div>

            <div className="max-w-4xl w-full mb-8">
              <p className="text-primary/90 text-lg md:text-xl leading-relaxed font-light text-center mb-8">
                Our building is located at <span className="font-medium text-secondary">35 Hakovshim Street</span>, in the Kerem HaTeimanim neighborhood, just steps away from the beach and the Carmel Market.
              </p>

              <div className="w-full rounded-2xl overflow-hidden shadow-xl border border-primary/10">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3380.969106191464!2d34.76409907581854!3d32.07008431977721!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x151d4c843acd13ab%3A0xb4aff2902a9ec6dd!2sHaKovshim%2035%2C%20Tel%20Aviv-Jaffa!5e0!3m2!1sfr!2sil!4v1771934464053!5m2!1sfr!2sil"
                  width="100%"
                  height="450"
                  style={{ border: 0, minHeight: '400px' }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="w-full"
                  title="Or Hakerem Location - 35 Hakovshim Street, Tel Aviv"
                ></iframe>
                
              </div>

              <div className="text-center mt-8">
                <a
                  href="https://www.google.com/maps?q=Hakovshim+35+Tel+Aviv"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center bg-gradient-to-r from-secondary to-secondary-light text-primary px-8 py-4 rounded-full font-semibold text-lg hover:from-secondary-light hover:to-secondary transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:scale-105"
                >
                  <span className="mr-2">Open in Google Maps</span>
                  <div className="w-5 h-5 bg-primary/20 rounded-full flex items-center justify-center">
                    <span className="text-primary text-xs">→</span>
                  </div>
                </a>
              </div>
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
