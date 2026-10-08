'use client';

import React, { useEffect, useState, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';
import { MenuItem } from '@/lib/shopify/types';
import { useCart } from '@/components/cart/CartContext';
import { getCustomerSessionAction, logoutAction } from '@/app/account/actions';

export interface HeaderProps {
  menuItems?: MenuItem[];
}

export function Header({ menuItems = [] }: HeaderProps) {
  const pathname = usePathname();
  const [prevPathname, setPrevPathname] = useState(pathname);
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  if (prevPathname !== pathname) {
    setPrevPathname(pathname);
    setMobileMenuOpen(false);
  }
  const [customer, setCustomer] = useState<{ firstName: string | null; email: string } | null>(null);
  const [accountDropdownOpen, setAccountDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { cart, openCart } = useCart();

  const cartCount = cart?.totalQuantity || 0;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Check customer session on mount and route transitions
  useEffect(() => {
    let isMounted = true;
    getCustomerSessionAction()
      .then((res) => {
        if (isMounted) setCustomer(res);
      })
      .catch(() => {});

    return () => {
      isMounted = false;
    };
  }, [pathname]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setAccountDropdownOpen(false);
      }
    };

    if (accountDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [accountDropdownOpen]);

  const baseLinks =
    menuItems.length > 0
      ? menuItems
      : [
          { title: 'Home', url: '/' },
          { title: 'Collections', url: '/collections' },
          { title: 'Personal Gifting', url: '/personal-gifting' },
          { title: 'About Us', url: '/about' },
          { title: 'Contact', url: '/contact' },
        ];

  let links = [...baseLinks];

  // Ensure Personal Gifting is in nav
  const hasGifting = links.some((item) => item.url.includes('gifting'));
  if (!hasGifting) {
    const catalogIdx = links.findIndex(
      (item) => item.url.includes('collection') || item.title.toLowerCase().includes('catalog')
    );
    const insertIdx = catalogIdx !== -1 ? catalogIdx + 1 : Math.min(2, links.length);
    links.splice(insertIdx, 0, { title: 'Personal Gifting', url: '/personal-gifting' });
  }

  // Ensure About Us is in nav
  const hasAbout = links.some((item) => item.url === '/about' || item.url.includes('about'));
  if (!hasAbout) {
    const contactIdx = links.findIndex(
      (item) => item.url.includes('contact') || item.title.toLowerCase().includes('contact')
    );
    const insertIdx = contactIdx !== -1 ? contactIdx : links.length;
    links.splice(insertIdx, 0, { title: 'About Us', url: '/about' });
  } else {
    links = links.map((item) =>
      item.url === '/about' || item.url.includes('about')
        ? { ...item, title: item.title === 'About' ? 'About Us' : item.title }
        : item
    );
  }

  const navLinks = links;

  const initial = customer?.firstName ? customer.firstName.charAt(0).toUpperCase() : 'A';

  return (
    <header
      className={clsx(
        'sticky top-0 z-50 w-full backdrop-blur-md bg-[rgba(251,245,234,0.95)] transition-all duration-300',
        isScrolled
          ? 'border-b border-[var(--color-border)] shadow-xs'
          : 'border-b border-transparent'
      )}
    >
      <div className="max-w-7xl mx-auto px-6 h-16 md:h-20 flex items-center justify-between">
        {/* Mobile menu toggle */}
        <div className="flex items-center md:hidden flex-shrink-0 relative z-20">
          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            className="min-w-[44px] min-h-[44px] flex items-center justify-center p-2.5 -ml-2 text-[var(--color-text)] hover:text-[var(--color-accent)] cursor-pointer touch-manipulation focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-gold)] select-none"
            aria-label="Toggle navigation menu"
            aria-expanded={mobileMenuOpen}
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.75"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="pointer-events-none transition-transform duration-200"
            >
              {mobileMenuOpen ? (
                <path d="M18 6L6 18M6 6l12 12" />
              ) : (
                <path d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Logo */}
        <div className="flex-1 md:flex-none flex items-center justify-center md:justify-start min-w-0">
          <Link
            href="/"
            className="inline-flex items-center gap-2.5 sm:gap-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-gold)] group py-1"
          >
            <div className="relative w-9 h-9 sm:w-11 sm:h-11 md:w-12 md:h-12 flex-shrink-0 transition-transform duration-300 group-hover:scale-105">
              <Image
                src="/images/kaansa-emblem.png"
                alt="Kaansa Sacred Knot Emblem"
                fill
                priority
                sizes="48px"
                className="object-contain"
              />
            </div>
            <div className="flex flex-col items-start justify-center">
              <span className="font-[family-name:var(--font-display)] text-2xl sm:text-3xl font-medium tracking-[0.15em] text-[var(--color-text)] group-hover:text-[var(--color-accent)] transition-colors leading-none">
                KAANSA
              </span>
              <span className="text-[9px] uppercase tracking-[0.22em] text-[var(--color-gold)] font-[family-name:var(--font-body)] font-medium mt-1 hidden sm:block">
                Artisan Heritage
              </span>
            </div>
          </Link>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center space-x-6 lg:space-x-8 xl:space-x-10" aria-label="Main Navigation">
          {navLinks.map((item) => {
            const isActive = pathname === item.url;
            return (
              <Link
                key={item.url + item.title}
                href={item.url}
                className={clsx(
                  'text-xs lg:text-sm font-[family-name:var(--font-body)] uppercase tracking-[0.1em] transition-colors relative py-1 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-gold)]',
                  isActive
                    ? 'text-[var(--color-accent)] font-medium'
                    : 'text-[var(--color-text)] hover:text-[var(--color-accent)]'
                )}
              >
                {item.title}
                <span
                  className={clsx(
                    'absolute bottom-0 left-0 h-[1.5px] bg-[var(--color-gold)] transition-all duration-300',
                    isActive ? 'w-full' : 'w-0 group-hover:w-full'
                  )}
                />
              </Link>
            );
          })}
        </nav>

        {/* Icons */}
        <div className="flex items-center space-x-2 sm:space-x-4 md:space-x-5">
          {/* Account Icon / Dropdown */}
          <div className="relative" ref={dropdownRef}>
            {customer ? (
              <div>
                <button
                  type="button"
                  onClick={() => setAccountDropdownOpen(!accountDropdownOpen)}
                  className="flex items-center justify-center w-8 h-8 rounded-full bg-[var(--color-accent)] text-[#FAF6F0] text-xs font-semibold font-[family-name:var(--font-body)] hover:bg-[var(--color-accent-hover)] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-gold)] cursor-pointer"
                  aria-label="Account menu"
                  aria-expanded={accountDropdownOpen}
                >
                  {initial}
                </button>

                {accountDropdownOpen && (
                  <div className="absolute right-0 mt-3 w-56 bg-[var(--color-surface)] border border-[var(--color-border)] shadow-md z-50 p-2 divide-y divide-[var(--color-border)]">
                    <div className="px-3 py-2.5">
                      <p className="text-xs font-[family-name:var(--font-body)] text-[var(--color-muted)] uppercase tracking-wider">
                        Signed in as
                      </p>
                      <p className="text-sm font-[family-name:var(--font-display)] text-[var(--color-text)] font-semibold truncate mt-0.5">
                        {customer.firstName || customer.email}
                      </p>
                    </div>

                    <div className="py-1">
                      <Link
                        href="/account"
                        onClick={() => setAccountDropdownOpen(false)}
                        className="block px-3 py-2 text-xs font-[family-name:var(--font-body)] uppercase tracking-wider text-[var(--color-text)] hover:bg-[var(--color-surface-2)] transition-colors"
                      >
                        Dashboard
                      </Link>
                      <Link
                        href="/account/orders"
                        onClick={() => setAccountDropdownOpen(false)}
                        className="block px-3 py-2 text-xs font-[family-name:var(--font-body)] uppercase tracking-wider text-[var(--color-text)] hover:bg-[var(--color-surface-2)] transition-colors"
                      >
                        Order History
                      </Link>
                      <Link
                        href="/account/addresses"
                        onClick={() => setAccountDropdownOpen(false)}
                        className="block px-3 py-2 text-xs font-[family-name:var(--font-body)] uppercase tracking-wider text-[var(--color-text)] hover:bg-[var(--color-surface-2)] transition-colors"
                      >
                        Saved Addresses
                      </Link>
                    </div>

                    <div className="pt-1">
                      <form action={logoutAction}>
                        <button
                          type="submit"
                          className="w-full text-left px-3 py-2 text-xs font-[family-name:var(--font-body)] uppercase tracking-wider text-[var(--color-muted)] hover:text-[var(--color-danger)] hover:bg-[var(--color-surface-2)] transition-colors cursor-pointer"
                        >
                          Sign out
                        </button>
                      </form>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <Link
                href="/account/login"
                className="p-2 text-[var(--color-text)] hover:text-[var(--color-accent)] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-gold)]"
                aria-label="Sign in to your account"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
              </Link>
            )}
          </div>

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
        <>
          {/* Subtle backdrop to close on outside tap */}
          <div
            onClick={() => setMobileMenuOpen(false)}
            className="md:hidden fixed inset-0 top-16 md:top-20 bg-black/25 backdrop-blur-xs z-10"
            aria-hidden="true"
          />

          <div className="md:hidden border-b border-[var(--color-border)] bg-[var(--color-surface)] px-6 py-6 transition-all max-h-[calc(100dvh-5rem)] overflow-y-auto relative z-20 shadow-lg">
            <nav className="flex flex-col space-y-2">
              {navLinks.map((item) => {
                const isActive = pathname === item.url;
                return (
                  <Link
                    key={item.url + item.title}
                    href={item.url}
                    onClick={() => setMobileMenuOpen(false)}
                    className={clsx(
                      'text-sm font-[family-name:var(--font-body)] uppercase tracking-[0.1em] py-2.5 transition-colors min-h-[44px] flex items-center border-b border-[var(--color-border)]/40 last:border-b-0 touch-manipulation',
                      isActive
                        ? 'text-[var(--color-accent)] font-medium'
                        : 'text-[var(--color-text)] hover:text-[var(--color-accent)]'
                    )}
                  >
                    {item.title}
                  </Link>
                );
              })}

              <div className="pt-4 mt-2 border-t border-[var(--color-border)] flex flex-col space-y-3">
                {customer ? (
                  <>
                    <Link
                      href="/account"
                      onClick={() => setMobileMenuOpen(false)}
                      className="text-sm font-[family-name:var(--font-body)] uppercase tracking-[0.1em] text-[var(--color-accent)] font-medium py-2 min-h-[44px] flex items-center touch-manipulation"
                    >
                      My Account ({customer.firstName || 'Profile'})
                    </Link>
                    <form action={logoutAction}>
                      <button
                        type="submit"
                        className="text-xs font-[family-name:var(--font-body)] uppercase tracking-[0.1em] text-[var(--color-muted)] hover:text-[var(--color-danger)] transition-colors py-2 cursor-pointer touch-manipulation"
                      >
                        Sign out
                      </button>
                    </form>
                  </>
                ) : (
                  <Link
                    href="/account/login"
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-sm font-[family-name:var(--font-body)] uppercase tracking-[0.1em] text-[var(--color-accent)] font-medium py-2 min-h-[44px] flex items-center touch-manipulation"
                  >
                    Sign in / Register
                  </Link>
                )}
              </div>
            </nav>
          </div>
        </>
      )}
    </header>
  );
}

export default Header;
