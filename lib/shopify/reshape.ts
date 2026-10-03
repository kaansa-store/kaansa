import {
  ShopifyProduct,
  Product,
  ShopifyCart,
  Cart,
  ShopifyCollection,
  Collection,
} from './types';

export function reshapeEdges<T>(edges?: { node: T }[] | null): T[] {
  if (!edges) return [];
  return edges.map(({ node }) => node);
}

export function reshapeProduct(product?: ShopifyProduct | null): Product | null {
  if (!product) return null;
  return {
    ...product,
    images: reshapeEdges(product.images?.edges),
    variants: reshapeEdges(product.variants?.edges),
  };
}

export function reshapeProducts(products?: { edges: { node: ShopifyProduct }[] } | null): Product[] {
  if (!products?.edges) return [];
  return reshapeEdges(products.edges)
    .map((p) => reshapeProduct(p))
    .filter((p): p is Product => p !== null);
}

export function reshapeCart(cart?: ShopifyCart | null): Cart | null {
  if (!cart) return null;
  return {
    ...cart,
    lines: reshapeEdges(cart.lines?.edges),
  };
}

export function reshapeCollection(collection?: ShopifyCollection | null): Collection | null {
  if (!collection) return null;
  return {
    ...collection,
    products: collection.products ? reshapeProducts(collection.products) : [],
  };
}
