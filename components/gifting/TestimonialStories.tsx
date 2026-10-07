import React from 'react';
import Image from 'next/image';

const testimonials = [
  {
    piece: 'BRASS PARAAT',
    quote: 'We wanted to gift love. Something people can use at home that lasts for generations. Kaansa became our first choice.',
    client: 'Ananya & Harsh Vardhan',
    occasion: 'Royal Wedding Favours • 250 Hampers',
    image: '/images/gifting/celebration-mithai.jpg',
  },
  {
    piece: 'BRASS URLI',
    quote: 'We wanted something organic, something back to our roots for the wedding. That is when we found Kaansa. The craft finish blew everyone away.',
    client: 'Palak & Raghav Goel',
    occasion: 'Destination Wedding Invites • 180 Hampers',
    image: '/images/gifting/celebration-wedding.jpg',
  },
  {
    piece: 'BRASS SPICE DABBA',
    quote: 'We wanted to gift something that people can use every single day and not discard. The engraved brass masala dabbas were the star of the night.',
    client: 'Kunal & Devanshi Shah',
    occasion: 'Grand Milestone Anniversary • 120 Hampers',
    image: '/images/gifting/celebration-sage.jpg',
  },
];

export default function TestimonialStories() {
  return (
    <section className="bg-[var(--color-bg)] py-20 lg:py-28 border-b border-[var(--color-border)]">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 lg:mb-18 space-y-3">
          <span className="text-[11px] sm:text-xs uppercase tracking-[0.28em] text-[var(--color-gold)] font-medium font-[family-name:var(--font-body)]">
            In Their Words
          </span>
          <h2 className="font-[family-name:var(--font-display)] text-3xl sm:text-4xl lg:text-5xl uppercase tracking-[0.08em] text-[var(--color-text)]">
            Why They Chose Kaansa
          </h2>
          <p className="text-sm sm:text-base text-[var(--color-muted)] font-light font-[family-name:var(--font-body)]">
            Every piece is made with intention, carrying the blessings of master craftspeople to your loved ones.
          </p>
        </div>

        {/* 3 Testimonial Cards */}
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((t, idx) => (
            <div
              key={idx}
              className="flex flex-col bg-[var(--color-surface)] border border-[var(--color-border)] overflow-hidden group hover:shadow-lg transition-all duration-300"
            >
              {/* Media Block with subtle play watermark icon */}
              <div className="relative aspect-[4/3] overflow-hidden bg-[#2C1A0E]">
                <Image
                  src={t.image}
                  alt={t.piece}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/35 group-hover:bg-black/20 transition-colors" />

                {/* Video Play Badge like in PDF */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-12 h-12 rounded-full bg-[#FBF5EA]/80 backdrop-blur-xs flex items-center justify-center text-[#2D0B18] shadow-md group-hover:scale-110 transition-transform">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                </div>

                <div className="absolute top-3 left-3 bg-[#2D0B18]/85 text-[#E8D08A] text-[10px] uppercase tracking-[0.16em] px-2.5 py-1">
                  {t.piece}
                </div>
              </div>

              {/* Quote & Author */}
              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <blockquote className="text-xs sm:text-sm text-[var(--color-text)] font-light italic leading-relaxed">
                  &ldquo;{t.quote}&rdquo;
                </blockquote>

                <div className="pt-3 border-t border-[var(--color-border)]">
                  <p className="font-[family-name:var(--font-heading)] text-sm font-semibold text-[var(--color-text)]">
                    {t.client}
                  </p>
                  <p className="text-[11px] text-[var(--color-muted)] uppercase tracking-wider mt-0.5">
                    {t.occasion}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
