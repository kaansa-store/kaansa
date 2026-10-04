// TODO(client): replace with real customer reviews (e.g. from Shopify Product Reviews / Judge.me) before launch.
const reviews = [
  {
    quote: 'The kansa thali feels substantial and beautifully finished. Meals feel like a ritual again.',
    name: 'Ananya R.',
    city: 'Bengaluru',
    product: 'Kansa Dinner Thali',
  },
  {
    quote: 'Gifted the urli at a griha pravesh and everyone asked where it was from. Packaging was lovely.',
    name: 'Rohit M.',
    city: 'Pune',
    product: 'Brass Floral Urli',
  },
  {
    quote: 'You can see the hammer marks. It is clearly made by hand and not by a machine.',
    name: 'Meera S.',
    city: 'New Delhi',
    product: 'Hammered Ghee Pot',
  },
];

function Stars() {
  return (
    <div className="flex gap-1 text-[var(--color-gold)]" aria-label="Rated 5 out of 5">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} viewBox="0 0 20 20" className="w-3.5 h-3.5 fill-current" aria-hidden>
          <path d="M10 1.5l2.6 5.3 5.9.9-4.3 4.1 1 5.8L10 14.9l-5.2 2.7 1-5.8L1.5 7.7l5.9-.9L10 1.5z" />
        </svg>
      ))}
    </div>
  );
}

/** Review cards (inspired by PTAL's "Hear it from others"). */
export default function Testimonials() {
  return (
    <section className="bg-[var(--color-surface)] border-y border-[var(--color-border)] py-20 lg:py-28">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center max-w-xl mx-auto mb-14">
          <span className="text-xs uppercase tracking-[0.2em] text-[var(--color-accent)] font-medium block mb-3 font-[family-name:var(--font-body)]">
            In Their Homes
          </span>
          <h2 className="font-[family-name:var(--font-display)] text-3xl sm:text-4xl md:text-5xl text-[var(--color-text)]">
            Hear It From Others
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {reviews.map((r) => (
            <figure
              key={r.name}
              className="group relative flex flex-col bg-[var(--color-bg)] border border-[var(--color-border)] p-8 transition-all duration-500 hover:-translate-y-1 hover:border-[var(--color-gold)] hover:shadow-[0_20px_50px_-25px_rgba(44,26,14,0.35)]"
            >
              <span className="absolute top-4 right-6 font-[family-name:var(--font-display)] text-7xl leading-none text-[var(--color-gold)]/25" aria-hidden>
                &ldquo;
              </span>
              <Stars />
              <blockquote className="mt-5 flex-1 font-[family-name:var(--font-heading)] text-lg leading-relaxed text-[var(--color-text)]">
                {r.quote}
              </blockquote>
              <figcaption className="mt-8 pt-5 border-t border-[var(--color-border)] flex items-end justify-between gap-4">
                <div>
                  <span className="block text-sm font-medium text-[var(--color-text)] font-[family-name:var(--font-body)]">{r.name}</span>
                  <span className="text-xs text-[var(--color-muted)] font-light">{r.city}</span>
                </div>
                <span className="text-[10px] uppercase tracking-[0.16em] text-[var(--color-accent)] text-right">{r.product}</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
