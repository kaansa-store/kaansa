import type { Metadata } from 'next';
import GiftingHero from '@/components/gifting/GiftingHero';
import BrandPartners from '@/components/gifting/BrandPartners';
import HandpickedPieces from '@/components/gifting/HandpickedPieces';
import RealCelebrations from '@/components/gifting/RealCelebrations';
import TestimonialStories from '@/components/gifting/TestimonialStories';
import PersonalisationSuite from '@/components/gifting/PersonalisationSuite';
import GiftingAtelier from '@/components/gifting/GiftingAtelier';
import ProcessSteps from '@/components/gifting/ProcessSteps';
import HeritageStats from '@/components/gifting/HeritageStats';
import GiftingFaq from '@/components/gifting/GiftingFaq';
import GiftingEnquiryForm from '@/components/gifting/GiftingEnquiryForm';
import WhatsAppStrip from '@/components/gifting/WhatsAppStrip';
import StoreExperience from '@/components/gifting/StoreExperience';
import { jsonLdString } from '@/lib/utils/jsonld';

export const metadata: Metadata = {
  title: 'Personal Gifting — Bespoke Wedding Favours & Heirloom Metalware',
  description:
    'Handcrafted brass, copper and kansa personal gifting for weddings, baby announcements, and milestone celebrations. Bespoke boxes, metal engraving, and wax-sealed notes.',
  alternates: {
    canonical: '/personal-gifting',
  },
  openGraph: {
    title: 'Gifts, Made Personal | Kaansa Heritage Metalware',
    description:
      'Wedding favours, baby announcements, and special invitations handcrafted in brass, copper and pure kansa. 50 pieces onwards.',
    images: [{ url: '/images/gifting/hero-hampers.jpg', width: 1200, height: 630, alt: 'Kaansa Personal Gifting Hampers' }],
  },
};

export default function PersonalGiftingPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Kaansa Bespoke Personal Gifting',
    provider: {
      '@type': 'Organization',
      name: 'Kaansa',
      url: 'https://kaansa.in',
    },
    description:
      'Artisanal handcrafted brass, copper and kansa personal gifting for wedding favours, baby announcements, and festive invitations.',
    areaServed: 'IN',
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Personal Gifting Collection',
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Product',
            name: 'The Gifting Atelier Sampler Kit',
            description: 'Bound metal swatch box featuring brass, copper, and kansa finishes.',
          },
          price: '1500',
          priceCurrency: 'INR',
        },
      ],
    },
  };

  return (
    <div className="bg-[var(--color-bg)]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdString(jsonLd) }}
      />

      {/* 1. Hero with Wine Backdrop, Craft Ticker & CTA */}
      <GiftingHero />

      {/* 2. Client Social Proof Logo Grid */}
      <BrandPartners />

      {/* 3. Handpicked Pieces with Interactive Box Switcher */}
      <HandpickedPieces />

      {/* 4. Real Celebrations Stories */}
      <RealCelebrations />

      {/* 5. In Their Words / Testimonials */}
      <TestimonialStories />

      {/* 6. Personalisation Suite (Box, Monograms, Wax Seals, Potlis) */}
      <PersonalisationSuite />

      {/* 7. The Gifting Atelier Kit */}
      <GiftingAtelier />

      {/* 8. 4-Step Process */}
      <ProcessSteps />

      {/* 9. Heritage & UNESCO Craft Tradition */}
      <HeritageStats />

      {/* 10. Frequently Asked Questions */}
      <GiftingFaq />

      {/* 11. Catalogue & Consultation Enquiry Form */}
      <GiftingEnquiryForm />

      {/* 12. Instant WhatsApp Strip */}
      <WhatsAppStrip />

      {/* 13. In-Person Experience Gallery */}
      <StoreExperience />
    </div>
  );
}
