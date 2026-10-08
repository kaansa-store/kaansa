import { Suspense } from 'react';
import Link from 'next/link';
import { getProducts } from '@/lib/shopify';
import { Product } from '@/lib/shopify/types';
import ProductGrid from '@/components/product/ProductGrid';
import SearchClient from '@/components/search/SearchClient';

export const metadata = {
  title: 'Search Collection | Kaansa Heritage Metalware',
  description: 'Search our handcrafted bronze, brass, and copper pieces by metal, use, or ritual.',
};

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q } = await searchParams;
  const rawQuery = (q || '').trim().slice(0, 80);

  // TODO: Move to server-side search with pagination once the catalogue passes 250 products
  // Fetch products
  const allProducts = await getProducts({ first: 250 });

  let results: Product[] = [];
  if (rawQuery) {
    const term = rawQuery.toLowerCase();
    results = allProducts.filter((p) => {
      const matchTitle = p.title.toLowerCase().includes(term);
      const matchType = p.productType?.toLowerCase().includes(term);
      const matchTags = p.tags?.some((t) => t.toLowerCase().includes(term));
      const matchVendor = p.vendor?.toLowerCase().includes(term);
      const matchDescription = p.description?.toLowerCase().includes(term);
      return matchTitle || matchType || matchTags || matchVendor || matchDescription;
    });
  } else {
    // If no query yet, show top featured pieces
    results = allProducts.slice(0, 12);
  }

  return (
    <div className="min-h-screen bg-[var(--color-bg)] pb-24">
      {/* Search Header Banner */}
      <section className="pt-16 pb-12 sm:pt-20 sm:pb-16 px-6 border-b border-[var(--color-border)] bg-[rgba(240,228,204,0.4)]">
        <div className="max-w-4xl mx-auto text-center">
          <span className="font-[family-name:var(--font-body)] text-xs uppercase tracking-[0.22em] text-[var(--color-gold)] font-medium">
            Artisan Catalog
          </span>
          <h1 className="font-[family-name:var(--font-display)] text-3xl sm:text-5xl text-[var(--color-text)] mt-2 mb-3">
            Search Collection
          </h1>
          <p className="font-[family-name:var(--font-body)] text-sm sm:text-base text-[var(--color-muted)] max-w-xl mx-auto mb-8">
            Discover handcrafted sacred metalware, pure bell-metal thalis, and pure copper vessels.
          </p>

          <Suspense fallback={<div className="h-14 w-full max-w-2xl mx-auto bg-[var(--color-surface)] animate-pulse" />}>
            <SearchClient initialQuery={rawQuery} />
          </Suspense>
        </div>
      </section>

      {/* Results Section */}
      <section className="max-w-7xl mx-auto px-6 pt-12 sm:pt-16">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 mb-10 border-b border-[var(--color-border)] gap-3">
          <div>
            <h2 className="font-[family-name:var(--font-display)] text-2xl sm:text-3xl text-[var(--color-text)]">
              {rawQuery ? `Results for “${rawQuery}”` : 'Featured Heritage Pieces'}
            </h2>
            <p className="font-[family-name:var(--font-body)] text-xs text-[var(--color-muted)] uppercase tracking-wider mt-1">
              {results.length} {results.length === 1 ? 'piece found' : 'pieces found'}
            </p>
          </div>

          {rawQuery && (
            <Link
              href="/search"
              className="text-xs font-[family-name:var(--font-body)] uppercase tracking-wider text-[var(--color-muted)] hover:text-[var(--color-accent)] transition-colors inline-flex items-center gap-1"
            >
              Clear filter
            </Link>
          )}
        </div>

        {results.length > 0 ? (
          <ProductGrid products={results} />
        ) : (
          <div className="py-20 text-center max-w-md mx-auto">
            <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center rounded-full bg-[var(--color-surface)] text-[var(--color-muted)]">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.3-4.3" />
              </svg>
            </div>
            <h3 className="font-[family-name:var(--font-display)] text-2xl text-[var(--color-text)] mb-2">
              No matching pieces found
            </h3>
            <p className="font-[family-name:var(--font-body)] text-sm text-[var(--color-muted)] mb-8">
              We couldn&apos;t find any pieces matching &ldquo;{rawQuery}&rdquo;. Try another keyword or browse our curated collections below.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <Link
                href="/collections"
                className="px-6 py-3 bg-[var(--color-accent)] text-[#FAF6F0] text-xs font-[family-name:var(--font-body)] uppercase tracking-[0.1em] hover:bg-[var(--color-accent-hover)] transition-colors"
              >
                View all collections
              </Link>
              <Link
                href="/personal-gifting"
                className="px-6 py-3 border border-[var(--color-border)] text-[var(--color-text)] text-xs font-[family-name:var(--font-body)] uppercase tracking-[0.1em] hover:border-[var(--color-text)] transition-colors"
              >
                Personal Gifting
              </Link>
            </div>
          </div>
        )}
      </section>
    </div>
  );
}
