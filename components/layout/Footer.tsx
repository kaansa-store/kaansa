import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Divider from '@/components/ui/Divider';
import { MenuItem } from '@/lib/shopify/types';

export interface FooterProps {
  menuItems?: MenuItem[];
}

export function Footer({ menuItems = [] }: FooterProps) {
  const currentYear = new Date().getFullYear();

  const defaultShopLinks = [
    { title: 'Pooja Essentials', url: '/collections/all?type=Pooja+Essentials' },
    { title: 'Home Decor', url: '/collections/all?type=Home+Decor' },
    { title: 'Kitchen & Tableware', url: '/collections/all?type=Kitchen+%26+Tableware' },
    { title: 'All Pieces', url: '/collections' },
  ];

  const defaultBrandLinks = [
    { title: 'Our Story', url: '/about' },
    { title: 'Get in Touch', url: '/contact' },
    { title: 'Privacy Policy', url: '/policies/privacy-policy' },
    { title: 'Refund Policy', url: '/policies/refund-policy' },
    { title: 'Shipping Policy', url: '/policies/shipping-policy' },
    { title: 'Terms of Service', url: '/policies/terms-of-service' },
  ];

  return (
    <footer className="relative bg-[var(--color-surface)] border-t border-[var(--color-border)] text-[var(--color-text)] overflow-hidden">
      {/* Subtle traditional jali pattern overlay */}
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none bg-repeat bg-[length:320px_320px]"
        style={{ backgroundImage: 'url(/images/pattern.jpg)' }}
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-16 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-16">
          {/* Brand Col */}
          <div className="md:col-span-5 space-y-4">
            <Link
              href="/"
              className="inline-flex items-center gap-3.5 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-gold)]"
            >
              <div className="relative w-11 h-11 rounded-full overflow-hidden border border-[var(--color-gold)]/50 shadow-xs flex-shrink-0 transition-transform duration-300 group-hover:scale-105">
                <Image
                  src="/images/logo.jpeg"
                  alt="Kaansa Heritage Logo"
                  fill
                  sizes="44px"
                  className="object-cover scale-[1.35] object-center"
                />
              </div>
              <div>
                <span className="block font-[family-name:var(--font-display)] text-2xl tracking-[0.05em] text-[var(--color-text)] group-hover:text-[var(--color-accent)] transition-colors">
                  KAANSA
                </span>
                <span className="block text-[10px] uppercase tracking-[0.16em] text-[var(--color-gold)] font-[family-name:var(--font-body)]">
                  Crafted for eternity
                </span>
              </div>
            </Link>
            <p className="text-sm font-[family-name:var(--font-body)] text-[var(--color-muted)] max-w-sm leading-relaxed">
              Handcrafted brass and copper heritage pieces from Indian master artisans. Rooted in tradition and crafted for eternity.
            </p>
          </div>

          {/* Shop Column */}
          <div className="md:col-span-3 space-y-3">
            <h3 className="text-xs uppercase tracking-[0.12em] font-semibold text-[var(--color-text)] font-[family-name:var(--font-body)]">
              Collection
            </h3>
            <ul className="space-y-2.5">
              {defaultShopLinks.map((link) => (
                <li key={link.url + link.title}>
                  <Link
                    href={link.url}
                    className="text-xs uppercase tracking-[0.08em] text-[var(--color-muted)] hover:text-[var(--color-accent)] transition-colors font-[family-name:var(--font-body)]"
                  >
                    {link.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* About & Policies Column */}
          <div className="md:col-span-4 space-y-3">
            <h3 className="text-xs uppercase tracking-[0.12em] font-semibold text-[var(--color-text)] font-[family-name:var(--font-body)]">
              About & Assistance
            </h3>
            <ul className="space-y-2.5">
              {(menuItems.length > 0 ? menuItems : defaultBrandLinks).map((link) => (
                <li key={link.url + link.title}>
                  <Link
                    href={link.url}
                    className="text-xs uppercase tracking-[0.08em] text-[var(--color-muted)] hover:text-[var(--color-accent)] transition-colors font-[family-name:var(--font-body)]"
                  >
                    {link.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <Divider className="my-10" />

        <div className="flex flex-col sm:flex-row items-center justify-between text-xs text-[var(--color-muted)] font-[family-name:var(--font-body)] tracking-wide space-y-3 sm:space-y-0">
          <p>© {currentYear} Kaansa. All rights reserved.</p>
          <p>Handcrafted by artisans across India</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
