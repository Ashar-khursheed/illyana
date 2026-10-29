'use client';

import { useEffect, useRef } from 'react';

/** Interactive dot grid behind the hero: dots ripple and push away from the pointer. */
export function HeroField() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current!;
    const ctx = canvas.getContext('2d')!;
    const hero = canvas.parentElement!;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const GAP = 28;
    const R = 160;
    let w = 0, h = 0, t = 0, raf = 0, visible = true;
    let dots: { ox: number; oy: number; x: number; y: number }[] = [];
    const mouse = { x: -9999, y: -9999 };

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = hero.clientWidth; h = hero.clientHeight;
      canvas.width = w * dpr; canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      dots = [];
      for (let y = GAP / 2; y < h; y += GAP)
        for (let x = GAP / 2; x < w; x += GAP) dots.push({ ox: x, oy: y, x, y });
    };

    const frame = () => {
      if (!visible) return;
      t += 0.012;
      ctx.clearRect(0, 0, w, h);
      for (const d of dots) {
        const wave = reduced ? 0 : Math.sin(d.ox * 0.008 + t) * Math.cos(d.oy * 0.01 + t * 0.8) * 3;
        const dx = d.ox - mouse.x, dy = d.oy - mouse.y;
        const dist = Math.hypot(dx, dy);
        let tx = d.ox, ty = d.oy + wave, s = 1, near = 0;
        if (dist < R) {
          near = 1 - dist / R;
          const push = near * near * 36;
          tx += (dx / (dist || 1)) * push;
          ty += (dy / (dist || 1)) * push;
          s = 1 + near * 1.6;
        }
        d.x += (tx - d.x) * 0.14;
        d.y += (ty - d.y) * 0.14;
        ctx.fillStyle = near > 0.15 ? `rgba(14,124,90,${0.35 + near * 0.65})` : 'rgba(14,14,16,.16)';
        ctx.beginPath();
        ctx.arc(d.x, d.y, 1.1 * s, 0, Math.PI * 2);
        ctx.fill();
      }
      raf = requestAnimationFrame(frame);
    };

    const onMove = (e: PointerEvent) => {
      const r = canvas.getBoundingClientRect();
      mouse.x = e.clientX - r.left; mouse.y = e.clientY - r.top;
    };
    const onLeave = () => { mouse.x = mouse.y = -9999; };
    const io = new IntersectionObserver(([en]) => {
      visible = en.isIntersecting;
      cancelAnimationFrame(raf);
      if (visible) raf = requestAnimationFrame(frame);
    });

    resize();
    hero.addEventListener('pointermove', onMove);
    hero.addEventListener('pointerleave', onLeave);
    window.addEventListener('resize', resize);
    io.observe(hero);

    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      hero.removeEventListener('pointermove', onMove);
      hero.removeEventListener('pointerleave', onLeave);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return <canvas ref={ref} className="hero__field" aria-hidden="true" />;
}
