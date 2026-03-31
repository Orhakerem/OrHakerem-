import type { ReactNode } from 'react';
import { createCanonicalMetadata } from '@/app/seo';

export const metadata = createCanonicalMetadata('/events');

export default function EventsLayout({ children }: { children: ReactNode }) {
  return children;
}
