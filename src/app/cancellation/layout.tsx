import type { ReactNode } from 'react';
import { createCanonicalMetadata } from '@/app/seo';

export const metadata = createCanonicalMetadata('/terms');

export default function CancellationLayout({ children }: { children: ReactNode }) {
  return children;
}
