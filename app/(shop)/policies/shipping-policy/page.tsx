import type { Metadata } from 'next';
import PolicyLayout from '@/components/policies/PolicyLayout';

export const metadata: Metadata = {
  title: 'Shipping Policy',
  description:
    'KAANSA shipping coverage, dispatch timelines, insured packaging, OTP delivery, and tracking information across India and globally.',
  alternates: {
    canonical: '/policies/shipping-policy',
  },
};

export default function ShippingPolicyPage() {
  return (
    <PolicyLayout
      title="Shipping Policy"
      subtitle="Information on shipping coverage, order processing, delivery timelines, packaging safety, and courier tracking."
      lastUpdated="6 October 2026"
    >
      <div className="space-y-6 text-[var(--color-text)]">
        {/* Intro */}
        <section className="space-y-4">
          <p>
            At <strong>KAANSA</strong>, we take immense care to ensure that your handcrafted metalware is processed, packed, and delivered as safely and expeditiously as possible. This Shipping Policy explains our courier coverage, dispatch standards, delivery timelines, tracking tools, and protocol in the rare event of transit disruptions.
          </p>
        </section>

        {/* 1. Coverage */}
        <section className="space-y-3">
          <h2>1. Shipping Coverage</h2>
          <p>
            KAANSA offers doorstep delivery across <strong>27,000+ pin codes in India</strong> through premier logistics partners (Blue Dart, Delhivery, DTDC, and India Post). We also fulfill bespoke international orders to North America, the UK, Europe, the UAE, and Singapore on request.
          </p>
        </section>

        {/* 2. Processing & Dispatch Timelines */}
        <section className="space-y-3">
          <h2>2. Order Processing &amp; Dispatch</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>Standard Orders:</strong> Inspected, packed, and dispatched within <strong>24 to 48 business hours</strong> of order confirmation.</li>
            <li><strong>Weekend Orders:</strong> Orders confirmed on Saturday afternoon, Sunday, or national holidays are dispatched on the next working day.</li>
            <li><strong>Custom &amp; Engraved Pieces:</strong> Personalized metalware or made-to-order hammered pieces require <strong>5 to 7 working days</strong> for master artisan preparation before courier handover.</li>
            <li><strong>Festive Rush:</strong> During Diwali, wedding peaks, or major launches, processing may extend by 1–2 days.</li>
          </ul>
        </section>

        {/* 3. Delivery Timelines */}
        <section className="space-y-3">
          <h2>3. Delivery Timelines</h2>
          <p>
            Once dispatched, delivery timelines vary based on geography:
          </p>
          <div className="grid sm:grid-cols-3 gap-4 text-sm pt-2">
            <div className="bg-[var(--color-surface)]/60 p-4 border border-[var(--color-border)]">
              <span className="font-semibold block text-[#2D0B18] mb-1">Tier 1 &amp; Metro Cities</span>
              <p className="text-xs text-[var(--color-muted)]">Delhi NCR, Mumbai, Bengaluru, Chennai, Kolkata, Hyderabad, Pune</p>
              <p className="mt-2 font-medium">2 to 4 Working Days</p>
            </div>
            <div className="bg-[var(--color-surface)]/60 p-4 border border-[var(--color-border)]">
              <span className="font-semibold block text-[#2D0B18] mb-1">Tier 2 &amp; Regional Centers</span>
              <p className="text-xs text-[var(--color-muted)]">State capitals, major commercial districts across India</p>
              <p className="mt-2 font-medium">4 to 6 Working Days</p>
            </div>
            <div className="bg-[var(--color-surface)]/60 p-4 border border-[var(--color-border)]">
              <span className="font-semibold block text-[#2D0B18] mb-1">Remote &amp; North East</span>
              <p className="text-xs text-[var(--color-muted)]">Special service zones, hill stations, remote union territories</p>
              <p className="mt-2 font-medium">6 to 9 Working Days</p>
            </div>
          </div>
        </section>

        {/* 4. OTP Delivery */}
        <section className="space-y-3">
          <h2>4. Secure OTP-Based Delivery</h2>
          <p>
            For high-value heritage orders, our delivery partners deploy <strong>One-Time Password (OTP) verification</strong>. Please ensure your registered contact number is active. Share the delivery OTP with the courier executive only when the package is handed over at your doorstep. Never share OTPs over phone calls or SMS prior to arrival.
          </p>
        </section>

        {/* 5. Packaging Safety */}
        <section className="space-y-3">
          <h2>5. Packaging Safety &amp; Unboxing Recording</h2>
          <p>
            Each piece of metalware is wrapped in scratch-resistant paper, insulated with multi-layer high-density air cushions, and secured inside a heavy 5-ply corrugated outer shipping carton.
          </p>
          <div className="bg-[#2D0B18]/5 border-l-2 border-[#C9A24B] p-4 space-y-1">
            <span className="text-xs uppercase tracking-wider text-[#2D0B18] font-semibold block">
              Transit Damage Notice
            </span>
            <p className="text-sm">
              If the outer box appears visibly compromised or crushed upon arrival, photograph the parcel before opening. As detailed in our Return Policy, an uninterrupted unboxing video is required to claim transit insurance compensation.
            </p>
          </div>
        </section>

        {/* 6. Tracking */}
        <section className="space-y-3">
          <h2>6. Tracking &amp; Delivery Attempts</h2>
          <p>
            You will receive automated tracking alerts via SMS, WhatsApp, and email with the courier AWB number as soon as the consignment is scanned. Couriers make up to <strong>3 consecutive delivery attempts</strong> before returning parcels to our warehouse. Please ensure recipient contact details are accurate.
          </p>
        </section>

        {/* 7. International */}
        <section className="space-y-3">
          <h2>7. International Shipments &amp; Customs Duties</h2>
          <p>
            For overseas shipments, customs duties, local import taxes (VAT/GST), and statutory clearance charges applicable in the destination country are the responsibility of the recipient and are collected directly by the courier prior to release.
          </p>
        </section>
      </div>
    </PolicyLayout>
  );
}
