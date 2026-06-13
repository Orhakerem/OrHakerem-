import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getAllPosts, getPostBySlug, getRelatedPosts, formatDate, readingTime } from '@/lib/blog';
import MdxContent from '@/components/blog/MdxContent';
import PostCard from '@/components/blog/PostCard';
import { createCanonicalUrl, SITE_URL } from '@/app/seo';
import { HOST } from '@/lib/host';

export function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

export function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Metadata {
  const post = getPostBySlug(params.slug);
  if (!post) return {};

  const { frontmatter, slug } = post;
  const ogImageUrl = `${SITE_URL}${frontmatter.image}`;

  return {
    title: frontmatter.title,
    description: frontmatter.description,
    keywords: frontmatter.keywords.join(', '),
    authors: [{ name: frontmatter.author }],
    openGraph: {
      title: frontmatter.title,
      description: frontmatter.description,
      url: createCanonicalUrl(`/blog/${slug}`),
      siteName: 'Or Hakerem',
      images: [
        {
          url: ogImageUrl,
          alt: frontmatter.imageAlt,
          width: 1200,
          height: 630,
        },
      ],
      locale: 'en_US',
      type: 'article',
      publishedTime: frontmatter.date,
      modifiedTime: frontmatter.updated ?? frontmatter.date,
      authors: [frontmatter.author],
      tags: frontmatter.tags,
    },
    twitter: {
      card: 'summary_large_image',
      title: frontmatter.title,
      description: frontmatter.description,
      images: [ogImageUrl],
    },
    alternates: {
      canonical: createCanonicalUrl(`/blog/${slug}`),
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = getPostBySlug(params.slug);
  if (!post) notFound();

  const { frontmatter, content, slug } = post;
  const relatedPosts = getRelatedPosts(slug, frontmatter.tags);

  const blogPostingSchema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: frontmatter.title,
    description: frontmatter.description,
    image: `${SITE_URL}${frontmatter.image}`,
    datePublished: frontmatter.date,
    dateModified: frontmatter.updated ?? frontmatter.date,
    author: {
      '@type': 'Person',
      name: HOST.name,
      url: HOST.url,
      image: `${SITE_URL}${HOST.image}`,
      jobTitle: HOST.jobTitle,
      sameAs: HOST.sameAs,
    },
    publisher: {
      '@type': 'Organization',
      name: 'Or Hakerem',
      logo: {
        '@type': 'ImageObject',
        url: `${SITE_URL}/logo/Logo_beige.png`,
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': createCanonicalUrl(`/blog/${slug}`),
    },
    keywords: frontmatter.keywords.join(', '),
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
      { '@type': 'ListItem', position: 2, name: 'Blog', item: `${SITE_URL}/blog` },
      {
        '@type': 'ListItem',
        position: 3,
        name: frontmatter.title,
        item: createCanonicalUrl(`/blog/${slug}`),
      },
    ],
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#e8e4dc' }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogPostingSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      {/* Hero image */}
      <div className="relative h-64 w-full overflow-hidden sm:h-80 md:h-96 lg:h-[480px]">
        <Image
          src={frontmatter.image}
          alt={frontmatter.imageAlt}
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="absolute top-24 left-4 sm:left-6 md:left-8 lg:left-12">
          <ol className="flex items-center gap-1.5 text-xs text-white/75">
            <li><Link href="/" className="hover:text-white transition-colors">Home</Link></li>
            <li aria-hidden>/</li>
            <li><Link href="/blog" className="hover:text-white transition-colors">Blog</Link></li>
            <li aria-hidden>/</li>
            <li className="text-white/50 line-clamp-1 max-w-[140px]">{frontmatter.title}</li>
          </ol>
        </nav>
      </div>

      {/* Article */}
      <article className="mx-auto max-w-3xl px-4 pb-16 sm:px-6 lg:px-8 md:pb-24">
        {/* Tags */}
        <div className="mt-8 flex flex-wrap gap-2">
          {frontmatter.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-secondary/15 px-3 py-0.5 text-xs font-semibold text-primary"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Title */}
        <h1 className="mt-4 font-head text-3xl font-bold leading-tight text-black md:text-4xl lg:text-5xl">
          {frontmatter.title}
        </h1>

        {/* Byline */}
        <div className="mt-4 flex flex-wrap items-center gap-3 text-sm text-black/50">
          <span>By <strong className="text-black/70">{frontmatter.author}</strong></span>
          <span aria-hidden>·</span>
          <time dateTime={frontmatter.date}>{formatDate(frontmatter.date)}</time>
          {frontmatter.updated && frontmatter.updated !== frontmatter.date && (
            <>
              <span aria-hidden>·</span>
              <span>Updated <time dateTime={frontmatter.updated}>{formatDate(frontmatter.updated)}</time></span>
            </>
          )}
          <span aria-hidden>·</span>
          <span>{readingTime(content)}</span>
        </div>

        <hr className="mt-6 border-t border-primary/15" />

        {/* Body */}
        <div className="mt-8">
          <MdxContent source={content} />
        </div>

        {/* Booking CTA */}
        <div className="mt-12 rounded-2xl bg-primary px-6 py-8 text-center text-white md:px-10 md:py-10">
          <p className="font-head text-xl font-bold md:text-2xl">
            Planning a visit to Tel Aviv?
          </p>
          <p className="mt-2 text-sm text-white/80 md:text-base">
            Stay in Kerem HaTeimanim — steps from Carmel Market and Banana Beach. Book directly with us and save up to 15% vs. Airbnb.
          </p>
          <div className="mt-6 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <Link
              href="/properties"
              className="inline-block rounded-full bg-white px-8 py-3 text-sm font-semibold text-primary transition-opacity hover:opacity-90 md:text-base"
            >
              View Properties
            </Link>
            <Link
              href="/reservation"
              className="inline-block rounded-full border border-white/50 px-8 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/10 md:text-base"
            >
              Book Direct
            </Link>
          </div>
        </div>
      </article>

      {/* Related posts */}
      {relatedPosts.length > 0 && (
        <section className="mx-auto max-w-6xl px-4 pb-16 sm:px-6 lg:px-8 md:pb-24">
          <h2 className="mb-6 font-head text-2xl font-bold text-black md:text-3xl">
            More from the blog
          </h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {relatedPosts.map((related) => (
              <PostCard key={related.slug} post={related} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
