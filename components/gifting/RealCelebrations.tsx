'use client';

import React, { useState } from 'react';
import Image from 'next/image';

interface CelebrationStory {
  id: string;
  title: string;
  subtitle: string;
  image: string;
  tag: string;
  story: string;
  piecesIncluded: string[];
  packaging: string;
}

const stories: CelebrationStory[] = [
  {
    id: 'chaitanya-ragini',
    title: 'CHAITANYA & RAGINI',
    subtitle: 'Jaipur Palace Wedding',
    image: '/images/gifting/celebration-wedding.jpg',
    tag: 'Wedding Favours',
    story:
      'Chaitanya & Ragini wanted wedding favours that would hold sacred significance and remain in guests’ homes for generations. We curated heavy brass urlis paired with fragrant natural mogra potlis and handwritten gold-ink blessing cards.',
    piecesIncluded: ['Hand-hammered Brass Urli (8")', 'Handwoven Silk Shagun Potlis', 'Custom Monogram Lid Foil'],
    packaging: 'Bespoke hexagonal crimson velvet rigid box with magnetic closure.',
  },
  {
    id: 'palak-raghav',
    title: 'PALAK & RAGHAV',
    subtitle: 'Botanical Wedding Announcement',
    image: '/images/gifting/celebration-sage.jpg',
    tag: 'Wedding Invitation',
    story:
      'Instead of paper cards that get discarded, Palak & Raghav sent a living kitchen heirloom. An exquisite 7-compartment brass masala dabba paired with hand-harvested organic spices, accompanied by a botanical watercolor scroll.',
    piecesIncluded: ['Pure Brass Spice Dabba with Glass Lid', 'Handmade Brass Tasting Spoon', 'Botanical Wax-Sealed Scroll'],
    packaging: 'Sage green linen-textured keepsake box with embossed botanical gold foil.',
  },
  {
    id: 'ghar-ki-mithai',
    title: 'GHAR KI BANI MITHAI',
    subtitle: 'Heirloom Diwali Hamper',
    image: '/images/gifting/celebration-mithai.jpg',
    tag: 'Festive & Milestone',
    story:
      'A century-old family sweetmaker wanted to present their handcrafted artisanal sweets in a vessel of equal heritage. We crafted heavy fluted brass paraats that families will gather around for festive celebrations forever.',
    piecesIncluded: ['Handcrafted Scalloped Brass Paraat (12")', 'Assorted Heirloom Mithai with Silver Vark', 'Personalized Calligraphy Note'],
    packaging: 'Deep saffron silk presentation wrap with gold zari cord & wax seal.',
  },
  {
    id: 'bikanervala-baby',
    title: "BIKANERVALA – IT'S A BOY!",
    subtitle: 'Royal Birth Announcement',
    image: '/images/gifting/celebration-baby.jpg',
    tag: 'Baby Announcement',
    story:
      'To celebrate the arrival of the newborn, we designed a royal powder blue and navy keepsake pram box holding an Ayurvedic pure kansa baby bowl and spoon set, symbolizing health, longevity, and pure nourishment.',
    piecesIncluded: ['Ayurvedic Hand-Hammered Kansa Bowl', 'Pure Bronze Baby Spoon', 'Brass Heirloom Rattle'],
    packaging: 'Powder blue & midnight navy trunk box with embossed gold pram illustration.',
  },
];

export default function RealCelebrations() {
  const [selectedStory, setSelectedStory] = useState<CelebrationStory | null>(null);

  const handlePlanGifting = () => {
    const el = document.getElementById('catalogue-enquiry');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="bg-[#1C0912] text-[#FBF5EA] py-20 lg:py-28 relative overflow-hidden">
      {/* Background glow & subtle pattern */}
      <div
        className="absolute inset-0 opacity-[0.05] pointer-events-none bg-repeat bg-[length:320px_320px]"
        style={{ backgroundImage: 'url(/images/pattern.jpg)' }}
        aria-hidden="true"
      />

      <div className="relative max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 lg:mb-18 space-y-3">
          <span className="text-[11px] sm:text-xs uppercase tracking-[0.28em] text-[#E8D08A] font-medium font-[family-name:var(--font-body)]">
            Real Celebrations
          </span>
          <h2 className="font-[family-name:var(--font-display)] text-3xl sm:text-4xl lg:text-5xl uppercase tracking-[0.08em] text-[#FDF9F3]">
            Every Gift Began With An Idea
          </h2>
          <p className="text-sm sm:text-base text-[#D4C3B7] font-light font-[family-name:var(--font-body)]">
            Some began with a weave, others with a spice box, a family recipe or a new arrival. Hover or tap to see how each one came together.
          </p>
        </div>

        {/* 4 Story Cards Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stories.map((s) => (
            <div
              key={s.id}
              onClick={() => setSelectedStory(s)}
              className="group cursor-pointer bg-[#2A0E1B] border border-[#E8D08A]/25 overflow-hidden transition-all duration-300 hover:border-[#E8D08A] hover:-translate-y-1 hover:shadow-[0_16px_36px_rgba(0,0,0,0.5)]"
            >
              {/* Photo */}
              <div className="relative aspect-square overflow-hidden">
                <Image
                  src={s.image}
                  alt={s.title}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-108"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1C0912] via-transparent to-transparent opacity-80" />

                <div className="absolute top-3 left-3 bg-[#1C0912]/80 backdrop-blur-xs text-[#E8D08A] text-[9px] uppercase tracking-[0.18em] px-2.5 py-1 border border-[#E8D08A]/30">
                  {s.tag}
                </div>
              </div>

              {/* Title Block */}
              <div className="p-5 text-center">
                <h3 className="font-[family-name:var(--font-heading)] text-base font-semibold tracking-[0.12em] text-[#FDF9F3] uppercase group-hover:text-[#E8D08A] transition-colors">
                  {s.title}
                </h3>
                <p className="text-xs text-[#C5B3A6] mt-1 font-light italic">
                  {s.subtitle}
                </p>
                <div className="mt-3 text-[11px] uppercase tracking-[0.16em] text-[#E8D08A] font-medium flex items-center justify-center gap-1 group-hover:gap-2 transition-all">
                  <span>View Story</span>
                  <span>→</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Action Button */}
        <div className="text-center mt-12 sm:mt-16">
          <button
            type="button"
            onClick={handlePlanGifting}
            className="px-10 py-3.5 bg-[#E8D08A] text-[#2D0B18] hover:bg-[#FBF5EA] font-[family-name:var(--font-body)] text-xs uppercase tracking-[0.2em] font-medium transition-colors shadow-md cursor-pointer"
          >
            Plan My Gifting
          </button>
        </div>

        {/* Modal / Popup for Celebration Story */}
        {selectedStory && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in"
            onClick={() => setSelectedStory(null)}
          >
            <div
              className="bg-[#2D0B18] border border-[#E8D08A]/50 text-[#FBF5EA] max-w-2xl w-full p-6 sm:p-8 relative shadow-2xl overflow-y-auto max-h-[90vh]"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                onClick={() => setSelectedStory(null)}
                className="absolute top-4 right-4 text-[#E8D08A] hover:text-white p-2 text-xl"
                aria-label="Close modal"
              >
                ✕
              </button>

              <div className="grid sm:grid-cols-2 gap-6 items-center">
                <div className="relative aspect-square border border-[#E8D08A]/30 overflow-hidden">
                  <Image
                    src={selectedStory.image}
                    alt={selectedStory.title}
                    fill
                    className="object-cover"
                  />
                </div>

                <div className="space-y-3">
                  <span className="text-[10px] uppercase tracking-[0.2em] text-[#E8D08A]">
                    {selectedStory.tag} • {selectedStory.subtitle}
                  </span>
                  <h3 className="font-[family-name:var(--font-display)] text-2xl text-[#FDF9F3]">
                    {selectedStory.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#D4C3B7] font-light leading-relaxed">
                    {selectedStory.story}
                  </p>

                  <div className="pt-2 border-t border-[#E8D08A]/20">
                    <p className="text-[10px] uppercase tracking-[0.16em] text-[#E8D08A] font-medium mb-1">
                      Pieces Included:
                    </p>
                    <ul className="text-xs text-[#E5D2C2] space-y-1 list-disc list-inside">
                      {selectedStory.piecesIncluded.map((p, i) => (
                        <li key={i}>{p}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="pt-2 border-t border-[#E8D08A]/20">
                    <p className="text-[10px] uppercase tracking-[0.16em] text-[#E8D08A] font-medium mb-0.5">
                      Presentation Box:
                    </p>
                    <p className="text-xs text-[#E5D2C2] italic">
                      {selectedStory.packaging}
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-[#E8D08A]/30 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setSelectedStory(null)}
                  className="px-5 py-2 border border-[#E8D08A]/40 text-xs uppercase tracking-wider text-[#E8D08A] hover:bg-[#E8D08A]/10"
                >
                  Close
                </button>
                <button
                  type="button"
                  onClick={() => {
                    const title = selectedStory.title;
                    setSelectedStory(null);
                    handlePlanGifting();
                    const input = document.getElementById('selected-piece') as HTMLInputElement | null;
                    if (input) input.value = `Celebration style: ${title}`;
                  }}
                  className="px-6 py-2 bg-[#E8D08A] text-[#2D0B18] hover:bg-white text-xs uppercase tracking-wider font-medium"
                >
                  Enquire Similar Style
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
