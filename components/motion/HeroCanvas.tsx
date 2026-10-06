"use client";

import { useEffect, useRef } from "react";

interface Dot {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
  tone: 0 | 1;
}

export function HeroCanvas({ className = "" }: { className?: string }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const dpr = Math.min(2, window.devicePixelRatio || 1);
    let width = 0;
    let height = 0;
    let dots: Dot[] = [];
    let raf = 0;

    const colors = ["212,175,55", "37,99,235"];

    function resize() {
      const rect = canvas!.getBoundingClientRect();
      width = Math.max(1, rect.width);
      height = Math.max(1, rect.height);
      canvas!.width = Math.round(width * dpr);
      canvas!.height = Math.round(height * dpr);
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);

      const total = Math.round(Math.min(72, Math.max(28, width / 16)));
      dots = Array.from({ length: total }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.35,
        r: Math.random() * 1.7 + 0.8,
        tone: (Math.random() > 0.72 ? 1 : 0) as 0 | 1,
      }));
    }

    function paint() {
      const g = ctx!;
      g.clearRect(0, 0, width, height);

      for (const d of dots) {
        if (!reduce) {
          d.x += d.vx;
          d.y += d.vy;
          if (d.x < -8) d.x = width + 8;
          if (d.x > width + 8) d.x = -8;
          if (d.y < -8) d.y = height + 8;
          if (d.y > height + 8) d.y = -8;
        }

        g.beginPath();
        g.arc(d.x, d.y, d.r, 0, Math.PI * 2);
        g.fillStyle = `rgba(${colors[d.tone]},${d.tone ? 0.5 : 0.42})`;
        g.fill();
      }

      for (let i = 0; i < dots.length; i++) {
        for (let j = i + 1; j < dots.length; j++) {
          const a = dots[i];
          const b = dots[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const dist = Math.hypot(dx, dy);
          if (dist > 132) continue;
          g.beginPath();
          g.moveTo(a.x, a.y);
          g.lineTo(b.x, b.y);
          g.strokeStyle = `rgba(212,175,55,${(1 - dist / 132) * 0.12})`;
          g.lineWidth = 1;
          g.stroke();
        }
      }
    }

    function loop() {
      paint();
      raf = window.requestAnimationFrame(loop);
    }

    const ro = new ResizeObserver(() => {
      resize();
      if (reduce) paint();
    });
    ro.observe(canvas);

    resize();
    if (reduce) paint();
    else loop();

    return () => {
      ro.disconnect();
      if (raf) window.cancelAnimationFrame(raf);
    };
  }, []);

  return <canvas ref={ref} aria-hidden className={`pointer-events-none absolute inset-0 h-full w-full ${className}`} />;
}
