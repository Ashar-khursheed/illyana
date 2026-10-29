'use client';

import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

let lenisInstance: Lenis | null = null;
export const getLenis = () => lenisInstance;

/** Runs every page-level animation: loader, smooth scroll, scroll scenes, cursor and magnetic hovers. */
export function Experience() {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const root = document.documentElement;
    const body = document.body;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    const $ = <T extends Element = HTMLElement>(s: string) => document.querySelector<T>(s);
    const $$ = <T extends Element = HTMLElement>(s: string) => Array.from(document.querySelectorAll<T>(s));
    const cleanups: (() => void)[] = [];
    const on = <K extends keyof HTMLElementEventMap>(el: HTMLElement | Window | Document, ev: K | string, fn: (e: any) => void) => {
      el.addEventListener(ev, fn);
      cleanups.push(() => el.removeEventListener(ev, fn));
    };

    if (reduced) {
      root.classList.remove('js');
      body.classList.remove('is-loading');
      $('.loader')?.setAttribute('style', 'display:none');
      return;
    }

    // The intro plays from the top, so never restore a mid-page scroll position on reload.
    history.scrollRestoration = 'manual';
    window.scrollTo(0, 0);

    // ---------- Smooth scroll ----------
    const lenis = new Lenis({ duration: 1.15, easing: t => Math.min(1, 1.001 - Math.pow(2, -10 * t)), smoothWheel: true });
    lenisInstance = lenis;
    lenis.stop();
    lenis.on('scroll', ScrollTrigger.update);
    // Own rAF loop: adding/removing a gsap.ticker listener across React's strict-mode remount can leave the ticker asleep.
    let rafId = 0;
    const raf = (t: number) => { lenis.raf(t); rafId = requestAnimationFrame(raf); };
    rafId = requestAnimationFrame(raf);

    on(document, 'click', (e: MouseEvent) => {
      const a = (e.target as HTMLElement).closest<HTMLAnchorElement>('a[href^="#"]');
      if (!a) return;
      const id = a.getAttribute('href')!;
      const target = id === '#top' ? 0 : document.querySelector<HTMLElement>(id);
      if (target === null) return;
      e.preventDefault();
      // Wait a frame so a closing mobile menu can restart Lenis first.
      requestAnimationFrame(() => lenis.scrollTo(target, { duration: 1.6 }));
    });

    const ctx = gsap.context(() => {
      // ---------- Preloader + hero intro ----------
      const heroChars = $$('.hero__title .char');
      const contactChars = $$('.contact__title .char');
      const count = { v: 0 };
      const countEl = $('.loader__count span')!;
      // Hero sits under the loader and the contact title is below the fold, so setting these here never flashes.
      gsap.set([...heroChars, ...contactChars], { yPercent: 115 });

      gsap.timeline({ defaults: { ease: 'expo.out' } })
        .from('.loader .lm-stem', { scaleY: 0, transformOrigin: 'bottom', duration: .9 })
        .from('.loader .lm-dot', { scale: 0, transformOrigin: 'center', duration: .8, ease: 'back.out(3)' }, '-=.5')
        .to('.loader .lm-arc', { strokeDashoffset: 0, duration: 1.1, ease: 'power3.inOut' }, '-=.4')
        .from('.loader .lm-node', { scale: 0, transformOrigin: 'center', duration: .6, ease: 'back.out(3)' }, '-=.2')
        .to(count, { v: 100, duration: 2, ease: 'power2.inOut', onUpdate: () => { countEl.textContent = String(Math.round(count.v)).padStart(3, '0'); } }, 0)
        .to('.loader__bar i', { scaleX: 1, duration: 2, ease: 'power2.inOut' }, 0)
        .to('.loader', { clipPath: 'inset(0 0 100% 0)', duration: 1.1, ease: 'expo.inOut' }, '+=.1')
        .set('.loader', { display: 'none' })
        .add(() => { body.classList.remove('is-loading'); lenis.start(); })
        .to(heroChars, { yPercent: 0, duration: 1.4, stagger: .018 }, '-=.6')
        .to('.hero .reveal-up', { opacity: 1, y: 0, duration: 1.2, stagger: .1 }, '-=1.1')
        .from('.hero__meta', { opacity: 0, duration: 1 }, '-=.8')
        // Animate the nav's children, not .nav itself, so inline transforms never fight the .is-hidden class.
        .from('.nav > *', { y: -30, opacity: 0, duration: 1, stagger: .08 }, '-=1.2');

      gsap.to('.hero__inner', {
        yPercent: -18, opacity: .2, ease: 'none',
        scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true },
      });

      // ---------- Nav state (always visible; gains a backdrop once scrolled) ----------
      const nav = $('.nav')!;
      ScrollTrigger.create({
        start: 0, end: 'max',
        onUpdate: self => nav.classList.toggle('is-scrolled', self.scroll() > 40),
      });

      // ---------- Scroll spine: fills top→bottom, lighting a node as each section is reached ----------
      const spine = $('.spine')!;
      const fill = $('.spine__fill')!;
      const head = $('.spine__head')!;
      const nodes = $$('main > section, .footer').map(section => {
        const el = document.createElement('i');
        el.className = 'spine__node';
        spine.appendChild(el);
        return { section, el, p: 0 };
      });
      const placeNodes = () => {
        const max = ScrollTrigger.maxScroll(window) || 1;
        nodes.forEach(n => {
          const top = n.section.getBoundingClientRect().top + window.scrollY;
          n.p = gsap.utils.clamp(0, 1, (top - window.innerHeight * 0.5) / max);
          n.el.style.top = `${n.p * 100}%`;
        });
      };
      const paintSpine = (p: number) => {
        gsap.set(fill, { scaleY: p });
        gsap.set(head, { y: p * spine.clientHeight });
        nodes.forEach(n => n.el.classList.toggle('is-on', p >= n.p - 0.002));
      };
      const spineST = ScrollTrigger.create({ start: 0, end: 'max', onUpdate: s => paintSpine(s.progress) });
      // Global 'refresh' fires after every trigger (incl. the services pin spacer) has re-measured.
      const onRefresh = () => { placeNodes(); paintSpine(spineST.progress); };
      ScrollTrigger.addEventListener('refresh', onRefresh);
      cleanups.push(() => {
        ScrollTrigger.removeEventListener('refresh', onRefresh);
        nodes.forEach(n => n.el.remove());
      });

      // ---------- Marquee skew with velocity ----------
      const skewTo = gsap.quickTo('.marquee__track', 'skewX', { duration: .5, ease: 'power3' });
      ScrollTrigger.create({ onUpdate: s => skewTo(gsap.utils.clamp(-12, 12, s.getVelocity() / -250)) });

      // ---------- Manifesto word reveal ----------
      gsap.to('.manifesto__text .w', {
        opacity: 1, stagger: .05, ease: 'none',
        scrollTrigger: { trigger: '.manifesto', start: 'top 70%', end: 'bottom 60%', scrub: true },
      });

      // ---------- Generic reveals ----------
      $$('.section .label, .h2, .g__sub, .pillar, .stat, .future__item, .sector-list li, details, .contact__aside > div, .form > *, .pt-lede, .pt-model, .pt-runs, .pt-cta')
        .forEach(el => el.setAttribute('data-reveal', ''));
      ScrollTrigger.batch('[data-reveal]', {
        start: 'top 88%',
        onEnter: batch => gsap.to(batch, { opacity: 1, y: 0, duration: 1.2, stagger: .08, ease: 'expo.out', overwrite: true }),
      });

      // ---------- Services horizontal scroll ----------
      const mm = gsap.matchMedia();
      mm.add('(min-width: 901px)', () => {
        const track = $('.services__track')!;
        const getDist = () => track.scrollWidth - window.innerWidth;
        gsap.to(track, {
          x: () => -getDist(), ease: 'none',
          scrollTrigger: {
            trigger: '.services', start: 'top top', end: () => '+=' + getDist(),
            pin: '.services__pin', scrub: 1, invalidateOnRefresh: true,
            onUpdate: s => gsap.set('.services__progress i', { scaleX: s.progress }),
          },
        });
        gsap.from('.card', { y: 80, opacity: 0, stagger: .08, duration: 1.2, ease: 'expo.out', scrollTrigger: { trigger: '.services', start: 'top 70%' } });
      });
      mm.add('(max-width: 900px)', () => {
        $$('.card').forEach(c => gsap.from(c, { y: 60, opacity: 0, duration: 1, ease: 'expo.out', scrollTrigger: { trigger: c, start: 'top 90%' } }));
      });

      // ---------- Method rail ----------
      gsap.to('.method__rail i', {
        scaleY: 1, ease: 'none',
        scrollTrigger: { trigger: '.method__body', start: 'top 60%', end: 'bottom 60%', scrub: true },
      });
      $$('.step').forEach(step => ScrollTrigger.create({
        trigger: step, start: 'top 62%', end: 'bottom 30%',
        onToggle: s => step.classList.toggle('is-active', s.isActive),
      }));

      // ---------- Counters ----------
      $$('[data-count]').forEach(el => {
        const o = { v: 0 };
        ScrollTrigger.create({
          trigger: el, start: 'top 90%', once: true,
          onEnter: () => gsap.to(o, { v: Number(el.dataset.count), duration: 2, ease: 'power3.out', onUpdate: () => { el.textContent = String(Math.round(o.v)); } }),
        });
      });

      // ---------- Partnership equation: the two sides slide together, then the result lands ----------
      $$('.pt-row').forEach(row => {
        gsap.timeline({ scrollTrigger: { trigger: row, start: 'top 85%', once: true }, defaults: { ease: 'expo.out', duration: 1.2 } })
          .from(row.querySelector('.pt-side--you'), { xPercent: -30, opacity: 0 })
          .from(row.querySelector('.pt-side--us'), { xPercent: 30, opacity: 0 }, 0)
          .from(row.querySelector('.pt-plus'), { scale: 0, rotate: -180, duration: 1 }, .25);
      });
      gsap.from('.pt-result', {
        y: 40, opacity: 0, scale: .96, duration: 1.2, ease: 'expo.out',
        scrollTrigger: { trigger: '.pt-result', start: 'top 90%', once: true },
      });

      // ---------- Statement lines ----------
      $$('.statement__line').forEach((line, i) => {
        gsap.fromTo(line, { xPercent: i % 2 ? 12 : -12 }, {
          xPercent: i % 2 ? -4 : 4, ease: 'none',
          scrollTrigger: { trigger: '.statement', start: 'top bottom', end: 'bottom top', scrub: true },
        });
      });

      // ---------- Contact title ----------
      gsap.to(contactChars, {
        yPercent: 0, duration: 1.4, stagger: .02, ease: 'expo.out',
        scrollTrigger: { trigger: '.contact__title', start: 'top 80%', once: true },
      });

      // ---------- Footer wordmark ----------
      gsap.from('.footer__big', {
        yPercent: 40, ease: 'none',
        scrollTrigger: { trigger: '.footer', start: 'top bottom', end: 'bottom bottom', scrub: true },
      });

      // ---------- Cursor, magnetic buttons, tilt ----------
      if (fine) {
        const cur = $('.cursor')!;
        const label = $('.cursor__label')!;
        const dx = gsap.quickTo('.cursor__dot', 'x', { duration: .1 });
        const dy = gsap.quickTo('.cursor__dot', 'y', { duration: .1 });
        const rx = gsap.quickTo('.cursor__ring', 'x', { duration: .5, ease: 'power3' });
        const ry = gsap.quickTo('.cursor__ring', 'y', { duration: .5, ease: 'power3' });
        on(window, 'pointermove', (e: PointerEvent) => { dx(e.clientX); dy(e.clientY); rx(e.clientX); ry(e.clientY); });

        $$('a, button, summary, .chips span').forEach(el => {
          on(el, 'mouseenter', () => cur.classList.add('is-hover'));
          on(el, 'mouseleave', () => cur.classList.remove('is-hover'));
        });
        $$('[data-cursor]').forEach(el => {
          on(el, 'mouseenter', () => { label.textContent = el.dataset.cursor ?? ''; cur.classList.add('is-label'); });
          on(el, 'mouseleave', () => cur.classList.remove('is-label'));
        });

        $$('[data-magnetic]').forEach(el => {
          const xTo = gsap.quickTo(el, 'x', { duration: .6, ease: 'elastic.out(1, .4)' });
          const yTo = gsap.quickTo(el, 'y', { duration: .6, ease: 'elastic.out(1, .4)' });
          on(el, 'mousemove', (e: MouseEvent) => {
            const r = el.getBoundingClientRect();
            xTo((e.clientX - r.left - r.width / 2) * .3);
            yTo((e.clientY - r.top - r.height / 2) * .4);
          });
          on(el, 'mouseleave', () => { xTo(0); yTo(0); });
        });

        $$('.card, .pillar, .pt-model').forEach(el => {
          on(el, 'mousemove', (e: MouseEvent) => {
            const r = el.getBoundingClientRect();
            const px = (e.clientX - r.left) / r.width - .5;
            const py = (e.clientY - r.top) / r.height - .5;
            gsap.to(el, { rotateY: px * 6, rotateX: -py * 6, transformPerspective: 900, duration: .6, ease: 'power3' });
          });
          on(el, 'mouseleave', () => gsap.to(el, { rotateY: 0, rotateX: 0, duration: .8, ease: 'power3' }));
        });
      }
    });

    const refresh = () => ScrollTrigger.refresh();
    document.fonts?.ready.then(refresh);
    on(window, 'load', refresh);

    return () => {
      cleanups.forEach(fn => fn());
      ctx.revert();
      cancelAnimationFrame(rafId);
      lenis.destroy();
      lenisInstance = null;
    };
  }, []);

  return null;
}
