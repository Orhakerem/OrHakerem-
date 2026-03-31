import type { Metadata } from 'next';
import type { ReactNode } from 'react';

export function generateMetadata({
  params,
}: {
  params: { id: string };
}): Metadata {
  return {
    alternates: {
      canonical: `/properties/${params.id}`,
    },
  };
}

export default function PropertyDetailsLayout({ children }: { children: ReactNode }) {
  return children;
}
