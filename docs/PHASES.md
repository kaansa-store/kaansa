# PHASES.md - Build Plan and Phase Checklist

Work phase by phase. After each phase run: pnpm lint and pnpm tsc --noEmit and pnpm build.
Fix all errors before moving to the next phase.

## Skill Stack (Agent SOP Phase 0)

AGENT ROLE:   Full-Stack Dev + Designer
PROJECT:      Kaansa Headless Storefront
TECH STACK:   Next.js 15, TypeScript, Tailwind v4, Shopify Storefront API
GOAL:         Production-ready headless ecommerce, Awwwards-level UI

ACTIVE SKILLS:
  Planning:  @brainstorming + @concise-planning
  Design:    @ui-ux-pro-max + @frontend-design
  Frontend:  @react-patterns + @tailwind-patterns + @nextjs-best-practices
  Backend:   @senior-fullstack + @api-patterns
  Security:  @api-security-best-practices + @backend-security-coder
  SEO:       @seo-audit + @copywriting
  Testing:   @systematic-debugging + @lint-and-validate

---

## Phase 1 - Scaffold, Tokens, Fonts, Layout Shell, Shopify Client

- [ ] pnpm create next-app@latest kaansa --typescript --tailwind --app
- [ ] Install: framer-motion, clsx
- [ ] Create styles/tokens.css with all CSS custom properties
- [ ] Configure tailwind.config.ts to consume CSS tokens
- [ ] Set up next/font: Cormorant Garamond, Playfair Display, Jost
- [ ] Create lib/shopify/client.ts with shopifyFetch wrapper
- [ ] Create lib/shopify/types.ts with all TypeScript types
- [ ] Create lib/shopify/reshape.ts with edge/node flattening utilities
- [ ] Create lib/utils/format.ts with formatPrice and getDiscountPercent
- [ ] Create app/layout.tsx with fonts, CSS variables, providers
- [ ] Create components/layout/Header.tsx sticky scroll-hide/reveal
- [ ] Create components/layout/Footer.tsx Shopify menu + fallback
- [ ] Create components/ui/CustomCursor.tsx brass dot cursor desktop only
- [ ] Create components/ui/Divider.tsx SVG ornamental divider
- [ ] Create components/ui/Skeleton.tsx shimmer skeleton
- [ ] Create components/ui/Button.tsx primary + ghost variants
- [ ] Create .env.example
- [ ] VERIFY: pnpm lint and pnpm tsc --noEmit and pnpm build all pass

## Phase 2 - Collections and Product Pages

- [ ] Create lib/shopify/queries/product.ts with getProduct and getProducts
- [ ] Create lib/shopify/queries/collection.ts with getCollection and getCollections
- [ ] Create app/(shop)/collections/page.tsx all collections grid
- [ ] Create app/(shop)/collections/[handle]/page.tsx product grid with sort + filter
- [ ] Create app/(shop)/products/[handle]/page.tsx full product detail page
- [ ] Create components/product/ProductCard.tsx hover lift, gold underline, no text overlay
- [ ] Create components/product/ProductGrid.tsx responsive grid, scroll-reveal stagger
- [ ] Create components/product/ProductGallery.tsx image switcher client component
- [ ] Create components/product/ProductDetails.tsx price, badge, description, care
- [ ] Create components/product/PriceDisplay.tsx price + compare-at + % off badge
- [ ] Create components/product/RelatedProducts.tsx parallel fetch, same collection
- [ ] Implement generateStaticParams for products and collections
- [ ] Implement URL-driven sort + filter with ?sort= and ?type= and ?min= and ?max=
- [ ] Implement generateMetadata for product and collection pages
- [ ] Add JSON-LD Product and BreadcrumbList structured data
- [ ] VERIFY: pnpm lint and pnpm tsc --noEmit and pnpm build all pass

## Phase 3 - Cart, Drawer, Page, Server Actions, Checkout

- [ ] Create lib/shopify/queries/cart.ts all cart mutations and getCart query
- [ ] Create cart Server Actions in app/(shop)/cart/actions.ts
- [ ] Implement httpOnly cookie for kaansa_cart_id
- [ ] Create components/cart/CartDrawer.tsx side drawer desktop / bottom sheet mobile
- [ ] Create components/cart/CartItem.tsx quantity stepper, remove button
- [ ] Create components/cart/CartSummary.tsx subtotal, checkout button
- [ ] Create components/cart/AddToCartButton.tsx optimistic UI via useOptimistic
- [ ] Create app/(shop)/cart/page.tsx full cart page
- [ ] Implement sticky Add to cart bar on mobile product pages
- [ ] Handle expired/missing cart silently create new cart
- [ ] Block add-to-cart when availableForSale is false
- [ ] Checkout redirects to cart.checkoutUrl
- [ ] VERIFY: pnpm lint and pnpm tsc --noEmit and pnpm build all pass

## Phase 4 - Search, Filters, Sorting

- [ ] Create lib/shopify/queries/search.ts search and predictiveSearch queries
- [ ] Create app/(shop)/search/page.tsx search results with product grid
- [ ] Create components/search/SearchInput.tsx controlled input with debounce
- [ ] Create components/search/PredictiveSearch.tsx dropdown with results
- [ ] Wire predictive search into Header
- [ ] Implement URL-driven search with ?q=
- [ ] Handle empty state and no-results state
- [ ] VERIFY: pnpm lint and pnpm tsc --noEmit and pnpm build all pass

## Phase 5 - Homepage, About, Contact, Policies

- [ ] Create components/home/Hero.tsx full-viewport parallax editorial headline
- [ ] Create components/home/FeaturedCollection.tsx Home page collection grid
- [ ] Create components/home/CategoryTiles.tsx 3 category tiles with hover
- [ ] Create components/home/WhyKaansa.tsx 3-pillar strip with scroll reveal
- [ ] Create components/home/GiftingBlock.tsx editorial gifting section
- [ ] Create components/home/NewsletterSignup.tsx email form
- [ ] Create app/(shop)/page.tsx compose all home sections
- [ ] Create app/(shop)/about/page.tsx brand story editable placeholder
- [ ] Create app/(shop)/contact/page.tsx contact form
- [ ] Create lib/shopify/queries/policy.ts shop policies query
- [ ] Create app/(shop)/policies/[handle]/page.tsx policy pages from Shopify
- [ ] Create app/not-found.tsx branded 404
- [ ] Create app/error.tsx error boundary
- [ ] VERIFY: pnpm lint and pnpm tsc --noEmit and pnpm build all pass

## Phase 6 - SEO, Performance, Accessibility Pass

- [ ] Audit all generateMetadata title, description, canonical, OG, Twitter
- [ ] Verify JSON-LD on product and collection pages
- [ ] Create app/sitemap.ts dynamic sitemap
- [ ] Create app/robots.ts
- [ ] Audit all Image components correct sizes, priority only on LCP
- [ ] Audit all alt text from Shopify altText with fallback
- [ ] Audit focus-visible styles on all interactive elements
- [ ] Audit keyboard navigation full site navigable without mouse
- [ ] Audit cart drawer focus trap, aria-modal, role=dialog
- [ ] Add prefers-reduced-motion to all CSS transitions
- [ ] Add useReducedMotion from Framer Motion to all animated components
- [ ] Run Lighthouse on mobile fix anything below 90
- [ ] VERIFY: pnpm lint and pnpm tsc --noEmit and pnpm build all pass

## Phase 7 - Webhook Revalidation, README, Verification

- [ ] Create app/api/revalidate/route.ts HMAC-verified webhook handler
- [ ] Test revalidation with a product update in Shopify Admin
- [ ] Write README.md setup, env vars, Storefront token, webhook registration, Vercel deploy
- [ ] Write TODO.md anything skipped or assumed

Final Verification Checklist:
- [ ] Home loads with Home page collection products
- [ ] Collection page filters and sorts correctly via URL params
- [ ] Product page shows price, compare-at, % off, and Add to cart works
- [ ] Cart drawer updates quantity and removes items, cart survives refresh
- [ ] Checkout lands on Shopify checkout with correct items and INR totals
- [ ] Search returns results, predictive dropdown works
- [ ] Mobile viewport 390px has no horizontal scroll
- [ ] pnpm build passes with zero type or lint errors
- [ ] Lighthouse mobile Performance >= 90, Accessibility >= 95, SEO >= 95
- [ ] Custom cursor visible on desktop, hidden on touch devices
- [ ] Scroll-reveal animations trigger correctly
- [ ] Hero parallax works
- [ ] Cart drawer is bottom sheet on mobile, side drawer on desktop
- [ ] prefers-reduced-motion disables all animations

Dependency Budget:
  framer-motion: approved (tree-shakeable)
  clsx: approved
  Ask before adding any package over 20kB. No UI component libraries.
