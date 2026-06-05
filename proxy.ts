// proxy.ts (قبلاً middleware.ts بود)
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import jwt from 'jsonwebtoken';

export function proxy(request: NextRequest) {
  const token = request.cookies.get('auth-token')?.value;
  const isAdminRoute = request.nextUrl.pathname.startsWith('/admin');
  const isLoginRoute = request.nextUrl.pathname === '/login';

  let isAdmin = false;
  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret') as any;
      const adminEmail = process.env.ADMIN_EMAIL || 'p.h.h.d.b.a20911911@gmail.com';
      isAdmin = decoded.email === adminEmail || decoded.role === 'admin';
    } catch (e) {}
  }

  if (isAdminRoute && !isAdmin) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  if (isLoginRoute && isAdmin) {
    return NextResponse.redirect(new URL('/admin', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*', '/login'],
};