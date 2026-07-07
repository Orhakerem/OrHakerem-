import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

import { SESSION_COOKIE_NAME, buildSessionTokenPayload } from '@/lib/admin-session-token';

const LEGACY_ACCOMMODATION_PATHS = new Set([
  '/rentals',
  '/rentals/',
  '/short-term-rentals',
  '/short-term-rentals/',
]);

async function sha256Hex(value: string): Promise<string> {
  const digest = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(value));
  return Array.from(new Uint8Array(digest))
    .map((byte) => byte.toString(16).padStart(2, '0'))
    .join('');
}

/**
 * Edge mirror of `isValidSessionToken` in admin-auth.ts (which needs
 * node:crypto and cannot be bundled here). Re-hashing both sides keeps the
 * final comparison on values an attacker cannot predict.
 */
async function isAdminSessionValid(token: string | undefined): Promise<boolean> {
  if (!token) {
    return false;
  }

  const email = process.env.ADMIN_EMAIL?.trim().toLowerCase();
  const passwordSha256 = process.env.ADMIN_PASSWORD_SHA256?.trim().toLowerCase();
  const sessionSecret = process.env.ADMIN_SESSION_SECRET?.trim();

  if (!email || !passwordSha256 || !sessionSecret) {
    return false;
  }

  const expected = await sha256Hex(buildSessionTokenPayload(email, passwordSha256, sessionSecret));
  return (await sha256Hex(token)) === (await sha256Hex(expected));
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (LEGACY_ACCOMMODATION_PATHS.has(pathname)) {
    const destination = request.nextUrl.clone();
    destination.pathname = '/properties';

    return NextResponse.redirect(destination, 301);
  }

  const isAdminPath = pathname === '/admin' || pathname.startsWith('/admin/');
  const isLoginPath = pathname === '/admin/login' || pathname.startsWith('/admin/login/');

  if (isAdminPath && !isLoginPath) {
    const token = request.cookies.get(SESSION_COOKIE_NAME)?.value;

    if (!(await isAdminSessionValid(token))) {
      const destination = request.nextUrl.clone();
      destination.pathname = '/admin/login';
      destination.search = '';

      return NextResponse.redirect(destination);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/rentals',
    '/rentals/:path*',
    '/short-term-rentals',
    '/short-term-rentals/:path*',
    '/admin',
    '/admin/:path*',
  ],
};
