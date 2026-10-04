const phrases = [
  'Handcrafted in India',
  '100% Pure Metal',
  'Hand-hammered by master artisans',
  'Brass · Kansa · Copper',
  'Made to be passed down',
  'No toxic coatings',
];

/**
 * Infinite copper ribbon (inspired by PTAL's scrolling strip).
 * Pure CSS: the list is rendered twice and translated -50% for a seamless loop.
 */
export default function CraftMarquee() {
  const items = [...phrases, ...phrases];

  return (
    <section
      aria-label="Kaansa craft promises"
      className="relative overflow-hidden bg-[var(--color-accent)] text-[#FBF5EA] py-3.5 border-y border-[var(--color-gold)]/30"
    >
      <div className="marquee-track flex w-max items-center hover:[animation-play-state:paused]">
        {items.map((text, i) => (
          <span
            key={i}
            aria-hidden={i >= phrases.length}
            className="flex items-center gap-6 px-6 text-[11px] sm:text-xs uppercase tracking-[0.24em] font-[family-name:var(--font-body)] whitespace-nowrap"
          >
            {text}
            <span className="text-[var(--color-gold-light)] text-[10px]">✦</span>
          </span>
        ))}
      </div>
    </section>
  );
}
