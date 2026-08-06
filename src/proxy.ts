import { type NextRequest, NextResponse } from "next/server";
import createMiddleware from "next-intl/middleware";

const handleI18nRouting = createMiddleware({
	// A list of all locales that are supported
	locales: ["en", "tl", "ceb"],

	// Used when no locale matches
	defaultLocale: "en",
	alternateLinks: false,

	// Deterministic "/" -> "/en" for every visitor, so the redirect below can
	// safely be permanent.
	localeDetection: false,
});

export function proxy(request: NextRequest) {
	let response = handleI18nRouting(request);

	// Google ignores canonical signals across temporary redirects, which left
	// bare phtools.me/ as the Google-selected canonical instead of /en.
	const location = response.headers.get("location");
	if (response.status === 307 && location) {
		response = NextResponse.redirect(new URL(location, request.url), 308);
	}

	// ponytail: the UI is localized, the long-form guides are not. Keep those
	// copies usable but out of the index until their articles are translated.
	if (/^\/(tl|ceb)(?:\/|$)/.test(request.nextUrl.pathname)) {
		response.headers.set("X-Robots-Tag", "noindex, follow");
	}

	// The *.vercel.app deployment serves a full duplicate of production; keep
	// every page on it out of the index.
	if (request.nextUrl.hostname.endsWith(".vercel.app")) {
		response.headers.set("X-Robots-Tag", "noindex, follow");
	}

	return response;
}

export const config = {
	// Match only internationalized pathnames
	// Ignore static files, api routes, Next.js internal files
	matcher: ["/", "/(tl|en|ceb)/:path*", "/((?!api|_next|_vercel|.*\\..*).*)"],
};
