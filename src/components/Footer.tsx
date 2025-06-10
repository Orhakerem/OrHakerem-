'use client';

import React from 'react';
import Link from 'next/link';
import { Mail } from 'lucide-react';
import Image from 'next/image';

export default function Footer() {
  return (
    <footer className="bg-primary text-white relative overflow-hidden rounded-t-3xl">
      {/* Background decorative elements - Reduced */}
      <div className="absolute inset-0">
        <div className="absolute top-5 left-5 w-16 h-16 bg-secondary/10 rounded-full blur-xl"></div>
        <div className="absolute bottom-5 right-5 w-20 h-20 bg-tertiary/10 rounded-full blur-xl"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-white/5 rounded-full blur-2xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Main Footer Content - Compact */}
        <div className="py-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 md:gap-8">
            
            {/* Column 1: Logo & Brand - Even Bigger Logo */}
            <div className="text-center md:text-left md:col-span-1">
              <div className="flex items-center justify-center md:justify-start mb-4">
                <div className="relative w-24 h-24 mr-4 group">
                  <Image
                    src="/orhakerem_logo_original.jpg"
                    alt="Or Hakerem Logo"
                    fill
                    className="object-contain rounded-xl shadow-lg group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-secondary/20 to-tertiary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                <div>
                  <span className="font-playfair text-3xl font-bold text-secondary block">
                    Or Hakerem
                  </span>
                  <span className="text-white/80 text-sm">Luxury Properties</span>
                </div>
              </div>
            </div>
            
            {/* Column 2: Contact - Compact */}
            <div className="text-center md:text-left">
              <h3 className="font-playfair text-xl font-bold text-secondary mb-4">Contact Us</h3>
              
              <div className="space-y-3">
                <div className="group">
                  <div className="flex items-center justify-center md:justify-start group-hover:bg-white/10 rounded-lg p-2 transition-colors duration-300">
                    <Mail className="w-4 h-4 text-secondary mr-2 flex-shrink-0 group-hover:scale-110 transition-transform duration-300" />
                    <a 
                      href="mailto:keremliving@gmail.com" 
                      className="text-white/90 hover:text-secondary transition-colors duration-300 text-sm font-medium"
                    >
                      keremliving@gmail.com
                    </a>
                  </div>
                </div>
                
                <div className="group">
                  <div className="flex items-center justify-center md:justify-start group-hover:bg-white/10 rounded-lg p-2 transition-colors duration-300">
                    <span className="text-secondary mr-2 text-sm group-hover:scale-110 transition-transform duration-300">📞</span>
                    <div className="flex flex-col space-y-1">
                      <a 
                        href="tel:+33651179925" 
                        className="text-white/90 hover:text-secondary transition-colors duration-300 text-sm font-medium"
                      >
                        +33 6 51 17 99 25
                      </a>
                      <a 
                        href="tel:+972526869791" 
                        className="text-white/90 hover:text-secondary transition-colors duration-300 text-sm font-medium"
                      >
                        +972 52 686 9791
                      </a>
                    </div>
                  </div>
                </div>

                {/* Instagram Icon - Compact */}
                <div className="pt-1 flex justify-center md:justify-start">
                  <a 
                    href="https://www.instagram.com/or_hakerem/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center w-10 h-10 bg-white/10 hover:bg-white/20 rounded-xl transition-all duration-300 group border border-white/20"
                    aria-label="Or Hakerem Instagram"
                  >
                    <svg 
                      className="w-5 h-5 text-white group-hover:text-secondary transition-colors duration-300 group-hover:scale-110" 
                      fill="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                    </svg>
                  </a>
                </div>
              </div>
            </div>

            {/* Column 3: Quick Links - Bigger Text */}
            <div className="text-center md:text-left">
              <h3 className="font-playfair text-xl font-bold text-secondary mb-4">Navigation</h3>
              
              <nav className="space-y-2">
                <Link 
                  href="/properties" 
                  className="block text-white/90 hover:text-secondary hover:translate-x-2 transition-all duration-300 text-lg font-medium p-2 rounded-lg hover:bg-white/10"
                >
                  Accommodations
                </Link>
                <Link 
                  href="/concierge-services" 
                  className="block text-white/90 hover:text-secondary hover:translate-x-2 transition-all duration-300 text-lg font-medium p-2 rounded-lg hover:bg-white/10"
                >
                  Concierge Services
                </Link>
                <Link 
                  href="/events" 
                  className="block text-white/90 hover:text-secondary hover:translate-x-2 transition-all duration-300 text-lg font-medium p-2 rounded-lg hover:bg-white/10"
                >
                  Events
                </Link>
                <Link 
                  href="/#contact" 
                  className="block text-white/90 hover:text-secondary hover:translate-x-2 transition-all duration-300 text-lg font-medium p-2 rounded-lg hover:bg-white/10"
                >
                  Contact
                </Link>
              </nav>
            </div>

            {/* Column 4: Legal - Bigger Text */}
            <div className="text-center md:text-left">
              <h3 className="font-playfair text-xl font-bold text-secondary mb-4">Policies</h3>
              
              <nav className="space-y-2">
                <Link 
                  href="/cancellation" 
                  className="block text-white/90 hover:text-secondary hover:translate-x-2 transition-all duration-300 text-lg font-medium p-2 rounded-lg hover:bg-white/10"
                >
                  Cancellation Policy
                </Link>
                <Link 
                  href="/terms" 
                  className="block text-white/90 hover:text-secondary hover:translate-x-2 transition-all duration-300 text-lg font-medium p-2 rounded-lg hover:bg-white/10"
                >
                  Terms & Conditions
                </Link>
                <Link 
                  href="/privacy" 
                  className="block text-white/90 hover:text-secondary hover:translate-x-2 transition-all duration-300 text-lg font-medium p-2 rounded-lg hover:bg-white/10"
                >
                  Privacy Policy
                </Link>
              </nav>
            </div>
          </div>
        </div>

        {/* Bottom Bar - Compact */}
        <div className="border-t border-white/20 py-4">
          <div className="text-center">
            <p className="text-white/80 text-base font-medium">
              © 2025 Or Hakerem. All rights reserved.
            </p>
            <p className="text-white/60 text-sm mt-1">
              Luxury accommodations in the heart of Tel Aviv
            </p>
          </div>
        </div>
      </div>

      {/* Enhanced gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-primary via-transparent to-transparent opacity-30 pointer-events-none"></div>

      {/* Microdata Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            "name": "Or Hakerem",
            "description": "Luxury properties in Tel Aviv",
            "url": "https://orhakerem.com",
            "telephone": ["+33651179925", "+972526869791"],
            "email": "keremliving@gmail.com",
            "address": {
              "@type": "PostalAddress",
              "addressLocality": "Tel Aviv",
              "addressCountry": "Israel"
            }
          })
        }}
      />
    </footer>
  );
}