/**
 * @file proxy.ts
 * @description Core network boundary for SIG FMS with full diagnostic logging.
 */

import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl
  const cookie = request.headers.get('cookie') || ''
  const authServer = process.env.AUTH_SERVER_URL

  console.log(`[PROXY-LOG] Incoming Request: ${pathname}`);

  // 1. Initial Bypass Check
  if (pathname === '/auth-unavailable') {
    console.log(`[PROXY-LOG] Bypassing proxy for error page: ${pathname}`);
    return NextResponse.next()
  }

  // Configuration Check
  if (!authServer) {
    console.error("[PROXY-ERROR] Configuration Missing: AUTH_SERVER_URL is not defined.");
    return NextResponse.rewrite(new URL('/auth-unavailable', request.url))
  }

  try {
    console.log(`[PROXY-LOG] Verifying heartbeat with Auth Server: ${authServer}/api/auth/get-session`);
    
    // 2. The Heartbeat Check
    const response = await fetch(`${authServer}/api/auth/get-session`, {
      headers: { cookie },
      cache: 'no-store',
      signal: AbortSignal.timeout(3000) 
    })

    console.log(`[PROXY-LOG] Auth Server Status Code: ${response.status}`);
    
    const session = await response.json()
    console.log(`[PROXY-LOG] Session Data received:`, session);

    const isAuthenticated = session && response.status === 200
    console.log(`[PROXY-LOG] Authentication Verified: ${isAuthenticated}`);

    // 3. Login Page Logic
    if (pathname === '/login') {
      if (isAuthenticated) {
        console.log(`[PROXY-LOG] User already logged in. Redirecting /login -> /assets`);
        return NextResponse.redirect(new URL('/assets', request.url))
      }
      console.log(`[PROXY-LOG] Server is UP. Allowing access to /login`);
      return NextResponse.next()
    }

    // 4. Protected Route Logic
    if (!isAuthenticated && pathname.startsWith('/assets')) {
      console.log(`[PROXY-LOG] Access Denied for ${pathname}. Redirecting to /login`);
      return NextResponse.redirect(new URL('/login', request.url))
    }

    // 5. Root URL Handling
    if (pathname === '/') {
      const destination = isAuthenticated ? '/assets' : '/login';
      console.log(`[PROXY-LOG] Root access. Routing user to: ${destination}`);
      return NextResponse.redirect(new URL(destination, request.url))
    }

    console.log(`[PROXY-LOG] No specific rule matched for ${pathname}. Proceeding...`);

  } catch (error) {
    // 6. Total Lockdown on Error
    console.error("[PROXY-CRITICAL] Auth Server Unreachable or Timeout. Executing Lockdown.");
    console.error(`[PROXY-DEBUG] Error Details: ${error instanceof Error ? error.message : String(error)}`);
    
    return NextResponse.rewrite(new URL('/auth-unavailable', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}