# SEO_PLAN.md — SEO, Performance & Structured Data

---

## 1. Metadata Strategy

Every route uses `generateMetadata()`. Shopify SEO fields take priority; fallbacks are hardcoded.

### Root Layout (`app/layout.tsx`)
```typescript
export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL!),
  title: {
    default: 'Kaansa — Handcrafted Brass & Copper from India',
    template: '%s | Kaansa',
  },
  description:
    'Handcrafted brass and copper pieces for the home, the altar, and the table. Made by artisans in India.',
  openGraph: {
    siteName: 'Kaansa',
    locale: 'en_IN',
    type: 'website',
  },
  twitter: { card: 'summary_large_image' },
  robots: { index: true, follow: true },
};
```

### Product Page
```typescript
export async function generateMetadata({ params }): Promise<Metadata> {
  const product = await getProduct(params.handle);
  return {
    title: product.seo.title || product.title,
    description: product.seo.description || product.description.slice(0, 155),
    openGraph: {
      title: product.seo.title || product.title,
      description: product.seo.description,
      images: [{ url: product.featuredImage.url, width: 1086, height: 1448 }],
      type: 'website',
    },
    alternates: {
      canonical: `/products/${product.handle}`,
    },
  };
}
```

### Collection Page
```typescript
// Similar pattern — use collection.seo.title / description
// canonical: /collections/${handle}
```

---

## 2. JSON-LD Structured Data

### Product (`/products/[handle]`)
```typescript
const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Product',
  name: product.title,
  description: product.description,
  image: product.images.map((img) => img.url),
  brand: { '@type': 'Brand', name: 'Kaansa' },
  sku: product.variants[0]?.sku,
  offers: {
    '@type': 'Offer',
    priceCurrency: 'INR',
    price: product.variants[0]?.price.amount,
    availability: product.availableForSale
      ? 'https://schema.org/InStock'
      : 'https://schema.org/OutOfStock',
    seller: { '@type': 'Organization', name: 'Kaansa' },
  },
};
```

### BreadcrumbList (product and collection pages)
```typescript
const breadcrumb = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: siteUrl },
    { '@type': 'ListItem', position: 2, name: 'Collections', item: `${siteUrl}/collections` },
    { '@type': 'ListItem', position: 3, name: collection.title, item: `${siteUrl}/collections/${handle}` },
    { '@type': 'ListItem', position: 4, name: product.title },
  ],
};
```

### Organization (root layout)
```typescript
const org = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Kaansa',
  url: process.env.NEXT_PUBLIC_SITE_URL,
  logo: `${process.env.NEXT_PUBLIC_SITE_URL}/logo.png`,
  sameAs: [
    'https://www.instagram.com/kaansa',
    // add other social profiles
  ],
};
```

---

## 3. Sitemap (`app/sitemap.ts`)

```typescript
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [products, collections] = await Promise.all([
    getProducts(250),
    getCollections(50),
  ]);

  const productUrls = products.map((p) => ({
    url: `${siteUrl}/products/${p.handle}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  const collectionUrls = collections.map((c) => ({
    url: `${siteUrl}/collections/${c.handle}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }));

  return [
    { url: siteUrl, changeFrequency: 'daily', priority: 1.0 },
    { url: `${siteUrl}/collections`, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${siteUrl}/about`, changeFrequency: 'monthly', priority: 0.5 },
    { url: `${siteUrl}/contact`, changeFrequency: 'monthly', priority: 0.4 },
    ...productUrls,
    ...collectionUrls,
  ];
}
```

---

## 4. robots.ts

```typescript
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: '*', allow: '/', disallow: ['/api/', '/cart'] },
    sitemap: `${process.env.NEXT_PUBLIC_SITE_URL}/sitemap.xml`,
  };
}
```

---

## 5. Performance Targets

| Metric | Target | Strategy |
|---|---|---|
| LCP | < 2.5s | `priority` on hero image, preload fonts |
| FID / INP | < 100ms | Minimal client JS, Server Actions |
| CLS | < 0.1 | Explicit image dimensions, font `display: swap` |
| Lighthouse Performance | ≥ 90 | ISR, image optimisation, code splitting |
| Lighthouse Accessibility | ≥ 95 | Semantic HTML, ARIA, contrast |
| Lighthouse SEO | ≥ 95 | Metadata, JSON-LD, canonical |

### Image Optimisation Rules
```tsx
// Hero / LCP image
<Image
  src={product.featuredImage.url}
  alt={product.featuredImage.altText || `${product.title} — Kaansa`}
  width={1086}
  height={1448}
  priority          // LCP only
  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
/>

// All other product images
<Image
  src={image.url}
  alt={image.altText || `${product.title} — Kaansa`}
  width={1086}
  height={1448}
  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
  // No priority — lazy loaded
/>
```

### Font Loading
```typescript
// app/layout.tsx
import { Cormorant_Garamond, Playfair_Display, Jost } from 'next/font/google';

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400'],
  style: ['normal', 'italic'],
  variable: '--font-cormorant',
  display: 'swap',
});

const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['500'],
  variable: '--font-playfair',
  display: 'swap',
});

const jost = Jost({
  subsets: ['latin'],
  weight: ['300', '400', '500'],
  variable: '--font-jost',
  display: 'swap',
});
```
