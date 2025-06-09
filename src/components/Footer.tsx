'use client';

import React from 'react';
import Link from 'next/link';
import { Mail, Phone } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-primary text-white relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0">
        <div className="absolute top-10 left-10 w-24 h-24 bg-secondary/10 rounded-full blur-2xl"></div>
        <div className="absolute bottom-10 right-10 w-32 h-32 bg-tertiary/10 rounded-full blur-2xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Main Footer Content */}
        <div className="py-12 md:py-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
            
            {/* Column 1: Contact */}
            <div className="text-center md:text-left">
              <h3 className="font-playfair text-xl font-bold text-secondary mb-6">Contact Us</h3>
              
              <div className="space-y-4">
                <div className="flex items-center justify-center md:justify-start">
                  <Mail className="w-5 h-5 text-secondary mr-3 flex-shrink-0" />
                  <a 
                    href="mailto:keremliving@gmail.com" 
                    className="text-white/90 hover:text-secondary transition-colors duration-300"
                  >
                    keremliving@gmail.com
                  </a>
                </div>
                
                <div className="flex items-center justify-center md:justify-start">
                  <Phone className="w-5 h-5 text-secondary mr-3 flex-shrink-0" />
                  <a 
                    href="tel:+33651179925" 
                    className="text-white/90 hover:text-secondary transition-colors duration-300"
                  >
                    +33 6 51 17 99 25
                  </a>
                </div>
                
                <div className="flex items-center justify-center md:justify-start">
                  <Phone className="w-5 h-5 text-secondary mr-3 flex-shrink-0" />
                  <a 
                    href="tel:+972526869791" 
                    className="text-white/90 hover:text-secondary transition-colors duration-300"
                  >
                    +972 52 686 9791
                  </a>
                </div>

                {/* Instagram Icon - Mobile centered, desktop left-aligned */}
                <div className="pt-4 flex justify-center md:justify-start">
                  <a 
                    href="https://instagram.com/orhakerem" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="p-2 hover:bg-white/10 rounded-lg transition-colors duration-300 group"
                    aria-label="Or Hakerem Instagram"
                  >
                    <svg 
                      className="w-6 h-6 text-white group-hover:text-secondary transition-colors duration-300" 
                      fill="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                    </svg>
                  </a>
                </div>
              </div>
            </div>

            {/* Column 2: Quick Links */}
            <div className="text-center md:text-left">
              <h3 className="font-playfair text-xl font-bold text-secondary mb-6">Navigation</h3>
              
              <nav className="space-y-3">
                <Link 
                  href="/properties" 
                  className="block text-white/90 hover:text-secondary hover:underline hover:underline-offset-4 transition-all duration-300"
                >
                  Accommodations
                </Link>
                <Link 
                  href="/concierge-services" 
                  className="block text-white/90 hover:text-secondary hover:underline hover:underline-offset-4 transition-all duration-300"
                >
                  Concierge Services
                </Link>
                <Link 
                  href="/events" 
                  className="block text-white/90 hover:text-secondary hover:underline hover:underline-offset-4 transition-all duration-300"
                >
                  Events
                </Link>
                <Link 
                  href="/#contact" 
                  className="block text-white/90 hover:text-secondary hover:underline hover:underline-offset-4 transition-all duration-300"
                >
                  Contact
                </Link>
              </nav>
            </div>

            {/* Column 3: Legal */}
            <div className="text-center md:text-left">
              <h3 className="font-playfair text-xl font-bold text-secondary mb-6">Policies</h3>
              
              <nav className="space-y-3">
                <Link 
                  href="/cancellation" 
                  className="block text-white/90 hover:text-secondary hover:underline hover:underline-offset-4 transition-all duration-300"
                >
                  Cancellation Policy
                </Link>
                <Link 
                  href="/terms" 
                  className="block text-white/90 hover:text-secondary hover:underline hover:underline-offset-4 transition-all duration-300"
                >
                  Terms & Conditions
                </Link>
                <Link 
                  href="/privacy" 
                  className="block text-white/90 hover:text-secondary hover:underline hover:underline-offset-4 transition-all duration-300"
                >
                  Privacy Policy
                </Link>
              </nav>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/20 py-6">
          <div className="text-center">
            <p className="text-white/80">
              © 2025 Or Hakerem. All rights reserved.
            </p>
          </div>
        </div>
      </div>

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