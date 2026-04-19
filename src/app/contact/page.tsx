'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowLeft, Home } from 'lucide-react';
import ContactForm from '@/components/ContactForm';

export default function ContactPage() {
  return (
    <div className="min-h-screen pt-24 pb-20 bg-cream">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Enhanced Back Navigation */}
        <div className="mb-8" data-animate="fade-right">
          <Link
            href="/"
            className="inline-flex items-center rounded-full border border-primary/20 bg-white/80 px-6 py-3 text-lg font-semibold text-primary shadow-lg transition-all duration-300"
          >
            <div className="relative mr-3">
              <ArrowLeft className="w-5 h-5" />
            </div>
            <Home className="w-5 h-5 mr-2 opacity-70" />
            <span className="relative z-10">Back to Home</span>
          </Link>
        </div>

        {/* Contact Section */}
        <section className="py-20 bg-gradient-to-br from-primary via-primary to-primary-light relative overflow-hidden rounded-3xl" data-animate="fade-up">
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
            <div className="text-center mb-8" data-animate="fade-up">
              <h1 className="font-playfair text-3xl md:text-4xl font-bold text-white mb-4 leading-tight" data-animate="text" data-delay="1">
                Contact Or HaKerem
              </h1>
              <p className="text-white/90 text-lg max-w-2xl mx-auto leading-relaxed" data-animate="fade-up" data-delay="2">
                Or HaKerem is located in the heart of Tel Aviv, in the vibrant Kerem HaTeimanim neighborhood, within walking distance of Carmel Market and the beach. If you are looking for a luxury apartment in Tel Aviv or planning a boutique event, our team is here to assist you. Our team responds quickly to all inquiries and is available to help you plan your stay or event.
              </p>
            </div>
            <ContactForm 
              showTitle={false}
              variant="default"
            />
          </div>
        </section>

        {/* Additional Contact Information */}
        <section className="mt-16 bg-white rounded-2xl shadow-xl p-8 md:p-12" data-animate="fade-up">
          <div className="text-center mb-8">
            <h2 className="font-playfair text-3xl font-bold text-primary mb-4" data-animate="text">
              Other Ways to Reach Us
            </h2>
            <p className="text-primary/80 text-lg">
              Choose the method that works best for you
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8" data-animate-group="cards">
            {/* Email */}
            <div className="text-center p-6 bg-gradient-to-br from-cream to-white rounded-xl border border-secondary/20">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-secondary to-secondary-light rounded-full mb-4">
                <span className="text-2xl">📧</span>
              </div>
              <h3 className="font-playfair text-xl font-bold text-primary mb-2">Email</h3>
              <a 
                href="mailto:keremliving@gmail.com"
                className="font-medium text-primary/80"
              >
                keremliving@gmail.com
              </a>
            </div>

            {/* Phone / WhatsApp */}
            <div className="text-center p-6 bg-gradient-to-br from-cream to-white rounded-xl border border-secondary/20">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-tertiary to-tertiary-light rounded-full mb-4">
                <span className="text-2xl text-white">📞</span>
              </div>
              <h3 className="font-playfair text-xl font-bold text-primary mb-2">Phone & WhatsApp</h3>
              <div className="space-y-3">
                <a 
                  href="tel:+33651179925"
                  className="block font-medium text-primary/80"
                >
                  +33 6 51 17 99 25
                </a>
                <a 
                  href="https://wa.me/972526869791"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-secondary to-secondary-light px-5 py-2.5 font-semibold text-primary shadow-lg transition-all duration-300"
                >
                  WhatsApp: +972 52 686 9791
                </a>
              </div>
            </div>

            {/* Instagram */}
            <div className="text-center p-6 bg-gradient-to-br from-cream to-white rounded-xl border border-secondary/20">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-primary to-primary-light rounded-full mb-4">
                <span className="text-2xl text-white">📱</span>
              </div>
              <h3 className="font-playfair text-xl font-bold text-primary mb-2">Social Media</h3>
              <a 
                href="https://www.instagram.com/or_hakerem/"
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-primary/80"
              >
                @or_hakerem
              </a>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
