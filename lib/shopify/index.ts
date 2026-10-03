import { shopifyFetch } from './client';
import { getMenuQuery } from './queries/menu';
import { MenuItem, ShopifyMenu } from './types';

export function normalizeMenuUrl(url: string): string {
  try {
    if (url.startsWith('http://') || url.startsWith('https://')) {
      const parsed = new URL(url);
      const path = parsed.pathname;
      if (path === '/' || path === '') return '/';
      if (path.startsWith('/pages/')) return path.replace('/pages/', '/');
      if (path === '/collections/all') return '/collections';
      return path;
    }
  } catch {
    // fallback
  }

  if (url === '/collections/all') return '/collections';
  if (url.startsWith('/pages/')) return url.replace('/pages/', '/');
  return url;
}

export async function getMenu(handle: string): Promise<MenuItem[]> {
  try {
    const res = await shopifyFetch<{ menu: ShopifyMenu | null }>({
      query: getMenuQuery,
      variables: { handle },
      tags: ['menus'],
    });

    if (!res.data.menu?.items) {
      return [];
    }

    return res.data.menu.items.map((item) => ({
      ...item,
      url: normalizeMenuUrl(item.url),
      items: item.items?.map((sub) => ({
        ...sub,
        url: normalizeMenuUrl(sub.url),
      })),
    }));
  } catch (error) {
    console.error(`Failed to fetch menu "${handle}":`, error);
    return [];
  }
}
