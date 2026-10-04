import Image from 'next/image';
import Link from 'next/link';

const metals = [
  {
    name: 'Brass',
    devanagari: 'पीतल',
    note: 'Warm gold. For the altar and the home.',
    image: '/images/collections-pooja.jpg',
    href: '/collections/all?q=brass',
  },
  {
    name: 'Kansa',
    devanagari: 'कांसा',
    note: 'Bell metal. The Ayurvedic table.',
    image: '/images/collections-kitchen.jpg',
    href: '/collections/all?q=kansa',
  },
  {
    name: 'Copper',
    devanagari: 'तांबा',
    note: 'Rose-red. For water and wellness.',
    image: '/images/metal-copper.jpg',
    href: '/collections/all?q=copper',
  },
];

/** "Shop by Metal" split panels with oversized type (inspired by PTAL). */
export default function ShopByMetal() {
  return (
    <section className="bg-[#1B0F08] text-[#FBF5EA] py-20 lg:py-28">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
          <div>
            <span className="text-xs uppercase tracking-[0.2em] text-[var(--color-gold)] font-medium block mb-3 font-[family-name:var(--font-body)]">
              Three Metals, One Tradition
            </span>
            <h2 className="font-[family-name:var(--font-display)] text-4xl sm:text-5xl md:text-6xl">
              Shop by <span className="italic text-[var(--color-gold)]">Metal</span>
            </h2>
          </div>
          <p className="font-[family-name:var(--font-body)] text-sm text-[#F3E7D3]/70 max-w-sm font-light leading-relaxed">
            Each alloy has its own colour, its own sound, and its own place in the Indian home.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-[var(--color-gold)]/20">
          {metals.map((m, i) => (
            <Link
              key={m.name}
              href={m.href}
              className="group relative block aspect-[3/4] md:aspect-[3/4.4] overflow-hidden bg-[#1B0F08]"
            >
              <Image
                src={m.image}
                alt={`${m.name} handcrafted pieces`}
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover opacity-70 transition-all duration-[900ms] ease-[var(--ease-out)] group-hover:scale-105 group-hover:opacity-90"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1B0F08] via-[#1B0F08]/30 to-transparent" />

              <span className="absolute top-6 left-6 text-[11px] tracking-[0.2em] text-[var(--color-gold)] font-[family-name:var(--font-body)]">
                0{i + 1}
              </span>

              <div className="absolute inset-x-0 bottom-0 p-7 sm:p-8">
                <span className="block font-[family-name:var(--font-display)] italic text-2xl text-[var(--color-gold)]/90 mb-1">
                  {m.devanagari}
                </span>
                <h3 className="font-[family-name:var(--font-display)] text-6xl lg:text-7xl leading-none tracking-tight transition-transform duration-700 ease-[var(--ease-out)] group-hover:-translate-y-2">
                  {m.name}
                </h3>
                <div className="mt-4 flex items-center justify-between border-t border-white/15 pt-4">
                  <p className="font-[family-name:var(--font-body)] text-xs sm:text-sm text-[#F3E7D3]/80 font-light">
                    {m.note}
                  </p>
                  <span className="text-[var(--color-gold)] transition-transform duration-300 group-hover:translate-x-1" aria-hidden>
                    →
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
