import type { Metadata } from 'next';
import { Cormorant_Garamond, Playfair_Display, Jost } from 'next/font/google';
import './globals.css';
import AnnouncementBar from '@/components/layout/AnnouncementBar';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import CustomCursor from '@/components/ui/CustomCursor';
import { getMenu } from '@/lib/shopify';

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400'],
  style: ['normal', 'italic'],
  variable: '--font-cormorant',
  display: 'swap',
});

const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['500'],
  variable: '--font-playfair',
  display: 'swap',
});

const jost = Jost({
  subsets: ['latin'],
  weight: ['300', '400', '500'],
  variable: '--font-jost',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
  title: {
    default: 'Kaansa — Handcrafted Brass & Copper from India',
    template: '%s | Kaansa',
  },
  description:
    'Handcrafted brass and copper pieces for the home, the altar, and the table. Made by artisans in India.',
  openGraph: {
    siteName: 'Kaansa',
    locale: 'en_IN',
    type: 'website',
  },
  twitter: { card: 'summary_large_image' },
  robots: { index: true, follow: true },
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [mainMenu, footerMenu] = await Promise.all([
    getMenu('main-menu'),
    getMenu('footer'),
  ]);

  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${playfair.variable} ${jost.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[var(--color-bg)] text-[var(--color-text)]">
        <CustomCursor />
        <AnnouncementBar />
        <Header menuItems={mainMenu} />
        <main className="flex-1">{children}</main>
        <Footer menuItems={footerMenu} />
      </body>
    </html>
  );
}
