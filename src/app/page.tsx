'use client';

import toast from 'react-hot-toast';

import React, { useState } from 'react';

import Image from 'next/image';

import { sendContactEmail } from '@/actions/contact';
import FAQ from '@/components/FAQ';
import ConciergeServices from '@/components/ConciergeServices';

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
      {/* Hero Section */}
      <div className="relative h-screen">
        <video autoPlay muted playsInline className="absolute inset-0 w-full h-full object-cover">
          <source src="/hero.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-black/40">
          <div className="max-w-7xl mx-auto px-4 h-full flex mt-30 ml-20">
            <div className="text-secondary">
              <h1 className="font-playfair text-5xl md:text-6xl font-bold mb-4">
                Discover Or Hakerem
              </h1>
              <p className="text-xl max-w-2xl">
                Experience in a unique place with our luxury living in the heart of Tel Aviv
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Building Description */}
      <section className="py-20 bg-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="relative h-[400px] rounded-lg overflow-hidden">
              <Image
                src="/penthouse/2-salon-angle.jpg"
                width={500}
                height={500}
                alt="Building Interior"
                className="absolute inset-0 w-full h-full object-cover"
              />
            </div>
            <div>
              <h2 className="font-playfair text-3xl font-bold text-primary mb-6">
                Luxury living in the kerem
              </h2>
              <p className="text-primary/80 leading-relaxed mb-4">
                Located in the Kerem, our property offers a unique experience combining modern
                comforts with local charm.
              </p>
              <p className="text-primary/80 leading-relaxed">
                Whether you&apos;re looking for a romantic getaway, a family holiday or a break with
                friends, Or Hakerem is the place to be for unforgettable memories.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Concierge Services */}
      <ConciergeServices />

      {/* Contact Section - Enhanced 3D Design */}
      <section className="py-20 bg-gradient-to-br from-primary via-primary to-primary-light relative overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-32 h-32 bg-secondary/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-40 h-40 bg-tertiary/10 rounded-full blur-3xl"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-white/5 rounded-full blur-3xl"></div>
        </div>
        
        {/* Animated background pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-white/5 to-transparent transform -skew-y-12 animate-pulse"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Header section with enhanced typography */}
          <div className="text-center mb-16">
            <div className="inline-block mb-4">
              <span className="text-secondary font-semibold text-lg tracking-wider uppercase">
                Contact Us
              </span>
            </div>
            <h2 className="font-playfair text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
              Get in Touch
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-secondary to-tertiary mx-auto mb-6"></div>
            <p className="text-white/90 text-xl max-w-3xl mx-auto leading-relaxed">
              Have questions? We&apos;re here to help make your stay exceptional
              <br className="hidden md:block" />
              and create unforgettable memories
            </p>
          </div>

          {/* Enhanced Contact Form */}
          <div className="max-w-3xl mx-auto">
            <div className="group relative bg-white/10 backdrop-blur-sm rounded-3xl p-10 transition-all duration-500 hover:bg-white/20 hover:shadow-2xl border border-white/20">
              {/* Gradient overlay on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-secondary/20 to-tertiary/20 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              
              <form onSubmit={handleSubmit} className="space-y-8 relative z-10">
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="group/input">
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-white/90 mb-3 group-hover/input:text-secondary transition-colors duration-300"
                    >
                      Your Name
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        id="name"
                        name="name"
                        placeholder="Enter your name"
                        required
                        className="w-full h-14 px-6 bg-white/10 backdrop-blur-sm border-2 border-white/20 hover:border-secondary/50 focus:border-secondary focus:ring-2 focus:ring-secondary/20 rounded-xl transition-all duration-300 outline-none text-base text-white placeholder-white/60 group-hover/input:bg-white/20"
                      />
                      <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-secondary/10 to-tertiary/10 opacity-0 group-hover/input:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                    </div>
                  </div>

                  <div className="group/input">
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-white/90 mb-3 group-hover/input:text-secondary transition-colors duration-300"
                    >
                      Email Address
                    </label>
                    <div className="relative">
                      <input
                        type="email"
                        id="email"
                        name="email"
                        placeholder="your@email.com"
                        required
                        className="w-full h-14 px-6 bg-white/10 backdrop-blur-sm border-2 border-white/20 hover:border-secondary/50 focus:border-secondary focus:ring-2 focus:ring-secondary/20 rounded-xl transition-all duration-300 outline-none text-base text-white placeholder-white/60 group-hover/input:bg-white/20"
                      />
                      <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-secondary/10 to-tertiary/10 opacity-0 group-hover/input:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                    </div>
                  </div>
                </div>

                <div className="group/input">
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-white/90 mb-3 group-hover/input:text-secondary transition-colors duration-300"
                  >
                    Your Message
                  </label>
                  <div className="relative">
                    <textarea
                      id="message"
                      name="message"
                      placeholder="Write your message here..."
                      rows={5}
                      required
                      className="w-full px-6 py-4 bg-white/10 backdrop-blur-sm border-2 border-white/20 hover:border-secondary/50 focus:border-secondary focus:ring-2 focus:ring-secondary/20 rounded-xl transition-all duration-300 outline-none resize-none text-base text-white placeholder-white/60 group-hover/input:bg-white/20"
                    ></textarea>
                    <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-secondary/10 to-tertiary/10 opacity-0 group-hover/input:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                  </div>
                </div>

                <div className="text-center">
                  <div className="inline-block relative group/button">
                    <div className="absolute inset-0 bg-gradient-to-r from-secondary to-tertiary rounded-full blur-lg opacity-50 group-hover/button:opacity-75 transition-opacity duration-300"></div>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="relative inline-flex items-center bg-gradient-to-r from-secondary to-secondary-light text-primary px-12 py-4 rounded-full font-semibold text-lg hover:from-secondary-light hover:to-secondary transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <span className="mr-3">
                        {isSubmitting ? 'Sending...' : 'Send Message'}
                      </span>
                      <div className="w-6 h-6 bg-primary/20 rounded-full flex items-center justify-center">
                        <span className="text-primary text-sm">→</span>
                      </div>
                    </button>
                  </div>
                  
                  {/* Subtitle under button */}
                  <p className="text-white/70 text-sm mt-6 font-medium">
                    We'll get back to you within 24 hours
                  </p>
                </div>
              </form>

              {/* Decorative corner elements */}
              <div className="absolute top-6 right-6 w-3 h-3 bg-secondary rounded-full opacity-50 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="absolute bottom-6 left-6 w-3 h-3 bg-tertiary rounded-full opacity-50 group-hover:opacity-100 transition-opacity duration-300"></div>
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