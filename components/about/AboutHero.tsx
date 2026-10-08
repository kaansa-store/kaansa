import Image from 'next/image';

const heirloomLines = [
  'There are things we inherit.',
  'There are things we cherish.',
  'And then there are things we choose to pass on.',
];

export default function AboutHero() {
  return (
    <section className="bg-[var(--color-bg)] text-[var(--color-text)] pt-12 md:pt-20 pb-20 lg:pb-28">
      <div className="max-w-7xl mx-auto px-6">
        <div className="max-w-4xl mb-12 lg:mb-16">
          <span className="block mb-4 text-xs uppercase tracking-[0.24em] text-[var(--color-gold)] font-medium font-[family-name:var(--font-body)]">
            About Kaansa
          </span>
          <h1 className="font-[family-name:var(--font-display)] text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light leading-[1.08] tracking-tight">
            Rooted in Tradition.
            <br />
            <span className="italic text-[var(--color-accent)]">Crafted for Eternity.</span>
          </h1>
        </div>

        <div className="relative aspect-[16/9] sm:aspect-[21/9] w-full overflow-hidden border border-[var(--color-border)] mb-14 lg:mb-20">
          <Image
            src="/images/Brass_diya_and_floral_urli_20261003152347.jpg"
            alt="A lit brass diya beside a brass urli filled with floating flowers"
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 lg:gap-16 items-start">
          <div className="md:col-span-5 space-y-2">
            {heirloomLines.map((line) => (
              <p
                key={line}
                className="font-[family-name:var(--font-heading)] italic text-2xl sm:text-3xl leading-snug text-[var(--color-text)]"
              >
                {line}
              </p>
            ))}
          </div>

          <div className="md:col-span-7 space-y-5 text-base text-[var(--color-muted)] font-light leading-relaxed font-[family-name:var(--font-body)]">
            <p>
              Kaansa draws on a craft India has practised for centuries. Brass, bronze and copper have always had a
              place in our homes: in the lamp lit at dusk, the thali laid out for a festival, the pot that keeps the
              ghee.
            </p>
            <p>
              We bring that legacy into the way people live now. Every piece is handcrafted to be used, so it sits
              easily in a modern home without losing what made it worth making.
            </p>
            <p>
              The range runs from puja essentials and kitchenware to d&eacute;cor and drinkware. Each piece carries
              something of the culture it comes from, shaped for today.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
