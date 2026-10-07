'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { siteContact } from '@/lib/site';

interface PolicyLayoutProps {
  title: string;
  subtitle?: string;
  lastUpdated: string;
  children: React.ReactNode;
}

const policyLinks = [
  { title: 'Privacy Policy', href: '/policies/privacy-policy' },
  { title: 'Terms of Service', href: '/policies/terms-of-service' },
  { title: 'Refund Policy', href: '/policies/refund-policy' },
  { title: 'Shipping Policy', href: '/policies/shipping-policy' },
];

export default function PolicyLayout({
  title,
  subtitle,
  lastUpdated,
  children,
}: PolicyLayoutProps) {
  const pathname = usePathname();

  return (
    <div className="bg-[var(--color-bg)] min-h-screen text-[var(--color-text)]">
      {/* Sticky Policy Quick Switcher Subnav */}
      <nav
        aria-label="Legal Policy Navigation"
        className="sticky top-16 md:top-20 z-30 bg-[var(--color-surface)]/95 backdrop-blur-md border-b border-[var(--color-border)] shadow-xs"
      >
        <div className="max-w-4xl mx-auto px-6 overflow-x-auto scrollbar-none">
          <div className="flex items-center space-x-2 sm:space-x-3 py-3 min-w-max">
            {policyLinks.map((p) => {
              const isActive = pathname === p.href;
              return (
                <Link
                  key={p.href}
                  href={p.href}
                  className={`px-4 py-2 text-xs uppercase tracking-[0.14em] font-[family-name:var(--font-body)] font-medium transition-all ${
                    isActive
                      ? 'bg-[#2D0B18] text-[#FDF9F3] border-b-2 border-[#C9A24B] shadow-xs'
                      : 'text-[var(--color-muted)] hover:text-[#2D0B18] hover:bg-[#2D0B18]/5'
                  }`}
                >
                  {p.title}
                </Link>
              );
            })}
          </div>
        </div>
      </nav>

      {/* Main Editorial Document Body */}
      <main className="max-w-4xl mx-auto px-6 py-12 md:py-16">
        <header className="mb-10 pb-6 border-b border-[var(--color-border)]">
          <h1 className="font-[family-name:var(--font-heading)] text-3xl sm:text-4xl md:text-5xl text-[#2D0B18] font-semibold tracking-tight mb-3">
            {title}
          </h1>
          {subtitle && (
            <p className="text-sm sm:text-base text-[var(--color-muted)] font-light leading-relaxed mb-3 max-w-2xl">
              {subtitle}
            </p>
          )}
          <p className="text-xs text-[#C9A24B] tracking-wider uppercase font-medium">
            Last Updated: {lastUpdated}
          </p>
        </header>

        {/* Content styling: Royal Wine headings without borders, high-legibility body */}
        <article className="prose max-w-none text-[var(--color-text)] font-[family-name:var(--font-body)] leading-relaxed text-[15px] sm:text-base space-y-8 [&_h2]:text-[#2D0B18] [&_h2]:font-[family-name:var(--font-heading)] [&_h2]:text-2xl [&_h2]:font-semibold [&_h2]:mt-10 [&_h2]:mb-3 [&_h2]:border-0 [&_h3]:text-[#2D0B18] [&_h3]:font-[family-name:var(--font-heading)] [&_h3]:text-lg [&_h3]:font-semibold [&_h3]:mt-6 [&_h3]:mb-2 [&_p]:text-[var(--color-text)] [&_p]:leading-relaxed [&_p]:mb-4 [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:space-y-2 [&_ul]:mb-4 [&_ol]:list-decimal [&_ol]:pl-6 [&_ol]:space-y-2 [&_ol]:mb-4 [&_strong]:text-[var(--color-text)] [&_strong]:font-semibold [&_a]:text-[#2D0B18] [&_a]:underline hover:[&_a]:text-[#C9A24B]">
          {children}
        </article>

        {/* Registered & Corporate Address Footer */}
        <section className="mt-16 pt-10 border-t border-[var(--color-border)] space-y-6">
          <div className="grid sm:grid-cols-2 gap-8 text-sm">
            <div className="space-y-1.5">
              <h3 className="font-[family-name:var(--font-heading)] text-[#2D0B18] font-semibold text-base">
                Registered Address:
              </h3>
              <p className="font-medium text-[var(--color-text)]">{siteContact.legalName}</p>
              <p className="text-[var(--color-muted)] leading-relaxed">
                865, Gwal Toli, Civil Lines Road, Jhansi, Uttar Pradesh - 284003, India
              </p>
              <p className="text-xs text-[var(--color-muted)] font-mono pt-1">
                GSTIN: {siteContact.gstin}
              </p>
            </div>

            <div className="space-y-1.5">
              <h3 className="font-[family-name:var(--font-heading)] text-[#2D0B18] font-semibold text-base">
                Corporate Address:
              </h3>
              <p className="font-medium text-[var(--color-text)]">{siteContact.legalName}</p>
              <p className="text-[var(--color-muted)] leading-relaxed">
                Civil Lines Road, Jhansi, Uttar Pradesh - 284003, India
              </p>
              <p className="text-xs text-[var(--color-muted)] pt-1">
                Email:{' '}
                <a href={`mailto:${siteContact.email}`} className="text-[#2D0B18] hover:underline font-medium">
                  {siteContact.email}
                </a>
              </p>
              <p className="text-xs text-[var(--color-muted)]">
                Phone / WhatsApp:{' '}
                <a href={`https://wa.me/${siteContact.whatsapp}`} className="text-[#2D0B18] hover:underline font-medium">
                  {siteContact.phone}
                </a>
              </p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
