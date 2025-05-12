import { NextResponse } from 'next/server';
import { auth } from './auth';

export async function middleware(request) {
  const session = await auth();
  
  // Check if the path starts with /admin (excluding /admin/login)
  if (
    request.nextUrl.pathname.startsWith('/admin') &&
    !request.nextUrl.pathname.startsWith('/admin/login')
  ) {
    // If no session, redirect to login
    if (!session) {
      const url = new URL('/admin/login', request.url);
      url.searchParams.set('callbackUrl', request.nextUrl.pathname);
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};
