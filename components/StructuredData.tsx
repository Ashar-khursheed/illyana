import { faqs, services, steps } from '@/lib/content';
import { pricing } from '@/lib/knowledge';
import { site } from '@/lib/site';

/**
 * Schema.org JSON-LD for search and answer engines: who we are, what we sell (with price ranges),
 * FAQs and our delivery process. Only facts that are also on the page — no invented ratings or addresses.
 */
export function StructuredData() {
  const org = `${site.url}/#organization`;
  const graph = [
    {
      '@type': 'Organization',
      '@id': org,
      name: site.name,
      legalName: site.legalName,
      url: site.url,
      logo: { '@type': 'ImageObject', url: `${site.url}/icon-512.png`, width: 512, height: 512 },
      image: `${site.url}/opengraph-image`,
      email: site.email,
      description: site.description,
      slogan: site.tagline,
      knowsAbout: services.map(s => s.title).concat(['Next.js', 'React', 'React Native', 'Flutter', 'AI chatbots', 'E-commerce', 'SEO']),
      contactPoint: [{ '@type': 'ContactPoint', contactType: 'sales', email: site.email, availableLanguage: ['English'], areaServed: 'Worldwide' }],
      areaServed: 'Worldwide',
    },
    {
      '@type': 'WebSite',
      '@id': `${site.url}/#website`,
      url: site.url,
      name: site.name,
      description: site.description,
      publisher: { '@id': org },
      inLanguage: 'en',
    },
    {
      '@type': 'WebPage',
      '@id': `${site.url}/#webpage`,
      url: site.url,
      name: site.title,
      description: site.description,
      isPartOf: { '@id': `${site.url}/#website` },
      about: { '@id': org },
      inLanguage: 'en',
      speakable: { '@type': 'SpeakableSpecification', cssSelector: ['.hero__title', '.manifesto__text', '.pt-head'] },
    },
    {
      '@type': 'OfferCatalog',
      '@id': `${site.url}/#services`,
      name: `${site.name} services`,
      itemListElement: pricing.map(p => ({
        '@type': 'Offer',
        itemOffered: { '@type': 'Service', name: p.label, description: p.note, provider: { '@id': org }, areaServed: 'Worldwide' },
        priceSpecification: {
          '@type': p.unit ? 'UnitPriceSpecification' : 'PriceSpecification',
          priceCurrency: 'USD',
          minPrice: p.from,
          maxPrice: p.to,
          ...(p.unit ? { unitText: 'MONTH' } : {}),
        },
      })),
    },
    {
      '@type': 'FAQPage',
      '@id': `${site.url}/#faq`,
      mainEntity: faqs.map(f => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
    },
    {
      '@type': 'HowTo',
      '@id': `${site.url}/#method`,
      name: 'How Ilyana Digital delivers a project',
      step: steps.map((s, i) => ({ '@type': 'HowToStep', position: i + 1, name: s.title, text: s.body })),
    },
  ];

  const json = JSON.stringify({ '@context': 'https://schema.org', '@graph': graph }).replace(/</g, '\\u003c');
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: json }} />;
}
