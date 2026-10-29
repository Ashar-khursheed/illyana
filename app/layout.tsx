import type { Metadata, Viewport } from 'next';
import { Inter_Tight, Instrument_Serif, JetBrains_Mono } from 'next/font/google';
import './globals.css';

const sans = Inter_Tight({ subsets: ['latin'], weight: ['300', '400', '500', '600', '700'], variable: '--font-sans' });
const serif = Instrument_Serif({ subsets: ['latin'], weight: '400', style: ['normal', 'italic'], variable: '--font-serif' });
const mono = JetBrains_Mono({ subsets: ['latin'], weight: ['400', '500'], variable: '--font-mono' });

export const metadata: Metadata = {
  title: 'Ilyana Digital — Engineering the next decade',
  description:
    'Ilyana Digital Pvt Ltd is a senior-only product studio building web platforms, mobile apps, AI systems and brands — with fixed-scope pricing, weekly demos and 100% code ownership.',
  openGraph: {
    title: 'Ilyana Digital — Engineering the next decade',
    description: 'Senior-only product & AI studio. Fixed price, weekly demos, 100% code ownership.',
    type: 'website',
  },
};

export const viewport: Viewport = { themeColor: '#F4F3EE' };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`js ${sans.variable} ${serif.variable} ${mono.variable}`}>
      <body className="is-loading">{children}</body>
    </html>
  );
}
