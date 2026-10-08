'use client';

import React, { createContext, useContext, useState, useTransition, useEffect, useRef } from 'react';
import { Cart } from '@/lib/shopify/types';
import {
  getCartAction,
  addToCartAction,
  updateCartItemAction,
  removeFromCartAction,
} from '@/app/(shop)/cart/actions';

interface CartContextType {
  cart: Cart | null;
  isOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  addItem: (variantId: string, quantity?: number) => Promise<void>;
  updateItem: (lineId: string, quantity: number) => Promise<void>;
  removeItem: (lineId: string) => Promise<void>;
  isPending: boolean;
  isHydrated: boolean;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [cart, setCart] = useState<Cart | null>(null);
  const [isHydrated, setIsHydrated] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const hasMutated = useRef(false);

  useEffect(() => {
    let cancelled = false;
    getCartAction()
      .then((existing) => {
        // Ignore a late hydration result if the shopper already added or changed something.
        if (!cancelled && !hasMutated.current) setCart(existing);
      })
      .catch(() => {})
      .finally(() => {
        if (!cancelled) setIsHydrated(true);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const openCart = () => setIsOpen(true);
  const closeCart = () => setIsOpen(false);

  const addItem = async (variantId: string, quantity = 1) => {
    hasMutated.current = true;
    setIsHydrated(true);
    startTransition(async () => {
      const updatedCart = await addToCartAction(variantId, quantity);
      if (updatedCart) {
        setCart(updatedCart);
      }
      setIsOpen(true);
    });
  };

  const updateItem = async (lineId: string, quantity: number) => {
    hasMutated.current = true;
    setIsHydrated(true);
    startTransition(async () => {
      const updatedCart = await updateCartItemAction(lineId, quantity);
      if (updatedCart) {
        setCart(updatedCart);
      }
    });
  };

  const removeItem = async (lineId: string) => {
    hasMutated.current = true;
    setIsHydrated(true);
    startTransition(async () => {
      const updatedCart = await removeFromCartAction(lineId);
      if (updatedCart) {
        setCart(updatedCart);
      }
    });
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        isOpen,
        openCart,
        closeCart,
        addItem,
        updateItem,
        removeItem,
        isPending,
        isHydrated,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
