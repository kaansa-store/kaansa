import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { getCollection, getCollections } from '@/lib/shopify';
import ProductGrid from '@/components/product/ProductGrid';
import CollectionFilters from '@/components/product/CollectionFilters';
import Divider from '@/components/ui/Divider';

interface PageProps {
  params: Promise<{ handle: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export async function generateStaticParams() {
  const collections = await getCollections();
  const handles = collections.map((c) => ({ handle: c.handle }));
  return [{ handle: 'all' }, ...handles];
}

export async function generateMetadata(props: PageProps): Promise<Metadata> {
  const { handle } = await props.params;
  const collection = await getCollection(handle);

  if (!collection) {
    return {
      title: 'Collection Not Found | Kaansa',
    };
  }

  return {
    title: collection.seo?.title || `${collection.title} | Kaansa`,
    description:
      collection.seo?.description ||
      collection.description ||
      'Browse our curated collection of handcrafted brass and copper heritage pieces.',
    alternates: {
      canonical: `/collections/${handle}`,
    },
  };
}

export default async function CollectionDetailPage(props: PageProps) {
  const { handle } = await props.params;
  const search = await props.searchParams;

  const sort = typeof search.sort === 'string' ? search.sort : 'featured';
  const type = typeof search.type === 'string' ? search.type : undefined;
  const minPrice = typeof search.min === 'string' ? parseFloat(search.min) : undefined;
  const maxPrice = typeof search.max === 'string' ? parseFloat(search.max) : undefined;

  const collection = await getCollection(handle, {
    sort,
    type,
    minPrice,
    maxPrice,
  });

  if (!collection) {
    notFound();
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: siteUrl },
      { '@type': 'ListItem', position: 2, name: 'Collections', item: `${siteUrl}/collections` },
      { '@type': 'ListItem', position: 3, name: collection.title, item: `${siteUrl}/collections/${handle}` },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      <div className="max-w-7xl mx-auto px-6 py-12 lg:py-20">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <h1 className="font-[family-name:var(--font-display)] text-4xl md:text-6xl text-[var(--color-text)]">
            {collection.title}
          </h1>
          <Divider className="my-3" />
          {collection.description && (
            <p className="font-[family-name:var(--font-body)] text-sm md:text-base text-[var(--color-muted)] leading-relaxed">
              {collection.description}
            </p>
          )}
        </div>

        <CollectionFilters
          currentType={type}
          currentSort={sort}
        />

        <ProductGrid products={collection.products || []} />
      </div>
    </>
  );
}
