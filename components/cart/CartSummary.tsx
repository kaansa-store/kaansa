'use client';

import React from 'react';
import Link from 'next/link';
import { useCart } from './CartContext';
import CartItem from './CartItem';
import Button from '@/components/ui/Button';
import { formatPrice } from '@/lib/utils/format';

export function CartSummary() {
  const { cart, updateItem, removeItem, isPending } = useCart();
  const lines = cart?.lines || [];
  const subtotal = cart?.cost.subtotalAmount.amount || '0';
  const currency = cart?.cost.subtotalAmount.currencyCode || 'INR';

  const handleCheckout = () => {
    if (cart?.checkoutUrl) {
      window.location.href = cart.checkoutUrl;
    }
  };

  if (lines.length === 0) {
    return (
      <div className="py-24 text-center">
        <h2 className="font-[family-name:var(--font-heading)] text-2xl text-[var(--color-text)] mb-3">
          Nothing here yet
        </h2>
        <p className="font-[family-name:var(--font-body)] text-sm text-[var(--color-muted)] mb-8">
          Add something from the collection.
        </p>
        <Link href="/collections">
          <Button variant="primary">Browse pieces</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
      <div className="lg:col-span-8 divide-y divide-[var(--color-border)]">
        {lines.map((line) => (
          <CartItem
            key={line.id}
            item={line}
            disabled={isPending}
            onUpdateQuantity={(qty) => updateItem(line.id, qty)}
            onRemove={() => removeItem(line.id)}
          />
        ))}
      </div>

      <div className="lg:col-span-4 bg-[var(--color-surface)] p-8 border border-[var(--color-border)] h-fit space-y-6">
        <h2 className="font-[family-name:var(--font-heading)] text-xl text-[var(--color-text)] pb-4 border-b border-[var(--color-border)]">
          Order Summary
        </h2>

        <div className="flex items-center justify-between text-base font-[family-name:var(--font-body)] font-medium text-[var(--color-text)]">
          <span>Subtotal</span>
          <span>{formatPrice(subtotal, currency)}</span>
        </div>

        <p className="text-xs text-[var(--color-muted)] font-[family-name:var(--font-body)]">
          Taxes and shipping calculated at checkout.
        </p>

        <Button
          type="button"
          onClick={handleCheckout}
          disabled={isPending}
          className="w-full h-12"
          variant="primary"
        >
          Go to checkout
        </Button>
      </div>
    </div>
  );
}

export default CartSummary;
