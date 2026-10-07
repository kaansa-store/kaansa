'use client';

import React from 'react';
import Image from 'next/image';

const craftPhrases = [
  'Handcrafted by Master Artisans',
  'Made in India',
  'UNESCO-Recognised Craft Tradition',
  'Pure Brass, Copper & Kansa',
  'Passed Down For Generations',
  'No Toxic Coatings',
];

export default function GiftingHero() {
  const tickerItems = [...craftPhrases, ...craftPhrases];

  const scrollToForm = () => {
    const el = document.getElementById('catalogue-enquiry');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative overflow-hidden bg-[#2D0B18] text-[#FBF5EA]">
      {/* Subtle luxury damask background pattern */}
      <div
        className="absolute inset-0 opacity-[0.07] pointer-events-none bg-repeat bg-[length:360px_360px]"
        style={{ backgroundImage: 'url(/images/pattern.jpg)' }}
        aria-hidden="true"
      />

      <div className="relative max-w-7xl mx-auto px-6 pt-16 sm:pt-20 lg:pt-24 pb-16 lg:pb-24">
        {/* Top Header Block */}
        <div className="text-center max-w-4xl mx-auto space-y-4 sm:space-y-6">
          <span className="inline-block text-[11px] sm:text-xs uppercase tracking-[0.3em] text-[#E8D08A] font-medium font-[family-name:var(--font-body)]">
            Gifts, Made Personal
          </span>

          <h1 className="font-[family-name:var(--font-display)] text-3xl sm:text-5xl md:text-6xl lg:text-7xl tracking-wide uppercase leading-[1.08] text-[#FDF9F3]">
            Wedding Favours. Baby Announcements. Special Invitations. Handcrafted in Brass, Copper and Kansa.
          </h1>

          <p className="max-w-2xl mx-auto text-sm sm:text-base text-[#E5D2C2] font-light leading-relaxed font-[family-name:var(--font-body)]">
            Heirloom metalware curated with bespoke box palettes, personalized monograms, and wax-sealed parchment notes. Designed to be cherished for lifetimes.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 pt-2">
            <button
              type="button"
              onClick={scrollToForm}
              className="w-full sm:w-auto px-8 py-3.5 bg-[#FBF5EA] text-[#2D0B18] hover:bg-[#E8D08A] font-[family-name:var(--font-body)] text-xs uppercase tracking-[0.18em] font-medium transition-all duration-300 shadow-md hover:shadow-lg cursor-pointer"
            >
              Request The Catalogue
            </button>

            <a
              href="https://wa.me/917269016093?text=Hi%20Kaansa,%20I'm%20planning%20personal%20gifting%20and%20would%20love%20to%20view%20the%20catalogue%20and%20discuss%20curated%20options."
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-8 py-3.5 border border-[#E8D08A]/60 text-[#FBF5EA] hover:border-[#E8D08A] hover:bg-[#E8D08A]/10 font-[family-name:var(--font-body)] text-xs uppercase tracking-[0.18em] font-medium transition-all duration-300 inline-flex items-center justify-center gap-2"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-5.46-4.45-9.92-9.91-9.92zm5.83 14.05c-.24.68-1.42 1.31-1.95 1.39-.53.08-1.22.12-3.54-.79-2.95-1.15-4.86-4.14-5.01-4.33-.14-.2-1.21-1.61-1.21-3.07s.76-2.18 1.03-2.47c.27-.3.59-.37.79-.37.2 0 .4 0 .58.01.19.01.44-.07.69.52.26.61.88 2.14.95 2.3.08.15.13.33.03.53-.1.2-.15.33-.3.51-.15.18-.32.41-.46.55-.15.15-.31.32-.13.63.18.3 1.23 2.03 2.64 3.28 1.81 1.61 3.34 2.11 3.81 2.34.47.23.75.19 1.03-.13.28-.32 1.2-1.4 1.52-1.88.32-.48.64-.4.1.75z" />
              </svg>
              Say Hello On WhatsApp
            </a>
          </div>
        </div>

        {/* Hero Visual Box Display */}
        <div className="mt-12 sm:mt-16 relative">
          <div className="relative aspect-[16/9] w-full max-w-5xl mx-auto rounded-xs overflow-hidden border border-[#E8D08A]/30 shadow-[0_24px_60px_-15px_rgba(0,0,0,0.6)]">
            <Image
              src="/images/gifting/hero-hampers.jpg"
              alt="Bespoke artisanal Kaansa gift hampers in tiered jewel-toned presentation boxes"
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 1152px"
              className="object-cover"
            />
            {/* Subtle bottom vignette overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#2D0B18]/80 via-transparent to-transparent pointer-events-none" />

            {/* Price & Minimum Badge */}
            <div className="absolute bottom-4 left-4 right-4 sm:left-auto sm:right-6 sm:bottom-6 bg-[#2D0B18]/90 backdrop-blur-md border border-[#E8D08A]/40 px-5 py-2.5 sm:py-3 text-center sm:text-right">
              <p className="text-xs sm:text-sm uppercase tracking-[0.2em] font-[family-name:var(--font-body)] text-[#FDF9F3]">
                <span className="text-[#E8D08A] font-medium">₹1,500 – ₹8,000</span> per gift
                <span className="mx-2 text-[#E8D08A]/60">|</span>
                <span className="text-[#E5D2C2]">50 pieces onwards</span>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Marquee Ribbon */}
      <div className="relative overflow-hidden bg-[#C9A24B] text-[#2D0B18] py-3 border-y border-[#E8D08A]">
        <div className="marquee-track flex w-max items-center hover:[animation-play-state:paused]">
          {tickerItems.map((text, i) => (
            <span
              key={i}
              aria-hidden={i >= craftPhrases.length}
              className="flex items-center gap-6 px-6 text-[11px] sm:text-xs uppercase tracking-[0.24em] font-[family-name:var(--font-body)] font-medium whitespace-nowrap"
            >
              {text}
              <span className="text-[#2D0B18]/50 text-[10px]">✦</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
