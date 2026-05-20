import type { Metadata } from 'next';

import { DEFAULT_OG_IMAGE, DEFAULT_OPEN_GRAPH_IMAGE, createCanonicalUrl } from '@/app/seo';

export const metadata: Metadata = {
  title: 'About Or HaKerem – Luxury Stays in Tel Aviv',
  description:
    'Learn about Or HaKerem, a boutique collection of luxury short-term stays in Tel Aviv offering premium apartments, Shabbat-friendly hospitality, and intimate event experiences in Kerem HaTeimanim.',
  keywords:
    'About Or HaKerem, luxury apartments Tel Aviv, boutique stays Tel Aviv, Kerem HaTeimanim apartments, Shabbat friendly stays Tel Aviv, Tel Aviv luxury stay, boutique event venue Tel Aviv',
  openGraph: {
    title: 'About Or HaKerem – Luxury Stays in Tel Aviv',
    description:
      'Discover the story behind Or HaKerem, our premium apartments in Kerem HaTeimanim, and the hospitality approach that shapes every stay and event.',
    url: createCanonicalUrl('/about'),
    siteName: 'Or Hakerem',
    images: [DEFAULT_OPEN_GRAPH_IMAGE],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About Or HaKerem – Luxury Stays in Tel Aviv',
    description:
      'A closer look at Or HaKerem, our boutique hospitality approach, and our location in Kerem HaTeimanim.',
    images: [DEFAULT_OG_IMAGE],
  },
  alternates: {
    canonical: createCanonicalUrl('/about'),
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
