'use client';

import React from 'react';
import { Product } from '@/lib/shopify/types';
import { formatPrice } from '@/lib/utils/format';
import Button from '@/components/ui/Button';
import { useCart } from '@/components/cart/CartContext';
import { buyNowAction } from '@/app/(shop)/cart/actions';

export interface StickyAddToCartProps {
  product: Product;
}

export function StickyAddToCart({ product }: StickyAddToCartProps) {
  const firstVariant = product.variants?.[0];
  const isAvailable = product.availableForSale && (firstVariant?.availableForSale ?? true);
  const price = firstVariant?.price.amount || product.priceRange.minVariantPrice.amount;
  const currencyCode = firstVariant?.price.currencyCode || product.priceRange.minVariantPrice.currencyCode;
  const { addItem, isPending } = useCart();

  const handleBuyNow = async () => {
    if (!firstVariant) return;
    await buyNowAction(firstVariant.id, 1);
  };

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-[var(--color-bg)] border-t border-[var(--color-border)] p-3 flex items-center justify-between shadow-lg">
      <div className="flex flex-col pr-2">
        <span className="text-xs font-[family-name:var(--font-heading)] truncate max-w-[140px] text-[var(--color-text)]">
          {product.title}
        </span>
        <span className="text-xs font-medium text-[var(--color-text)] font-[family-name:var(--font-body)]">
          {formatPrice(price, currencyCode)}
        </span>
      </div>

      <div className="flex items-center space-x-2">
        <Button
          type="button"
          size="sm"
          disabled={!isAvailable || isPending}
          onClick={() => firstVariant && addItem(firstVariant.id, 1)}
          variant="primary"
        >
          {isAvailable ? 'Cart' : 'Sold out'}
        </Button>

        {isAvailable && (
          <Button
            type="button"
            size="sm"
            onClick={handleBuyNow}
            variant="secondary"
          >
            Buy Now
          </Button>
        )}
      </div>
    </div>
  );
}

export default StickyAddToCart;
