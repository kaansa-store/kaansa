'use client';

import React, { useState } from 'react';
import Image from 'next/image';

interface GiftingPiece {
  id: string;
  title: string;
  price: string;
  description: string;
  bestFor: string;
  defaultImage: string;
  alternateImage: string;
  boxStyleA: string;
  boxStyleB: string;
}

const pieces: GiftingPiece[] = [
  {
    id: 'brass-dabba',
    title: 'BRASS DABBA HAMPER',
    price: 'From ₹2,450 per gift',
    description: 'Seven-compartment hand-hammered brass masala spice keepsake with tempered lid.',
    bestFor: 'Weddings & family keepsakes',
    defaultImage: '/images/gifting/celebration-sage.jpg',
    alternateImage: '/images/Brass_ghee_pot_and_accessories_20261003152157.jpg',
    boxStyleA: 'Sage Botanical Box',
    boxStyleB: 'Ivory Gold Keepsake Box',
  },
  {
    id: 'brass-paraat',
    title: 'BRASS PARAAT',
    price: 'From ₹2,549 per gift',
    description: 'For the rituals everyone gathers around. Deep scalloped ceremonial brass platter.',
    bestFor: 'Ceremonies and family gifting',
    defaultImage: '/images/gifting/celebration-mithai.jpg',
    alternateImage: '/images/gifting/hero-hampers.jpg',
    boxStyleA: 'Saffron Silk Presentation Box',
    boxStyleB: 'Royal Plum Velvet Box',
  },
  {
    id: 'brass-urli',
    title: 'BRASS URLI WITH FLOATING FLORALS',
    price: 'From ₹1,850 per gift',
    description: 'Traditional wide-lipped hammered vessel for marigolds and glowing floating tealights.',
    bestFor: 'Welcome gifts & auspicious invites',
    defaultImage: '/images/gifting/celebration-wedding.jpg',
    alternateImage: '/images/Brass_diya_and_floral_urli_20261003152347.jpg',
    boxStyleA: 'Royal Crimson Velvet Box',
    boxStyleB: 'Emerald Green Heritage Box',
  },
  {
    id: 'brass-patili',
    title: 'BRASS PATILI, SET OF 2',
    price: 'From ₹3,499 per gift (Made to order)',
    description: 'Tin-lined heavy brass cooking vessels hammered by master craftsmen.',
    bestFor: 'Heirloom family announcements',
    defaultImage: '/images/craftsmanship.jpg',
    alternateImage: '/images/Red_velvet_gift_box_and_20261003152236.jpg',
    boxStyleA: 'Regal Maroon Trunk Box',
    boxStyleB: 'Heritage Gold Brocade Box',
  },
  {
    id: 'kansa-bowl-set',
    title: 'PURE KANSA BABY ANNIVERSARY SET',
    price: 'From ₹2,199 per gift',
    description: 'Ayurvedic bell metal bowl, spoon and heirloom baby rattle in keepsake box.',
    bestFor: 'Baby arrivals & birth announcements',
    defaultImage: '/images/gifting/celebration-baby.jpg',
    alternateImage: '/images/gifting/hero-hampers.jpg',
    boxStyleA: 'Powder Blue Pram Box',
    boxStyleB: 'Midnight Navy Keepsake Box',
  },
  {
    id: 'elephant-urli',
    title: 'ROYAL ELEPHANT BRASS URLI',
    price: 'From ₹2,850 per gift',
    description: 'Carved twin elephant motifs flanking a deep sacred brass urli.',
    bestFor: 'Grand festive hampers & Diwali gifts',
    defaultImage: '/images/Red_velvet_gift_box_holding_20261003152258.jpg',
    alternateImage: '/images/Brass_pooja_essentials_arranged_…_20261003152214.jpg',
    boxStyleA: 'Crimson Velvet Jewel Box',
    boxStyleB: 'Gold Foil Rigid Box',
  },
];

interface HandpickedPiecesProps {
  onSelectPiece?: (pieceTitle: string) => void;
}

export default function HandpickedPieces({ onSelectPiece }: HandpickedPiecesProps) {
  const [activeBoxMap, setActiveBoxMap] = useState<Record<string, 'A' | 'B'>>({});

  const toggleBox = (id: string) => {
    setActiveBoxMap((prev) => ({
      ...prev,
      [id]: prev[id] === 'B' ? 'A' : 'B',
    }));
  };

  const handleEnquire = (title: string) => {
    if (onSelectPiece) {
      onSelectPiece(title);
    }
    const formEl = document.getElementById('catalogue-enquiry');
    if (formEl) {
      formEl.scrollIntoView({ behavior: 'smooth' });
      // prefill piece
      const input = document.getElementById('selected-piece') as HTMLInputElement | null;
      if (input) {
        input.value = title;
      }
    }
  };

  return (
    <section className="bg-[var(--color-bg)] py-20 lg:py-28 border-b border-[var(--color-border)]">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 lg:mb-18 space-y-3">
          <span className="text-[11px] sm:text-xs uppercase tracking-[0.28em] text-[var(--color-gold)] font-medium font-[family-name:var(--font-body)]">
            Handpicked Gifting Options
          </span>
          <h2 className="font-[family-name:var(--font-display)] text-3xl sm:text-4xl lg:text-5xl uppercase tracking-[0.08em] text-[var(--color-text)]">
            Start With The Piece You Love
          </h2>
          <p className="text-sm sm:text-base text-[var(--color-muted)] font-light font-[family-name:var(--font-body)]">
            Next, explore the box designs available. And let us take care of the rest.
          </p>
        </div>

        {/* Product Cards Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
          {pieces.map((item) => {
            const isAlternate = activeBoxMap[item.id] === 'B';
            const currentImg = isAlternate ? item.alternateImage : item.defaultImage;
            const currentBoxLabel = isAlternate ? item.boxStyleB : item.boxStyleA;

            return (
              <div
                key={item.id}
                className="group flex flex-col bg-[var(--color-surface)] border border-[var(--color-border)] transition-all duration-300 hover:shadow-lg hover:border-[var(--color-accent)]"
              >
                {/* Image Container with Box Switcher */}
                <div
                  className="relative aspect-square overflow-hidden bg-[#20110B] cursor-pointer"
                  onClick={() => toggleBox(item.id)}
                  title="Click to view alternate box presentation"
                >
                  <Image
                    src={currentImg}
                    alt={item.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />

                  {/* Box Label Tag */}
                  <div className="absolute top-3 left-3 bg-[#2D0B18]/85 text-[#E8D08A] backdrop-blur-md px-3 py-1 text-[10px] uppercase tracking-[0.16em] font-[family-name:var(--font-body)] border border-[#E8D08A]/30">
                    {currentBoxLabel}
                  </div>

                  {/* Tap prompt */}
                  <div className="absolute bottom-3 right-3 bg-black/60 backdrop-blur-xs text-white/90 text-[10px] px-2.5 py-1 rounded-xs tracking-wider flex items-center gap-1.5 opacity-90 group-hover:opacity-100 transition-opacity">
                    <span>↻ Switch Box</span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <h3 className="font-[family-name:var(--font-heading)] text-lg sm:text-xl font-medium tracking-wide text-[var(--color-text)]">
                      {item.title}
                    </h3>
                    <p className="text-xs uppercase tracking-[0.16em] text-[var(--color-accent)] font-medium mt-1">
                      {item.price}
                    </p>
                    <p className="text-xs sm:text-sm text-[var(--color-muted)] font-light leading-relaxed mt-2.5">
                      {item.description}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-[var(--color-border)]/60 flex items-center justify-between">
                    <span className="text-[11px] text-[var(--color-muted)] italic">
                      Best for: {item.bestFor}
                    </span>
                    <button
                      type="button"
                      onClick={() => handleEnquire(item.title)}
                      className="text-xs uppercase tracking-[0.16em] font-medium text-[var(--color-accent)] hover:text-[var(--color-accent-hover)] underline underline-offset-4 decoration-[var(--color-gold)] cursor-pointer"
                    >
                      Enquire →
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Footnote matching PDF */}
        <div className="text-center mt-12 space-y-6">
          <p className="text-xs sm:text-sm text-[var(--color-muted)] italic font-[family-name:var(--font-body)]">
            Hover or tap to see the same piece in another box design. Box and packaging options start at ₹500 per piece.
          </p>
          <div>
            <button
              type="button"
              onClick={() => handleEnquire('Handpicked Collection Enquiry')}
              className="px-10 py-3.5 bg-[#481123] text-[#FBF5EA] hover:bg-[#681933] font-[family-name:var(--font-body)] text-xs uppercase tracking-[0.2em] font-medium transition-colors shadow-md cursor-pointer"
            >
              Enquire For All Pieces
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
