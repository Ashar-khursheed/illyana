'use client';

import { useEffect, useState } from 'react';
import { navLinks } from '@/lib/content';
import { LogoMark } from './Logo';
import { getLenis } from './Experience';

export function Nav() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const lenis = getLenis();
    if (open) lenis?.stop();
    else lenis?.start();
    document.documentElement.classList.toggle('menu-open', open);
  }, [open]);

  return (
    <>
      <header className="nav">
        <a href="#top" className="brand" aria-label="Ilyana Digital home">
          <LogoMark className="brand__mark" />
          <span className="brand__word">ilyana<em>digital</em></span>
        </a>
        <nav className="nav__links" aria-label="Primary">
          {navLinks.map(l => <a key={l.href} href={l.href}>{l.label}</a>)}
        </nav>
        <div className="nav__right">
          <span className="status mono"><i />Booking Q1 2027</span>
          <a href="#contact" className="btn btn--small" data-magnetic>Start a project</a>
          <button className="burger" aria-label={open ? 'Close menu' : 'Open menu'} aria-expanded={open} onClick={() => setOpen(o => !o)}>
            <span /><span />
          </button>
        </div>
      </header>

      <div className={`menu${open ? ' is-open' : ''}`} aria-hidden={!open}>
        <nav>
          {[...navLinks, { href: '#contact', label: 'Contact' }].map(l => (
            <a key={l.href} href={l.href} onClick={() => setOpen(false)}>{l.label}</a>
          ))}
        </nav>
      </div>
    </>
  );
}
