import { NextResponse } from 'next/server';

// Very simple middleware that just checks for a cookie
export function middleware(request) {
  // Only protect admin routes (excluding login)
  if (
    request.nextUrl.pathname.startsWith('/admin') &&
    !request.nextUrl.pathname.startsWith('/admin/login')
  ) {
    // Check for any auth cookie
    const authCookie = request.cookies.get('next-auth.session-token') ||
                      request.cookies.get('__Secure-next-auth.session-token');

    // If no cookie, redirect to login
    if (!authCookie) {
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }
  }

  // Allow the request to proceed
  return NextResponse.next();
}

// Export middleware config
export const config = {
  matcher: ['/admin/:path*'],
};
