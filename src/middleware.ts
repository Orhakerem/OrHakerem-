import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

const LEGACY_ACCOMMODATION_PATHS = new Set([
  '/rentals',
  '/rentals/',
  '/short-term-rentals',
  '/short-term-rentals/',
]);

export function middleware(request: NextRequest) {
  if (LEGACY_ACCOMMODATION_PATHS.has(request.nextUrl.pathname)) {
    const destination = request.nextUrl.clone();
    destination.pathname = '/properties';

    return NextResponse.redirect(destination, 301);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/rentals', '/rentals/:path*', '/short-term-rentals', '/short-term-rentals/:path*'],
};
