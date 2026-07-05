import type { ReactNode } from 'react';
import { createCanonicalMetadata } from '@/app/seo';

export const metadata = createCanonicalMetadata('/properties');

export default function PropertiesLayout({ children }: { children: ReactNode }) {
  return children;
}
