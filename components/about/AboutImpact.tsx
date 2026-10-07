'use client';

import React from 'react';
import Image from 'next/image';

const impactPoints = [
  {
    icon: '✦',
    title: 'Sustained Artisan Incomes',
    desc: 'Fair, predictable compensation directly to metalsmith master families, eliminating predatory middle layers.',
  },
  {
    icon: '✦',
    title: 'Over 85+ Craft Families Impacted',
    desc: 'Supporting multi-generational artisan households across Uttar Pradesh and traditional metallurgical clusters.',
  },
  {
    icon: '✦',
    title: 'Preserving Intangible Cultural Heritage',
    desc: 'Keeping the ancient science of sand-casting and bell-metal beating thriving for the next generation of youth.',
  },
  {
    icon: '✦',
    title: 'Zero Chemical Non-Stick Coatings',
    desc: 'Freeing contemporary dining tables from synthetic PFAS and Teflon microplastics with pure, honest metal.',
  },
  {
    icon: '✦',
    title: 'Generational Craft Longevity',
    desc: 'Every piece is crafted to be used daily, polished with natural pitambari, and gifted down as family heirlooms.',
  },
];

export default function AboutImpact() {
  return (
    <section className="bg-[var(--color-bg)] py-20 lg:py-28 border-b border-[var(--color-border)]">
      <div className="max-w-7xl mx-auto px-6">
        {/* Eyebrow & Title */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <span className="text-xs uppercase tracking-[0.24em] text-[#C9A24B] font-medium block font-[family-name:var(--font-body)]">
            We Rise By Lifting Others
          </span>
          <h2 className="font-[family-name:var(--font-display)] text-3xl sm:text-4xl md:text-5xl text-[#2D0B18] uppercase tracking-wide">
            Our Living Impact
          </h2>
          <p className="text-sm sm:text-base text-[var(--color-muted)] font-light leading-relaxed">
            KAANSA is more than an atelier of sacred metalware — it is an active movement preserving human mastery over assembly lines.
          </p>
        </div>

        {/* Impact Hero Box (Royal Wine #2D0B18 with gold accents) */}
        <div className="bg-[#2D0B18] text-[#FBF5EA] border border-[#E8D08A]/30 relative overflow-hidden shadow-2xl">
          <div
            className="absolute inset-0 opacity-[0.05] pointer-events-none bg-repeat bg-[length:320px_320px]"
            style={{ backgroundImage: 'url(/images/pattern.jpg)' }}
            aria-hidden="true"
          />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center p-8 sm:p-12 lg:p-16">
            {/* Left Impact List */}
            <div className="lg:col-span-7 space-y-6">
              <div className="border-b border-[#E8D08A]/20 pb-4">
                <h3 className="font-[family-name:var(--font-heading)] text-2xl sm:text-3xl text-[#FDF9F3]">
                  How Your Choices Make a Difference
                </h3>
                <p className="text-xs sm:text-sm text-[#E5D2C2] font-light mt-1">
                  Every order directly fuels the hands of Indian master metalworkers.
                </p>
              </div>

              <div className="space-y-4 pt-2">
                {impactPoints.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-4">
                    <span className="text-[#E8D08A] text-sm mt-0.5 select-none">
                      {item.icon}
                    </span>
                    <div className="space-y-0.5">
                      <h4 className="text-sm sm:text-base font-semibold text-[#FDF9F3] font-[family-name:var(--font-body)]">
                        {item.title}
                      </h4>
                      <p className="text-xs sm:text-sm text-[#E5D2C2] font-light leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Artisan Photography Box */}
            <div className="lg:col-span-5 relative">
              <div className="relative aspect-[4/5] rounded-xs overflow-hidden border border-[#E8D08A]/40 shadow-xl">
                <Image
                  src="/images/craftsmanship.jpg"
                  alt="Indian artisan beating metal with precision hammer in traditional workshop"
                  fill
                  sizes="(max-width: 1024px) 100vw, 450px"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1E0710]/85 via-transparent to-transparent pointer-events-none" />
                <div className="absolute bottom-4 left-4 right-4 bg-[#1E0710]/90 backdrop-blur-md border border-[#E8D08A]/30 p-3 text-center text-xs text-[#E8D08A]">
                  Preserving indigenous craft families with pride and equity.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
