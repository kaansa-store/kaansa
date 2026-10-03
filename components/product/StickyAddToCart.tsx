'use client';

import React from 'react';
import { Product } from '@/lib/shopify/types';
import { formatPrice } from '@/lib/utils/format';
import Button from '@/components/ui/Button';

export interface StickyAddToCartProps {
  product: Product;
  onAddToCart?: () => void;
  isAdding?: boolean;
}

export function StickyAddToCart({ product, onAddToCart, isAdding = false }: StickyAddToCartProps) {
  const firstVariant = product.variants?.[0];
  const isAvailable = product.availableForSale && (firstVariant?.availableForSale ?? true);
  const price = firstVariant?.price.amount || product.priceRange.minVariantPrice.amount;
  const currencyCode = firstVariant?.price.currencyCode || product.priceRange.minVariantPrice.currencyCode;

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-[var(--color-bg)] border-t border-[var(--color-border)] p-4 flex items-center justify-between shadow-lg">
      <div className="flex flex-col">
        <span className="text-xs font-[family-name:var(--font-heading)] truncate max-w-[180px] text-[var(--color-text)]">
          {product.title}
        </span>
        <span className="text-sm font-medium text-[var(--color-text)] font-[family-name:var(--font-body)]">
          {formatPrice(price, currencyCode)}
        </span>
      </div>

      <Button
        type="button"
        size="sm"
        disabled={!isAvailable || isAdding}
        onClick={onAddToCart}
        variant="primary"
      >
        {isAdding ? 'Adding...' : isAvailable ? 'Add to cart' : 'Sold out'}
      </Button>
    </div>
  );
}

export default StickyAddToCart;
