'use client';
import { useEffect, useState } from 'react';

interface TypewriterTextProps {
  text: string;
  className?: string;
  /** ms per character */
  speed?: number;
  /** ms before typing starts */
  startDelay?: number;
  showCursor?: boolean;
}

export default function TypewriterText({
  text,
  className,
  speed = 35,
  startDelay = 300,
  showCursor = true,
}: TypewriterTextProps) {
  const [displayed, setDisplayed] = useState('');
  const [done, setDone] = useState(false);
  const [cursorOn, setCursorOn] = useState(true);

  useEffect(() => {
    const delay = setTimeout(() => {
      let i = 0;
      const tick = setInterval(() => {
        i++;
        setDisplayed(text.slice(0, i));
        if (i >= text.length) {
          clearInterval(tick);
          setDone(true);
        }
      }, speed);
      return () => clearInterval(tick);
    }, startDelay);
    return () => clearTimeout(delay);
  }, [text, speed, startDelay]);

  // blink cursor when done
  useEffect(() => {
    if (!done) return;
    const blink = setInterval(() => setCursorOn(v => !v), 530);
    return () => clearInterval(blink);
  }, [done]);

  return (
    <span className={className}>
      {displayed}
      {showCursor && (
        <span
          className="inline-block w-[2px] h-[1em] bg-current align-middle ml-[2px]"
          style={{ opacity: cursorOn ? 1 : 0, transition: 'opacity 0.1s' }}
        />
      )}
    </span>
  );
}
