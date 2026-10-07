'use client';

import React, { useState } from 'react';
import Image from 'next/image';

type TabKey = 'box-palette' | 'names-dates' | 'wax-seals' | 'custom-wrapping';

interface PaletteOption {
  name: string;
  colorHex: string;
  image: string;
  caption: string;
}

const boxPalettes: PaletteOption[] = [
  {
    name: 'Powder Blue',
    colorHex: '#9BB8CD',
    image: '/images/gifting/celebration-baby.jpg',
    caption: "The 'Welcome Little One' pram box in powder blue with gold foil trim.",
  },
  {
    name: 'Royal Midnight Navy',
    colorHex: '#182747',
    image: '/images/gifting/hero-hampers.jpg',
    caption: 'The Royal Midnight Navy rigid box paired with hammered brass bowls and gold silk lining.',
  },
  {
    name: 'Imperial Crimson Velvet',
    colorHex: '#521427',
    image: '/images/gifting/celebration-wedding.jpg',
    caption: 'The Imperial Crimson Velvet hexagonal box with embossed golden wedding blessing.',
  },
  {
    name: 'Sage Botanical',
    colorHex: '#819A7E',
    image: '/images/gifting/celebration-sage.jpg',
    caption: 'The Sage Botanical linen keepsake box with gold foil eucalyptus detailing.',
  },
  {
    name: 'Saffron & Sunkissed Gold',
    colorHex: '#D97724',
    image: '/images/gifting/celebration-mithai.jpg',
    caption: 'The Festive Saffron presentation platter box with auspicious zari border.',
  },
];

export default function PersonalisationSuite() {
  const [activeTab, setActiveTab] = useState<TabKey>('box-palette');
  const [selectedPalette, setSelectedPalette] = useState<PaletteOption>(boxPalettes[0]);

  return (
    <section className="bg-[var(--color-bg)] py-20 lg:py-28 border-b border-[var(--color-border)]">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 lg:mb-16 space-y-3">
          <span className="text-[11px] sm:text-xs uppercase tracking-[0.28em] text-[var(--color-gold)] font-medium font-[family-name:var(--font-body)]">
            Personalisation
          </span>
          <h2 className="font-[family-name:var(--font-display)] text-3xl sm:text-4xl lg:text-5xl uppercase tracking-[0.08em] text-[var(--color-text)]">
            Make It Uniquely Yours
          </h2>
          <p className="text-sm sm:text-base text-[var(--color-muted)] font-light font-[family-name:var(--font-body)]">
            Choose the colours, names, notes, wraps, and seals that feel right for your celebration. We&rsquo;ll share a free design mock-up before you commit.
          </p>
        </div>

        {/* 4 Interactive Selector Tabs matching PDF Page 3 */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-10 sm:mb-14">
          <button
            type="button"
            onClick={() => setActiveTab('box-palette')}
            className={`px-5 py-3 text-xs uppercase tracking-[0.16em] font-[family-name:var(--font-body)] font-medium transition-all cursor-pointer border ${
              activeTab === 'box-palette'
                ? 'bg-[#481123] text-[#FBF5EA] border-[#481123] shadow-sm'
                : 'bg-transparent text-[var(--color-text)] border-[var(--color-border)] hover:border-[var(--color-accent)]'
            }`}
          >
            Your Box, In Your Palette
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('names-dates')}
            className={`px-5 py-3 text-xs uppercase tracking-[0.16em] font-[family-name:var(--font-body)] font-medium transition-all cursor-pointer border ${
              activeTab === 'names-dates'
                ? 'bg-[#481123] text-[#FBF5EA] border-[#481123] shadow-sm'
                : 'bg-transparent text-[var(--color-text)] border-[var(--color-border)] hover:border-[var(--color-accent)]'
            }`}
          >
            Names and Dates
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('wax-seals')}
            className={`px-5 py-3 text-xs uppercase tracking-[0.16em] font-[family-name:var(--font-body)] font-medium transition-all cursor-pointer border ${
              activeTab === 'wax-seals'
                ? 'bg-[#481123] text-[#FBF5EA] border-[#481123] shadow-sm'
                : 'bg-transparent text-[var(--color-text)] border-[var(--color-border)] hover:border-[var(--color-accent)]'
            }`}
          >
            Wax-Sealed Personal Notes
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('custom-wrapping')}
            className={`px-5 py-3 text-xs uppercase tracking-[0.16em] font-[family-name:var(--font-body)] font-medium transition-all cursor-pointer border ${
              activeTab === 'custom-wrapping'
                ? 'bg-[#481123] text-[#FBF5EA] border-[#481123] shadow-sm'
                : 'bg-transparent text-[var(--color-text)] border-[var(--color-border)] hover:border-[var(--color-accent)]'
            }`}
          >
            Custom Wrapping &amp; Potlis
          </button>
        </div>

        {/* Tab Content Display */}
        <div className="bg-[var(--color-surface)] border border-[var(--color-border)] p-6 sm:p-10 max-w-5xl mx-auto shadow-sm">
          {activeTab === 'box-palette' && (
            <div className="grid md:grid-cols-12 gap-8 items-center">
              <div className="md:col-span-7">
                <div className="relative aspect-[4/3] overflow-hidden bg-[#2C1A0E] border border-[var(--color-border)]">
                  <Image
                    src={selectedPalette.image}
                    alt={selectedPalette.name}
                    fill
                    sizes="(max-width: 768px) 100vw, 600px"
                    className="object-cover transition-all duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent pointer-events-none" />
                  <p className="absolute bottom-3 left-4 right-4 text-xs text-[#FBF5EA] font-light italic">
                    {selectedPalette.caption}
                  </p>
                </div>
              </div>

              <div className="md:col-span-5 space-y-6">
                <div>
                  <span className="text-[10px] uppercase tracking-[0.2em] text-[var(--color-gold)] font-medium">
                    Option 01: Box Architecture &amp; Hue
                  </span>
                  <h3 className="font-[family-name:var(--font-display)] text-2xl sm:text-3xl text-[var(--color-text)] mt-1">
                    Select Your Box Palette
                  </h3>
                  <p className="text-xs sm:text-sm text-[var(--color-muted)] font-light leading-relaxed mt-2">
                    Click each hue to preview in real-time. We craft rigid board boxes, velvet trunks, and textured linen cases in 12+ royal shades.
                  </p>
                </div>

                <div className="space-y-3">
                  <span className="text-xs uppercase tracking-wider text-[var(--color-text)] font-medium block">
                    Curated Palettes:
                  </span>
                  <div className="flex flex-wrap gap-3">
                    {boxPalettes.map((p) => (
                      <button
                        key={p.name}
                        type="button"
                        onClick={() => setSelectedPalette(p)}
                        className={`group flex items-center gap-2.5 px-3 py-2 border text-xs transition-all cursor-pointer ${
                          selectedPalette.name === p.name
                            ? 'border-[var(--color-accent)] bg-[var(--color-bg)] font-medium shadow-xs'
                            : 'border-[var(--color-border)] bg-transparent hover:border-[var(--color-accent)]'
                        }`}
                      >
                        <span
                          className="w-4 h-4 rounded-full shadow-inner border border-black/10"
                          style={{ backgroundColor: p.colorHex }}
                        />
                        <span className="text-[var(--color-text)]">{p.name}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-[var(--color-border)]">
                  <p className="text-xs text-[var(--color-muted)] italic">
                    ✦ Have an exact wedding pantone or invitation color? We match custom pantone codes for orders above 75 pieces.
                  </p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'names-dates' && (
            <div className="grid md:grid-cols-12 gap-8 items-center">
              <div className="md:col-span-7">
                <div className="relative aspect-[4/3] overflow-hidden bg-[#2C1A0E] border border-[var(--color-border)]">
                  <Image
                    src="/images/gifting/celebration-wedding.jpg"
                    alt="Custom Name & Date Laser Etching"
                    fill
                    sizes="(max-width: 768px) 100vw, 600px"
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent pointer-events-none" />
                  <p className="absolute bottom-3 left-4 right-4 text-xs text-[#FBF5EA] font-light italic">
                    Bespoke metallic gold foil stamped lid with couple&rsquo;s names and auspicious date.
                  </p>
                </div>
              </div>

              <div className="md:col-span-5 space-y-5">
                <div>
                  <span className="text-[10px] uppercase tracking-[0.2em] text-[var(--color-gold)] font-medium">
                    Option 02: Typography &amp; Monograms
                  </span>
                  <h3 className="font-[family-name:var(--font-display)] text-2xl sm:text-3xl text-[var(--color-text)] mt-1">
                    Names, Dates &amp; Crests
                  </h3>
                  <p className="text-xs sm:text-sm text-[var(--color-muted)] font-light leading-relaxed mt-2">
                    Turn functional brassware into ancestral relics with personalised metal engraving and foil typography.
                  </p>
                </div>

                <ul className="space-y-3 text-xs sm:text-sm text-[var(--color-text)]">
                  <li className="flex items-start gap-2.5">
                    <span className="text-[var(--color-gold)] mt-0.5">✦</span>
                    <span><strong>Direct Metal Engraving:</strong> Laser-etched couple monograms, family surnames or Sanskrit shlokas directly on brass or kansa.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="text-[var(--color-gold)] mt-0.5">✦</span>
                    <span><strong>Hot Gold Foil Stamping:</strong> Deep debossed metallic foil typography on outer box lids and inside silken liners.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="text-[var(--color-gold)] mt-0.5">✦</span>
                    <span><strong>Brass Monogram Inlays:</strong> Raised metal emblem medallions inlaid into the box lid.</span>
                  </li>
                </ul>
              </div>
            </div>
          )}

          {activeTab === 'wax-seals' && (
            <div className="grid md:grid-cols-12 gap-8 items-center">
              <div className="md:col-span-7">
                <div className="relative aspect-[4/3] overflow-hidden bg-[#2C1A0E] border border-[var(--color-border)]">
                  <Image
                    src="/images/gifting/atelier-kit.jpg"
                    alt="Wax Sealed Personal Notes and Samples"
                    fill
                    sizes="(max-width: 768px) 100vw, 600px"
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent pointer-events-none" />
                  <p className="absolute bottom-3 left-4 right-4 text-xs text-[#FBF5EA] font-light italic">
                    Hand-stamped custom wax seals in antique copper, imperial wine and forest emerald.
                  </p>
                </div>
              </div>

              <div className="md:col-span-5 space-y-5">
                <div>
                  <span className="text-[10px] uppercase tracking-[0.2em] text-[var(--color-gold)] font-medium">
                    Option 03: Tactile Stationery
                  </span>
                  <h3 className="font-[family-name:var(--font-display)] text-2xl sm:text-3xl text-[var(--color-text)] mt-1">
                    Wax-Sealed Personal Notes
                  </h3>
                  <p className="text-xs sm:text-sm text-[var(--color-muted)] font-light leading-relaxed mt-2">
                    Every gift carries a heartfelt message. We print on heavyweight 300 GSM handmade cotton rag paper with deckle edges.
                  </p>
                </div>

                <ul className="space-y-3 text-xs sm:text-sm text-[var(--color-text)]">
                  <li className="flex items-start gap-2.5">
                    <span className="text-[var(--color-gold)] mt-0.5">✦</span>
                    <span><strong>Custom Monogram Seal:</strong> We forge a bespoke brass wax seal stamp with your initials or event crest.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="text-[var(--color-gold)] mt-0.5">✦</span>
                    <span><strong>Flexible Metallic Wax:</strong> Shatterproof flexible wax that survives postal handling intact.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="text-[var(--color-gold)] mt-0.5">✦</span>
                    <span><strong>Personal Calligraphy:</strong> Option for individual guest names penned in copperplate or Devanagari calligraphy.</span>
                  </li>
                </ul>
              </div>
            </div>
          )}

          {activeTab === 'custom-wrapping' && (
            <div className="grid md:grid-cols-12 gap-8 items-center">
              <div className="md:col-span-7">
                <div className="relative aspect-[4/3] overflow-hidden bg-[#2C1A0E] border border-[var(--color-border)]">
                  <Image
                    src="/images/gifting/hero-hampers.jpg"
                    alt="Custom Wrapping & Potlis"
                    fill
                    sizes="(max-width: 768px) 100vw, 600px"
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent pointer-events-none" />
                  <p className="absolute bottom-3 left-4 right-4 text-xs text-[#FBF5EA] font-light italic">
                    Handwoven brocade potli pouches with golden latkan tassels and grosgrain ribbons.
                  </p>
                </div>
              </div>

              <div className="md:col-span-5 space-y-5">
                <div>
                  <span className="text-[10px] uppercase tracking-[0.2em] text-[var(--color-gold)] font-medium">
                    Option 04: Flourishes &amp; Packaging
                  </span>
                  <h3 className="font-[family-name:var(--font-display)] text-2xl sm:text-3xl text-[var(--color-text)] mt-1">
                    Custom Wrapping &amp; Potlis
                  </h3>
                  <p className="text-xs sm:text-sm text-[var(--color-muted)] font-light leading-relaxed mt-2">
                    Elevate the sensory moment of unwrapping with heritage Indian textile wraps and bespoke gift bags.
                  </p>
                </div>

                <ul className="space-y-3 text-xs sm:text-sm text-[var(--color-text)]">
                  <li className="flex items-start gap-2.5">
                    <span className="text-[var(--color-gold)] mt-0.5">✦</span>
                    <span><strong>Brocade &amp; Ikat Potli Bags:</strong> For sweets, dry fruits, or sacred coin pouches inside the hamper.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="text-[var(--color-gold)] mt-0.5">✦</span>
                    <span><strong>Double-Faced Satin Ribbons:</strong> Printed with custom greeting or family insignia.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="text-[var(--color-gold)] mt-0.5">✦</span>
                    <span><strong>Matching Carry Totes:</strong> Luxury rigid paper carry bags with woven cord handles for seamless distribution.</span>
                  </li>
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
