import type { ReactNode } from 'react';
import { createCanonicalMetadata } from '@/app/seo';

export const metadata = createCanonicalMetadata('/contact');

export default function ContactLayout({ children }: { children: ReactNode }) {
  return children;
}
