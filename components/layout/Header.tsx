'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import clsx from 'clsx';
import { MenuItem } from '@/lib/shopify/types';
import { useCart } from '@/components/cart/CartContext';

export interface HeaderProps {
  menuItems?: MenuItem[];
}

export function Header({ menuItems = [] }: HeaderProps) {
  const [isVisible, setIsVisible] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { cart, openCart } = useCart();

  const cartCount = cart?.totalQuantity || 0;

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setIsScrolled(currentScrollY > 80);

      if (currentScrollY < 10) {
        setIsVisible(true);
      } else if (currentScrollY > lastScrollY && currentScrollY > 120) {
        setIsVisible(false);
      } else if (currentScrollY < lastScrollY) {
        setIsVisible(true);
      }

      lastScrollY = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks =
    menuItems.length > 0
      ? menuItems
      : [
          { title: 'Home', url: '/' },
          { title: 'Collections', url: '/collections' },
          { title: 'About', url: '/about' },
          { title: 'Contact', url: '/contact' },
        ];

  return (
    <header
      className={clsx(
        'sticky top-0 z-50 transition-transform duration-300 backdrop-blur-md bg-[rgba(251,245,234,0.92)]',
        isVisible ? 'translate-y-0' : '-translate-y-full',
        isScrolled && 'border-b border-[var(--color-border)] shadow-xs'
      )}
    >
      <div className="max-w-7xl mx-auto px-6 h-16 md:h-20 flex items-center justify-between">
        {/* Mobile menu toggle */}
        <div className="flex items-center md:hidden">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-[var(--color-text)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-gold)]"
            aria-label="Toggle navigation menu"
            aria-expanded={mobileMenuOpen}
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              {mobileMenuOpen ? (
                <path d="M18 6L6 18M6 6l12 12" />
              ) : (
                <path d="M3 12h18M3 6h18M3 18h18" />
              )}
            </svg>
          </button>
        </div>

        {/* Logo */}
        <div className="flex-1 md:flex-none text-center md:text-left">
          <Link
            href="/"
            className="inline-block font-[family-name:var(--font-display)] text-2xl md:text-3xl tracking-[0.04em] text-[var(--color-text)] hover:text-[var(--color-accent)] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-gold)]"
          >
            KAANSA
          </Link>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center space-x-8 lg:space-x-10" aria-label="Main Navigation">
          {navLinks.map((item) => (
            <Link
              key={item.url + item.title}
              href={item.url}
              className="text-xs lg:text-sm font-[family-name:var(--font-body)] uppercase tracking-[0.1em] text-[var(--color-text)] hover:text-[var(--color-accent)] transition-colors relative py-1 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-gold)]"
            >
              {item.title}
              <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-[var(--color-gold)] transition-all duration-300 group-hover:w-full" />
            </Link>
          ))}
        </nav>

        {/* Icons */}
        <div className="flex items-center space-x-4 md:space-x-6">
          <Link
            href="/search"
            className="p-2 text-[var(--color-text)] hover:text-[var(--color-accent)] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-gold)]"
            aria-label="Search collection"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.3-4.3" />
            </svg>
          </Link>

          <button
            type="button"
            onClick={openCart}
            className="p-2 text-[var(--color-text)] hover:text-[var(--color-accent)] transition-colors relative focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-gold)] cursor-pointer"
            aria-label={`Open cart with ${cartCount} items`}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
              <path d="M3 6h18" />
              <path d="M16 10a4 4 0 0 1-8 0" />
            </svg>
            {cartCount > 0 && (
              <span className="absolute top-1 right-0 inline-flex items-center justify-center w-4 h-4 text-[10px] font-bold text-white bg-[var(--color-accent)] rounded-full">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Mobile nav drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-[var(--color-border)] bg-[var(--color-surface)] px-6 py-6 transition-all">
          <nav className="flex flex-col space-y-4">
            {navLinks.map((item) => (
              <Link
                key={item.url + item.title}
                href={item.url}
                onClick={() => setMobileMenuOpen(false)}
                className="text-sm font-[family-name:var(--font-body)] uppercase tracking-[0.1em] text-[var(--color-text)] hover:text-[var(--color-accent)] py-1"
              >
                {item.title}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}

export default Header;
