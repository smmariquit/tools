import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
	const baseUrl = "https://www.phtools.me";

	return {
		rules: {
			userAgent: "*",
			allow: "/",
			disallow: ["/api/", "/_next/"],
		},
		sitemap: `${baseUrl}/sitemap.xml`,
	};
}
