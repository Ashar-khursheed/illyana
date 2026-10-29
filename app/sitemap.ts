import type { MetadataRoute } from 'next';
import { site } from '@/lib/site';
import { landings } from '@/lib/landings';

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: site.url, lastModified: new Date(), changeFrequency: 'weekly', priority: 1 },
    ...landings.map(l => ({ url: `${site.url}/${l.slug}`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.9 })),
    { url: `${site.url}/llms.txt`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.3 },
  ];
}
