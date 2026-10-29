import { ImageResponse } from 'next/og';
import { site } from '@/lib/site';

export const alt = `${site.name} — web, app & AI development studio`;
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

const INK = '#0E0E10';
const ACCENT = '#0E7C5A';

/** Social preview card (Open Graph + Twitter), rendered at build time. */
export default function OpenGraphImage() {
  const k = 1.1; // logo mark scale (mark is drawn on an 80×80 grid)
  return new ImageResponse(
    (
      <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: 72, background: '#F4F3EE', color: INK, fontFamily: 'sans-serif' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
          <div style={{ position: 'relative', width: 80 * k, height: 80 * k, display: 'flex' }}>
            <div style={{ position: 'absolute', left: 6 * k, top: 30 * k, width: 12 * k, height: 44 * k, borderRadius: 6 * k, background: INK }} />
            <div style={{ position: 'absolute', left: 4 * k, top: 5 * k, width: 16 * k, height: 16 * k, borderRadius: 99, background: ACCENT }} />
            <div style={{ position: 'absolute', left: 24 * k, top: 30 * k, width: 44 * k, height: 44 * k, borderRadius: 99, border: `${12 * k}px solid ${INK}` }} />
            <div style={{ position: 'absolute', left: 62 * k, top: 30 * k, width: 12 * k, height: 44 * k, borderRadius: 6 * k, background: INK }} />
          </div>
          <div style={{ display: 'flex', fontSize: 40, fontWeight: 700, letterSpacing: -1.5 }}>
            ilyana<span style={{ color: '#6B6B68', fontWeight: 400, marginLeft: 8 }}>digital</span>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', fontSize: 84, fontWeight: 700, lineHeight: 1, letterSpacing: -4 }}>
          <span>We engineer digital products</span>
          <span style={{ color: ACCENT }}>for the next decade.</span>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '2px solid #DEDCD4', paddingTop: 28, fontSize: 26, color: '#6B6B68' }}>
          <span>Web · Mobile apps · AI · Brand · Growth</span>
          <span style={{ display: 'flex', padding: '12px 26px', borderRadius: 99, background: ACCENT, color: '#fff', fontWeight: 700 }}>Fixed price · 100% code ownership</span>
        </div>
      </div>
    ),
    size,
  );
}
