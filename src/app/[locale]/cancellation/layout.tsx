import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { DEFAULT_OG_IMAGE, DEFAULT_OPEN_GRAPH_IMAGE, createCanonicalUrl } from '@/app/seo';

export const metadata: Metadata = {
  title: 'Cancellation & Refund Policy | Or Hakerem Tel Aviv',
  description:
    "Read Or Hakerem's cancellation and refund policy for short-term stays in Tel Aviv, including deposit schedules, non-refundable conditions, and voucher terms.",
  keywords:
    'cancellation policy Tel Aviv, refund policy short-term rental, Or Hakerem booking terms, Tel Aviv apartment cancellation',
  openGraph: {
    title: 'Cancellation & Refund Policy | Or Hakerem Tel Aviv',
    description:
      'Or Hakerem cancellation and refund policy for short-term stays in Tel Aviv — deposit schedules, non-refundable conditions, and voucher terms for direct bookings.',
    url: createCanonicalUrl('/cancellation'),
    siteName: 'Or Hakerem',
    images: [DEFAULT_OPEN_GRAPH_IMAGE],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Cancellation & Refund Policy | Or Hakerem Tel Aviv',
    description:
      'Cancellation, refund, payment, and voucher terms for short-term stays at Or Hakerem in Tel Aviv.',
    images: [DEFAULT_OG_IMAGE],
  },
  alternates: {
    canonical: createCanonicalUrl('/cancellation'),
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function CancellationLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
