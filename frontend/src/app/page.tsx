import Link from 'next/link';
import { getAllPostMetas, formatDate } from '@/lib/posts';

const featuredProjects = [
  {
    title: '[Project Title]',
    description: '[A short description of what this project does and the problem it solves.]',
    tech: ['Next.js', 'TypeScript'],
    github: 'https://github.com/jimmyss',
    live: '',
  },
  {
    title: '[Project Title]',
    description: '[A short description of what this project does and the problem it solves.]',
    tech: ['Python', 'FastAPI'],
    github: 'https://github.com/jimmyss',
    live: '',
  },
  {
    title: '[Project Title]',
    description: '[A short description of what this project does and the problem it solves.]',
    tech: ['React', 'Node.js'],
    github: 'https://github.com/jimmyss',
    live: '',
  },
];

export default function HomePage() {
  const recentPosts = getAllPostMetas().slice(0, 3);

  return (
    <main className="min-h-screen">
      {/* ── Hero ─────────────────────────────────────────────────── */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 pt-24 pb-20">
        <p className="text-emerald-600 dark:text-emerald-400 text-sm font-medium tracking-wide uppercase mb-4">
          Hello, I&apos;m
        </p>
        <h1 className="text-5xl sm:text-6xl font-bold text-gray-900 dark:text-gray-100 leading-tight mb-4">
          [Your Name]
        </h1>
        <p className="text-xl text-gray-500 dark:text-gray-400 mb-6">
          [Your Title / Role — e.g. Software Engineer · CS Student]
        </p>
        <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl leading-relaxed mb-10">
          [A one or two sentence intro. What do you work on? What are you interested in?
          This is the first thing visitors see, so keep it clear and personal.]
        </p>
        <div className="flex flex-wrap gap-3">
          <Link
            href="/projects"
            className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 dark:bg-emerald-500 dark:hover:bg-emerald-600 text-white rounded-lg font-medium transition-colors"
          >
            View Projects
          </Link>
          <Link
            href="/blog"
            className="px-5 py-2.5 bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-900 dark:text-gray-100 rounded-lg font-medium transition-colors"
          >
            Read Blog
          </Link>
        </div>
      </section>

      <div className="border-t border-gray-100 dark:border-gray-800" />

      {/* ── Featured Projects ─────────────────────────────────────── */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 py-16">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Featured Projects</h2>
          <Link href="/projects" className="text-sm text-emerald-600 dark:text-emerald-400 hover:underline">
            All projects →
          </Link>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {featuredProjects.map((project) => (
            <div
              key={project.title}
              className="group p-5 rounded-xl border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 hover:border-emerald-300 dark:hover:border-emerald-700 transition-colors"
            >
              <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">{project.title}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 leading-relaxed">{project.description}</p>
              <div className="flex flex-wrap gap-1.5 mb-4">
                {project.tech.map((t) => (
                  <span key={t} className="px-2 py-0.5 text-xs bg-emerald-50 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 rounded-full border border-emerald-100 dark:border-emerald-800">
                    {t}
                  </span>
                ))}
              </div>
              <div className="flex gap-3 text-sm">
                <a href={project.github} target="_blank" rel="noopener noreferrer" className="text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors">
                  GitHub ↗
                </a>
                {project.live && (
                  <a href={project.live} target="_blank" rel="noopener noreferrer" className="text-emerald-600 dark:text-emerald-400 hover:underline">
                    Live ↗
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      <div className="border-t border-gray-100 dark:border-gray-800" />

      {/* ── Recent Posts ──────────────────────────────────────────── */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 py-16">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Recent Posts</h2>
          <Link href="/blog" className="text-sm text-emerald-600 dark:text-emerald-400 hover:underline">
            All posts →
          </Link>
        </div>

        {recentPosts.length === 0 ? (
          <p className="text-gray-500 dark:text-gray-400">No posts yet. Check back soon.</p>
        ) : (
          <div className="space-y-6">
            {recentPosts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="block group"
              >
                <article className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 py-4 border-b border-gray-100 dark:border-gray-800">
                  <div>
                    <h3 className="font-medium text-gray-900 dark:text-gray-100 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                      {post.title}
                    </h3>
                    {post.excerpt && (
                      <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{post.excerpt}</p>
                    )}
                    <div className="flex flex-wrap gap-1.5 mt-2">
                      {post.tags.map((tag) => (
                        <span key={tag} className="text-xs px-1.5 py-0.5 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 rounded">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                  <time className="text-sm text-gray-400 dark:text-gray-500 shrink-0">
                    {formatDate(post.date)}
                  </time>
                </article>
              </Link>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
