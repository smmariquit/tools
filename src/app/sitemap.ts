import type { MetadataRoute } from "next";
import { toolCategories } from "../lib/routes";

export default function sitemap(): MetadataRoute.Sitemap {
	const baseUrl = "https://www.phtools.me";
	const locales = ["en", "tl", "ceb"];

	const sitemapEntries: MetadataRoute.Sitemap = [];

	// 1. Add static pages for each locale
	const staticPages = [
		{ path: "", priority: 1.0 },
		{ path: "/blog", priority: 0.8 },
		{ path: "/about", priority: 0.5 },
		{ path: "/contact", priority: 0.5 },
		{ path: "/privacy-policy", priority: 0.3 },
		{ path: "/terms-of-use", priority: 0.3 },
	];

	locales.forEach((locale) => {
		staticPages.forEach((page) => {
			sitemapEntries.push({
				url: `${baseUrl}/${locale}${page.path}`,
				lastModified: new Date(),
				changeFrequency: "weekly",
				priority: page.priority,
				alternates: {
					languages: {
						en: `${baseUrl}/en${page.path}`,
						tl: `${baseUrl}/tl${page.path}`,
						ceb: `${baseUrl}/ceb${page.path}`,
					} as Record<string, string>,
				},
			});
		});
	});

	// 2. Add all dynamically fetched tools for each locale
	locales.forEach((locale) => {
		toolCategories.forEach((category) => {
			category.items.forEach((tool) => {
				sitemapEntries.push({
					url: `${baseUrl}/${locale}${tool.path}`,
					lastModified: new Date(),
					changeFrequency: "monthly",
					priority: tool.priority,
					alternates: {
						languages: {
							en: `${baseUrl}/en${tool.path}`,
							tl: `${baseUrl}/tl${tool.path}`,
							ceb: `${baseUrl}/ceb${tool.path}`,
						} as Record<string, string>,
					},
				});
			});
		});
	});

	return sitemapEntries;
}
