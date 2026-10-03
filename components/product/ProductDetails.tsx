'use client';

import React, { useState } from 'react';
import { Product } from '@/lib/shopify/types';
import PriceDisplay from './PriceDisplay';
import Button from '@/components/ui/Button';
import Divider from '@/components/ui/Divider';

export interface ProductDetailsProps {
  product: Product;
  onAddToCart?: (variantId: string, quantity: number) => void;
  isAdding?: boolean;
}

export function ProductDetails({ product, onAddToCart, isAdding = false }: ProductDetailsProps) {
  const [quantity, setQuantity] = useState(1);
  const firstVariant = product.variants?.[0];
  const isAvailable = product.availableForSale && (firstVariant?.availableForSale ?? true);

  const price = firstVariant?.price.amount || product.priceRange.minVariantPrice.amount;
  const compareAtPrice = firstVariant?.compareAtPrice?.amount || product.compareAtPriceRange?.minVariantPrice.amount;
  const currencyCode = firstVariant?.price.currencyCode || product.priceRange.minVariantPrice.currencyCode;

  const handleAdd = () => {
    if (!isAvailable || !firstVariant) return;
    if (onAddToCart) {
      onAddToCart(firstVariant.id, quantity);
    }
  };

  return (
    <div className="flex flex-col">
      {/* Category / Type */}
      {product.productType && (
        <span className="text-xs font-[family-name:var(--font-body)] uppercase tracking-[0.14em] text-[var(--color-muted)] mb-2">
          {product.productType}
        </span>
      )}

      {/* Title */}
      <h1 className="font-[family-name:var(--font-display)] text-3xl md:text-5xl font-normal text-[var(--color-text)] tracking-tight leading-tight">
        {product.title}
      </h1>

      {/* Price */}
      <div className="mt-4 mb-6">
        <PriceDisplay
          price={price}
          compareAtPrice={compareAtPrice}
          currencyCode={currencyCode}
          size="lg"
        />
        <p className="mt-2 text-xs text-[var(--color-muted)] font-[family-name:var(--font-body)]">
          Free shipping on orders above ₹999 • Taxes included
        </p>
      </div>

      <Divider className="my-2" />

      {/* Quantity & Add to Cart */}
      <div className="mt-6 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
        {isAvailable && (
          <div className="flex items-center border border-[var(--color-border)] bg-[var(--color-bg)] h-12 w-32 px-3 justify-between">
            <span className="text-xs uppercase tracking-wider text-[var(--color-muted)]">Qty</span>
            <div className="flex items-center space-x-2">
              <button
                type="button"
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                className="w-6 h-6 flex items-center justify-center text-[var(--color-text)] hover:text-[var(--color-accent)] font-semibold cursor-pointer"
                aria-label="Decrease quantity"
              >
                -
              </button>
              <span className="text-sm font-medium w-4 text-center">{quantity}</span>
              <button
                type="button"
                onClick={() => setQuantity((q) => q + 1)}
                className="w-6 h-6 flex items-center justify-center text-[var(--color-text)] hover:text-[var(--color-accent)] font-semibold cursor-pointer"
                aria-label="Increase quantity"
              >
                +
              </button>
            </div>
          </div>
        )}

        <Button
          type="button"
          onClick={handleAdd}
          disabled={!isAvailable || isAdding}
          className="flex-1 h-12"
          variant="primary"
        >
          {isAdding ? 'Adding...' : isAvailable ? 'Add to cart' : 'Sold out'}
        </Button>
      </div>

      {/* Details Section */}
      <div className="mt-12 pt-8 border-t border-[var(--color-border)]">
        <h2 className="font-[family-name:var(--font-heading)] text-lg text-[var(--color-text)] mb-4">
          About this piece
        </h2>

        {product.descriptionHtml ? (
          <div
            className="prose prose-sm text-[var(--color-muted)] font-[family-name:var(--font-body)] leading-relaxed [&_ul]:list-disc [&_ul]:pl-5 [&_li]:mt-1.5 [&_p]:mb-3"
            dangerouslySetInnerHTML={{ __html: product.descriptionHtml }}
          />
        ) : (
          <p className="text-sm text-[var(--color-muted)] font-[family-name:var(--font-body)] leading-relaxed">
            {product.description}
          </p>
        )}
      </div>
    </div>
  );
}

export default ProductDetails;
