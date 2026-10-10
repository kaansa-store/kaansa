import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';
import { revalidatePath, revalidateTag } from 'next/cache';

const TOPIC_TAG_MAP: Record<string, string[]> = {
  'products/create': ['products'],
  'products/update': ['products'],
  'products/delete': ['products'],
  'products/publish': ['products'],
  'products/unpublish': ['products'],
  'inventory_levels/update': ['inventory', 'products'],
  'collections/create': ['collections', 'products'],
  'collections/update': ['collections', 'products'],
  'collections/delete': ['collections', 'products'],
};

function verifyHMAC(body: string, signature: string, secret: string): boolean {
  if (!signature || !secret) return false;
  try {
    const hash = crypto
      .createHmac('sha256', secret)
      .update(body, 'utf8')
      .digest('base64');
    const hashBuf = Buffer.from(hash);
    const sigBuf = Buffer.from(signature);
    if (hashBuf.length !== sigBuf.length) return false;
    return crypto.timingSafeEqual(hashBuf, sigBuf);
  } catch {
    return false;
  }
}

export async function POST(req: NextRequest) {
  const rawBody = await req.text();
  const signature = req.headers.get('x-shopify-hmac-sha256') ?? '';
  const topic = req.headers.get('x-shopify-topic') ?? '';
  const secret = process.env.SHOPIFY_REVALIDATION_SECRET!;

  if (!verifyHMAC(rawBody, signature, secret)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const tags = TOPIC_TAG_MAP[topic];
  if (!tags) {
    return NextResponse.json({ skipped: true, topic }, { status: 200 });
  }

  tags.forEach((tag) => {
    revalidateTag(tag, 'max');
  });

  // Clear full route cache across all pages
  try {
    revalidatePath('/', 'layout');
  } catch (e) {
    console.error('revalidatePath error:', e);
  }

  console.log(`[revalidate] topic=${topic} tags=${tags.join(',')}`);
  return NextResponse.json({ revalidated: true, topic, tags }, { status: 200 });
}

