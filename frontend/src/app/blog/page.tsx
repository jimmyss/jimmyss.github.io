import type { Metadata } from 'next';
import Link from 'next/link';
import { getAllPostMetas, formatDate } from '@/lib/posts';
import GlitchText from '@/app/components/GlitchText';
import TypewriterText from '@/app/components/TypewriterText';

export const metadata: Metadata = { title: 'Blog' };

export default function BlogPage() {
  const posts = getAllPostMetas();

  return (
    <main className="max-w-3xl mx-auto px-4 sm:px-6 py-16">
      <div className="mb-12">
        <p className="text-sm font-mono mb-4">
          <span className="opacity-50 text-gray-600 dark:text-gray-400">root@simon:~$</span>{' '}
          <span className="text-emerald-500 dark:text-emerald-300">ls ./blog/</span>
          <span className="terminal-cursor text-emerald-500 dark:text-emerald-400 ml-1">▊</span>
        </p>
        <h1 className="font-pixel text-2xl sm:text-3xl text-gray-900 dark:text-gray-100 leading-loose mb-3">
          <GlitchText text="Blog" interval={6000} />
        </h1>
        <p className="text-gray-500 dark:text-gray-400 text-lg">
          <TypewriterText text="Writing about things I learn and find interesting." startDelay={200} speed={25} />
        </p>
      </div>

      {posts.length === 0 ? (
        <p className="text-gray-500 dark:text-gray-400">No posts yet. Check back soon.</p>
      ) : (
        <div className="space-y-2">
          {posts.map((post) => (
            <Link key={post.slug} href={`/blog/${post.slug}`} className="block group">
              <article className="py-5 border-b border-gray-100 dark:border-gray-800">
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
                  <div className="flex-1 min-w-0">
                    <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors leading-snug mb-1">
                      {post.title}
                    </h2>
                    {post.excerpt && (
                      <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed mb-3">
                        {post.excerpt}
                      </p>
                    )}
                    {post.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1.5">
                        {post.tags.map((tag) => (
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
                  <time className="text-sm text-gray-400 dark:text-gray-500 shrink-0 sm:pl-8 sm:pt-0.5">
                    {formatDate(post.date)}
                  </time>
                </div>
              </article>
            </Link>
          ))}
        </div>
      )}
    </main>
  );
}
