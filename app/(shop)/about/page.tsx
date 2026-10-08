import type { Metadata } from 'next';
import AboutHero from '@/components/about/AboutHero';
import AboutMetals from '@/components/about/AboutMetals';
import AboutExpect from '@/components/about/AboutExpect';
import AboutGifting from '@/components/about/AboutGifting';
import AboutLegacy from '@/components/about/AboutLegacy';

export const metadata: Metadata = {
  title: {
    absolute: 'About Kaansa | Handcrafted Brass, Bronze and Copper from India',
  },
  description:
    'Kaansa makes handcrafted brass, bronze and copper pieces for the puja room, the kitchen and the home. Rooted in tradition, crafted for eternity.',
  alternates: {
    canonical: '/about',
  },
  openGraph: {
    title: 'About Kaansa | Handcrafted Brass, Bronze and Copper from India',
    description:
      'Kaansa makes handcrafted brass, bronze and copper pieces for the puja room, the kitchen and the home. Rooted in tradition, crafted for eternity.',
  },
};

export default function AboutPage() {
  return (
    <div className="bg-[var(--color-bg)]">
      <AboutHero />
      <AboutMetals />
      <AboutExpect />
      <AboutGifting />
      <AboutLegacy />
    </div>
  );
}
