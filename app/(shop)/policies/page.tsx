import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { siteContact } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Policies & Legal Center',
  description:
    'Review all KAANSA store policies including Privacy Policy, Return & Refund Policy, Shipping Policy, and Terms of Service.',
  alternates: {
    canonical: '/policies',
  },
};

const policyCards = [
  {
    title: 'Privacy Policy',
    subtitle: 'Data protection, cookie practices & DPDP Act compliance.',
    href: '/policies/privacy-policy',
    highlights: ['Zero selling of personal data', 'PCI-DSS payment encryption', 'DPDP Act 2023 rights'],
  },
  {
    title: 'Return, Refund & Exchange',
    subtitle: 'Damaged shipment claims, unboxing video protocol & resolutions.',
    href: '/policies/refund-policy',
    highlights: ['48-hour claim window', 'Continuous unboxing video guide', 'Complimentary damage replacements'],
  },
  {
    title: 'Shipping Policy',
    subtitle: 'Coverage across 27,000+ pin codes, dispatch & delivery timelines.',
    href: '/policies/shipping-policy',
    highlights: ['24–48 hour dispatch', 'Insured 5-ply protective packaging', 'Secure OTP-based delivery'],
  },
  {
    title: 'Terms of Service',
    subtitle: 'Legal agreement governing purchases, metalcraft variations & care.',
    href: '/policies/terms-of-service',
    highlights: ['Handmade craft variation terms', 'Custom engraved order rules', 'Governing law & Indian jurisdiction'],
  },
];

export default function PoliciesHubPage() {
  return (
    <div className="bg-[var(--color-bg)] min-h-screen">
      {/* Hero */}
      <section className="relative overflow-hidden bg-[#1B0F08] text-[#FBF5EA]">
        <Image
          src="/images/craftsmanship.jpg"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-25"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#1B0F08] via-[#1B0F08]/85 to-[#1B0F08]/40" />

        <div className="relative max-w-7xl mx-auto px-6 py-20 lg:py-28">
          <div className="max-w-3xl space-y-4">
            <span className="text-xs uppercase tracking-[0.24em] text-[var(--color-gold)] font-medium block font-[family-name:var(--font-body)]">
              Store Governance
            </span>
            <h1 className="font-[family-name:var(--font-display)] text-4xl sm:text-5xl lg:text-6xl uppercase tracking-wide leading-[1.1] text-[#FDF9F3]">
              Policies &amp; Legal Center
            </h1>
            <p className="text-sm sm:text-base text-[#E5D2C2] font-light leading-relaxed max-w-2xl font-[family-name:var(--font-body)]">
              Transparent, fair, and comprehensive guidelines ensuring a safe and trustworthy patronage of handcrafted Indian metalware.
            </p>
          </div>
        </div>
      </section>

      {/* Grid of Policies */}
      <div className="max-w-7xl mx-auto px-6 py-16 lg:py-24">
        <div className="grid md:grid-cols-2 gap-8">
          {policyCards.map((p) => (
            <Link
              key={p.title}
              href={p.href}
              className="group flex flex-col justify-between bg-[var(--color-surface)] border border-[var(--color-border)] p-8 sm:p-10 transition-all duration-300 hover:border-[var(--color-accent)] hover:shadow-lg hover:-translate-y-1"
            >
              <div className="space-y-4">
                <span className="text-[10px] uppercase tracking-[0.2em] text-[var(--color-gold)] font-medium block">
                  Official Policy
                </span>
                <h2 className="font-[family-name:var(--font-heading)] text-2xl text-[var(--color-text)] group-hover:text-[var(--color-accent)] transition-colors">
                  {p.title}
                </h2>
                <p className="text-xs sm:text-sm text-[var(--color-muted)] font-light leading-relaxed">
                  {p.subtitle}
                </p>

                <ul className="space-y-1.5 pt-2 text-xs text-[var(--color-text)]">
                  {p.highlights.map((h, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <span className="text-[var(--color-gold)]">✦</span>
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-6 mt-6 border-t border-[var(--color-border)] flex items-center justify-between text-xs uppercase tracking-wider font-medium text-[var(--color-accent)]">
                <span>Read Full Document</span>
                <span className="group-hover:translate-x-1 transition-transform">→</span>
              </div>
            </Link>
          ))}
        </div>

        {/* Support Section */}
        <div className="mt-16 bg-[#2D0B18] text-[#FBF5EA] p-8 sm:p-12 border border-[#E8D08A]/30">
          <div className="max-w-2xl space-y-4">
            <span className="text-[10px] uppercase tracking-[0.2em] text-[#E8D08A] font-medium block">
              Customer Support
            </span>
            <h3 className="font-[family-name:var(--font-display)] text-2xl sm:text-3xl text-[#FDF9F3]">
              Have Questions Regarding Your Order or Our Policies?
            </h3>
            <p className="text-xs sm:text-sm text-[#D4C3B7] font-light leading-relaxed">
              Our customer care team is available Monday to Saturday, 10am to 7pm IST to assist with any questions, tracking queries, or custom requests.
            </p>
            <div className="pt-4 flex flex-wrap gap-4">
              <a
                href={`mailto:${siteContact.email}`}
                className="px-6 py-2.5 bg-[#E8D08A] text-[#2D0B18] hover:bg-white text-xs uppercase tracking-wider font-medium transition-colors"
              >
                Email Support
              </a>
              <a
                href={`https://wa.me/${siteContact.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-2.5 border border-[#E8D08A]/60 text-[#FBF5EA] hover:bg-[#E8D08A]/10 text-xs uppercase tracking-wider font-medium transition-colors"
              >
                WhatsApp Chat
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
