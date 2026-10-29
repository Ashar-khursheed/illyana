import type { MetadataRoute } from 'next';
import { site } from '@/lib/site';

// Search engines and AI answer engines are welcome everywhere except the API.
const AI_CRAWLERS = ['GPTBot', 'OAI-SearchBot', 'ChatGPT-User', 'ClaudeBot', 'Claude-SearchBot', 'PerplexityBot', 'Google-Extended', 'Applebot-Extended', 'Bingbot'];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: '*', allow: '/', disallow: '/api/' },
      ...AI_CRAWLERS.map(userAgent => ({ userAgent, allow: '/', disallow: '/api/' })),
    ],
    sitemap: `${site.url}/sitemap.xml`,
    host: site.url,
  };
}
