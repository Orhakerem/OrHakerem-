'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowLeft, Home, Mail, Phone, Instagram, Facebook } from 'lucide-react';
import ContactForm from '@/components/ContactForm';
import { ContactCard } from '@/components/ContactCard';

export default function ContactPage() {
  return (
    <div className="min-h-screen pt-24 pb-20 bg-cream">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Navigation */}
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

        <div className="px-3 md:px-4" data-animate="fade-up">
          <ContactCard
            title="Contact Or HaKerem"
            description="Or HaKerem is located in the heart of Tel Aviv, in the vibrant Kerem HaTeimanim neighborhood, within walking distance of Carmel Market and the beach."
            contactInfo={[
              {
                icon: Mail,
                label: 'Email',
                value: 'keremliving@gmail.com',
                href: 'mailto:keremliving@gmail.com',
              },
              {
                icon: Phone,
                label: 'Phone & WhatsApp',
                value: '+33 6 51 17 99 25 · +972 52 686 9791',
                href: 'tel:+33651179925',
              },
              {
                icon: Instagram,
                label: 'Instagram',
                value: '@or_hakerem',
                href: 'https://www.instagram.com/or_hakerem/',
              },
              {
                icon: Facebook,
                label: 'Facebook',
                value: 'Or Hakerem',
                href: 'https://www.facebook.com/profile.php?id=61583829025542',
              },
            ]}
          >
            <ContactForm showTitle={false} variant="compact" theme="light" />
          </ContactCard>
        </div>
      </div>
    </div>
  );
}
