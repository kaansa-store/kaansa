import Image from 'next/image';

const metals = [
  {
    name: 'Brass',
    line: 'The warm glow of brass. Made for daily use, and a little care keeps the shine.',
  },
  {
    name: 'Bronze',
    line: 'The timeless character of bronze. Deeper in tone, steady in the hand.',
  },
  {
    name: 'Copper',
    line: 'The natural beauty of copper. Rich in colour, honest about age.',
  },
];

export default function AboutMetals() {
  return (
    <section className="relative overflow-hidden bg-[#2C1A0E] text-[#FBF5EA] py-20 lg:py-28">
      <div
        className="absolute inset-0 opacity-[0.06] pointer-events-none bg-repeat bg-[length:360px_360px]"
        style={{ backgroundImage: 'url(/images/pattern.jpg)' }}
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          <div className="lg:col-span-5">
            <div className="relative aspect-[4/5] overflow-hidden border border-[var(--color-gold)]/30">
              <Image
                src="/images/metal-copper.jpg"
                alt="Handcrafted copper and brass pieces side by side"
                fill
                sizes="(max-width: 1024px) 100vw, 500px"
                className="object-cover"
              />
            </div>
          </div>

          <div className="lg:col-span-7 space-y-8">
            <h2 className="font-[family-name:var(--font-display)] text-3xl sm:text-4xl md:text-5xl font-light leading-[1.12]">
              The Beauty of Things That Last
            </h2>

            <div className="space-y-1 font-[family-name:var(--font-heading)] italic text-xl sm:text-2xl text-[#F0E4CC] leading-relaxed">
              <p>We believe true luxury is not about excess.</p>
              <p>It is about craftsmanship, authenticity, detail and permanence.</p>
            </div>

            <ul className="divide-y divide-[var(--color-gold)]/25 border-y border-[var(--color-gold)]/25">
              {metals.map((metal) => (
                <li key={metal.name} className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 sm:gap-6 py-5">
                  <span className="font-[family-name:var(--font-display)] text-3xl sm:text-4xl text-[var(--color-gold-light)] shrink-0">
                    {metal.name}
                  </span>
                  <span className="text-sm sm:text-base text-[#E5D2C2] font-light sm:text-right font-[family-name:var(--font-body)]">
                    {metal.line}
                  </span>
                </li>
              ))}
            </ul>

            <p className="text-base text-[#E5D2C2] font-light leading-relaxed font-[family-name:var(--font-body)]">
              Each metal carries its own story. Every piece becomes a small part of yours, whether it finds a place
              in your home, joins a cherished ritual, or is given to someone special.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
