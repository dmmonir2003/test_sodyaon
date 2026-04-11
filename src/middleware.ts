import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Check if user is authenticated by looking for auth_token cookie
  const authToken = request.cookies.get('auth_token')?.value;

  // If no auth token is found, redirect to login page
  if (!authToken) {
    const loginUrl = new URL('/login', request.url);
    // Optional: add ?callbackUrl parameter to redirect back after login
    // loginUrl.searchParams.set('callbackUrl', request.nextUrl.pathname);
    return NextResponse.redirect(loginUrl);
  }

  // If authenticated, allow the request to proceed
  return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    /*
     * Match all request paths for AI Tools and User Profile
     */
    '/ai-tools/:path*',
    '/profile/:path*',
  ],
};
