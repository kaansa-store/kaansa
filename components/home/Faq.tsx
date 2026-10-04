const faqs = [
  {
    q: 'Can I cook and eat in brass, kansa and copper?',
    a: 'Kansa (bell metal) is safe for serving and eating. Brass and copper cookware should be tin-lined (kalai) before cooking acidic food.',
  },
  {
    q: 'How do I clean and care for my pieces?',
    a: 'Wash by hand with a mild soap and dry right away. To restore shine, rub with a paste of tamarind or lemon and salt, then rinse. Avoid dishwashers and harsh scrubbers.',
  },
  {
    q: 'Why does my piece look darker over time?',
    a: 'Natural metal oxidises. This patina is a sign of pure, uncoated metal, not a defect. A quick polish brings back the original glow.',
  },
  {
    q: 'Are there slight differences between pieces?',
    a: 'Yes. Every piece is shaped by hand, so small variations in hammer marks, tone and weight are expected. No two are identical.',
  },
  {
    q: 'What is kansa?',
    a: 'Kansa is a traditional bell-metal alloy of roughly 78% copper and 22% tin. It has been prized in Ayurveda for serving food and water.',
  },
];

/** Native <details> accordion: zero client JS (inspired by PTAL's FAQ block). */
export default function Faq() {
  return (
    <section className="max-w-3xl mx-auto px-6 py-20 lg:py-28">
      <div className="text-center mb-12">
        <span className="text-xs uppercase tracking-[0.2em] text-[var(--color-accent)] font-medium block mb-3 font-[family-name:var(--font-body)]">
          Good to Know
        </span>
        <h2 className="font-[family-name:var(--font-display)] text-3xl sm:text-4xl md:text-5xl text-[var(--color-text)]">
          Frequently Asked
        </h2>
      </div>

      <div className="border-t border-[var(--color-border)]">
        {faqs.map((f) => (
          <details key={f.q} className="faq-item group border-b border-[var(--color-border)]">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-6 font-[family-name:var(--font-heading)] text-base sm:text-lg text-[var(--color-text)] transition-colors hover:text-[var(--color-accent)] [&::-webkit-details-marker]:hidden">
              {f.q}
              <span
                aria-hidden
                className="relative flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-[var(--color-border-strong)] text-[var(--color-accent)] transition-all duration-300 group-open:rotate-45 group-open:bg-[var(--color-accent)] group-open:text-[#FBF5EA] group-open:border-[var(--color-accent)]"
              >
                +
              </span>
            </summary>
            <p className="pb-6 pr-14 font-[family-name:var(--font-body)] text-sm sm:text-base text-[var(--color-muted)] font-light leading-relaxed">
              {f.a}
            </p>
          </details>
        ))}
      </div>
    </section>
  );
}
