import type { Metadata } from 'next';
import type { ReactNode } from 'react';

import { DEFAULT_OG_IMAGE, DEFAULT_OPEN_GRAPH_IMAGE, createCanonicalUrl, createLocalizedAlternates } from '@/app/seo';
import { isLocale, localizePath, OG_LOCALE, type Locale } from '@/i18n/config';
import { seoMessages } from '@/i18n/messages/seo';
import BreadcrumbSchema from '@/components/BreadcrumbSchema';

const PATH = '/about';

export function generateMetadata({ params }: { params: { locale: string } }): Metadata {
  const locale: Locale = isLocale(params.locale) ? params.locale : 'en';
  const seo = seoMessages[locale].about;
  const url = createCanonicalUrl(localizePath(locale, PATH));

  return {
    title: seo.title,
    description: seo.description,
    keywords: seo.keywords,
    openGraph: {
      title: seo.title,
      description: seo.description,
      url,
      siteName: 'Or Hakerem',
      images: [DEFAULT_OPEN_GRAPH_IMAGE],
      locale: OG_LOCALE[locale],
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: seo.title,
      description: seo.description,
      images: [DEFAULT_OG_IMAGE],
    },
    alternates: createLocalizedAlternates(PATH, locale),
    robots: { index: true, follow: true },
  };
}

export default function AboutLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: { locale: string };
}) {
  return (
    <>
      <BreadcrumbSchema locale={params.locale} path={PATH} label="about" />
      {children}
    </>
  );
}
