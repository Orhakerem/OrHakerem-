import Link from 'next/link';

import PostCard from '@/components/blog/PostCard';
import { createCanonicalUrl, SITE_URL } from '@/app/seo';
import { isLocale, localizePath, type Locale } from '@/i18n/config';
import { blogMessages } from '@/i18n/messages/blog';
import { getAllPosts, getAllTags } from '@/lib/blog';

export default function BlogIndexPage({ params }: { params: { locale: string } }) {
  const locale: Locale = isLocale(params.locale) ? params.locale : 'en';
  const posts = getAllPosts(locale);
  const tags = getAllTags(locale);
  const t = blogMessages[locale];
  const url = createCanonicalUrl(localizePath(locale, '/blog'));

  const blogCollectionSchema = {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    name: `${t.blog} | Or Hakerem`,
    url,
    inLanguage: locale,
    description: t.intro,
    publisher: { '@id': `${SITE_URL}/#business` },
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: t.home, item: createCanonicalUrl(localizePath(locale, '/')) },
      { '@type': 'ListItem', position: 2, name: t.blog, item: url },
    ],
  };

  return (
    <div className="min-h-screen pt-24 pb-16 md:pb-24" style={{ backgroundColor: '#e8e4dc' }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(blogCollectionSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <section className="relative overflow-hidden bg-primary pb-10 pt-10 sm:pb-14 sm:pt-12">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.15]"
          style={{
            backgroundImage:
              'radial-gradient(circle at 20% 20%, rgba(255,255,255,0.55) 0, transparent 45%), radial-gradient(circle at 80% 0%, rgba(255,255,255,0.35) 0, transparent 40%)',
          }}
        />
        <div className="relative mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-secondary sm:text-sm">{t.kicker}</p>
          <h1 className="font-head text-3xl font-bold leading-tight text-white sm:text-4xl lg:text-5xl">{t.title}</h1>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-white/80 sm:text-base">{t.intro}</p>
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {tags.length > 0 && (
          <div className="mt-8 flex flex-wrap gap-2 md:mt-10">
            {tags.map((tag) => (
              <span key={tag} className="rounded-full border border-primary/20 bg-white px-4 py-1.5 text-xs font-semibold text-primary">
                {tag}
              </span>
            ))}
          </div>
        )}

        {posts.length > 0 ? (
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 md:mt-10">
            {posts.map((post) => <PostCard key={post.slug} post={post} locale={locale} />)}
          </div>
        ) : (
          <div className="mt-16 text-center"><p className="text-black/60">{t.empty}</p></div>
        )}

        <div className="mt-16 rounded-2xl bg-white border border-primary/10 px-6 py-10 text-center shadow-[0_8px_32px_rgba(83,45,36,0.08)] md:mt-20 md:px-12 md:py-14">
          <p className="font-head text-xl font-bold text-black md:text-2xl">{t.ctaTitle}</p>
          <p className="mx-auto mt-2 max-w-md text-sm text-black/65 md:text-base">{t.ctaBody}</p>
          <div className="mt-6 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <Link href={localizePath(locale, '/properties')} className="inline-block rounded-full bg-primary px-8 py-3 text-sm font-semibold text-white transition-opacity hover:opacity-90 md:text-base">
              {t.viewProperties}
            </Link>
            <Link href={localizePath(locale, '/reservation')} className="inline-block rounded-full border border-primary px-8 py-3 text-sm font-semibold text-primary transition-colors hover:bg-primary/5 md:text-base">
              {t.requestDates}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
