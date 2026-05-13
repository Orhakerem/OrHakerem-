import type { Metadata } from 'next';

export const SITE_URL = 'https://www.orhakerem.com';
export const DEFAULT_OG_IMAGE = '/og-image.jpg';
export const DEFAULT_OG_IMAGE_ALT = 'Or Hakerem rooftop jacuzzi with Tel Aviv skyline';
export const DEFAULT_OPEN_GRAPH_IMAGE = {
  url: DEFAULT_OG_IMAGE,
  width: 1200,
  height: 630,
  alt: DEFAULT_OG_IMAGE_ALT,
  type: 'image/jpeg',
};

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
