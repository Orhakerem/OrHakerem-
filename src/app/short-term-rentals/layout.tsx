import type { Metadata } from 'next';
import { createCanonicalUrl } from '@/app/seo';

export const metadata: Metadata = {
  title: 'Luxury Apartments in Tel Aviv | Or Hakerem',
  description: 'Discover Or Hakerem apartments in Kerem HaTeimanim, steps from the beach and Carmel Market.',
  keywords: 'luxury apartments Tel Aviv, furnished apartment Tel Aviv, Kerem HaTeimanim apartments, Tel Aviv accommodation, beach apartment Tel Aviv',
  openGraph: {
    title: 'Luxury Apartments in Tel Aviv | Or Hakerem',
    description: 'Discover Or Hakerem apartments in Kerem HaTeimanim, steps from the beach and Carmel Market.',
    url: createCanonicalUrl('/short-term-rentals'),
    siteName: 'Or Hakerem',
    images: [
      {
        url: '/favicon/web-app-manifest-512x512.png',
        width: 1200,
        height: 630,
        alt: 'Or Hakerem - Luxury Apartments in Tel Aviv',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Luxury Apartments in Tel Aviv | Or Hakerem',
    description: 'Discover Or Hakerem apartments in Kerem HaTeimanim, steps from the beach and Carmel Market.',
    images: ['/favicon/web-app-manifest-512x512.png'],
  },
  alternates: {
    canonical: createCanonicalUrl('/short-term-rentals'),
  },
  robots: {
    index: false,
    follow: false,
  },
};

export default function ShortTermRentalsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
