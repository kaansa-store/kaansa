import 'server-only';

// Pin latest stable Shopify Storefront API version
const API_VERSION = '2026-10';

export async function shopifyFetch<T>({
  query,
  variables,
  tags,
  cache = 'force-cache',
  buyerIp,
}: {
  query: string;
  variables?: Record<string, unknown>;
  tags?: string[];
  cache?: RequestCache;
  buyerIp?: string;
}): Promise<{ data: T; errors?: { message: string }[] }> {
  const rawDomain = process.env.SHOPIFY_STORE_DOMAIN?.trim().replace(/^['"]|['"]$/g, '');
  const rawToken = process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN?.trim().replace(/^['"]|['"]$/g, '');

  if (!rawDomain || !rawToken) {
    throw new Error('Missing Shopify environment variables: SHOPIFY_STORE_DOMAIN or SHOPIFY_STOREFRONT_ACCESS_TOKEN');
  }

  const cleanDomain = rawDomain.replace(/^https?:\/\//, '').replace(/\/$/, '');
  const endpoint = `https://${cleanDomain}/api/${API_VERSION}/graphql.json`;

  const isPrivateToken = rawToken.startsWith('shpat_');
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(isPrivateToken
      ? { 'Shopify-Storefront-Private-Token': rawToken }
      : { 'X-Shopify-Storefront-Access-Token': rawToken }),
    ...(buyerIp ? { 'Shopify-Storefront-Buyer-IP': buyerIp } : {}),
  };

  const res = await fetch(endpoint, {
    method: 'POST',
    headers,
    body: JSON.stringify({ query, variables }),
    cache,
    next: tags ? { tags } : undefined,
  });

  if (!res.ok) {
    console.error(`[Shopify HTTP Error ${res.status}]`);
    throw new Error(`Shopify fetch failed with HTTP ${res.status}: ${res.statusText}`);
  }

  const json = await res.json();

  if (json.errors) {
    console.error('[Shopify GraphQL Errors]', json.errors);
    throw new Error(json.errors[0]?.message || 'Shopify GraphQL query failed');
  }

  return json;
}
