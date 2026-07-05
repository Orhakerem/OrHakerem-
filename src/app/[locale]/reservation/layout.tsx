import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { DEFAULT_OG_IMAGE, DEFAULT_OPEN_GRAPH_IMAGE, createCanonicalUrl } from '@/app/seo';

export const metadata: Metadata = {
  title: 'Book a Stay in Tel Aviv | Or Hakerem | Direct Reservation',
  description:
    'Book your luxury apartment stay in Tel Aviv directly with Or Hakerem. Direct booking is up to 15% cheaper than Airbnb or Booking.com. Penthouse with jacuzzi or cozy studio in Kerem HaTeimanim.',
  keywords:
    'book luxury apartment Tel Aviv, direct booking Tel Aviv, reserve penthouse Tel Aviv, book studio Tel Aviv, Kerem HaTeimanim reservation, Or Hakerem booking',
  openGraph: {
    title: 'Book a Stay in Tel Aviv | Or Hakerem Direct Reservation',
    description:
      'Reserve your stay at Or Hakerem directly — up to 15% cheaper than platforms. Choose the penthouse with jacuzzi or the cozy studio in Kerem HaTeimanim.',
    url: createCanonicalUrl('/reservation'),
    siteName: 'Or Hakerem',
    images: [DEFAULT_OPEN_GRAPH_IMAGE],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Book a Stay in Tel Aviv | Or Hakerem Direct Reservation',
    description:
      'Reserve directly and save up to 15% vs. Airbnb. Luxury penthouse or cozy studio in Kerem HaTeimanim, Tel Aviv.',
    images: [DEFAULT_OG_IMAGE],
  },
  alternates: {
    canonical: createCanonicalUrl('/reservation'),
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function ReservationLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
