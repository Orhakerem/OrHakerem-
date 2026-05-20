import type { ReactNode } from 'react';
import { createCanonicalMetadata } from '@/app/seo';

export const metadata = createCanonicalMetadata('/reservation');

export default function ReservationLayout({ children }: { children: ReactNode }) {
  return children;
}
