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
## Security & Maintenance Notes

- descriptionHtml is rendered as-is; only trusted Shopify staff and apps can edit it. Add a sanitizer if untrusted editors are ever given access.
- Reviews are disabled. To enable them, connect a real review provider or a database, confirm seeded reviews are genuine, then set reviewsEnabled to true.
- Email setup: `CONTACT_FROM_EMAIL` must use a domain verified in Resend. `onboarding@resend.dev` is only for testing and normally delivers only to the Resend account owner's address, so customer auto-replies will not arrive until a domain is verified. All of `RESEND_API_KEY`, `CONTACT_TO_EMAIL`, and `CONTACT_FROM_EMAIL` must be set in Vercel for Production, Preview, and Development.
- Note that in-memory rate limits (IP limits and recipient auto-reply limits) reset per serverless instance. Connect Upstash Redis if persistent global rate limiting is required.
- Layout is static; the cart loads on the client after mount. /collections/[handle] is dynamic because it reads searchParams and getCollectionMeta is no-store.
- Stock on product pages is cached with the 'inventory' tag and only updates when the inventory_levels/update webhook fires. Register that webhook (it may need to be created through the Admin API rather than the Notifications page) or stock will lag by up to an hour.

## Before Launch Checklist

- [ ] Rotate the Shopify Storefront access token
- [ ] Confirm the GitHub repository is private
- [ ] Set all Vercel environment variables (`SHOPIFY_STORE_DOMAIN`, `SHOPIFY_STOREFRONT_ACCESS_TOKEN`, `SHOPIFY_REVALIDATION_SECRET`, `RESEND_API_KEY`, `CONTACT_TO_EMAIL`, `CONTACT_FROM_EMAIL`, `NEXT_PUBLIC_SITE_URL`)
- [ ] Run `pnpm audit --audit-level=high`
- [ ] Replace `'unsafe-inline'` in Content-Security-Policy with a nonce-based policy

