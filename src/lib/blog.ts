import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { ENABLED_LOCALES, localizePath, type Locale } from '@/i18n/config';
import { hasBlogTranslation } from '@/lib/blog-locale-manifest';

export interface PostFrontmatter {
  title: string;
  description: string;
  date: string;
  updated?: string;
  author: string;
  image: string;
  imageAlt: string;
  tags: string[];
  keywords: string[];
  draft?: boolean;
}

export interface Post {
  slug: string;
  locale: Locale;
  frontmatter: PostFrontmatter;
  content: string;
}

const CONTENT_DIR = path.join(process.cwd(), 'content/blog');

function getContentDir(locale: Locale) {
  return locale === 'en' ? CONTENT_DIR : path.join(CONTENT_DIR, locale);
}

function readPost(locale: Locale, slug: string, filePath: string): Post {
  const raw = fs.readFileSync(filePath, 'utf-8');
  const { data, content } = matter(raw);

  return {
    slug,
    locale,
    frontmatter: data as PostFrontmatter,
    content,
  };
}

export function getAllPosts(locale: Locale = 'en'): Post[] {
  const contentDir = getContentDir(locale);
  if (!fs.existsSync(contentDir)) return [];

  const files = fs.readdirSync(contentDir).filter((file) => file.endsWith('.mdx'));

  const posts = files.map((filename) => {
    const slug = filename.replace(/\.mdx$/, '');
    return readPost(locale, slug, path.join(contentDir, filename));
  });

  return posts
    .filter((p) => !p.frontmatter.draft)
    .sort(
      (a, b) =>
        new Date(b.frontmatter.date).getTime() - new Date(a.frontmatter.date).getTime(),
    );
}

export function getPostBySlug(locale: Locale, slug: string): Post | undefined {
  const filePath = path.join(getContentDir(locale), `${slug}.mdx`);
  if (!fs.existsSync(filePath)) return undefined;

  return readPost(locale, slug, filePath);
}

export function getAvailablePostLocales(slug: string): Locale[] {
  return ENABLED_LOCALES.filter((locale) => getPostBySlug(locale, slug) !== undefined);
}

export function getRelatedPosts(locale: Locale, currentSlug: string, tags: string[], limit = 3): Post[] {
  return getAllPosts(locale)
    .filter((p) => p.slug !== currentSlug)
    .filter((p) => p.frontmatter.tags.some((t) => tags.includes(t)))
    .slice(0, limit);
}

export function getAllTags(locale: Locale): string[] {
  const tags = new Set<string>();
  getAllPosts(locale).forEach((post) => post.frontmatter.tags.forEach((tag) => tags.add(tag)));
  return Array.from(tags).sort();
}

export function formatDate(dateString: string, locale: Locale): string {
  return new Date(dateString).toLocaleDateString(
    locale === 'he' ? 'he-IL' : locale === 'fr' ? 'fr-FR' : 'en-US',
    {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    },
  );
}

export function readingTime(content: string, locale: Locale): string {
  const words = content.trim().split(/\s+/).length;
  const minutes = Math.ceil(words / 200);
  if (locale === 'fr') return `${minutes} min de lecture`;
  if (locale === 'he') return `${minutes} דקות קריאה`;
  return `${minutes} min read`;
}

export function localizeBlogHref(locale: Locale, href: string): string {
  if (!href.startsWith('/') || href.startsWith('//')) return href;

  const [pathname, suffix = ''] = href.split(/(?=[?#])/);
  if (pathname === '/blog') return `${localizePath(locale, pathname)}${suffix}`;

  const blogMatch = pathname.match(/^\/blog\/([^/]+)$/);
  if (blogMatch && !hasBlogTranslation(locale, blogMatch[1])) {
    return href;
  }

  return `${localizePath(locale, pathname)}${suffix}`;
}
