import type { ReactNode } from 'react';
import { createCanonicalMetadata } from '@/app/seo';

export const metadata = createCanonicalMetadata('/faq');

export default function FAQLayout({ children }: { children: ReactNode }) {
  return children;
}
