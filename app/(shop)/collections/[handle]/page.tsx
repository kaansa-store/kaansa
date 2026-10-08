import { Suspense } from 'react';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Image from 'next/image';
import { getCollection, getCollections } from '@/lib/shopify';
import ProductGrid from '@/components/product/ProductGrid';
import CollectionFilters from '@/components/product/CollectionFilters';
import Divider from '@/components/ui/Divider';
import LiveCollectionMeta from '@/components/collection/LiveCollectionMeta';
import Skeleton from '@/components/ui/Skeleton';
import { jsonLdString } from '@/lib/utils/jsonld';

interface PageProps {
  params: Promise<{ handle: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

const BANNER_MAP: Record<string, string> = {
  all: '/images/collections-all.jpg',
  'pooja-essentials': '/images/collections-pooja.jpg',
  'home-decor': '/images/collections-decor.jpg',
  'kitchen-tableware': '/images/collections-kitchen.jpg',
};

const TYPE_BANNER_MAP: Record<string, string> = {
  'Pooja Essentials': '/images/collections-pooja.jpg',
  'Home Decor': '/images/collections-decor.jpg',
  'Kitchen & Tableware': '/images/collections-kitchen.jpg',
};

export const revalidate = 3600;

export async function generateStaticParams() {
  const collections = await getCollections(50);
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
  const q = typeof search.q === 'string' ? search.q : undefined;
  const minPrice = typeof search.min === 'string' ? parseFloat(search.min) : undefined;
  const maxPrice = typeof search.max === 'string' ? parseFloat(search.max) : undefined;

  const collection = await getCollection(handle, {
    sort,
    type,
    minPrice,
    maxPrice,
    q,
  });

  if (!collection) {
    notFound();
  }

  const bannerImage = (type && TYPE_BANNER_MAP[type]) || BANNER_MAP[handle] || '/images/collections-all.jpg';

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
        dangerouslySetInnerHTML={{ __html: jsonLdString(breadcrumbJsonLd) }}
      />

      {/* Visual Header Banner */}
      <div className="relative w-full overflow-hidden bg-[#1A0E08] text-white py-16 md:py-24 mb-10">
        <div className="absolute inset-0 z-0">
          <Image
            src={bannerImage}
            alt={collection.title}
            fill
            priority
            sizes="100vw"
            className="object-cover opacity-35 scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#140B06] via-[#140B06]/70 to-black/60" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          <span className="inline-block text-[11px] uppercase tracking-[0.24em] text-[var(--color-gold)] font-medium font-[family-name:var(--font-body)] mb-4">
            Handcrafted Catalogue
          </span>
          <h1 className="font-[family-name:var(--font-display)] text-4xl sm:text-5xl md:text-6xl text-[#FBF5EA] mb-4">
            {type || collection.title}
          </h1>
          <Divider className="my-3 opacity-60" />
          {collection.description && (
            <p className="font-[family-name:var(--font-body)] text-sm md:text-base text-[#F3E7D3]/85 leading-relaxed max-w-xl mx-auto font-light">
              {collection.description}
            </p>
          )}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 pb-20">
        <Suspense
          fallback={
            <Skeleton style={{ aspectRatio: '3/1', width: '100%' }} />
          }
        >
          <LiveCollectionMeta handle={handle} />
        </Suspense>

        <CollectionFilters
          currentType={type}
          currentSort={sort}
        />

        <ProductGrid products={collection.products || []} />
      </div>
    </>
  );
}
