import React from 'react';
import Image from 'next/image';

const stats = [
  {
    metric: '200 YEARS',
    title: 'OF HERITAGE',
    description: 'Two centuries of metalworking mastery, rooted in a tradition that goes back to the Bronze Age.',
    image: '/images/Artisan_hammering_brass_bowl_20261003152205.jpg',
  },
  {
    metric: '110 CRAFTSMEN',
    title: 'LEFT IN INDIA',
    description: 'Once practiced by 500 families, the rare hand-hammered craft now rests with the last 110 master artisans.',
    image: '/images/Artisan_hammering_brass_bowl_20261003152246.jpg',
  },
  {
    metric: 'UNESCO',
    title: 'RECOGNISED',
    description: 'Inscribed on the UNESCO Representative List of the Intangible Cultural Heritage of Humanity.',
    image: '/images/craftsmanship.jpg',
  },
];

export default function HeritageStats() {
  return (
    <section className="bg-[#180A10] text-[#FBF5EA] py-20 lg:py-28 relative overflow-hidden">
      {/* Background jali pattern */}
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none bg-repeat bg-[length:320px_320px]"
        style={{ backgroundImage: 'url(/images/pattern.jpg)' }}
        aria-hidden="true"
      />

      <div className="relative max-w-7xl mx-auto px-6">
        {/* Quote & Brand Vision matching PDF Page 4 */}
        <div className="text-center max-w-4xl mx-auto mb-16 lg:mb-20 space-y-5">
          <span className="text-[11px] sm:text-xs uppercase tracking-[0.28em] text-[#E8D08A] font-medium font-[family-name:var(--font-body)]">
            Why Kaansa
          </span>

          <blockquote className="font-[family-name:var(--font-display)] text-2xl sm:text-3xl md:text-4xl lg:text-5xl uppercase tracking-wide leading-tight text-[#FDF9F3]">
            &ldquo;Your guests unwrap more than a product. They unwrap a story your family chose to narrate.&rdquo;
          </blockquote>

          <p className="max-w-2xl mx-auto text-xs sm:text-sm text-[#D4C3B7] font-light leading-relaxed font-[family-name:var(--font-body)]">
            At Kaansa, we curate stories and sacred experiences, not just gifts. Tell us what you’re celebrating, and we’ll take care of the details from the first idea to the final bespoke box.
          </p>
        </div>

        {/* 3 Metric Cards with Artisan Photos */}
        <div className="grid md:grid-cols-3 gap-8">
          {stats.map((s, idx) => (
            <div
              key={idx}
              className="bg-[#240C16] border border-[#E8D08A]/30 overflow-hidden flex flex-col group transition-all duration-300 hover:border-[#E8D08A]"
            >
              <div className="relative aspect-[16/10] overflow-hidden">
                <Image
                  src={s.image}
                  alt={s.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#240C16] via-black/40 to-transparent" />
              </div>

              <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between space-y-3">
                <div>
                  <span className="font-[family-name:var(--font-display)] text-2xl sm:text-3xl font-semibold text-[#E8D08A] tracking-wider block">
                    {s.metric}
                  </span>
                  <h3 className="font-[family-name:var(--font-heading)] text-sm sm:text-base tracking-[0.14em] uppercase text-[#FDF9F3] font-medium mt-1">
                    {s.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#D4C3B7] font-light leading-relaxed mt-3">
                    {s.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-[#E8D08A]/20">
                  <span className="text-[10px] uppercase tracking-[0.2em] text-[#E8D08A]/80">
                    Artisan Stewardship
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
