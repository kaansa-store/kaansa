'use client';

import React, { createContext, useContext, useState, useTransition } from 'react';
import { Cart } from '@/lib/shopify/types';
import {
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
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({
  children,
  initialCart = null,
}: {
  children: React.ReactNode;
  initialCart?: Cart | null;
}) {
  const [cart, setCart] = useState<Cart | null>(initialCart);
  const [isOpen, setIsOpen] = useState(false);
  const [isPending, startTransition] = useTransition();

  const openCart = () => setIsOpen(true);
  const closeCart = () => setIsOpen(false);

  const addItem = async (variantId: string, quantity = 1) => {
    startTransition(async () => {
      const updatedCart = await addToCartAction(variantId, quantity);
      if (updatedCart) {
        setCart(updatedCart);
      }
      setIsOpen(true);
    });
  };

  const updateItem = async (lineId: string, quantity: number) => {
    startTransition(async () => {
      const updatedCart = await updateCartItemAction(lineId, quantity);
      if (updatedCart) {
        setCart(updatedCart);
      }
    });
  };

  const removeItem = async (lineId: string) => {
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
