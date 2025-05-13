import { NextResponse } from 'next/server';

// Simple middleware that checks for the secret admin path
export function middleware(request) {
  // Get the secret path from environment variables
  const secretPath = process.env.ADMIN_SECRET_PATH || 'secret-mandrill-admin-dashboard';

  // Check if the URL contains the secret path
  if (request.nextUrl.pathname.includes(`/${secretPath}`)) {
    // Extract the part after the secret path
    const adminPath = request.nextUrl.pathname.split(`/${secretPath}`)[1] || '/';

    // Create a response that redirects to the admin page
    const response = NextResponse.rewrite(new URL(`/admin${adminPath}`, request.url));

    // Set admin session cookie
    response.cookies.set('admin_session', 'true', {
      httpOnly: true,
      sameSite: 'strict',
      maxAge: 60 * 60 * 24 // 24 hours
    });

    return response;
  }

  // Check for admin session cookie to allow navigation within admin pages
  const hasAdminSession = request.cookies.has('admin_session');

  // Block direct access to /admin routes unless there's an admin session
  if (request.nextUrl.pathname.startsWith('/admin') && !hasAdminSession) {

    // Redirect to home page if someone tries to access admin directly without session
    return NextResponse.redirect(new URL('/', request.url));
  }

  // Allow all other requests to proceed
  return NextResponse.next();
}

// Export middleware config
export const config = {
  matcher: ['/admin/:path*', `/${process.env.ADMIN_SECRET_PATH || 'secret-mandrill-admin-dashboard'}/:path*`],
};
