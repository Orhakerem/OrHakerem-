import type { Metadata } from 'next';
import type { ReactNode } from 'react';

import { isBookablePropertyId } from '@/lib/bookable-properties';
import { getPropertySeo, getPropertyStructuredData } from '@/lib/property-seo';
import { createCanonicalUrl, createLocalizedAlternates, SITE_URL } from '@/app/seo';
import { isLocale, localizePath, OG_LOCALE, type Locale } from '@/i18n/config';

const PATH_PREFIX = '/properties';

export function generateMetadata({
  params,
}: {
  params: { id: string; locale: string };
}): Metadata {
  const { id } = params;
  const locale: Locale = isLocale(params.locale) ? params.locale : 'en';
  const path = `${PATH_PREFIX}/${id}`;

  if (!isBookablePropertyId(id)) {
    return {
      alternates: { canonical: null },
      robots: { index: false, follow: false },
    };
  }

  const seo = getPropertySeo(locale)[id];
  const url = createCanonicalUrl(localizePath(locale, path));

  return {
    title: seo.title,
    description: seo.description,
    keywords: seo.keywords,
    openGraph: {
      title: seo.title,
      description: seo.description,
      url,
      siteName: 'Or Hakerem',
      images: [
        {
          url: `${SITE_URL}${seo.image}`,
          alt: seo.imageAlt,
        },
      ],
      locale: OG_LOCALE[locale],
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: seo.title,
      description: seo.description,
      images: [`${SITE_URL}${seo.image}`],
    },
    alternates: createLocalizedAlternates(path, locale),
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default function PropertyDetailsLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: { id: string; locale: string };
}) {
  if (!isBookablePropertyId(params.id)) {
    return <>{children}</>;
  }

  const locale: Locale = isLocale(params.locale) ? params.locale : 'en';
  const structuredData = getPropertyStructuredData(params.id, locale);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      {children}
    </>
  );
}
