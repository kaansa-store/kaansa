import 'server-only';
import { headers } from 'next/headers';

export async function getBuyerIp(): Promise<string | undefined> {
  try {
    const headersList = await headers();
    const forwardedFor = headersList.get('x-forwarded-for');
    if (forwardedFor) {
      const firstIp = forwardedFor.split(',')[0]?.trim();
      if (firstIp) return firstIp;
    }
    const realIp = headersList.get('x-real-ip')?.trim();
    if (realIp) return realIp;
  } catch {
    // Ignore outside of request scope
  }
  return undefined;
}
