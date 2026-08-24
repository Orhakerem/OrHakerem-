'use client';

import Link from 'next/link';
import { localizePath } from '@/i18n/config';
import { useLocale } from '@/i18n/useLocale';
import { commonMessages } from '@/i18n/messages/common';

export default function NotFoundContent() {
  const locale = useLocale();
  const t = commonMessages[locale].notFound;

  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-6 py-24 text-center">
      <p className="font-head text-6xl font-light text-primary">404</p>
      <h1 className="mt-4 font-head text-2xl font-light text-black">{t.heading}</h1>
      <p className="mt-2 max-w-md font-body text-black/70">{t.body}</p>
      <Link
        href={localizePath(locale, '/')}
        className="mt-8 rounded-full bg-primary px-6 py-3 font-body text-sm text-white transition hover:bg-primary/90"
      >
        {t.backHome}
      </Link>
    </div>
  );
}
