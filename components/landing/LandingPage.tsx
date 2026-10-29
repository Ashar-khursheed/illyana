import { CONTACT_EMAIL, stats } from '@/lib/content';
import { formatUSD } from '@/lib/knowledge';
import { Landing, landings } from '@/lib/landings';
import { site } from '@/lib/site';
import { ContactForm } from '../ContactForm';
import { LogoMark } from '../Logo';
import { ChatWidget } from '../chat/ChatWidget';
import { LandingFx } from './LandingFx';

const pad = (n: number) => String(n).padStart(2, '0');

function LandingSchema({ l }: { l: Landing }) {
  const url = `${site.url}/${l.slug}`;
  const graph = [
    {
      '@type': 'Service',
      '@id': `${url}#service`,
      name: l.metaTitle.split(' — ')[0],
      serviceType: l.keyword,
      description: l.metaDescription,
      url,
      provider: { '@type': 'Organization', '@id': `${site.url}/#organization`, name: site.legalName, url: site.url },
      areaServed: 'Worldwide',
      offers: {
        '@type': 'AggregateOffer',
        priceCurrency: 'USD',
        lowPrice: Math.min(...l.packages.map(p => p.price)),
        highPrice: Math.max(...l.packages.map(p => p.price)),
        offerCount: l.packages.length,
      },
      hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: `${l.nav} packages`,
        itemListElement: l.packages.map(p => ({
          '@type': 'Offer', name: p.name, description: p.includes.join(', '), price: p.price, priceCurrency: 'USD',
        })),
      },
    },
    {
      '@type': 'HowTo',
      '@id': `${url}#plan`,
      name: l.framework.name,
      description: l.framework.intro,
      step: l.framework.phases.map((p, i) => ({ '@type': 'HowToStep', position: i + 1, name: `${p.when}: ${p.title}`, text: p.actions.join('. ') })),
    },
    {
      '@type': 'FAQPage',
      '@id': `${url}#faq`,
      mainEntity: l.faqs.map(f => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
    },
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: site.url },
        { '@type': 'ListItem', position: 2, name: l.nav, item: url },
      ],
    },
  ];
  const json = JSON.stringify({ '@context': 'https://schema.org', '@graph': graph }).replace(/</g, '\\u003c');
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: json }} />;
}

export function LandingPage({ l }: { l: Landing }) {
  const from = Math.min(...l.packages.map(p => p.price));
  const unit = l.packages[0].unit ?? '';
  return (
    <>
      <LandingSchema l={l} />
      <div className="grain" aria-hidden="true" />

      <header className="nav lp-nav is-scrolled">
        <a href="/" className="brand" aria-label="ilyana Digital home">
          <LogoMark className="brand__mark" />
          <span className="brand__word">ilyana<em>digital</em></span>
        </a>
        <nav className="nav__links" aria-label="Page sections">
          <a href="#strategy">Strategy</a>
          <a href="#commitment">Commitment</a>
          <a href="#pricing">Pricing</a>
          <a href="#faq">FAQ</a>
        </nav>
        <a href="#contact" className="btn btn--small" data-magnetic>Get a free plan</a>
      </header>

      <main>
        {/* HERO */}
        <section className="lp-hero">
          <div className="lp-hero__copy">
            <nav className="lp-crumbs mono reveal-up" aria-label="Breadcrumb"><a href="/">Home</a> / <span>{l.nav}</span></nav>
            <p className="eyebrow mono reveal-up"><span className="tick" />{l.eyebrow}</p>
            <h1 className="lp-h1 reveal-up">{l.h1} <em className="serif">{l.h1Accent}</em></h1>
            <p className="lp-sub reveal-up">{l.sub}</p>
            <div className="hero__ctas reveal-up">
              <a href="#contact" className="btn" data-magnetic>Get my free plan <span className="arrow">→</span></a>
              <a href="#strategy" className="btn btn--ghost" data-magnetic>See the strategy</a>
            </div>
            <ul className="lp-proof reveal-up">{l.proof.map(p => <li key={p}>{p}</li>)}</ul>
          </div>
          <aside className="lp-hero__card" aria-label="At a glance">
            <span className="mono">Starting from</span>
            <b>{formatUSD(from)}<small>{unit}</small></b>
            <p>{l.priceNote}</p>
            <ol>
              {l.framework.phases.map((p, i) => (
                <li key={p.title}><i>{pad(i + 1)}</i><span>{p.title}</span><em className="mono">{p.when}</em></li>
              ))}
            </ol>
            <a href="#pricing" className="lp-link">Compare packages →</a>
          </aside>
        </section>

        {/* PAINS */}
        <section className="section lp-pains">
          <p className="label mono" data-reveal>Why most {l.keyword.replace(/ (agency|company)$/, '')} fails</p>
          <div className="lp-grid3">
            {l.pains.map((p, i) => (
              <article key={p.title} className="lp-pain" data-reveal>
                <span className="mono">{pad(i + 1)}</span>
                <h3>{p.title}</h3>
                <p>{p.body}</p>
              </article>
            ))}
          </div>
        </section>

        {/* STRATEGY */}
        <section className="section lp-strategy" id="strategy">
          <div className="lp-head">
            <p className="label mono" data-reveal>Our strategy</p>
            <h2 className="h2" data-reveal>{l.framework.name}</h2>
            <p className="lp-lede" data-reveal>{l.framework.intro}</p>
          </div>
          <div className="lp-phases">
            <div className="lp-rail" aria-hidden="true"><i /></div>
            {l.framework.phases.map((p, i) => (
              <article key={p.title} className="lp-phase" data-reveal>
                <div className="lp-phase__top"><span className="lp-phase__n">{pad(i + 1)}</span><em className="mono">{p.when}</em></div>
                <h3>{p.title}</h3>
                <ul>{p.actions.map(a => <li key={a}>{a}</li>)}</ul>
                <p className="lp-phase__out"><span className="mono">You get</span>{p.deliverable}</p>
              </article>
            ))}
          </div>
        </section>

        {/* DELIVERABLES + KPIs */}
        <section className="section lp-split">
          <div>
            <p className="label mono" data-reveal>What&apos;s included</p>
            <h2 className="h2 lp-h2s" data-reveal>Everything you need. <em className="serif">Nothing you don&apos;t.</em></h2>
            <ul className="lp-checks">{l.deliverables.map(d => <li key={d} data-reveal>{d}</li>)}</ul>
          </div>
          <div>
            <p className="label mono" data-reveal>What we measure</p>
            <h2 className="h2 lp-h2s" data-reveal>Results you can <em className="serif">see every week.</em></h2>
            <dl className="lp-kpis">
              {l.kpis.map(k => <div key={k.metric} data-reveal><dt>{k.metric}</dt><dd>{k.why}</dd></div>)}
            </dl>
          </div>
        </section>

        {/* COMMITMENT */}
        <section className="section lp-stay" id="commitment">
          <div className="lp-head">
            <p className="label mono" data-reveal>How long we stay with you</p>
            <h2 className="h2" data-reveal>{l.stay.headline}</h2>
            <p className="lp-lede" data-reveal>{l.stay.body}</p>
          </div>
          <ol className="lp-timeline">
            {l.stay.timeline.map((t, i) => (
              <li key={t.title} data-reveal>
                <i>{pad(i + 1)}</i>
                <em className="mono">{t.when}</em>
                <b>{t.title}</b>
                <p>{t.body}</p>
              </li>
            ))}
          </ol>
        </section>

        {/* COMPARE */}
        <section className="section lp-compare">
          <p className="label mono" data-reveal>Why <span className="nocase">ilyana</span></p>
          <h2 className="h2" data-reveal>Typical agency vs. <em className="serif">ilyana.</em></h2>
          <div className="lp-table" role="table" aria-label="Typical agency compared with ilyana">
            <div className="lp-table__row lp-table__row--head" role="row"><span role="columnheader">Typical agency</span><span role="columnheader"><span className="nocase">ilyana</span> Digital</span></div>
            {l.compare.map(c => (
              <div key={c.us} className="lp-table__row" role="row" data-reveal>
                <span role="cell" className="lp-no">{c.them}</span>
                <span role="cell" className="lp-yes">{c.us}</span>
              </div>
            ))}
          </div>
          <div className="lp-stats">
            {stats.map(s => <div key={s.label} data-reveal><b>{s.value}{s.unit}</b><span>{s.label}</span></div>)}
          </div>
        </section>

        {/* PRICING */}
        <section className="section lp-pricing" id="pricing">
          <div className="lp-head">
            <p className="label mono" data-reveal>Packages</p>
            <h2 className="h2" data-reveal>Clear prices. <em className="serif">No surprises.</em></h2>
            <p className="lp-lede" data-reveal>{l.priceNote}</p>
          </div>
          <div className="lp-grid3">
            {l.packages.map(p => (
              <article key={p.name} className={`lp-pack${p.highlight ? ' is-hot' : ''}`} data-reveal>
                {p.highlight && <span className="lp-pack__tag mono">Most popular</span>}
                <h3>{p.name}</h3>
                <p className="lp-pack__for">{p.for}</p>
                <b className="lp-pack__price">{formatUSD(p.price)}<small>{p.unit ?? ' one-time'}</small></b>
                <ul>{p.includes.map(x => <li key={x}>{x}</li>)}</ul>
                <a href="#contact" className={`btn btn--wide${p.highlight ? '' : ' btn--ghost'}`}>Choose {p.name}</a>
              </article>
            ))}
          </div>
        </section>

        {/* FAQ */}
        <section className="section faq" id="faq">
          <div className="faq__head">
            <p className="label mono" data-reveal>FAQ</p>
            <h2 className="h2" data-reveal>Straight <em className="serif">answers.</em></h2>
          </div>
          <div className="faq__list">
            {l.faqs.map(f => (
              <details key={f.q} data-reveal>
                <summary>{f.q}<i /></summary>
                <p>{f.a}</p>
              </details>
            ))}
          </div>
        </section>

        {/* CONTACT */}
        <section className="section contact lp-contact" id="contact">
          <div className="lp-head">
            <p className="label mono" data-reveal>Free plan · no obligation</p>
            <h2 className="h2" data-reveal>{l.cta.title}</h2>
            <p className="lp-lede" data-reveal>{l.cta.sub}</p>
          </div>
          <div className="contact__grid">
            <ContactForm source={`${l.nav} landing page`} />
            <aside className="contact__aside">
              <div><span className="mono">Email</span><a href={`mailto:${CONTACT_EMAIL}`} className="biglink">{CONTACT_EMAIL}</a></div>
              <div><span className="mono">Response</span><p>Within 4 business hours — from a senior lead, not a sales bot.</p></div>
              <div><span className="mono">Next step</span><p>30-minute strategy call → written fixed proposal in 48 hours.</p></div>
            </aside>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="footer__big" aria-hidden="true">ilyana</div>
        <div className="footer__row">
          <span className="mono">© {new Date().getFullYear()} <span className="nocase">ilyana</span> Digital Pvt Ltd · <a className="nocase" href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a></span>
          <nav className="footer__links" aria-label="Solutions">
            <a href="/">Home</a>
            {landings.filter(x => x.slug !== l.slug).map(x => <a key={x.slug} href={`/${x.slug}`}>{x.nav}</a>)}
          </nav>
        </div>
      </footer>

      <ChatWidget />
      <LandingFx />
    </>
  );
}
