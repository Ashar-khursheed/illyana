import { CONTACT_EMAIL, services } from './content';
import { formatRange, priceById } from './knowledge';

/**
 * Free, fully in-browser assistant: keyword intent matching over the site's own knowledge.
 * No paid API — every answer comes from lib/content.ts and lib/knowledge.ts.
 */

export type Card =
  | { type: 'services' }
  | { type: 'price'; id: string }
  | { type: 'estimator' }
  | { type: 'lead' }
  | { type: 'guarantees' }
  | { type: 'process' };

export type BotReply = { text: string; card?: Card; chips?: string[] };

export type BotContext = { name?: string; email?: string; lastService?: string };

export const CHIPS = {
  estimate: 'Get a price estimate',
  services: 'What do you build?',
  timeline: 'How long does it take?',
  trust: 'Why trust Ilyana?',
  human: 'Talk to a human',
  process: 'How do you work?',
  payment: 'How do payments work?',
  partner: 'Can we partner?',
};

const START_CHIPS = [CHIPS.estimate, CHIPS.services, CHIPS.partner, CHIPS.human];

const has = (text: string, words: string[]) =>
  words.reduce((n, w) => n + (new RegExp(`(^|[^a-z])${w.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}([^a-z]|$)`).test(text) ? 1 : 0), 0);

// Order matters: more specific project types are checked first ("web app" before "app", etc.).
const SERVICE_WORDS: [string, string[]][] = [
  ['landing', ['landing page', 'landing', 'one page', 'one-page', 'single page']],
  ['ai', ['ai', 'chatbot', 'chat bot', 'bot', 'automation', 'automate', 'gpt', 'llm', 'machine learning', 'agent']],
  ['ecommerce', ['ecommerce', 'e-commerce', 'online store', 'store', 'shop', 'shopify', 'woocommerce', 'sell online', 'marketplace']],
  ['webapp', ['web app', 'webapp', 'saas', 'portal', 'dashboard', 'crm', 'erp', 'software', 'platform', 'mvp', 'booking system', 'management system']],
  ['brand', ['logo', 'brand', 'branding', 'identity', 'ui', 'ux', 'ui/ux', 'figma', 'graphic design', 'ui design', 'ux design']],
  ['growth', ['seo', 'marketing', 'ads', 'growth', 'ranking', 'google ranking', 'traffic', 'social media', 'leads']],
  ['care', ['maintenance', 'maintain', 'care plan', 'support plan', 'retainer']],
  ['mobile', ['mobile app', 'mobile', 'app', 'apps', 'android', 'ios', 'iphone', 'flutter', 'react native', 'play store', 'app store']],
  ['cloud', ['cloud', 'devops', 'hosting', 'server', 'servers', 'kubernetes', 'deployment', 'infrastructure', 'ci/cd']],
  ['business', ['website', 'web site', 'site', 'wordpress', 'cms', 'blog', 'portfolio website', 'company website', 'web']],
];

const INTENTS: Record<string, string[]> = {
  greet: ['hi', 'hello', 'hey', 'hiya', 'good morning', 'good evening', 'salam', 'assalam', 'yo'],
  thanks: ['thanks', 'thank you', 'thx', 'appreciate', 'great', 'awesome', 'perfect', 'cool'],
  bye: ['bye', 'goodbye', 'see you', 'that is all', "that's all", 'nothing else'],
  partnership: ['partner', 'partners', 'partnership', 'equity', 'revenue share', 'co-founder', 'cofounder', 'technical founder', 'invest', 'investment', 'investor', 'run my business', 'run the business', 'joint venture', 'long term', 'long-term', 'together'],
  cheap: ['cheap', 'cheaper', 'discount', 'low budget', 'small budget', 'tight budget', 'affordable', 'lower price', 'budget is low', 'budget is tight', 'limited budget', 'not much budget', 'low cost'],
  pricing: ['price', 'pricing', 'cost', 'costs', 'how much', 'rate', 'rates', 'budget', 'quote', 'estimate', 'charge', 'charges', 'fee', 'fees', 'expensive', 'afford', '$', 'usd', 'dollars'],
  timeline: ['how long', 'timeline', 'deadline', 'weeks', 'days', 'months', 'how fast', 'urgent', 'asap', 'quickly', 'turnaround', 'when can'],
  process: ['process', 'how do you work', 'how does it work', 'steps', 'workflow', 'method', 'methodology', 'approach', 'sprint'],
  trust: ['trust', 'guarantee', 'guarantees', 'warranty', 'ownership', 'own the code', 'source code', 'nda', 'safe', 'secure', 'security', 'refund', 'legit', 'reliable', 'scam', 'why you', 'why ilyana', 'why should'],
  payment: ['payment', 'payments', 'pay', 'milestone', 'milestones', 'advance', 'upfront', 'installment', 'invoice', 'deposit'],
  services: ['services', 'service', 'what do you do', 'what do you build', 'what can you', 'offer', 'capabilities', 'expertise', 'specialize'],
  contact: ['contact', 'call', 'meeting', 'meet', 'human', 'person', 'someone', 'talk', 'speak', 'phone', 'number', 'whatsapp', 'email you', 'reach', 'consultation', 'book'],
  tech: ['react', 'next.js', 'nextjs', 'node', 'laravel', 'php', 'python', 'django', 'tech stack', 'stack', 'technology', 'technologies', 'framework', 'aws', 'firebase'],
  support: ['support', 'after launch', 'bug', 'bugs', 'updates', 'fix'],
  about: ['who are you', 'about you', 'about ilyana', 'company', 'location', 'located', 'office', 'address', 'where are you', 'team size', 'how many people', 'country'],
  portfolio: ['portfolio', 'previous work', 'past work', 'case study', 'case studies', 'samples', 'examples', 'clients', 'past projects', 'your work'],
  sectors: ['industry', 'industries', 'sector', 'sectors', 'fintech', 'healthcare', 'health', 'education', 'edtech', 'real estate', 'logistics', 'retail', 'restaurant'],
};

const EMAIL_RE = /[\w.+-]+@[\w-]+\.[\w.-]+/;
const NAME_RE = /\b(?:my name is|i am|i'm|this is|name's)\s+([a-z][a-z'-]{1,30}(?:\s+[a-z][a-z'-]{1,30})?)/i;

const cap = (s: string) => s.replace(/\b\w/g, c => c.toUpperCase());

export function detectService(text: string) {
  for (const [id, words] of SERVICE_WORDS) if (has(text, words)) return id;
  return undefined;
}

function topIntent(text: string) {
  let best: string | undefined;
  let score = 0;
  for (const [intent, words] of Object.entries(INTENTS)) {
    const s = has(text, words);
    if (s > score) { best = intent; score = s; }
  }
  return best;
}

const serviceBlurb = (id: string) => {
  const p = priceById(id)!;
  const svc = services.find(s => s.title.toLowerCase().includes(p.label.split(' ')[0].toLowerCase()));
  return svc?.body ?? p.note;
};

export const WELCOME: BotReply = {
  text: "Hi, I'm **Ila** — Ilyana's project assistant. 👋\nI can explain what we build, give you a **price estimate in 3 taps**, or connect you with a senior lead.",
  chips: START_CHIPS,
};

/** Produces the next assistant reply and updates the shared context in place. */
export function reply(input: string, ctx: BotContext): BotReply {
  const text = input.toLowerCase().trim();

  // ---- Lead details typed straight into the chat ----
  const email = input.match(EMAIL_RE)?.[0];
  const name = input.match(NAME_RE)?.[1];
  if (name) ctx.name = cap(name);
  if (email) {
    ctx.email = email;
    return {
      text: `Thanks${ctx.name ? `, ${ctx.name}` : ''}! ✅ I've noted **${email}**. A senior lead will email you within 4 business hours with next steps and a free strategy call slot.`,
      chips: [CHIPS.estimate, CHIPS.process, CHIPS.trust],
    };
  }

  if (text === CHIPS.estimate.toLowerCase()) {
    return { text: "Let's get you a ballpark. Pick your project type and any extras — about **3 taps**. 👇", card: { type: 'estimator' } };
  }

  const service = detectService(text);
  const intent = topIntent(text);
  if (service) ctx.lastService = service;

  if (intent === 'pricing' || (intent === 'cheap' && service)) {
    const id = service ?? ctx.lastService;
    if (id) {
      const p = priceById(id)!;
      return {
        text: `A **${p.label}** with us typically starts at **${formatRange(p)}**, delivered in ${p.weeks}. The exact fixed price comes in a written proposal within 48 hours of a short discovery call — no hourly meter.`,
        card: { type: 'price', id },
        chips: [CHIPS.estimate, CHIPS.payment, CHIPS.human],
      };
    }
    return {
      text: "Let's get you a ballpark. Pick your project type and any extras — it takes about **3 taps**. 👇",
      card: { type: 'estimator' },
    };
  }

  switch (intent) {
    case 'partnership':
      return {
        text: "Yes — we don't just build websites, **we help run your business**. Your idea, our effort. Your investment, our work.\nPartnership options:\n- **Build & Run:** we build it and keep it running — tech, hosting, marketing, support — for one monthly fee\n- **Revenue share:** lower upfront cost for a share of what the product earns (selected projects)\n- **Tech co-founder:** for the right founders, our team joins for equity\nEvery partnership is tailored and agreed in writing after a free discovery call. Want to discuss your idea?",
        chips: [CHIPS.human, CHIPS.estimate, CHIPS.trust],
      };
    case 'cheap':
      return {
        text: "Working with a tighter budget is very common. We usually suggest:\n- Start with a focused **MVP or landing page** and grow in phases\n- Use a proven CMS or Shopify instead of fully custom\n- Pay per milestone, so you only pay for what you've seen working\nWant a quick estimate to see where you'd start?",
        chips: [CHIPS.estimate, CHIPS.human],
      };
    case 'timeline': {
      const p = priceById(service ?? ctx.lastService ?? '');
      return {
        text: p
          ? `A **${p.label}** usually takes **${p.weeks}**. You'll see a live demo every week, so nothing is a surprise. Need it faster? We offer rush delivery.`
          : "Typical timelines:\n- Landing page: **1–2 weeks**\n- Business website: **3–6 weeks**\n- E-commerce: **4–10 weeks**\n- Web or mobile app: **8–16 weeks**\nYou get a live demo every week along the way.",
        chips: [CHIPS.estimate, CHIPS.process, CHIPS.human],
      };
    }
    case 'process':
      return { text: "Here's how every project runs — from first call to launch, with no surprises:", card: { type: 'process' }, chips: [CHIPS.timeline, CHIPS.payment, CHIPS.estimate] };
    case 'trust':
      return { text: "Fair question. These aren't slogans — they're **clauses in our contract**:", card: { type: 'guarantees' }, chips: [CHIPS.payment, CHIPS.estimate, CHIPS.human] };
    case 'payment':
      return {
        text: "Payments are simple and safe:\n- **Fixed price** agreed before work starts\n- Paid **per milestone** — only after you've seen it working in a demo\n- Code & IP transfer to you as each milestone is paid\nNo hourly billing, no surprise invoices.",
        chips: [CHIPS.estimate, CHIPS.trust, CHIPS.human],
      };
    case 'services':
      return { text: 'We are a senior-only studio covering six disciplines. Tap any one to see starting prices:', card: { type: 'services' } };
    case 'contact':
      return {
        text: `Of course — a real senior lead (not a sales bot) will reply within **4 business hours**. Leave your details below, or email **${CONTACT_EMAIL}**.`,
        card: { type: 'lead' },
      };
    case 'tech':
      return {
        text: "We pick proven, future-proof tech for each project:\n- **Web:** React, Next.js, Node.js, TypeScript, headless CMS, Shopify\n- **Mobile:** React Native, Flutter, Swift/Kotlin\n- **AI:** OpenAI, Anthropic, RAG pipelines, automation\n- **Cloud:** AWS, GCP, Azure, Kubernetes\nEverything lives in **your** repositories and cloud accounts.",
        chips: [CHIPS.services, CHIPS.estimate],
      };
    case 'support':
      return {
        text: `Every launch includes a **30-day free bug-fix warranty**. After that you can choose a care plan (from **${formatRange(priceById('care')!)}**) with monitoring, backups, security updates and guaranteed response times — or take everything in-house. No lock-in.`,
        chips: [CHIPS.trust, CHIPS.human],
      };
    case 'about':
      return {
        text: `**Ilyana Digital Pvt Ltd** is a senior-only product & AI studio. We build web platforms, mobile apps, AI systems and brands for clients worldwide, working remotely with at least 4 hours of overlap with your day. For office details or team specifics, a senior lead can share them directly — email **${CONTACT_EMAIL}**.`,
        chips: [CHIPS.services, CHIPS.trust, CHIPS.human],
      };
    case 'portfolio':
      return {
        text: "We share relevant case studies and live demos on the discovery call, matched to your industry — many client projects are under NDA, so we don't publish them openly. Want to book that call?",
        chips: [CHIPS.human, CHIPS.estimate],
      };
    case 'sectors':
      return {
        text: 'We build for **fintech, healthcare, retail & e-commerce, logistics, real estate and education** — and we sign an NDA on day one, so your idea is protected. What industry are you in?',
        chips: [CHIPS.estimate, CHIPS.human],
      };
    case 'greet':
      return { text: `Hey${ctx.name ? ` ${ctx.name}` : ''}! 👋 What are you planning to build?`, chips: START_CHIPS };
    case 'thanks':
      return { text: "You're welcome! 😊 Anything else I can help with?", chips: [CHIPS.estimate, CHIPS.human] };
    case 'bye':
      return { text: "It was great chatting! Tap **End chat** at the top and we'll email you this conversation. 👋", chips: [CHIPS.human] };
  }

  if (service) {
    const p = priceById(service)!;
    return {
      text: `Great choice — **${p.label}** is one of our core services. ${serviceBlurb(service)}\nTypically **${formatRange(p)}**, ${p.weeks}.`,
      card: { type: 'price', id: service },
      chips: [CHIPS.estimate, CHIPS.timeline, CHIPS.human],
    };
  }

  if (name) return { text: `Nice to meet you, ${ctx.name}! 👋 What are you looking to build?`, chips: START_CHIPS };

  return {
    text: "I'm not 100% sure I got that. I can help with **services, pricing, timelines and how we work** — or connect you with a senior lead who can answer anything.",
    chips: START_CHIPS,
  };
}
