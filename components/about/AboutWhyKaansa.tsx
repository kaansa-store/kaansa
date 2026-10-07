'use client';

import React from 'react';
import Image from 'next/image';

export default function AboutWhyKaansa() {
  return (
    <section className="relative bg-[#2D0B18] text-[#FBF5EA] py-20 lg:py-28 overflow-hidden">
      {/* Subtle traditional jali pattern */}
      <div
        className="absolute inset-0 opacity-[0.06] pointer-events-none bg-repeat bg-[length:360px_360px]"
        style={{ backgroundImage: 'url(/images/pattern.jpg)' }}
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Visual: Artisan Handcrafting Process */}
          <div className="lg:col-span-5 relative">
            <div className="relative aspect-square sm:aspect-[4/3] lg:aspect-[4/5] rounded-xs overflow-hidden border border-[#E8D08A]/30 shadow-2xl">
              <Image
                src="/images/Artisan_hammering_brass_bowl_20261003152205.jpg"
                alt="Master Indian artisan hammering a brass vessel by hand"
                fill
                sizes="(max-width: 1024px) 100vw, 500px"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#2D0B18]/70 via-transparent to-transparent pointer-events-none" />
              
              <div className="absolute bottom-4 left-4 right-4 bg-[#1E0710]/90 backdrop-blur-md border border-[#E8D08A]/30 p-3 sm:p-4 text-xs text-[#E5D2C2]">
                <span className="text-[#E8D08A] font-medium block uppercase tracking-wider text-[10px] mb-0.5">
                  Hand-Hammered Detail
                </span>
                Every facet preserves the energy and touch of a human artisan.
              </div>
            </div>
          </div>

          {/* Right Text Block: Why KAANSA */}
          <div className="lg:col-span-7 space-y-6">
            <span className="text-xs uppercase tracking-[0.24em] text-[#E8D08A] font-medium block font-[family-name:var(--font-body)]">
              The Purpose
            </span>

            <h2 className="font-[family-name:var(--font-display)] text-3xl sm:text-4xl md:text-5xl text-[#FDF9F3] uppercase tracking-wide leading-[1.12]">
              Why KAANSA?
            </h2>

            <p className="font-[family-name:var(--font-body)] text-base sm:text-lg text-[#F5DDCB] font-light leading-relaxed">
              At KAANSA, we work exclusively with <strong className="font-semibold text-white">100% pure, unadulterated metals</strong> — virgin brass, bell-metal bronze (78% copper, 22% tin), and hand-beaten copper. Each piece is shaped by the skilled hands of generations of metalsmith families in India.
            </p>

            <p className="font-[family-name:var(--font-body)] text-sm sm:text-base text-[#E5D2C2] font-light leading-relaxed">
              Every creation is designed not merely for functional utility, but with deep reverence: honouring ancient <strong className="text-white font-medium">Ayurvedic wisdom</strong>, sacred domestic rituals, and the quiet dignity of slow, conscious living.
            </p>

            {/* Pull Quote Box */}
            <div className="p-6 bg-[#1E0710]/80 border-l-2 border-[#E8D08A] text-[#FDF9F3] space-y-2 mt-6">
              <p className="font-[family-name:var(--font-heading)] italic text-lg sm:text-xl leading-relaxed text-[#FDF9F3]">
                &ldquo;In a world of mass production and disposable synthetics, we offer something different: vessels that carry the warmth of a human hand and the legacy of a craft worth preserving.&rdquo;
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
