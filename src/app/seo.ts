import type { Metadata } from 'next';

export const SITE_URL = 'https://www.orhakerem.com';

export function createCanonicalUrl(path: string) {
  return new URL(path, `${SITE_URL}/`).toString();
}

export function createCanonicalMetadata(path: string): Metadata {
  return {
    alternates: {
      canonical: createCanonicalUrl(path),
    },
  };
}
