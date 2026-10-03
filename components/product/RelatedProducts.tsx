import React from 'react';
import { Product } from '@/lib/shopify/types';
import ProductGrid from './ProductGrid';
import Divider from '@/components/ui/Divider';

export interface RelatedProductsProps {
  products: Product[];
}

export function RelatedProducts({ products }: RelatedProductsProps) {
  if (!products || products.length === 0) return null;

  return (
    <section className="mt-24 pt-16 border-t border-[var(--color-border)]">
      <div className="text-center mb-12">
        <h2 className="font-[family-name:var(--font-display)] text-3xl md:text-4xl text-[var(--color-text)]">
          Pairs well with
        </h2>
        <Divider className="my-4" />
      </div>

      <ProductGrid products={products.slice(0, 3)} />
    </section>
  );
}

export default RelatedProducts;
