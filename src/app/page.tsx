'use client';

import toast from 'react-hot-toast';

import React, { useState } from 'react';

import Link from 'next/link';

import { sendContactEmail } from '@/actions/contact';
import FAQ from '@/components/FAQ';
import TestimonialsCarousel from '@/components/TestimonialsCarousel';
import PromotionalCarousel from '@/components/PromotionalCarousel';

const Home: React.FC = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const heroHeadline =
    'Luxury Short-Term Stays in Tel Aviv – Or HaKerem';

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
      <div className="hero-home relative w-full h-screen overflow-hidden">
        <div className="hero-home-media absolute inset-0">
          {/* Video Background */}
          <video
            autoPlay
            muted
            loop
            playsInline
            className="hero-home-video absolute inset-0 w-full h-full object-cover"
          >
            <source src="/hero.mp4" type="video/mp4" />
          </video>
          <div className="hero-home-overlay absolute inset-0"></div>
          {/* Fallback for browsers that don't support video */}
          <div className="hero-home-fallback absolute inset-0 bg-primary"></div>
        </div>

        {/* Desktop / large tablet overlay */}
        <div className="hero-title hero-home-title" data-animate="text">
          <h1 className="font-playfair font-bold hero-subtitle">
            {heroHeadline}
          </h1>
        </div>

        <div className="glass-cta-wrap hero-home-cta-wrap">
          <Link
            href="/properties"
            className="glass-cta"
          >
            View Properties
          </Link>
        </div>

        {/* Mobile / tablet hero */}
        <div className="hero-home-mobile-strip"></div>

        <div className="hero-home-mobile-text">
          <div className="hero-home-mobile-text-inner">
            <div
              aria-hidden="true"
              className="hero-home-mobile-title font-montserrat font-bold"
              data-animate="text"
            >
              {heroHeadline}
            </div>
          </div>
        </div>

        <div className="hero-home-mobile-video-section">
          <div className="hero-home-mobile-video-wrap">
            <video
              autoPlay
              muted
              loop
              playsInline
              className="hero-home-mobile-video"
            >
              <source src="/hero.mp4" type="video/mp4" />
            </video>
          </div>
        </div>
      </div>

      {/* Welcome Section */}
      <section className="py-16 bg-cream relative overflow-hidden" data-animate="fade-up">
        <div className="absolute inset-0">
          <div className="absolute top-6 left-6 w-16 h-16 bg-secondary/10 rounded-full blur-2xl"></div>
          <div className="absolute bottom-6 right-6 w-20 h-20 bg-tertiary/10 rounded-full blur-2xl"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col items-center">
            <div className="flex-1 text-center">
              <div className="mb-6" data-animate="fade-up">
                <span className="text-secondary font-semibold text-lg tracking-[0.2em] uppercase block mb-3">
                  Welcome to
                </span>
                <h2 className="font-playfair text-4xl md:text-5xl lg:text-6xl font-bold text-primary leading-tight mb-6" data-animate="text" data-delay="1">
                  Or Hakerem
                </h2>
              </div>

              <div className="flex items-center justify-center mb-8">
                <div className="w-12 h-px bg-gradient-to-r from-secondary to-tertiary"></div>
                <div className="w-2 h-2 bg-secondary rounded-full mx-3 shadow-lg"></div>
                <div className="w-12 h-px bg-gradient-to-l from-secondary to-tertiary"></div>
              </div>

              <div className="max-w-4xl space-y-6 text-lg md:text-xl" data-animate="fade-up" data-delay="2">
                <p className="text-primary/90 leading-relaxed font-light font-lato">
                  Or Hakerem is a unique building offering premium apartments for short-term stays in the heart of Tel Aviv.
                </p>

                <p className="text-primary/80 leading-relaxed font-light font-lato">
                  Located in Kerem HaTeimanim, near Carmel Market and within walking distance to the beach, the property places you right in the center of it all — just moments from Banana Beach, Nachalat Binyamin, and the vibrant energy of the city.
                </p>

                <p className="text-primary/85 leading-relaxed font-light font-lato">
                  Each apartment comes in a different format, designed to suit everything from short city stays to family trips, private gatherings, and special events. What they all share is the same standard: carefully designed spaces, comfort, and a location that makes everything feel easy.
                </p>

                <p className="text-primary/85 leading-relaxed font-light font-lato">
                  Whether you’re coming for a few days by the sea or planning a more private moment, Or Hakerem offers a flexible and elevated way to experience Tel Aviv.
                </p>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* White Separator */}
      <div className="home-section-divider h-12 bg-white"></div>

      {/* Promotional Carousel with Events CTA */}
      <div data-animate="fade-up">
        <PromotionalCarousel/>
      </div>

      {/* White Separator */}
      <div className="h-12 bg-white"></div>

      {/* Location Section */}
      <section className="home-location-section py-16 bg-cream relative overflow-hidden" data-animate="fade-up">
        <div className="absolute inset-0">
          <div className="absolute top-6 left-6 w-16 h-16 bg-secondary/10 rounded-full blur-2xl"></div>
          <div className="absolute bottom-6 right-6 w-20 h-20 bg-tertiary/10 rounded-full blur-2xl"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col items-center">
            <div className="home-location-header text-center mb-12" data-animate="fade-up">
              <span className="text-secondary font-semibold text-lg tracking-[0.2em] uppercase block mb-3">
                Our Location
              </span>
              <h2 className="font-playfair text-4xl md:text-5xl lg:text-6xl font-bold text-primary leading-tight mb-6" data-animate="text" data-delay="1">
                At the Heart of Tel Aviv
              </h2>
            </div>

            <div className="home-location-content max-w-4xl w-full mb-8" data-animate="fade-up" data-delay="2">
              <p className="text-primary/90 text-lg md:text-xl leading-relaxed font-light text-center mb-8">
                Our building is located at <span className="font-medium text-secondary">35 Hakovshim Street</span>, in Kerem HaTeimanim, just steps from the beach and near Carmel Market for guests who want a central, walkable stay in Tel Aviv.
              </p>

              <div className="w-full rounded-2xl overflow-hidden shadow-xl border border-primary/10" data-animate="zoom">
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

              <div className="text-center mt-8" data-animate="scale" data-delay="3">
                <a
                  href="https://www.google.com/maps?q=Hakovshim+35+Tel+Aviv"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="button-hover-clean inline-flex items-center rounded-full bg-gradient-to-r from-secondary to-secondary-light px-8 py-4 text-lg font-semibold text-primary shadow-xl transition-all duration-300"
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
      <div className="home-section-divider h-12 bg-white"></div>

      {/* Contact Section */}
      <section id="contact" className="home-contact-section py-12 bg-gradient-to-br from-primary via-primary to-primary-light relative overflow-hidden rounded-3xl mx-4" data-animate="fade-up">
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-32 h-32 bg-secondary/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-40 h-40 bg-tertiary/10 rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="home-contact-header text-center mb-10" data-animate="fade-up">
            <span className="text-secondary font-semibold text-lg tracking-wider uppercase">
              Contact Us
            </span>
            <h2 className="font-playfair text-3xl md:text-4xl font-bold text-white mb-4 leading-tight" data-animate="text" data-delay="1">
              Get in Touch
            </h2>
            <p className="text-white/90 text-lg max-w-2xl mx-auto leading-relaxed">
              Have questions? We&apos;re here to help make your stay exceptional
            </p>
          </div>

          <div className="max-w-2xl mx-auto" data-animate="scale" data-delay="2">
            <div className="home-contact-card relative rounded-3xl border border-white/20 bg-white/10 p-6 backdrop-blur-sm">
              <form onSubmit={handleSubmit} className="home-contact-form space-y-6 relative z-10">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label
                      htmlFor="name"
                      className="mb-2 block text-sm font-medium text-white/90"
                    >
                      Your Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      placeholder="Enter your name"
                      required
                      className="h-12 w-full rounded-xl border-2 border-white/20 bg-white/10 px-4 text-base text-white placeholder-white/60 outline-none transition-colors duration-300 focus:border-white/35 focus:ring-2 focus:ring-white/15"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="email"
                      className="mb-2 block text-sm font-medium text-white/90"
                    >
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      placeholder="your@email.com"
                      required
                      className="h-12 w-full rounded-xl border-2 border-white/20 bg-white/10 px-4 text-base text-white placeholder-white/60 outline-none transition-colors duration-300 focus:border-white/35 focus:ring-2 focus:ring-white/15"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="mb-2 block text-sm font-medium text-white/90"
                  >
                    Your Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    placeholder="Write your message here..."
                    rows={4}
                    required
                    className="w-full resize-none rounded-xl border-2 border-white/20 bg-white/10 px-4 py-3 text-base text-white placeholder-white/60 outline-none transition-colors duration-300 focus:border-white/35 focus:ring-2 focus:ring-white/15"
                  ></textarea>
                </div>

                <div className="text-center">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="button-hover-clean inline-flex items-center rounded-full bg-gradient-to-r from-secondary to-secondary-light px-8 py-3 text-lg font-semibold text-primary shadow-xl transition-all duration-300 disabled:cursor-not-allowed disabled:opacity-50"
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
      <div className="home-section-divider h-12 bg-white"></div>

      {/* Testimonials Carousel */}
      <div data-animate="fade-up">
        <TestimonialsCarousel />
      </div>

      {/* FAQ Section */}
      <div data-animate="fade-up">
        <FAQ />
      </div>
    </div>
  );
};

export default Home;
