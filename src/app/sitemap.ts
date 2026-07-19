import type { MetadataRoute } from 'next';
import { SITE_URL } from '@/app/seo';
import { getAllPosts, getAvailablePostLocales } from '@/lib/blog';
import { DEFAULT_LOCALE, ENABLED_LOCALES, localizePath } from '@/i18n/config';

type StaticRoute = {
  path: string;
  changeFrequency: MetadataRoute.Sitemap[number]['changeFrequency'];
  priority: number;
};

const staticRoutes: StaticRoute[] = [
  { path: '/', changeFrequency: 'daily', priority: 1.0 },
  { path: '/properties', changeFrequency: 'daily', priority: 0.9 },
  { path: '/properties/penthouse-jacuzzi', changeFrequency: 'weekly', priority: 0.9 },
  { path: '/properties/cozy-studio', changeFrequency: 'weekly', priority: 0.9 },
  { path: '/reservation', changeFrequency: 'weekly', priority: 0.8 },
  { path: '/services', changeFrequency: 'weekly', priority: 0.8 },
  { path: '/events', changeFrequency: 'weekly', priority: 0.7 },
  { path: '/about', changeFrequency: 'weekly', priority: 0.7 },
  { path: '/faq', changeFrequency: 'monthly', priority: 0.6 },
  { path: '/contact', changeFrequency: 'monthly', priority: 0.6 },
  { path: '/terms', changeFrequency: 'yearly', priority: 0.3 },
  { path: '/privacy', changeFrequency: 'yearly', priority: 0.3 },
  { path: '/cancellation', changeFrequency: 'yearly', priority: 0.3 },
];

function languagesFor(path: string, locales: readonly (typeof ENABLED_LOCALES)[number][] = ENABLED_LOCALES) {
  const languages: Record<string, string> = {};
  for (const locale of locales) {
    languages[locale] = `${SITE_URL}${localizePath(locale, path)}`;
  }
  languages['x-default'] = `${SITE_URL}${localizePath(DEFAULT_LOCALE, path)}`;
  return languages;
}

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const localizedStaticEntries: MetadataRoute.Sitemap = staticRoutes.flatMap((route) =>
    ENABLED_LOCALES.map((locale) => ({
      url: `${SITE_URL}${localizePath(locale, route.path)}`,
      lastModified: now,
      changeFrequency: route.changeFrequency,
      priority: route.priority,
      alternates: {
        languages: languagesFor(route.path),
      },
    })),
  );

  const posts = getAllPosts('en');
  const blogIndexEntries: MetadataRoute.Sitemap = ENABLED_LOCALES.map((locale) => ({
    url: `${SITE_URL}${localizePath(locale, '/blog')}`,
    lastModified: now,
    changeFrequency: 'daily',
    priority: 0.8,
    alternates: { languages: languagesFor('/blog') },
  }));
  const blogPostEntries: MetadataRoute.Sitemap = posts.flatMap((post) => {
    const availableLocales = getAvailablePostLocales(post.slug);

    return availableLocales.map((locale) => ({
      url: `${SITE_URL}${localizePath(locale, `/blog/${post.slug}`)}`,
      lastModified: post.frontmatter.updated
        ? new Date(post.frontmatter.updated)
        : new Date(post.frontmatter.date),
      changeFrequency: 'weekly' as const,
      priority: 0.7,
      alternates: { languages: languagesFor(`/blog/${post.slug}`, availableLocales) },
    }));
  });

  return [...localizedStaticEntries, ...blogIndexEntries, ...blogPostEntries];
}
