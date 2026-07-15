import type { NextRequest } from "next/server";
import createMiddleware from "next-intl/middleware";

const handleI18nRouting = createMiddleware({
	// A list of all locales that are supported
	locales: ["en", "tl", "ceb"],

	// Used when no locale matches
	defaultLocale: "en",
	alternateLinks: false,
});

export function proxy(request: NextRequest) {
	const response = handleI18nRouting(request);

	// ponytail: the UI is localized, the long-form guides are not. Keep those
	// copies usable but out of the index until their articles are translated.
	if (/^\/(tl|ceb)(?:\/|$)/.test(request.nextUrl.pathname)) {
		response.headers.set("X-Robots-Tag", "noindex, follow");
	}

	return response;
}

export const config = {
	// Match only internationalized pathnames
	// Ignore static files, api routes, Next.js internal files
	matcher: ["/", "/(tl|en|ceb)/:path*", "/((?!api|_next|_vercel|.*\\..*).*)"],
};
