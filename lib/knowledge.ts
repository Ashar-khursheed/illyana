/**
 * Starting price ranges the chatbot quotes. These are IDEAS — edit them to match what
 * Ilyana actually charges. The bot always presents them as "starting from" ranges and
 * says the final fixed price comes in a written proposal after a discovery call.
 */
export type PriceItem = {
  id: string;
  label: string;
  from: number;
  to: number;
  unit?: string;
  weeks: string;
  note: string;
};

export const pricing: PriceItem[] = [
  { id: 'landing', label: 'Landing page', from: 375, to: 1000, weeks: '1–2 weeks', note: 'Conversion-focused single page, animations, analytics, SEO basics.' },
  { id: 'business', label: 'Business website', from: 1000, to: 3000, weeks: '3–6 weeks', note: '5–15 custom pages, headless CMS, blog, performance budget.' },
  { id: 'ecommerce', label: 'E-commerce store', from: 1500, to: 6250, weeks: '4–10 weeks', note: 'Shopify or headless store, payments, inventory, B2B pricing.' },
  { id: 'webapp', label: 'Web app / SaaS', from: 3750, to: 15000, weeks: '8–16 weeks', note: 'Auth, dashboards, roles, billing, APIs, admin panel, cloud.' },
  { id: 'mobile', label: 'Mobile app', from: 3000, to: 12500, weeks: '8–16 weeks', note: 'iOS + Android from one codebase, store launch, push, analytics.' },
  { id: 'ai', label: 'AI chatbot / automation', from: 1250, to: 7500, weeks: '3–10 weeks', note: 'Custom assistants, document Q&A, workflow automation, integrations.' },
  { id: 'brand', label: 'Brand & UI/UX design', from: 500, to: 2500, weeks: '2–5 weeks', note: 'Logo, identity system, design system, UX research, prototypes.' },
  { id: 'cloud', label: 'Cloud & DevOps setup', from: 750, to: 3750, weeks: '2–6 weeks', note: 'Infrastructure as code, CI/CD, monitoring, security hardening, cost tuning.' },
  { id: 'care', label: 'Care & maintenance', from: 75, to: 500, unit: '/mo', weeks: 'ongoing', note: 'Updates, monitoring, backups, security patches, response SLAs.' },
  { id: 'growth', label: 'SEO & growth', from: 200, to: 1000, unit: '/mo', weeks: 'ongoing', note: 'Technical SEO, content, conversion experiments, reporting.' },
  { id: 'ads', label: 'Paid ads management', from: 250, to: 1000, unit: '/mo', weeks: 'ongoing', note: 'Google, Meta and TikTok ads: strategy, creatives, tracking and weekly optimisation (ad spend billed separately).' },
  { id: 'social', label: 'Social media management', from: 150, to: 600, unit: '/mo', weeks: 'ongoing', note: 'Content calendar, design, posting, community replies and monthly growth reports.' },
  { id: 'ecomgrowth', label: 'E-commerce marketing', from: 300, to: 1200, unit: '/mo', weeks: 'ongoing', note: 'Shopping & catalog ads, email/SMS flows, product-page SEO and conversion testing for online stores.' },
];

/** Project types offered in the in-chat estimator (one-off builds only). */
export const estimatorTypes = pricing.filter(p => !p.unit);

/** Estimator add-ons; each adds a percentage on top of the base range. */
export const estimatorAddons = [
  { id: 'ai', label: 'AI features', pct: 25 },
  { id: 'payments', label: 'Payments', pct: 12 },
  { id: 'multilang', label: 'Multi-language', pct: 10 },
  { id: 'cms', label: 'Admin panel', pct: 10 },
  { id: 'integrations', label: 'Integrations', pct: 15 },
  { id: 'rush', label: 'Rush delivery', pct: 20 },
];

export const BOT_NAME = 'Ila';

export const formatUSD = (n: number) => `$${Math.round(n).toLocaleString('en-US')}`;
export const formatRange = (p: { from: number; to: number; unit?: string }) =>
  `${formatUSD(p.from)} – ${formatUSD(p.to)}${p.unit ?? ''}`;
export const priceById = (id: string) => pricing.find(p => p.id === id);

export function estimate(typeId: string, addonIds: string[]) {
  const base = priceById(typeId)!;
  const pct = addonIds.reduce((sum, id) => sum + (estimatorAddons.find(a => a.id === id)?.pct ?? 0), 0);
  const round = (n: number) => Math.round((n * (1 + pct / 100)) / 100) * 100;
  return { base, from: round(base.from), to: round(base.to), pct };
}
