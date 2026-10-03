'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { CartLine } from '@/lib/shopify/types';
import { formatPrice } from '@/lib/utils/format';

export interface CartItemProps {
  item: CartLine;
  onUpdateQuantity: (quantity: number) => void;
  onRemove: () => void;
  disabled?: boolean;
}

export function CartItem({ item, onUpdateQuantity, onRemove, disabled = false }: CartItemProps) {
  const merchandise = item.merchandise;
  const product = merchandise.product;
  const imageUrl = product.featuredImage?.url;

  return (
    <div className="flex items-start space-x-4 py-4 border-b border-[var(--color-border)] last:border-none">
      <Link
        href={`/products/${product.handle}`}
        className="relative w-20 aspect-[3/4] bg-[var(--color-bg)] shrink-0 overflow-hidden border border-[var(--color-border)]"
      >
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={product.title}
            fill
            sizes="80px"
            className="object-contain p-1"
          />
        ) : (
          <div className="w-full h-full bg-[var(--color-surface)] flex items-center justify-center text-[10px] text-[var(--color-muted)]">
            No image
          </div>
        )}
      </Link>

      <div className="flex-1 flex flex-col justify-between self-stretch">
        <div>
          <Link
            href={`/products/${product.handle}`}
            className="text-sm font-[family-name:var(--font-heading)] font-normal text-[var(--color-text)] hover:text-[var(--color-accent)] transition-colors line-clamp-1"
          >
            {product.title}
          </Link>
          <p className="mt-1 text-xs font-[family-name:var(--font-body)] text-[var(--color-muted)]">
            {formatPrice(merchandise.price.amount, merchandise.price.currencyCode)}
          </p>
        </div>

        <div className="flex items-center justify-between mt-3">
          {/* Stepper */}
          <div className="flex items-center border border-[var(--color-border)] bg-[var(--color-bg)] h-8 px-2 space-x-2">
            <button
              type="button"
              disabled={disabled}
              onClick={() => onUpdateQuantity(item.quantity - 1)}
              className="w-5 h-5 flex items-center justify-center text-xs text-[var(--color-text)] hover:text-[var(--color-accent)] cursor-pointer disabled:opacity-40"
              aria-label="Decrease quantity"
            >
              -
            </button>
            <span className="text-xs font-medium w-4 text-center">{item.quantity}</span>
            <button
              type="button"
              disabled={disabled}
              onClick={() => onUpdateQuantity(item.quantity + 1)}
              className="w-5 h-5 flex items-center justify-center text-xs text-[var(--color-text)] hover:text-[var(--color-accent)] cursor-pointer disabled:opacity-40"
              aria-label="Increase quantity"
            >
              +
            </button>
          </div>

          <button
            type="button"
            disabled={disabled}
            onClick={onRemove}
            className="text-xs text-[var(--color-muted)] hover:text-[var(--color-danger)] uppercase tracking-wider transition-colors cursor-pointer"
          >
            Remove
          </button>
        </div>
      </div>
    </div>
  );
}

export default CartItem;
