'use client';

import React, { useState } from 'react';

const faqs = [
  {
    q: 'WHAT IS THE MINIMUM ORDER?',
    a: 'Our bespoke personal gifting collections start from 50 pieces onwards. For intimate milestone gatherings or specialized bridal party gifting, we can accommodate bespoke orders from 25 pieces upon request.',
  },
  {
    q: 'WHAT CAN BE PERSONALIZED?',
    a: 'Virtually every aesthetic touchpoint: box architecture and color palette (12+ shades), laser engraving on metalware (names, dates, family insignias or shlokas), metallic foil stamping on outer and inner lids, deckle-edge cotton rag notes, hand-stamped wax seals, and curated silk potlis.',
  },
  {
    q: 'HOW MUCH TIME DO YOU NEED?',
    a: 'We recommend 3 to 4 weeks from design confirmation to final delivery, allowing our master artisans to hand-hammer each piece and prepare bespoke packaging. For urgent weddings or immediate announcements, express curation is available for select pieces within 10 to 14 days.',
  },
  {
    q: 'CAN YOU DELIVER TO THE VENUE OR TO MULTIPLE CITIES?',
    a: 'Absolutely. We coordinate white-glove delivery directly to your hotel, wedding venue, or family residence across India. We can also handle individual doorstep dispatch to multiple recipient addresses across India and worldwide.',
  },
  {
    q: 'DO YOU OFFER BULK PRICING AND GST INVOICES?',
    a: 'Yes. We offer tiered volume pricing slabs starting at 50, 100, 250, and 500+ units. Full GST tax invoices with 100% input tax credit compliance are issued for all corporate and personal orders.',
  },
  {
    q: 'WHAT IF PIECES ARRIVE DAMAGED?',
    a: 'Every parcel is packed with multi-layered shock-absorbent cushioning and is fully transit insured. In the unlikely event of any transit flaw, simply share a quick photo and our team dispatches an immediate complimentary replacement priority courier.',
  },
];

export default function GiftingFaq() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section className="bg-[var(--color-bg)] py-20 lg:py-28 border-b border-[var(--color-border)]">
      <div className="max-w-4xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-14 lg:mb-18 space-y-3">
          <span className="text-[11px] sm:text-xs uppercase tracking-[0.28em] text-[var(--color-gold)] font-medium font-[family-name:var(--font-body)]">
            You Ask, We Tell
          </span>
          <h2 className="font-[family-name:var(--font-display)] text-3xl sm:text-4xl lg:text-5xl uppercase tracking-[0.08em] text-[var(--color-text)]">
            A Few Things You May Be Wondering
          </h2>
          <p className="text-sm sm:text-base text-[var(--color-muted)] font-light font-[family-name:var(--font-body)]">
            Transparent answers to guide your celebration preparations.
          </p>
        </div>

        {/* Accordion list matching PDF */}
        <div className="space-y-3">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="border border-[var(--color-border)] bg-[var(--color-surface)]/40 overflow-hidden transition-colors"
              >
                <button
                  type="button"
                  onClick={() => toggle(idx)}
                  className="w-full py-4.5 px-6 flex items-center justify-between text-left cursor-pointer hover:bg-[var(--color-surface)] transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[var(--color-gold)]"
                  aria-expanded={isOpen}
                >
                  <span className="font-[family-name:var(--font-heading)] text-xs sm:text-sm font-semibold tracking-[0.14em] text-[var(--color-text)] uppercase">
                    {faq.q}
                  </span>
                  <span
                    className={`ml-4 text-xs text-[var(--color-accent)] transform transition-transform duration-200 ${
                      isOpen ? 'rotate-90' : 'rotate-0'
                    }`}
                  >
                    ▶
                  </span>
                </button>

                {isOpen && (
                  <div className="px-6 pb-5 pt-1 text-xs sm:text-sm text-[var(--color-muted)] font-light leading-relaxed border-t border-[var(--color-border)]/50 font-[family-name:var(--font-body)]">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
