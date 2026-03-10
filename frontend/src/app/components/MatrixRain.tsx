'use client';
import { useEffect, useRef } from 'react';

const CHARS = '01アイウエオカキクケコサシスセソタチツテトナニヌネノ<>{}[]()=+-*/!?#@%^&ABCDEF';

export default function MatrixRain({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const fontSize = 13;
    let drops: number[] = [];
    let animId: number;

    const init = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      const columns = Math.floor(canvas.width / fontSize);
      drops = Array.from({ length: columns }, () => Math.random() * -50);
    };

    init();

    const observer = new ResizeObserver(init);
    observer.observe(canvas);

    const draw = () => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      for (let i = 0; i < drops.length; i++) {
        const char = CHARS[Math.floor(Math.random() * CHARS.length)];
        const y = drops[i] * fontSize;

        // bright head
        ctx.fillStyle = '#a7f3d0';
        ctx.font = `bold ${fontSize}px monospace`;
        ctx.fillText(char, i * fontSize, y);

        // dim trail char behind
        ctx.fillStyle = '#10b981';
        ctx.font = `${fontSize}px monospace`;
        ctx.fillText(CHARS[Math.floor(Math.random() * CHARS.length)], i * fontSize, y - fontSize);

        if (y > canvas.height && Math.random() > 0.975) {
          drops[i] = Math.random() * -20;
        }
        drops[i] += 0.4;
      }

      animId = requestAnimationFrame(draw);
    };

    animId = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(animId);
      observer.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={className}
      style={{ display: 'block' }}
    />
  );
}
