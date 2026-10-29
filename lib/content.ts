import { formatUSD, priceById } from './knowledge';

export const CONTACT_EMAIL = 'hello@ilyanadigital.com';

export const navLinks = [
  { href: '#services', label: 'Services' },
  { href: '#method', label: 'Method' },
  { href: '#guarantees', label: 'Guarantees' },
  { href: '#partnership', label: 'Partnership' },
  { href: '#sectors', label: 'Sectors' },
  { href: '#faq', label: 'FAQ' },
];

export const marqueeItems = ['Web Platforms', 'Mobile Apps', 'AI Agents', 'Brand Systems', 'Cloud & DevOps', 'Growth Engineering'];

export const manifesto =
  'Most agencies sell hours. We sell outcomes. Every project starts with a fixed scope, a fixed price and a named senior team — then we ship working software to you every single week, until it is exactly right.';

export type IconName = 'web' | 'mobile' | 'ai' | 'brand' | 'cloud' | 'growth';

export const services: { icon: IconName; title: string; body: string; tags: string[]; accent?: boolean }[] = [
  { icon: 'web', title: 'Web Platforms', body: 'High-performance websites, SaaS products and portals. Core Web Vitals in the green, accessible by default, built to scale.', tags: ['Next.js / React', 'Headless CMS', 'E-commerce'] },
  { icon: 'mobile', title: 'Mobile Apps', body: 'Native-quality iOS and Android apps from one codebase — offline-ready, store-compliant and instrumented from day one.', tags: ['React Native', 'Flutter', 'Swift / Kotlin'] },
  { icon: 'ai', title: 'AI & Automation', body: 'LLM agents, copilots, document intelligence and workflow automation that remove real hours from your operations — measured, not hyped.', tags: ['RAG & Agents', 'Voice / Vision', 'Process automation'], accent: true },
  { icon: 'brand', title: 'Brand & Product Design', body: 'Identity systems, UX research and design systems that make complex products feel effortless and look unmistakably yours.', tags: ['Identity', 'UX / UI', 'Design systems'] },
  { icon: 'cloud', title: 'Cloud & DevOps', body: 'Infrastructure as code, CI/CD, observability and security hardening — so your product stays up while your bills stay down.', tags: ['AWS / GCP / Azure', 'Kubernetes', 'SRE'] },
  { icon: 'growth', title: 'Growth Engineering', body: 'SEO, analytics, conversion experiments and performance marketing wired directly into the product — growth you can attribute.', tags: ['Technical SEO', 'CRO', 'Analytics'] },
];

export const steps = [
  { when: '01 — Week 0', title: 'Discovery sprint', body: 'Workshops, technical audit and user research. You receive a written blueprint, clickable prototype and a fixed quote within 48 hours of sign-off.' },
  { when: '02 — Week 1–2', title: 'Design & architecture', body: 'Design system, system architecture and security model reviewed with you before a single production line is written.' },
  { when: '03 — Weekly', title: 'Build in the open', body: 'Two-week sprints with a live demo every week, a shared roadmap board and staging links you can click any time.' },
  { when: '04 — Launch', title: 'Ship & harden', body: 'Load testing, security review, accessibility audit and a zero-downtime launch — with your team trained on everything.' },
  { when: '05 — Forever', title: 'Evolve', body: '30-day warranty, then optional care plans with response-time SLAs, monthly reports and a roadmap that keeps you ahead.' },
];

export const stats = [
  { value: 100, unit: '%', label: 'Source code & IP ownership transferred to you' },
  { value: 48, unit: 'h', label: 'From discovery call to fixed written proposal' },
  { value: 30, unit: 'd', label: 'Free bug-fix warranty after every launch' },
  { value: 4, unit: 'h', label: 'Maximum response time on business days' },
];

export const pillars = [
  { title: 'Fixed scope, fixed price', body: "You know the final number before work starts. If we under-estimate, that's on us — not on your invoice." },
  { title: 'Senior-only team', body: 'No bait-and-switch. The people on your kickoff call are the people who build your product — named in the contract.' },
  { title: 'Pay per milestone', body: "Payments are tied to delivered, demo-ed milestones. You only pay for work you've seen running." },
  { title: 'NDA on day one', body: 'Your idea is protected before you tell us anything. Signed mutual NDA within hours, not days.' },
  { title: 'Exit without lock-in', body: 'Documented code, your own cloud accounts, your own repositories. Leave any time with everything you paid for.' },
  { title: 'Security by default', body: 'OWASP-aligned reviews, encrypted secrets, least-privilege access and audit logs on every project — not an upsell.' },
  { title: 'Radical transparency', body: 'Live project board, weekly written reports and time-stamped decisions. You never have to ask "what\'s happening?"' },
  { title: 'Performance budget', body: 'Every web build ships with a Lighthouse performance target agreed upfront — and we fix it free if we miss it.' },
];

export const future = [
  { tag: 'AI-native', body: 'Every product is designed for AI copilots, agents and automation from the first sketch.' },
  { tag: 'Edge-fast', body: 'Edge rendering and global CDNs for sub-second loads on any network, any continent.' },
  { tag: 'Composable', body: 'Modular, API-first architecture — swap any piece without rebuilding everything.' },
  { tag: 'Accessible', body: 'WCAG 2.2 AA as a baseline, so your product works for everyone and every regulator.' },
];

export const sectors = [
  { title: 'Fintech & Payments', body: 'Wallets, lending, compliance dashboards' },
  { title: 'Healthcare', body: 'Telehealth, patient portals, clinical AI' },
  { title: 'Retail & E-commerce', body: 'Headless stores, B2B ordering, loyalty' },
  { title: 'Logistics', body: 'Fleet tracking, dispatch, warehouse tools' },
  { title: 'Real Estate & PropTech', body: 'Listings, CRM, virtual tours' },
  { title: 'Education', body: 'LMS, assessment engines, AI tutors' },
];

export const stack = ['React', 'Next.js', 'Node.js', 'TypeScript', 'Python', 'Flutter', 'React Native', 'PostgreSQL', 'AWS', 'OpenAI', 'Anthropic', 'Kubernetes', 'Figma', 'Shopify'];

const fromPrice = (id: string) => {
  const p = priceById(id)!;
  return `${formatUSD(p.from)}–${formatUSD(p.to)}`;
};

// Phrased the way people ask Google and AI assistants, so answer engines can quote them directly.
export const faqs = [
  { q: 'How much does a website cost with ilyana Digital?', a: `A business website typically costs ${fromPrice('business')}, a landing page ${fromPrice('landing')} and an e-commerce store ${fromPrice('ecommerce')}. Every project gets a fixed written quote within 48 hours of a free discovery call — no hourly billing.` },
  { q: 'How much does it cost to build a mobile app?', a: `A cross-platform iOS and Android app typically costs ${fromPrice('mobile')} and takes 8–16 weeks. A web app or SaaS MVP typically costs ${fromPrice('webapp')}.` },
  { q: 'How long does it take to build a website or app?', a: 'A landing page takes 1–2 weeks, a business website 3–6 weeks, an e-commerce store 4–10 weeks and a web or mobile app 8–16 weeks. You see a live demo every week.' },
  { q: 'Can you build an AI chatbot or automation for my business?', a: `Yes. We build custom AI assistants, document Q&A, voice and vision tools and workflow automation, typically ${fromPrice('ai')} depending on integrations.` },
  { q: 'Do you offer business partnerships, revenue share or equity deals?', a: 'Yes. Beyond building, we can run the digital side of your business: Build & Run for one monthly fee, revenue share with lower upfront cost on selected projects, or joining as your technical co-founder for equity. Terms are agreed in writing after a discovery call.' },
  { q: 'Who owns the code and design?', a: 'You do — 100%. All source code, designs and intellectual property transfer to you as each milestone is paid. Repositories and cloud accounts live under your organisation.' },
  { q: 'How do you keep me updated?', a: "A live demo every week, a shared project board, a dedicated channel with your team and a written weekly report. You'll always know exactly where things stand." },
  { q: 'What happens after launch?', a: 'Every launch includes a 30-day free warranty for bugs. After that, you can choose a care plan with guaranteed response times — or take everything in-house. No lock-in.' },
  { q: 'Which technologies do you use?', a: 'React, Next.js, Node.js and TypeScript for the web; React Native, Flutter, Swift and Kotlin for mobile; OpenAI and Anthropic models for AI; and AWS, Google Cloud, Azure and Kubernetes for infrastructure.' },
  { q: 'Do you work with international clients?', a: 'Yes. We work remotely with clients across time zones and keep at least four hours of daily overlap with your working day.' },
];

export const needs = ['Web platform', 'Mobile app', 'AI & automation', 'Brand & design', 'Cloud & DevOps', 'Growth'];

export const partnership = {
  title: "We don't just build your website.",
  accent: 'We help run your business.',
  lede:
    "Most agencies hand over a website and disappear. ilyana works as your long-term technology partner — we design, build, launch, market and operate the digital side of your business alongside you. Because when you grow, we grow.",
  equation: [
    { you: 'Your idea', us: 'Our effort' },
    { you: 'Your investment', us: 'Our work' },
  ],
  result: 'A business we grow together',
  models: [
    { tag: 'Build & Run', title: 'We build it — and keep it running', body: 'Product, hosting, security, updates, marketing and support handled by one team for one predictable monthly partnership fee.' },
    { tag: 'Revenue share', title: 'Lower upfront, shared success', body: 'For selected projects we reduce the upfront cost in exchange for a share of the revenue the product earns. We only win when you do.' },
    { tag: 'Tech co-founder', title: 'Your technical co-founder', body: 'For the right founders, our senior team joins as your technology partner for equity — turning your idea into a company, not just an app.' },
  ],
  runs: ['Product & tech', 'Hosting & security', 'Marketing & SEO', 'Customer support tools', 'Analytics & growth', 'Continuous improvements'],
  note: 'Every partnership is tailored. Terms are agreed in writing after a free discovery call.',
};
