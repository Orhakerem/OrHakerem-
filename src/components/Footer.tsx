'use client';

import React from 'react';
import Link from 'next/link';
import { Mail, Linkedin, Facebook } from 'lucide-react';
import Image from 'next/image';

import { SITE_URL } from '@/app/seo';

export default function Footer() {
  return (
    <footer className="site-footer bg-primary text-white relative overflow-hidden rounded-t-3xl">
      {/* Background decorative elements - Minimal */}
      <div className="absolute inset-0">
        <div className="absolute top-2 left-2 w-8 h-8 bg-secondary/10 rounded-full blur-lg"></div>
        <div className="absolute bottom-2 right-2 w-12 h-12 bg-tertiary/10 rounded-full blur-lg"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-white/5 rounded-full blur-xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Mobile Layout - Compact Desktop Mirror */}
        <div className="site-footer-mobile md:hidden py-6">
          <div className="site-footer-mobile-brand text-center mb-4">
            <div className="flex items-center justify-center mb-3">
              <div className="relative w-48 h-48">
                <Image
                  src="/logo/Logo_beige_h1.png"
                  alt="Or Hakerem Logo"
                  fill
                  className="object-contain"
                  loading="lazy"
                  sizes="192px"
                />
              </div>
            </div>
          </div>

          <div className="site-footer-mobile-contact text-center mb-4">
            <h3 className="font-playfair text-lg font-bold text-secondary mb-3 leading-none">Contact Us</h3>
            <div className="site-footer-mobile-contact-content flex flex-col items-center space-y-2">
              <a 
                href="mailto:keremliving@gmail.com" 
                className="flex items-center text-sm text-white/90 transition-all duration-300"
              >
                <Mail className="w-4 h-4 mr-2" />
                keremliving@gmail.com
              </a>
              
              <div className="site-footer-mobile-phone-row flex space-x-4 text-sm">
                <a 
                  href="tel:+33651179925" 
                  className="text-white/90 transition-all duration-300"
                >
                  +33 6 51 17 99 25
                </a>
                <a 
                  href="tel:+972526869791"
                  className="text-white/90 transition-all duration-300"
                >
                  +972 52 686 9791
                </a>
              </div>

              {/* Social Icons - Compact */}
              <div className="site-footer-mobile-socials flex gap-2">
                <a
                  href="https://www.instagram.com/or_hakerem/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-white/20 bg-white/10 transition-all duration-300"
                  aria-label="Or Hakerem Instagram"
                >
                  <svg
                    className="h-4 w-4 text-white"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.40s-.644-1.44-1.439-1.40z"/>
                  </svg>
                </a>
                <a
                  href="https://www.linkedin.com/company/orhakerem/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-white/20 bg-white/10 transition-all duration-300"
                  aria-label="Or Hakerem LinkedIn"
                >
                  <Linkedin className="h-4 w-4 text-white" />
                </a>
                <a
                  href="https://www.facebook.com/profile.php?id=61583829025542"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-white/20 bg-white/10 transition-all duration-300"
                  aria-label="Or Hakerem Facebook"
                >
                  <Facebook className="h-4 w-4 text-white" />
                </a>
              </div>
            </div>
          </div>

          <div className="site-footer-mobile-nav text-center mb-4">
            <h3 className="font-playfair text-lg font-bold text-secondary mb-3 leading-none">Navigation</h3>
            <div className="flex flex-wrap justify-center gap-x-4 gap-y-1 text-sm">
              <Link
                href="/properties"
                className="text-white/90 transition-all duration-300"
              >
                Properties
              </Link>
              <Link
                href="/concierge-services"
                className="text-white/90 transition-all duration-300"
              >
                Concierge Services
              </Link>
              <Link
                href="/events"
                className="text-white/90 transition-all duration-300"
              >
                Events
              </Link>
              <Link
                href="/about"
                className="text-white/90 transition-all duration-300"
              >
                About
              </Link>
              <Link
                href="/#contact"
                className="text-white/90 transition-all duration-300"
              >
                Contact
              </Link>
            </div>
          </div>

          <div className="site-footer-mobile-policies text-center mb-4">
            <h3 className="font-playfair text-lg font-bold text-secondary mb-3 leading-none">Policies</h3>
            <div className="flex flex-wrap justify-center gap-x-4 gap-y-1 text-sm">
              <Link
                href="/terms"
                className="text-white/90 transition-all duration-300"
              >
                Terms & Conditions
              </Link>
            </div>
          </div>

          <div className="site-footer-mobile-meta text-center border-t border-white/20 pt-3">
            <p className="text-white/80 text-xs leading-none">
              © 2025 Or Hakerem. All rights reserved.
            </p>
            <p className="text-white/60 text-xs mt-1 leading-none">
              Luxury accommodations in the heart of Tel Aviv
            </p>
          </div>
        </div>

        {/* Desktop Layout */}
        <div className="hidden md:block pt-4 pb-3">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-10 items-center">

            {/* Column 1: Logo & Brand */}
            <div className="text-center md:text-left md:col-span-1">
              <div className="flex items-center justify-center md:justify-start">
                <div className="relative w-80 h-80">
                  <Image
                    src="/logo/Logo_beige_h1.png"
                    alt="Or Hakerem Logo"
                    fill
                    className="object-contain"
                  loading="lazy"
                  sizes="320px"
                />
                </div>
              </div>
            </div>

            {/* Column 2: Contact */}
            <div className="text-center md:text-left">
              <h3 className="font-playfair text-2xl font-bold text-secondary mb-4 leading-none">Contact Us</h3>

              <div className="space-y-3">
                <div>
                  <div className="flex items-center justify-center rounded-lg md:justify-start">
                    <Mail className="mr-3 w-5 h-5 flex-shrink-0 text-secondary" />
                    <a
                      href="mailto:keremliving@gmail.com"
                      className="text-base font-medium leading-tight text-white/90 transition-all duration-300"
                    >
                      keremliving@gmail.com
                    </a>
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-center rounded-lg md:justify-start">
                    <span className="mr-3 text-lg text-secondary">📞</span>
                    <div className="flex flex-col gap-1">
                      <a
                        href="tel:+33651179925"
                        className="text-base font-medium leading-tight text-white/90 transition-all duration-300"
                      >
                        +33 6 51 17 99 25
                      </a>
                      <a
                        href="tel:+972526869791"
                        className="text-base font-medium leading-tight text-white/90 transition-all duration-300"
                      >
                        +972 52 686 9791
                      </a>
                    </div>
                  </div>
                </div>

                {/* Social Icons - Liquid Glass */}
                <div className="pt-3 flex justify-center md:justify-start gap-3">
                  <a
                    href="https://www.instagram.com/or_hakerem/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="liquid-glass-icon"
                    aria-label="Or Hakerem Instagram"
                  >
                    <span className="liquid-glass-icon-shadow" aria-hidden="true" />
                    <span
                      className="liquid-glass-icon-distort"
                      aria-hidden="true"
                      style={{ backdropFilter: 'url("#liquid-cta-glass")' }}
                    />
                    <span className="liquid-glass-icon-content">
                      <svg
                        className="h-6 w-6 text-white"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.40s-.644-1.44-1.439-1.40z"/>
                      </svg>
                    </span>
                  </a>
                  <a
                    href="https://www.linkedin.com/company/orhakerem/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="liquid-glass-icon"
                    aria-label="Or Hakerem LinkedIn"
                  >
                    <span className="liquid-glass-icon-shadow" aria-hidden="true" />
                    <span
                      className="liquid-glass-icon-distort"
                      aria-hidden="true"
                      style={{ backdropFilter: 'url("#liquid-cta-glass")' }}
                    />
                    <span className="liquid-glass-icon-content">
                      <Linkedin className="h-6 w-6 text-white" />
                    </span>
                  </a>
                  <a
                    href="https://www.facebook.com/profile.php?id=61583829025542"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="liquid-glass-icon"
                    aria-label="Or Hakerem Facebook"
                  >
                    <span className="liquid-glass-icon-shadow" aria-hidden="true" />
                    <span
                      className="liquid-glass-icon-distort"
                      aria-hidden="true"
                      style={{ backdropFilter: 'url("#liquid-cta-glass")' }}
                    />
                    <span className="liquid-glass-icon-content">
                      <Facebook className="h-6 w-6 text-white" />
                    </span>
                  </a>
                </div>
              </div>
            </div>

            {/* Column 3: Quick Links */}
            <div className="text-center md:text-left">
              <h3 className="font-playfair text-2xl font-bold text-secondary mb-4 leading-none">Navigation</h3>

              <nav className="space-y-2">
                <Link
                  href="/properties"
                  className="block text-base font-medium leading-tight text-white/90 transition-all duration-300"
                >
                  Properties
                </Link>
                <Link
                  href="/concierge-services"
                  className="block text-base font-medium leading-tight text-white/90 transition-all duration-300"
                >
                  Concierge Services
                </Link>
                <Link
                  href="/events"
                  className="block text-base font-medium leading-tight text-white/90 transition-all duration-300"
                >
                  Events
                </Link>
                <Link
                  href="/about"
                  className="block text-base font-medium leading-tight text-white/90 transition-all duration-300"
                >
                  About
                </Link>
                <Link
                  href="/#contact"
                  className="block text-base font-medium leading-tight text-white/90 transition-all duration-300"
                >
                  Contact
                </Link>
              </nav>
            </div>

            {/* Column 4: Legal */}
            <div className="text-center md:text-left">
              <h3 className="font-playfair text-2xl font-bold text-secondary mb-4 leading-none">Policies</h3>

              <nav className="space-y-2">
                <Link
                  href="/terms"
                  className="block text-base font-medium leading-tight text-white/90 transition-all duration-300"
                >
                  Terms & Conditions
                </Link>
                <Link
                  href="/privacy"
                  className="block text-base font-medium leading-tight text-white/90 transition-all duration-300"
                >
                  Privacy Policy
                </Link>
                <a
                  href="mailto:keremliving@gmail.com"
                  className="block text-base font-medium leading-tight text-white/90 transition-all duration-300"
                >
                  Support
                </a>
              </nav>
            </div>
          </div>
        </div>

        {/* Desktop Bottom Bar */}
        <div className="hidden md:block border-t border-white/20 py-2.5">
          <div className="text-center">
            <p className="text-white/80 text-sm font-medium leading-none">
              © 2025 Or Hakerem. All rights reserved.
            </p>
            <p className="text-white/60 text-xs mt-1 leading-none">
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
            "url": SITE_URL,
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
