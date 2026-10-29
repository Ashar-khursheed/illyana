'use client';

import { ReactNode, RefObject, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import type { Variant } from '@/lib/landings';

/**
 * Category-specific visuals for landing pages. Each variant gets its own hero visual (looping CSS motion)
 * and its own scroll scene (GSAP ScrollTrigger, pinned on desktop, simplified on mobile).
 */

type Scene = (mm: gsap.MatchMedia, el: HTMLElement) => void;

function useScene(ref: RefObject<HTMLElement | null>, scene: Scene) {
  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    gsap.registerPlugin(ScrollTrigger);
    const mm = gsap.matchMedia();
    const ctx = gsap.context(() => scene(mm, el), el);
    return () => { mm.revert(); ctx.revert(); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}

const DESKTOP = '(min-width: 901px)';
const MOBILE = '(max-width: 900px)';

/** Animates a number inside `el` between two values as the timeline plays. */
const counter = (el: Element | null, from: number, to: number, duration = 1, fmt: (n: number) => string = n => Math.round(n).toLocaleString('en-US')) => {
  const o = { v: from };
  return gsap.to(o, { v: to, duration, ease: 'none', onUpdate: () => { if (el) el.textContent = fmt(o.v); } });
};

/* =====================================================================
   Device frames
   ===================================================================== */
function Phone({ className = '', children, android = false }: { className?: string; children: ReactNode; android?: boolean }) {
  return (
    <div className={`ph ${android ? 'ph--android' : ''} ${className}`}>
      <div className="ph__island" />
      <div className="ph__screen">{children}</div>
    </div>
  );
}

function AppHome() {
  return (
    <div className="app app--home">
      <div className="app__status"><span>9:41</span><span>●●● ▮</span></div>
      <p className="app__hi">Good morning 👋</p>
      <div className="app__balance"><span>Total balance</span><b>$12,480</b><em>+4.2% this week</em></div>
      <div className="app__quick">{['Send', 'Pay', 'Save', 'More'].map(t => <span key={t}><i />{t}</span>)}</div>
      <div className="app__list">
        {['Grocery store', 'Salary', 'Coffee'].map((t, i) => (
          <div key={t}><i style={{ background: ['#FFD9A8', '#BDF0DC', '#E3D9FF'][i] }} /><span>{t}</span><b>{['-$42', '+$3,200', '-$4'][i]}</b></div>
        ))}
      </div>
      <div className="app__tabs"><i className="is-on" /><i /><i /><i /></div>
    </div>
  );
}
function AppShop() {
  return (
    <div className="app app--shop">
      <div className="app__status"><span>9:41</span><span>●●● ▮</span></div>
      <p className="app__title">New arrivals</p>
      <div className="app__grid">
        {['👟', '⌚', '🎧', '👜'].map((e, i) => (
          <div key={e} style={{ background: ['#F1EDE4', '#E4F2EC', '#ECE9F7', '#F7ECE6'][i] }}><span>{e}</span><b>${[89, 149, 59, 120][i]}</b></div>
        ))}
      </div>
      <div className="app__cta">Add to cart</div>
      <div className="app__tabs"><i /><i className="is-on" /><i /><i /></div>
    </div>
  );
}
function AppTrack() {
  return (
    <div className="app app--track">
      <div className="app__status"><span>9:41</span><span>●●● ▮</span></div>
      <p className="app__title">Your order</p>
      <div className="app__map">
        <svg viewBox="0 0 200 120" preserveAspectRatio="none"><path d="M10 100 C 50 20, 90 110, 130 50 S 180 30, 190 15" /></svg>
        <i className="app__pin" />
      </div>
      <ol className="app__steps">{['Ordered', 'Packed', 'On the way', 'Delivered'].map((s, i) => <li key={s} className={i < 3 ? 'is-done' : ''}>{s}</li>)}</ol>
      <div className="app__tabs"><i /><i /><i className="is-on" /><i /></div>
    </div>
  );
}
function AppChat() {
  return (
    <div className="app app--chat">
      <div className="app__status"><span>9:41</span><span>▮</span></div>
      <p className="app__title">Support</p>
      <div className="app__bubbles"><span>Hi! Where is my order?</span><span className="me">It arrives today 🚚</span><span>Amazing, thanks!</span><span className="me">Anytime 💚</span></div>
    </div>
  );
}
function AppStats() {
  return (
    <div className="app app--stats">
      <div className="app__status"><span>9:41</span><span>▮</span></div>
      <p className="app__title">Analytics</p>
      <div className="app__bars">{[40, 64, 52, 80, 70, 96].map((h, i) => <i key={i} style={{ height: `${h}%` }} />)}</div>
      <div className="app__kpi"><span>Active users</span><b>8,240</b></div>
    </div>
  );
}

/* =====================================================================
   HERO VISUALS (looping, no scroll needed)
   ===================================================================== */
export function HeroVisual({ variant, from }: { variant: Variant; from: string }) {
  switch (variant) {
    case 'website':
      return (
        <div className="hv hv-web" aria-hidden="true">
          <div className="hv-web__win">
            <div className="hv-web__bar"><i /><i /><i /><span>yourbrand.com</span></div>
            <div className="hv-web__body">
              <b className="sk sk--h" /><b className="sk sk--h2" /><b className="sk sk--p" /><b className="sk sk--p" style={{ width: '60%' }} />
              <div className="hv-web__btns"><b className="sk sk--btn" /><b className="sk sk--btn2" /></div>
              <div className="hv-web__cards"><b /><b /><b /></div>
            </div>
          </div>
          <div className="hv-badge hv-badge--speed"><svg viewBox="0 0 36 36"><circle cx="18" cy="18" r="15" /><circle className="hv-ring" cx="18" cy="18" r="15" /></svg><b>98</b><span>Performance</span></div>
          <div className="hv-chip hv-chip--a">⚡ Loads in 0.8s</div>
          <div className="hv-chip hv-chip--b">✓ SEO-ready</div>
          <div className="hv-price">From <b>{from}</b></div>
        </div>
      );
    case 'mobile':
      return (
        <div className="hv hv-mobile" aria-hidden="true">
          <Phone className="hv-mobile__phone"><div className="hv-cycle"><AppHome /><AppShop /><AppTrack /></div></Phone>
          <div className="hv-toast hv-toast--a"><i>🔔</i><span><b>New order</b>2 items · $148</span></div>
          <div className="hv-toast hv-toast--b"><i>⭐</i><span><b>4.9 rating</b>App Store</span></div>
          <div className="hv-price">From <b>{from}</b></div>
        </div>
      );
    case 'brand':
      return (
        <div className="hv hv-brand" aria-hidden="true">
          <div className="hv-brand__mark">
            <i className="bm bm-stem" /><i className="bm bm-dot" /><i className="bm bm-ring" /><i className="bm bm-stem2" />
          </div>
          <div className="hv-brand__swatches">{['#0E0E10', '#0E7C5A', '#5FD3A8', '#F4F3EE', '#E8DCC8'].map(c => <i key={c} style={{ background: c }} />)}</div>
          <div className="hv-brand__type"><b>Aa</b><span>Inter Tight · Instrument Serif</span></div>
          <div className="hv-price">From <b>{from}</b></div>
        </div>
      );
    case 'marketing':
      return (
        <div className="hv hv-mkt" aria-hidden="true">
          <div className="hv-mkt__card">
            <div className="hv-mkt__top"><span>Leads this month</span><em>Live</em></div>
            <b className="hv-mkt__num">184</b>
            <svg className="hv-mkt__chart" viewBox="0 0 300 100" preserveAspectRatio="none">
              <path className="hv-mkt__area" d="M0 90 L40 80 L80 84 L120 60 L160 64 L200 40 L240 34 L300 10 L300 100 L0 100Z" />
              <path className="hv-mkt__line" d="M0 90 L40 80 L80 84 L120 60 L160 64 L200 40 L240 34 L300 10" />
            </svg>
            <div className="hv-mkt__chips"><span>Google Ads</span><span>Meta</span><span>SEO</span></div>
          </div>
          <div className="hv-chip hv-chip--a">↓ Cost per lead</div>
          <div className="hv-chip hv-chip--b">↑ ROAS</div>
          <div className="hv-price">From <b>{from}</b></div>
          <small className="hv-note">Illustrative dashboard</small>
        </div>
      );
    case 'store':
      return (
        <div className="hv hv-store" aria-hidden="true">
          <div className="hv-store__card">
            <div className="hv-store__img">👟</div>
            <b>Runner Pro</b><span>$89.00</span>
            <div className="hv-store__btn">Add to cart</div>
          </div>
          <div className="hv-store__cart"><span>🛒</span><i>3</i></div>
          <div className="hv-toast hv-toast--a"><i>💸</i><span><b>New order</b>$148.00</span></div>
          <div className="hv-toast hv-toast--b"><i>↩</i><span><b>Cart recovered</b>$89.00</span></div>
          <div className="hv-price">From <b>{from}</b></div>
        </div>
      );
  }
}

/* =====================================================================
   SCROLL SHOWCASES
   ===================================================================== */
function LaptopShowcase() {
  const ref = useRef<HTMLElement>(null);
  useScene(ref, (mm, el) => {
    const page = el.querySelector<HTMLElement>('.lt-page')!;
    const screen = el.querySelector<HTMLElement>('.lt-screen')!;
    const dist = () => Math.max(0, page.scrollHeight - screen.clientHeight);
    mm.add(DESKTOP, () => {
      gsap.timeline({ scrollTrigger: { trigger: el, start: 'top top', end: '+=240%', scrub: 1, pin: '.sc-pin', invalidateOnRefresh: true } })
        .fromTo('.lt-lid', { rotateX: -88 }, { rotateX: 0, duration: 1, ease: 'power2.out' })
        .fromTo('.lt-glow', { opacity: 0 }, { opacity: 1, duration: .5 }, .6)
        .to(page, { y: () => -dist(), duration: 2.4, ease: 'none' }, 1)
        .fromTo('.lt-callout', { opacity: 0, x: 40 }, { opacity: 1, x: 0, stagger: .6, duration: .4 }, 1.1)
        .fromTo('.lt-cursor', { left: '82%', top: '86%', opacity: 0 }, { left: '50%', top: '72%', opacity: 1, duration: .5 }, 3.3)
        .to('.lt-cursor', { scale: .78, duration: .12, yoyo: true, repeat: 1 }, 3.85)
        .fromTo('.lt-final', { boxShadow: '0 0 0 0 rgba(14,124,90,0)' }, { boxShadow: '0 0 0 10px rgba(14,124,90,.25)', duration: .3 }, 3.9);
    });
    mm.add(MOBILE, () => {
      gsap.fromTo('.lt-lid', { rotateX: -80 }, { rotateX: 0, duration: 1.4, ease: 'expo.out', scrollTrigger: { trigger: el, start: 'top 75%' } });
      gsap.to(page, { y: () => -dist(), duration: 9, ease: 'sine.inOut', repeat: -1, yoyo: true, delay: 1 });
      gsap.fromTo('.lt-callout', { opacity: 0, y: 20 }, { opacity: 1, y: 0, stagger: .15, scrollTrigger: { trigger: '.lt-callouts', start: 'top 85%' } });
    });
  });

  return (
    <section ref={ref} className="sc sc-laptop" aria-label="Website build preview">
      <div className="sc-pin">
        <div className="sc-copy">
          <p className="mono">Scroll to open</p>
          <h2>Watch your new website <em className="serif">come alive.</em></h2>
        </div>
        <div className="lt-stage">
          <div className="laptop">
            <div className="lt-lid">
              <div className="lt-screen">
                <div className="lt-page">
                  <div className="lt-nav"><i className="lt-logo" /><span /><span /><span /><b /></div>
                  <div className="lt-hero">
                    <p>Your business,<br /><em>beautifully online.</em></p>
                    <span className="lt-line" /><span className="lt-line lt-line--s" />
                    <div className="lt-btns"><b /><b className="ghost" /></div>
                  </div>
                  <div className="lt-img" />
                  <div className="lt-logos">{[1, 2, 3, 4, 5].map(i => <i key={i} />)}</div>
                  <div className="lt-cards">{['Fast', 'Secure', 'Ranks'].map(t => <div key={t}><i /><b>{t}</b><span /><span /></div>)}</div>
                  <div className="lt-stats">{['98', '0.8s', '24/7'].map(t => <div key={t}><b>{t}</b><span /></div>)}</div>
                  <div className="lt-split"><div className="lt-img lt-img--s" /><div><span className="lt-line" /><span className="lt-line" /><span className="lt-line lt-line--s" /></div></div>
                  <div className="lt-cta"><p>Ready to launch?</p><b className="lt-final">Get started</b></div>
                  <div className="lt-foot"><span /><span /><span /></div>
                </div>
                <i className="lt-cursor" />
              </div>
              <i className="lt-glow" />
            </div>
            <div className="lt-base"><i /></div>
          </div>
        </div>
        <ul className="lt-callouts">
          <li className="lt-callout"><b>⚡ 0.8s load</b><span>Performance budget agreed upfront</span></li>
          <li className="lt-callout"><b>🔍 SEO built in</b><span>Schema, sitemap & Core Web Vitals</span></li>
          <li className="lt-callout"><b>✏️ Edit it yourself</b><span>Simple CMS + training video</span></li>
        </ul>
      </div>
    </section>
  );
}

function PhoneShowcase() {
  const ref = useRef<HTMLElement>(null);
  useScene(ref, (mm) => {
    mm.add(DESKTOP, () => {
      gsap.timeline({ scrollTrigger: { trigger: '.sc-pin', start: 'top top', end: '+=260%', scrub: 1, pin: true } })
        .fromTo('.pp-main', { rotateY: -24, rotateX: 8, y: 60 }, { rotateY: 0, rotateX: 0, y: 0, duration: 1 })
        .to('.pp-main .pp-s2', { yPercent: -100, duration: .8 }, 1)
        .to('.pp-main .pp-s3', { yPercent: -100, duration: .8 }, 2)
        .fromTo('.pp-left', { x: 0, opacity: 0, rotateY: 0, scale: .9 }, { x: -260, opacity: 1, rotateY: 22, scale: .9, duration: 1 }, 2.6)
        .fromTo('.pp-right', { x: 0, opacity: 0, rotateY: 0, scale: .9 }, { x: 260, opacity: 1, rotateY: -22, scale: .9, duration: 1 }, 2.6)
        .fromTo('.pp-toast', { opacity: 0, y: 20, scale: .9 }, { opacity: 1, y: 0, scale: 1, stagger: .35, duration: .4 }, 1.2)
        .to('.pp-step-1', { opacity: .25, duration: .2 }, 1)
        .fromTo('.pp-step-2', { opacity: .25 }, { opacity: 1, duration: .2 }, 1)
        .to('.pp-step-2', { opacity: .25, duration: .2 }, 2.6)
        .fromTo('.pp-step-3', { opacity: .25 }, { opacity: 1, duration: .2 }, 2.6);
    });
    mm.add(MOBILE, () => {
      gsap.timeline({ repeat: -1, repeatDelay: 1.2, defaults: { duration: .7, ease: 'power3.inOut' } })
        .to('.pp-main .pp-s2', { yPercent: -100 }, 1.5)
        .to('.pp-main .pp-s3', { yPercent: -100 }, 3.5)
        .to(['.pp-main .pp-s2', '.pp-main .pp-s3'], { yPercent: 0 }, 5.5);
      gsap.fromTo('.pp-toast', { opacity: 0, y: 16 }, { opacity: 1, y: 0, stagger: .2, scrollTrigger: { trigger: '.pp-stage', start: 'top 70%' } });
    });
  });

  return (
    <section ref={ref} className="sc sc-phone" aria-label="App preview">
      <div className="sc-pin">
        <div className="sc-copy">
          <p className="mono">One codebase · every device</p>
          <h2>Built once. <em className="serif">Loved everywhere.</em></h2>
          <ol className="pp-steps">
            <li className="pp-step-1"><b>01</b>Design that feels native on iOS and Android</li>
            <li className="pp-step-2"><b>02</b>Payments, push and real-time features</li>
            <li className="pp-step-3"><b>03</b>Live on the App Store and Google Play</li>
          </ol>
        </div>
        <div className="pp-stage">
          <Phone className="pp-left" android><AppChat /></Phone>
          <Phone className="pp-right" android><AppStats /></Phone>
          <Phone className="pp-main">
            <div className="pp-s1"><AppHome /></div>
            <div className="pp-s2"><AppShop /></div>
            <div className="pp-s3"><AppTrack /></div>
          </Phone>
          <div className="pp-toast pp-toast--1"><i>🔔</i><span><b>Push notification</b>Your order has shipped</span></div>
          <div className="pp-toast pp-toast--2"><i>💳</i><span><b>Payment received</b>Apple Pay · $148</span></div>
          <div className="pp-toast pp-toast--3"><i>⭐</i><span><b>New 5-star review</b>“Smoothest app I use”</span></div>
        </div>
      </div>
    </section>
  );
}

function BrandShowcase() {
  const ref = useRef<HTMLElement>(null);
  useScene(ref, (mm) => {
    const build = (tl: gsap.core.Timeline) => tl
      .fromTo('.bs-stem', { x: -160, y: 120, rotate: -60, opacity: 0 }, { x: 0, y: 0, rotate: 0, opacity: 1, duration: 1 })
      .fromTo('.bs-dot', { x: -120, y: -140, scale: 3, opacity: 0 }, { x: 0, y: 0, scale: 1, opacity: 1, duration: 1 }, 0)
      .fromTo('.bs-ring', { x: 180, y: -80, rotate: 180, scale: .4, opacity: 0 }, { x: 0, y: 0, rotate: 0, scale: 1, opacity: 1, duration: 1 }, 0)
      .fromTo('.bs-stem2', { x: 200, y: 140, rotate: 70, opacity: 0 }, { x: 0, y: 0, rotate: 0, opacity: 1, duration: 1 }, 0)
      .fromTo('.bs-word', { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: .5 }, .9)
      .fromTo('.bs-swatch', { rotate: 0, x: 0, opacity: 0 }, { rotate: i => (i - 2) * 14, x: i => (i - 2) * Math.min(70, window.innerWidth * .16), opacity: 1, stagger: .06, duration: .8 }, 1.4)
      .fromTo('.bs-mock', { x: 0, y: 0, rotate: 0, opacity: 0, scale: .8 }, {
        x: i => (i - 1) * Math.min(230, window.innerWidth * .3), y: i => [30, -10, 30][i], rotate: i => [-8, 0, 8][i], opacity: 1, scale: 1, stagger: .12, duration: .9,
      }, 2.3)
      .to('.bs-step', { opacity: .25, duration: .1 }, 0)
      .to('.bs-step-1', { opacity: 1, duration: .1 }, 0)
      .to('.bs-step-1', { opacity: .25, duration: .1 }, 1.3)
      .to('.bs-step-2', { opacity: 1, duration: .1 }, 1.3)
      .to('.bs-step-2', { opacity: .25, duration: .1 }, 2.2)
      .to('.bs-step-3', { opacity: 1, duration: .1 }, 2.2);
    mm.add(DESKTOP, () => { build(gsap.timeline({ scrollTrigger: { trigger: '.sc-pin', start: 'top top', end: '+=230%', scrub: 1, pin: true, invalidateOnRefresh: true } })); });
    mm.add(MOBILE, () => { build(gsap.timeline({ scrollTrigger: { trigger: '.bs-stage', start: 'top 70%' }, defaults: { ease: 'expo.out' } })); });
  });

  return (
    <section ref={ref} className="sc sc-brand" aria-label="Brand identity preview">
      <div className="sc-pin">
        <div className="sc-copy">
          <p className="mono">From scattered to unforgettable</p>
          <h2>Watch a brand <em className="serif">take shape.</em></h2>
          <ol className="bs-steps">
            <li className="bs-step bs-step-1"><b>01</b>A mark built from your story</li>
            <li className="bs-step bs-step-2"><b>02</b>A palette and type system that is yours</li>
            <li className="bs-step bs-step-3"><b>03</b>Applied everywhere your customers look</li>
          </ol>
        </div>
        <div className="bs-stage">
          <div className="bs-logo">
            <div className="bs-mark"><i className="bs-stem" /><i className="bs-dot" /><i className="bs-ring" /><i className="bs-stem2" /></div>
            <b className="bs-word">yourbrand</b>
          </div>
          <div className="bs-swatches">
            {[['#0E0E10', 'Ink'], ['#0E7C5A', 'Signal'], ['#5FD3A8', 'Mint'], ['#E8DCC8', 'Sand'], ['#F4F3EE', 'Paper']].map(([c, n]) => (
              <div key={c} className="bs-swatch" style={{ background: c, color: ['#F4F3EE', '#E8DCC8', '#5FD3A8'].includes(c) ? '#0E0E10' : '#fff' }}><span>{n}</span><em>{c}</em></div>
            ))}
          </div>
          <div className="bs-mocks">
            <div className="bs-mock bs-card"><i className="bs-mini" /><b>Your Name</b><span>Founder</span></div>
            <div className="bs-mock bs-post"><i className="bs-mini" /><b>New collection</b><span>Shop now →</span></div>
            <div className="bs-mock bs-bag"><i className="bs-mini" /><b>yourbrand</b></div>
          </div>
        </div>
      </div>
    </section>
  );
}

function DashboardShowcase() {
  const ref = useRef<HTMLElement>(null);
  useScene(ref, (mm, el) => {
    const q = (s: string) => el.querySelector(s);
    const build = (tl: gsap.core.Timeline) => {
      tl.add(counter(q('.db-leads'), 0, 184), 0)
        .add(counter(q('.db-cpl'), 42, 18, 1, n => `$${n.toFixed(0)}`), 0)
        .add(counter(q('.db-roas'), 1.2, 4.6, 1, n => `${n.toFixed(1)}x`), 0)
        .add(counter(q('.db-organic'), 0, 12400), 0)
        .fromTo('.db-line', { strokeDashoffset: 1000 }, { strokeDashoffset: 0, duration: 1, ease: 'none' }, 0)
        .fromTo('.db-area', { opacity: 0 }, { opacity: 1, duration: .8, ease: 'none' }, .2)
        .fromTo('.db-funnel i', { scaleX: 0 }, { scaleX: 1, stagger: .08, duration: .7, ease: 'power2.out' }, .1)
        .fromTo('.db-chan i', { scaleX: 0 }, { scaleX: 1, stagger: .08, duration: .7, ease: 'power2.out' }, .2)
        .fromTo('.db-tile', { y: 30, opacity: 0 }, { y: 0, opacity: 1, stagger: .05, duration: .3 }, 0);
      return tl;
    };
    mm.add(DESKTOP, () => { build(gsap.timeline({ scrollTrigger: { trigger: '.sc-pin', start: 'top top', end: '+=160%', scrub: 1, pin: true } })); });
    mm.add(MOBILE, () => { build(gsap.timeline({ scrollTrigger: { trigger: el, start: 'top 70%', end: 'bottom 70%', scrub: 1 } })); });
  });

  return (
    <section ref={ref} className="sc sc-dash" aria-label="Marketing dashboard preview">
      <div className="sc-pin">
        <div className="sc-copy">
          <p className="mono">Your live growth dashboard</p>
          <h2>Every channel. Every lead. <em className="serif">One screen.</em></h2>
          <p className="sc-sub">This is how your results look every week — leads up, cost per lead down, all in accounts you own.</p>
        </div>
        <div className="db">
          <div className="db-tile db-kpi"><span>Qualified leads</span><b className="db-leads">0</b><em>↑ this month</em></div>
          <div className="db-tile db-kpi"><span>Cost per lead</span><b className="db-cpl">$42</b><em className="good">↓ lower is better</em></div>
          <div className="db-tile db-kpi"><span>Return on ad spend</span><b className="db-roas">1.2x</b><em>↑ revenue per $1</em></div>
          <div className="db-tile db-kpi"><span>Organic visits</span><b className="db-organic">0</b><em>↑ from SEO</em></div>
          <div className="db-tile db-chart">
            <div className="db-head"><span>Leads over 90 days</span><em>Google · Meta · SEO</em></div>
            <svg viewBox="0 0 600 200" preserveAspectRatio="none">
              {[40, 90, 140].map(y => <line key={y} x1="0" x2="600" y1={y} y2={y} className="db-grid" />)}
              <path className="db-area" d="M0 180 L60 170 L120 172 L180 150 L240 140 L300 120 L360 110 L420 84 L480 70 L540 46 L600 24 L600 200 L0 200Z" />
              <path className="db-line" pathLength={1000} d="M0 180 L60 170 L120 172 L180 150 L240 140 L300 120 L360 110 L420 84 L480 70 L540 46 L600 24" />
            </svg>
          </div>
          <div className="db-tile db-funnel">
            <div className="db-head"><span>Funnel</span></div>
            {[['Visitors', 100], ['Engaged', 62], ['Leads', 28], ['Customers', 11]].map(([t, w]) => (
              <div key={t as string}><span>{t}</span><i style={{ width: `${w}%` }} /></div>
            ))}
          </div>
          <div className="db-tile db-chan">
            <div className="db-head"><span>Leads by channel</span></div>
            {[['Google Ads', 82], ['Meta Ads', 64], ['SEO', 48], ['Email', 30]].map(([t, w]) => (
              <div key={t as string}><span>{t}</span><i style={{ width: `${w}%` }} /></div>
            ))}
          </div>
          <small className="db-note">Illustrative example — your dashboard shows your real numbers.</small>
        </div>
      </div>
    </section>
  );
}

function StoreShowcase() {
  const ref = useRef<HTMLElement>(null);
  useScene(ref, (mm, el) => {
    const cart = el.querySelector<HTMLElement>('.st-cart__icon')!;
    const chips = gsap.utils.toArray<HTMLElement>('.st-fly', el);
    const offset = (chip: HTMLElement, axis: 'x' | 'y') => () => {
      const a = chip.getBoundingClientRect(), b = cart.getBoundingClientRect();
      const nowX = Number(gsap.getProperty(chip, 'x')), nowY = Number(gsap.getProperty(chip, 'y'));
      return axis === 'x' ? b.left + b.width / 2 - (a.left - nowX + a.width / 2) : b.top + b.height / 2 - (a.top - nowY + a.height / 2);
    };
    const build = (tl: gsap.core.Timeline) => {
      chips.forEach((chip, i) => {
        tl.fromTo(chip, { x: 0, y: 0, scale: 1, opacity: 1 }, { x: offset(chip, 'x'), y: offset(chip, 'y'), scale: .25, opacity: 0, duration: .8, ease: 'power2.in' }, i * .7)
          .fromTo(`.st-order-${i}`, { opacity: 0, x: 30 }, { opacity: 1, x: 0, duration: .3 }, i * .7 + .75)
          .fromTo('.st-cart__icon', { scale: 1 }, { scale: 1.2, duration: .1, yoyo: true, repeat: 1 }, i * .7 + .75);
      });
      const span = chips.length * .7 + .2;
      tl.add(counter(el.querySelector('.st-count'), 0, chips.length, span), 0)
        .add(counter(el.querySelector('.st-rev'), 0, 417, span, n => `$${n.toFixed(0)}`), 0)
        .fromTo('.st-toast', { opacity: 0, y: 20 }, { opacity: 1, y: 0, stagger: .5, duration: .3 }, 1.2);
      return tl;
    };
    mm.add(DESKTOP, () => { build(gsap.timeline({ scrollTrigger: { trigger: '.sc-pin', start: 'top top', end: '+=220%', scrub: 1, pin: true, invalidateOnRefresh: true } })); });
    mm.add(MOBILE, () => { build(gsap.timeline({ scrollTrigger: { trigger: el, start: 'top 60%', end: 'bottom 80%', scrub: 1, invalidateOnRefresh: true } })); });
  });

  const products = [
    { e: '👟', n: 'Runner Pro', p: 89, c: '#F1EDE4' },
    { e: '⌚', n: 'Smart Watch', p: 149, c: '#E4F2EC' },
    { e: '🎧', n: 'Studio Buds', p: 59, c: '#ECE9F7' },
    { e: '👜', n: 'City Tote', p: 120, c: '#F7ECE6' },
  ];
  return (
    <section ref={ref} className="sc sc-store" aria-label="Store growth preview">
      <div className="sc-pin">
        <div className="sc-copy">
          <p className="mono">Traffic → cart → checkout → repeat</p>
          <h2>Turn browsers into <em className="serif">buyers.</em></h2>
          <p className="sc-sub">Shopping ads bring the right shoppers, a faster store converts them, and automated flows bring them back.</p>
        </div>
        <div className="st">
          <div className="st-grid">
            {products.map(p => (
              <div key={p.n} className="st-prod">
                <div className="st-prod__img" style={{ background: p.c }}><span>{p.e}</span><i className="st-fly" style={{ background: p.c }}>{p.e}</i></div>
                <b>{p.n}</b><span>${p.p}.00</span>
                <em>Add to cart</em>
              </div>
            ))}
          </div>
          <aside className="st-cart">
            <div className="st-cart__head"><div className="st-cart__icon">🛒<i className="st-count">0</i></div><div><span>Revenue today</span><b className="st-rev">$0</b></div></div>
            <ul>{products.map((p, i) => <li key={p.n} className={`st-order-${i}`}><i style={{ background: p.c }}>{p.e}</i><span>{p.n}</span><b>${p.p}</b></li>)}</ul>
            <div className="st-toast"><i>↩</i><span><b>Abandoned cart recovered</b>via email flow</span></div>
            <div className="st-toast"><i>💚</i><span><b>Repeat customer</b>2nd order this month</span></div>
          </aside>
        </div>
        <small className="db-note st-note">Illustrative example of the flows we set up.</small>
      </div>
    </section>
  );
}

export function Showcase({ variant }: { variant: Variant }) {
  switch (variant) {
    case 'website': return <LaptopShowcase />;
    case 'mobile': return <PhoneShowcase />;
    case 'brand': return <BrandShowcase />;
    case 'marketing': return <DashboardShowcase />;
    case 'store': return <StoreShowcase />;
  }
}
