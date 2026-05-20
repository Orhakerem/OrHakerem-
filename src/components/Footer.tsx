'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Mail, Phone, MapPin, Instagram, Linkedin, Facebook, MessageCircle } from 'lucide-react';

import { SITE_URL } from '@/app/seo';

type FooterLink = {
  label: string;
  href: string;
  indent?: boolean;
};

const exploreLinks: FooterLink[] = [
  { label: 'Home', href: '/' },
  { label: 'Properties', href: '/properties' },
  { label: 'Luxury Penthouse', href: '/properties/penthouse-jacuzzi', indent: true },
  { label: 'Spacious & Cosy Apartment', href: '/properties/cozy-studio', indent: true },
  { label: 'Events', href: '/events' },
  { label: 'About', href: '/about' },
  { label: 'FAQ', href: '/faq' },
];

const stayLinks: FooterLink[] = [
  { label: 'Concierge Services', href: '/concierge-services' },
  { label: 'Reservation', href: '/reservation' },
  { label: 'Contact', href: '/contact' },
];

const socials = [
  { label: 'Instagram', href: 'https://www.instagram.com/or_hakerem/', Icon: Instagram },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/company/orhakerem/', Icon: Linkedin },
  { label: 'Facebook', href: 'https://www.facebook.com/profile.php?id=61583829025542', Icon: Facebook },
  { label: 'WhatsApp', href: 'https://wa.me/972526869791', Icon: MessageCircle },
];

export default function Footer() {
  return (
    <footer className="site-footer bg-primary text-white relative rounded-t-3xl" aria-label="Footer">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main grid */}
        <div className="py-8 md:py-10 grid grid-cols-2 lg:grid-cols-4 gap-y-8 gap-x-8 lg:gap-x-12">
          {/* Col 1 — Brand */}
          <div className="col-span-2 lg:col-span-1 space-y-4">
            <Link href="/" aria-label="Or Hakerem — Home" className="inline-block">
              <Image
                src="/logo/Logo_beige_h1.png"
                alt="Or Hakerem"
                width={180}
                height={48}
                className="h-16 md:h-20 w-auto object-contain"
                loading="lazy"
              />
            </Link>
            <p className="text-sm text-white/70 max-w-xs leading-snug">
              Luxury accommodations in the heart of Tel Aviv.
            </p>
            <ul className="flex gap-3">
              {socials.map(({ label, href, Icon }) => (
                <li key={label}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Or Hakerem on ${label}`}
                    className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/15 text-white/80 transition-colors hover:border-secondary/60 hover:bg-white/5 hover:text-white"
                  >
                    <Icon className="h-4 w-4" aria-hidden="true" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 2 — Explore */}
          <nav aria-label="Footer navigation — Explore">
            <h3 className="font-head text-xs uppercase tracking-[0.18em] text-secondary mb-3">Explore</h3>
            <ul className="space-y-2">
              {exploreLinks.map(({ label, href, indent }) => (
                <li key={href} className={indent ? 'pl-3 border-l border-white/10' : ''}>
                  <Link
                    href={href}
                    className="text-sm text-white/70 hover:text-white transition-colors"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Col 3 — Stay */}
          <nav aria-label="Footer navigation — Stay">
            <h3 className="font-head text-xs uppercase tracking-[0.18em] text-secondary mb-3">Stay</h3>
            <ul className="space-y-2">
              {stayLinks.map(({ label, href }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-sm text-white/70 hover:text-white transition-colors"
                  >
                    {label}
                  </Link>
                </li>
              ))}
              <li>
                <a
                  href="https://wa.me/972526869791"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm text-white/70 hover:text-white transition-colors"
                >
                  <MessageCircle className="h-3.5 w-3.5" aria-hidden="true" />
                  WhatsApp us
                </a>
              </li>
            </ul>
          </nav>

          {/* Col 4 — Contact */}
          <div className="col-span-2 lg:col-span-1">
            <h3 className="font-head text-xs uppercase tracking-[0.18em] text-secondary mb-3">Contact</h3>
            <address className="not-italic space-y-2 text-sm text-white/70">
              <a
                href="mailto:keremliving@gmail.com"
                className="flex items-start gap-2 hover:text-white transition-colors"
              >
                <Mail className="h-4 w-4 mt-0.5 shrink-0 text-secondary/80" aria-hidden="true" />
                <span>keremliving@gmail.com</span>
              </a>
              <a
                href="tel:+33651179925"
                className="flex items-start gap-2 hover:text-white transition-colors"
              >
                <Phone className="h-4 w-4 mt-0.5 shrink-0 text-secondary/80" aria-hidden="true" />
                <span>
                  +33 6 51 17 99 25 <span className="text-white/40">·</span> FR
                </span>
              </a>
              <a
                href="tel:+972526869791"
                className="flex items-start gap-2 hover:text-white transition-colors"
              >
                <Phone className="h-4 w-4 mt-0.5 shrink-0 text-secondary/80" aria-hidden="true" />
                <span>
                  +972 52 686 9791 <span className="text-white/40">·</span> IL
                </span>
              </a>
              <p className="flex items-start gap-2">
                <MapPin className="h-4 w-4 mt-0.5 shrink-0 text-secondary/80" aria-hidden="true" />
                <span>
                  35 Hakovshim Street
                  <br />
                  Tel Aviv, Israel
                </span>
              </p>
            </address>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-secondary/20 py-3">
          <div className="flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-white/60">
            <p>© 2026 Or Hakerem. All rights reserved.</p>
            <nav
              aria-label="Legal"
              className="flex flex-wrap items-center justify-center gap-x-2 gap-y-1"
            >
              <Link href="/terms" className="hover:text-white transition-colors">
                Terms
              </Link>
              <span aria-hidden="true" className="text-white/30">
                ·
              </span>
              <Link href="/privacy" className="hover:text-white transition-colors">
                Privacy
              </Link>
              <span aria-hidden="true" className="text-white/30">
                ·
              </span>
              <Link href="/cancellation" className="hover:text-white transition-colors">
                Cancellation Policy
              </Link>
            </nav>
            <p>
              Made by{' '}
              <a
                href="https://sitekept.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition-colors"
              >
                Sitekept
              </a>
            </p>
          </div>
        </div>
      </div>

      {/* JSON-LD LocalBusiness */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'LocalBusiness',
            name: 'Or Hakerem',
            description: 'Luxury properties in Tel Aviv',
            url: SITE_URL,
            telephone: ['+33651179925', '+972526869791'],
            email: 'keremliving@gmail.com',
            address: {
              '@type': 'PostalAddress',
              streetAddress: '35 Hakovshim Street',
              addressLocality: 'Tel Aviv',
              addressCountry: 'Israel',
            },
          }),
        }}
      />
    </footer>
  );
}
