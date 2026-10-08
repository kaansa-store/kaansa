const expectations = [
  {
    title: 'Handcrafted by artisans in India.',
    body: 'Made by hand, so no two pieces are exactly alike.',
  },
  {
    title: 'Made to be used.',
    body: 'The diya is for lighting, the ghee pot is for ghee. Nothing here is only for show.',
  },
  {
    title: 'Easy to look after.',
    body: 'Wipe with a soft dry cloth. Clean with lemon and mild soap, then dry well.',
  },
];

export default function AboutExpect() {
  return (
    <section className="bg-[var(--color-surface)] text-[var(--color-text)] py-20 lg:py-28 border-b border-[var(--color-border)]">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="font-[family-name:var(--font-display)] text-3xl sm:text-4xl md:text-5xl font-light leading-[1.12] mb-12 lg:mb-16">
          What to expect
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10">
          {expectations.map((item) => (
            <div
              key={item.title}
              className="border border-[var(--color-border)] bg-[var(--color-bg)] p-8 lg:p-10 flex flex-col justify-start"
            >
              <h3 className="font-[family-name:var(--font-heading)] text-xl sm:text-2xl font-medium text-[var(--color-text)] mb-4">
                {item.title}
              </h3>
              <p className="text-base text-[var(--color-muted)] font-light leading-relaxed font-[family-name:var(--font-body)]">
                {item.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
