/**
 * @file proxy.ts
 * @description Core network boundary and routing controller for the SIG FMS application.
 * * This file implements the Next.js 16 Proxy convention to handle:
 * 1. Global Session Verification: Intercepts requests to validate user sessions 
 * against the external Auth Server.
 * 2. Route Guarding: Protects sensitive paths (e.g., /assets) by redirecting 
 * unauthenticated users to the login page.
 * 3. Intelligent Redirection: Automatically routes logged-in users from the 
 * root path (/) to the assets dashboard.
 * 4. Resilient Error Handling: If the Auth Server is unreachable, the request 
 * is gracefully rewritten to a branded "Auth Unavailable" page instead of crashing.
 * * @runtime Node.js
 */

import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl
  const cookie = request.headers.get('cookie') || ''
  
  // Strict environment variable assignment
  const authServer = process.env.AUTH_SERVER_URL

  // 1. Prevent infinite loops for public assets/pages
  if (pathname === '/auth-unavailable' || pathname === '/login') {
    return NextResponse.next()
  }

  // Safety Check: If the environment variable is missing, trigger the error state
  if (!authServer) {
    console.error("Configuration Error: AUTH_SERVER_URL is not defined in environment variables.")
    return NextResponse.rewrite(new URL('/auth-unavailable', request.url))
  }

  try {
    const response = await fetch(`${authServer}/api/auth/get-session`, {
      headers: { cookie },
      cache: 'no-store',
      signal: AbortSignal.timeout(3000) 
    })

    const session = await response.json()

    // 2. Auth Logic: Redirect unauthenticated users
    if ((!session || response.status !== 200) && pathname.startsWith('/assets')) {
      return NextResponse.redirect(new URL('/login', request.url))
    }

    // 3. Root Logic: Send authenticated users to dashboard
    if (session && pathname === '/') {
      return NextResponse.redirect(new URL('/assets', request.url))
    }

  } catch (error) {
    console.error("Proxy Auth Fetch Error:", error)
    // 4. Fail-safe: Rewrite to your custom error page
    return NextResponse.rewrite(new URL('/auth-unavailable', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}