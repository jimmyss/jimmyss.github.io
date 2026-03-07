import type { Metadata } from 'next';

export const metadata: Metadata = { title: 'Projects' };

interface Project {
  title: string;
  description: string;
  tech: string[];
  github: string;
  live?: string;
  status?: 'active' | 'completed' | 'wip';
}

const projects: Project[] = [
  {
    title: '[Project Title]',
    description: '[Describe what the project does, what problem it solves, and what you built. 2–3 sentences is ideal.]',
    tech: ['[Tech]', '[Tech]', '[Tech]'],
    github: 'https://github.com/jimmyss',
    status: 'completed',
  },
  {
    title: '[Project Title]',
    description: '[Describe what the project does, what problem it solves, and what you built. 2–3 sentences is ideal.]',
    tech: ['[Tech]', '[Tech]'],
    github: 'https://github.com/jimmyss',
    live: '',
    status: 'active',
  },
  {
    title: '[Project Title]',
    description: '[Describe what the project does, what problem it solves, and what you built. 2–3 sentences is ideal.]',
    tech: ['[Tech]', '[Tech]', '[Tech]'],
    github: 'https://github.com/jimmyss',
    status: 'completed',
  },
  {
    title: '[Project Title]',
    description: '[Describe what the project does, what problem it solves, and what you built. 2–3 sentences is ideal.]',
    tech: ['[Tech]', '[Tech]'],
    github: 'https://github.com/jimmyss',
    status: 'wip',
  },
];

const statusLabel: Record<NonNullable<Project['status']>, { label: string; className: string }> = {
  active:    { label: 'Active',     className: 'bg-emerald-50 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 border-emerald-100 dark:border-emerald-800' },
  completed: { label: 'Completed',  className: 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 border-gray-200 dark:border-gray-700' },
  wip:       { label: 'In Progress',className: 'bg-amber-50 dark:bg-amber-900/20 text-amber-700 dark:text-amber-400 border-amber-100 dark:border-amber-800' },
};

export default function ProjectsPage() {
  return (
    <main className="max-w-4xl mx-auto px-4 sm:px-6 py-16">
      <div className="mb-12">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-3">Projects</h1>
        <p className="text-gray-500 dark:text-gray-400 text-lg">
          Things I&apos;ve built, am building, or am experimenting with.
        </p>
      </div>

      <div className="grid sm:grid-cols-2 gap-6">
        {projects.map((project) => {
          const badge = project.status ? statusLabel[project.status] : null;
          return (
            <article
              key={project.title}
              className="flex flex-col p-6 rounded-xl border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 hover:border-emerald-300 dark:hover:border-emerald-700 transition-colors"
            >
              <div className="flex items-start justify-between gap-3 mb-3">
                <h2 className="font-semibold text-gray-900 dark:text-gray-100 leading-snug">{project.title}</h2>
                {badge && (
                  <span className={`text-xs px-2 py-0.5 rounded-full border shrink-0 ${badge.className}`}>
                    {badge.label}
                  </span>
                )}
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed mb-4 flex-1">
                {project.description}
              </p>
              <div className="flex flex-wrap gap-1.5 mb-5">
                {project.tech.map((t) => (
                  <span
                    key={t}
                    className="px-2 py-0.5 text-xs bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-400 rounded border border-gray-200 dark:border-gray-700"
                  >
                    {t}
                  </span>
                ))}
              </div>
              <div className="flex gap-4 text-sm">
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors"
                >
                  GitHub ↗
                </a>
                {project.live && (
                  <a
                    href={project.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-emerald-600 dark:text-emerald-400 hover:underline"
                  >
                    Live ↗
                  </a>
                )}
              </div>
            </article>
          );
        })}
      </div>
    </main>
  );
}
