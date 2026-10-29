import type { Metadata, Viewport } from 'next';
import localFont from 'next/font/local';
import './globals.css';
import './chat.css';
import { site } from '@/lib/site';

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
  metadataBase: new URL(site.url),
  title: { default: site.title, template: `%s | ${site.name}` },
  description: site.description,
  keywords: site.keywords,
  applicationName: site.name,
  authors: [{ name: site.legalName, url: site.url }],
  creator: site.legalName,
  publisher: site.legalName,
  category: 'technology',
  alternates: { canonical: '/' },
  formatDetection: { telephone: false, address: false, email: false },
  openGraph: {
    type: 'website',
    url: '/',
    siteName: site.name,
    locale: site.locale,
    title: site.title,
    description: site.description,
  },
  twitter: {
    card: 'summary_large_image',
    title: site.title,
    description: site.description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1, 'max-video-preview': -1 },
  },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: '48x48' },
      { url: '/icon.svg', type: 'image/svg+xml' },
      { url: '/icon-192.png', type: 'image/png', sizes: '192x192' },
      { url: '/icon-512.png', type: 'image/png', sizes: '512x512' },
    ],
    apple: [{ url: '/apple-touch-icon.png', sizes: '180x180' }],
  },
  manifest: '/manifest.webmanifest',
  other: { 'msapplication-TileColor': site.themeColor },
};

export const viewport: Viewport = { themeColor: site.themeColor, colorScheme: 'light' };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`js ${sans.variable} ${serif.variable} ${mono.variable}`}>
      <body className="is-loading">{children}</body>
    </html>
  );
}
