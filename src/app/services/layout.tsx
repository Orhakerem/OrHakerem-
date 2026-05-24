import type { ReactNode } from 'react';
import { createCanonicalMetadata } from '@/app/seo';

export const metadata = createCanonicalMetadata('/services');

export default function ServicesLayout({ children }: { children: ReactNode }) {
  return children;
}
