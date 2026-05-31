import Link from "next/link";
import { MDXRemote } from "next-mdx-remote/rsc";
import type React from "react";
import {
	getAllPostsMeta,
	getPostBySlug,
	type PostMeta,
} from "../../../../lib/mdx";
import AdBanner from "../../components/AdBanner";

// Generate static params for all posts so they render instantly at build time
export async function generateStaticParams() {
	const posts = getAllPostsMeta();
	return posts.map((post: PostMeta) => ({ slug: post.slug }));
}

// Generate dynamic SEO metadata based on the markdown frontmatter
export async function generateMetadata({
	params,
}: {
	params: Promise<{ slug: string }>;
}) {
	const resolvedParams = await params;
	const { meta } = getPostBySlug(resolvedParams.slug);
	return {
		title: `${meta.title} | PHTools Blog`,
		description: meta.description,
	};
}

export default async function BlogPost({
	params,
}: {
	params: Promise<{ slug: string }>;
}) {
	const resolvedParams = await params;
	const { meta, content } = getPostBySlug(resolvedParams.slug);

	const jsonLd = {
		"@context": "https://schema.org",
		"@type": "Article",
		headline: meta.title,
		description: meta.description,
		datePublished: meta.date,
		author: {
			"@type": "Organization",
			name: "PHTools",
		},
	};

	// We can pass custom components to MDX here (like AdBanner)
	const components = {
		AdBanner: (props: React.ComponentProps<typeof AdBanner>) => (
			<AdBanner {...props} />
		),
		h2: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
			<h2
				style={{
					fontSize: "24px",
					color: "var(--primary)",
					marginTop: "32px",
					marginBottom: "16px",
				}}
				{...props}
			/>
		),
		h3: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
			<h3
				style={{ fontSize: "20px", marginTop: "24px", marginBottom: "12px" }}
				{...props}
			/>
		),
		p: (props: React.HTMLAttributes<HTMLParagraphElement>) => (
			<p
				style={{
					lineHeight: "1.7",
					marginBottom: "16px",
					color: "var(--text-primary)",
				}}
				{...props}
			/>
		),
		ul: (props: React.HTMLAttributes<HTMLUListElement>) => (
			<ul
				style={{ paddingLeft: "24px", marginBottom: "16px", lineHeight: "1.7" }}
				{...props}
			/>
		),
		li: (props: React.HTMLAttributes<HTMLLIElement>) => (
			<li style={{ marginBottom: "8px" }} {...props} />
		),
		a: (props: React.AnchorHTMLAttributes<HTMLAnchorElement>) => (
			<a
				style={{ color: "var(--primary)", textDecoration: "underline" }}
				{...props}
			/>
		),
	};

	return (
		<>
			<script
				type="application/ld+json"
				dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
			/>
			<div
				style={{ maxWidth: "700px", margin: "0 auto", paddingBottom: "60px" }}
			>
				<Link
					href="/blog"
					style={{
						fontSize: "14px",
						display: "inline-block",
						marginBottom: "24px",
					}}
				>
					&larr; Back to Blog
				</Link>

				<header
					style={{
						marginBottom: "40px",
						borderBottom: "1px solid var(--border-color)",
						paddingBottom: "24px",
					}}
				>
					<h1
						style={{
							fontSize: "36px",
							fontWeight: 800,
							marginBottom: "16px",
							color: "var(--text-primary)",
							lineHeight: 1.2,
						}}
					>
						{meta.title}
					</h1>
					<p style={{ color: "var(--text-secondary)", fontSize: "14px" }}>
						Published on{" "}
						{new Date(meta.date).toLocaleDateString("en-US", {
							year: "numeric",
							month: "long",
							day: "numeric",
						})}
					</p>
				</header>

				<article style={{ fontSize: "16px" }}>
					<MDXRemote source={content} components={components} />
				</article>

				<div
					style={{
						marginTop: "48px",
						paddingTop: "24px",
						borderTop: "1px solid var(--border-color)",
					}}
				>
					<AdBanner dataAdSlot="blog-footer-slot" />
				</div>
			</div>
		</>
	);
}
