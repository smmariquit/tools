import withPWA from "@ducanh2912/next-pwa";
import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/i18n.ts");

const withPWAConfig = withPWA({
	dest: "public",
	cacheOnFrontEndNav: true,
	aggressiveFrontEndNavCaching: true,
	reloadOnOnline: true,
	disable: process.env.NODE_ENV === "development",
});

const nextConfig: NextConfig = {
	// Fully static: served as Cloudflare Workers static assets, no server code
	// per page view. Redirects/headers live in public/_redirects + _headers.
	output: "export",
	images: { unoptimized: true },
	compiler: {
		removeConsole: process.env.NODE_ENV === "production",
	},
	experimental: {
		optimizePackageImports: ["recharts", "next-intl"],
	},
	// `next dev` does not read public/_redirects, so mirror its bare-root rule for local
	// runs and the Playwright suite. Static export ignores redirects(), so production
	// keeps relying on _redirects.
	...(process.env.NODE_ENV === "development" && {
		async redirects() {
			return [{ source: "/", destination: "/en", permanent: false }];
		},
	}),
};

export default withPWAConfig(withNextIntl(nextConfig));
