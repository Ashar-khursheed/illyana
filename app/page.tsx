import { Chars, Words } from '@/components/Split';
import { Icon } from '@/components/Icon';
import { LogoMark } from '@/components/Logo';
import { Nav } from '@/components/Nav';
import { HeroField } from '@/components/HeroField';
import { ContactForm } from '@/components/ContactForm';
import { Experience } from '@/components/Experience';
import { ChatWidget } from '@/components/chat/ChatWidget';
import { StructuredData } from '@/components/StructuredData';
import { landings } from '@/lib/landings';
import {
  CONTACT_EMAIL, faqs, future, manifesto, marqueeItems, partnership, pillars, sectors, services, stack, stats, steps,
} from '@/lib/content';

const pad = (n: number) => String(n).padStart(2, '0');

export default function Home() {
  return (
    <>
      <div className="loader" aria-hidden="true">
        <LogoMark className="loader__mark" />
        <div className="loader__count mono"><span>000</span></div>
        <div className="loader__bar"><i /></div>
      </div>

      <div className="cursor" aria-hidden="true">
        <div className="cursor__ring"><span className="cursor__label" /></div>
        <div className="cursor__dot" />
      </div>
      <div className="grain" aria-hidden="true" />
      <div className="spine" aria-hidden="true"><div className="spine__fill" /><div className="spine__head" /></div>

      <Nav />

      <main id="top">
        {/* HERO */}
        <section className="hero">
          <HeroField />
          <div className="hero__inner">
            <p className="eyebrow mono reveal-up"><span className="tick" />Ilyana Digital Pvt Ltd — Product &amp; AI Studio</p>
            <h1 className="hero__title" aria-label="We engineer digital products for the next decade.">
              <span className="line"><Chars text="We engineer" /></span>
              <span className="line"><Chars text="digital products" /></span>
              <span className="line"><Chars text="for the" /> <em className="serif"><Chars text="next decade." /></em></span>
            </h1>
            <div className="hero__foot">
              <p className="hero__lede reveal-up">
                Senior engineers, designers and AI specialists building platforms that stay fast, secure and relevant — long after launch day.
              </p>
              <div className="hero__ctas reveal-up">
                <a href="#contact" className="btn" data-magnetic data-cursor="Let's talk">Book a strategy call <span className="arrow">→</span></a>
                <a href="#guarantees" className="btn btn--ghost" data-magnetic>Why clients trust us</a>
              </div>
            </div>
          </div>
          <div className="hero__meta mono">
            <span>[ 01 ] Scroll to explore</span>
            <span className="scrollcue"><i /></span>
            <span>Product studio · Global delivery</span>
          </div>
        </section>

        {/* MARQUEE */}
        <div className="marquee" aria-hidden="true">
          <div className="marquee__track">
            {[...marqueeItems, ...marqueeItems].map((m, i) => (
              <span key={i} className="marquee__item"><span>{m}</span><b>✦</b></span>
            ))}
          </div>
        </div>

        {/* MANIFESTO */}
        <section className="manifesto section">
          <p className="label mono">[ 02 ] Manifesto</p>
          <p className="manifesto__text"><Words text={manifesto} /></p>
        </section>

        {/* SERVICES */}
        <section className="services" id="services">
          <div className="services__pin">
            <div className="services__head">
              <p className="label mono">[ 03 ] Capabilities</p>
              <h2 className="h2">Six disciplines.<br /><em className="serif">One accountable team.</em></h2>
              <div className="services__progress"><i /></div>
            </div>
            <div className="services__track">
              {services.map((s, i) => (
                <article key={s.title} className={`card${s.accent ? ' card--accent' : ''}`} data-cursor="Explore">
                  <div className="card__top"><span className="mono">{pad(i + 1)}</span><Icon name={s.icon} /></div>
                  <h3>{s.title}</h3>
                  <p>{s.body}</p>
                  <ul className="mono">{s.tags.map(t => <li key={t}>{t}</li>)}</ul>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* METHOD */}
        <section className="method section" id="method">
          <div className="method__head">
            <p className="label mono">[ 04 ] The Ilyana Method</p>
            <h2 className="h2">From first call to<br /><em className="serif">live product</em> — no surprises.</h2>
          </div>
          <div className="method__body">
            <div className="method__rail"><i /></div>
            <ol className="steps">
              {steps.map(s => (
                <li key={s.title} className="step">
                  <span className="step__n mono">{s.when}</span>
                  <h3>{s.title}</h3>
                  <p>{s.body}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* GUARANTEES */}
        <section className="guarantees section" id="guarantees">
          <div className="g__head">
            <p className="label mono">[ 05 ] Why clients trust us</p>
            <h2 className="h2">Promises written<br />into <em className="serif">every contract.</em></h2>
            <p className="g__sub">Not marketing slogans. These are clauses in our standard agreement — read them before you sign.</p>
          </div>
          <div className="stats">
            {stats.map(s => (
              <div key={s.label} className="stat">
                <b><span data-count={s.value}>0</span>{s.unit}</b>
                <span>{s.label}</span>
              </div>
            ))}
          </div>
          <div className="pillars">
            {pillars.map((p, i) => (
              <article key={p.title} className="pillar">
                <span className="pillar__i mono">{String.fromCharCode(65 + i)}</span>
                <h3>{p.title}</h3>
                <p>{p.body}</p>
              </article>
            ))}
          </div>
        </section>

        {/* PARTNERSHIP */}
        <section className="partner section" id="partnership">
          <div className="pt-head">
            <p className="label mono">[ 06 ] Partnership</p>
            <h2 className="h2">{partnership.title}<br /><em className="serif">{partnership.accent}</em></h2>
            <p className="pt-lede">{partnership.lede}</p>
          </div>

          <div className="pt-eq" aria-label="Your idea plus our effort, your investment plus our work, equals a business we grow together">
            {partnership.equation.map(row => (
              <div key={row.you} className="pt-row">
                <div className="pt-side pt-side--you"><span className="mono">You bring</span><b>{row.you}</b></div>
                <i className="pt-plus" aria-hidden="true">+</i>
                <div className="pt-side pt-side--us"><span className="mono">We bring</span><b>{row.us}</b></div>
              </div>
            ))}
            <div className="pt-result">
              <i className="pt-equals" aria-hidden="true">=</i>
              <b>{partnership.result}</b>
            </div>
          </div>

          <div className="pt-models">
            {partnership.models.map((m, i) => (
              <article key={m.tag} className="pt-model">
                <span className="pt-model__n mono">{pad(i + 1)} · {m.tag}</span>
                <h3>{m.title}</h3>
                <p>{m.body}</p>
              </article>
            ))}
          </div>

          <div className="pt-foot">
            <div className="pt-runs">
              <span className="mono">What we run for you</span>
              <ul>{partnership.runs.map(r => <li key={r}>{r}</li>)}</ul>
            </div>
            <div className="pt-cta">
              <a href="#contact" className="btn" data-magnetic data-cursor="Partner">Become a partner <span className="arrow">→</span></a>
              <p className="mono">{partnership.note}</p>
            </div>
          </div>
        </section>

        {/* STATEMENT */}
        <section className="statement">
          <div className="statement__inner">
            <span className="statement__line">Built for</span>
            <span className="statement__line statement__line--accent"><em className="serif">2030,</em></span>
            <span className="statement__line">not 2020.</span>
          </div>
          <div className="future">
            {future.map(f => (
              <div key={f.tag} className="future__item"><span className="mono">{f.tag}</span><p>{f.body}</p></div>
            ))}
          </div>
        </section>

        {/* SECTORS */}
        <section className="sectors section" id="sectors">
          <p className="label mono">[ 07 ] Sectors we build for</p>
          <ul className="sector-list">
            {sectors.map((s, i) => (
              <li key={s.title} data-cursor="View"><span className="mono">{pad(i + 1)}</span><h3>{s.title}</h3><p>{s.body}</p></li>
            ))}
          </ul>
        </section>

        {/* STACK */}
        <div className="stack" aria-label="Technology we work with">
          <div className="stack__row">
            {[...stack, ...stack].map((s, i) => <span key={i}>{s}</span>)}
          </div>
        </div>

        {/* FAQ */}
        <section className="faq section" id="faq">
          <div className="faq__head">
            <p className="label mono">[ 08 ] Straight answers</p>
            <h2 className="h2">Questions,<br /><em className="serif">answered honestly.</em></h2>
          </div>
          <div className="faq__list">
            {faqs.map(f => (
              <details key={f.q}>
                <summary>{f.q}<i /></summary>
                <p>{f.a}</p>
              </details>
            ))}
          </div>
        </section>

        {/* CONTACT */}
        <section className="contact section" id="contact">
          <h2 className="contact__title">
            <span className="line"><Chars text="Have an idea?" /></span>
            <span className="line"><em className="serif"><Chars text="Let's build it." /></em></span>
          </h2>
          <div className="contact__grid">
            <ContactForm />
            <aside className="contact__aside">
              <div><span className="mono">Email</span><a href={`mailto:${CONTACT_EMAIL}`} className="biglink">{CONTACT_EMAIL}</a></div>
              <div><span className="mono">Response</span><p>Within 4 business hours. A senior lead — not a sales bot — replies.</p></div>
              <div><span className="mono">Next step</span><p>30-minute strategy call → written fixed proposal in 48 hours.</p></div>
            </aside>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="footer__big" aria-hidden="true">ilyana</div>
        <div className="footer__row">
          <span className="mono">© {new Date().getFullYear()} Ilyana Digital Pvt Ltd · <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a></span>
          <nav className="footer__links">
            {landings.map(l => <a key={l.slug} href={`/${l.slug}`}>{l.nav}</a>)}<a href="#contact">Contact</a>
          </nav>
          <a href="#top" className="mono totop" data-magnetic>Back to top ↑</a>
        </div>
      </footer>

      <StructuredData />
      <ChatWidget />
      <Experience />
    </>
  );
}
