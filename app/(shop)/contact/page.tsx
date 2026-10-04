import Image from 'next/image';
import type { Metadata } from 'next';
import ContactForm from '@/components/contact/ContactForm';
import Faq from '@/components/home/Faq';
import { siteContact } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Contact Us',
  description:
    'Questions about an order, a piece, gifting or care? Get in touch with the Kaansa team for handcrafted brass, kansa and copper.',
  alternates: { canonical: '/contact' },
};

type Channel = { label: string; value: string; href: string; icon: React.ReactNode };

const icon = (d: string) => (
  <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={1.4} aria-hidden>
    <path d={d} strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export default function ContactPage() {
  const { email, phone, whatsapp, address, hours, legalName, gstin } = siteContact;

  const channels: Channel[] = [
    email && {
      label: 'Email',
      value: email,
      href: `mailto:${email}`,
      icon: icon('M3 6.5h18v11H3zM3 7l9 6.5L21 7'),
    },
    phone && {
      label: 'Phone',
      value: phone,
      href: `tel:${phone.replace(/\s/g, '')}`,
      icon: icon('M5 4h4l2 5-2.5 1.5a11 11 0 005 5L15 13l5 2v4a1 1 0 01-1 1A16 16 0 014 5a1 1 0 011-1z'),
    },
    whatsapp && {
      label: 'WhatsApp',
      value: 'Chat with us',
      href: `https://wa.me/${whatsapp}`,
      icon: icon('M4 20l1.3-3.9A8 8 0 1112 20a8 8 0 01-4-1.1L4 20z'),
    },
  ].filter(Boolean) as Channel[];

  return (
    <div className="bg-[var(--color-bg)]">
      {/* Hero strip */}
      <section className="relative overflow-hidden bg-[#1B0F08] text-[#FBF5EA]">
        <Image
          src="/images/craftsmanship.jpg"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-35"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#1B0F08] via-[#1B0F08]/80 to-[#1B0F08]/30" />
        <div className="relative max-w-7xl mx-auto px-6 py-24 lg:py-32">
          <span className="text-xs uppercase tracking-[0.24em] text-[var(--color-gold)] font-medium block mb-5 font-[family-name:var(--font-body)]">
            Get in Touch
          </span>
          <h1 className="font-[family-name:var(--font-display)] text-5xl sm:text-6xl lg:text-7xl leading-[1.05] max-w-3xl">
            We&rsquo;d love to <span className="italic text-[var(--color-gold)]">hear from you.</span>
          </h1>
          <p className="mt-6 max-w-xl text-base sm:text-lg text-[#F3E7D3]/80 font-light leading-relaxed">
            A question about an order, a piece for your altar, or gifts for a wedding. Write to us and a real person from our team
            will reply.
          </p>
        </div>
      </section>

      {/* Form + details */}
      <section className="max-w-7xl mx-auto px-6 -mt-12 lg:-mt-16 relative z-10 pb-20 lg:pb-28">
        <div className="grid lg:grid-cols-12 gap-0 border border-[var(--color-border)] bg-[var(--color-bg)] shadow-[0_40px_80px_-40px_rgba(44,26,14,0.35)]">
          {/* Form */}
          <div className="lg:col-span-7 p-8 sm:p-12 lg:p-14">
            <h2 className="font-[family-name:var(--font-display)] text-3xl sm:text-4xl text-[var(--color-text)] mb-2">
              Send us a message
            </h2>
            <p className="text-[15px] text-[var(--color-muted)] font-light mb-10">Fields marked * are required.</p>
            <ContactForm />
          </div>

          {/* Details */}
          <aside className="lg:col-span-5 bg-[var(--color-surface)] p-8 sm:p-12 lg:p-14 border-t lg:border-t-0 lg:border-l border-[var(--color-border)] flex flex-col">
            <h2 className="font-[family-name:var(--font-display)] text-3xl text-[var(--color-text)] mb-8">Other ways to reach us</h2>

            {channels.length > 0 && (
              <ul className="space-y-3 mb-10">
                {channels.map((c) => (
                  <li key={c.label}>
                    <a
                      href={c.href}
                      target={c.label === 'WhatsApp' ? '_blank' : undefined}
                      rel={c.label === 'WhatsApp' ? 'noopener noreferrer' : undefined}
                      className="group flex items-center gap-4 border border-[var(--color-border)] bg-[var(--color-bg)] px-5 py-4 transition-all duration-300 hover:border-[var(--color-accent)] hover:-translate-y-0.5"
                    >
                      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[var(--color-accent)]/10 text-[var(--color-accent)] transition-colors group-hover:bg-[var(--color-accent)] group-hover:text-[#FBF5EA]">
                        {c.icon}
                      </span>
                      <span className="flex-1">
                        <span className="block text-[11px] uppercase tracking-[0.16em] text-[var(--color-muted)]">{c.label}</span>
                        <span className="block text-base text-[var(--color-text)]">{c.value}</span>
                      </span>
                      <span className="text-[var(--color-accent)] transition-transform group-hover:translate-x-1" aria-hidden>
                        →
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            )}

            <dl className="space-y-6 text-[15px]">
              <div>
                <dt className="text-[11px] uppercase tracking-[0.16em] text-[var(--color-accent)] mb-1.5">Hours</dt>
                <dd className="text-[var(--color-text)] font-light">{hours}</dd>
              </div>
              {address && (
                <div>
                  <dt className="text-[11px] uppercase tracking-[0.16em] text-[var(--color-accent)] mb-1.5">Registered Office</dt>
                  <dd className="text-[var(--color-text)] font-light leading-relaxed whitespace-pre-line">{address}</dd>
                </div>
              )}
              <div>
                <dt className="text-[11px] uppercase tracking-[0.16em] text-[var(--color-accent)] mb-1.5">Gifting &amp; bulk orders</dt>
                <dd className="text-[var(--color-text)] font-light leading-relaxed">
                  Planning wedding favours or corporate gifts? Choose &ldquo;Gifting &amp; bulk orders&rdquo; in the form and tell us
                  the quantity and date.
                </dd>
              </div>
              <div className="pt-6 border-t border-[var(--color-border)]">
                <dt className="text-[11px] uppercase tracking-[0.16em] text-[var(--color-accent)] mb-1.5">Legal</dt>
                <dd className="text-[var(--color-text)] font-light leading-relaxed">
                  {legalName}
                  <span className="block text-[13px] text-[var(--color-muted)] tracking-wide">GSTIN: {gstin}</span>
                </dd>
              </div>
            </dl>

            <div className="mt-auto pt-10">
              <div className="relative aspect-[16/9] overflow-hidden">
                <Image
                  src="/images/gifting.jpg"
                  alt="Kaansa brass pieces in gift packaging"
                  fill
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="object-cover"
                />
              </div>
            </div>
          </aside>
        </div>
      </section>

      <div className="border-t border-[var(--color-border)]">
        <Faq />
      </div>
    </div>
  );
}
