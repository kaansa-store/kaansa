'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import {
  createCart,
  getCart,
  addToCart,
  updateCart,
  removeFromCart,
} from '@/lib/shopify';
import { Cart } from '@/lib/shopify/types';

const CART_COOKIE_NAME = 'kaansa_cart_id';

export async function getCartAction(): Promise<Cart | null> {
  const cookieStore = await cookies();
  const cartId = cookieStore.get(CART_COOKIE_NAME)?.value;

  if (!cartId) return null;

  const cart = await getCart(cartId);
  if (!cart) {
    // Cart expired or not found, delete stale cookie
    cookieStore.delete(CART_COOKIE_NAME);
    return null;
  }
  return cart;
}

export async function addToCartAction(variantId: string, quantity = 1): Promise<Cart | null> {
  const cookieStore = await cookies();
  const cartId = cookieStore.get(CART_COOKIE_NAME)?.value;
  let cart: Cart | null = null;

  if (!cartId) {
    cart = await createCart([{ merchandiseId: variantId, quantity }]);
    if (cart?.id) {
      cookieStore.set(CART_COOKIE_NAME, cart.id, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 60 * 60 * 24 * 30, // 30 days
        path: '/',
      });
      return cart;
    }
  } else {
    cart = await addToCart(cartId, [{ merchandiseId: variantId, quantity }]);
    // If cart was not found / expired, create a new one silently
    if (!cart) {
      cart = await createCart([{ merchandiseId: variantId, quantity }]);
      if (cart?.id) {
        cookieStore.set(CART_COOKIE_NAME, cart.id, {
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
          sameSite: 'strict',
          maxAge: 60 * 60 * 24 * 30,
          path: '/',
        });
      }
    }
    return cart;
  }

  return null;
}

export async function updateCartItemAction(lineId: string, quantity: number): Promise<Cart | null> {
  const cookieStore = await cookies();
  const cartId = cookieStore.get(CART_COOKIE_NAME)?.value;

  if (!cartId) return null;

  if (quantity <= 0) {
    return await removeFromCart(cartId, [lineId]);
  }

  return await updateCart(cartId, [{ id: lineId, quantity }]);
}

export async function removeFromCartAction(lineId: string): Promise<Cart | null> {
  const cookieStore = await cookies();
  const cartId = cookieStore.get(CART_COOKIE_NAME)?.value;

  if (!cartId) return null;

  return await removeFromCart(cartId, [lineId]);
}

/**
 * Instant Buy Now:
 * Creates a fresh cart with single item and directly redirects to Shopify checkout!
 */
export async function buyNowAction(variantId: string, quantity = 1): Promise<void> {
  const cart = await createCart([{ merchandiseId: variantId, quantity }]);
  if (!cart?.checkoutUrl) {
    throw new Error('Failed to initiate checkout with Shopify');
  }

  redirect(cart.checkoutUrl);
}

/**
 * Regular Cart Checkout:
 * Redirects to the checkoutUrl of the active cart
 */
export async function checkoutAction(): Promise<void> {
  const cart = await getCartAction();
  if (!cart?.checkoutUrl) {
    throw new Error('No active checkout found');
  }

  redirect(cart.checkoutUrl);
}
