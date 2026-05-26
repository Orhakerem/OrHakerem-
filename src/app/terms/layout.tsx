import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { createCanonicalUrl } from '@/app/seo';

export const metadata: Metadata = {
  title: 'Terms & Conditions | Or Hakerem Tel Aviv',
  description:
    'Review the terms and conditions for booking a stay at Or Hakerem in Tel Aviv, including cancellation policy, house rules, payment terms, and guest responsibilities.',
  alternates: {
    canonical: createCanonicalUrl('/terms'),
  },
  robots: {
    index: false,
    follow: false,
  },
};

export default function TermsLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
