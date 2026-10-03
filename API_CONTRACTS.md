# API_CONTRACTS.md — Shopify Storefront API Query Reference

> **API Version:** `2025-01` (pin in `lib/shopify/client.ts`)
> **Endpoint:** `https://${SHOPIFY_STORE_DOMAIN}/api/${API_VERSION}/graphql.json`
> **Auth:** `X-Shopify-Storefront-Access-Token` header (server-side only)

---

## shopifyFetch Wrapper

```typescript
// lib/shopify/client.ts
const API_VERSION = '2025-01';

export async function shopifyFetch<T>({
  query,
  variables,
  tags,
  cache = 'force-cache',
}: {
  query: string;
  variables?: Record<string, unknown>;
  tags?: string[];
  cache?: RequestCache;
}): Promise<{ data: T; errors?: { message: string }[] }> {
  const res = await fetch(
    `https://${process.env.SHOPIFY_STORE_DOMAIN}/api/${API_VERSION}/graphql.json`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Storefront-Access-Token':
          process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN!,
      },
      body: JSON.stringify({ query, variables }),
      cache,
      next: { tags },
    }
  );

  const json = await res.json();

  if (json.errors) {
    console.error('[Shopify]', json.errors);
    throw new Error(json.errors[0].message);
  }

  return json;
}
```

---

## 1. Product Queries

### getProduct (single product by handle)
```graphql
# lib/shopify/queries/product.ts
query GetProduct($handle: String!) {
  product(handle: $handle) {
    id
    title
    handle
    description
    descriptionHtml
    vendor
    productType
    tags
    availableForSale
    seo { title description }
    priceRange {
      minVariantPrice { amount currencyCode }
    }
    compareAtPriceRange {
      minVariantPrice { amount currencyCode }
    }
    featuredImage { url altText width height }
    images(first: 10) {
      edges {
        node { url altText width height }
      }
    }
    variants(first: 10) {
      edges {
        node {
          id
          title
          availableForSale
          quantityAvailable
          price { amount currencyCode }
          compareAtPrice { amount currencyCode }
          selectedOptions { name value }
        }
      }
    }
    metafields(identifiers: [
      { namespace: "shopify", key: "color-pattern" }
    ]) {
      key
      value
    }
  }
}
```
**Cache tags:** `['products']`

### getProducts (list for static params)
```graphql
query GetProducts($first: Int!) {
  products(first: $first) {
    edges {
      node {
        handle
        title
        productType
        availableForSale
        priceRange {
          minVariantPrice { amount currencyCode }
        }
        featuredImage { url altText width height }
        variants(first: 1) {
          edges {
            node {
              id
              availableForSale
              price { amount currencyCode }
              compareAtPrice { amount currencyCode }
            }
          }
        }
      }
    }
  }
}
```
**Cache tags:** `['products']`

---

## 2. Collection Queries

### getCollection (with products)
```graphql
query GetCollection(
  $handle: String!
  $first: Int!
  $sortKey: ProductCollectionSortKeys
  $reverse: Boolean
  $filters: [ProductFilter!]
) {
  collection(handle: $handle) {
    id
    title
    handle
    description
    seo { title description }
    image { url altText }
    products(
      first: $first
      sortKey: $sortKey
      reverse: $reverse
      filters: $filters
    ) {
      edges {
        node {
          handle
          title
          productType
          availableForSale
          priceRange {
            minVariantPrice { amount currencyCode }
          }
          compareAtPriceRange {
            minVariantPrice { amount currencyCode }
          }
          featuredImage { url altText width height }
          variants(first: 1) {
            edges {
              node {
                id
                availableForSale
                price { amount currencyCode }
                compareAtPrice { amount currencyCode }
              }
            }
          }
        }
      }
    }
  }
}
```
**Sort key mapping:**
```typescript
const SORT_MAP = {
  featured:    { sortKey: 'COLLECTION_DEFAULT', reverse: false },
  'price-asc': { sortKey: 'PRICE',              reverse: false },
  'price-desc':{ sortKey: 'PRICE',              reverse: true  },
  newest:      { sortKey: 'CREATED',            reverse: true  },
};
```
**Cache tags:** `['collections']`

### getCollections (all collections)
```graphql
query GetCollections($first: Int!) {
  collections(first: $first) {
    edges {
      node {
        handle
        title
        description
        image { url altText }
      }
    }
  }
}
```
**Cache tags:** `['collections']`

---

## 3. Cart Mutations

All cart operations are Server Actions. Cart ID is stored in an `httpOnly` cookie named `kaansa_cart_id`.

### cartCreate
```graphql
mutation CartCreate($input: CartInput!) {
  cartCreate(input: $input) {
    cart {
      id
      checkoutUrl
      totalQuantity
      cost {
        subtotalAmount { amount currencyCode }
        totalAmount { amount currencyCode }
      }
      lines(first: 100) {
        edges {
          node {
            id
            quantity
            merchandise {
              ... on ProductVariant {
                id
                title
                product {
                  title
                  handle
                  featuredImage { url altText }
                }
                price { amount currencyCode }
              }
            }
          }
        }
      }
    }
    userErrors { field message }
  }
}
```

### cartLinesAdd
```graphql
mutation CartLinesAdd($cartId: ID!, $lines: [CartLineInput!]!) {
  cartLinesAdd(cartId: $cartId, lines: $lines) {
    cart { ...CartFragment }
    userErrors { field message }
  }
}
```

### cartLinesUpdate
```graphql
mutation CartLinesUpdate($cartId: ID!, $lines: [CartLineUpdateInput!]!) {
  cartLinesUpdate(cartId: $cartId, lines: $lines) {
    cart { ...CartFragment }
    userErrors { field message }
  }
}
```

### cartLinesRemove
```graphql
mutation CartLinesRemove($cartId: ID!, $lineIds: [ID!]!) {
  cartLinesRemove(cartId: $cartId, lineIds: $lineIds) {
    cart { ...CartFragment }
    userErrors { field message }
  }
}
```

### getCart (fetch existing cart)
```graphql
query GetCart($cartId: ID!) {
  cart(id: $cartId) {
    ...CartFragment
  }
}
```
**Cache:** `cache: 'no-store'` — cart is never cached.

---

## 4. Search Query

```graphql
query Search($query: String!, $first: Int!) {
  search(query: $query, first: $first, types: [PRODUCT]) {
    edges {
      node {
        ... on Product {
          handle
          title
          productType
          featuredImage { url altText width height }
          priceRange {
            minVariantPrice { amount currencyCode }
          }
          variants(first: 1) {
            edges {
              node {
                id
                availableForSale
                price { amount currencyCode }
              }
            }
          }
        }
      }
    }
  }
}
```
**Cache:** `cache: 'no-store'`

### Predictive Search
```graphql
query PredictiveSearch($query: String!) {
  predictiveSearch(query: $query, types: [PRODUCT, COLLECTION]) {
    products {
      handle
      title
      featuredImage { url altText }
      priceRange {
        minVariantPrice { amount currencyCode }
      }
    }
    collections {
      handle
      title
    }
  }
}
```

---

## 5. Menu Query

```graphql
query GetMenu($handle: String!) {
  menu(handle: $handle) {
    items {
      title
      url
      type
      items {
        title
        url
        type
      }
    }
  }
}
```
**Handles used:** `"main-menu"`, `"footer"`
**Cache tags:** `['menus']`

---

## 6. Policy Query

```graphql
query GetShopPolicies {
  shop {
    privacyPolicy    { title body handle }
    refundPolicy     { title body handle }
    shippingPolicy   { title body handle }
    termsOfService   { title body handle }
  }
}
```
**Cache tags:** `['policies']`

---

## 7. Webhook Revalidation Endpoint

```
POST /api/revalidate
Headers:
  X-Shopify-Hmac-Sha256: <base64 HMAC>
  X-Shopify-Topic: products/update | products/create | products/delete | collections/update

Body: Shopify webhook payload (JSON)

Response:
  200 { revalidated: true, tag: 'products' }
  401 { error: 'Unauthorized' }
  500 { error: 'Revalidation failed' }
```

**HMAC verification:**
```typescript
import crypto from 'crypto';

function verifyHMAC(body: string, signature: string, secret: string): boolean {
  const hash = crypto
    .createHmac('sha256', secret)
    .update(body, 'utf8')
    .digest('base64');
  return crypto.timingSafeEqual(Buffer.from(hash), Buffer.from(signature));
}
```

**Topic → tag mapping:**
```typescript
const TOPIC_TAG_MAP: Record<string, string> = {
  'products/create': 'products',
  'products/update': 'products',
  'products/delete': 'products',
  'collections/update': 'collections',
};
```

---

## 8. Reshape Utilities

```typescript
// lib/shopify/reshape.ts

// Remove GraphQL edges/nodes wrapper
export function reshapeEdges<T>(edges: { node: T }[]): T[] {
  return edges.map(({ node }) => node);
}

// Reshape product for component consumption
export function reshapeProduct(product: ShopifyProduct): Product {
  return {
    ...product,
    images: reshapeEdges(product.images.edges),
    variants: reshapeEdges(product.variants.edges),
  };
}

// Reshape cart
export function reshapeCart(cart: ShopifyCart): Cart {
  return {
    ...cart,
    lines: reshapeEdges(cart.lines.edges),
  };
}
```

---

## 9. Currency Formatting

```typescript
// lib/utils/format.ts
export function formatPrice(amount: string, currencyCode = 'INR'): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: currencyCode,
    maximumFractionDigits: 0,
  }).format(parseFloat(amount));
}

export function getDiscountPercent(price: string, compareAt: string): number {
  const p = parseFloat(price);
  const c = parseFloat(compareAt);
  if (!c || c <= p) return 0;
  return Math.round(((c - p) / c) * 100);
}
```
