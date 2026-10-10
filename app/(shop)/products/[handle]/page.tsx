import { Suspense } from 'react';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { getProduct, getProducts, getProductRecommendations } from '@/lib/shopify';
import ProductGallery from '@/components/product/ProductGallery';
import ProductDetails from '@/components/product/ProductDetails';
import RelatedProducts from '@/components/product/RelatedProducts';
import StickyAddToCart from '@/components/product/StickyAddToCart';
import ProductReviews from '@/components/product/ProductReviews';
import LiveInventory from '@/components/product/LiveInventory';
import { jsonLdString } from '@/lib/utils/jsonld';

interface PageProps {
  params: Promise<{ handle: string }>;
}

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function generateMetadata(props: PageProps): Promise<Metadata> {
  const { handle } = await props.params;
  const product = await getProduct(handle);

  if (!product) {
    return {
      title: 'Product Not Found | Kaansa',
    };
  }

  const imageUrl = product.featuredImage?.url || product.images?.[0]?.url;

  return {
    title: product.seo?.title || `${product.title} | Kaansa`,
    description: product.seo?.description || product.description?.slice(0, 155),
    openGraph: {
      title: product.seo?.title || product.title,
      description: product.seo?.description || product.description?.slice(0, 155),
      images: imageUrl ? [{ url: imageUrl, width: 1086, height: 1448 }] : [],
      type: 'website',
    },
    alternates: {
      canonical: `/products/${product.handle}`,
    },
  };
}

export default async function ProductPage(props: PageProps) {
  const { handle } = await props.params;
  const product = await getProduct(handle);

  if (!product) {
    notFound();
  }

  // Fetch recommendations in parallel
  const recommendations = await getProductRecommendations(product.id);

  // Structured Data (JSON-LD)
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
  const productJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.title,
    description: product.description,
    image: product.images.map((img) => img.url),
    brand: { '@type': 'Brand', name: 'Kaansa' },
    offers: {
      '@type': 'Offer',
      priceCurrency: product.variants?.[0]?.price.currencyCode || 'INR',
      price: product.variants?.[0]?.price.amount || product.priceRange.minVariantPrice.amount,
      availability: product.availableForSale
        ? 'https://schema.org/InStock'
        : 'https://schema.org/OutOfStock',
      seller: { '@type': 'Organization', name: 'Kaansa' },
    },
  };

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: siteUrl },
      { '@type': 'ListItem', position: 2, name: 'Collections', item: `${siteUrl}/collections` },
      { '@type': 'ListItem', position: 3, name: product.title, item: `${siteUrl}/products/${product.handle}` },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdString(productJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdString(breadcrumbJsonLd) }}
      />

      <div className="max-w-7xl mx-auto px-6 py-12 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          <ProductGallery images={product.images} title={product.title} />
          <ProductDetails product={product}>
            <Suspense fallback={null}>
              <LiveInventory
                handle={handle}
                variantId={product.variants[0]?.id || ''}
              />
            </Suspense>
          </ProductDetails>
        </div>

        <ProductReviews productHandle={product.handle} productTitle={product.title} />

        <RelatedProducts products={recommendations} />
      </div>

      <StickyAddToCart product={product} />
    </>
  );
}
