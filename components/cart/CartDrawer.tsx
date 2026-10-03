'use client';

import React from 'react';
import Link from 'next/link';
import { useCart } from './CartContext';
import CartItem from './CartItem';
import Button from '@/components/ui/Button';
import { formatPrice } from '@/lib/utils/format';

export function CartDrawer() {
  const { cart, isOpen, closeCart, updateItem, removeItem, isPending } = useCart();

  if (!isOpen) return null;

  const lines = cart?.lines || [];
  const subtotal = cart?.cost.subtotalAmount.amount || '0';
  const currency = cart?.cost.subtotalAmount.currencyCode || 'INR';

  const handleCheckout = () => {
    if (cart?.checkoutUrl) {
      window.location.href = cart.checkoutUrl;
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        onClick={closeCart}
        className="fixed inset-0 bg-[rgba(44,26,14,0.4)] backdrop-blur-xs transition-opacity"
        aria-hidden="true"
      />

      {/* Drawer Panel: Slide-in side drawer on desktop, bottom sheet on mobile */}
      <div
        className="fixed inset-y-0 right-0 max-w-full flex pl-10 md:w-[440px] w-full"
        role="dialog"
        aria-modal="true"
        aria-label="Your shopping cart"
      >
        <div className="w-full bg-[var(--color-surface)] border-l border-[var(--color-border)] shadow-2xl flex flex-col justify-between">
          {/* Header */}
          <div className="px-6 py-5 border-b border-[var(--color-border)] flex items-center justify-between">
            <h2 className="font-[family-name:var(--font-heading)] text-xl text-[var(--color-text)]">
              Your cart ({cart?.totalQuantity || 0})
            </h2>
            <button
              type="button"
              onClick={closeCart}
              className="p-2 text-[var(--color-muted)] hover:text-[var(--color-text)] cursor-pointer"
              aria-label="Close cart"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto px-6 py-4 divide-y divide-[var(--color-border)]">
            {lines.length === 0 ? (
              <div className="py-20 text-center flex flex-col items-center justify-center">
                <h3 className="font-[family-name:var(--font-heading)] text-xl text-[var(--color-text)] mb-2">
                  Nothing here yet
                </h3>
                <p className="font-[family-name:var(--font-body)] text-sm text-[var(--color-muted)] mb-8">
                  Add something from the collection.
                </p>
                <Link href="/collections" onClick={closeCart}>
                  <Button variant="primary" size="sm">
                    Browse pieces
                  </Button>
                </Link>
              </div>
            ) : (
              lines.map((line) => (
                <CartItem
                  key={line.id}
                  item={line}
                  disabled={isPending}
                  onUpdateQuantity={(qty) => updateItem(line.id, qty)}
                  onRemove={() => removeItem(line.id)}
                />
              ))
            )}
          </div>

          {/* Footer Checkout Summary */}
          {lines.length > 0 && (
            <div className="p-6 border-t border-[var(--color-border)] bg-[var(--color-surface)] space-y-4">
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
                className="w-full h-13"
                variant="primary"
              >
                Go to checkout
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default CartDrawer;
