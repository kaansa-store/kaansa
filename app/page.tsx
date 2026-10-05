import Image from 'next/image';
import Link from 'next/link';
import type { Metadata } from 'next';
import { getProducts } from '@/lib/shopify';
import ProductGrid from '@/components/product/ProductGrid';
import Button from '@/components/ui/Button';
import CraftMarquee from '@/components/home/CraftMarquee';
import ShopByMetal from '@/components/home/ShopByMetal';
import CorePrinciples from '@/components/home/CorePrinciples';
import Testimonials from '@/components/home/Testimonials';
import Faq from '@/components/home/Faq';

export const metadata: Metadata = {
  title: 'Kaansa | Handcrafted Brass & Copper Heritage Pieces',
  description:
    'Handcrafted Indian brass and bell-metal heritage objects. Ritual pooja essentials, timeless home decor, and traditional kitchenware made by master artisans.',
};

export default async function HomePage() {
  const featuredProducts = await getProducts({ first: 4 });

  const categories = [
    {
      title: 'Pooja Essentials',
      tag: 'Sacred Rituals',
      description: 'Diyas, urlis, flower baskets, and sacred thalis for daily devotion.',
      image: '/images/collections-pooja.jpg',
      href: '/collections/all?type=Pooja+Essentials',
    },
    {
      title: 'Home Decor',
      tag: 'Sanctuary Living',
      description: 'Hand-sculpted wall hangings, bells, and decorative brass statues.',
      image: '/images/collections-decor.jpg',
      href: '/collections/all?type=Home+Decor',
    },
    {
      title: 'Kitchen & Tableware',
      tag: 'Culinary Tradition',
      description: 'Traditional ghee pots, pooja glasses, and copper water vessels.',
      image: '/images/collections-kitchen.jpg',
      href: '/collections/all?type=Kitchen+%26+Tableware',
    },
  ];

  return (
    <div className="bg-[var(--color-bg)]">
      {/* 1. Full-Bleed Atmospheric Video Hero */}
      <section className="relative min-h-[92vh] flex items-center justify-center overflow-hidden bg-[#160E08] text-white">
        {/* Background Video */}
        <div className="absolute inset-0 z-0">
          <video
            autoPlay
            loop
            muted
            playsInline
            poster="/images/hero-desktop.jpg"
            className="w-full h-full object-cover scale-105"
          >
            <source src="/videos/elephant-urli.mp4" type="video/mp4" />
          </video>
          {/* Gradients */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#160E08] via-[#160E08]/50 to-black/60" />
          <div className="absolute inset-0 bg-black/25" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-4xl mx-auto px-6 py-28 text-center flex flex-col items-center">
          {/* Iconic Brand Emblem */}
          <div className="relative w-24 h-24 sm:w-28 sm:h-28 md:w-36 md:h-36 mb-6 transition-transform duration-700 hover:scale-105">
            <Image
              src="/images/kaansa-emblem.png"
              alt="Kaansa Sacred Knot Emblem"
              fill
              priority
              sizes="(max-width: 640px) 96px, (max-width: 768px) 112px, 144px"
              className="object-contain drop-shadow-[0_6px_36px_rgba(201,162,75,0.6)]"
            />
          </div>

          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full border border-[var(--color-gold)]/40 bg-black/40 backdrop-blur-md text-[var(--color-gold)] text-xs uppercase tracking-[0.22em] font-[family-name:var(--font-body)] mb-8">
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-gold)] animate-pulse" />
            Heirloom Artisan Metalcraft
          </div>

          <h1 className="font-[family-name:var(--font-display)] text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-normal tracking-tight text-[#FBF5EA] leading-[1.08] mb-8">
            Made by hand. <br />
            <span className="italic font-serif text-[var(--color-gold)]">Made to last.</span>
          </h1>

          <p className="font-[family-name:var(--font-body)] text-base sm:text-lg md:text-xl font-light text-[#F3E7D3]/90 max-w-2xl mx-auto mb-10 leading-relaxed">
            Authentic brass and bell-metal pieces shaped by master artisans in India.
            Crafted for your sacred altar, everyday dining, and cherished spaces.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto">
            <Link href="/collections" className="w-full sm:w-auto">
              <Button variant="primary" size="lg" className="w-full sm:w-auto">
                Explore The Collections
              </Button>
            </Link>
            <Link href="#craft" className="w-full sm:w-auto">
              <Button
                variant="outline-light"
                size="lg"
                className="w-full sm:w-auto"
              >
                Watch The Craft
              </Button>
            </Link>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 text-white/50 text-[10px] uppercase tracking-[0.2em]">
          <span>Scroll</span>
          <div className="w-[1px] h-8 bg-gradient-to-b from-[var(--color-gold)] to-transparent" />
        </div>
      </section>

      <CraftMarquee />

      {/* 2. Trust Ribbon */}
      <section className="border-y border-[var(--color-border)] bg-[var(--color-surface)] py-6">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div>
            <span className="text-xs uppercase tracking-[0.16em] text-[var(--color-text)] font-medium font-[family-name:var(--font-body)] block">
              100% Pure Metal
            </span>
            <span className="text-[11px] text-[var(--color-muted)] font-light">Zero toxic coatings or filler</span>
          </div>
          <div>
            <span className="text-xs uppercase tracking-[0.16em] text-[var(--color-text)] font-medium font-[family-name:var(--font-body)] block">
              Master Handcraft
            </span>
            <span className="text-[11px] text-[var(--color-muted)] font-light">Hammered by Indian artisans</span>
          </div>
          <div>
            <span className="text-xs uppercase tracking-[0.16em] text-[var(--color-text)] font-medium font-[family-name:var(--font-body)] block">
              Generational Durability
            </span>
            <span className="text-[11px] text-[var(--color-muted)] font-light">Built to outlive a lifetime</span>
          </div>
          <div>
            <span className="text-xs uppercase tracking-[0.16em] text-[var(--color-text)] font-medium font-[family-name:var(--font-body)] block">
              Secure Checkout
            </span>
            <span className="text-[11px] text-[var(--color-muted)] font-light">Direct Shopify payment guarantee</span>
          </div>
        </div>
      </section>

      {/* 3. Visual Categories Section */}
      <section className="max-w-7xl mx-auto px-6 py-20 lg:py-28">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs uppercase tracking-[0.2em] text-[var(--color-accent)] font-medium block mb-3 font-[family-name:var(--font-body)]">
            Curated Spaces
          </span>
          <h2 className="font-[family-name:var(--font-display)] text-3xl sm:text-4xl md:text-5xl text-[var(--color-text)]">
            Vessels of Purpose & Poise
          </h2>
          <div className="mt-4 flex items-center justify-center gap-3">
            <div className="w-10 h-[1px] bg-[var(--color-gold)]/40" />
            <span className="text-[var(--color-gold)] text-xs">✦</span>
            <div className="w-10 h-[1px] bg-[var(--color-gold)]/40" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {categories.map((cat, i) => (
            <Link
              key={cat.title}
              href={cat.href}
              className="group relative flex flex-col justify-end min-h-[460px] sm:min-h-[500px] rounded-sm overflow-hidden border border-[var(--color-border)] hover:border-[var(--color-gold)] transition-all duration-500 shadow-sm hover:shadow-xl"
            >
              {/* Image with zoom */}
              <div className="absolute inset-0 z-0">
                <Image
                  src={cat.image}
                  alt={cat.title}
                  fill
                  priority={i === 0}
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1A0E07]/90 via-[#26150B]/50 to-transparent" />
                <div className="absolute inset-0 bg-black/15 group-hover:bg-black/5 transition-colors duration-300" />
              </div>

              {/* Meta */}
              <div className="absolute top-5 left-5 z-10">
                <span className="px-3 py-1 bg-black/40 backdrop-blur-md border border-white/15 text-[#FBF5EA] text-[11px] uppercase tracking-[0.14em] font-[family-name:var(--font-body)] font-medium rounded-full">
                  {cat.tag}
                </span>
              </div>

              {/* Content */}
              <div className="relative z-10 p-7 sm:p-8 text-white">
                <h3 className="font-[family-name:var(--font-heading)] text-2xl text-[#FBF5EA] mb-2 group-hover:text-[var(--color-gold)] transition-colors">
                  {cat.title}
                </h3>
                <p className="font-[family-name:var(--font-body)] text-xs sm:text-sm text-[#F3E7D3]/85 leading-relaxed mb-5 line-clamp-2">
                  {cat.description}
                </p>
                <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.14em] text-[var(--color-gold)] font-medium">
                  <span>Explore pieces</span>
                  <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <ShopByMetal />

      {/* 4. Featured Product Catalog from Shopify */}
      {featuredProducts.length > 0 && (
        <section className="bg-[var(--color-surface)] py-20 lg:py-28 border-y border-[var(--color-border)]">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12">
              <div>
                <span className="text-xs uppercase tracking-[0.2em] text-[var(--color-accent)] font-medium block mb-2 font-[family-name:var(--font-body)]">
                  Selected Works
                </span>
                <h2 className="font-[family-name:var(--font-display)] text-3xl sm:text-4xl text-[var(--color-text)]">
                  Featured Masterpieces
                </h2>
              </div>
              <Link
                href="/collections/all"
                className="mt-4 sm:mt-0 text-xs uppercase tracking-[0.16em] text-[var(--color-accent)] font-medium inline-flex items-center gap-2 hover:text-[var(--color-gold)] transition-colors"
              >
                <span>View Complete Catalogue</span>
                <span>→</span>
              </Link>
            </div>

            <ProductGrid products={featuredProducts} />
          </div>
        </section>
      )}

      {/* 5. Craftsmanship Video Spotlight */}
      <section id="craft" className="py-20 lg:py-28 bg-[var(--color-bg)] overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            {/* Video Container */}
            <div className="lg:col-span-7">
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
                    Generational Technique
                  </span>
                  <span className="text-white/70">Hand-hammered bell metal</span>
                </div>
              </div>
            </div>

            {/* Story */}
            <div className="lg:col-span-5 flex flex-col justify-center">
              <span className="text-xs uppercase tracking-[0.2em] text-[var(--color-accent)] font-semibold mb-3 font-[family-name:var(--font-body)]">
                The Heritage Process
              </span>
              <h2 className="font-[family-name:var(--font-heading)] text-3xl sm:text-4xl text-[var(--color-text)] leading-tight mb-6">
                Shaped by fire. Sung into being with a hammer.
              </h2>
              <p className="font-[family-name:var(--font-body)] text-sm sm:text-base text-[var(--color-muted)] leading-relaxed mb-6 font-light">
                Kansa (bell-metal) is an ancient Ayurvedic alloy consisting of 78% copper and 22% tin. When struck, it emits a resonant hum that purifies space and stills the mind.
              </p>
              <p className="font-[family-name:var(--font-body)] text-sm text-[var(--color-muted)] leading-relaxed mb-8 font-light">
                Unlike machine-pressed metalware, each Kaansa piece carries the subtle signature texture of the artisan who hammered it.
              </p>

              <div className="pt-6 border-t border-[var(--color-border)]">
                <blockquote className="font-[family-name:var(--font-heading)] italic text-lg text-[var(--color-text)] mb-2">
                  &ldquo;A brass vessel should feel heavy with dignity, soft to touch, and warm to the eye.&rdquo;
                </blockquote>
                <span className="text-xs uppercase tracking-wider text-[var(--color-accent)] font-medium font-[family-name:var(--font-body)]">
                  — Master Craftsman, Moradabad
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <CorePrinciples />

      {/* 6. Auspicious Gifting Feature */}
      <section className="relative overflow-hidden bg-[#24140B] text-white py-20 lg:py-28">
        <div className="absolute inset-0 z-0 opacity-25">
          <Image
            src="/images/gifting.jpg"
            alt="Artisan Gifting Boxes"
            fill
            sizes="100vw"
            className="object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-[#1B0D06] via-[#1B0D06]/85 to-transparent z-0" />

        <div className="relative z-10 max-w-7xl mx-auto px-6">
          <div className="max-w-xl">
            <span className="text-xs uppercase tracking-[0.2em] text-[var(--color-gold)] font-medium block mb-3 font-[family-name:var(--font-body)]">
              Auspicious Gifting
            </span>
            <h2 className="font-[family-name:var(--font-display)] text-3xl sm:text-4xl md:text-5xl text-[#FBF5EA] leading-tight mb-6">
              Heirloom presents for weddings & new beginnings.
            </h2>
            <p className="font-[family-name:var(--font-body)] text-sm sm:text-base text-[#F3E7D3]/85 leading-relaxed mb-8 font-light">
              Present handcrafted pooja thalis and polished urlis in royal velvet keepsake packaging. Gifts that carry blessings and endure across family generations.
            </p>
            <Link href="/collections/all">
              <Button variant="primary" size="md">
                Discover Gifting Pieces
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* 7. Gallery of Sacred Moments */}
      <section className="max-w-7xl mx-auto px-6 py-20 lg:py-28">
        <div className="text-center max-w-xl mx-auto mb-14">
          <span className="text-xs uppercase tracking-[0.2em] text-[var(--color-accent)] font-medium block mb-3 font-[family-name:var(--font-body)]">
            Living With Brass
          </span>
          <h2 className="font-[family-name:var(--font-display)] text-3xl sm:text-4xl text-[var(--color-text)]">
            Spaces Touched by Warmth
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="relative aspect-[4/5] rounded-sm overflow-hidden border border-[var(--color-border)] group">
            <Image
              src="/images/festive-banner.jpg"
              alt="Rows of lit brass diyas at dusk"
              fill
              sizes="(max-width: 768px) 100vw, 33vw"
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
            <div className="absolute bottom-5 left-5 right-5 text-white">
              <span className="text-[11px] uppercase tracking-wider text-[var(--color-gold)] font-medium">Twilight Devotion</span>
              <p className="font-[family-name:var(--font-heading)] text-lg text-[#FBF5EA]">The Golden Flame of Diya</p>
            </div>
          </div>

          <div className="relative aspect-[4/5] rounded-sm overflow-hidden border border-[var(--color-border)] group">
            <Image
              src="/images/wall-hangings.jpg"
              alt="Brass wall hangings with marigold toran"
              fill
              sizes="(max-width: 768px) 100vw, 33vw"
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
            <div className="absolute bottom-5 left-5 right-5 text-white">
              <span className="text-[11px] uppercase tracking-wider text-[var(--color-gold)] font-medium">Doorway Blessings</span>
              <p className="font-[family-name:var(--font-heading)] text-lg text-[#FBF5EA]">Shubh & Labh Wall Accents</p>
            </div>
          </div>

          <div className="relative aspect-[4/5] rounded-sm overflow-hidden border border-[var(--color-border)] group">
            <Image
              src="/images/about-hero.jpg"
              alt="Carved teak niche holding brass pieces"
              fill
              sizes="(max-width: 768px) 100vw, 33vw"
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
            <div className="absolute bottom-5 left-5 right-5 text-white">
              <span className="text-[11px] uppercase tracking-wider text-[var(--color-gold)] font-medium">Heirloom Niche</span>
              <p className="font-[family-name:var(--font-heading)] text-lg text-[#FBF5EA]">Generations of Pure Metal</p>
            </div>
          </div>
        </div>
      </section>

      <Testimonials />
      <Faq />
    </div>
  );
}
