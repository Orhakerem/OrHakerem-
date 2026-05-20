import type { ReactNode } from 'react';
import { createCanonicalMetadata } from '@/app/seo';

export const metadata = createCanonicalMetadata('/terms');

export default function TermsLayout({ children }: { children: ReactNode }) {
  return children;
}
