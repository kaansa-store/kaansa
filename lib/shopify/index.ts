import { shopifyFetch } from './client';
import { getMenuQuery } from './queries/menu';
import {
  getProductQuery,
  getProductsQuery,
  getProductRecommendationsQuery,
  GET_PRODUCT_INVENTORY_QUERY,
} from './queries/product';
import {
  getCollectionQuery,
  getCollectionsQuery,
} from './queries/collection';
import {
  createCartMutation,
  addToCartMutation,
  updateCartMutation,
  removeFromCartMutation,
  getCartQuery,
} from './queries/cart';
import {
  MenuItem,
  ShopifyMenu,
  ShopifyProduct,
  Product,
  ShopifyCollection,
  Collection,
  ShopifyCart,
  Cart,
} from './types';
import {
  reshapeProduct,
  reshapeProducts,
  reshapeCollection,
  reshapeCart,
  reshapeEdges,
} from './reshape';

export function normalizeMenuUrl(url: string): string {
  try {
    if (url.startsWith('http://') || url.startsWith('https://')) {
      const parsed = new URL(url);
      const path = parsed.pathname;
      if (path === '/' || path === '') return '/';
      if (path.startsWith('/pages/')) return path.replace('/pages/', '/');
      if (path === '/collections/all') return '/collections/all';
      return path;
    }
  } catch {
    // fallback
  }

  if (url === '/collections/all') return '/collections/all';
  if (url.startsWith('/pages/')) return url.replace('/pages/', '/');
  return url;
}

export async function getMenu(handle: string): Promise<MenuItem[]> {
  try {
    const res = await shopifyFetch<{ menu: ShopifyMenu | null }>({
      query: getMenuQuery,
      variables: { handle },
      tags: ['menus'],
      cache: 'force-cache',
    });

    if (!res.data.menu?.items) {
      return [];
    }

    return res.data.menu.items.map((item) => ({
      ...item,
      url: normalizeMenuUrl(item.url),
      items: item.items?.map((sub) => ({
        ...sub,
        url: normalizeMenuUrl(sub.url),
      })),
    }));
  } catch (error) {
    console.error(`Failed to fetch menu "${handle}":`, error);
    return [];
  }
}

export async function getProduct(handle: string): Promise<Product | null> {
  try {
    const res = await shopifyFetch<{ product: ShopifyProduct | null }>({
      query: getProductQuery,
      variables: { handle },
      tags: ['products', `product-${handle}`],
      cache: 'force-cache',
    });

    return reshapeProduct(res.data.product);
  } catch (error) {
    console.error(`Failed to fetch product "${handle}":`, error);
    return null;
  }
}

export async function getProductInventory(
  handle: string,
  variantId: string
): Promise<{ availableForSale: boolean; quantityAvailable: number | null }> {
  try {
    const res = await shopifyFetch<{
      product: {
        variants: {
          edges: {
            node: {
              id: string;
              availableForSale: boolean;
              quantityAvailable: number | null;
            };
          }[];
        };
      } | null;
    }>({
      query: GET_PRODUCT_INVENTORY_QUERY,
      variables: { handle },
      cache: 'no-store', // always fresh, never cached
    });

    const variant = res.data.product?.variants.edges
      .map((e) => e.node)
      .find((v) => v.id === variantId);

    return {
      availableForSale: variant?.availableForSale ?? false,
      quantityAvailable: variant?.quantityAvailable ?? null,
    };
  } catch (error) {
    console.error(`Failed to fetch inventory for "${handle}":`, error);
    return {
      availableForSale: true,
      quantityAvailable: null,
    };
  }
}

export async function getProducts(options?: number | {
  first?: number;
  query?: string;
  sortKey?: string;
  reverse?: boolean;
}): Promise<Product[]> {
  const opts = typeof options === 'number' ? { first: options } : options;
  const isSearch = Boolean(opts?.query);

  try {
    const res = await shopifyFetch<{ products: { edges: { node: ShopifyProduct }[] } }>({
      query: getProductsQuery,
      variables: {
        first: opts?.first || 100,
        query: opts?.query,
        sortKey: opts?.sortKey,
        reverse: opts?.reverse,
      },
      tags: isSearch ? undefined : ['products'],
      cache: isSearch ? 'no-store' : 'force-cache',
    });

    return reshapeProducts(res.data.products);
  } catch (error) {
    console.error('Failed to fetch products:', error);
    return [];
  }
}

export async function getProductRecommendations(productId: string): Promise<Product[]> {
  try {
    const res = await shopifyFetch<{ productRecommendations: ShopifyProduct[] | null }>({
      query: getProductRecommendationsQuery,
      variables: { productId },
      tags: ['products'],
      cache: 'force-cache',
    });

    if (!res.data.productRecommendations) return [];
    return res.data.productRecommendations
      .map((p) => reshapeProduct(p))
      .filter((p): p is Product => p !== null);
  } catch (error) {
    console.error(`Failed to fetch recommendations for "${productId}":`, error);
    return [];
  }
}

export async function getCollections(first = 50): Promise<Collection[]> {
  try {
    const res = await shopifyFetch<{ collections: { edges: { node: ShopifyCollection }[] } }>({
      query: getCollectionsQuery,
      variables: { first },
      tags: ['collections'],
      cache: 'force-cache',
    });

    if (!res.data.collections?.edges) return [];
    return reshapeEdges(res.data.collections.edges).map((c) => ({
      ...c,
      products: [],
    }));
  } catch (error) {
    console.error('Failed to fetch collections:', error);
    return [];
  }
}

export async function getCollection(
  handle: string,
  options?: {
    sort?: string;
    type?: string;
    minPrice?: number;
    maxPrice?: number;
    q?: string;
  }
): Promise<Collection | null> {
  if (handle === 'all') {
    let allProducts = await getProducts({ first: 100 });

    if (options?.q) {
      const term = options.q.toLowerCase().trim();
      allProducts = allProducts.filter(
        (p) =>
          p.title.toLowerCase().includes(term) ||
          p.description.toLowerCase().includes(term) ||
          p.tags.some((t) => t.toLowerCase().includes(term)) ||
          p.productType.toLowerCase().includes(term)
      );
    }

    if (options?.type) {
      allProducts = allProducts.filter(
        (p) => p.productType.toLowerCase() === options.type!.toLowerCase()
      );
    }

    if (options?.minPrice !== undefined || options?.maxPrice !== undefined) {
      allProducts = allProducts.filter((p) => {
        const price = parseFloat(p.priceRange.minVariantPrice.amount);
        if (options.minPrice !== undefined && price < options.minPrice) return false;
        if (options.maxPrice !== undefined && price > options.maxPrice) return false;
        return true;
      });
    }

    if (options?.sort === 'price-asc') {
      allProducts.sort(
        (a, b) =>
          parseFloat(a.priceRange.minVariantPrice.amount) -
          parseFloat(b.priceRange.minVariantPrice.amount)
      );
    } else if (options?.sort === 'price-desc') {
      allProducts.sort(
        (a, b) =>
          parseFloat(b.priceRange.minVariantPrice.amount) -
          parseFloat(a.priceRange.minVariantPrice.amount)
      );
    } else if (options?.sort === 'newest') {
      allProducts.reverse();
    }

    return {
      id: 'all',
      title: 'All Pieces',
      handle: 'all',
      description: 'Explore our complete collection of handcrafted brass and copper heritage pieces.',
      products: allProducts,
    };
  }

  try {
    const SORT_MAP: Record<string, { sortKey: string; reverse: boolean }> = {
      featured: { sortKey: 'COLLECTION_DEFAULT', reverse: false },
      'price-asc': { sortKey: 'PRICE', reverse: false },
      'price-desc': { sortKey: 'PRICE', reverse: true },
      newest: { sortKey: 'CREATED', reverse: true },
    };

    const sortConfig = options?.sort ? SORT_MAP[options.sort] : undefined;

    const filters: Record<string, unknown>[] = [];
    if (options?.type) {
      filters.push({ productType: options.type });
    }
    if (options?.minPrice !== undefined || options?.maxPrice !== undefined) {
      filters.push({
        price: {
          min: options?.minPrice,
          max: options?.maxPrice,
        },
      });
    }

    const res = await shopifyFetch<{ collection: ShopifyCollection | null }>({
      query: getCollectionQuery,
      variables: {
        handle,
        first: 100,
        sortKey: sortConfig?.sortKey,
        reverse: sortConfig?.reverse,
        filters: filters.length > 0 ? filters : undefined,
      },
      tags: ['collections', 'products', `collection-${handle}`],
      cache: 'force-cache',
    });

    return reshapeCollection(res.data.collection);
  } catch (error) {
    console.error(`Failed to fetch collection "${handle}":`, error);
    return null;
  }
}

/* ================= CART OPERATIONS ================= */

export async function createCart(lines: { merchandiseId: string; quantity: number }[] = []): Promise<Cart | null> {
  try {
    const res = await shopifyFetch<{
      cartCreate: {
        cart: ShopifyCart | null;
        userErrors: { field: string; message: string }[];
      };
    }>({
      query: createCartMutation,
      variables: {
        input: {
          lines: lines.length > 0 ? lines : undefined,
        },
      },
      cache: 'no-store',
    });

    if (res.data.cartCreate.userErrors?.length) {
      console.error('[Shopify Cart UserErrors]', res.data.cartCreate.userErrors);
    }

    return reshapeCart(res.data.cartCreate.cart);
  } catch (error) {
    console.error('Failed to create cart:', error);
    return null;
  }
}

export async function getCart(cartId: string): Promise<Cart | null> {
  try {
    const res = await shopifyFetch<{ cart: ShopifyCart | null }>({
      query: getCartQuery,
      variables: { cartId },
      cache: 'no-store',
    });

    return reshapeCart(res.data.cart);
  } catch (error) {
    console.error(`Failed to get cart ${cartId}:`, error);
    return null;
  }
}

export async function addToCart(
  cartId: string,
  lines: { merchandiseId: string; quantity: number }[]
): Promise<Cart | null> {
  try {
    const res = await shopifyFetch<{
      cartLinesAdd: {
        cart: ShopifyCart | null;
        userErrors: { field: string; message: string }[];
      };
    }>({
      query: addToCartMutation,
      variables: { cartId, lines },
      cache: 'no-store',
    });

    if (res.data.cartLinesAdd.userErrors?.length) {
      console.error('[Shopify AddToCart UserErrors]', res.data.cartLinesAdd.userErrors);
    }

    return reshapeCart(res.data.cartLinesAdd.cart);
  } catch (error) {
    console.error('Failed to add to cart:', error);
    return null;
  }
}

export async function updateCart(
  cartId: string,
  lines: { id: string; quantity: number }[]
): Promise<Cart | null> {
  try {
    const res = await shopifyFetch<{
      cartLinesUpdate: {
        cart: ShopifyCart | null;
        userErrors: { field: string; message: string }[];
      };
    }>({
      query: updateCartMutation,
      variables: { cartId, lines },
      cache: 'no-store',
    });

    return reshapeCart(res.data.cartLinesUpdate.cart);
  } catch (error) {
    console.error('Failed to update cart:', error);
    return null;
  }
}

export async function removeFromCart(cartId: string, lineIds: string[]): Promise<Cart | null> {
  try {
    const res = await shopifyFetch<{
      cartLinesRemove: {
        cart: ShopifyCart | null;
        userErrors: { field: string; message: string }[];
      };
    }>({
      query: removeFromCartMutation,
      variables: { cartId, lineIds },
      cache: 'no-store',
    });

    return reshapeCart(res.data.cartLinesRemove.cart);
  } catch (error) {
    console.error('Failed to remove from cart:', error);
    return null;
  }
}
