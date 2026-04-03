import type { Metadata } from 'next';
import { createCanonicalUrl } from '@/app/seo';

export const metadata: Metadata = {
  title: 'Short Term Rental Tel Aviv | Luxury Apartment Tel Aviv | Or Hakerem',
  description: 'Premium short term rental in Tel Aviv. Discover luxury apartments in Kerem HaTeimanim, steps from the beach. Fully equipped, stylish, and perfectly located for your stay.',
  keywords: 'short term rental, short term rental in Tel Aviv, apartment Tel Aviv, luxury apartment in Tel Aviv, vacation rental Tel Aviv, furnished apartment Tel Aviv, Kerem HaTeimanim, Tel Aviv accommodation, beach apartment Tel Aviv',
  openGraph: {
    title: 'Short Term Rental Tel Aviv | Luxury Apartment Tel Aviv | Or Hakerem',
    description: 'Premium short term rental in Tel Aviv. Discover luxury apartments in Kerem HaTeimanim, steps from the beach.',
    url: createCanonicalUrl('/short-term-rentals'),
    siteName: 'Or Hakerem',
    images: [
      {
        url: '/favicon/web-app-manifest-512x512.png',
        width: 1200,
        height: 630,
        alt: 'Or Hakerem - Short Term Rentals in Tel Aviv',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Short Term Rental Tel Aviv | Luxury Apartment Tel Aviv',
    description: 'Premium short term rental in Tel Aviv. Discover luxury apartments in Kerem HaTeimanim, steps from the beach.',
    images: ['/favicon/web-app-manifest-512x512.png'],
  },
  alternates: {
    canonical: createCanonicalUrl('/short-term-rentals'),
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function ShortTermRentalsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
