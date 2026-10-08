import Image from 'next/image';
import Link from 'next/link';

const occasions = [
  'Festivals',
  'Weddings',
  'Housewarmings',
  'Anniversaries',
  'Religious occasions',
  'Celebrations',
  'Milestones',
];

export default function AboutGifting() {
  return (
    <section className="bg-[var(--color-bg)] text-[var(--color-text)] py-20 lg:py-28 border-b border-[var(--color-border)]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          <div className="lg:col-span-7 space-y-8 order-2 lg:order-1">
            <h2 className="font-[family-name:var(--font-display)] text-3xl sm:text-4xl md:text-5xl font-light leading-[1.12]">
              Made to Be Given.
              <br />
              <span className="italic text-[var(--color-accent)]">Meant to Be Remembered.</span>
            </h2>

            <p className="font-[family-name:var(--font-heading)] italic text-xl sm:text-2xl text-[var(--color-text)] leading-relaxed">
              A gift should mean something long after the day has passed.
            </p>

            <p className="text-base text-[var(--color-muted)] font-light leading-relaxed font-[family-name:var(--font-body)]">
              Kaansa pieces suit the moments people mark: festivals, weddings, housewarmings, anniversaries,
              religious occasions and the milestones in between. Each one brings together beauty, tradition and
              lasting value. Our pooja thali set arrives in a red velvet box, ready to give.
            </p>

            <div className="flex flex-wrap gap-2 pt-1">
              {occasions.map((tag) => (
                <span
                  key={tag}
                  className="text-xs uppercase tracking-wider px-3.5 py-1.5 border border-[var(--color-border)] text-[var(--color-muted)] font-[family-name:var(--font-body)]"
                >
                  {tag}
                </span>
              ))}
            </div>

            <div className="border-l-2 border-[var(--color-gold)] pl-5 py-1 space-y-1">
              <p className="font-[family-name:var(--font-heading)] text-lg sm:text-xl text-[var(--color-text)] leading-snug">
                The finest gifts are not simply wrapped and given.
              </p>
              <p className="font-[family-name:var(--font-heading)] italic text-lg sm:text-xl text-[var(--color-accent)] leading-snug">
                They become memories.
              </p>
            </div>

            <div className="pt-2">
              <Link
                href="/personal-gifting"
                className="inline-flex items-center justify-center px-8 py-3.5 bg-[var(--color-accent)] text-[#FBF5EA] text-xs uppercase tracking-[0.2em] font-medium font-[family-name:var(--font-body)] hover:bg-[var(--color-accent-hover)] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-gold)] focus-visible:ring-offset-2"
              >
                Explore gifting
              </Link>
            </div>
          </div>

          <div className="lg:col-span-5 order-1 lg:order-2">
            <div className="relative aspect-[4/5] overflow-hidden border border-[var(--color-border)]">
              <Image
                src="/images/Red_velvet_gift_box_and_20261003152236.jpg"
                alt="Kaansa pooja thali set presented in a red velvet gift box"
                fill
                sizes="(max-width: 1024px) 100vw, 500px"
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
