import React from 'react';
import clsx from 'clsx';
import { Product } from '@/lib/shopify/types';
import ProductCard from './ProductCard';
import Skeleton from '@/components/ui/Skeleton';

export interface ProductGridProps {
  products: Product[];
  loading?: boolean;
  count?: number;
  className?: string;
}

export function ProductGrid({
  products,
  loading = false,
  count = 6,
  className,
}: ProductGridProps) {
  if (loading) {
    return (
      <div
        className={clsx(
          'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12 md:gap-x-10 md:gap-y-16',
          className
        )}
      >
        {Array.from({ length: count }).map((_, i) => (
          <div key={i} className="flex flex-col space-y-3">
            <Skeleton className="w-full aspect-[3/4]" />
            <Skeleton className="h-5 w-3/4" />
            <Skeleton className="h-4 w-1/3" />
          </div>
        ))}
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="py-24 text-center">
        <h3 className="font-[family-name:var(--font-heading)] text-xl text-[var(--color-text)] mb-2">
          No pieces found
        </h3>
        <p className="font-[family-name:var(--font-body)] text-sm text-[var(--color-muted)]">
          Try adjusting your filter or search terms.
        </p>
      </div>
    );
  }

  return (
    <div
      className={clsx(
        'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12 md:gap-x-10 md:gap-y-16',
        className
      )}
    >
      {products.map((product, idx) => (
        <ProductCard
          key={product.id || product.handle}
          product={product}
          priority={idx === 0}
        />
      ))}
    </div>
  );
}

export default ProductGrid;
