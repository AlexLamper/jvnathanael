import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'

const isProtectedRoute = createRouteMatcher(['/dashboard', '/quiz/:path*', '/(api|trpc)(.*)'])
const isPublicRoute = createRouteMatcher(['/', '/about', '/help', '/sign-in(.*)', '/sign-up(.*)'])
const isAdminRoute = createRouteMatcher(['/admin(.*)'])

export default clerkMiddleware(async (auth, req) => {
  // Protect the routes that match the defined protected routes
  if (isProtectedRoute(req)) await auth.protect()

  if (isPublicRoute(req)) {
    return
  }

  if (isAdminRoute(req) && (await auth()).sessionClaims?.metadata?.role !== 'admin') {
    const url = new URL('/', req.url)
    return NextResponse.redirect(url)
  }
})

export const config = {
  matcher: [
    // Public routes
    '/',
    '/about',
    '/help',
    // Protected routes
    '/dashboard',
    '/quiz/:path*', // All quiz pages will be protected
    '/(api|trpc)(.*)', // Protect API routes
    // Skip Next.js internals and static files
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
  ],
};