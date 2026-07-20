import { MDXRemote } from "next-mdx-remote/rsc";
import type React from "react";
import remarkGfm from "remark-gfm";
import { articleCanonicalTool } from "../../../../lib/articleCanonicals";
import {
	AUTHOR_URL,
	getAllPostsMeta,
	getPostBySlug,
	type PostMeta,
} from "../../../../lib/mdx";
import BackButton from "../../../components/BackButton";
import WavyDivider from "../../../components/doodle/WavyDivider";
import MdxChart from "../../../components/mdx/MdxChart";
import RegionalNote from "../../../components/mdx/RegionalNote";
import { mdxTableComponents } from "../../../components/mdx/tableComponents";
import YouTube from "../../../components/mdx/YouTube";
import ToolEmbed from "../../../components/ToolEmbed";
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
	const toolPath = articleCanonicalTool[resolvedParams.slug];
	return {
		title: `${meta.title} | PHTools Blog`,
		description: meta.description,
		alternates: {
			canonical: `/en${toolPath ?? `/blog/${resolvedParams.slug}`}`,
		},
		openGraph: {
			images: [
				{
					url: `/api/og?type=blog&title=${encodeURIComponent(
						meta.title,
					)}&desc=${encodeURIComponent(meta.description)}`,
					width: 1200,
					height: 630,
				},
			],
		},
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
		timeRequired: `PT${meta.readingMinutes}M`,
		author: {
			"@type": "Person",
			name: meta.author,
			url: AUTHOR_URL,
		},
		publisher: {
			"@type": "Organization",
			name: "PHTools",
		},
	};

	// We can pass custom components to MDX here (like AdBanner)
	const components = {
		AdBanner: (props: React.ComponentProps<typeof AdBanner>) => (
			<AdBanner {...props} />
		),
		ToolEmbed: (props: React.ComponentProps<typeof ToolEmbed>) => (
			<ToolEmbed {...props} />
		),
		MdxChart: (props: React.ComponentProps<typeof MdxChart>) => (
			<MdxChart {...props} />
		),
		YouTube: (props: React.ComponentProps<typeof YouTube>) => (
			<YouTube {...props} />
		),
		RegionalNote: (props: React.ComponentProps<typeof RegionalNote>) => (
			<RegionalNote {...props} />
		),
		img: (props: React.ImgHTMLAttributes<HTMLImageElement>) => (
			// biome-ignore lint/a11y/useAltText: alt is forwarded from markdown source
			// biome-ignore lint/performance/noImgElement: markdown image with arbitrary src; next/image needs known dimensions/domains
			<img
				{...props}
				style={{
					maxWidth: "100%",
					height: "auto",
					borderRadius: "8px",
					border: "1px solid var(--border-color)",
					display: "block",
					margin: "0 auto 8px",
				}}
			/>
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
		...mdxTableComponents,
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
				<BackButton fallbackHref="/blog" style={{ marginBottom: "24px" }}>
					Back to Blog
				</BackButton>

				<header style={{ marginBottom: "16px", paddingBottom: "8px" }}>
					<span className="eyebrow">from the notebook ✦</span>
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
					<p
						style={{
							color: "var(--text-secondary)",
							fontSize: "14px",
							marginBottom: "6px",
						}}
					>
						By{" "}
						<a
							href={AUTHOR_URL}
							target="_blank"
							rel="author noopener noreferrer"
							style={{ color: "var(--primary)", textDecoration: "none" }}
						>
							{meta.author}
						</a>
					</p>
					<p style={{ color: "var(--text-secondary)", fontSize: "14px" }}>
						<strong>Published:</strong>{" "}
						{new Date(meta.date).toLocaleDateString("en-US", {
							year: "numeric",
							month: "long",
							day: "numeric",
						})}
						{" • "}
						<strong>Last Updated:</strong>{" "}
						{new Date(meta.updatedAt || meta.date).toLocaleDateString("en-US", {
							year: "numeric",
							month: "long",
							day: "numeric",
						})}
						{" • "}
						{meta.readingMinutes} min read
					</p>
				</header>

				<div style={{ marginBottom: "32px" }}>
					<WavyDivider />
				</div>

				<article style={{ fontSize: "16px" }}>
					<MDXRemote
						source={content}
						components={components}
						options={{ mdxOptions: { remarkPlugins: [remarkGfm] } }}
					/>
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
