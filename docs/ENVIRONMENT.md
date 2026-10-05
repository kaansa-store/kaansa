# ENVIRONMENT.md — Environment Variables & Configuration

> All secrets live in `.env.local` (gitignored). Never commit real tokens.

---

## Required Environment Variables

| Variable | Required | Description |
|---|---|---|
| `SHOPIFY_STORE_DOMAIN` | ✅ | Your `.myshopify.com` domain, no `https://` |
| `SHOPIFY_STOREFRONT_ACCESS_TOKEN` | ✅ | Storefront API token from Shopify Headless channel |
| `SHOPIFY_REVALIDATION_SECRET` | ✅ | Random secret for webhook HMAC verification |
| `NEXT_PUBLIC_SITE_URL` | ✅ | Full URL of the deployed site (no trailing slash) |

---

## `.env.example`

```bash
# Shopify — server-side only (never NEXT_PUBLIC_)
SHOPIFY_STORE_DOMAIN=kaansa-yhi4ghha.myshopify.com
SHOPIFY_STOREFRONT_ACCESS_TOKEN=
SHOPIFY_REVALIDATION_SECRET=

# Site
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

---

## How to Get the Storefront Access Token

1. In Shopify Admin → **Sales channels** → **Headless** (install if not present)
2. Create a new Storefront API credential
3. Copy the **Public access token** (or **Private access token** for server-only use)
4. Paste into `SHOPIFY_STOREFRONT_ACCESS_TOKEN`

> Use the **private** token — it never appears in the browser.

---

## How to Generate the Revalidation Secret

```bash
openssl rand -base64 32
```

Paste the output into `SHOPIFY_REVALIDATION_SECRET` and into the Shopify webhook configuration.

---

## Vercel Environment Setup

1. Go to your Vercel project → **Settings** → **Environment Variables**
2. Add each variable for **Production**, **Preview**, and **Development** environments
3. Set `NEXT_PUBLIC_SITE_URL` to your production domain for Production, and the preview URL for Preview

---

## Shopify Webhook Registration

Register these webhooks in Shopify Admin → **Settings** → **Notifications** → **Webhooks**:

| Topic | URL |
|---|---|
| `products/create` | `https://your-domain.com/api/revalidate` |
| `products/update` | `https://your-domain.com/api/revalidate` |
| `products/delete` | `https://your-domain.com/api/revalidate` |
| `collections/update` | `https://your-domain.com/api/revalidate` |

Set the **Secret** field to the value of `SHOPIFY_REVALIDATION_SECRET`.

---

## next.config.ts

```typescript
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.shopify.com',
        pathname: '/s/files/**',
      },
    ],
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'X-Frame-Options',           value: 'DENY' },
          { key: 'X-Content-Type-Options',     value: 'nosniff' },
          { key: 'Referrer-Policy',            value: 'no-referrer-when-downgrade' },
          { key: 'Permissions-Policy',         value: 'camera=(), microphone=(), geolocation=()' },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload',
          },
        ],
      },
    ];
  },
};

export default nextConfig;
```
