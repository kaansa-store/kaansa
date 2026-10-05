import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import clsx from 'clsx';
import { Product } from '@/lib/shopify/types';
import PriceDisplay from './PriceDisplay';
import RatingBadge from './RatingBadge';

export interface ProductCardProps {
  product: Product;
  priority?: boolean;
  className?: string;
}

export function ProductCard({ product, priority = false, className }: ProductCardProps) {
  const firstVariant = product.variants?.[0];
  const price = firstVariant?.price.amount || product.priceRange.minVariantPrice.amount;
  const compareAtPrice = firstVariant?.compareAtPrice?.amount || product.compareAtPriceRange?.minVariantPrice.amount;
  const isAvailable = product.availableForSale && (firstVariant?.availableForSale ?? true);

  const imageUrl = product.featuredImage?.url || product.images?.[0]?.url;
  const imageAlt = product.featuredImage?.altText || `${product.title} — Kaansa`;

  return (
    <div className={clsx('group flex flex-col', className)}>
      <Link
        href={`/products/${product.handle}`}
        className="block relative w-full aspect-[3/4] bg-[var(--color-bg)] overflow-hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-gold)]"
      >
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={imageAlt}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            priority={priority}
            className="object-contain transition-transform duration-500 ease-out group-hover:scale-[1.04]"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-[var(--color-surface)] text-[var(--color-muted)] text-xs uppercase tracking-widest">
            No image
          </div>
        )}

        {/* Rating Pill Badge */}
        <div className="absolute bottom-2.5 left-2.5 z-10 pointer-events-none transition-transform duration-300 group-hover:translate-y-[-2px]">
          <RatingBadge handle={product.handle} />
        </div>
      </Link>

      <div className="mt-3.5 flex flex-col">
        <Link
          href={`/products/${product.handle}`}
          className="inline-block text-base font-[family-name:var(--font-heading)] font-normal text-[var(--color-text)] transition-colors relative self-start group/title focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-gold)]"
        >
          <span>{product.title}</span>
          <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-[var(--color-gold)] transition-all duration-300 group-hover:w-full" />
        </Link>

        <div className="mt-1 flex items-center justify-between">
          <PriceDisplay
            price={price}
            compareAtPrice={compareAtPrice}
            currencyCode={firstVariant?.price.currencyCode || product.priceRange.minVariantPrice.currencyCode}
            size="sm"
          />

          {!isAvailable && (
            <span className="text-xs font-[family-name:var(--font-body)] uppercase tracking-wider text-[var(--color-danger)] font-medium">
              Sold out
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
