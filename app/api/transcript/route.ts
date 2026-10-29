import nodemailer from 'nodemailer';

// Emails each finished chat to the ilyana team over plain SMTP (free with e.g. a Gmail app password).
export const runtime = 'nodejs';

type Line = { from: 'bot' | 'user'; text: string; at: number };
type Payload = { messages: Line[]; visitor?: { name?: string; email?: string }; page?: string; reason?: string; sessionId?: string };

const MAX_MESSAGES = 200;
const MAX_TEXT = 2000;
const hits = new Map<string, number[]>();

function rateLimited(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter(t => now - t < 10 * 60_000);
  recent.push(now);
  hits.set(ip, recent);
  return recent.length > 12;
}

const esc = (s: string) => s.replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]!);
const clean = (s: unknown, max = MAX_TEXT) => String(s ?? '').slice(0, max);

function parse(raw: unknown): Payload | null {
  if (!raw || typeof raw !== 'object') return null;
  const p = raw as Record<string, unknown>;
  if (!Array.isArray(p.messages) || p.messages.length === 0) return null;
  const messages = p.messages.slice(0, MAX_MESSAGES).map((m: any) => ({
    from: m?.from === 'user' ? 'user' : 'bot',
    text: clean(m?.text).replace(/\*\*/g, ''),
    at: Number(m?.at) || Date.now(),
  })) as Line[];
  if (!messages.some(m => m.from === 'user')) return null;
  const v = (p.visitor ?? {}) as Record<string, unknown>;
  return {
    messages,
    visitor: { name: clean(v.name, 80), email: clean(v.email, 120) },
    page: clean(p.page, 300),
    reason: clean(p.reason, 40),
    sessionId: clean(p.sessionId, 64),
  };
}

function render(p: Payload) {
  const time = (t: number) => new Date(t).toUTCString().replace(' GMT', ' UTC');
  const who = p.visitor?.name || p.visitor?.email ? `${p.visitor?.name || 'Visitor'}${p.visitor?.email ? ` <${p.visitor.email}>` : ''}` : 'Anonymous visitor';
  const text = [
    `New website chat — ${who}`,
    `Ended: ${p.reason || 'chat ended'} · Page: ${p.page || '-'} · Session: ${p.sessionId || '-'}`,
    '',
    ...p.messages.map(m => `[${time(m.at)}] ${m.from === 'user' ? 'Visitor' : 'Ila (bot)'}: ${m.text}`),
  ].join('\n');

  const rows = p.messages.map(m => `
    <tr><td style="padding:10px 0;border-bottom:1px solid #eee;vertical-align:top;width:90px;color:${m.from === 'user' ? '#0E7C5A' : '#6B6B68'};font:600 12px/1.4 Arial">${m.from === 'user' ? 'Visitor' : 'Ila'}</td>
    <td style="padding:10px 0;border-bottom:1px solid #eee;font:14px/1.5 Arial;color:#0E0E10;white-space:pre-wrap">${esc(m.text)}<div style="color:#999;font-size:11px;margin-top:4px">${time(m.at)}</div></td></tr>`).join('');
  const html = `<div style="max-width:640px;margin:auto;font-family:Arial">
    <h2 style="font-weight:600;color:#0E0E10">New website chat</h2>
    <p style="color:#333;font-size:14px"><b>Visitor:</b> ${esc(who)}<br><b>Ended:</b> ${esc(p.reason || 'chat ended')}<br><b>Page:</b> ${esc(p.page || '-')}</p>
    <table style="width:100%;border-collapse:collapse">${rows}</table></div>`;
  return { text, html, who };
}

export async function POST(req: Request) {
  const ip = req.headers.get('x-forwarded-for')?.split(',')[0].trim() || 'local';
  if (rateLimited(ip)) return Response.json({ ok: false, error: 'rate_limited' }, { status: 429 });

  let payload: Payload | null = null;
  try {
    // sendBeacon posts text/plain, fetch posts JSON — both carry a JSON string.
    payload = parse(JSON.parse(await req.text()));
  } catch {
    /* fallthrough */
  }
  if (!payload) return Response.json({ ok: false, error: 'invalid' }, { status: 400 });

  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, TRANSCRIPT_TO, SMTP_FROM } = process.env;
  const { text, html, who } = render(payload);

  if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS || !TRANSCRIPT_TO) {
    console.warn('[transcript] SMTP not configured — transcript not emailed:\n' + text);
    return Response.json({ ok: false, error: 'not_configured' }, { status: 503 });
  }

  try {
    const port = Number(SMTP_PORT) || 465;
    const transport = nodemailer.createTransport({ host: SMTP_HOST, port, secure: port === 465, auth: { user: SMTP_USER, pass: SMTP_PASS } });
    await transport.sendMail({
      from: SMTP_FROM || `ilyana Website <${SMTP_USER}>`,
      to: TRANSCRIPT_TO,
      replyTo: payload.visitor?.email || undefined,
      subject: `Website chat — ${who}`,
      text,
      html,
    });
    return Response.json({ ok: true });
  } catch (err) {
    console.error('[transcript] send failed', err);
    return Response.json({ ok: false, error: 'send_failed' }, { status: 502 });
  }
}
