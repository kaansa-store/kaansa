'use client';

import React from 'react';
import Image from 'next/image';

export default function AboutHero() {
  return (
    <section className="relative bg-[var(--color-bg)] text-[var(--color-text)] pt-12 md:pt-16 pb-16 lg:pb-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        {/* Top Eyebrow & Headline */}
        <div className="max-w-3xl mb-8 sm:mb-12">
          <span className="text-xs uppercase tracking-[0.24em] text-[#C9A24B] font-medium block mb-3 font-[family-name:var(--font-body)]">
            Heritage &amp; Origins
          </span>
          <h1 className="font-[family-name:var(--font-display)] text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-[#2D0B18] font-normal leading-[1.08] tracking-tight">
            Artful Utility, <br />
            <span className="italic text-[#C9A24B]">Rooted in Craft.</span>
          </h1>
        </div>

        {/* Hero Visual Box */}
        <div className="relative aspect-[16/9] sm:aspect-[21/9] w-full rounded-xs overflow-hidden border border-[var(--color-border)] shadow-xl mb-12 lg:mb-16">
          <Image
            src="/images/Brass_diya_and_floral_urli_20261003152347.jpg"
            alt="Handcrafted brass urli and kansa tableware arranged on a warm marble surface"
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#2D0B18]/60 via-transparent to-transparent pointer-events-none" />
          <div className="absolute bottom-4 left-4 sm:bottom-6 sm:left-6 bg-[#2D0B18]/85 backdrop-blur-md border border-[#E8D08A]/30 px-4 py-2 text-white text-[11px] sm:text-xs uppercase tracking-[0.18em]">
            Pure Brass • Bell-Metal Kansa • Hammered Copper
          </div>
        </div>

        {/* Lead Narrative Text (Reflecting PDF page 1 tone) */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12 items-start border-b border-[var(--color-border)] pb-14">
          <div className="md:col-span-5">
            <p className="font-[family-name:var(--font-heading)] italic text-2xl sm:text-3xl text-[#2D0B18] leading-snug">
              &ldquo;Every legacy begins quietly — like the rhythm of metal being shaped by hand.&rdquo;
            </p>
          </div>
          <div className="md:col-span-7 space-y-4 text-sm sm:text-base text-[var(--color-muted)] font-light leading-relaxed font-[family-name:var(--font-body)]">
            <p>
              Every heirloom begins with a quiet rhythm — the resonant chime of struck bell-metal, the patience of molten alloy poured into time-tested moulds, or the steady, measured blow of a mallet echoing across an artisan&rsquo;s workshop. <strong>KAANSA</strong> was born from that quiet reverence for authentic Indian metallurgy.
            </p>
            <p>
              We are a purpose-led brand rooted in pure, honest craft. We partner directly with generational master metalsmiths across India to create timeless, functional pieces for your sacred altar, dining table, and daily lifestyle.
            </p>
            <p>
              We honour India&rsquo;s diverse metallurgic heritage by creating functional art: vessels that hold not just food and water, but stories, rituals, and mindful intention. Handcrafted using ancient hammering and casting techniques, our brass, copper, and bronze creations carry forward a living legacy, thoughtfully tailored for modern homes.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
