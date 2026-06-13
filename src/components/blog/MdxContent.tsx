import type { MDXRemoteProps } from 'next-mdx-remote/rsc';
import { MDXRemote } from 'next-mdx-remote/rsc';
import Image from 'next/image';
import Link from 'next/link';
import remarkGfm from 'remark-gfm';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';

const components: MDXRemoteProps['components'] = {
  h2: ({ children, ...props }) => (
    <h2
      className="mb-4 mt-10 font-head text-2xl font-bold text-black md:text-3xl scroll-mt-28"
      {...props}
    >
      {children}
    </h2>
  ),
  h3: ({ children, ...props }) => (
    <h3
      className="mb-3 mt-7 font-head text-xl font-bold text-black md:text-2xl scroll-mt-28"
      {...props}
    >
      {children}
    </h3>
  ),
  p: ({ children, ...props }) => (
    <p className="mb-5 text-base leading-8 text-black/80" {...props}>
      {children}
    </p>
  ),
  ul: ({ children, ...props }) => (
    <ul className="mb-5 ml-6 list-disc space-y-2 text-base leading-7 text-black/80" {...props}>
      {children}
    </ul>
  ),
  ol: ({ children, ...props }) => (
    <ol className="mb-5 ml-6 list-decimal space-y-2 text-base leading-7 text-black/80" {...props}>
      {children}
    </ol>
  ),
  li: ({ children, ...props }) => (
    <li className="leading-relaxed" {...props}>
      {children}
    </li>
  ),
  a: ({ href, children, ...props }) => {
    const isInternal = href?.startsWith('/') || href?.startsWith('#');
    if (isInternal) {
      return (
        <Link
          href={href ?? '#'}
          className="font-medium text-primary underline underline-offset-4 hover:text-primary/75 transition-colors"
          {...props}
        >
          {children}
        </Link>
      );
    }
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="font-medium text-primary underline underline-offset-4 hover:text-primary/75 transition-colors"
        {...props}
      >
        {children}
      </a>
    );
  },
  strong: ({ children, ...props }) => (
    <strong className="font-semibold text-black" {...props}>
      {children}
    </strong>
  ),
  blockquote: ({ children, ...props }) => (
    <blockquote
      className="my-6 border-l-4 border-primary/30 pl-5 italic text-black/70"
      {...props}
    >
      {children}
    </blockquote>
  ),
  hr: () => <hr className="my-10 border-t border-primary/15" />,
  img: ({ src, alt }) => (
    <span className="my-6 block overflow-hidden rounded-xl">
      <Image
        src={src ?? ''}
        alt={alt ?? ''}
        width={800}
        height={450}
        className="w-full object-cover"
      />
    </span>
  ),
};

interface MdxContentProps {
  source: string;
}

export default async function MdxContent({ source }: MdxContentProps) {
  return (
    <div className="prose-custom">
      <MDXRemote
        source={source}
        options={{
          mdxOptions: {
            remarkPlugins: [remarkGfm],
            rehypePlugins: [
              rehypeSlug,
              [rehypeAutolinkHeadings, { behavior: 'wrap' }],
            ],
          },
        }}
        components={components}
      />
    </div>
  );
}
