import Link from 'next/link';
import type { Metadata } from 'next';
import { getCollections } from '@/lib/shopify';
import Divider from '@/components/ui/Divider';

export const metadata: Metadata = {
  title: 'All Collections | Kaansa',
  description:
    'Discover our collections of handcrafted brass and copper heritage objects for your pooja, home decor, and dining.',
  alternates: {
    canonical: '/collections',
  },
};

export default async function CollectionsPage() {
  const collections = await getCollections();

  const categories = [
    {
      title: 'Pooja Essentials',
      description: 'Diyas, urlis, flower baskets, and sacred thalis for daily rituals.',
      href: '/collections/all?type=Pooja+Essentials',
    },
    {
      title: 'Home Decor',
      description: 'Handcrafted wall hangings, bells, and decorative brass statues.',
      href: '/collections/all?type=Home+Decor',
    },
    {
      title: 'Kitchen & Tableware',
      description: 'Traditional ghee pots, pooja glasses, and copper water bottles.',
      href: '/collections/all?type=Kitchen+%26+Tableware',
    },
    {
      title: 'All Pieces',
      description: 'View the complete catalogue of authentic artisan metalware.',
      href: '/collections/all',
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-6 py-16 lg:py-24">
      <div className="text-center max-w-2xl mx-auto mb-16">
        <h1 className="font-[family-name:var(--font-display)] text-4xl md:text-6xl text-[var(--color-text)]">
          Collections
        </h1>
        <Divider className="my-4" />
        <p className="font-[family-name:var(--font-body)] text-sm md:text-base text-[var(--color-muted)] leading-relaxed">
          Each piece is shaped, hammered and polished by master artisans in India. Made to be used and cherished for generations.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {categories.map((cat) => (
          <Link
            key={cat.title}
            href={cat.href}
            className="group relative p-10 bg-[var(--color-surface)] border border-[var(--color-border)] hover:border-[var(--color-text)] transition-colors flex flex-col justify-between min-h-[220px]"
          >
            <div>
              <h2 className="font-[family-name:var(--font-heading)] text-2xl text-[var(--color-text)] mb-3 group-hover:text-[var(--color-accent)] transition-colors">
                {cat.title}
              </h2>
              <p className="font-[family-name:var(--font-body)] text-sm text-[var(--color-muted)] leading-relaxed">
                {cat.description}
              </p>
            </div>

            <div className="mt-6 flex items-center text-xs uppercase tracking-[0.1em] text-[var(--color-accent)] font-medium">
              <span>Explore collection</span>
              <span className="ml-2 transition-transform duration-200 group-hover:translate-x-1">→</span>
            </div>
          </Link>
        ))}
      </div>

      {collections.length > 0 && (
        <div className="mt-16 pt-12 border-t border-[var(--color-border)]">
          <h3 className="text-xs uppercase tracking-[0.12em] text-[var(--color-muted)] font-[family-name:var(--font-body)] mb-6 text-center">
            Shopify Store Collections
          </h3>
          <div className="flex flex-wrap justify-center gap-4">
            {collections.map((col) => (
              <Link
                key={col.handle}
                href={`/collections/${col.handle}`}
                className="px-6 py-2.5 bg-[var(--color-bg)] border border-[var(--color-border)] text-xs uppercase tracking-wider text-[var(--color-text)] hover:border-[var(--color-gold)] transition-colors"
              >
                {col.title}
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
