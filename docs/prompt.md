# PROMPT.md: Kaansa Headless Storefront (Next.js + Shopify)

> **Agent SOP Reference:** Read `agent-sop.md` in full before starting. Declare your full skill stack (Phase 0) before writing a single line of code.
> **Shopify Components Reference:** Read `shopify-llm.md` for all Shopify Storefront API component patterns, query shapes, and cart integration details.

Build a production-ready headless ecommerce website for **Kaansa**, an Indian brand selling handcrafted brass heritage pieces (pooja essentials, home decor, kitchen and tableware). Next.js is the frontend. Shopify is the backend for products, inventory, cart and checkout.

**UI/UX Direction:** Award-winning / Awwwards-level design. Think Loewe, Aesop, or Objet d'Art — editorial, immersive, typographically rich. Every scroll, hover and transition must feel intentional. The site should feel like a curated gallery, not a catalogue.

Work in **Planning mode**. Before writing code, produce a plan with the folder structure, data flow and phase list, and wait for my approval. Then build phase by phase. After each phase, run `lint`, `tsc --noEmit` and `build`, and fix everything before moving on.

---

## 1. Stack (don't swap without asking)

- Next.js (latest stable), App Router, React Server Components by default
- TypeScript, strict mode
- Tailwind CSS (v4 if the installed Next.js supports it cleanly)
- Shopify **Storefront API** (GraphQL). Pin the API version in one constant, using the latest stable version listed on shopify.dev
- No Shopify SDK required. A small typed `shopifyFetch` wrapper is enough
- Deploy target: Vercel
- Package manager: pnpm

## 2. Shopify setup (already done by me)

- Store domain: `kaansa-yhi4ghha.myshopify.com`
- Currency: INR (₹). Market: India
- 14 brass products live, plus 3 copper products (water bottle, jug, kadai)
- Product fields in use: title, description (HTML), vendor `Kaansa`, product type (`Pooja Essentials`, `Home Decor`, `Kitchen & Tableware`), tags, SKU, price, compare-at price, color metafield, single variant per product
- A collection called **Home page** (automated on tag `home-page`) drives the homepage grid
- Product images are **portrait infographic posters (about 3:4, 1086x1448)** with the product name, size and icons already baked in. Never crop them. Never overlay a duplicate title on top of them

## 3. Environment variables

Create `.env.example` and never hardcode a token.

```
SHOPIFY_STORE_DOMAIN=kaansa-yhi4ghha.myshopify.com
SHOPIFY_STOREFRONT_ACCESS_TOKEN=
SHOPIFY_REVALIDATION_SECRET=
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

Use the **private/server-side** token pattern where possible. All Shopify calls happen on the server (RSC, route handlers, server actions). The browser never talks to Shopify directly, except by redirecting to checkout.

## 4. Pages and routes

| Route | What it does |
|---|---|
| `/` | Hero, featured collection (Home page), category tiles, "Why Kaansa" strip (handcrafted, artisan made, timeless heritage), gifting block, newsletter signup |
| `/collections` | All collections |
| `/collections/[handle]` | Product grid, sort (featured, price low-high, price high-low, newest), filter by product type and price range, URL-driven (`?sort=&type=&min=&max=`) |
| `/products/[handle]` | Image gallery, title, price with compare-at and % off badge, stock state, quantity, Add to cart, the details block from the description (material, size, finish, care), related products, JSON-LD `Product` |
| `/search` | Search results page, plus a predictive search dropdown in the header |
| `/cart` | Full cart page. A slide-over **cart drawer** opens from anywhere |
| `/about`, `/contact` | Static brand pages (placeholder copy I can edit) |
| `/policies/[handle]` | Privacy, refund, shipping and terms, pulled live from Shopify `shop { ...Policy }` |
| `not-found`, `error` | Branded 404 and error boundary |

Header menu and footer links come from Shopify navigation (`menu(handle: "main-menu")` and `"footer"`), with a hardcoded fallback if the menu is empty.

## 5. Cart and checkout

- Use the Storefront **Cart API**: `cartCreate`, `cartLinesAdd`, `cartLinesUpdate`, `cartLinesRemove`
- Store the cart ID in an **httpOnly cookie**. Handle it through Server Actions
- Optimistic UI in the drawer (`useOptimistic`), with quantity steppers, remove, subtotal and a clear empty state
- Checkout = redirect to `cart.checkoutUrl` (Shopify-hosted checkout). Do not build custom payment
- If a cart expires or is not found, create a new one silently
- Block add-to-cart when `availableForSale` is false and show "Sold out"

## 6. Data and caching

- All queries live in `lib/shopify/queries/*.ts` as typed GraphQL strings, with response types in `lib/shopify/types.ts`. Add a `reshape` layer so components never see raw `edges/nodes`
- Use tag-based caching: `products`, `collections`, `cart` is never cached
- `POST /api/revalidate`: verify the Shopify webhook HMAC with `SHOPIFY_REVALIDATION_SECRET`, then revalidate by topic (`products/*`, `collections/*`)
- Generate static params for product and collection pages, with on-demand revalidation
- Handle GraphQL `errors` and `userErrors` explicitly. Log server-side, show a friendly message client-side

## 7. Design direction — Awwwards / Award-Winning Level

This is not a standard ecommerce site. It is a **curated digital gallery** for handcrafted heritage objects. Every pixel must feel considered. Reference: Loewe, Aesop, Objet d'Art, Maison Margiela, The Row.

### Visual Language
- **Mood:** Temple-lit evening. Candlelight on brass. Silence before a prayer.
- **Palette (CSS custom properties → Tailwind tokens):**
  - `--color-bg`: `#FBF5EA` (warm ivory — the wall)
  - `--color-surface`: `#F0E4CC` (parchment — cards, drawers)
  - `--color-text`: `#2C1A0E` (deep espresso)
  - `--color-muted`: `#7A5A44` (aged teak)
  - `--color-accent`: `#8A4A1C` (copper)
  - `--color-gold`: `#C9A24B` (brass)
  - `--color-border`: `#D9C9B0` (linen)
  - `--color-success`: `#3F6B3A`
  - `--color-danger`: `#9B2C2C`

### Typography
- **Display / Hero:** Cormorant Garamond (400, 300 italic) — large, airy, editorial
- **Headings:** Playfair Display (500) — structured, warm
- **Body / UI:** Jost (300, 400) — clean, modern, never cold
- Load all via `next/font/google`. No system font fallbacks in production.
- Type scale: fluid (`clamp()`-based), never fixed px for headings

### Layout & Spacing
- **Grid:** 12-column CSS grid. Products: 1 col mobile → 2 col tablet → 3 col desktop
- **Whitespace:** Generous. Sections breathe. Minimum 120px vertical padding on desktop sections
- **Borders:** 1px `var(--color-border)` only. No box shadows on cards
- **Dividers:** Thin SVG ornamental flourish (single line with a small diamond centre)

### Awwwards-Level Interactions
- **Hero:** Full-viewport editorial layout. Large serif headline split across two lines. A single product image (portrait, no crop). Subtle parallax on scroll (CSS `transform` only, no JS scroll listeners — use `@scroll-timeline` or Framer Motion with `useScroll`)
- **Product cards:** On hover — image scales to 1.04, a thin gold underline slides under the product name. No overlaid text. No shadows. Just the image and the name below it
- **Page transitions:** Fade + slight upward translate (200ms ease-out) on route change using `next/navigation` + a layout-level AnimatePresence
- **Cart drawer:** Slides in from the right with a backdrop blur. Closes with a swipe gesture on mobile
- **Cursor:** Custom cursor on desktop — a small brass-coloured dot that scales up on hover over interactive elements
- **Scroll-triggered reveals:** Product grids, section headings, and the "Why Kaansa" strip fade up as they enter the viewport (Intersection Observer, single reusable hook)
- **Loading states:** Skeleton shimmer in `var(--color-surface)` — never a spinner
- **Motion budget:** All animations ≤ 300ms. Always respect `prefers-reduced-motion` — disable all transforms and transitions when set

### Product Image Rules
- Images are **portrait infographic posters (3:4, 1086×1448)**. The product name, size and icons are baked into the image
- Use `object-contain` on an ivory (`var(--color-bg)`) background — never `object-cover`
- Never overlay a title, badge or any text on top of the image
- `priority` only on the LCP image (first visible product or hero)

### Mobile
- Mobile-first. Every component designed at 390px first
- Sticky "Add to cart" bar on product pages (fixed bottom, full width, above safe area)
- Bottom-sheet cart drawer on mobile (slides up), side drawer on desktop
- Touch targets ≥ 48px. No hover-only interactions

## 8. Copy rules

All UI copy and any placeholder text must sound **human**: warm, short, specific. No AI-sounding filler ("elevate", "tapestry", "seamlessly", "unlock"), no triple-adjective lists, no em-dash chains. Examples of the tone:

- "Made by hand, made to be used every day."
- "Light it tonight." (diya CTA)
- "Pairs well with" (related products)

Currency formatting: `Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 })`.

## 9. SEO and performance

- `generateMetadata` on every route (title, description, canonical, Open Graph, Twitter), using Shopify SEO fields when present
- `sitemap.ts`, `robots.ts`, JSON-LD for `Product`, `BreadcrumbList` and `Organization`
- `next/image` with `remotePatterns` for `cdn.shopify.com`, correct `sizes`, and `priority` only on the LCP image
- Target: Lighthouse 90+ on Performance, Accessibility, Best Practices and SEO (mobile)
- Accessibility: semantic landmarks, focus-visible styles, keyboard-operable drawer with focus trap, alt text from `image.altText` with a sensible fallback

## 10. Project structure

```
app/
  (shop)/ ...routes above
  api/revalidate/route.ts
components/ (ui/, layout/, product/, cart/, search/)
lib/shopify/ (client.ts, queries/, types.ts, reshape.ts)
lib/utils/ (format.ts, seo.ts)
styles/ tokens.css
.env.example
README.md
```

## 11. Constraints and gotchas

- Products in **draft** status do not appear in the Storefront API. If the grid looks empty, check that products are Active and published to the **Headless** (or Online Store) sales channel
- Don't depend on the 3 copper products. Everything must render cleanly with any number of products
- No client-side secrets, no `NEXT_PUBLIC_` tokens
- No dummy lorem ipsum in the final build. Use real Kaansa copy or clearly marked editable placeholders
- Keep dependencies minimal. Ask before adding any library bigger than 20 kB

## 12. Verification (use the browser agent)

After the build, open the running app and check:

1. Home loads with the Home page collection products
2. A collection page filters and sorts correctly via URL params
3. A product page shows price, compare-at, % off, and Add to cart works
4. The cart drawer updates quantity and removes items, and the cart survives a refresh
5. "Checkout" lands on the Shopify checkout page with the right items and INR totals
6. Search returns results and the predictive dropdown works
7. Mobile viewport (390px) has no horizontal scroll
8. `pnpm build` passes with zero type or lint errors

Report results as a short checklist with screenshots for steps 1, 3, 4 and 5.

## 13. Deliverables

- Working app in the repo, with clean commit history by phase
- `README.md`: setup, env vars, how to get the Storefront token, how to register webhooks (`products/create`, `products/update`, `products/delete`, `collections/update`) pointing to `/api/revalidate`, and Vercel deploy steps
- A short `TODO.md` listing anything you skipped or assumed

## Phases

1. Scaffold, tokens, fonts, layout shell, Shopify client
2. Collections and product pages
3. Cart (drawer, page, server actions) and checkout redirect
4. Search, filters, sorting
5. Home, about, contact, policies
6. SEO, performance, accessibility pass
7. Webhook revalidation, README, verification run