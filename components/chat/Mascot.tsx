'use client';

import { useEffect, useRef } from 'react';

/**
 * "Ila" — the chat mascot. Floats, waves, blinks, and its eyes follow the pointer.
 * `talking` animates the mouth while the bot is typing.
 */
export function Mascot({ size = 96, talking = false, wave = true }: { size?: number; talking?: boolean; wave?: boolean }) {
  const eyes = useRef<SVGGElement>(null);
  const root = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!window.matchMedia('(hover: hover)').matches) return;
    let raf = 0;
    const onMove = (e: PointerEvent) => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const r = root.current?.getBoundingClientRect();
        if (!r || !eyes.current) return;
        const dx = e.clientX - (r.left + r.width / 2);
        const dy = e.clientY - (r.top + r.height * 0.4);
        const d = Math.hypot(dx, dy) || 1;
        const k = Math.min(1, d / 300) * 3.2;
        eyes.current.style.transform = `translate(${(dx / d) * k}px, ${(dy / d) * k}px)`;
      });
    };
    window.addEventListener('pointermove', onMove);
    return () => { cancelAnimationFrame(raf); window.removeEventListener('pointermove', onMove); };
  }, []);

  return (
    <svg
      ref={root}
      className={`mascot${talking ? ' is-talking' : ''}${wave ? ' is-waving' : ''}`}
      width={size}
      height={size * 1.12}
      viewBox="0 0 120 134"
      fill="none"
      aria-hidden="true"
    >
      <ellipse className="m-shadow" cx="60" cy="128" rx="26" ry="4" />
      <g className="m-float">
        {/* antenna — the "i" dot of the logo */}
        <path d="M60 24V12" stroke="var(--ink)" strokeWidth="3" strokeLinecap="round" />
        <circle className="m-antenna" cx="60" cy="9" r="6" fill="var(--accent)" />

        {/* left arm (resting) */}
        <rect x="24" y="90" width="11" height="26" rx="5.5" fill="#fff" stroke="var(--ink)" strokeWidth="2.5" transform="rotate(18 30 92)" />

        {/* right arm (waving) */}
        <g className="m-arm">
          <rect x="85" y="70" width="11" height="28" rx="5.5" fill="#fff" stroke="var(--ink)" strokeWidth="2.5" />
          <circle cx="90.5" cy="66" r="8" fill="#fff" stroke="var(--ink)" strokeWidth="2.5" />
        </g>

        {/* body */}
        <rect x="35" y="86" width="50" height="36" rx="16" fill="#fff" stroke="var(--ink)" strokeWidth="2.5" />
        <circle className="m-core" cx="60" cy="104" r="5" fill="var(--accent)" />

        {/* head */}
        <rect x="18" y="22" width="84" height="64" rx="30" fill="#fff" stroke="var(--ink)" strokeWidth="2.5" />
        <rect x="28" y="35" width="64" height="38" rx="19" fill="var(--ink)" />
        <g ref={eyes} className="m-eyes">
          <ellipse className="m-eye" cx="47" cy="51" rx="5.5" ry="6.5" fill="#5FD3A8" />
          <ellipse className="m-eye" cx="73" cy="51" rx="5.5" ry="6.5" fill="#5FD3A8" />
        </g>
        <path className="m-mouth" d="M53 63q7 5 14 0" stroke="#5FD3A8" strokeWidth="3" strokeLinecap="round" />
        <circle cx="25" cy="62" r="4" fill="var(--accent)" opacity=".22" />
        <circle cx="95" cy="62" r="4" fill="var(--accent)" opacity=".22" />
      </g>
    </svg>
  );
}
