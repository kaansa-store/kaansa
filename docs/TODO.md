# Shopify Dynamic Sync Behavior

This document outlines how real-time changes in Shopify Admin synchronize with the Kaansa website.

| Change in Shopify Admin | What happens on the website |
|---|---|
| **Edit product title** | Webhook fires (`products/update`) → Next.js cache revalidates `products` tag → updated in ~2 seconds |
| **Change price** | Same as above |
| **Add/change product image** | Same as above |
| **Update description** | Same as above |
| **Change stock quantity** | `inventory_levels/update` webhook fires → `LiveInventory` server component streams live count on next page visit (no cache, always live) |
| **Mark product as sold out** | `availableForSale = false` → `LiveInventory` shows "Sold out", Add to cart disabled |
| **Unpublish a product** | `products/unpublish` webhook → page revalidates → product disappears from grids, its URL returns 404 |
| **Add a new product** | `products/create` webhook → appears in grids on next visit |
| **Create a new collection** | `collections/create` webhook → appears in `/collections` on next visit |
| **No webhook (webhook fails)** | `revalidate = 3600` safety net kicks in, change appears within 1 hour maximum |
