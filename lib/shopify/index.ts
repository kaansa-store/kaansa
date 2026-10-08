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
  GET_COLLECTION_META_QUERY,
} from './queries/collection';
import {
  createCartMutation,
  addToCartMutation,
  updateCartMutation,
  removeFromCartMutation,
  getCartQuery,
  updateCartBuyerIdentityMutation,
} from './queries/cart';
import {
  CUSTOMER_ACCESS_TOKEN_CREATE,
  CUSTOMER_ACCESS_TOKEN_DELETE,
  CUSTOMER_CREATE,
  CUSTOMER_RECOVER,
  CUSTOMER_ADDRESS_CREATE,
  CUSTOMER_ADDRESS_DELETE,
  CUSTOMER_DEFAULT_ADDRESS_UPDATE,
  GET_CUSTOMER,
  GET_CUSTOMER_SUMMARY,
} from './queries/customer';
import {
  MenuItem,
  ShopifyMenu,
  ShopifyProduct,
  Product,
  ShopifyCollection,
  Collection,
  ShopifyCart,
  Cart,
  CustomerAccessToken,
  CustomerUserError,
  CustomerAddress,
  Customer,
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

// In local development, bypass cache so Shopify Admin changes sync immediately.
// In production, use force-cache with Shopify webhook revalidation.
const defaultCache: RequestCache =
  process.env.NODE_ENV === 'development' ? 'no-store' : 'force-cache';

export async function getMenu(handle: string): Promise<MenuItem[]> {
  try {
    const res = await shopifyFetch<{ menu: ShopifyMenu | null }>({
      query: getMenuQuery,
      variables: { handle },
      tags: ['menus'],
      cache: defaultCache,
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
      cache: defaultCache,
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
            };
          }[];
        };
      } | null;
    }>({
      query: GET_PRODUCT_INVENTORY_QUERY,
      variables: { handle },
      tags: ['inventory', `inventory-${handle}`],
      cache: defaultCache,
    });

    const variant = res.data.product?.variants.edges
      .map((e) => e.node)
      .find((v) => v.id === variantId);

    return {
      availableForSale: variant?.availableForSale ?? false,
      quantityAvailable: null,
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
      cache: isSearch ? 'no-store' : defaultCache,
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
      cache: defaultCache,
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
      cache: defaultCache,
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

export async function getCollectionMeta(handle: string): Promise<{
  title: string;
  description: string;
  image?: {
    url: string;
    altText?: string | null;
    width?: number;
    height?: number;
  } | null;
} | null> {
  try {
    const res = await shopifyFetch<{
      collection: {
        title: string;
        description: string;
        image?: {
          url: string;
          altText?: string | null;
          width?: number;
          height?: number;
        } | null;
      } | null;
    }>({
      query: GET_COLLECTION_META_QUERY,
      variables: { handle },
      cache: 'no-store', // always fresh — title, image, description
    });
    return res.data.collection ?? null;
  } catch (error) {
    console.error(`Failed to fetch collection meta for "${handle}":`, error);
    return null;
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
      cache: defaultCache,
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

// ─── Customer Authentication & Account ───────────────────────────

export async function customerLogin(email: string, password: string) {
  const res = await shopifyFetch<{
    customerAccessTokenCreate: {
      customerAccessToken: CustomerAccessToken | null;
      customerUserErrors: CustomerUserError[];
    };
  }>({
    query: CUSTOMER_ACCESS_TOKEN_CREATE,
    variables: { input: { email, password } },
    cache: 'no-store',
  });
  return res.data.customerAccessTokenCreate;
}

export async function customerLogout(accessToken: string) {
  await shopifyFetch({
    query: CUSTOMER_ACCESS_TOKEN_DELETE,
    variables: { customerAccessToken: accessToken },
    cache: 'no-store',
  });
}

export async function customerRegister(input: {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  acceptsMarketing?: boolean;
}) {
  const res = await shopifyFetch<{
    customerCreate: {
      customer: { id: string; email: string } | null;
      customerUserErrors: CustomerUserError[];
    };
  }>({
    query: CUSTOMER_CREATE,
    variables: { input },
    cache: 'no-store',
  });
  return res.data.customerCreate;
}

export async function customerRecover(email: string) {
  const res = await shopifyFetch<{
    customerRecover: { customerUserErrors: CustomerUserError[] };
  }>({
    query: CUSTOMER_RECOVER,
    variables: { email },
    cache: 'no-store',
  });
  return res.data.customerRecover;
}

export async function getCustomer(accessToken: string): Promise<Customer | null> {
  try {
    const res = await shopifyFetch<{ customer: Customer | null }>({
      query: GET_CUSTOMER,
      variables: { customerAccessToken: accessToken },
      cache: 'no-store', // always fresh — orders, addresses change
    });
    return res.data?.customer ?? null;
  } catch (error) {
    console.error('[Shopify GetCustomer Error]', error);
    return null;
  }
}

export async function getCustomerSummary(accessToken: string): Promise<{
  firstName: string | null;
  lastName: string | null;
  email: string;
} | null> {
  try {
    const res = await shopifyFetch<{
      customer: {
        firstName: string | null;
        lastName: string | null;
        email: string;
      } | null;
    }>({
      query: GET_CUSTOMER_SUMMARY,
      variables: { customerAccessToken: accessToken },
      cache: 'no-store',
    });
    return res.data?.customer ?? null;
  } catch (error) {
    console.error('[Shopify GetCustomerSummary Error]', error);
    return null;
  }
}

export async function customerAddressCreate(
  accessToken: string,
  address: Omit<CustomerAddress, 'id' | 'isDefault'>
) {
  const res = await shopifyFetch<{
    customerAddressCreate: {
      customerAddress: { id: string } | null;
      customerUserErrors: CustomerUserError[];
    };
  }>({
    query: CUSTOMER_ADDRESS_CREATE,
    variables: { customerAccessToken: accessToken, address },
    cache: 'no-store',
  });
  return res.data.customerAddressCreate;
}

export async function customerAddressDelete(
  accessToken: string,
  id: string
) {
  const res = await shopifyFetch<{
    customerAddressDelete: {
      deletedCustomerAddressId: string | null;
      customerUserErrors: CustomerUserError[];
    };
  }>({
    query: CUSTOMER_ADDRESS_DELETE,
    variables: { customerAccessToken: accessToken, id },
    cache: 'no-store',
  });
  return res.data.customerAddressDelete;
}

export async function customerDefaultAddressUpdate(
  accessToken: string,
  addressId: string
) {
  const res = await shopifyFetch<{
    customerDefaultAddressUpdate: {
      customer: { id: string } | null;
      customerUserErrors: CustomerUserError[];
    };
  }>({
    query: CUSTOMER_DEFAULT_ADDRESS_UPDATE,
    variables: { customerAccessToken: accessToken, addressId },
    cache: 'no-store',
  });
  return res.data.customerDefaultAddressUpdate;
}

export async function updateCartBuyerIdentity(
  cartId: string,
  customerAccessToken: string
): Promise<Cart | null> {
  try {
    const res = await shopifyFetch<{
      cartBuyerIdentityUpdate: {
        cart: ShopifyCart | null;
        userErrors: { field: string; message: string }[];
      };
    }>({
      query: updateCartBuyerIdentityMutation,
      variables: {
        cartId,
        buyerIdentity: { customerAccessToken },
      },
      cache: 'no-store',
    });

    if (res.data.cartBuyerIdentityUpdate.userErrors?.length) {
      console.warn('[Shopify CartBuyerIdentityUpdate UserErrors]', res.data.cartBuyerIdentityUpdate.userErrors);
    }

    return reshapeCart(res.data.cartBuyerIdentityUpdate.cart);
  } catch (error) {
    console.error('Failed to update cart buyer identity:', error);
    return null;
  }
}

