import { ImageResponse } from 'next/og';
import { formatUSD } from '@/lib/knowledge';
import { landingBySlug, landings } from '@/lib/landings';
import { site } from '@/lib/site';

export const alt = `${site.name} landing page`;
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export function generateStaticParams() {
  return landings.map(l => ({ slug: l.slug }));
}

const INK = '#0E0E10';
const ACCENT = '#0E7C5A';

/** Per-page social card: the page's own headline and starting price. */
export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const l = landingBySlug((await params).slug)!;
  const from = Math.min(...l.packages.map(p => p.price));
  const k = 0.8;
  return new ImageResponse(
    (
      <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: 72, background: '#F4F3EE', color: INK, fontFamily: 'sans-serif' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <div style={{ position: 'relative', width: 80 * k, height: 80 * k, display: 'flex' }}>
              <div style={{ position: 'absolute', left: 6 * k, top: 30 * k, width: 12 * k, height: 44 * k, borderRadius: 6 * k, background: INK }} />
              <div style={{ position: 'absolute', left: 4 * k, top: 5 * k, width: 16 * k, height: 16 * k, borderRadius: 99, background: ACCENT }} />
              <div style={{ position: 'absolute', left: 24 * k, top: 30 * k, width: 44 * k, height: 44 * k, borderRadius: 99, border: `${12 * k}px solid ${INK}` }} />
              <div style={{ position: 'absolute', left: 62 * k, top: 30 * k, width: 12 * k, height: 44 * k, borderRadius: 6 * k, background: INK }} />
            </div>
            <div style={{ display: 'flex', fontSize: 32, fontWeight: 700 }}>ilyana<span style={{ color: '#6B6B68', fontWeight: 400, marginLeft: 6 }}>digital</span></div>
          </div>
          <div style={{ display: 'flex', fontSize: 22, color: ACCENT, textTransform: 'uppercase', letterSpacing: 2 }}>{l.eyebrow}</div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', fontSize: 72, fontWeight: 700, lineHeight: 1.04, letterSpacing: -3 }}>
          <span>{l.h1}</span>
          <span style={{ color: ACCENT }}>{l.h1Accent}</span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '2px solid #DEDCD4', paddingTop: 26, fontSize: 26, color: '#6B6B68' }}>
          <span>{l.proof.slice(1).join(' · ')}</span>
          <span style={{ display: 'flex', padding: '12px 26px', borderRadius: 99, background: ACCENT, color: '#fff', fontWeight: 700 }}>From {formatUSD(from)}{l.packages[0].unit ?? ''}</span>
        </div>
      </div>
    ),
    size,
  );
}
