'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Button from '@/components/ui/Button';

export default function AboutMission() {
  return (
    <section className="bg-[var(--color-bg)] py-20 lg:py-28 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Text: Mission & Invitation */}
          <div className="lg:col-span-7 space-y-6">
            <span className="text-xs uppercase tracking-[0.24em] text-[#C9A24B] font-medium block font-[family-name:var(--font-body)]">
              Looking Forward
            </span>

            <h2 className="font-[family-name:var(--font-display)] text-3xl sm:text-4xl md:text-5xl text-[#2D0B18] uppercase tracking-wide leading-tight">
              Our Sacred Mission
            </h2>

            <p className="font-[family-name:var(--font-heading)] italic text-xl sm:text-2xl text-[#2D0B18] leading-relaxed">
              &ldquo;To inspire mindful, healthy living through traditional metals that enhance your daily lifestyle, artfully promoting well-being, sacred devotion, and artisan dignity.&rdquo;
            </p>

            <p className="text-sm sm:text-base text-[var(--color-muted)] font-light leading-relaxed font-[family-name:var(--font-body)]">
              Whether you are lighting an evening diya in your family temple, sipping revitalizing water from pure copper, dining from ancient bell-metal bronze, or commissioning bespoke personal gift hampers for a loved one&rsquo;s wedding — KAANSA invites you to be part of this living heritage.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-4">
              <Link href="/collections">
                <Button variant="primary" size="md" className="bg-[#2D0B18] text-[#FDF9F3] hover:bg-[#481123]">
                  Explore The Collection
                </Button>
              </Link>
              <Link href="/personal-gifting">
                <Button variant="ghost" size="md">
                  Personal Gifting Atelier
                </Button>
              </Link>
              <a
                href="https://wa.me/917269016093?text=Hi%20Kaansa,%20I%20would%20love%20to%20know%20more%20about%20your%20artisanal%20pieces."
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs uppercase tracking-[0.16em] text-[#2D0B18] hover:text-[#C9A24B] font-medium inline-flex items-center gap-2 transition-colors py-2"
              >
                <span>Concierge On WhatsApp</span>
                <span>→</span>
              </a>
            </div>
          </div>

          {/* Right Visual Box */}
          <div className="lg:col-span-5 relative">
            <div className="relative aspect-[4/5] rounded-xs overflow-hidden border border-[var(--color-border)] shadow-xl">
              <Image
                src="/images/gifting.jpg"
                alt="Handcrafted brass and bell-metal pooja essentials and gifting boxes"
                fill
                sizes="(max-width: 1024px) 100vw, 500px"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#2D0B18]/75 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-5 left-5 right-5 text-white">
                <span className="text-[10px] uppercase tracking-[0.24em] text-[#E8D08A] block font-medium mb-1">
                  Rooted in Tradition
                </span>
                <p className="font-[family-name:var(--font-heading)] text-lg text-[#FDF9F3]">
                  Crafted for Eternity.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
