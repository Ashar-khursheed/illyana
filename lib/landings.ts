/**
 * Dedicated landing pages for ads and organic ranking. Each page targets one search intent
 * with its own strategy, timeline, KPIs, commitment and pricing — edit the copy here.
 */
export type Landing = {
  slug: string;
  nav: string;
  keyword: string;
  metaTitle: string;
  metaDescription: string;
  eyebrow: string;
  h1: string;
  h1Accent: string;
  sub: string;
  proof: string[];
  pains: { title: string; body: string }[];
  framework: { name: string; intro: string; phases: { when: string; title: string; actions: string[]; deliverable: string }[] };
  deliverables: string[];
  kpis: { metric: string; why: string }[];
  stay: { headline: string; body: string; timeline: { when: string; title: string; body: string }[] };
  compare: { them: string; us: string }[];
  packages: { name: string; price: number; unit?: string; for: string; includes: string[]; highlight?: boolean }[];
  priceNote: string;
  faqs: { q: string; a: string }[];
  cta: { title: string; sub: string };
};

export const landings: Landing[] = [
  {
    slug: 'branding-agency',
    nav: 'Branding',
    keyword: 'branding agency',
    metaTitle: 'Branding Agency — Brand Strategy, Logo & Identity Design',
    metaDescription: 'Brand strategy, logo and identity design that makes customers trust you on first look. Fixed price from $500, delivered in 2–5 weeks, with 60 days of rollout support.',
    eyebrow: 'Branding & identity',
    h1: 'A brand people trust',
    h1Accent: 'before you say a word.',
    sub: "Most logos are decoration. We build brands as business systems — positioning, identity and rollout — so every touchpoint sells for you, from your website to your packaging.",
    proof: ['Fixed price from $500', '2–5 week delivery', 'You own every file'],
    pains: [
      { title: 'You look smaller than you are', body: "Inconsistent logos, colours and tone make a serious business look like a side project — and buyers pay less for brands they don't trust." },
      { title: 'Nobody can say why you’re different', body: 'Without clear positioning, customers compare you on price alone. A brand without a story is a commodity.' },
      { title: 'The brand dies in a PDF', body: 'Agencies hand over guidelines and disappear. Six months later every new post and page drifts further from the brand you paid for.' },
    ],
    framework: {
      name: 'The Ilyana Brand OS',
      intro: 'A four-stage system that turns who you are into how you look, sound and sell — and keeps it consistent as you grow.',
      phases: [
        { when: 'Week 1', title: 'Discover', actions: ['Founder & customer interviews', 'Competitor and category audit', 'Audience personas and buying triggers'], deliverable: 'Brand insight report' },
        { when: 'Week 1–2', title: 'Position', actions: ['Positioning statement & value proposition', 'Brand personality and tone of voice', 'Messaging pillars and taglines'], deliverable: 'Brand strategy deck' },
        { when: 'Week 2–4', title: 'Design', actions: ['Logo system (primary, mark, wordmark)', 'Colour, typography, iconography, imagery style', 'Real-world mock-ups: web, social, print, packaging'], deliverable: 'Full identity system' },
        { when: 'Week 4–5+', title: 'Roll out', actions: ['Brand guidelines and editable templates', 'Social, presentation and stationery kits', 'Website UI kit so developers stay on-brand'], deliverable: 'Launch-ready brand kit' },
      ],
    },
    deliverables: ['Brand strategy & positioning', 'Logo suite in every format', 'Colour & typography system', 'Tone of voice guide', 'Brand guidelines (PDF + web)', 'Social media templates', 'Business card & stationery', 'Website UI kit'],
    kpis: [
      { metric: 'Brand recall', why: 'Can customers remember and describe you after one visit?' },
      { metric: 'Website conversion rate', why: 'A trusted brand converts more visitors into enquiries.' },
      { metric: 'Average order / deal value', why: 'Strong brands win on value, not discounts.' },
      { metric: 'Social engagement rate', why: 'Consistent identity makes content recognisable in the feed.' },
      { metric: 'Branded search volume', why: 'More people searching your name means the brand is working.' },
      { metric: 'Consistency score', why: 'We audit every touchpoint against the guidelines each quarter.' },
    ],
    stay: {
      headline: 'We stay until your brand is live everywhere.',
      body: "Delivery isn't the finish line. We stay with your team through rollout and keep reviewing the brand as you grow, so it never drifts.",
      timeline: [
        { when: 'Weeks 1–5', title: 'Build the brand', body: 'Strategy, identity and kits created with you in weekly reviews.' },
        { when: 'Days 1–60 after launch', title: 'Rollout support', body: 'We help apply the brand to your website, social, signage and packaging — included.' },
        { when: 'Every quarter', title: 'Brand health check', body: 'Optional review of every touchpoint with fixes and fresh templates.' },
        { when: 'As you grow', title: 'Brand partner', body: 'New products, campaigns or markets? We extend the system instead of starting over.' },
      ],
    },
    compare: [
      { them: 'A logo and a PDF', us: 'A complete brand system with templates you can actually use' },
      { them: 'Design first, strategy never', us: 'Positioning and messaging before a single sketch' },
      { them: 'Endless revision rounds and surprise invoices', us: 'Fixed price, fixed scope, weekly reviews' },
      { them: 'Agency keeps the source files', us: 'You own every file and font licence' },
      { them: 'Gone after handover', us: '60 days of rollout support included' },
    ],
    packages: [
      { name: 'Brand Starter', price: 500, for: 'New businesses that need to look professional fast', includes: ['Logo suite & favicon', 'Colour and typography', 'Mini brand guide', 'Social profile kit'] },
      { name: 'Brand System', price: 1200, for: 'Growing companies ready to stand out', includes: ['Everything in Starter', 'Strategy & positioning workshop', 'Tone of voice & messaging', 'Full guidelines & templates', 'Website UI kit'], highlight: true },
      { name: 'Brand + Launch', price: 2500, for: 'Brands launching or rebranding publicly', includes: ['Everything in System', 'Landing page in the new brand', 'Launch campaign creatives', 'Packaging / print direction', '60-day rollout support'] },
    ],
    priceNote: 'One-time fixed price. Final quote confirmed in writing within 48 hours of a free discovery call.',
    faqs: [
      { q: 'How much does branding cost?', a: 'Our branding packages start at $500 for a professional starter identity, $1,200 for a full brand system and $2,500 for a brand plus launch. Every project is a fixed price agreed in writing.' },
      { q: 'How long does a branding project take?', a: 'A starter identity takes about 2 weeks; a full brand system with strategy takes 3–5 weeks. You review progress every week.' },
      { q: 'Do I own the logo and brand files?', a: 'Yes. You receive and own every source file, export and licence. Nothing is held back.' },
      { q: 'Can you rebrand an existing business?', a: 'Yes. We audit what already works so you keep the equity customers recognise, then modernise the rest and help you roll it out without confusion.' },
      { q: 'Do you also build the website in the new brand?', a: 'Yes. The Brand + Launch package includes a landing page, and we can build a full website, store or app in the same system.' },
    ],
    cta: { title: 'Ready to look as good as you are?', sub: 'Book a free 30-minute brand call. You get a written plan and fixed price within 48 hours.' },
  },

  {
    slug: 'digital-marketing-agency',
    nav: 'Digital marketing',
    keyword: 'digital marketing agency',
    metaTitle: 'Digital Marketing Agency — SEO, Google & Meta Ads That Bring Leads',
    metaDescription: 'Full-funnel digital marketing: SEO, Google Ads, Meta Ads, social media and conversion optimisation. Plans from $250/month, 90-day ramp then month-to-month, weekly reporting.',
    eyebrow: 'Digital marketing & lead generation',
    h1: 'Marketing that pays for itself',
    h1Accent: '— and proves it every week.',
    sub: 'SEO, paid ads, social and conversion optimisation run as one system, tracked to leads and revenue — not likes. No long contracts: we earn your renewal every month.',
    proof: ['Plans from $250/mo', 'Weekly reports', 'No long lock-in'],
    pains: [
      { title: 'You pay for clicks, not customers', body: 'Ads running without proper tracking, landing pages or follow-up burn budget on traffic that never converts.' },
      { title: 'Five freelancers, zero strategy', body: 'SEO, ads and social handled by different people means nobody owns the result and every channel works against the others.' },
      { title: 'Reports full of vanity metrics', body: 'Impressions and followers look nice. Cost per lead and revenue are what pay your bills — and most agencies avoid them.' },
    ],
    framework: {
      name: 'The Ilyana Growth Loop',
      intro: 'A 90-day plan that fixes tracking first, wins quick leads with ads, then compounds with SEO and content — so every month gets cheaper than the last.',
      phases: [
        { when: 'Days 1–14', title: 'Audit & track', actions: ['Full audit of website, ads, SEO and analytics', 'GA4, Google Tag Manager and conversion tracking', 'Competitor and keyword research'], deliverable: '90-day growth roadmap' },
        { when: 'Days 15–30', title: 'Launch quick wins', actions: ['Google Search & Meta lead campaigns', 'High-converting landing pages for ads', 'Google Business Profile optimisation'], deliverable: 'First leads and baseline cost per lead' },
        { when: 'Days 31–60', title: 'Optimise', actions: ['A/B test ads, audiences and landing pages', 'Retargeting and email follow-up', 'Technical SEO fixes and first content pieces'], deliverable: 'Lower cost per lead' },
        { when: 'Days 61–90+', title: 'Compound', actions: ['SEO content calendar and link building', 'Scale winning campaigns, cut losers', 'Monthly strategy review with forecasts'], deliverable: 'Predictable lead engine' },
      ],
    },
    deliverables: ['Marketing audit & roadmap', 'Conversion tracking setup', 'Google Ads campaigns', 'Meta (Facebook/Instagram) ads', 'Ad landing pages', 'Technical & on-page SEO', 'Content & blog strategy', 'Live dashboard + weekly report'],
    kpis: [
      { metric: 'Cost per lead (CPL)', why: 'The number that decides whether marketing is profitable.' },
      { metric: 'Return on ad spend (ROAS)', why: 'Revenue earned for every dollar spent on ads.' },
      { metric: 'Qualified leads per month', why: 'Real enquiries, not just form fills.' },
      { metric: 'Organic traffic & rankings', why: 'Free traffic that compounds over time.' },
      { metric: 'Landing page conversion rate', why: 'How many visitors turn into enquiries.' },
      { metric: 'Customer acquisition cost', why: 'Total marketing cost to win one paying customer.' },
    ],
    stay: {
      headline: '90 days to build it. Then you stay because it works.',
      body: 'Marketing needs time to learn, so we commit to a focused 90-day ramp. After that it is month-to-month — no annual contracts. If we stop delivering, you can leave with every account and asset.',
      timeline: [
        { when: 'Days 1–90', title: 'Growth ramp', body: 'Tracking, campaigns, landing pages and SEO foundations built and optimised weekly.' },
        { when: 'Every week', title: 'Report & call', body: 'Leads, cost per lead and next actions — in plain language.' },
        { when: 'Every month', title: 'Strategy review', body: 'What worked, what we cut, and the forecast for next month.' },
        { when: 'Month 4 onwards', title: 'Month-to-month partner', body: 'Scale what works, add channels when they make sense. Cancel any time with 30 days notice.' },
      ],
    },
    compare: [
      { them: '12-month lock-in contracts', us: '90-day ramp, then month-to-month' },
      { them: 'Reports on impressions and likes', us: 'Reports on cost per lead and revenue' },
      { them: 'Agency owns your ad accounts', us: 'Everything runs in accounts you own' },
      { them: 'Separate SEO, ads and social vendors', us: 'One team, one strategy, one dashboard' },
      { them: 'Monthly email, no access', us: 'Live dashboard and weekly calls' },
    ],
    packages: [
      { name: 'Launch', price: 250, unit: '/mo', for: 'Local and small businesses starting with digital', includes: ['Tracking & analytics setup', 'Google Business Profile', 'One ad channel (Google or Meta)', 'SEO foundations', 'Monthly report'] },
      { name: 'Growth', price: 600, unit: '/mo', for: 'Businesses ready to scale leads', includes: ['Everything in Launch', 'Google + Meta ads management', 'Ad landing pages', '4 SEO articles per month', 'Weekly report + call'], highlight: true },
      { name: 'Scale', price: 1000, unit: '/mo', for: 'Multi-channel growth for ambitious brands', includes: ['Everything in Growth', 'Retargeting & email automation', 'TikTok / LinkedIn ads', '8 SEO articles + link building', 'Monthly forecasting'] },
    ],
    priceNote: 'Monthly management fee. Ad spend is paid directly to Google/Meta from your own account.',
    faqs: [
      { q: 'How much does digital marketing cost?', a: 'Our marketing plans start at $250/month for Launch, $600/month for Growth and $1,000/month for Scale. Ad spend is separate and paid directly from your own ad account.' },
      { q: 'How soon will I see results?', a: 'Paid ads usually bring first leads within 2–4 weeks of launch. SEO compounds over 3–6 months. That is why we combine both in the first 90 days.' },
      { q: 'Do I have to sign a long contract?', a: 'No. We ask for a 90-day ramp so campaigns can learn, then it is month-to-month with 30 days notice.' },
      { q: 'Who owns the ad accounts and data?', a: 'You do. Every campaign, pixel and analytics property runs in accounts owned by your business.' },
      { q: 'What budget should I spend on ads?', a: 'Most small businesses start with $300–$1,000 per month in ad spend. We recommend a starting budget in your free strategy call based on your market and targets.' },
    ],
    cta: { title: 'Get a free 90-day growth plan.', sub: 'Tell us your goals. We audit your marketing and send a written plan with forecasts within 48 hours.' },
  },

  {
    slug: 'ecommerce-marketing-agency',
    nav: 'E-commerce marketing',
    keyword: 'ecommerce marketing agency',
    metaTitle: 'E-commerce Marketing Agency — More Sales, Higher ROAS, Repeat Customers',
    metaDescription: 'E-commerce growth for Shopify and online stores: Google Shopping, Meta catalog ads, email & SMS flows, product SEO and CRO. Plans from $300/month, 12-month sales calendar.',
    eyebrow: 'E-commerce growth marketing',
    h1: 'More orders. Higher ROAS.',
    h1Accent: 'Customers who come back.',
    sub: 'We grow online stores on three levers at once — traffic that buys, a store that converts, and flows that turn first orders into repeat customers.',
    proof: ['Plans from $300/mo', 'Shopify & custom stores', '12-month sales calendar'],
    pains: [
      { title: 'Ads get clicks, carts stay abandoned', body: 'Without retargeting, abandoned-cart flows and fast product pages, most paid traffic leaves without buying.' },
      { title: 'Every sale costs more than the last', body: 'Relying only on paid ads means rising costs. Stores that win own their audience through email, SMS and SEO.' },
      { title: 'One-time buyers, no loyalty', body: 'Acquiring a new customer costs far more than keeping one. Most stores never set up post-purchase journeys.' },
    ],
    framework: {
      name: 'The Ilyana Store Growth Engine',
      intro: 'Fix the store, feed the ads, own the customer. A 90-day launch followed by a 12-month seasonal sales calendar.',
      phases: [
        { when: 'Days 1–14', title: 'Store & data audit', actions: ['Conversion audit of product, cart and checkout', 'Pixel, Conversions API and GA4 e-commerce tracking', 'Product feed clean-up for Google & Meta'], deliverable: 'Store growth roadmap' },
        { when: 'Days 15–30', title: 'Feed the ads', actions: ['Google Shopping / Performance Max', 'Meta Advantage+ catalog campaigns', 'Abandoned cart & browse retargeting'], deliverable: 'Profitable baseline ROAS' },
        { when: 'Days 31–60', title: 'Own the customer', actions: ['Welcome, abandoned-cart, post-purchase and win-back email/SMS flows', 'Reviews and UGC collection', 'Bundles, upsells and free-shipping thresholds'], deliverable: 'Revenue from owned channels' },
        { when: 'Days 61–90+', title: 'Scale & season', actions: ['Product and collection page SEO', 'Creative testing every week', '12-month campaign calendar (launches, sales, holidays)'], deliverable: 'Repeatable monthly growth' },
      ],
    },
    deliverables: ['Store conversion audit', 'E-commerce tracking (GA4 + CAPI)', 'Google Shopping & PMax', 'Meta catalog ads', 'Email & SMS automation flows', 'Product page SEO', 'Upsell & bundle strategy', '12-month sales calendar'],
    kpis: [
      { metric: 'ROAS & blended MER', why: 'Revenue per ad dollar — and across all marketing.' },
      { metric: 'Conversion rate', why: 'Share of visitors who complete a purchase.' },
      { metric: 'Average order value', why: 'Bundles and upsells raise revenue without more traffic.' },
      { metric: 'Cart abandonment recovery', why: 'Revenue won back by automated flows.' },
      { metric: 'Repeat purchase rate', why: 'The sign of a store customers love.' },
      { metric: 'Customer lifetime value', why: 'How much each customer is worth over time.' },
    ],
    stay: {
      headline: 'We plan your whole year, not just next month.',
      body: 'Stores grow in seasons. After a 90-day launch we work to a 12-month sales calendar with you — every launch, sale and holiday planned in advance. Month-to-month, no lock-in.',
      timeline: [
        { when: 'Days 1–90', title: 'Growth launch', body: 'Tracking, ads, flows and store fixes live and optimised weekly.' },
        { when: 'Every week', title: 'Creative & performance review', body: 'New ad creatives tested, winners scaled, results reported.' },
        { when: 'Every quarter', title: 'Season planning', body: 'Campaigns, offers and stock planned for the next peak season.' },
        { when: 'All year', title: 'Your growth team', body: 'We stay on as your in-house e-commerce team — for a fraction of the cost.' },
      ],
    },
    compare: [
      { them: 'Only runs ads', us: 'Ads + store conversion + email/SMS + SEO together' },
      { them: 'Reports clicks and reach', us: 'Reports revenue, ROAS and repeat customers' },
      { them: 'Generic campaigns', us: 'Campaigns built around your products, margins and stock' },
      { them: 'Plans month by month', us: '12-month seasonal sales calendar' },
      { them: 'Locks you into contracts', us: '90-day launch, then month-to-month' },
    ],
    packages: [
      { name: 'Store Launch', price: 300, unit: '/mo', for: 'New stores getting their first steady sales', includes: ['E-commerce tracking setup', 'Google Shopping / PMax', 'Meta catalog ads', 'Abandoned-cart email flow', 'Monthly report'] },
      { name: 'Store Growth', price: 700, unit: '/mo', for: 'Stores ready to scale profitably', includes: ['Everything in Launch', 'Full email & SMS flows', 'Conversion rate optimisation', 'Product page SEO', 'Weekly creative testing'], highlight: true },
      { name: 'Store Scale', price: 1200, unit: '/mo', for: 'Established brands going big', includes: ['Everything in Growth', 'Multi-channel ads incl. TikTok', 'Marketplace expansion', 'LTV & cohort analytics', '12-month sales calendar'] },
    ],
    priceNote: 'Monthly management fee. Ad spend is paid directly from your own ad accounts.',
    faqs: [
      { q: 'How much does e-commerce marketing cost?', a: 'Our e-commerce plans start at $300/month for Store Launch, $700/month for Store Growth and $1,200/month for Store Scale. Ad spend is separate.' },
      { q: 'Do you work with Shopify stores?', a: 'Yes — Shopify, WooCommerce and custom headless stores. If your store needs fixing first, we can rebuild it too (e-commerce builds start at $1,500).' },
      { q: 'How quickly can sales increase?', a: 'Abandoned-cart flows and retargeting usually recover revenue within the first weeks. Ads and SEO compound over the first 90 days.' },
      { q: 'Do you handle email and SMS marketing?', a: 'Yes. We build and run welcome, abandoned-cart, post-purchase and win-back flows plus campaign emails for every sale.' },
      { q: 'Is there a minimum contract?', a: 'We ask for a 90-day launch so campaigns and flows can learn, then it is month-to-month with 30 days notice.' },
    ],
    cta: { title: 'Find the revenue your store is missing.', sub: 'Get a free store growth audit — we show you exactly where sales are leaking, in writing, within 48 hours.' },
  },

  {
    slug: 'website-development-company',
    nav: 'Website development',
    keyword: 'website development company',
    metaTitle: 'Website Development Company — Fast, SEO-Ready Websites at a Fixed Price',
    metaDescription: 'Custom websites, landing pages and online stores built with Next.js: fast, SEO-ready and easy to edit. Fixed price from $375, weekly demos, 100% code ownership, 30-day warranty.',
    eyebrow: 'Website development',
    h1: 'A website that wins customers',
    h1Accent: 'while you sleep.',
    sub: "Fast, beautiful and built to rank — not a template with your logo on it. Fixed price, weekly demos, and you own 100% of the code.",
    proof: ['Fixed price from $375', 'Live in 1–6 weeks', '30-day free warranty'],
    pains: [
      { title: 'Slow sites lose customers', body: 'Every extra second of loading costs visitors — and Google ranks slow sites lower. Most templates are bloated by default.' },
      { title: 'Pretty, but it doesn’t sell', body: 'A website without clear messaging, trust signals and calls to action is an expensive brochure.' },
      { title: 'Held hostage by your developer', body: 'No access to the code, no idea how to edit content, and a bill every time you change a sentence.' },
    ],
    framework: {
      name: 'The Ilyana Launch Method',
      intro: 'From blank page to a fast, ranking, converting website in four clear stages — with a live demo every week.',
      phases: [
        { when: 'Week 1', title: 'Plan', actions: ['Goals, audience and competitor review', 'Sitemap and keyword plan for SEO', 'Content and conversion strategy'], deliverable: 'Site blueprint + fixed quote' },
        { when: 'Week 1–2', title: 'Design', actions: ['Custom design in your brand', 'Mobile-first layouts for every page', 'Clickable prototype to review'], deliverable: 'Approved design' },
        { when: 'Week 2–5', title: 'Build', actions: ['Next.js build with a performance budget', 'Easy-to-edit CMS', 'Forms, analytics, SEO schema and integrations'], deliverable: 'Staging site you can click' },
        { when: 'Week 5–6', title: 'Launch & grow', actions: ['Speed, accessibility and SEO checks', 'Zero-downtime launch and Google indexing', 'Training video for your team'], deliverable: 'Live website + 30-day warranty' },
      ],
    },
    deliverables: ['Custom UI/UX design', 'Mobile-first responsive build', 'Easy content editing (CMS)', 'Technical SEO & schema', 'Speed optimisation (90+ Lighthouse)', 'Analytics & conversion tracking', 'Contact forms & integrations', 'Training & handover'],
    kpis: [
      { metric: 'Page speed (Core Web Vitals)', why: 'Fast sites rank higher and convert better.' },
      { metric: 'Lighthouse score', why: 'We agree a performance target upfront and hit it.' },
      { metric: 'Organic search traffic', why: 'Built-in SEO so customers find you.' },
      { metric: 'Enquiry conversion rate', why: 'Visitors who contact you or buy.' },
      { metric: 'Bounce rate', why: 'Whether visitors stay and explore.' },
      { metric: 'Uptime', why: 'Monitored hosting so the site is always online.' },
    ],
    stay: {
      headline: 'Launch day is day one of our partnership.',
      body: 'Every website includes a 30-day free warranty. After that you can keep us as your on-call tech team with a care plan — or take everything in-house. Either way the code is yours.',
      timeline: [
        { when: 'Weeks 1–6', title: 'Design & build', body: 'Weekly demos and a staging link you can check any time.' },
        { when: 'Days 1–30 after launch', title: 'Free warranty', body: 'Any bug, any fix — free, fast and without debate.' },
        { when: 'Every month', title: 'Care plan (optional, from $75)', body: 'Updates, backups, security, small changes and a monthly report.' },
        { when: 'As you grow', title: 'Your tech partner', body: 'New pages, a store, an app or AI features — added on the same foundation.' },
      ],
    },
    compare: [
      { them: 'Template themes and page builders', us: 'Custom design and clean, fast code' },
      { them: 'Hourly billing that never ends', us: 'Fixed price agreed before we start' },
      { them: 'You see it only at the end', us: 'Live demo every single week' },
      { them: 'Developer keeps the code', us: '100% code and IP ownership' },
      { them: 'SEO as an expensive extra', us: 'Technical SEO and schema built in' },
    ],
    packages: [
      { name: 'Landing Page', price: 375, for: 'Ads, launches and single offers', includes: ['One high-converting page', 'Custom design', 'Contact / lead form', 'Analytics & SEO basics', 'Delivery in 1–2 weeks'] },
      { name: 'Business Website', price: 1000, for: 'Companies that need a serious online presence', includes: ['5–15 custom pages', 'Easy CMS editing', 'Blog & SEO setup', 'Speed & schema optimised', 'Delivery in 3–6 weeks'], highlight: true },
      { name: 'Online Store', price: 1500, for: 'Brands selling products online', includes: ['Shopify or custom store', 'Payments & shipping', 'Product & collection SEO', 'Abandoned-cart email', 'Delivery in 4–10 weeks'] },
    ],
    priceNote: 'Starting prices, one-time. Your exact fixed price is confirmed in writing within 48 hours.',
    faqs: [
      { q: 'How much does a website cost?', a: 'A landing page starts at $375, a business website at $1,000 and an online store at $1,500. You get a fixed written quote before any work starts.' },
      { q: 'How long does it take to build a website?', a: 'A landing page takes 1–2 weeks, a business website 3–6 weeks and an online store 4–10 weeks, with a live demo every week.' },
      { q: 'Will my website be SEO-friendly?', a: 'Yes. Every site includes technical SEO, fast loading, structured data, a sitemap and Google indexing at launch.' },
      { q: 'Can I edit the website myself?', a: 'Yes. We set up an easy content editor and record a short training video so your team can update text, images and blog posts.' },
      { q: 'What happens after the website is live?', a: 'You get a 30-day free warranty. After that, optional care plans start from $75/month — or you take full control. You own the code either way.' },
    ],
    cta: { title: 'Let’s build a website that works as hard as you.', sub: 'Book a free call — get a blueprint and fixed price for your website within 48 hours.' },
  },
];

export const landingBySlug = (slug: string) => landings.find(l => l.slug === slug);
