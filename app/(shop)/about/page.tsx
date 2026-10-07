import type { Metadata } from 'next';
import AboutHero from '@/components/about/AboutHero';
import AboutWhyKaansa from '@/components/about/AboutWhyKaansa';
import AboutPillars from '@/components/about/AboutPillars';
import AboutArtisans from '@/components/about/AboutArtisans';
import AboutPrinciples from '@/components/about/AboutPrinciples';
import AboutImpact from '@/components/about/AboutImpact';
import AboutMission from '@/components/about/AboutMission';

export const metadata: Metadata = {
  title: 'About Us | Kaansa Artisan Heritage',
  description:
    'Discover the story of KAANSA — handcrafted Indian brass, bell-metal (kansa), and copper pieces made by generational master artisans for sacred rituals and mindful everyday living.',
  alternates: {
    canonical: '/about',
  },
};

export default function AboutPage() {
  return (
    <main className="bg-[var(--color-bg)] min-h-screen">
      <AboutHero />
      <AboutWhyKaansa />
      <AboutPillars />
      <AboutArtisans />
      <AboutPrinciples />
      <AboutImpact />
      <AboutMission />
    </main>
  );
}
