import type { Metadata } from 'next';
import type { ReactNode } from 'react';

import { isBookablePropertyId } from '@/lib/bookable-properties';
import { PROPERTY_SEO, getPropertyStructuredData } from '@/lib/property-seo';
import { createCanonicalUrl, SITE_URL } from '@/app/seo';

export function generateMetadata({
  params,
}: {
  params: { id: string };
}): Metadata {
  const { id } = params;

  if (!isBookablePropertyId(id)) {
    return {
      alternates: {
        canonical: createCanonicalUrl(`/properties/${id}`),
      },
    };
  }

  const seo = PROPERTY_SEO[id];

  return {
    title: seo.title,
    description: seo.description,
    keywords: seo.keywords,
    openGraph: {
      title: seo.title,
      description: seo.description,
      url: createCanonicalUrl(`/properties/${id}`),
      siteName: 'Or Hakerem',
      images: [
        {
          url: `${SITE_URL}${seo.image}`,
          alt: seo.imageAlt,
        },
      ],
      locale: 'en_US',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: seo.title,
      description: seo.description,
      images: [`${SITE_URL}${seo.image}`],
    },
    alternates: {
      canonical: createCanonicalUrl(`/properties/${id}`),
    },
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
  params: { id: string };
}) {
  if (!isBookablePropertyId(params.id)) {
    return <>{children}</>;
  }

  const structuredData = getPropertyStructuredData(params.id);

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
