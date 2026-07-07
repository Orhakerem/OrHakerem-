import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { notFound } from 'next/navigation';
import { DEFAULT_LOCALE } from '@/i18n/config';

export const metadata: Metadata = {
  title: 'Back office — Or Hakerem',
  robots: { index: false, follow: false },
};

export default function AdminLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: { locale: string };
}) {
  // Internal tool: English only, no /fr or /he variants.
  if (params.locale !== DEFAULT_LOCALE) {
    notFound();
  }
  return <div className="min-h-screen bg-cream">{children}</div>;
}
