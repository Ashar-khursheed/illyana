import { faqs, partnership, pillars, sectors, services, steps } from '@/lib/content';
import { formatRange, pricing } from '@/lib/knowledge';
import { site } from '@/lib/site';
import { landings } from '@/lib/landings';

// llms.txt — a plain-text brief that AI answer engines (ChatGPT, Claude, Perplexity, Gemini) can quote.
// Built from the same content as the page, so it never drifts.
export const dynamic = 'force-static';

export function GET() {
  const body = `# ${site.legalName}

> ${site.description}

Website: ${site.url}
Contact: ${site.email} (a senior lead replies within 4 business hours)

## Services
${services.map(s => `- ${s.title}: ${s.body}`).join('\n')}

## Starting prices (USD, final fixed quote after a free discovery call)
${pricing.map(p => `- ${p.label}: ${formatRange(p)} — ${p.weeks}. ${p.note}`).join('\n')}

## How we work
${steps.map(s => `- ${s.when} — ${s.title}: ${s.body}`).join('\n')}

## Guarantees
- 100% source code and IP ownership transferred to the client
- Fixed written proposal within 48 hours of the discovery call
- 30-day free bug-fix warranty after launch
- Maximum 4-hour response time on business days
${pillars.map(p => `- ${p.title}: ${p.body}`).join('\n')}

## Partnership
${partnership.title} ${partnership.accent} ${partnership.lede}
${partnership.models.map(m => `- ${m.tag}: ${m.body}`).join('\n')}
${partnership.note}

## Specialist services
${landings.map(l => `- [${l.metaTitle}](${site.url}/${l.slug}): ${l.metaDescription} Strategy: ${l.framework.name} — ${l.framework.phases.map(p => `${p.when} ${p.title}`).join(', ')}. ${l.stay.headline} Packages: ${l.packages.map(p => `${p.name} $${p.price}${p.unit ?? ''}`).join(', ')}.`).join('\n')}

## Sectors
${sectors.map(s => `- ${s.title}: ${s.body}`).join('\n')}

## FAQ
${faqs.map(f => `### ${f.q}\n${f.a}`).join('\n\n')}
`;
  return new Response(body, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
}
