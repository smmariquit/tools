import type { MetadataRoute } from "next";
import { getAllPostsMeta } from "../lib/mdx";
import { toolCategories } from "../lib/routes";

export default function sitemap(): MetadataRoute.Sitemap {
	const baseUrl = "https://www.phtools.me";
	const staticPages = [
		{ path: "", priority: 1.0 },
		{ path: "/blog", priority: 0.8 },
		{ path: "/about", priority: 0.5 },
		{ path: "/contact", priority: 0.5 },
		{ path: "/editorial-policy", priority: 0.5 },
		{ path: "/faq", priority: 0.5 },
		{ path: "/accessibility", priority: 0.3 },
		{ path: "/privacy-policy", priority: 0.3 },
		{ path: "/terms-of-use", priority: 0.3 },
	];

	return [
		...staticPages.map((page) => ({
			url: `${baseUrl}/en${page.path}`,
			changeFrequency: "monthly" as const,
			priority: page.priority,
		})),
		...toolCategories.flatMap((category) =>
			category.items.map((tool) => ({
				url: `${baseUrl}/en${tool.path}`,
				changeFrequency: "monthly" as const,
				priority: tool.priority,
			})),
		),
		...getAllPostsMeta().map((post) => ({
			url: `${baseUrl}/en/blog/${post.slug}`,
			lastModified: new Date(post.updatedAt || post.date),
			changeFrequency: "yearly" as const,
			priority: 0.7,
		})),
	];
}
