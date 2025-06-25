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
        <div className="mb-8">
          <div className="inline-block relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-full blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <Link
              href="/"
              className="relative inline-flex items-center bg-white/80 backdrop-blur-sm text-primary px-6 py-3 rounded-full font-semibold text-lg hover:bg-white hover:text-secondary transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 border border-primary/20"
            >
              <div className="relative mr-3">
                <ArrowLeft className="w-5 h-5 transition-transform duration-300 group-hover:-translate-x-1" />
                <div className="absolute inset-0 bg-secondary/20 rounded-full scale-0 group-hover:scale-150 transition-transform duration-300"></div>
              </div>
              <Home className="w-5 h-5 mr-2 opacity-70 group-hover:opacity-100 transition-opacity duration-300" />
              <span className="relative z-10">Back to Home</span>
            </Link>
          </div>
        </div>

        {/* Contact Section */}
        <section className="py-20 bg-gradient-to-br from-primary via-primary to-primary-light relative overflow-hidden rounded-3xl">
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
            <ContactForm 
              title="Contact Or Hakerem"
              subtitle="Ready to experience luxury in Tel Aviv? Get in touch with us for reservations, inquiries, or to learn more about our premium accommodations and concierge services."
              variant="default"
            />
          </div>
        </section>

        {/* Additional Contact Information */}
        <section className="mt-16 bg-white rounded-2xl shadow-xl p-8 md:p-12">
          <div className="text-center mb-8">
            <h2 className="font-playfair text-3xl font-bold text-primary mb-4">
              Other Ways to Reach Us
            </h2>
            <p className="text-primary/80 text-lg">
              Choose the method that works best for you
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Email */}
            <div className="text-center p-6 bg-gradient-to-br from-cream to-white rounded-xl border border-secondary/20">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-secondary to-secondary-light rounded-full mb-4">
                <span className="text-2xl">📧</span>
              </div>
              <h3 className="font-playfair text-xl font-bold text-primary mb-2">Email</h3>
              <a 
                href="mailto:keremliving@gmail.com"
                className="text-primary/80 hover:text-secondary transition-colors duration-300 font-medium"
              >
                keremliving@gmail.com
              </a>
            </div>

            {/* Phone */}
            <div className="text-center p-6 bg-gradient-to-br from-cream to-white rounded-xl border border-secondary/20">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-tertiary to-tertiary-light rounded-full mb-4">
                <span className="text-2xl text-white">📞</span>
              </div>
              <h3 className="font-playfair text-xl font-bold text-primary mb-2">Phone</h3>
              <div className="space-y-1">
                <a 
                  href="tel:+33651179925"
                  className="block text-primary/80 hover:text-secondary transition-colors duration-300 font-medium"
                >
                  +33 6 51 17 99 25
                </a>
                <a 
                  href="tel:+972526869791"
                  className="block text-primary/80 hover:text-secondary transition-colors duration-300 font-medium"
                >
                  +972 52 686 9791
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
                className="text-primary/80 hover:text-secondary transition-colors duration-300 font-medium"
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