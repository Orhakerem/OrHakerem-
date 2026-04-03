import type { Metadata } from 'next';
import type { ReactNode } from 'react';

import { createCanonicalUrl } from '@/app/seo';

export function generateMetadata({
  params,
}: {
  params: { id: string };
}): Metadata {
  return {
    alternates: {
      canonical: createCanonicalUrl(`/properties/${params.id}`),
    },
  };
}

export default function PropertyDetailsLayout({ children }: { children: ReactNode }) {
  return children;
}
