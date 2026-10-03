import React from 'react';
import Link from 'next/link';
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
      {/* TODO: replace with public/images/pattern.webp tile at 6% opacity — see website-visuals.json */}
      <div className="max-w-7xl mx-auto px-6 pt-16 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-16">
          {/* Brand Col */}
          <div className="md:col-span-5 space-y-4">
            <Link
              href="/"
              className="inline-block font-[family-name:var(--font-display)] text-2xl tracking-[0.04em] text-[var(--color-text)]"
            >
              KAANSA
            </Link>
            <p className="text-sm font-[family-name:var(--font-body)] text-[var(--color-muted)] max-w-sm leading-relaxed">
              Handcrafted brass and copper heritage pieces from Indian artisans. Made by hand, made to be used every day.
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
