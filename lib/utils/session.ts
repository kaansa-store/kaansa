import 'server-only';
import { cookies } from 'next/headers';

const COOKIE_NAME = 'kaansa_customer_token';
export const COOKIE_MAX_AGE = 60 * 60 * 24 * 30; // 30 days in seconds

export async function getCustomerToken(): Promise<string | null> {
  const cookieStore = await cookies();
  return cookieStore.get(COOKIE_NAME)?.value ?? null;
}

export async function setCustomerToken(token: string, expiresAt: string) {
  const cookieStore = await cookies();
  cookieStore.set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    expires: new Date(expiresAt),
  });
}

export async function clearCustomerToken() {
  const cookieStore = await cookies();
  cookieStore.delete(COOKIE_NAME);
}
