import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { DEFAULT_OG_IMAGE, DEFAULT_OPEN_GRAPH_IMAGE, createCanonicalUrl } from '@/app/seo';

export const metadata: Metadata = {
  title: 'Contact Or Hakerem | Tel Aviv Luxury Stays',
  description:
    'Get in touch with Or Hakerem. Reach us by phone, WhatsApp, or email to book your stay, ask about our properties in Kerem HaTeimanim, or arrange concierge services in Tel Aviv.',
  keywords:
    'contact Or Hakerem, book luxury apartment Tel Aviv, Tel Aviv rental inquiry, Kerem HaTeimanim contact, WhatsApp Or Hakerem',
  openGraph: {
    title: 'Contact Or Hakerem | Luxury Stays in Tel Aviv',
    description:
      'We usually reply within a few hours. Reach us by WhatsApp, phone, or email to plan your stay in Kerem HaTeimanim, Tel Aviv.',
    url: createCanonicalUrl('/contact'),
    siteName: 'Or Hakerem',
    images: [DEFAULT_OPEN_GRAPH_IMAGE],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Contact Or Hakerem | Luxury Stays in Tel Aviv',
    description:
      'Reach us by WhatsApp, phone, or email. We usually reply within a few hours.',
    images: [DEFAULT_OG_IMAGE],
  },
  alternates: {
    canonical: createCanonicalUrl('/contact'),
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function ContactLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
