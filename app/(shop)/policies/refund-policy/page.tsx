import type { Metadata } from 'next';
import PolicyLayout from '@/components/policies/PolicyLayout';
import { siteContact } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Return, Refund & Exchange Policy',
  description:
    'Read the official KAANSA Return, Refund & Exchange Policy covering damaged shipments, unboxing video requirements, and claim guidelines.',
  alternates: {
    canonical: '/policies/refund-policy',
  },
};

export default function RefundPolicyPage() {
  return (
    <PolicyLayout
      title="Return, Refund & Exchange Policy"
      subtitle="Guidelines on order verification, damaged product claims, transit inspection, and resolution processes."
      lastUpdated="6 October 2026"
    >
      <div className="space-y-6 text-[var(--color-text)]">
        {/* Intro */}
        <section className="space-y-4">
          <p>
            At <strong>KAANSA</strong>, every piece is individually inspected and packed with protective cushioning before dispatch. Because our pieces are handcrafted from pure brass, bell-metal (kansa), and copper using ancient metallurgical traditions, we follow a specific return, refund, and exchange policy designed to ensure fairness, product safety, and craft integrity.
          </p>
          <p>
            Please read this policy carefully before placing your order. Nothing in this policy is intended to exclude or restrict any non-excludable statutory rights under applicable Indian consumer laws.
          </p>
        </section>

        {/* 1. General Return Policy */}
        <section className="space-y-3">
          <h2>1. General Return Policy</h2>
          <p>
            KAANSA generally does not accept returns for handcrafted products that are delivered in complete, good, and undamaged condition. Due to the sacred and intimate utility of ritual pooja essentials, tableware, and cookware, pieces once delivered in undamaged state are considered final sale.
          </p>
          <p>
            Returns, replacements, or refunds are granted under verified circumstances:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Product received materially damaged during transit.</li>
            <li>Incorrect piece shipped relative to your order confirmation.</li>
            <li>Missing accessory, lid, or component from the set.</li>
            <li>Material defect that renders the piece unusable for its intended purpose.</li>
          </ul>
        </section>

        {/* 2. Damaged Claims & Unboxing Video */}
        <section className="space-y-3">
          <h2>2. Damaged Product Claims &amp; Unboxing Video Requirement</h2>
          <div className="bg-[#2D0B18]/5 border-l-2 border-[#C9A24B] p-4 space-y-2">
            <span className="text-xs uppercase tracking-wider text-[#2D0B18] font-semibold block">
              Important: 48-Hour Notice Window
            </span>
            <p className="text-sm">
              If an item arrives damaged, notify KAANSA Customer Support within <strong>48 hours of delivery</strong>. Please do not discard the outer carton, shipping label, protective bubble wrap, or wooden supports until the claim is fully verified and resolved.
            </p>
          </div>

          <h3>Continuous Unboxing Video Guidelines:</h3>
          <p>
            To protect both artisans and patrons against fraudulent claims, a continuous, uncut unboxing video is required. The video must:
          </p>
          <ol className="list-decimal pl-6 space-y-1.5">
            <li>Begin before the outer carton seal is broken or cut.</li>
            <li>Clearly display the pasted courier shipping label with the tracking barcode.</li>
            <li>Show the package being opened from its intact, sealed condition.</li>
            <li>Show the piece being removed from inner protective wrap and inspected.</li>
            <li>Clearly capture any dent, fracture, crack, or damage.</li>
          </ol>
        </section>

        {/* 3. Missing Items */}
        <section className="space-y-3">
          <h2>3. Missing Items &amp; Incorrect Products</h2>
          <p>
            If a component (e.g. lid, brass spoon, diya wick holder) is missing or an incorrect product was delivered, notify us within 48 hours with photographs and your unboxing video. Upon rapid verification, KAANSA will dispatch the missing component or correct replacement via priority express at our cost.
          </p>
        </section>

        {/* 4. Refunds */}
        <section className="space-y-3">
          <h2>4. Refund Process &amp; Timelines</h2>
          <p>
            Where a refund is approved by our inspection team:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Refunds are credited directly to the original payment source (Credit/Debit Card, UPI, Net Banking) used at purchase.</li>
            <li>For Cash on Delivery orders, refunds are disbursed via secure NEFT/IMPS bank transfer or instant UPI upon verification of bank details.</li>
            <li>Once initiated, banks and card networks typically reflect the credit within <strong>5 to 7 working days</strong>.</li>
          </ul>
        </section>

        {/* 5. Exchanges */}
        <section className="space-y-3">
          <h2>5. Exchanges &amp; Reverse Shipping</h2>
          <p>
            For verified transit damages, replacement shipping is 100% borne by KAANSA. If the identical artisan item is out of stock, we offer an equivalent piece or full refund.
          </p>
          <p>
            Where an exchange is approved on customer preference (non-damage exception), a nominal reverse-pickup convenience charge of ₹250–₹500 (depending on volumetric weight) will apply.
          </p>
        </section>

        {/* 6. Marketplace Orders */}
        <section className="space-y-3">
          <h2>6. Orders Placed on Third-Party Marketplaces</h2>
          <p>
            For orders placed through third-party platforms, the respective marketplace&rsquo;s return, refund, and claims policy takes precedence. Please initiate claims directly through your marketplace order dashboard.
          </p>
        </section>

        {/* 7. Raising a Claim */}
        <section className="space-y-3">
          <h2>7. Cancellations &amp; Raising a Request</h2>
          <p>
            Orders can be cancelled free of charge <strong>prior to courier dispatch</strong>. Once handed over to the courier partner, an in-transit order cannot be cancelled.
          </p>
          <p>
            To raise a return, refund, or damage claim, email <a href={`mailto:${siteContact.email}`} className="text-[#2D0B18] font-medium underline">{siteContact.email}</a> or WhatsApp <a href={`https://wa.me/${siteContact.whatsapp}`} className="text-[#2D0B18] font-medium underline">{siteContact.phone}</a> with:
          </p>
          <ul className="list-disc pl-6 space-y-1.5">
            <li>Order ID (e.g. #KNS-1042)</li>
            <li>Customer Name &amp; Contact Number</li>
            <li>Clear description of the issue</li>
            <li>Photographs &amp; continuous Unboxing Video link</li>
          </ul>
        </section>

        {/* 8. Natural Craft Characteristics */}
        <section className="space-y-3">
          <h2>8. Natural Artisan Characteristics (Exclusions)</h2>
          <p>
            Each KAANSA object is beaten, cast, or hammered by hand. Subtle variations in hammer marks, minor surface texture, natural color gradients, or organic patina development are hallmarks of pure metalcraft, not defects, and do not qualify as grounds for return.
          </p>
        </section>
      </div>
    </PolicyLayout>
  );
}
