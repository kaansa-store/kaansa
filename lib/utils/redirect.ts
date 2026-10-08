export function safeAccountRedirect(from: string | null | undefined): string {
  if (!from) return '/account';
  if (!/^\/account(?:\/[A-Za-z0-9_-]+)*$/.test(from)) return '/account';
  if (from.startsWith('/account/logout') || from.startsWith('/account/session-expired')) return '/account';
  return from;
}
