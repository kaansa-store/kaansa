# DESIGN_SYSTEM.md — Kaansa Visual Identity & Component Spec

> **Style Direction:** Awwwards / Award-winning editorial ecommerce
> **References:** Loewe.com, Aesop.com, Objet d'Art, The Row
> **Last updated:** 2026-10-03

---

## Design Philosophy

Kaansa sells objects made by hand, made to last. The website must feel the same way — considered, unhurried, and quietly confident. No loud CTAs. No discount banners. No carousels that spin. Just the object, the story, and the space to appreciate both.

**Three words that govern every decision:** Warm. Still. Precise.

---

## 1. Colour Tokens

All colours are CSS custom properties defined in `styles/tokens.css` and mapped into Tailwind via `tailwind.config.ts`.

```css
/* styles/tokens.css */
:root {
  /* Backgrounds */
  --color-bg:        #FBF5EA;   /* Warm ivory — page background */
  --color-surface:   #F0E4CC;   /* Parchment — cards, drawers, modals */
  --color-surface-2: #E8D9BC;   /* Deeper parchment — hover states */

  /* Text */
  --color-text:      #2C1A0E;   /* Deep espresso — primary text */
  --color-muted:     #7A5A44;   /* Aged teak — secondary text, captions */
  --color-subtle:    #B09070;   /* Faded brass — placeholders, disabled */

  /* Accents */
  --color-accent:    #8A4A1C;   /* Copper — primary CTA, links */
  --color-accent-hover: #6E3A14; /* Darker copper — hover */
  --color-gold:      #C9A24B;   /* Brass — decorative, price highlights */
  --color-gold-light: #E8D08A;  /* Light brass — hover underlines */

  /* Borders */
  --color-border:    #D9C9B0;   /* Linen — all borders */
  --color-border-strong: #B09070; /* Stronger border — focused inputs */

  /* Semantic */
  --color-success:   #3F6B3A;
  --color-danger:    #9B2C2C;
  --color-warning:   #8A6A1C;
}
```

### Contrast Compliance (WCAG AA)
| Foreground | Background | Ratio | Pass |
|---|---|---|---|
| `--color-text` on `--color-bg` | 12.4:1 | ✅ AAA |
| `--color-accent` on `--color-bg` | 5.1:1 | ✅ AA |
| `--color-muted` on `--color-bg` | 4.6:1 | ✅ AA |
| `--color-text` on `--color-surface` | 10.8:1 | ✅ AAA |

---

## 2. Typography

### Font Stack
```
Display:  Cormorant Garamond — weight 300 (light italic), 400 (regular)
Heading:  Playfair Display — weight 500 (medium)
Body/UI:  Jost — weight 300 (light), 400 (regular), 500 (medium)
```

Load via `next/font/google` in `app/layout.tsx`. Assign CSS variables:
```css
:root {
  --font-display: var(--font-cormorant);
  --font-heading: var(--font-playfair);
  --font-body:    var(--font-jost);
}
```

### Type Scale (fluid, clamp-based)
```css
--text-xs:   clamp(0.75rem,  0.7rem + 0.2vw,  0.875rem);  /* 12–14px */
--text-sm:   clamp(0.875rem, 0.8rem + 0.3vw,  1rem);       /* 14–16px */
--text-base: clamp(1rem,     0.9rem + 0.4vw,  1.125rem);   /* 16–18px */
--text-lg:   clamp(1.125rem, 1rem + 0.5vw,    1.375rem);   /* 18–22px */
--text-xl:   clamp(1.375rem, 1.2rem + 0.8vw,  1.75rem);    /* 22–28px */
--text-2xl:  clamp(1.75rem,  1.5rem + 1.2vw,  2.5rem);     /* 28–40px */
--text-3xl:  clamp(2.5rem,   2rem + 2vw,      4rem);        /* 40–64px */
--text-hero: clamp(3.5rem,   3rem + 3vw,      7rem);        /* 56–112px */
```

### Usage Rules
- Hero headlines: `--font-display`, `--text-hero`, weight 300, letter-spacing `-0.02em`
- Section headings: `--font-heading`, `--text-2xl` to `--text-3xl`
- Product names on cards: `--font-heading`, `--text-base`, weight 500
- Body copy: `--font-body`, `--text-base`, weight 300, line-height 1.7
- Prices: `--font-body`, `--text-lg`, weight 500
- Labels / nav / buttons: `--font-body`, `--text-sm`, weight 400, letter-spacing `0.08em`, uppercase

---

## 3. Spacing Scale

Based on an 8px grid. All spacing values are multiples of 4px.

```css
--space-1:  4px
--space-2:  8px
--space-3:  12px
--space-4:  16px
--space-5:  20px
--space-6:  24px
--space-8:  32px
--space-10: 40px
--space-12: 48px
--space-16: 64px
--space-20: 80px
--space-24: 96px
--space-32: 128px
```

Section vertical padding: `--space-24` (96px) mobile → `--space-32` (128px) desktop.

---

## 4. Component Specifications

### 4.1 Product Card
```
Layout:     Vertical stack
Image area: aspect-ratio 3/4, object-contain, background var(--color-bg)
Image:      Never cropped. Never text overlaid.
Name:       --font-heading, --text-base, var(--color-text), mt-3
Price:      --font-body, --text-sm, var(--color-muted), mt-1
Border:     none (no card border, no shadow)

Hover state (desktop only):
  - Image: transform scale(1.04), transition 400ms ease
  - Name:  gold underline slides in from left (CSS clip-path animation)
  - Cursor: custom brass dot scales to 1.5x

Mobile:
  - No hover states
  - Tap → navigate to product page
```

### 4.2 Button — Primary
```
Background:  var(--color-accent)
Text:        white, --font-body, --text-sm, uppercase, letter-spacing 0.1em
Padding:     14px 32px
Border:      none
Border-radius: 0 (square — editorial feel)
Hover:       background var(--color-accent-hover), transition 200ms
Active:      scale(0.98)
Disabled:    opacity 0.4, cursor not-allowed
Focus:       2px solid var(--color-gold), outline-offset 3px
```

### 4.3 Button — Ghost
```
Background:  transparent
Text:        var(--color-text), --font-body, --text-sm, uppercase, letter-spacing 0.1em
Border:      1px solid var(--color-border)
Padding:     13px 31px (1px less to account for border)
Hover:       border-color var(--color-text), transition 200ms
```

### 4.4 Cart Drawer
```
Desktop:
  Position:   fixed right-0, full height, width 420px
  Background: var(--color-surface)
  Animation:  translateX(100%) → translateX(0), 300ms ease-out
  Backdrop:   fixed inset-0, background rgba(44,26,14,0.4), blur(4px)

Mobile:
  Position:   fixed bottom-0, full width, max-height 85vh
  Animation:  translateY(100%) → translateY(0), 300ms ease-out
  Border-radius: 16px 16px 0 0
```

### 4.5 Header
```
Position:   sticky top-0, z-50
Background: var(--color-bg) with backdrop-blur(8px) at 90% opacity
Height:     64px mobile, 72px desktop
Border:     none (no bottom border by default)
            1px solid var(--color-border) when scrolled > 80px

Left:       Logo (SVG wordmark, var(--color-text))
Centre:     Navigation links (desktop only)
Right:      Search icon, Cart icon (with item count badge)

Scroll behaviour:
  - Hides on scroll down (transform translateY(-100%))
  - Reveals on scroll up (transform translateY(0))
  - Always visible when cart drawer is open
```

### 4.6 Ornamental Divider
```svg
<svg width="120" height="12" viewBox="0 0 120 12">
  <line x1="0" y1="6" x2="52" y2="6" stroke="currentColor" stroke-width="0.5"/>
  <rect x="56" y="4" width="8" height="4" transform="rotate(45 60 6)"
        fill="none" stroke="currentColor" stroke-width="0.5"/>
  <line x1="68" y1="6" x2="120" y2="6" stroke="currentColor" stroke-width="0.5"/>
</svg>
```
Colour: `var(--color-gold)`. Used between sections and in the footer.

### 4.7 Skeleton Loader
```
Background:  var(--color-surface)
Animation:   shimmer — linear-gradient moving left to right, 1.5s infinite
Border-radius: 0 (matches card style)
No spinner anywhere in the UI.
```

### 4.8 Custom Cursor (desktop only)
```
Element:    div, position fixed, pointer-events none, z-index 9999
Default:    8px circle, background var(--color-gold), mix-blend-mode multiply
Hover:      scale(2.5), transition 200ms ease
On links:   scale(1.5), border 1px solid var(--color-gold), background transparent
Hidden on:  touch devices (media: hover: none)
```

---

## 5. Motion & Animation

### Principles
1. Motion serves meaning — it communicates state change, not decoration
2. Every animation ≤ 300ms (except parallax, which is continuous)
3. `prefers-reduced-motion: reduce` → disable all transforms and transitions

### Animation Tokens
```css
--ease-out:    cubic-bezier(0.16, 1, 0.3, 1);   /* Snappy deceleration */
--ease-in-out: cubic-bezier(0.45, 0, 0.55, 1);  /* Smooth both ends */
--duration-fast:   150ms;
--duration-base:   250ms;
--duration-slow:   400ms;
```

### Scroll Reveal (reusable hook)
```typescript
// lib/utils/hooks/useIntersectionObserver.ts
// Triggers once when element enters viewport
// Applies: opacity 0→1, translateY(24px→0), duration 500ms, ease-out
// Stagger: 80ms per child when used on a grid
```

### Page Transitions
```
Route change → AnimatePresence (Framer Motion)
  Exit:  opacity 1→0, translateY(0→-8px), 150ms
  Enter: opacity 0→1, translateY(8px→0), 200ms, 50ms delay
```

### Hero Parallax
```
Image moves at 0.4x scroll speed (CSS transform only)
Text moves at 0.15x scroll speed
Implemented with Framer Motion useScroll + useTransform
```

---

## 6. Responsive Breakpoints

```
xs:  0px      (default — mobile first)
sm:  640px    (large mobile / small tablet)
md:  768px    (tablet)
lg:  1024px   (laptop)
xl:  1280px   (desktop)
2xl: 1536px   (wide monitor)
```

### Product Grid Columns
```
xs–sm:  1 column
md:     2 columns
lg:     3 columns
xl:     3 columns (wider cards)
2xl:    4 columns (optional, only on /collections)
```

---

## 7. Accessibility Standards

- All interactive elements: `focus-visible` ring using `var(--color-gold)`, 2px, offset 3px
- Colour contrast: all text meets WCAG AA minimum (4.5:1)
- Cart drawer: focus trap when open, `aria-modal="true"`, `role="dialog"`
- Images: `alt` from `image.altText` with fallback `"${product.title} — Kaansa"`
- Keyboard navigation: full site navigable without a mouse
- Screen reader: semantic landmarks (`<header>`, `<main>`, `<nav>`, `<footer>`)
- Reduced motion: `@media (prefers-reduced-motion: reduce)` disables all CSS transitions and Framer Motion animations
