'use client';
import { useEffect, useState } from 'react';

const SCRAMBLE = '!<>-_\\/[]{}—=+*^?#@%&ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

interface GlitchTextProps {
  text: string;
  className?: string;
  /** ms between glitch triggers */
  interval?: number;
}

export default function GlitchText({ text, className, interval = 4500 }: GlitchTextProps) {
  const [display, setDisplay] = useState(text);

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;

    const triggerGlitch = () => {
      let frame = 0;
      const totalFrames = 14;

      const tick = setInterval(() => {
        const progress = frame / totalFrames;
        setDisplay(
          text.split('').map((char, i) => {
            if (char === ' ') return ' ';
            if (i / text.length < progress) return text[i];
            return SCRAMBLE[Math.floor(Math.random() * SCRAMBLE.length)];
          }).join('')
        );
        frame++;
        if (frame > totalFrames) {
          clearInterval(tick);
          setDisplay(text);
          // schedule next glitch with slight jitter
          timer = setTimeout(triggerGlitch, interval + Math.random() * 2000);
        }
      }, 40);
    };

    timer = setTimeout(triggerGlitch, interval);
    return () => clearTimeout(timer);
  }, [text, interval]);

  return <span className={className}>{display}</span>;
}
