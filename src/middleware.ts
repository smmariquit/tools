import createMiddleware from 'next-intl/middleware';

export default createMiddleware({
  // A list of all locales that are supported
  locales: ['en', 'tl'],

  // Used when no locale matches
  defaultLocale: 'en'
});

export const config = {
  // Match only internationalized pathnames
  // Ignore static files, api routes, Next.js internal files
  matcher: ['/', '/(tl|en)/:path*', '/((?!api|_next|_vercel|.*\\..*).*)']
};
