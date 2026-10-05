import Image from 'next/image';
import Link from 'next/link';
import type { Metadata } from 'next';
import { getCollections } from '@/lib/shopify';

export const metadata: Metadata = {
  title: 'Curated Collections | Kaansa Handcrafted Heritage',
  description:
    'Discover our collections of handcrafted brass and copper heritage objects for your sacred rituals, home sanctuary, and traditional dining.',
  alternates: {
    canonical: '/collections',
  },
};

export const revalidate = 3600; // safety net

export default async function CollectionsPage() {
  const collections = await getCollections();

  const curatedCategories = [
    {
      title: 'Pooja Essentials',
      tag: 'Sacred Rituals',
      badge: 'Devotional Metalware',
      description: 'Hand-cast diyas, carved urlis, sacred thalis, and ritual vessels crafted for temple and home worship.',
      image: '/images/collections-pooja.jpg',
      href: '/collections/all?type=Pooja+Essentials',
      accentColor: 'from-[#2B1408]/90 via-[#3A1F10]/55 to-transparent',
    },
    {
      title: 'Home Decor',
      tag: 'Sanctuary & Living',
      badge: 'Heirloom Accents',
      description: 'Acoustic hanging bells, sculpted brass idols, and wall hangings that infuse spaces with warmth and tranquility.',
      image: '/images/collections-decor.jpg',
      href: '/collections/all?type=Home+Decor',
      accentColor: 'from-[#1A120B]/90 via-[#2B1B10]/55 to-transparent',
    },
    {
      title: 'Kitchen & Tableware',
      tag: 'Culinary Tradition',
      badge: 'Ayurvedic Metals',
      description: 'Traditional hammered ghee pots, fluted water glasses, and pure kansa vessels rooted in holistic wellness.',
      image: '/images/collections-kitchen.jpg',
      href: '/collections/all?type=Kitchen+%26+Tableware',
      accentColor: 'from-[#24130A]/90 via-[#381F12]/55 to-transparent',
    },
    {
      title: 'All Heritage Pieces',
      tag: 'Master Archive',
      badge: 'Complete Catalogue',
      description: 'Explore the full spectrum of artisan metalcraft. Each vessel hammered by master craftsmen in India.',
      image: '/images/collections-all.jpg',
      href: '/collections/all',
      accentColor: 'from-[#1E1108]/90 via-[#331C0E]/55 to-transparent',
    },
  ];

  return (
    <div className="bg-[var(--color-bg)]">
      {/* Editorial Hero Banner with Ambient Video */}
      <section className="relative w-full overflow-hidden bg-[#1E120B] text-white">
        <div className="absolute inset-0 z-0 opacity-40">
          <video
            autoPlay
            loop
            muted
            playsInline
            poster="/images/collections-all.jpg"
            className="w-full h-full object-cover scale-105"
          >
            <source src="/videos/pooja-sandstone.mp4" type="video/mp4" />
          </video>
        </div>
        
        {/* Warm luxury overlay */}
        <div className="absolute inset-0 z-0 bg-gradient-to-b from-[#1A0F08]/85 via-[#1A0F08]/65 to-[var(--color-bg)]" />

        <div className="relative z-10 max-w-5xl mx-auto px-6 pt-24 pb-20 md:pt-32 md:pb-28 text-center flex flex-col items-center">
          <div className="relative w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 mb-6 transition-transform duration-500 hover:scale-105">
            <Image
              src="/images/kaansa-emblem.png"
              alt="Kaansa Sacred Knot Emblem"
              fill
              priority
              sizes="(max-width: 640px) 80px, (max-width: 768px) 96px, 112px"
              className="object-contain drop-shadow-[0_6px_30px_rgba(201,162,75,0.55)]"
            />
          </div>

          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[var(--color-gold)]/40 bg-[var(--color-gold)]/10 text-[var(--color-gold)] text-xs uppercase tracking-[0.2em] font-[family-name:var(--font-body)] mb-6 backdrop-blur-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-gold)] animate-pulse" />
            Handcrafted Indian Metalware
          </div>

          <h1 className="font-[family-name:var(--font-display)] text-4xl sm:text-5xl md:text-7xl font-normal tracking-tight text-[#FBF5EA] leading-[1.1] mb-6">
            Sacred Collections
          </h1>

          <p className="font-[family-name:var(--font-body)] text-base md:text-lg text-[#F3E7D3]/80 max-w-2xl mx-auto leading-relaxed font-light">
            Every piece is shaped, hand-hammered and finished by master artisans.
            Designed to hold flame, water, and timeless tradition for generations.
          </p>

          <div className="mt-8 flex items-center justify-center gap-3">
            <div className="w-12 h-[1px] bg-[var(--color-gold)]/50" />
            <span className="text-[var(--color-gold)] text-xs">✦</span>
            <div className="w-12 h-[1px] bg-[var(--color-gold)]/50" />
          </div>
        </div>
      </section>

      {/* Visual Collections Grid */}
      <section className="max-w-7xl mx-auto px-6 py-16 lg:py-24">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 pb-6 border-b border-[var(--color-border)]">
          <div>
            <span className="text-xs uppercase tracking-[0.18em] text-[var(--color-accent)] font-medium block mb-2 font-[family-name:var(--font-body)]">
              Curated Chapters
            </span>
            <h2 className="font-[family-name:var(--font-heading)] text-3xl md:text-4xl text-[var(--color-text)]">
              Explore by Space & Purpose
            </h2>
          </div>
          <p className="mt-3 md:mt-0 font-[family-name:var(--font-body)] text-sm text-[var(--color-muted)] max-w-md">
            Find the right piece for your home altar, serene corners, or mindful dining table.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
          {curatedCategories.map((cat, index) => (
            <Link
              key={cat.title}
              href={cat.href}
              className="group relative flex flex-col justify-end min-h-[460px] sm:min-h-[520px] rounded-sm overflow-hidden border border-[var(--color-border)] hover:border-[var(--color-gold)] transition-all duration-500 shadow-sm hover:shadow-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-gold)]"
            >
              {/* Background Image with Zoom */}
              <div className="absolute inset-0 z-0">
                <Image
                  src={cat.image}
                  alt={cat.title}
                  fill
                  priority={index < 2}
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
                {/* Gradient scrim for guaranteed readability */}
                <div
                  className={`absolute inset-0 bg-gradient-to-t ${cat.accentColor} transition-opacity duration-300 group-hover:opacity-90`}
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-300" />
              </div>

              {/* Top Meta Tag */}
              <div className="absolute top-6 left-6 right-6 flex items-center justify-between z-10">
                <span className="px-3 py-1 bg-black/40 backdrop-blur-md border border-white/15 text-[#FBF5EA] text-[11px] uppercase tracking-[0.14em] font-[family-name:var(--font-body)] font-medium rounded-full">
                  {cat.tag}
                </span>
                <span className="text-[11px] uppercase tracking-wider text-[var(--color-gold)] font-medium font-[family-name:var(--font-body)] bg-black/30 px-2.5 py-0.5 rounded backdrop-blur-sm">
                  {cat.badge}
                </span>
              </div>

              {/* Bottom Content Card */}
              <div className="relative z-10 p-8 sm:p-10 text-white flex flex-col justify-end">
                <h3 className="font-[family-name:var(--font-heading)] text-2xl sm:text-3xl lg:text-4xl text-[#FBF5EA] mb-3 group-hover:text-[var(--color-gold)] transition-colors duration-300">
                  {cat.title}
                </h3>

                <p className="font-[family-name:var(--font-body)] text-sm sm:text-base text-[#F3E7D3]/85 leading-relaxed mb-6 max-w-lg line-clamp-2">
                  {cat.description}
                </p>

                <div className="inline-flex items-center gap-3 text-xs uppercase tracking-[0.16em] text-[var(--color-gold)] font-medium">
                  <span className="relative pb-0.5">
                    Explore collection
                    <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-[var(--color-gold)] transition-all duration-300 group-hover:w-full" />
                  </span>
                  <span className="transform transition-transform duration-300 group-hover:translate-x-1.5 text-base">
                    →
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Video Feature Section: The Craft of Metal */}
      <section className="bg-[var(--color-surface)] border-y border-[var(--color-border)] py-20 lg:py-28 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            {/* Cinematic Video Container */}
            <div className="lg:col-span-7 relative">
              <div className="relative aspect-[16/10] sm:aspect-[16/9] w-full rounded-sm overflow-hidden shadow-2xl border border-[var(--color-border)] bg-black">
                <video
                  autoPlay
                  loop
                  muted
                  playsInline
                  poster="/images/craftsmanship.jpg"
                  className="w-full h-full object-cover"
                >
                  <source src="/videos/artisan-craft.mp4" type="video/mp4" />
                </video>
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs text-white/90 bg-black/40 backdrop-blur-md px-4 py-2 rounded-sm pointer-events-none">
                  <span className="font-[family-name:var(--font-body)] uppercase tracking-wider text-[var(--color-gold)]">
                    In the Workshop
                  </span>
                  <span className="text-white/70">Master Artisan Shaping Bell Metal</span>
                </div>
              </div>
            </div>

            {/* Editorial Story */}
            <div className="lg:col-span-5 flex flex-col justify-center">
              <span className="text-xs uppercase tracking-[0.2em] text-[var(--color-accent)] font-semibold mb-3 font-[family-name:var(--font-body)]">
                Authentic Craftsmanship
              </span>
              <h2 className="font-[family-name:var(--font-heading)] text-3xl sm:text-4xl lg:text-5xl text-[var(--color-text)] leading-tight mb-6">
                Every hammer strike leaves a memory in the metal.
              </h2>
              <p className="font-[family-name:var(--font-body)] text-sm sm:text-base text-[var(--color-muted)] leading-relaxed mb-6 font-light">
                Our artisans work with solid brass and authentic bell-metal kansa. Heated in earthen hearths, hand-hammered thousands of times, and polished to a celestial lustre.
              </p>

              <div className="space-y-4 mb-8">
                <div className="flex items-start gap-3">
                  <span className="text-[var(--color-gold)] text-sm mt-0.5">✦</span>
                  <p className="text-xs sm:text-sm text-[var(--color-text)] font-[family-name:var(--font-body)]">
                    <strong>100% Pure Metal:</strong> Free from artificial lacquers, toxic coatings, or synthetic fillers.
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-[var(--color-gold)] text-sm mt-0.5">✦</span>
                  <p className="text-xs sm:text-sm text-[var(--color-text)] font-[family-name:var(--font-body)]">
                    <strong>Living Patina:</strong> Matures naturally with use, gaining depth and character over decades.
                  </p>
                </div>
              </div>

              <Link
                href="/collections/all"
                className="inline-flex items-center justify-center self-start px-7 py-3.5 bg-[var(--color-text)] text-[var(--color-bg)] text-xs uppercase tracking-[0.14em] font-medium hover:bg-[var(--color-accent)] transition-colors duration-200"
              >
                Browse All Handcrafted Pieces
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Shopify Tag / Quick Collection Filter Pills */}
      {collections.length > 0 && (
        <section className="max-w-7xl mx-auto px-6 py-16 text-center">
          <h3 className="text-xs uppercase tracking-[0.18em] text-[var(--color-muted)] font-[family-name:var(--font-body)] mb-6">
            Direct Storefront Categories
          </h3>
          <div className="flex flex-wrap justify-center gap-3 sm:gap-4 max-w-3xl mx-auto">
            {collections.map((col) => (
              <Link
                key={col.handle}
                href={`/collections/${col.handle}`}
                className="px-6 py-3 bg-[var(--color-surface)] border border-[var(--color-border)] text-xs uppercase tracking-wider text-[var(--color-text)] hover:border-[var(--color-gold)] hover:text-[var(--color-accent)] transition-colors rounded-sm shadow-2xs font-[family-name:var(--font-body)]"
              >
                {col.title}
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
