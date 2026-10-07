'use client';

import React from 'react';
import Image from 'next/image';

const processSteps = [
  {
    step: '01',
    hindi: 'ढलाई (Dhaalai)',
    title: 'Melting & Ingot Casting',
    description:
      'Virgin copper and pure tin (for bell-metal bronze) or brass alloys are heated in intense earthen crucibles until glowing liquid gold, then poured into hand-fashioned ingots.',
    image: '/images/festive-banner.jpg',
  },
  {
    step: '02',
    hindi: 'घड़ाई (Ghadai)',
    title: 'Hot Forging & Hammering',
    description:
      'Red-hot metal is struck in synchronized cadence by teams of master artisans using heavy steel hammers, coaxing flat discs into deep curved vessels without seams.',
    image: '/images/Artisan_hammering_brass_bowl_20261003152205.jpg',
  },
  {
    step: '03',
    hindi: 'खराद (Kharad)',
    title: 'Hand-Turning & Chiseling',
    description:
      'Mounted onto traditional lathes, the artisan carefully uses handheld chisels to shave microscopic imperfections, creating smooth uniform rims and acoustic resonance.',
    image: '/images/craftsmanship.jpg',
  },
  {
    step: '04',
    hindi: 'चमक (Chamak)',
    title: 'Natural Buffing & Luster',
    description:
      'The finished vessel undergoes natural surface polishing with Pitambari, tamarind, and fine linen buffs — bringing out the rich, timeless golden glow without harmful toxic lacquers.',
    image: '/images/Brass_pooja_essentials_arranged_…_20261003152214.jpg',
  },
];

export default function AboutArtisans() {
  return (
    <section className="bg-[var(--color-bg)] py-20 lg:py-28 border-b border-[var(--color-border)]">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Heading & Narrative */}
        <div className="max-w-3xl mx-auto text-center mb-16 sm:mb-20 space-y-4">
          <span className="text-xs uppercase tracking-[0.24em] text-[#C9A24B] font-medium block font-[family-name:var(--font-body)]">
            Generational Mastery
          </span>
          <h2 className="font-[family-name:var(--font-display)] text-3xl sm:text-4xl md:text-5xl text-[#2D0B18] uppercase tracking-wide">
            Our Artisans
          </h2>
          <p className="text-sm sm:text-base text-[var(--color-muted)] font-light leading-relaxed font-[family-name:var(--font-body)]">
            At the heart of KAANSA is the enduring legacy of India&rsquo;s generational metalsmiths — master craftspeople who shape every piece with intention, skill, and soul.
          </p>
          <p className="text-xs sm:text-sm text-[var(--color-muted)] font-light leading-relaxed font-[family-name:var(--font-body)] max-w-2xl mx-auto">
            Each vessel is an unhurried collaboration between ancient heritage and thoughtful ergonomics. When you choose KAANSA, you are not just bringing home an object — you are supporting a living story of artisan dignity and human artistry.
          </p>
        </div>

        {/* Central Medallion Graphic (Smart adaptation from PDF page 3) */}
        <div className="py-10 max-w-xl mx-auto flex items-center justify-center gap-4 sm:gap-8 text-center mb-16">
          <span className="flex-1 h-[1px] bg-gradient-to-r from-transparent via-[#C9A24B] to-[#C9A24B]" />
          <div className="flex flex-col items-center gap-2 px-4">
            <div className="relative w-14 h-14 sm:w-16 sm:h-16 flex items-center justify-center rounded-full bg-[#2D0B18] border-2 border-[#C9A24B] shadow-lg p-2.5">
              <Image
                src="/images/kaansa-emblem.png"
                alt="Kaansa Sacred Knot Emblem"
                fill
                sizes="64px"
                className="object-contain p-2 brightness-0 invert"
              />
            </div>
            <span className="text-[11px] uppercase tracking-[0.22em] text-[#2D0B18] font-medium font-[family-name:var(--font-body)]">
              At Our Core Lies Craftsmanship
            </span>
          </div>
          <span className="flex-1 h-[1px] bg-gradient-to-l from-transparent via-[#C9A24B] to-[#C9A24B]" />
        </div>

        {/* Process Showcase: 4 Steps */}
        <div className="mt-8">
          <div className="text-center mb-12">
            <h3 className="font-[family-name:var(--font-heading)] text-2xl sm:text-3xl text-[#2D0B18] tracking-wide">
              Dive Deeper Into Our Process
            </h3>
            <p className="text-xs uppercase tracking-[0.16em] text-[var(--color-muted)] mt-1 font-light">
              From raw alloy ingot to generational heirloom
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {processSteps.map((p) => (
              <div
                key={p.step}
                className="group bg-[var(--color-surface)]/60 border border-[var(--color-border)] overflow-hidden flex flex-col hover:border-[#2D0B18]/40 transition-all duration-300 shadow-xs hover:shadow-md"
              >
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#2D0B18]">
                  <Image
                    src={p.image}
                    alt={p.title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className="object-cover opacity-85 group-hover:scale-105 group-hover:opacity-95 transition-all duration-500"
                  />
                  <div className="absolute top-3 left-3 bg-[#2D0B18]/90 text-[#E8D08A] font-mono text-[11px] px-2.5 py-1 border border-[#E8D08A]/30">
                    Step {p.step}
                  </div>
                </div>

                <div className="p-5 flex-1 flex flex-col justify-between space-y-2">
                  <div>
                    <span className="text-[10px] uppercase tracking-[0.18em] text-[#C9A24B] font-semibold block">
                      {p.hindi}
                    </span>
                    <h4 className="font-[family-name:var(--font-heading)] text-lg text-[#2D0B18] font-semibold mt-1">
                      {p.title}
                    </h4>
                  </div>
                  <p className="text-xs text-[var(--color-muted)] font-light leading-relaxed font-[family-name:var(--font-body)]">
                    {p.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
