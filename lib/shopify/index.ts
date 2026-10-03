import { shopifyFetch } from './client';
import { getMenuQuery } from './queries/menu';
import {
  getProductQuery,
  getProductsQuery,
  getProductRecommendationsQuery,
} from './queries/product';
import {
  getCollectionQuery,
  getCollectionsQuery,
} from './queries/collection';
import {
  MenuItem,
  ShopifyMenu,
  ShopifyProduct,
  Product,
  ShopifyCollection,
  Collection,
} from './types';
import {
  reshapeProduct,
  reshapeProducts,
  reshapeCollection,
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
    });

    return reshapeProduct(res.data.product);
  } catch (error) {
    console.error(`Failed to fetch product "${handle}":`, error);
    return null;
  }
}

export async function getProducts(options?: {
  first?: number;
  query?: string;
  sortKey?: string;
  reverse?: boolean;
}): Promise<Product[]> {
  try {
    const res = await shopifyFetch<{ products: { edges: { node: ShopifyProduct }[] } }>({
      query: getProductsQuery,
      variables: {
        first: options?.first || 100,
        query: options?.query,
        sortKey: options?.sortKey,
        reverse: options?.reverse,
      },
      tags: ['products'],
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

export async function getCollections(): Promise<Collection[]> {
  try {
    const res = await shopifyFetch<{ collections: { edges: { node: ShopifyCollection }[] } }>({
      query: getCollectionsQuery,
      variables: { first: 50 },
      tags: ['collections'],
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
  }
): Promise<Collection | null> {
  // If requesting "all", aggregate all products
  if (handle === 'all') {
    let allProducts = await getProducts({ first: 100 });

    // Filter by type
    if (options?.type) {
      allProducts = allProducts.filter(
        (p) => p.productType.toLowerCase() === options.type!.toLowerCase()
      );
    }

    // Filter by price
    if (options?.minPrice !== undefined || options?.maxPrice !== undefined) {
      allProducts = allProducts.filter((p) => {
        const price = parseFloat(p.priceRange.minVariantPrice.amount);
        if (options.minPrice !== undefined && price < options.minPrice) return false;
        if (options.maxPrice !== undefined && price > options.maxPrice) return false;
        return true;
      });
    }

    // Sort
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
      tags: ['collections', `collection-${handle}`],
    });

    return reshapeCollection(res.data.collection);
  } catch (error) {
    console.error(`Failed to fetch collection "${handle}":`, error);
    return null;
  }
}
