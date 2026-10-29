import { CONTACT_EMAIL } from './content';

/**
 * Canonical site URL. Set NEXT_PUBLIC_SITE_URL to your real domain (e.g. https://ilyanadigital.com).
 * On Vercel the production domain is picked up automatically if the variable is not set.
 */
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ||
  (process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : 'https://ilyanadigital.com')
).replace(/\/$/, '');

export const site = {
  name: 'Ilyana Digital',
  legalName: 'Ilyana Digital Pvt Ltd',
  url: SITE_URL,
  email: CONTACT_EMAIL,
  title: 'Ilyana Digital — Web, App & AI Development Studio',
  tagline: 'We engineer digital products for the next decade.',
  description:
    'Ilyana Digital is a senior-only web development, mobile app and AI studio. Fixed-price websites, e-commerce stores, SaaS platforms, mobile apps and AI chatbots — with weekly demos, 100% code ownership and a 30-day warranty.',
  keywords: [
    'web development company', 'website development', 'custom website design', 'Next.js development agency',
    'mobile app development', 'React Native app development', 'Flutter app development', 'e-commerce website development',
    'Shopify development', 'SaaS development', 'MVP development', 'AI chatbot development', 'AI automation agency',
    'UI UX design agency', 'branding agency', 'SEO services', 'DevOps services', 'software development company',
    'technology partner for startups', 'technical co-founder', 'fixed price web development', 'Ilyana Digital',
  ],
  locale: 'en_US',
  themeColor: '#F4F3EE',
  accent: '#0E7C5A',
};
