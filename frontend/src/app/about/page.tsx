import type { Metadata } from 'next';
import Image from 'next/image';
import GlitchText from '@/app/components/GlitchText';
import TypewriterText from '@/app/components/TypewriterText';

export const metadata: Metadata = { title: 'About' };

const skills = [
  { category: 'Languages', items: ['Python', 'Java', 'C++', 'GoLang', 'JavaScript'] },
  { category: 'Frameworks', items: ['React', 'Node.js', 'Spring', 'Flask', 'Django', 'Electron'] },
  { category: 'Cloud and DevOps', items: ['AWS', 'GCP', 'Azure', 'CI/CD', 'Kubernetes', 'Docker', 'Terraform', 'Helm', 'Git', 'Prometheus'] },
  { category: 'AI', items: ['PyTorch', 'MCP', 'Prompt Engineering', 'LangGraph', 'RAG', 'Vercel'] },
  { category: 'Others', items: ['Spark', 'Kafka', 'RabbitMQ', 'Hadoop', 'Redis', 'MySQL', 'MongoDB', 'JIRA', 'Postman', 'JUnit5'] },
];

const experience = [
  {
    company: 'Snapbit LLC',
    role: 'Full Stack Developer',
    period: '[2025.05.01] – [2025.10.01]',
    description: 'Led full-stack development and AWS cloud architecture for Enterprise Data Governance system, driving company\'s strategic expansion from B2C to B2B markets.',
  },
  {
    company: 'Beijing Jiaotong University',
    role: 'Software Engineer',
    period: '[2023.12.12] – [2024.06.01]',
    description: 'Independently architected and developed cloud-native, AI-powered road object annotation platform with text-to-label prompts, streamlining the autonomous driving research team’s workflow and cutting labeled dataset generation.',
  },
  {
    company: 'Motovis Intelligent Technology CO., LTD.',
    role: 'Toolchain Development Engineer',
    period: '[2023.09.15] – [2023.12.10]',
    description: 'Collaborated on the development and optimization of a real-time toolchain for an autonomous driving parking perception model, specializing in model inference workflows.',
  },
  {
    company: 'GBCOM Communication Technology Co., Ltd.',
    role: 'Python Developer',
    period: '[2022.08.15] – [2023.08.05]',
    description: 'Designed and deployed a financial automation system that automated data entry and report reconciliation, reducing email average preparation time by 95% (10min to 30s). ',
  },
];

const education = [
  {
    institution: 'Carnegie Mellon University',
    degree: 'Master of Science in Information Technology - Mobile',
    period: '[2024.09] – [2026.05]',
    activities: '[15-319] Cloud Computing TA, [14-795] AI in Information Security TA',
    coursework: '15-513 Introduction to Computer Systems, 15-619 Advanced Cloud Computing, 14-736 Distributed System, 17-780 API Design and Implementation',
  },
  {
    institution: 'Beijing Jiaotong University',
    degree: 'Bachelor of Engineering in Software Engineering',
    period: '[2020.09] – [2024.06]',
    activities: 'Science and Technology Association - Head of Popular Science Department, Student Union - Vice Minister of External Relations',
    coursework: 'Data Structure, Computer Networks, Operating Systems, Database Systems, Software Engineering, Object-Oriented Programming, Compiler Principles',
  }
];

export default function AboutPage() {
  return (
    <main className="max-w-3xl mx-auto px-4 sm:px-6 py-16">
      {/* ── Profile ─────────────────────────────────────────────── */}
      <section className="flex flex-col sm:flex-row gap-8 items-start mb-16">
        <div className="relative w-28 h-28 shrink-0 group cursor-pointer">
          <Image
            src="/avatar.jpg"
            alt="Simon Du"
            fill
            className="rounded-full object-cover transition-opacity duration-300 group-hover:opacity-0"
          />
          <Image
            src="/avatar-hover.jpg"
            alt="Simon Du"
            fill
            className="rounded-full object-cover transition-opacity duration-300 opacity-0 group-hover:opacity-100"
          />
        </div>
        <div>
          <p className="text-sm font-mono mb-2">
            <span className="opacity-50 text-gray-600 dark:text-gray-400">root@simon:~$</span>{' '}
            <span className="text-emerald-500 dark:text-emerald-300">cat ./about.md</span>
            <span className="terminal-cursor text-emerald-500 dark:text-emerald-400 ml-1">▊</span>
          </p>
          <h1 className="font-pixel text-xl sm:text-2xl text-gray-900 dark:text-gray-100 leading-loose mb-2">
            <GlitchText text="Simon Du" interval={6000} />
          </h1>
          <p className="text-emerald-600 dark:text-emerald-400 font-medium mb-4">
            <TypewriterText text="[Full-Stack Engineer -> Cloud and Distributed System Engineer]" startDelay={200} speed={28} />
          </p>
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
            [Think as I move forward. Passionate about interesting and reliable AI workflows. Work if for living, create is for life.]
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
              href="mailto:shimaod@andrew.cmu.edu"
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
                {edu.activities && (
                  <p className="text-gray-600 dark:text-gray-400 text-sm">{edu.activities}</p>
                )}
                {edu.coursework && (
                  <p className="text-gray-600 dark:text-gray-400 text-sm">{edu.coursework}</p>
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
