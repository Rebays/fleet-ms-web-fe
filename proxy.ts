import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function proxy(request: NextRequest) {

  console.log(`[PROXY] - Proxy fires at: ${new Date().toISOString()}`);

  // 1. Get the specific session cookie
  const sessionCookie = request.cookies.get('fms.session_token') || ''
  const { pathname } = request.nextUrl;

  const wasLoggedIn = request.cookies.has("fms.last_user");
  const hasCookie = request.cookies.has("fms.session_token");
  
  // public paths
  const isLoginPage = pathname === '/login';
  const isPublicAsset = pathname.startsWith('/_next') || pathname.includes('.');
  
  console.log(`[PROXY] - user was previously logged in: ${wasLoggedIn}`)
  console.log(`[PROXY] - user has cookie: ${hasCookie}`)
  if(wasLoggedIn == true && hasCookie == false && !isLoginPage){
    return NextResponse.redirect(new URL('/login?session=expired', request.url));
    console.log('user does not have cookie, but was previously logged in')
  }
  
  // 2. Logic: If no cookie AND not already on login page, send to login
  if (!sessionCookie && !isLoginPage && !isPublicAsset) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // 4. Logic: If cookie exists AND user is trying to go to /login, 
  // send them to / (or home) instead since they are already auth'd.
  if (sessionCookie && isLoginPage) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  // Otherwise, proceed as normal
  return NextResponse.next();
}

// 4. Use a Matcher to keep your console clean from those .js.map files
export const config = {
  matcher: [
    /*
     * Match all request paths except for:
     * - api routes
     * - static files (_next/static, _next/image)
     * - favicon.ico
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}