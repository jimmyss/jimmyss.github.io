import type { Metadata } from 'next';
import Link from 'next/link';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { getAllPostMetas, getPostBySlug, formatDate } from '@/lib/posts';
import GlitchText from '@/app/components/GlitchText';

export async function generateStaticParams() {
  return getAllPostMetas().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const { meta } = getPostBySlug(slug);
  return {
    title: meta.title,
    description: meta.excerpt,
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const { meta, content } = getPostBySlug(slug);

  return (
    <main className="max-w-3xl mx-auto px-4 sm:px-6 py-16">
      {/* Back link */}
      <Link
        href="/blog"
        className="inline-flex items-center gap-1.5 text-sm text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors mb-10"
      >
        ← All posts
      </Link>

      {/* Post header */}
      <header className="mb-10">
        <p className="text-sm font-mono mb-4">
          <span className="opacity-50 text-gray-600 dark:text-gray-400">root@simon:~/blog$</span>{' '}
          <span className="text-emerald-500 dark:text-emerald-300">cat {slug}.md</span>
          <span className="terminal-cursor text-emerald-500 dark:text-emerald-400 ml-1">▊</span>
        </p>
        <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100 leading-tight mb-4">
          <GlitchText text={meta.title} interval={8000} />
        </h1>
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
          <time className="text-sm text-gray-400 dark:text-gray-500">{formatDate(meta.date)}</time>
          {meta.tags.length > 0 && (
            <div className="flex flex-wrap gap-1.5">
              {meta.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-xs px-2 py-0.5 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 rounded"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </header>

      <div className="border-t border-gray-100 dark:border-gray-800 mb-10" />

      {/* MDX content */}
      <article className="prose">
        <MDXRemote source={content} />
      </article>

      <div className="border-t border-gray-100 dark:border-gray-800 mt-14 pt-8">
        <Link
          href="/blog"
          className="text-sm text-emerald-600 dark:text-emerald-400 hover:underline"
        >
          ← Back to all posts
        </Link>
      </div>
    </main>
  );
}
