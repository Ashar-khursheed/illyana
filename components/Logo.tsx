/** "ia" monogram — the first and last letters of ilyana; the i's dot carries the accent. */
export function LogoMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 80 80" fill="none" className={className} aria-hidden="true">
      <rect className="lm-stem" x="6" y="30" width="12" height="44" rx="6" fill="currentColor" />
      <circle className="lm-dot" cx="12" cy="13" r="8" fill="var(--accent)" />
      <circle className="lm-arc" cx="46" cy="52" r="16" stroke="currentColor" strokeWidth="12" />
      <rect className="lm-node" x="62" y="30" width="12" height="44" rx="6" fill="currentColor" />
    </svg>
  );
}
