import type { Metadata } from 'next';

export const SITE_URL = 'https://www.orhakerem.com';

export function createCanonicalMetadata(path: string): Metadata {
  return {
    alternates: {
      canonical: path,
    },
  };
}
