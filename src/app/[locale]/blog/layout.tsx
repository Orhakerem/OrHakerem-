import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { notFound } from 'next/navigation';
import { DEFAULT_OG_IMAGE, DEFAULT_OPEN_GRAPH_IMAGE, createCanonicalUrl } from '@/app/seo';
import { DEFAULT_LOCALE } from '@/i18n/config';

export const metadata: Metadata = {
  title: {
    default: 'Tel Aviv Travel Blog | Or Hakerem',
    template: '%s | Or Hakerem Blog',
  },
  description:
    'Tel Aviv travel guides, Kerem HaTeimanim neighborhood tips, Shabbat-friendly travel advice, and insider insights from Or Hakerem — luxury short-term rentals in the heart of Tel Aviv.',
  keywords:
    'Tel Aviv travel blog, Kerem HaTeimanim guide, Tel Aviv neighborhood, Shabbat Tel Aviv, things to do Tel Aviv, luxury stays Tel Aviv, Carmel Market guide',
  openGraph: {
    title: 'Tel Aviv Travel Blog | Or Hakerem',
    description:
      'Guides, tips, and local insights for visiting Tel Aviv — from the team behind Or Hakerem luxury apartments in Kerem HaTeimanim.',
    url: createCanonicalUrl('/blog'),
    siteName: 'Or Hakerem',
    images: [DEFAULT_OPEN_GRAPH_IMAGE],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Tel Aviv Travel Blog | Or Hakerem',
    description:
      'Local guides and travel tips for Tel Aviv from the Or Hakerem team in Kerem HaTeimanim.',
    images: [DEFAULT_OG_IMAGE],
  },
  alternates: {
    canonical: createCanonicalUrl('/blog'),
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function BlogLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: { locale: string };
}) {
  // Blog posts are English-only for now; /fr/blog and /he/blog 404 until
  // the MDX content is translated.
  if (params.locale !== DEFAULT_LOCALE) {
    notFound();
  }
  return <>{children}</>;
}
