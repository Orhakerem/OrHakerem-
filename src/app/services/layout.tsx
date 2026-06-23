import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { DEFAULT_OG_IMAGE, DEFAULT_OPEN_GRAPH_IMAGE, createCanonicalUrl } from '@/app/seo';

export const metadata: Metadata = {
  title: 'Concierge Services in Tel Aviv | Or Hakerem | Groceries, Transfers & More',
  description:
    'Or Hakerem offers premium concierge services in Tel Aviv: grocery delivery, private airport transfers, babysitting, event planning, restaurant reservations, and on-demand cleaning. Included with every stay on request.',
  keywords:
    'concierge services Tel Aviv, concierge Tel Aviv, concierge TLV, airport transfer Tel Aviv, grocery delivery Tel Aviv apartment, babysitting Tel Aviv, restaurant reservation Tel Aviv, event planning Tel Aviv',
  openGraph: {
    title: 'Concierge Services in Tel Aviv | Or Hakerem',
    description:
      'Premium concierge services for Or Hakerem guests: grocery delivery, airport transfers, babysitting, event planning, and more. Tailored to your stay.',
    url: createCanonicalUrl('/services'),
    siteName: 'Or Hakerem',
    images: [DEFAULT_OPEN_GRAPH_IMAGE],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Concierge Services in Tel Aviv | Or Hakerem',
    description:
      'Grocery delivery, transfers, babysitting, event planning, and more — premium concierge at Or Hakerem.',
    images: [DEFAULT_OG_IMAGE],
  },
  alternates: {
    canonical: createCanonicalUrl('/services'),
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function ServicesLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
