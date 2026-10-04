import Image from 'next/image';

type Principle = { title: string; body: string };

const left: Principle[] = [
  { title: 'Ayurvedic Wellness', body: 'Kansa and copper have served food and water in Ayurveda for centuries.' },
  { title: 'Pure Metal', body: 'No lacquer, no toxic coatings, no filler alloys. Just honest metal.' },
  { title: 'Craftsmanship', body: 'Every piece is cast, hammered and polished by hand.' },
];

const right: Principle[] = [
  { title: 'Revival of Craft', body: 'Each order keeps traditional metalsmithing families at work.' },
  { title: 'Built to Last', body: 'Made for daily use and handed down for generations.' },
  { title: 'Sacred Tradition', body: 'Forms drawn from the rituals of the Indian home and temple.' },
];

// Top & bottom rows are pulled toward the medallion so the six items trace its curve.
const curveLeft = ['lg:translate-x-10', 'lg:translate-x-0', 'lg:translate-x-10'];
const curveRight = ['lg:-translate-x-10', 'lg:translate-x-0', 'lg:-translate-x-10'];

function Item({ p, n, side, i }: { p: Principle; n: number; side: 'left' | 'right'; i: number }) {
  const isLeft = side === 'left';
  const shift = isLeft ? curveLeft[i] : curveRight[i];

  return (
    <div
      className={`group flex items-start gap-5 ${shift} ${
        isLeft ? 'lg:flex-row-reverse lg:text-right' : 'lg:text-left'
      } text-left`}
    >
      <span className="font-[family-name:var(--font-display)] italic text-3xl leading-none text-[var(--color-gold)] transition-transform duration-500 group-hover:-translate-y-1">
        {String(n).padStart(2, '0')}
      </span>
      <div className="max-w-[270px]">
        <h3 className="font-[family-name:var(--font-heading)] text-xl xl:text-[22px] text-[var(--color-accent)] leading-snug mb-2">
          {p.title}
        </h3>
        <p className="font-[family-name:var(--font-body)] text-[15px] text-[var(--color-muted)] leading-relaxed font-light">
          {p.body}
        </p>
      </div>
    </div>
  );
}

/** Principles flanking a central brass medallion (inspired by PTAL's "Core Principles"). */
export default function CorePrinciples() {
  return (
    <section className="relative overflow-hidden py-24 lg:py-32 bg-[var(--color-bg)]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-16 lg:mb-20">
          <span className="text-xs uppercase tracking-[0.24em] text-[var(--color-accent)] font-medium block mb-4 font-[family-name:var(--font-body)]">
            What We Stand For
          </span>
          <h2 className="font-[family-name:var(--font-display)] text-4xl sm:text-5xl md:text-6xl text-[var(--color-text)] leading-[1.1]">
            Our Core <span className="italic text-[var(--color-accent)]">Principles</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[1fr_auto_1fr] items-center gap-y-12 gap-x-10 xl:gap-x-16">
          {/* Left column */}
          <div className="flex flex-col gap-12 lg:gap-16 lg:items-end">
            {left.map((p, i) => (
              <Item key={p.title} p={p} n={i + 1} side="left" i={i} />
            ))}
          </div>

          {/* Medallion */}
          <div className="relative order-first sm:col-span-2 lg:col-span-1 lg:order-none mx-auto w-[240px] sm:w-[280px] xl:w-[320px] aspect-square">
            <div className="absolute -inset-10 rounded-full border border-[var(--color-gold)]/25" />
            <div className="absolute -inset-5 rounded-full border border-dashed border-[var(--color-gold)]/40 animate-[spin_90s_linear_infinite]" />
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-[#D9B666] via-[var(--color-gold)] to-[#8A6224] shadow-[0_40px_90px_-30px_rgba(138,74,28,0.6)] flex items-center justify-center">
              <div className="absolute inset-3 rounded-full border border-[#FBF5EA]/35" />
              <div className="relative w-[38%] aspect-square">
                <Image
                  src="/images/kaansa-emblem.png"
                  alt=""
                  fill
                  sizes="140px"
                  className="object-contain brightness-0 invert opacity-90"
                />
              </div>
            </div>
          </div>

          {/* Right column */}
          <div className="flex flex-col gap-12 lg:gap-16 lg:items-start">
            {right.map((p, i) => (
              <Item key={p.title} p={p} n={i + 4} side="right" i={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
