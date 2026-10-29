'use client';

import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

/** Lightweight motion for landing pages: smooth scroll, hero intro, scroll reveals, plan rail, magnetic CTAs. */
export function LandingFx() {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const root = document.documentElement;
    document.body.classList.remove('is-loading');
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) { root.classList.remove('js'); return; }

    const lenis = new Lenis({ duration: 1.1, smoothWheel: true });
    lenis.on('scroll', ScrollTrigger.update);
    let raf = 0;
    const loop = (t: number) => { lenis.raf(t); raf = requestAnimationFrame(loop); };
    raf = requestAnimationFrame(loop);

    const onClick = (e: MouseEvent) => {
      const a = (e.target as HTMLElement).closest<HTMLAnchorElement>('a[href^="#"]');
      const target = a && document.querySelector<HTMLElement>(a.getAttribute('href')!);
      if (!target) return;
      e.preventDefault();
      lenis.scrollTo(target, { offset: -80, duration: 1.4 });
    };
    document.addEventListener('click', onClick);

    const cleanups: (() => void)[] = [];
    const ctx = gsap.context(() => {
      gsap.timeline({ defaults: { ease: 'expo.out', duration: 1.3 } })
        .fromTo('.lp-hero .reveal-up', { y: 28, opacity: 0 }, { y: 0, opacity: 1, stagger: .09 })
        .from('.lp-hero__card', { y: 40, opacity: 0, scale: .97 }, .25);

      ScrollTrigger.batch('[data-reveal]', {
        start: 'top 90%',
        onEnter: batch => gsap.to(batch, { opacity: 1, y: 0, duration: 1.1, stagger: .07, ease: 'expo.out', overwrite: true }),
      });

      gsap.to('.lp-rail i', {
        scaleY: 1, ease: 'none',
        scrollTrigger: { trigger: '.lp-phases', start: 'top 70%', end: 'bottom 60%', scrub: true },
      });

      if (window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
        document.querySelectorAll<HTMLElement>('[data-magnetic]').forEach(el => {
          const xTo = gsap.quickTo(el, 'x', { duration: .6, ease: 'elastic.out(1, .4)' });
          const yTo = gsap.quickTo(el, 'y', { duration: .6, ease: 'elastic.out(1, .4)' });
          const move = (e: MouseEvent) => {
            const r = el.getBoundingClientRect();
            xTo((e.clientX - r.left - r.width / 2) * .25); yTo((e.clientY - r.top - r.height / 2) * .35);
          };
          const leave = () => { xTo(0); yTo(0); };
          el.addEventListener('mousemove', move); el.addEventListener('mouseleave', leave);
          cleanups.push(() => { el.removeEventListener('mousemove', move); el.removeEventListener('mouseleave', leave); });
        });
      }
    });

    document.fonts?.ready.then(() => ScrollTrigger.refresh());
    return () => {
      cleanups.forEach(fn => fn());
      ctx.revert();
      document.removeEventListener('click', onClick);
      cancelAnimationFrame(raf);
      lenis.destroy();
    };
  }, []);

  return null;
}
