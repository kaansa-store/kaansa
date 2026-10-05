# ARCHITECTURE.md — Kaansa Headless Storefront

> **Version:** 1.0.0 | **Date:** 2026-10-03 | **Status:** Approved

---

## System Overview

Kaansa is a headless ecommerce storefront. Next.js (App Router) is the presentation layer. Shopify is the commerce engine — it owns products, inventory, cart, checkout, and policies. The browser never talks to Shopify directly.

```
Browser
  │
  ▼
Next.js (Vercel Edge / Node)
  ├── React Server Components  ──► Shopify Storefront API (GraphQL)
  ├── Server Actions           ──► Shopify Cart API (cartCreate / cartLinesAdd …)
  ├── Route Handlers           ──► Shopify Webhook (HMAC-verified revalidation)
  └── Static Assets            ──► Vercel CDN
```

---

## Tech Stack

| Layer | Choice | Reason |
|---|---|---|
| Framework | Next.js 15 (App Router) | RSC, Server Actions, ISR, edge-ready |
| Language | TypeScript (strict) | Type safety end-to-end |
| Styling | Tailwind CSS v4 | Utility-first, design token integration |
| Commerce | Shopify Storefront API (GraphQL) | Headless-first, Cart API, webhooks |
| Fonts | next/font/google | Zero layout shift, self-hosted |
| Animation | Framer Motion | Production-grade, respects reduced-motion |
| Deploy | Vercel | Native Next.js support, edge functions |
| Package manager | pnpm | Fast, disk-efficient |

---

## Folder Structure

```
kaansa/
├── app/
│   ├── (shop)/
│   │   ├── page.tsx                    # Homepage
│   │   ├── collections/
│   │   │   ├── page.tsx                # All collections
│   │   │   └── [handle]/
│   │   │       └── page.tsx            # Collection product grid
│   │   ├── products/
│   │   │   └── [handle]/
│   │   │       └── page.tsx            # Product detail page
│   │   ├── search/
│   │   │   └── page.tsx                # Search results
│   │   ├── cart/
│   │   │   └── page.tsx                # Full cart page
│   │   ├── about/
│   │   │   └── page.tsx                # Brand story
│   │   ├── contact/
│   │   │   └── page.tsx                # Contact form
│   │   └── policies/
│   │       └── [handle]/
│   │           └── page.tsx            # Shopify policy pages
│   ├── api/
│   │   └── revalidate/
│   │       └── route.ts                # Shopify webhook handler
│   ├── layout.tsx                      # Root layout (fonts, providers)
│   ├── not-found.tsx                   # Branded 404
│   ├── error.tsx                       # Error boundary
│   ├── sitemap.ts                      # Dynamic sitemap
│   └── robots.ts                       # robots.txt
│
├── components/
│   ├── ui/                             # Primitive, reusable UI atoms
│   │   ├── Button.tsx
│   │   ├── Badge.tsx
│   │   ├── Skeleton.tsx
│   │   ├── Divider.tsx                 # SVG ornamental divider
│   │   └── CustomCursor.tsx
│   ├── layout/                         # Site-wide chrome
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   ├── Navigation.tsx
│   │   └── AnnouncementBar.tsx
│   ├── product/                        # Product-specific components
│   │   ├── ProductCard.tsx
│   │   ├── ProductGrid.tsx
│   │   ├── ProductGallery.tsx
│   │   ├── ProductDetails.tsx
│   │   ├── RelatedProducts.tsx
│   │   └── PriceDisplay.tsx
│   ├── cart/                           # Cart UI
│   │   ├── CartDrawer.tsx
│   │   ├── CartItem.tsx
│   │   ├── CartSummary.tsx
│   │   └── AddToCartButton.tsx
│   ├── search/                         # Search UI
│   │   ├── SearchInput.tsx
│   │   └── PredictiveSearch.tsx
│   └── home/                           # Homepage sections
│       ├── Hero.tsx
│       ├── FeaturedCollection.tsx
│       ├── CategoryTiles.tsx
│       ├── WhyKaansa.tsx
│       ├── GiftingBlock.tsx
│       └── NewsletterSignup.tsx
│
├── lib/
│   ├── shopify/
│   │   ├── client.ts                   # shopifyFetch wrapper
│   │   ├── types.ts                    # All Shopify GraphQL types
│   │   ├── reshape.ts                  # edges/nodes → flat arrays
│   │   └── queries/
│   │       ├── product.ts
│   │       ├── collection.ts
│   │       ├── cart.ts
│   │       ├── search.ts
│   │       ├── menu.ts
│   │       └── policy.ts
│   └── utils/
│       ├── format.ts                   # INR currency, date formatting
│       ├── seo.ts                      # generateMetadata helpers
│       └── hooks/
│           ├── useIntersectionObserver.ts
│           └── useCartDrawer.ts
│
├── styles/
│   └── tokens.css                      # CSS custom properties (design tokens)
│
├── public/
│   └── fonts/                          # Self-hosted font fallbacks if needed
│
├── .env.example
├── .env.local                          # gitignored
├── next.config.ts
├── tailwind.config.ts
├── tsconfig.json
├── README.md
├── TODO.md
└── ARCHITECTURE.md
```

---

## Data Flow

### Product Page (SSG + ISR)
```
generateStaticParams()
  └── getProducts() → Shopify API → product handles list

page.tsx (RSC)
  └── getProduct(handle) → Shopify API → product data
      └── ProductGallery (client, image state)
      └── ProductDetails (RSC)
      └── AddToCartButton (client, server action)
      └── RelatedProducts (RSC, parallel fetch)
```

### Cart Flow
```
AddToCartButton (client)
  └── addToCart() [Server Action]
      └── reads cartId from httpOnly cookie
      └── cartCreate() or cartLinesAdd() → Shopify API
      └── sets cartId cookie
      └── returns updated cart
  └── CartDrawer opens (optimistic UI via useOptimistic)
```

### Revalidation Flow
```
Shopify webhook (products/update, collections/update …)
  └── POST /api/revalidate
      └── verifyHMAC(SHOPIFY_REVALIDATION_SECRET)
      └── revalidateTag('products') or revalidateTag('collections')
      └── 200 OK
```

---

## Caching Strategy

| Data | Cache Tag | TTL | Revalidation |
|---|---|---|---|
| Products | `products` | ISR | Shopify webhook |
| Collections | `collections` | ISR | Shopify webhook |
| Menus | `menus` | 1 hour | Manual |
| Policies | `policies` | 24 hours | Manual |
| Cart | — | Never cached | Always fresh |
| Search | — | Never cached | Always fresh |

---

## Security

- All Shopify tokens are server-side only. No `NEXT_PUBLIC_` Shopify tokens.
- Cart ID stored in an `httpOnly`, `SameSite=Strict` cookie.
- Webhook endpoint verifies Shopify HMAC signature before processing.
- No raw card data ever touches the server — checkout redirects to Shopify-hosted checkout.
- Content Security Policy headers set in `next.config.ts`.

---

## Architecture Decision Records

### ADR-001: No Shopify SDK
**Decision:** Use a hand-rolled `shopifyFetch` wrapper instead of `@shopify/storefront-api-client`.
**Reason:** Keeps the dependency surface minimal. The Storefront API is stable GraphQL — a typed fetch wrapper is sufficient and gives full control over caching headers.

### ADR-002: Server Actions for Cart
**Decision:** All cart mutations (add, update, remove) are Next.js Server Actions, not client-side API calls.
**Reason:** Keeps the Storefront token server-side. Enables optimistic UI via `useOptimistic` without exposing credentials.

### ADR-003: httpOnly Cookie for Cart ID
**Decision:** Cart ID is stored in an `httpOnly` cookie, not `localStorage`.
**Reason:** Survives SSR, works across tabs, not accessible to XSS.

### ADR-004: Framer Motion for Animation
**Decision:** Use Framer Motion for page transitions, drawer animations, and scroll reveals.
**Reason:** Production-grade, tree-shakeable, built-in `prefers-reduced-motion` support via `useReducedMotion`.

### ADR-005: Awwwards-Level UI
**Decision:** Invest in editorial design — custom cursor, parallax hero, scroll-triggered reveals, fluid typography.
**Reason:** Kaansa sells premium handcrafted objects. The site must communicate that premium-ness before a single product is seen.
