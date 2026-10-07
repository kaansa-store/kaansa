'use client';

import React from 'react';
import Image from 'next/image';

const principles = [
  {
    number: '01',
    title: 'Reviving heritage through living craft',
    category: 'Revival',
    desc: 'We protect ancient Indian metallurgical arts from obsolescence by giving generational metalsmith families sustainable, year-round patron demand.',
  },
  {
    number: '02',
    title: 'Designing with purpose, harmony, and beauty',
    category: 'Functional Utility',
    desc: 'Every bell-metal plate, brass urli, and copper carafe is engineered for daily ergonomics — comfortable in the hand, balanced on the table, and stunning to look upon.',
  },
  {
    number: '03',
    title: 'Nourishing homes through ancient wisdom',
    category: 'Ayurveda',
    desc: 'In the ancient texts of Charaka Samhita, Kansa is revered as the purest metal for dining. We preserve this science of wellness for modern lifestyles.',
  },
  {
    number: '04',
    title: 'Honouring every vessel with material purity',
    category: 'Material Purity',
    desc: 'Zero synthetic chemical coatings, zero harmful lead alloys, zero cut corners. Only pure virgin copper, tin, and zinc alloys certified for safety.',
  },
  {
    number: '05',
    title: 'Crafting timeless utility by hand',
    category: 'Craftsmanship',
    desc: 'Every piece is forged with the breath, heat, and hammer strikes of human artisans — creating singular character that industrial presses can never simulate.',
  },
];

export default function AboutPrinciples() {
  return (
    <section className="bg-[var(--color-bg)] py-20 lg:py-28 border-b border-[var(--color-border)]">
      <div className="max-w-7xl mx-auto px-6">
        {/* Top Story Block: Where It All Began */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center mb-20 lg:mb-28">
          <div className="lg:col-span-5 bg-[#2D0B18] text-[#FBF5EA] p-8 sm:p-12 relative overflow-hidden border border-[#E8D08A]/30 shadow-xl">
            <div
              className="absolute inset-0 opacity-[0.06] pointer-events-none bg-repeat bg-[length:280px_280px]"
              style={{ backgroundImage: 'url(/images/pattern.jpg)' }}
              aria-hidden="true"
            />
            <div className="relative z-10 space-y-4">
              <span className="text-xs uppercase tracking-[0.24em] text-[#E8D08A] font-medium block font-[family-name:var(--font-body)]">
                Our Genesis
              </span>
              <h3 className="font-[family-name:var(--font-display)] text-3xl sm:text-4xl text-[#FDF9F3] uppercase tracking-wide leading-tight">
                Where It All Began
              </h3>
              <p className="text-sm text-[#E5D2C2] font-light leading-relaxed font-[family-name:var(--font-body)]">
                KAANSA began with a simple but urgent question: as mass-produced synthetic cookware and disposable home decor flooded urban homes, what was becoming of India&rsquo;s sacred centuries-old metalcraft traditions?
              </p>
              <p className="text-sm text-[#E5D2C2] font-light leading-relaxed font-[family-name:var(--font-body)]">
                What began as a quiet quest to connect discerning patrons with traditional metalsmith workshops in Jhansi, Moradabad, and heritage artisan clusters has grown into a cherished revival movement — bringing mindful eating, sacred ritual, and timeless beauty into thousands of homes.
              </p>
            </div>
          </div>

          <div className="lg:col-span-7 relative">
            <div className="relative aspect-[16/10] w-full rounded-xs overflow-hidden border border-[var(--color-border)] shadow-xl">
              <Image
                src="/images/about-hero.jpg"
                alt="Traditional brass furnace and crafted pieces in an artisan workshop"
                fill
                sizes="(max-width: 1024px) 100vw, 700px"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#2D0B18]/70 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-4 left-4 right-4 bg-[#1E0710]/85 backdrop-blur-md border border-[#E8D08A]/30 p-3 text-xs text-[#FDF9F3] text-center sm:text-left">
                Generational forge in northern India, where sacred bells and dining vessels are beaten by hand.
              </div>
            </div>
          </div>
        </div>

        {/* 5 Principles Numbered List (Reflecting PDF page 4) */}
        <div className="max-w-4xl mx-auto mb-20 lg:mb-24">
          <div className="mb-10 text-center sm:text-left">
            <span className="text-xs uppercase tracking-[0.24em] text-[#C9A24B] font-medium block mb-2 font-[family-name:var(--font-body)]">
              Guiding Ethos
            </span>
            <h3 className="font-[family-name:var(--font-heading)] text-2xl sm:text-3xl lg:text-4xl text-[#2D0B18] uppercase tracking-wide">
              Our Journey is Guided by 5 Principles:
            </h3>
          </div>

          <div className="divide-y divide-[var(--color-border)]">
            {principles.map((item) => (
              <div
                key={item.number}
                className="py-6 sm:py-8 grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-6 items-baseline group hover:bg-[var(--color-surface)]/40 px-4 transition-colors"
              >
                <div className="md:col-span-2">
                  <span className="font-[family-name:var(--font-display)] text-4xl sm:text-5xl text-[#2D0B18] font-normal leading-none group-hover:text-[#C9A24B] transition-colors">
                    {item.number}
                  </span>
                </div>
                <div className="md:col-span-6 space-y-1">
                  <h4 className="font-[family-name:var(--font-heading)] text-lg sm:text-xl text-[#2D0B18] font-semibold leading-snug">
                    {item.title}
                  </h4>
                  <p className="text-xs text-[var(--color-muted)] font-light leading-relaxed">
                    {item.desc}
                  </p>
                </div>
                <div className="md:col-span-4 md:text-right">
                  <span className="inline-block text-[10px] uppercase tracking-[0.2em] font-medium px-3 py-1 bg-[var(--color-surface)] border border-[var(--color-border)] text-[#2D0B18]">
                    {item.category}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Big Central Master Quote (Reflecting PDF page 5) */}
        <div className="max-w-4xl mx-auto text-center py-12 px-6 sm:px-12 bg-[var(--color-surface)]/50 border border-[var(--color-border)] relative">
          <span className="text-3xl sm:text-4xl text-[#C9A24B] font-serif block mb-3">&ldquo;</span>
          <blockquote className="font-[family-name:var(--font-heading)] italic text-xl sm:text-2xl md:text-3xl text-[#2D0B18] leading-relaxed max-w-3xl mx-auto mb-4">
            Honouring ancient techniques, we bring handcrafted tradition into today&rsquo;s modern homes, altar spaces, and kitchens with care, touch, and purpose.
          </blockquote>
          <span className="text-xs uppercase tracking-[0.24em] text-[#C9A24B] font-medium block">
            — The KAANSA Philosophy
          </span>
        </div>
      </div>
    </section>
  );
}
