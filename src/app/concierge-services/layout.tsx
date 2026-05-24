import type { ReactNode } from 'react';
import { createCanonicalMetadata } from '@/app/seo';

export const metadata = createCanonicalMetadata('/concierge-services');

export default function ConciergeServicesLayout({ children }: { children: ReactNode }) {
  return children;
}
