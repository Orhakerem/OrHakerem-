import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { createCanonicalUrl } from '@/app/seo';

export const metadata: Metadata = {
  title: 'Cancellation Policy | Or Hakerem Tel Aviv',
  description:
    'Or Hakerem cancellation policy details — conditions, deadlines, and refund terms for bookings made directly or through third-party platforms.',
  alternates: {
    canonical: createCanonicalUrl('/cancellation'),
  },
  robots: {
    index: false,
    follow: false,
  },
};

export default function CancellationLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
