import { NextRequest, NextResponse } from 'next/server';

const PROTECTED_ROUTES = ['/account'];
const AUTH_ROUTES = ['/account/login', '/account/register', '/account/forgot'];

export function middleware(req: NextRequest) {
  const token = req.cookies.get('kaansa_customer_token')?.value;
  const { pathname } = req.nextUrl;

  const isProtected = PROTECTED_ROUTES.some(
    (r) => pathname === r || (pathname.startsWith(r) && !AUTH_ROUTES.includes(pathname))
  );

  // Not logged in, trying to access protected route (except logout) → redirect to login
  if (isProtected && !token && pathname !== '/account/logout') {
    const url = req.nextUrl.clone();
    url.pathname = '/account/login';
    url.searchParams.set('from', pathname);
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/account/:path*'],
};
