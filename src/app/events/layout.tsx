import type { Metadata } from 'next';
import type { ReactNode } from 'react';

import { DEFAULT_OG_IMAGE, DEFAULT_OPEN_GRAPH_IMAGE, createCanonicalUrl } from '@/app/seo';

export const metadata: Metadata = {
  title: 'Boutique Events Tel Aviv | Jewish Celebrations & Kosher Services | Or Hakerem',
  description:
    'Or HaKerem hosts boutique events and Jewish celebrations in Tel Aviv, offering an intimate premium venue with optional kosher services and tailored planning.',
  keywords:
    'boutique events Tel Aviv, event space Tel Aviv, luxury venue Israel, luxury event venue Israel, Jewish events Tel Aviv, Jewish celebrations Tel Aviv, kosher services Tel Aviv, intimate events Tel Aviv, private venue Tel Aviv, bar mitzvah venue Tel Aviv, brit mila venue Tel Aviv, Or Hakerem',
  openGraph: {
    title: 'Boutique Events Tel Aviv | Jewish Celebrations & Kosher Services | Or Hakerem',
    description:
      'Discover a premium private venue in Tel Aviv for boutique events, Jewish celebrations, and intimate gatherings with optional kosher services.',
    url: createCanonicalUrl('/events'),
    siteName: 'Or Hakerem',
    images: [DEFAULT_OPEN_GRAPH_IMAGE],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Boutique Events Tel Aviv | Jewish Celebrations | Or Hakerem',
    description:
      'A premium Tel Aviv venue for intimate events, Jewish celebrations, and optional kosher services.',
    images: [DEFAULT_OG_IMAGE],
  },
  alternates: {
    canonical: createCanonicalUrl('/events'),
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function EventsLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
