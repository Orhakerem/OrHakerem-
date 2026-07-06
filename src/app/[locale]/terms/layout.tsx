import type { Metadata } from 'next';
import type { ReactNode } from 'react';

import { createLocalizedAlternates } from '@/app/seo';
import { isLocale, type Locale } from '@/i18n/config';
import { seoMessages } from '@/i18n/messages/seo';

const PATH = '/terms';

export function generateMetadata({ params }: { params: { locale: string } }): Metadata {
  const locale: Locale = isLocale(params.locale) ? params.locale : 'en';
  const seo = seoMessages[locale].terms;

  return {
    title: seo.title,
    description: seo.description,
    alternates: createLocalizedAlternates(PATH, locale),
    robots: { index: true, follow: true },
  };
}

export default function TermsLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
