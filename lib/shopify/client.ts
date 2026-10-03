import 'server-only';

// Pin latest stable Shopify Storefront API version
const API_VERSION = '2026-10';

export async function shopifyFetch<T>({
  query,
  variables,
  tags,
  cache = 'force-cache',
}: {
  query: string;
  variables?: Record<string, unknown>;
  tags?: string[];
  cache?: RequestCache;
}): Promise<{ data: T; errors?: { message: string }[] }> {
  const domain = process.env.SHOPIFY_STORE_DOMAIN;
  const token = process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN;

  if (!domain || !token) {
    throw new Error('Missing Shopify environment variables: SHOPIFY_STORE_DOMAIN or SHOPIFY_STOREFRONT_ACCESS_TOKEN');
  }

  const endpoint = `https://${domain}/api/${API_VERSION}/graphql.json`;

  const res = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Shopify-Storefront-Private-Token': token,
    },
    body: JSON.stringify({ query, variables }),
    cache,
    next: tags ? { tags } : undefined,
  });

  if (!res.ok) {
    const text = await res.text();
    console.error(`[Shopify HTTP Error ${res.status}]`, text);
    throw new Error(`Shopify fetch failed with HTTP ${res.status}: ${res.statusText}`);
  }

  const json = await res.json();

  if (json.errors) {
    console.error('[Shopify GraphQL Errors]', json.errors);
    throw new Error(json.errors[0]?.message || 'Shopify GraphQL query failed');
  }

  return json;
}
