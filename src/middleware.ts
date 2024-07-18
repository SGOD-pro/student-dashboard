import { NextResponse } from 'next/server'
import { NextRequest } from 'next/server'
 
// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  const url = request.nextUrl;
  const path = url.pathname;
  const id=request.cookies.get("id")?.value||""
  if (id && path === '/') {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  // Allow access to / for unauthenticated users
  if (!id && path === '/') {
    return NextResponse.next();
  }

  // Redirect unauthenticated users trying to access private routes
  if (!id && path.startsWith('/dashboard')) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  // Allow access to private routes for authenticated users
  if (id && path.startsWith('/dashboard')) {
    return NextResponse.next();
  }
  return NextResponse.next();

}
 
// See "Matching Paths" below to learn more
export const config = {
  matcher: ['/', '/dashboard/:path*'],
}