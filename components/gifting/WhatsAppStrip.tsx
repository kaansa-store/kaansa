import React from 'react';

export default function WhatsAppStrip() {
  return (
    <section className="bg-[#1C0912] text-[#FBF5EA] py-12 border-y border-[#E8D08A]/30">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
        <div>
          <h3 className="font-[family-name:var(--font-heading)] text-xl sm:text-2xl tracking-[0.08em] text-[#FDF9F3] uppercase">
            Prefer To Talk It Through?
          </h3>
          <p className="text-xs sm:text-sm text-[#D4C3B7] font-light mt-1 font-[family-name:var(--font-body)]">
            Send us your event date and a few ideas. Our curator will reply the same day.
          </p>
        </div>

        <a
          href="https://wa.me/917269016093?text=Hi%20Kaansa,%20I'm%20planning%20personal%20gifting%20and%20would%20love%20to%20discuss%20dates%20and%20curated%20ideas."
          target="_blank"
          rel="noopener noreferrer"
          className="px-8 py-3.5 bg-[#FBF5EA] text-[#2D0B18] hover:bg-[#E8D08A] font-[family-name:var(--font-body)] text-xs uppercase tracking-[0.18em] font-medium transition-all duration-300 shadow-md inline-flex items-center gap-2.5 whitespace-nowrap"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-5.46-4.45-9.92-9.91-9.92zm5.83 14.05c-.24.68-1.42 1.31-1.95 1.39-.53.08-1.22.12-3.54-.79-2.95-1.15-4.86-4.14-5.01-4.33-.14-.2-1.21-1.61-1.21-3.07s.76-2.18 1.03-2.47c.27-.3.59-.37.79-.37.2 0 .4 0 .58.01.19.01.44-.07.69.52.26.61.88 2.14.95 2.3.08.15.13.33.03.53-.1.2-.15.33-.3.51-.15.18-.32.41-.46.55-.15.15-.31.32-.13.63.18.3 1.23 2.03 2.64 3.28 1.81 1.61 3.34 2.11 3.81 2.34.47.23.75.19 1.03-.13.28-.32 1.2-1.4 1.52-1.88.32-.48.64-.4.1.75z" />
          </svg>
          Say Hello On WhatsApp
        </a>
      </div>
    </section>
  );
}
