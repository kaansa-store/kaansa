import type { Metadata } from 'next';
import { Cormorant_Garamond, Playfair_Display, Jost } from 'next/font/google';
import './globals.css';
import AnnouncementBar from '@/components/layout/AnnouncementBar';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import CustomCursor from '@/components/ui/CustomCursor';
import { CartProvider } from '@/components/cart/CartContext';
import CartDrawer from '@/components/cart/CartDrawer';
import { getMenu } from '@/lib/shopify';
import { getCartAction } from '@/app/(shop)/cart/actions';

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
  icons: {
    icon: '/icon.png',
    apple: '/icon.png',
  },
  openGraph: {
    siteName: 'Kaansa',
    locale: 'en_IN',
    type: 'website',
    images: [{ url: '/logo.jpeg', width: 1200, height: 1200, alt: 'Kaansa Heritage Metalware' }],
  },
  twitter: { card: 'summary_large_image', images: ['/logo.jpeg'] },
  robots: { index: true, follow: true },
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [mainMenu, footerMenu, initialCart] = await Promise.all([
    getMenu('main-menu'),
    getMenu('footer'),
    getCartAction(),
  ]);

  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${playfair.variable} ${jost.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[var(--color-bg)] text-[var(--color-text)]">
        <CartProvider initialCart={initialCart}>
          <CustomCursor />
          <AnnouncementBar />
          <Header menuItems={mainMenu} />
          <main className="flex-1">{children}</main>
          <CartDrawer />
          <Footer menuItems={footerMenu} />
        </CartProvider>
      </body>
    </html>
  );
}
