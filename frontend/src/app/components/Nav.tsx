'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTheme } from 'next-themes';
import { useEffect, useRef, useState } from 'react';

const links = [
  { href: '/', label: 'Home' },
  { href: '/blog', label: 'Blog' },
  { href: '/projects', label: 'Projects' },
  { href: '/about', label: 'About' },
];

// ── Album tracklist ────────────────────────────────────────────────
// Add your .mp3 files to frontend/public/music/ and list them here.
const TRACKS = [
  { title: 'BGM 01', file: '/music/She Her Her Hers - Bloody Mary Girl.mp3' },
  { title: 'BGM 02', file: '/music/bgm-02.mp3' },
  { title: 'BGM 03', file: '/music/bgm-03.mp3' },
];

function toTerminalPath(pathname: string) {
  if (pathname === '/') return '~';
  return '~' + pathname;
}

function SunIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="5" />
      <line x1="12" y1="1" x2="12" y2="3" />
      <line x1="12" y1="21" x2="12" y2="23" />
      <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
      <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
      <line x1="1" y1="12" x2="3" y2="12" />
      <line x1="21" y1="12" x2="23" y2="12" />
      <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
      <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
  );
}

export default function Nav() {
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  // playingRef mirrors `playing` state so closures in effects always see current value
  const playingRef = useRef(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // ── Init audio element once ──────────────────────────────────────
  useEffect(() => {
    setMounted(true);
    const handleEnded = () => {
      // Auto-advance to next track when current one finishes
      setCurrentIndex(prev => (prev + 1) % TRACKS.length);
    };
    const audio = new Audio(TRACKS[0].file);
    audio.loop = false;
    audio.volume = 0.35;
    audio.addEventListener('ended', handleEnded);
    audioRef.current = audio;
    return () => {
      audio.removeEventListener('ended', handleEnded);
      audio.pause();
      audio.src = '';
    };
  }, []);

  // ── Swap track when index changes ────────────────────────────────
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.src = TRACKS[currentIndex].file;
    audio.load();
    if (playingRef.current) {
      audio.play().catch(() => {});
    }
  }, [currentIndex]);

  const toggleMusic = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (playing) {
      audio.pause();
      setPlaying(false);
      playingRef.current = false;
    } else {
      audio.play().catch(() => {});
      setPlaying(true);
      playingRef.current = true;
    }
  };

  const prevTrack = () => setCurrentIndex(prev => (prev - 1 + TRACKS.length) % TRACKS.length);
  const nextTrack = () => setCurrentIndex(prev => (prev + 1) % TRACKS.length);

  const terminalPath = toTerminalPath(pathname);

  return (
    <nav
      role="navigation"
      aria-label="Site navigation"
      className="fixed bottom-0 left-0 right-0 z-50 h-8 bg-gray-950 border-t border-gray-800 flex items-stretch text-xs font-mono select-none"
    >
      {/* ── Brand (always visible, emerald tinted like VS Code's git section) ── */}
      <Link
        href="/"
        className="flex items-center gap-1.5 px-3 bg-emerald-950 border-r border-emerald-800/50 hover:bg-emerald-900/50 transition-colors shrink-0"
      >
        <span className="text-emerald-400 text-sm leading-none">◈</span>
        <span className="font-pixel text-emerald-300 tracking-tight text-[9px]">S1m0n</span>
        <span className="terminal-cursor text-emerald-400 leading-none">_</span>
      </Link>

      {/* ── Current path indicator (desktop) ─────────────────────── */}
      <div className="hidden sm:flex items-center gap-1 px-3 border-r border-gray-800 text-gray-500 shrink-0">
        <span className="text-emerald-800">$</span>
        <span className="text-gray-400">{terminalPath}</span>
      </div>

      {/* ── Nav links (desktop) ──────────────────────────────────── */}
      <div className="hidden sm:flex items-stretch">
        {links.map(({ href, label }) => {
          const active = href === '/' ? pathname === '/' : pathname.startsWith(href);
          return (
            <Link
              key={href}
              href={href}
              className={`flex items-center px-3 border-r border-gray-800 btn-cyber ${
                active ? 'text-emerald-400 bg-emerald-950/70' : 'text-gray-500'
              }`}
            >
              {label}
            </Link>
          );
        })}
      </div>

      {/* ── Spacer ───────────────────────────────────────────────── */}
      <div className="flex-1" />

      {/* ── VS Code–style diagnostics decoration (desktop) ────────── */}
      <div className="hidden sm:flex items-center gap-1.5 px-3 border-l border-gray-800 text-gray-700">
        <span className="text-emerald-900">✓</span>
        <span>0 errors</span>
        <span className="text-gray-800 mx-1">·</span>
        <span className="text-blue-900">UTF-8</span>
      </div>

      {/* ── Album music player ───────────────────────────────────── */}
      <div className="flex items-center gap-0.5 px-2 border-l border-gray-800">
        <button
          onClick={prevTrack}
          aria-label="Previous track"
          className="text-gray-600 hover:text-emerald-400 transition-colors text-[10px] px-0.5"
        >
          ◄
        </button>
        <button
          onClick={toggleMusic}
          aria-label={playing ? 'Pause' : 'Play'}
          className="text-gray-500 hover:text-emerald-400 transition-colors text-[10px] px-0.5"
        >
          {playing ? '⏸' : '♪'}
        </button>
        <button
          onClick={nextTrack}
          aria-label="Next track"
          className="text-gray-600 hover:text-emerald-400 transition-colors text-[10px] px-0.5"
        >
          ►
        </button>
        <span className="hidden sm:inline text-gray-600 text-[10px] ml-1 truncate max-w-[72px]">
          {TRACKS[currentIndex].title}
        </span>
      </div>

      {/* ── Theme toggle (always visible) ───────────────────────── */}
      <div className="flex items-center px-2 border-l border-gray-800">
        {mounted ? (
          <button
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            aria-label="Toggle theme"
            className="flex items-center justify-center w-6 h-6 text-gray-500 hover:text-emerald-400 transition-colors"
          >
            {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
          </button>
        ) : (
          <div className="w-6 h-6" />
        )}
      </div>
    </nav>
  );
}
