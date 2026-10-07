'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { MenuItem } from '@/lib/shopify/types';
import { siteContact } from '@/lib/site';

export interface FooterProps {
  menuItems?: MenuItem[];
}

export function Footer({}: FooterProps = {}) {
  const currentYear = new Date().getFullYear();
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) return;
    setSubscribed(true);
    setEmail('');
  };

  // Only link to pages that actually exist in the website
  const knowMoreLinks = [
    { title: 'About KAANSA', url: '/about' },
    { title: 'Personal Gifting', url: '/personal-gifting' },
    { title: 'Collection Catalog', url: '/collections' },
    { title: 'Contact Us', url: '/contact' },
  ];

  const helpLinks = [
    { title: 'Shipping Policy', url: '/policies/shipping-policy' },
    { title: 'Return & Refund Policy', url: '/policies/refund-policy' },
    { title: 'Terms of Service', url: '/policies/terms-of-service' },
    { title: 'Customer Support', url: '/contact' },
  ];

  return (
    <footer className="relative bg-[#2D0B18] text-[#FBF5EA] border-t border-[#3D1222] overflow-hidden">
      {/* Subtle traditional jali pattern overlay */}
      <div
        className="absolute inset-0 opacity-[0.05] pointer-events-none bg-repeat bg-[length:320px_320px]"
        style={{ backgroundImage: 'url(/images/pattern.jpg)' }}
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-16 sm:pt-20 pb-14">
        {/* Main Grid: Newsletter + Owned By + Know More + Help */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 pb-14 border-b border-[#E8D08A]/25">
          {/* Left Column: Community Newsletter & Owned By (span 6) */}
          <div className="lg:col-span-6 space-y-8">
            {/* Newsletter */}
            <div className="space-y-4 max-w-md">
              <h3 className="font-[family-name:var(--font-heading)] text-xl sm:text-2xl font-bold tracking-wide uppercase text-white">
                Be a part of our community!
              </h3>
              
              {subscribed ? (
                <div className="p-4 bg-[#1E0710]/95 border border-[#E8D08A] text-sm sm:text-base text-[#E8D08A] flex items-center gap-2.5">
                  <span>✦</span>
                  <span className="font-medium">Thank you for joining the KAANSA family. Welcome!</span>
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="relative flex items-center">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    required
                    className="w-full bg-[#1E0710]/90 border border-[#E8D08A]/50 px-5 py-3.5 pr-14 text-base text-[#FDF9F3] placeholder-[#E5D2C2]/75 focus:outline-none focus:border-[#E8D08A] focus:bg-[#1E0710] transition-colors"
                  />
                  <button
                    type="submit"
                    aria-label="Subscribe to newsletter"
                    className="absolute right-1 top-1 bottom-1 px-4 flex items-center justify-center text-[#E8D08A] hover:text-white transition-colors cursor-pointer"
                  >
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </form>
              )}

              <p className="text-sm sm:text-[15px] text-[#FDF9F3]/90 font-normal leading-relaxed">
                Be the first to hear about our latest promotions, new products and more.
              </p>
            </div>

            {/* Owned By Box with increased font size */}
            <div className="space-y-2.5 pt-2 max-w-md">
              <h4 className="text-sm uppercase tracking-[0.2em] font-bold text-[#E8D08A]">
                Owned By
              </h4>
              <div className="text-sm sm:text-[15px] text-[#FDF9F3] font-normal leading-relaxed space-y-1">
                <p className="font-semibold text-white text-base">{siteContact.legalName}</p>
                <p className="text-[#E5D2C2]">865, Gwal Toli, Civil Lines Road,</p>
                <p className="text-[#E5D2C2]">Jhansi, Uttar Pradesh - 284003</p>
                <p className="font-mono text-xs sm:text-sm text-[#E8D08A] pt-1">
                  GSTIN: {siteContact.gstin}
                </p>
              </div>
            </div>
          </div>

          {/* Right Columns: Know More & Help (span 6) */}
          <div className="lg:col-span-6 grid grid-cols-2 gap-8 sm:gap-12">
            {/* Know More */}
            <div className="space-y-4">
              <h3 className="text-sm sm:text-base uppercase tracking-[0.2em] font-bold text-[#E8D08A]">
                Know More
              </h3>
              <ul className="space-y-3">
                {knowMoreLinks.map((link) => (
                  <li key={link.url + link.title}>
                    <Link
                      href={link.url}
                      className="text-sm sm:text-[15px] text-[#FDF9F3] hover:text-[#E8D08A] transition-colors font-medium block py-0.5"
                    >
                      {link.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Help */}
            <div className="space-y-4">
              <h3 className="text-sm sm:text-base uppercase tracking-[0.2em] font-bold text-[#E8D08A]">
                Help
              </h3>
              <ul className="space-y-3">
                {helpLinks.map((link) => (
                  <li key={link.url + link.title}>
                    <Link
                      href={link.url}
                      className="text-sm sm:text-[15px] text-[#FDF9F3] hover:text-[#E8D08A] transition-colors font-medium block py-0.5"
                    >
                      {link.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Brand Logo & Social Links Bar */}
        <div className="py-8 sm:py-10 flex flex-col sm:flex-row items-center justify-between gap-6 border-b border-[#E8D08A]/25">
          {/* Logo with Sacred Knot Emblem */}
          <Link
            href="/"
            className="inline-flex items-center gap-4 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E8D08A]"
          >
            <div className="relative w-11 h-11 sm:w-12 sm:h-12 flex-shrink-0 transition-transform duration-300 group-hover:scale-105">
              <Image
                src="/images/kaansa-emblem.png"
                alt="Kaansa Sacred Knot Logo"
                fill
                sizes="48px"
                className="object-contain brightness-0 invert"
              />
            </div>
            <div className="flex flex-col">
              <span className="block font-[family-name:var(--font-display)] text-2xl sm:text-3xl lg:text-4xl tracking-[0.18em] text-[#FDF9F3] font-medium leading-none">
                KAANSA
              </span>
              <span className="block text-xs sm:text-[13px] uppercase tracking-[0.22em] text-[#E8D08A] font-medium mt-1.5">
                Rooted in tradition • Crafted for eternity
              </span>
            </div>
          </Link>

          {/* Social Links Row */}
          <div className="flex items-center gap-4 text-[#E8D08A]">
            {/* Instagram */}
            <a
              href="https://www.instagram.com/kaansaco"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Follow Kaansa on Instagram"
              className="w-10 h-10 rounded-full bg-[#3D1222] hover:bg-[#C9A24B] hover:text-[#2D0B18] border border-[#E8D08A]/40 flex items-center justify-center transition-all hover:scale-110"
            >
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
            </a>

            {/* Facebook */}
            <a
              href="https://www.facebook.com/people/kaansa/61595258097087/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Follow Kaansa on Facebook"
              className="w-10 h-10 rounded-full bg-[#3D1222] hover:bg-[#C9A24B] hover:text-[#2D0B18] border border-[#E8D08A]/40 flex items-center justify-center transition-all hover:scale-110"
            >
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
            </a>

            {/* WhatsApp Support */}
            <a
              href={`https://wa.me/${siteContact.whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Chat with Kaansa Concierge on WhatsApp"
              className="w-10 h-10 rounded-full bg-[#3D1222] hover:bg-[#25D366] hover:text-white border border-[#E8D08A]/40 flex items-center justify-center transition-all hover:scale-110"
            >
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217l.332.007c.106.005.249-.04.39.298.144.347.491 1.2.534 1.288.043.088.072.19.014.305-.058.115-.087.187-.173.289l-.26.309c-.087.086-.177.18-.076.354.101.174.449.741.964 1.201.662.591 1.221.774 1.394.86.174.086.275.072.376-.044.101-.116.433-.506.549-.68.116-.173.231-.144.39-.086s1.011.477 1.184.564.289.13.332.203c.044.072.044.419-.1.824zm-3.423-14.416c-6.627 0-12 5.373-12 12 0 2.155.57 4.178 1.564 5.927l-1.572 5.744 5.894-1.546c1.701.936 3.652 1.475 5.714 1.475 6.627 0 12-5.373 12-12 0-6.627-5.373-12-12-12zm0 21.825c-1.895 0-3.661-.531-5.166-1.451l-.37-.225-3.488.915.931-3.399-.247-.393c-1.026-1.632-1.66-3.565-1.66-5.647 0-5.514 4.486-10 10-10s10 4.486 10 10-4.486 10-10 10z"/>
              </svg>
            </a>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Policy Shortcuts */}
        <div className="pt-6 sm:pt-8 flex flex-col md:flex-row items-center justify-between text-sm sm:text-[15px] text-[#E5D2C2] font-[family-name:var(--font-body)] tracking-wide gap-4">
          <p className="order-2 md:order-1 text-center md:text-left font-normal text-white/90">
            © {currentYear} KAANSA. All Rights Reserved
          </p>

          {/* Policy Shortcut Links separated by | with enlarged legible typography */}
          <nav
            aria-label="Footer Legal Policies"
            className="order-1 md:order-2 flex flex-wrap items-center justify-center gap-x-3 gap-y-2 text-sm sm:text-[15px]"
          >
            <Link
              href="/policies/privacy-policy"
              className="text-[#FDF9F3] hover:text-[#E8D08A] font-medium transition-colors py-0.5"
            >
              Privacy Policy
            </Link>
            <span className="opacity-50 select-none text-[#E8D08A]">|</span>
            <Link
              href="/policies/terms-of-service"
              className="text-[#FDF9F3] hover:text-[#E8D08A] font-medium transition-colors py-0.5"
            >
              Terms of Service
            </Link>
            <span className="opacity-50 select-none text-[#E8D08A]">|</span>
            <Link
              href="/policies/refund-policy"
              className="text-[#FDF9F3] hover:text-[#E8D08A] font-medium transition-colors py-0.5"
            >
              Refund policy
            </Link>
            <span className="opacity-50 select-none text-[#E8D08A]">|</span>
            <Link
              href="/policies/shipping-policy"
              className="text-[#FDF9F3] hover:text-[#E8D08A] font-medium transition-colors py-0.5"
            >
              Shipping Policy
            </Link>
          </nav>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
