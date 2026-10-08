import Image from 'next/image';
import Link from 'next/link';

export default function AboutLegacy() {
  return (
    <section className="bg-[var(--color-surface)] text-[var(--color-text)] py-20 lg:py-28">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          <div className="lg:col-span-5">
            <div className="relative aspect-[4/5] overflow-hidden border border-[var(--color-border)]">
              <Image
                src="/images/Carved_teak_niche_holding_brass_20261003152257.jpg"
                alt="Carved teak architectural niche displaying handcrafted brass heirlooms"
                fill
                sizes="(max-width: 1024px) 100vw, 500px"
                className="object-cover"
              />
            </div>
          </div>

          <div className="lg:col-span-7 space-y-8">
            <h2 className="font-[family-name:var(--font-display)] text-3xl sm:text-4xl md:text-5xl font-light leading-[1.12]">
              A Legacy, Reimagined
            </h2>

            <div className="space-y-4 text-base text-[var(--color-muted)] font-light leading-relaxed font-[family-name:var(--font-body)]">
              <p>
                Kaansa sits where India&rsquo;s old traditions meet the way we live today.
              </p>
              <p>
                We respect the craftsmanship of yesterday, reinterpret it for today, and make pieces we hope will be
                treasured tomorrow.
              </p>
            </div>

            <div className="space-y-1 font-[family-name:var(--font-heading)] italic text-xl sm:text-2xl text-[var(--color-text)] leading-relaxed">
              <p>For rituals. For homes. For celebrations.</p>
              <p>For giving. For keeping. For passing on.</p>
            </div>

            <div className="border-t border-[var(--color-border)] pt-8 space-y-2">
              <p className="font-[family-name:var(--font-display)] text-3xl sm:text-4xl font-light text-[var(--color-text)]">
                This is Kaansa.
              </p>
              <p className="font-[family-name:var(--font-heading)] italic text-xl sm:text-2xl text-[var(--color-accent)]">
                Rooted in tradition, crafted for eternity.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-4 pt-4">
              <Link
                href="/collections"
                className="inline-flex items-center justify-center px-8 py-3.5 bg-[var(--color-accent)] text-[#FBF5EA] text-xs uppercase tracking-[0.2em] font-medium font-[family-name:var(--font-body)] hover:bg-[var(--color-accent-hover)] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-gold)] focus-visible:ring-offset-2"
              >
                Explore the collection
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center px-8 py-3.5 border border-[var(--color-border-strong)] text-[var(--color-text)] text-xs uppercase tracking-[0.2em] font-medium font-[family-name:var(--font-body)] hover:bg-[var(--color-bg)] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-gold)] focus-visible:ring-offset-2"
              >
                Get in touch
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
