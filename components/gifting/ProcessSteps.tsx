import React from 'react';

const steps = [
  {
    step: '1',
    title: 'CONSULTATION',
    description: 'Tell us about your celebration in a two-minute form. We’ll call within 48 hours.',
    icon: '✦',
  },
  {
    step: '2',
    title: 'CURATION',
    description: 'We’ll share options that suit your occasion, guest preferences, and budget.',
    icon: '✦',
  },
  {
    step: '3',
    title: 'CUSTOMISATION',
    description: 'Choose the details you’d like personalized. Your design mock-up will arrive within 3–5 days.',
    icon: '✦',
  },
  {
    step: '4',
    title: 'DELIVERY',
    description: 'Once approved, we’ll pack and ship your order across India within 3–4 weeks.',
    icon: '✦',
  },
];

export default function ProcessSteps() {
  return (
    <section className="bg-[var(--color-bg)] py-20 lg:py-28 border-b border-[var(--color-border)]">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 lg:mb-18 space-y-3">
          <span className="text-[11px] sm:text-xs uppercase tracking-[0.28em] text-[var(--color-gold)] font-medium font-[family-name:var(--font-body)]">
            How It Works
          </span>
          <h2 className="font-[family-name:var(--font-display)] text-3xl sm:text-4xl lg:text-5xl uppercase tracking-[0.08em] text-[var(--color-text)]">
            Tell Us The Occasion. We&rsquo;ll Guide You From There.
          </h2>
          <p className="text-sm sm:text-base text-[var(--color-muted)] font-light font-[family-name:var(--font-body)]">
            From initial concept to final door-to-door delivery, we handle every detail with white-glove precision.
          </p>
        </div>

        {/* 4 Cards Grid matching PDF page 4 */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((s) => (
            <div
              key={s.step}
              className="bg-[#481123] text-[#FBF5EA] p-8 border border-[#E8D08A]/30 flex flex-col justify-between min-h-[220px] transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:border-[#E8D08A]"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs uppercase tracking-[0.2em] text-[#E8D08A] font-[family-name:var(--font-body)]">
                    Step {s.step}
                  </span>
                  <span className="text-[#E8D08A] text-sm">{s.icon}</span>
                </div>
                <h3 className="font-[family-name:var(--font-heading)] text-lg sm:text-xl font-semibold tracking-wider text-[#FDF9F3] uppercase mb-3">
                  {s.title}
                </h3>
                <p className="text-xs sm:text-sm text-[#E5D2C2] font-light leading-relaxed">
                  {s.description}
                </p>
              </div>

              <div className="pt-4 border-t border-[#E8D08A]/20 mt-6">
                <span className="text-[10px] uppercase tracking-[0.16em] text-[#E8D08A]">
                  Curated Support
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
