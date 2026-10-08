import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const cookieStore = await cookies();
  cookieStore.delete('kaansa_customer_token');
  const url = req.nextUrl.clone();
  url.pathname = '/account/login';
  url.search = '';
  return NextResponse.redirect(url);
}
