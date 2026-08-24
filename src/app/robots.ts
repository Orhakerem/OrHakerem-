import type { MetadataRoute } from 'next';
import { SITE_URL } from '@/app/seo';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        // /_next/ must stay crawlable: blocking it hides the site's CSS and
        // fonts from Googlebot, degrading rendering/mobile-usability checks.
        disallow: ['/api/', '/admin', '/admin/'],
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
