export { default } from 'next-auth/middleware';
// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    '/',
    '/casts',
    '/api/query_blogs/:path*',
    '/api/query_blogs_link/:path*',
    // '/api/subscribe/:path*',
    // '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};
