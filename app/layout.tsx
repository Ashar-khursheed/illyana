import type { Metadata, Viewport } from 'next';
import localFont from 'next/font/local';
import './globals.css';

// Self-hosted so builds never depend on reaching Google Fonts.
const sans = localFont({ src: './fonts/inter-tight.woff2', weight: '100 900', variable: '--font-sans', display: 'swap' });
const serif = localFont({
  src: [
    { path: './fonts/instrument-serif-regular.woff2', weight: '400', style: 'normal' },
    { path: './fonts/instrument-serif-italic.woff2', weight: '400', style: 'italic' },
  ],
  variable: '--font-serif',
  display: 'swap',
});
const mono = localFont({ src: './fonts/jetbrains-mono.woff2', weight: '100 800', variable: '--font-mono', display: 'swap' });

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
