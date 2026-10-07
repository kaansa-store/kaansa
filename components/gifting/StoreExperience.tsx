import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function StoreExperience() {
  return (
    <section className="bg-[var(--color-bg)] py-20 lg:py-28">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 lg:mb-18 space-y-3">
          <span className="text-[11px] sm:text-xs uppercase tracking-[0.28em] text-[var(--color-gold)] font-medium font-[family-name:var(--font-body)]">
            Experience In Person
          </span>
          <h2 className="font-[family-name:var(--font-display)] text-3xl sm:text-4xl lg:text-5xl uppercase tracking-[0.08em] text-[var(--color-text)]">
            See It Before You Choose
          </h2>
          <p className="text-sm sm:text-base text-[var(--color-muted)] font-light font-[family-name:var(--font-body)]">
            Come, hold the metal, compare the finishes, and see how the pieces and presentation come together. Visit our experience space, or order the Gifting Atelier and explore it at home.
          </p>
        </div>

        {/* Gallery */}
        <div className="grid md:grid-cols-12 gap-6 items-stretch">
          <div className="md:col-span-7 relative min-h-[320px] sm:min-h-[420px] border border-[var(--color-border)] overflow-hidden group">
            <Image
              src="/images/Carved_niche_holding_brass_pieces_20261003152358.jpg"
              alt="Kaansa metalware atelier collection showcase"
              fill
              sizes="(max-width: 768px) 100vw, 60vw"
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
            <div className="absolute bottom-6 left-6 right-6 text-white">
              <span className="text-[10px] uppercase tracking-[0.2em] text-[var(--color-gold-light)] block mb-1">
                The Heritage Gallery
              </span>
              <p className="font-[family-name:var(--font-display)] text-xl sm:text-2xl">
                Sacred brass &amp; kansa dinnerware arranged in traditional teak alcoves
              </p>
            </div>
          </div>

          <div className="md:col-span-5 flex flex-col gap-6">
            <div className="relative flex-1 min-h-[190px] border border-[var(--color-border)] overflow-hidden group">
              <Image
                src="/images/Console_shelf_with_brass_items_20261003152049.jpg"
                alt="Brass curation details and tabletop displays"
                fill
                sizes="(max-width: 768px) 100vw, 40vw"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <span className="text-[10px] uppercase tracking-[0.2em] text-[var(--color-gold-light)]">
                  Tabletop Living
                </span>
                <p className="text-sm font-medium">Warm illumination &amp; hammered silhouettes</p>
              </div>
            </div>

            <div className="relative flex-1 min-h-[190px] border border-[var(--color-border)] overflow-hidden group">
              <Image
                src="/images/gifting/atelier-kit.jpg"
                alt="The Gifting Atelier sampler kit delivered to your doorstep"
                fill
                sizes="(max-width: 768px) 100vw, 40vw"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <span className="text-[10px] uppercase tracking-[0.2em] text-[var(--color-gold-light)]">
                  At Home Sampling
                </span>
                <p className="text-sm font-medium">Order the bound metal swatch edition anywhere in India</p>
              </div>
            </div>
          </div>
        </div>

        {/* Action Link */}
        <div className="text-center mt-12 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/contact"
            className="text-xs uppercase tracking-[0.2em] font-medium text-[var(--color-accent)] hover:text-[var(--color-accent-hover)] underline underline-offset-4 decoration-[var(--color-gold)]"
          >
            Schedule A Private Store Consultation →
          </Link>
        </div>
      </div>
    </section>
  );
}
