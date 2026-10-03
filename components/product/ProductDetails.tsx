'use client';

import React, { useState } from 'react';
import { Product } from '@/lib/shopify/types';
import PriceDisplay from './PriceDisplay';
import Button from '@/components/ui/Button';
import Divider from '@/components/ui/Divider';
import { useCart } from '@/components/cart/CartContext';
import { buyNowAction } from '@/app/(shop)/cart/actions';

export interface ProductDetailsProps {
  product: Product;
}

export function ProductDetails({ product }: ProductDetailsProps) {
  const [quantity, setQuantity] = useState(1);
  const [isBuyingNow, setIsBuyingNow] = useState(false);
  const { addItem, isPending } = useCart();

  const firstVariant = product.variants?.[0];
  const isAvailable = product.availableForSale && (firstVariant?.availableForSale ?? true);

  const price = firstVariant?.price.amount || product.priceRange.minVariantPrice.amount;
  const compareAtPrice = firstVariant?.compareAtPrice?.amount || product.compareAtPriceRange?.minVariantPrice.amount;
  const currencyCode = firstVariant?.price.currencyCode || product.priceRange.minVariantPrice.currencyCode;

  const handleAddToCart = async () => {
    if (!isAvailable || !firstVariant) return;
    await addItem(firstVariant.id, quantity);
  };

  const handleBuyNow = async () => {
    if (!isAvailable || !firstVariant) return;
    try {
      setIsBuyingNow(true);
      await buyNowAction(firstVariant.id, quantity);
    } catch (e) {
      console.error(e);
      setIsBuyingNow(false);
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

      {/* Quantity & CTA Buttons */}
      <div className="mt-6 flex flex-col gap-4">
        {isAvailable && (
          <div className="flex items-center border border-[var(--color-border)] bg-[var(--color-bg)] h-12 w-36 px-4 justify-between">
            <span className="text-xs uppercase tracking-wider text-[var(--color-muted)] font-medium">Qty</span>
            <div className="flex items-center space-x-3">
              <button
                type="button"
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                className="w-6 h-6 flex items-center justify-center text-[var(--color-text)] hover:text-[var(--color-accent)] font-semibold cursor-pointer"
                aria-label="Decrease quantity"
              >
                -
              </button>
              <span className="text-sm font-medium w-5 text-center">{quantity}</span>
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

        <div className="flex flex-col sm:flex-row items-stretch gap-4">
          <Button
            type="button"
            onClick={handleAddToCart}
            disabled={!isAvailable || isPending}
            className="flex-1 h-13"
            variant="primary"
          >
            {isPending ? 'Adding to cart...' : isAvailable ? 'Add to cart' : 'Sold out'}
          </Button>

          {isAvailable && (
            <Button
              type="button"
              onClick={handleBuyNow}
              disabled={isBuyingNow}
              className="flex-1 h-13"
              variant="secondary"
            >
              {isBuyingNow ? 'Redirecting...' : 'Buy Now'}
            </Button>
          )}
        </div>
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
