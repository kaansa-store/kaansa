import type { Metadata } from 'next';
import PolicyLayout from '@/components/policies/PolicyLayout';
import { siteContact } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Terms of Service',
  description:
    'Terms of Service governing your access to and purchases from the KAANSA website operated by KAANSA & CO.',
  alternates: {
    canonical: '/policies/terms-of-service',
  },
};

export default function TermsOfServicePage() {
  return (
    <PolicyLayout
      title="Terms of Service"
      subtitle="Terms and conditions governing your access to and purchases from KAANSA."
      lastUpdated="6 October 2026"
    >
      <div className="space-y-6 text-[var(--color-text)]">
        {/* Intro */}
        <section className="space-y-4">
          <p>
            Welcome to <strong>KAANSA</strong>. These Terms of Service (&ldquo;Terms&rdquo;) govern your access to and use of the website operated by <strong>{siteContact.legalName}</strong> under the registered brand name <strong>KAANSA</strong> (&ldquo;we&rdquo;, &ldquo;us&rdquo;, or &ldquo;our&rdquo;).
          </p>
          <p>
            By accessing, browsing, or purchasing from our website, you agree to be bound by these Terms. If you do not agree with any part of these Terms, please do not use our website or services.
          </p>
        </section>

        {/* 1. Eligibility */}
        <section className="space-y-3">
          <h2>1. Eligibility &amp; User Conduct</h2>
          <p>
            By using this website or placing an order, you confirm that you are legally capable of entering into a binding contract under the Indian Contract Act, 1872. If you are under 18 years of age, you may browse our catalog only with the direct consent and supervision of a parent or legal guardian.
          </p>
        </section>

        {/* 2. Handcrafted Nature */}
        <section className="space-y-3">
          <h2>2. Handcrafted Nature &amp; Variations</h2>
          <p>
            Our metalware is forged and hammered by hand by traditional artisans. Minor surface nuances, natural hammer facets, subtle tonal shifts, and authentic casting textures are inherent to pure brass, copper, and bell-metal (kansa) traditions. These distinct hallmarks authenticate true handicraft rather than machine production.
          </p>
        </section>

        {/* 3. Pricing */}
        <section className="space-y-3">
          <h2>3. Pricing, GST &amp; Order Acceptance</h2>
          <p>
            All prices displayed on the website are in Indian Rupees (INR) and are inclusive of Goods and Services Tax (GST) as applicable under Indian taxation laws. Receipt of an electronic order confirmation does not constitute our legal acceptance of an order; we reserve the right to cancel orders in cases of verified pricing errors, product unavailability, or suspected fraudulent activity.
          </p>
        </section>

        {/* 4. Customized items */}
        <section className="space-y-3">
          <h2>4. Personalized &amp; Custom Commissions</h2>
          <p>
            Items customized with laser etching, family monograms, personalized foil stamping, or bespoke hammered specifications are created specifically for the patron. Once production begins, customized or engraved orders cannot be cancelled, returned, or exchanged, except in cases of transit damage or manufacturing discrepancy attributable to KAANSA. Patrons remain responsible for verifying the accuracy of initials, names, dates, and spellings provided.
          </p>
        </section>

        {/* 5. Care */}
        <section className="space-y-3">
          <h2>5. Product Care, Patina &amp; Safe Use</h2>
          <p>
            Pure brass and copper react naturally with air and moisture, developing an organic protective patina over time. Regular gentle cleaning with natural tamarind, pitambari powder, or lemon-salt paste restores the golden sheen. KAANSA is not responsible for discolouration resulting from improper chemical cleaners, dishwasher use, or failure to follow supplied care guides.
          </p>
        </section>

        {/* 6. Traditional Knowledge */}
        <section className="space-y-3">
          <h2>6. Traditional Knowledge &amp; Wellness Content</h2>
          <p>
            Historical references to Ayurvedic benefits, traditional Indian metallurgy, and cultural practices shared on our blog or social media are provided for educational and cultural appreciation only. They do not constitute certified medical, diagnostic, or clinical dietary advice.
          </p>
        </section>

        {/* 7. IP */}
        <section className="space-y-3">
          <h2>7. Intellectual Property Rights</h2>
          <p>
            All content on the KAANSA website—including brand emblems, photography, product silhouettes, catalog prose, graphic layout, and digital assets—is the exclusive intellectual property of <strong>{siteContact.legalName}</strong>. Unauthorized reproduction, commercial extraction, or duplication is strictly prohibited.
          </p>
        </section>

        {/* 8. Governing Law */}
        <section className="space-y-3">
          <h2>8. Governing Law &amp; Jurisdiction</h2>
          <p>
            These Terms shall be governed by and construed in accordance with the laws of the Republic of India. Subject to applicable consumer protection legislation, any dispute arising under these Terms shall be subject to the exclusive jurisdiction of the competent courts in <strong>Jhansi, Uttar Pradesh, India</strong>.
          </p>
        </section>
      </div>
    </PolicyLayout>
  );
}
