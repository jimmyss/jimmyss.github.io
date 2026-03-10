import type { Metadata } from 'next';
import GlitchText from '@/app/components/GlitchText';
import TypewriterText from '@/app/components/TypewriterText';

export const metadata: Metadata = { title: 'About' };

const skills = [
  { category: 'Languages', items: ['[Language]', '[Language]', '[Language]'] },
  { category: 'Frameworks', items: ['[Framework]', '[Framework]', '[Framework]'] },
  { category: 'Tools', items: ['[Tool]', '[Tool]', '[Tool]'] },
];

const experience = [
  {
    company: 'Snapbit LLC',
    role: 'Full Stack Developer',
    period: '[2025.05.01] – [2025.10.01]',
    description: '[Brief description of what you did, what you built, or what you learned.]',
  },
];

const education = [
  {
    institution: '[University Name]',
    degree: '[Degree, Major]',
    period: '[Year] – [Year]',
    note: '[Optional: GPA, honors, relevant coursework, clubs, etc.]',
  },
];

export default function AboutPage() {
  return (
    <main className="max-w-3xl mx-auto px-4 sm:px-6 py-16">
      {/* ── Profile ─────────────────────────────────────────────── */}
      <section className="flex flex-col sm:flex-row gap-8 items-start mb-16">
        <div className="w-28 h-28 rounded-full bg-gradient-to-br from-emerald-400 to-teal-600 flex items-center justify-center text-white text-4xl font-bold shrink-0 select-none">
          J
        </div>
        <div>
          <p className="text-sm font-mono mb-2">
            <span className="opacity-50 text-gray-600 dark:text-gray-400">root@simon:~$</span>{' '}
            <span className="text-emerald-500 dark:text-emerald-300">cat ./about.md</span>
            <span className="terminal-cursor text-emerald-500 dark:text-emerald-400 ml-1">▊</span>
          </p>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-1">
            <GlitchText text="[Your Name]" interval={6000} />
          </h1>
          <p className="text-emerald-600 dark:text-emerald-400 font-medium mb-4">
            <TypewriterText text="[Your Title / Role]" startDelay={200} speed={28} />
          </p>
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
            [Write a few sentences about yourself here — who you are, what you work on,
            what you care about, and what you&apos;re looking for. Keep it genuine and conversational.]
          </p>
          <div className="flex gap-4 mt-5 text-sm">
            <a
              href="https://github.com/jimmyss"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-500 dark:text-gray-400 link-cyber"
            >
              GitHub ↗
            </a>
            <a
              href="mailto:[your@email.com]"
              className="text-gray-500 dark:text-gray-400 link-cyber"
            >
              Email ↗
            </a>
          </div>
        </div>
      </section>

      {/* ── Experience ──────────────────────────────────────────── */}
      <section className="mb-14">
        <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-6 pb-3 border-b border-gray-200 dark:border-gray-800">
          <span className="font-mono text-emerald-500 dark:text-emerald-400 mr-2 opacity-60">&gt;_</span>Experience
        </h2>
        <div className="space-y-6">
          {experience.map((exp) => (
            <div key={exp.company} className="flex flex-col sm:flex-row sm:gap-6">
              <time className="text-sm text-gray-400 dark:text-gray-500 shrink-0 sm:w-36 pt-0.5">{exp.period}</time>
              <div>
                <p className="font-semibold text-gray-900 dark:text-gray-100">{exp.role}</p>
                <p className="text-emerald-600 dark:text-emerald-400 text-sm mb-1">{exp.company}</p>
                <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">{exp.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Education ───────────────────────────────────────────── */}
      <section className="mb-14">
        <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-6 pb-3 border-b border-gray-200 dark:border-gray-800">
          <span className="font-mono text-emerald-500 dark:text-emerald-400 mr-2 opacity-60">&gt;_</span>Education
        </h2>
        <div className="space-y-6">
          {education.map((edu) => (
            <div key={edu.institution} className="flex flex-col sm:flex-row sm:gap-6">
              <time className="text-sm text-gray-400 dark:text-gray-500 shrink-0 sm:w-36 pt-0.5">{edu.period}</time>
              <div>
                <p className="font-semibold text-gray-900 dark:text-gray-100">{edu.degree}</p>
                <p className="text-emerald-600 dark:text-emerald-400 text-sm mb-1">{edu.institution}</p>
                {edu.note && (
                  <p className="text-gray-600 dark:text-gray-400 text-sm">{edu.note}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Skills ──────────────────────────────────────────────── */}
      <section>
        <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-6 pb-3 border-b border-gray-200 dark:border-gray-800">
          <span className="font-mono text-emerald-500 dark:text-emerald-400 mr-2 opacity-60">&gt;_</span>Skills
        </h2>
        <div className="space-y-4">
          {skills.map(({ category, items }) => (
            <div key={category} className="flex flex-col sm:flex-row sm:gap-6 sm:items-start">
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400 sm:w-36 shrink-0 mb-2 sm:mb-0 pt-0.5">
                {category}
              </p>
              <div className="flex flex-wrap gap-2">
                {items.map((item, i) => (
                  <span
                    key={i}
                    className="px-3 py-1 text-sm bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-full"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
