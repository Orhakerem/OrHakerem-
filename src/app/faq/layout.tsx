import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { DEFAULT_OG_IMAGE, DEFAULT_OPEN_GRAPH_IMAGE, createCanonicalUrl } from '@/app/seo';

export const metadata: Metadata = {
  title: 'FAQ — Booking, Location & Stay Info | Or Hakerem Tel Aviv',
  description:
    'Answers to the most common questions about Or Hakerem: apartment location in Kerem HaTeimanim, check-in times, Shabbat support, parking, cancellation policy, and how to book directly.',
  keywords:
    'Or Hakerem FAQ, Tel Aviv apartment questions, Kerem HaTeimanim stay, Shabbat friendly FAQ, book direct Tel Aviv, cancellation policy Or Hakerem',
  openGraph: {
    title: 'FAQ — Or Hakerem | Luxury Stays in Tel Aviv',
    description:
      'Everything you need to know before booking: neighborhood, amenities, check-in, pricing, and Shabbat support at Or Hakerem in Kerem HaTeimanim.',
    url: createCanonicalUrl('/faq'),
    siteName: 'Or Hakerem',
    images: [DEFAULT_OPEN_GRAPH_IMAGE],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'FAQ — Or Hakerem | Luxury Stays in Tel Aviv',
    description:
      'Answers on location, amenities, check-in, pricing, and Shabbat support for Or Hakerem, Kerem HaTeimanim.',
    images: [DEFAULT_OG_IMAGE],
  },
  alternates: {
    canonical: createCanonicalUrl('/faq'),
  },
  robots: {
    index: true,
    follow: true,
  },
};

const faqSchemaEntries = [
  {
    question: 'Where are the apartments located in Tel Aviv?',
    answer:
      'Or HaKerem apartments are located in the historic Kerem HaTeimanim neighborhood at Hakovshim Street 35, within walking distance of Carmel Market, Banana Beach, and Nachalat Binyamin.',
  },
  {
    question: 'How far is the beach from Or HaKerem?',
    answer:
      'The beach is just a few minutes away, with Banana Beach located approximately 600 meters from the property.',
  },
  {
    question: 'Is Or HaKerem close to Carmel Market?',
    answer:
      'Yes, Carmel Market is located about 400 meters from the apartments, making it easily accessible by foot.',
  },
  {
    question: 'What makes Or HaKerem unique in Tel Aviv?',
    answer:
      'Or HaKerem offers a unique combination of boutique luxury, Shabbat-friendly accommodations, and proximity to key landmarks in central Tel Aviv.',
  },
  {
    question: 'What are the check-in and check-out times?',
    answer:
      'Check-in is available from 3:00 PM, and check-out is until 11:00 AM. Early check-in or late check-out may be available upon request.',
  },
  {
    question: 'Do you offer Shabbat-friendly accommodations?',
    answer:
      'Yes, we provide full Shabbat support including Shabbat keys, hot plates, timers, and can arrange kosher meals upon request.',
  },
  {
    question: 'Is parking available?',
    answer: 'Yes, we provide a parking spot with additional payment of 70₪ per day.',
  },
  {
    question: 'What amenities are included?',
    answer:
      'All apartments include fully equipped kitchens, high-speed WiFi, smart TVs, luxury linens, and premium toiletries. Additional amenities vary by apartment.',
  },
  {
    question: 'What is your cancellation policy?',
    answer:
      'You can review our full cancellation terms on our Terms & Conditions page at orhakerem.com/terms.',
  },
  {
    question: "What's the difference with direct booking and Airbnb?",
    answer:
      'Booking directly with us can get you better rates, personalized service, and more payment flexibility compared to booking through a third-party platform.',
  },
  {
    question: 'What payment methods do you accept?',
    answer: 'We accept bank transfers, Bit, and cash.',
  },
  {
    question: 'Is there a minimum stay requirement?',
    answer:
      'There is no minimum stay. You can make a one-night reservation or stay for a few weeks.',
  },
];

const faqStructuredData = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqSchemaEntries.map((entry) => ({
    '@type': 'Question',
    name: entry.question,
    acceptedAnswer: {
      '@type': 'Answer',
      text: entry.answer,
    },
  })),
};

export default function FAQLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqStructuredData) }}
      />
      {children}
    </>
  );
}
