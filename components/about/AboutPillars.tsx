'use client';

import React from 'react';
import Image from 'next/image';

const pillars = [
  {
    title: 'Healthier Meals & Living',
    description:
      'In Ayurveda, bell-metal (Kansa) and copper have been celebrated for millennia. Pure kansa naturally balances doshas, enhances digestion, and carries antimicrobial qualities. Eating from genuine metal is a conscious return to health.',
    tag: 'Ayurvedic Wisdom',
  },
  {
    title: 'Sacred Rituals With Intention',
    description:
      'Our lamps, urlis, and pooja vessels are crafted to hold light, water, and prayer. Each object invites stillness into your daily life, transforming routine domestic moments into sacred ceremonies.',
    tag: 'Daily Devotion',
  },
  {
    title: 'Heirloom Permanence',
    description:
      'Zero toxic coatings, zero non-stick chemicals, zero disposable planned obsolescence. Just honest, solid alloy that ripens with age, gathers natural golden character, and outlives generations.',
    tag: 'Generational Value',
  },
];

export default function AboutPillars() {
  return (
    <section className="bg-[var(--color-bg)] py-20 lg:py-28 border-b border-[var(--color-border)]">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="max-w-2xl mb-14 sm:mb-16">
          <span className="text-xs uppercase tracking-[0.24em] text-[#C9A24B] font-medium block mb-3 font-[family-name:var(--font-body)]">
            Our Commitments
          </span>
          <h2 className="font-[family-name:var(--font-display)] text-3xl sm:text-4xl md:text-5xl text-[#2D0B18] uppercase tracking-wide leading-tight">
            KAANSA Believes in Offering:
          </h2>
          <p className="mt-3 text-sm sm:text-base text-[var(--color-muted)] font-light leading-relaxed">
            At KAANSA, every vessel is a quiet return to intention — a bond between heritage, health, and home. We make with slower hands, but with deeper meaning.
          </p>
        </div>

        {/* Grid: 3 Pillars on Left, Hero Tableware Image on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* 3 Pillars List */}
          <div className="lg:col-span-7 space-y-6">
            {pillars.map((pillar, idx) => (
              <div
                key={pillar.title}
                className="p-6 sm:p-8 bg-[var(--color-surface)]/60 border border-[var(--color-border)] hover:border-[#2D0B18]/40 transition-colors group"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[11px] uppercase tracking-[0.2em] text-[#C9A24B] font-medium font-[family-name:var(--font-body)]">
                    {pillar.tag}
                  </span>
                  <span className="text-xs font-mono text-[var(--color-muted)] group-hover:text-[#2D0B18] transition-colors">
                    0{idx + 1}
                  </span>
                </div>
                <h3 className="font-[family-name:var(--font-heading)] text-xl sm:text-2xl text-[#2D0B18] font-semibold mb-3">
                  {pillar.title}
                </h3>
                <p className="text-sm text-[var(--color-muted)] font-light leading-relaxed font-[family-name:var(--font-body)]">
                  {pillar.description}
                </p>
              </div>
            ))}
          </div>

          {/* Right Visual Box */}
          <div className="lg:col-span-5">
            <div className="relative aspect-[4/5] rounded-xs overflow-hidden border border-[var(--color-border)] shadow-xl">
              <Image
                src="/images/collections-kitchen.jpg"
                alt="Pure handcrafted kansa and brass tableware setting"
                fill
                sizes="(max-width: 1024px) 100vw, 500px"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#2D0B18]/80 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-6 left-6 right-6 text-white text-center sm:text-left">
                <p className="font-[family-name:var(--font-heading)] italic text-lg sm:text-xl text-[#FDF9F3]">
                  &ldquo;A quiet return to intention, bonding heritage and home.&rdquo;
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
