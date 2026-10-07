'use client';

import React from 'react';
import Image from 'next/image';

export default function GiftingAtelier() {
  const handleOrderAtelier = () => {
    const formEl = document.getElementById('catalogue-enquiry');
    if (formEl) {
      formEl.scrollIntoView({ behavior: 'smooth' });
      const pieceInput = document.getElementById('selected-piece') as HTMLInputElement | null;
      if (pieceInput) {
        pieceInput.value = 'The Gifting Atelier Sample Box (₹1,500)';
      }
    }
  };

  return (
    <section className="bg-[#2D0B18] text-[#FBF5EA] py-20 lg:py-28 relative overflow-hidden">
      {/* Background jali pattern */}
      <div
        className="absolute inset-0 opacity-[0.06] pointer-events-none bg-repeat bg-[length:320px_320px]"
        style={{ backgroundImage: 'url(/images/pattern.jpg)' }}
        aria-hidden="true"
      />

      <div className="relative max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Visual Swatch Book Image */}
          <div className="lg:col-span-6 order-2 lg:order-1">
            <div className="relative aspect-[4/3] rounded-xs overflow-hidden border border-[#E8D08A]/35 shadow-[0_20px_50px_rgba(0,0,0,0.6)] group">
              <Image
                src="/images/gifting/atelier-kit.jpg"
                alt="The Gifting Atelier Bound Box with Metal Swatches and Ribbon Samples"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />

              <div className="absolute top-4 left-4 bg-[#2D0B18]/90 backdrop-blur-md text-[#E8D08A] text-[10px] uppercase tracking-[0.2em] px-3 py-1.5 border border-[#E8D08A]/30">
                Bound Presentation Edition
              </div>
            </div>
          </div>

          {/* Copy & Value Proposition matching PDF Page 4 */}
          <div className="lg:col-span-6 order-1 lg:order-2 space-y-6">
            <div>
              <span className="text-[11px] sm:text-xs uppercase tracking-[0.28em] text-[#E8D08A] font-medium font-[family-name:var(--font-body)] block mb-3">
                The Gifting Atelier
              </span>

              <ul className="space-y-1.5 font-[family-name:var(--font-display)] text-2xl sm:text-3xl md:text-4xl uppercase tracking-wider text-[#FDF9F3]">
                <li className="flex items-center gap-3">
                  <span className="text-[#E8D08A]">✦</span> Touch The Metal.
                </li>
                <li className="flex items-center gap-3">
                  <span className="text-[#E8D08A]">✦</span> Feel The Finish.
                </li>
                <li className="flex items-center gap-3">
                  <span className="text-[#E8D08A]">✦</span> Choose With Confidence.
                </li>
              </ul>
            </div>

            <p className="text-sm sm:text-base text-[#D4C3B7] font-light leading-relaxed font-[family-name:var(--font-body)]">
              Prefer to decide with everything in front of you? The Gifting Atelier brings together genuine metal swatches in brass, copper, and kansa, finishes to compare, and the complete range of box fabrics, wraps, ribbons, and wax seal options, all in one bound edition delivered to your door.
            </p>

            {/* Price Callout */}
            <div className="p-5 border border-[#E8D08A]/40 bg-[#1F0711]/60 backdrop-blur-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <span className="font-[family-name:var(--font-heading)] text-2xl sm:text-3xl font-semibold text-[#E8D08A]">
                  ₹1,500/-
                </span>
                <p className="text-[11px] sm:text-xs text-[#FBF5EA] uppercase tracking-[0.14em] mt-0.5">
                  Fully adjusted against your final order
                </p>
              </div>

              <button
                type="button"
                onClick={handleOrderAtelier}
                className="px-6 py-3 bg-[#E8D08A] text-[#2D0B18] hover:bg-[#FBF5EA] font-[family-name:var(--font-body)] text-xs uppercase tracking-[0.18em] font-medium transition-colors shadow-sm cursor-pointer whitespace-nowrap text-center"
              >
                Order The Gifting Atelier
              </button>
            </div>

            <p className="text-xs text-[#E5D2C2]/80 italic">
              Ships within 24 hours across India via express courier. Includes prepaid consultation call with a dedicated gifting curator.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
