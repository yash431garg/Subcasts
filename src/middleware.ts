import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getSession, login, logout } from '@/lib';

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  // console.log(path);
  const isPublicPath = path === '/login' || path === '/signup';

  const session = await getSession();
  // console.log(session, isPublicPath);

  // if (isPublicPath && session) {
  //   return NextResponse.redirect(new URL('/', request.nextUrl));
  // }

  if (!isPublicPath && !session) {
    return NextResponse.redirect(new URL('/login', request.nextUrl));
  }
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    '/',
    '/casts',
    '/api/query_blogs/:path*',
    '/api/query_blogs_link/:path*',
    '/api/subscribe/:path*',
    // '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};
