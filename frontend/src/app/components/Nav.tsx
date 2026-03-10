import Link from 'next/link';
import ThemeToggle from '@/app/components/ThemeToggle';

const links = [
  { href: '/', label: 'Home' },
  { href: '/blog', label: 'Blog' },
  { href: '/projects', label: 'Projects' },
  { href: '/about', label: 'About' },
];

export default function Nav() {
  return (
    <nav className="sticky top-0 z-50 bg-white/80 dark:bg-gray-950/80 backdrop-blur border-b border-gray-200 dark:border-gray-800">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between gap-4">
        <Link
          href="/"
          className="font-mono font-bold text-gray-900 dark:text-gray-100 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors shrink-0"
        >
          S1m0n Not Found<span className="terminal-cursor text-emerald-500 dark:text-emerald-400 ml-0.5">_</span>
        </Link>

        <div className="flex items-center gap-1">
          <div className="flex items-center gap-1 mr-2">
            {links.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className="px-3 py-1.5 text-sm text-gray-600 dark:text-gray-400 rounded-md btn-cyber"
              >
                {label}
              </Link>
            ))}
          </div>
          <ThemeToggle />
        </div>
      </div>
    </nav>
  );
}
