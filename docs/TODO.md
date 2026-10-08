# Shopify Dynamic Sync Behavior

This document outlines how real-time changes in Shopify Admin synchronize with the Kaansa website.

| Change in Shopify Admin | What happens on the website |
|---|---|
| **Edit product title** | Webhook fires (`products/update`) → Next.js cache revalidates `products` tag → updated in ~2 seconds |
| **Change price** | Same as above |
| **Add/change product image** | Same as above |
| **Update description** | Same as above |
| **Change stock quantity** | The `inventory_levels/update` webhook revalidates the 'inventory' tag, and the product page shows the new stock on the next request. It is cached, not live, and can lag up to 1 hour if the webhook is missing. |
| **Mark product as sold out** | `availableForSale = false` → `LiveInventory` shows "Sold out", Add to cart disabled |
| **Unpublish a product** | `products/unpublish` webhook → page revalidates → product disappears from grids, its URL returns 404 |
| **Add a new product** | `products/create` webhook → appears in grids on next visit |
| **Create a new collection** | `collections/create` webhook → appears in `/collections` on next visit |
| **No webhook (webhook fails)** | `revalidate = 3600` safety net kicks in, change appears within 1 hour maximum |

## Collection Dynamic Sync Behavior

| Change in Shopify Admin | What happens on the website |
|---|---|
| **Edit collection title** | `collections/update` webhook → `LiveCollectionMeta` refetches → updated on next page load (no cache) |
| **Edit collection description** | Same as above |
| **Change collection banner image** | Same as above |
| **Add product to collection** | `products/update` + `collections/update` webhooks → collection page rebuilds → product appears in grid in ~2 seconds |
| **Remove product from collection** | Same as above, product disappears |
| **Add home-page tag to a product** | `products/update` webhook → homepage featured grid rebuilds in ~2 seconds |
| **Remove home-page tag** | Same as above, product disappears from homepage grid |
| **Create a new collection** | `collections/create` webhook → appears on `/collections` in ~2 seconds |
| **Delete a collection** | `collections/delete` webhook → disappears from `/collections`, its URL returns 404 |
| **Publish a collection** | `collections/update` webhook → appears on `/collections` in ~2 seconds |
| **Unpublish a collection** | Same as above, disappears |
| **No webhook (webhook fails)** | `revalidate = 3600` safety net, change appears within 1 hour maximum |

Showing 'Only N left' needs the unauthenticated_read_product_inventory scope on the Storefront token.

