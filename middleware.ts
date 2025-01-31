import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'

const isProtectedRoute = createRouteMatcher(['/dashboard', '/quiz/:path*', '/api/:path*']) // Protect API routes except /api/courses
const isPublicRoute = createRouteMatcher(['/', '/about', '/help', '/sign-in(.*)', '/sign-up(.*)'])
const isAdminRoute = createRouteMatcher(['/admin(.*)'])

export default clerkMiddleware(async (auth, req) => {
  const pathname = req.nextUrl.pathname;

  // Allow public access to /api/courses
  if (pathname.startsWith('/api/courses')) {
    return; // Skip authentication for this specific API route
  }

  // Protect the routes that match the defined protected routes
  if (isProtectedRoute(req)) await auth.protect();

  if (isPublicRoute(req)) {
    return;
  }

  if (isAdminRoute(req) && (await auth()).sessionClaims?.metadata?.role !== 'admin') {
    const url = new URL('/', req.url);
    return NextResponse.redirect(url);
  }
});

export const config = {
  matcher: [
    '/',
    '/about',
    '/help',
    '/dashboard',
    '/quiz/:path*',
    '/api/:path*', // Protect API routes
    '/admin(.*)',
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
  ],
};
