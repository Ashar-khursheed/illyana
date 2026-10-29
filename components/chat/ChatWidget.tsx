'use client';

import { FormEvent, Fragment, KeyboardEvent, ReactNode, useCallback, useEffect, useRef, useState } from 'react';
import { BOT_NAME, estimate, estimatorAddons, estimatorTypes, formatRange, formatUSD, priceById, pricing } from '@/lib/knowledge';
import { BotContext, BotReply, Card, CHIPS, reply, WELCOME } from '@/lib/bot';
import { services, stats, steps } from '@/lib/content';
import { Mascot } from './Mascot';

type Msg = { id: string; from: 'bot' | 'user'; text: string; card?: Card; chips?: string[]; at: number; fresh?: boolean };
type Saved = { messages: Msg[]; ctx: BotContext; sentCount: number; sessionId: string; ended: boolean; doneCards: string[] };

const STORE_KEY = 'ila-chat-v1';
const BUBBLE_LINES = ["Hi! I'm Ila 👋", 'Need a website or app?', 'Get a price in 3 taps ✨', 'Ask me anything!'];
const PLACEHOLDERS = ['Ask about pricing…', 'e.g. I need an online store', 'How long does an app take?', 'Type or tap the mic…'];
const SERVICE_TO_PRICE: Record<string, string> = {
  'Web Platforms': 'business', 'Mobile Apps': 'mobile', 'AI & Automation': 'ai',
  'Brand & Product Design': 'brand', 'Cloud & DevOps': 'cloud', 'Growth Engineering': 'growth',
};

let seq = 0;
const uid = () => `${Date.now().toString(36)}-${(seq++).toString(36)}`;
const newSession = () => Math.random().toString(36).slice(2, 10);

/* ---------------- tiny Markdown: **bold**, "- " bullets, line breaks ---------------- */
function inline(text: string): ReactNode[] {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((p, i) => (p.startsWith('**') && p.endsWith('**') ? <strong key={i}>{p.slice(2, -2)}</strong> : <Fragment key={i}>{p.replace(/\*\*/g, '')}</Fragment>));
}
function Rich({ text }: { text: string }) {
  const lines = text.split('\n');
  const out: ReactNode[] = [];
  let list: ReactNode[] = [];
  const flush = () => { if (list.length) { out.push(<ul key={`u${out.length}`}>{list}</ul>); list = []; } };
  lines.forEach((l, i) => {
    if (l.startsWith('- ')) list.push(<li key={i}>{inline(l.slice(2))}</li>);
    else { flush(); if (l.trim()) out.push(<p key={i}>{inline(l)}</p>); }
  });
  flush();
  return <>{out}</>;
}

/** Reveals a fresh bot message word by word, like it's being spoken. */
function Reveal({ text, onDone }: { text: string; onDone: () => void }) {
  const words = text.split(/(\s+)/);
  const [n, setN] = useState(0);
  useEffect(() => {
    if (n >= words.length) { onDone(); return; }
    const t = setTimeout(() => setN(v => Math.min(words.length, v + 2)), 22);
    return () => clearTimeout(t);
  }, [n, words.length, onDone]);
  return <Rich text={words.slice(0, n).join('')} />;
}

/* ---------------- Cards ---------------- */
function PriceCard({ id }: { id: string }) {
  const p = priceById(id);
  if (!p) return null;
  const max = Math.max(...pricing.filter(x => !!x.unit === !!p.unit).map(x => x.to));
  return (
    <div className="ila-card ila-price">
      <div className="ila-price__top"><span>{p.label}</span><em>{p.weeks}</em></div>
      <b>{formatRange(p)}</b>
      <div className="ila-bar"><i style={{ left: `${(p.from / max) * 100}%`, width: `${((p.to - p.from) / max) * 100}%` }} /></div>
      <p>{p.note}</p>
      <small>Starting range · exact fixed quote in 48h</small>
    </div>
  );
}

function ServicesCard({ onPick }: { onPick: (label: string) => void }) {
  return (
    <div className="ila-card ila-grid">
      {services.map((s, i) => {
        const p = priceById(SERVICE_TO_PRICE[s.title]);
        return (
          <button key={s.title} className="ila-tile" onClick={() => onPick(s.title)} style={{ animationDelay: `${i * 50}ms` }}>
            <span>{s.title}</span>
            {p && <em>from {formatUSD(p.from)}{p.unit ?? ''}</em>}
          </button>
        );
      })}
    </div>
  );
}

function GuaranteesCard() {
  return (
    <div className="ila-card">
      <div className="ila-stats">
        {stats.map(s => <div key={s.label}><b>{s.value}{s.unit}</b><span>{s.label}</span></div>)}
      </div>
      <ul className="ila-checks">
        {['Fixed scope, fixed price', 'Senior-only team, named in contract', 'Pay per milestone', 'NDA on day one', 'No lock-in — leave with everything'].map(t => <li key={t}>{t}</li>)}
      </ul>
    </div>
  );
}

function ProcessCard() {
  return (
    <ol className="ila-card ila-steps">
      {steps.map((s, i) => (
        <li key={s.title} style={{ animationDelay: `${i * 70}ms` }}>
          <i>{String(i + 1).padStart(2, '0')}</i>
          <div><b>{s.title}</b><span>{s.when.split('—')[1]?.trim()}</span></div>
        </li>
      ))}
    </ol>
  );
}

function EstimatorCard({ onResult, done }: { onResult: (summary: string, reply: BotReply) => void; done: boolean }) {
  const [type, setType] = useState<string>();
  const [addons, setAddons] = useState<string[]>([]);
  const toggle = (id: string) => setAddons(a => (a.includes(id) ? a.filter(x => x !== id) : [...a, id]));

  if (done) return null;
  if (!type) {
    return (
      <div className="ila-card">
        <p className="ila-card__q"><span>1/2</span> What are you building?</p>
        <div className="ila-opts">
          {estimatorTypes.map(t => <button key={t.id} className="ila-opt" onClick={() => setType(t.id)}>{t.label}</button>)}
        </div>
      </div>
    );
  }
  const est = estimate(type, addons);
  return (
    <div className="ila-card">
      <p className="ila-card__q"><span>2/2</span> Any extras? <button className="ila-link" onClick={() => setType(undefined)}>change type</button></p>
      <div className="ila-opts">
        {estimatorAddons.map(a => (
          <button key={a.id} className={`ila-opt${addons.includes(a.id) ? ' is-on' : ''}`} onClick={() => toggle(a.id)} aria-pressed={addons.includes(a.id)}>
            {a.label}
          </button>
        ))}
      </div>
      <div className="ila-live">
        <span>{est.base.label}{addons.length ? ` + ${addons.length} extra${addons.length > 1 ? 's' : ''}` : ''}</span>
        <b key={`${est.from}-${est.to}`}>{formatUSD(est.from)} – {formatUSD(est.to)}</b>
      </div>
      <button
        className="ila-cta"
        onClick={() => {
          const extras = addons.map(id => estimatorAddons.find(a => a.id === id)!.label);
          const summary = `Estimate: ${est.base.label}${extras.length ? ` + ${extras.join(', ')}` : ''}`;
          onResult(summary, {
            text: `Your ballpark for a **${est.base.label}**${extras.length ? ` with ${extras.join(', ')}` : ''}: **${formatUSD(est.from)} – ${formatUSD(est.to)}**, around ${est.base.weeks}.\nWant an exact fixed quote? Leave your email and a senior lead sends a written proposal within 48 hours.`,
            card: { type: 'lead' },
          });
        }}
      >
        Lock in this estimate →
      </button>
    </div>
  );
}

function LeadCard({ ctx, onSubmit, done }: { ctx: BotContext; onSubmit: (name: string, email: string) => void; done: boolean }) {
  const [name, setName] = useState(ctx.name ?? '');
  const [email, setEmail] = useState(ctx.email ?? '');
  const [bad, setBad] = useState(false);
  if (done) return null;
  const submit = (e: FormEvent) => {
    e.preventDefault();
    if (!/^\S+@\S+\.\S+$/.test(email)) { setBad(true); return; }
    onSubmit(name.trim(), email.trim());
  };
  return (
    <form className="ila-card ila-lead" onSubmit={submit}>
      <input value={name} onChange={e => setName(e.target.value)} placeholder="Your name" autoComplete="name" aria-label="Your name" />
      <input value={email} onChange={e => { setEmail(e.target.value); setBad(false); }} placeholder="Work email" type="email" autoComplete="email" aria-label="Work email" className={bad ? 'is-bad' : ''} />
      <button className="ila-cta" type="submit">Send to a senior lead →</button>
      <small>Reply within 4 business hours · NDA available</small>
    </form>
  );
}

/* ---------------- Widget ---------------- */
export function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Msg[]>([]);
  const [typing, setTyping] = useState(false);
  const [input, setInput] = useState('');
  const [bubble, setBubble] = useState(-1);
  const [bubbleText, setBubbleText] = useState('');
  const [bubbleClosed, setBubbleClosed] = useState(false);
  const [ending, setEnding] = useState(false);
  const [ended, setEnded] = useState(false);
  const [endEmail, setEndEmail] = useState('');
  const [listening, setListening] = useState(false);
  const [ph, setPh] = useState(0);
  const [doneCards, setDoneCards] = useState<string[]>([]);

  const ctx = useRef<BotContext>({});
  const sentCount = useRef(0);
  const sessionId = useRef(newSession());
  const scroller = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const recog = useRef<any>(null);
  const loaded = useRef(false);
  const messagesRef = useRef<Msg[]>([]);
  messagesRef.current = messages;

  // ---- restore / persist (per browser tab) ----
  useEffect(() => {
    try {
      const raw = sessionStorage.getItem(STORE_KEY);
      if (raw) {
        const s: Saved = JSON.parse(raw);
        setMessages(s.messages.map(m => ({ ...m, fresh: false })));
        ctx.current = s.ctx; sentCount.current = s.sentCount; sessionId.current = s.sessionId; setEnded(s.ended); setDoneCards(s.doneCards ?? []);
      }
    } catch { /* storage unavailable */ }
    loaded.current = true;
  }, []);
  useEffect(() => {
    if (!loaded.current) return;
    try {
      const s: Saved = { messages, ctx: ctx.current, sentCount: sentCount.current, sessionId: sessionId.current, ended, doneCards };
      sessionStorage.setItem(STORE_KEY, JSON.stringify(s));
    } catch { /* storage unavailable */ }
  }, [messages, ended, doneCards]);

  // ---- launcher speech bubble: appears after the intro, types rotating lines ----
  useEffect(() => {
    if (open || bubbleClosed) return;
    const start = setTimeout(() => setBubble(0), 5200);
    return () => clearTimeout(start);
  }, [open, bubbleClosed]);
  useEffect(() => {
    if (bubble < 0 || open || bubbleClosed) return;
    const line = BUBBLE_LINES[bubble % BUBBLE_LINES.length];
    let i = 0;
    setBubbleText('');
    const typer = setInterval(() => { i++; setBubbleText(line.slice(0, i)); if (i >= line.length) clearInterval(typer); }, 38);
    const next = setTimeout(() => setBubble(b => b + 1), 3800);
    return () => { clearInterval(typer); clearTimeout(next); };
  }, [bubble, open, bubbleClosed]);

  useEffect(() => {
    if (!open) return;
    const t = setInterval(() => setPh(p => (p + 1) % PLACEHOLDERS.length), 3200);
    return () => clearInterval(t);
  }, [open]);

  // ---- auto-scroll ----
  const scrollDown = useCallback(() => {
    requestAnimationFrame(() => scroller.current?.scrollTo({ top: scroller.current.scrollHeight, behavior: 'smooth' }));
  }, []);
  useEffect(scrollDown, [messages.length, typing, ending, ended, scrollDown]);

  // ---- transcript ----
  const transcriptBody = (reason: string) => JSON.stringify({
    messages: messagesRef.current.map(({ from, text, at }) => ({ from, text, at })),
    visitor: { name: ctx.current.name, email: ctx.current.email },
    page: location.href,
    reason,
    sessionId: sessionId.current,
  });
  const hasUnsent = () => messagesRef.current.some(m => m.from === 'user') && messagesRef.current.length > sentCount.current;
  const sendTranscript = useCallback(async (reason: string) => {
    if (!hasUnsent()) return;
    const count = messagesRef.current.length;
    try {
      const res = await fetch('/api/transcript', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: transcriptBody(reason), keepalive: true });
      if (res.ok) sentCount.current = count;
      else console.warn('[chat] transcript not emailed:', (await res.json().catch(() => ({}))).error);
    } catch (err) {
      console.warn('[chat] transcript failed', err);
    }
  }, []);
  // Visitor leaves without tapping "End chat" — still deliver the conversation.
  useEffect(() => {
    const onHide = () => {
      if (!hasUnsent()) return;
      navigator.sendBeacon?.('/api/transcript', new Blob([transcriptBody('visitor left the page')], { type: 'text/plain' }));
      sentCount.current = messagesRef.current.length;
    };
    window.addEventListener('pagehide', onHide);
    return () => window.removeEventListener('pagehide', onHide);
  }, []);

  // ---- conversation ----
  const push = (m: Omit<Msg, 'id' | 'at'>) => setMessages(list => [...list.map(x => ({ ...x, fresh: false })), { ...m, id: uid(), at: Date.now() }]);
  const botSay = (r: BotReply, delay = 650) => {
    setTyping(true);
    setTimeout(() => { setTyping(false); push({ from: 'bot', ...r, fresh: true }); }, delay);
  };

  const openChat = () => {
    setOpen(true);
    setBubbleClosed(true);
    if (messagesRef.current.length === 0) botSay(WELCOME, 500);
    setTimeout(() => inputRef.current?.focus({ preventScroll: true }), 350);
  };

  const send = (raw: string) => {
    const text = raw.trim().slice(0, 1000);
    if (!text || typing) return;
    if (ended) { setEnded(false); sentCount.current = 0; sessionId.current = newSession(); }
    push({ from: 'user', text });
    setInput('');
    const r = reply(text, ctx.current);
    botSay(r, 450 + Math.min(text.length * 12, 700));
    if (ctx.current.email && /@/.test(text)) setTimeout(() => sendTranscript('lead shared email'), 1400);
  };

  const onLead = (cardId: string) => (name: string, email: string) => {
    ctx.current.name = name || ctx.current.name;
    ctx.current.email = email;
    setDoneCards(d => [...d, cardId]);
    push({ from: 'user', text: `${name ? `${name} · ` : ''}${email}` });
    botSay({ text: `Thanks${name ? `, ${name.split(' ')[0]}` : ''}! ✅ A senior lead will email **${email}** within 4 business hours. Anything else you'd like to ask meanwhile?`, chips: [CHIPS.process, CHIPS.trust] });
    setTimeout(() => sendTranscript('lead form submitted'), 1300);
  };

  const onEstimate = (cardId: string) => (summary: string, r: BotReply) => {
    setDoneCards(d => [...d, cardId]);
    push({ from: 'user', text: summary });
    botSay(r, 800);
  };

  const endChat = async (withEmail?: string) => {
    if (withEmail && /^\S+@\S+\.\S+$/.test(withEmail)) ctx.current.email = withEmail;
    setEnding(false);
    await sendTranscript('visitor ended the chat');
    setEnded(true);
  };

  const restart = () => {
    setMessages([]); setEnded(false); setDoneCards([]); ctx.current = {}; sentCount.current = 0; sessionId.current = newSession();
    botSay(WELCOME, 400);
  };

  // ---- voice input (free, built into Chrome/Edge/Safari) ----
  // Resolved after mount so server and client render the same markup.
  const [SpeechRec, setSpeechRec] = useState<any>(null);
  useEffect(() => { const w = window as any; setSpeechRec(() => w.SpeechRecognition || w.webkitSpeechRecognition || null); }, []);
  const toggleMic = () => {
    if (!SpeechRec) return;
    if (listening) { recog.current?.stop(); return; }
    const r = new SpeechRec();
    r.lang = 'en-US';
    r.interimResults = true;
    r.onresult = (e: any) => {
      const t = Array.from(e.results).map((x: any) => x[0].transcript).join('');
      setInput(t);
      if (e.results[e.results.length - 1].isFinal) { r.stop(); send(t); }
    };
    r.onend = () => setListening(false);
    r.onerror = () => setListening(false);
    recog.current = r;
    setListening(true);
    r.start();
  };

  useEffect(() => {
    const onKey = (e: globalThis.KeyboardEvent) => { if (e.key === 'Escape' && open) setOpen(false); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  const onInputKey = (e: KeyboardEvent<HTMLInputElement>) => { if (e.key === 'Enter') { e.preventDefault(); send(input); } };
  const lastBotId = [...messages].reverse().find(m => m.from === 'bot')?.id;
  const lastIsBot = messages[messages.length - 1]?.from === 'bot';
  const userCount = messages.filter(m => m.from === 'user').length;
  const [revealed, setRevealed] = useState<string[]>([]);
  const markRevealed = useCallback((id: string) => setRevealed(r => (r.includes(id) ? r : [...r, id])), []);

  const renderCard = (m: Msg) => {
    if (!m.card) return null;
    const done = doneCards.includes(m.id);
    switch (m.card.type) {
      case 'price': return <PriceCard id={m.card.id} />;
      case 'services': return <ServicesCard onPick={title => send(`How much is ${title}?`)} />;
      case 'guarantees': return <GuaranteesCard />;
      case 'process': return <ProcessCard />;
      case 'estimator': return <EstimatorCard done={done} onResult={onEstimate(m.id)} />;
      case 'lead': return <LeadCard ctx={ctx.current} done={done || !!ctx.current.email} onSubmit={onLead(m.id)} />;
    }
  };

  return (
    <div className={`ila${open ? ' is-open' : ''}`}>
      {/* ---------- Launcher ---------- */}
      <div className="ila-launch">
        {bubble >= 0 && !bubbleClosed && !open && (
          <div className="ila-bubble" onClick={openChat} role="button" tabIndex={0} onKeyDown={e => e.key === 'Enter' && openChat()}>
            <span>{bubbleText}<i className="ila-caret" /></span>
            <button className="ila-bubble__x" aria-label="Dismiss" onClick={e => { e.stopPropagation(); setBubbleClosed(true); }}>×</button>
          </div>
        )}
        <button className="ila-orb" onClick={() => (open ? setOpen(false) : openChat())} aria-label={open ? 'Close chat' : `Chat with ${BOT_NAME}`}>
          <Mascot size={84} talking={bubble >= 0 && !bubbleClosed && !open} />
          {!open && !bubbleClosed && bubble >= 0 && <span className="ila-badge">1</span>}
        </button>
      </div>

      {/* ---------- Panel ---------- */}
      <section className="ila-panel" role="dialog" aria-label={`Chat with ${BOT_NAME}`} aria-hidden={!open} inert={!open}>
        <header className="ila-head">
          <div className="ila-avatar"><Mascot size={40} talking={typing} wave={false} /></div>
          <div className="ila-who">
            <b>{BOT_NAME} <span>· project assistant</span></b>
            <em><i />{typing ? 'typing…' : 'Online · replies instantly'}</em>
          </div>
          {userCount > 0 && !ended && (
            <button className="ila-end" onClick={() => (ctx.current.email ? endChat() : setEnding(true))}>End chat</button>
          )}
          <button className="ila-icon" onClick={() => setOpen(false)} aria-label="Minimize chat">
            <svg viewBox="0 0 24 24"><path d="M6 9l6 6 6-6" /></svg>
          </button>
        </header>

        <div className="ila-body" ref={scroller} data-lenis-prevent>
          {messages.map(m => (
            <div key={m.id} className={`ila-msg ila-msg--${m.from}`}>
              <div className="ila-text">
                {m.from === 'bot' && m.fresh && !revealed.includes(m.id)
                  ? <Reveal text={m.text} onDone={() => { markRevealed(m.id); scrollDown(); }} />
                  : <Rich text={m.text} />}
              </div>
              {(m.from === 'user' || !m.fresh || revealed.includes(m.id)) && renderCard(m)}
              {m.id === lastBotId && lastIsBot && !typing && !ended && m.chips && (!m.fresh || revealed.includes(m.id)) && (
                <div className="ila-chips">
                  {m.chips.map((c, i) => <button key={c} onClick={() => send(c)} style={{ animationDelay: `${i * 60}ms` }}>{c}</button>)}
                </div>
              )}
            </div>
          ))}

          {typing && <div className="ila-msg ila-msg--bot"><div className="ila-text ila-dots"><i /><i /><i /></div></div>}

          {ending && (
            <div className="ila-sheet">
              <b>Before you go 👋</b>
              <p>Leave your email so a senior lead can follow up (optional).</p>
              <input value={endEmail} onChange={e => setEndEmail(e.target.value)} placeholder="you@company.com" type="email" aria-label="Your email" />
              <div className="ila-sheet__row">
                <button className="ila-cta" onClick={() => endChat(endEmail)}>End &amp; send</button>
                <button className="ila-link" onClick={() => endChat()}>Just end</button>
              </div>
            </div>
          )}

          {ended && (
            <div className="ila-endcard">
              <div className="ila-endcard__tick">✓</div>
              <b>Chat ended — thank you!</b>
              <p>Our team has your conversation{ctx.current.email ? ` and will reply to ${ctx.current.email}` : ''}.</p>
              <button className="ila-cta" onClick={restart}>Start a new chat</button>
            </div>
          )}
        </div>

        <form className="ila-compose" onSubmit={e => { e.preventDefault(); send(input); }}>
          <input
            ref={inputRef}
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={onInputKey}
            placeholder={listening ? 'Listening…' : PLACEHOLDERS[ph]}
            aria-label="Message"
            maxLength={1000}
          />
          {SpeechRec && (
            <button type="button" className={`ila-icon ila-mic${listening ? ' is-on' : ''}`} onClick={toggleMic} aria-label={listening ? 'Stop voice input' : 'Speak your message'}>
              <svg viewBox="0 0 24 24"><rect x="9" y="3" width="6" height="12" rx="3" /><path d="M5 11a7 7 0 0014 0M12 18v3" /></svg>
            </button>
          )}
          <button type="submit" className="ila-send" disabled={!input.trim() || typing} aria-label="Send">
            <svg viewBox="0 0 24 24"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
          </button>
        </form>
      </section>
    </div>
  );
}
