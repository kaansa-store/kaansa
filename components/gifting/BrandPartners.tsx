import React from 'react';

const brands = [
  { name: 'dentsu', subtitle: 'Global Communications' },
  { name: "Haldiram's", subtitle: 'Confectionery & Mithai' },
  { name: 'TITAN CAPITAL', subtitle: 'Venture Capital' },
  { name: 'BIKANERVALA', subtitle: 'Royal Indian Sweets' },
  { name: 'METRO', subtitle: 'Wholesale & Retail' },
  { name: 'KAPOOR OPTICAL CO.', subtitle: 'Luxury Eyewear' },
  { name: 'Pernod Ricard', subtitle: 'Global Distillers' },
  { name: 'HYATT', subtitle: 'Luxury Hospitality' },
  { name: 'WINGREENS WORLD', subtitle: 'Gourmet Foods' },
  { name: 'VAHDAM', subtitle: 'India Tea & Wellness' },
  { name: 'anveshan', subtitle: 'Pure Food Farm' },
  { name: '4700 BC', subtitle: 'Gourmet Snacks' },
];

export default function BrandPartners() {
  return (
    <section className="bg-[var(--color-bg)] py-16 sm:py-20 border-b border-[var(--color-border)]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-10 sm:mb-14">
          <span className="text-[11px] sm:text-xs uppercase tracking-[0.28em] text-[var(--color-gold)] font-medium font-[family-name:var(--font-body)] block mb-2">
            Trusted By Leading Institutions
          </span>
          <h2 className="font-[family-name:var(--font-display)] text-2xl sm:text-3xl lg:text-4xl uppercase tracking-[0.12em] text-[var(--color-text)]">
            Great Brands, Gift Alike
          </h2>
        </div>

        {/* Brand Grid matching clean layout in PDF */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 border-t border-l border-[var(--color-border)] bg-[var(--color-surface)]/30">
          {brands.map((b) => (
            <div
              key={b.name}
              className="group border-r border-b border-[var(--color-border)] p-6 sm:p-8 flex flex-col items-center justify-center min-h-[110px] sm:min-h-[130px] text-center transition-all duration-300 hover:bg-[var(--color-bg)]"
            >
              <span className="font-[family-name:var(--font-heading)] font-semibold text-base sm:text-lg text-[var(--color-text)] tracking-wider group-hover:text-[var(--color-accent)] transition-colors">
                {b.name}
              </span>
              <span className="text-[9px] uppercase tracking-[0.16em] text-[var(--color-muted)] font-[family-name:var(--font-body)] mt-1 opacity-70">
                {b.subtitle}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
