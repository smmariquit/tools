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
	compiler: {
		removeConsole: process.env.NODE_ENV === "production",
	},
	experimental: {
		optimizePackageImports: ["recharts", "next-intl"],
	},
	async redirects() {
		return [
			{
				source: "/legal-contract-generator",
				destination: "/promissory-note-generator",
				permanent: true,
			},
			{
				source: "/:locale(en|tl|ceb)/legal-contract-generator",
				destination: "/:locale/promissory-note-generator",
				permanent: true,
			},
			{
				source: "/privacy",
				destination: "/en/privacy-policy",
				permanent: false,
			},
			{
				source: "/terms",
				destination: "/en/terms-of-use",
				permanent: false,
			},
			{
				source: "/en/privacy",
				destination: "/en/privacy-policy",
				permanent: false,
			},
			{
				source: "/en/terms",
				destination: "/en/terms-of-use",
				permanent: false,
			},
		];
	},
};

export default withPWAConfig(withNextIntl(nextConfig));
