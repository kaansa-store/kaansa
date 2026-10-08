This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Webhook Registration

Go to Shopify Admin → Settings → Notifications → Webhooks.
Register ALL of the following, pointing to your deployed URL:

| Topic | URL |
|---|---|
| `products/create` | `https://your-domain.com/api/revalidate` |
| `products/update` | `https://your-domain.com/api/revalidate` |
| `products/delete` | `https://your-domain.com/api/revalidate` |
| `products/publish` | `https://your-domain.com/api/revalidate` |
| `products/unpublish` | `https://your-domain.com/api/revalidate` |
| `inventory_levels/update` | `https://your-domain.com/api/revalidate` |
| `collections/create` | `https://your-domain.com/api/revalidate` |
| `collections/update` | `https://your-domain.com/api/revalidate` |
| `collections/delete` | `https://your-domain.com/api/revalidate` |

Copy the Signing Secret shown on the Notifications page and set it as:
```bash
SHOPIFY_REVALIDATION_SECRET=<paste here>
```

After registering, make a test change in Shopify Admin (edit any product title and save). The website should reflect the change within 2-3 seconds without any code deployment.

## Email Setup (Resend)

1. Go to https://resend.com and create an account.

2. In the Resend dashboard → API Keys → Create API key.
   Name it "Kaansa contact form". Give it "Sending access" only.
   Copy the key (starts with `re_`).

3. Add to `.env.local`:
   ```bash
   RESEND_API_KEY=re_your_key_here
   CONTACT_TO_EMAIL=kaansaindia@gmail.com
   CONTACT_FROM_EMAIL=contact@yourdomain.com
   ```

4. **Important Verified Domain Requirement**:
   `CONTACT_FROM_EMAIL` must use a domain verified in Resend. `onboarding@resend.dev` is only for testing and normally delivers only to the Resend account owner's address, so customer auto-replies will not arrive until a domain is verified. Verify your custom domain in Resend → Domains and add the required DNS records (DKIM, SPF) to your domain registrar.

5. **Serverless Rate Limiting**:
   Note that the in-memory rate limits (per-IP form submissions and per-recipient auto-reply limits) reset per serverless instance. For distributed rate-limiting across all serverless invocations, connect Upstash Redis.

6. **Vercel Configuration**:
   All of `RESEND_API_KEY`, `CONTACT_TO_EMAIL`, and `CONTACT_FROM_EMAIL` must be set in Vercel for Production, Preview, and Development (Vercel dashboard → Settings → Environment Variables).

## Before Launch Checklist

- [ ] Rotate the Shopify Storefront access token
- [ ] Confirm the GitHub repository is private
- [ ] Set all production environment variables in Vercel (`SHOPIFY_STORE_DOMAIN`, `SHOPIFY_STOREFRONT_ACCESS_TOKEN`, `SHOPIFY_REVALIDATION_SECRET`, `RESEND_API_KEY`, `CONTACT_TO_EMAIL`, `CONTACT_FROM_EMAIL`, `NEXT_PUBLIC_SITE_URL`)
- [ ] Run `pnpm audit --audit-level=high`
- [ ] Replace `'unsafe-inline'` in Content-Security-Policy with a nonce-based CSP

