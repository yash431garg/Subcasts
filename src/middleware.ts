export { default } from 'next-auth/middleware';
// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    '/',
    '/casts',
    '/api/query_blogs/:path*',
    '/api/query_blogs_link/:path*',
    '/subscribers/:id*',
    '/api/query_subscribers/:path*',
  ],
};
