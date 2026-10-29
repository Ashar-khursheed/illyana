import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { LandingPage } from '@/components/landing/LandingPage';
import { landingBySlug, landings } from '@/lib/landings';
import { site } from '@/lib/site';
import '../landing.css';
import '../showcase.css';

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return landings.map(l => ({ slug: l.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const l = landingBySlug((await params).slug);
  if (!l) return {};
  return {
    title: l.metaTitle,
    description: l.metaDescription,
    keywords: [l.keyword, ...site.keywords.slice(0, 8)],
    alternates: { canonical: `/${l.slug}` },
    openGraph: { type: 'website', url: `/${l.slug}`, siteName: site.name, title: l.metaTitle, description: l.metaDescription },
    twitter: { card: 'summary_large_image', title: l.metaTitle, description: l.metaDescription },
  };
}

export default async function Page({ params }: Props) {
  const l = landingBySlug((await params).slug);
  if (!l) notFound();
  return <LandingPage l={l} />;
}
