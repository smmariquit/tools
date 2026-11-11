"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import type { PostMeta } from "../../../lib/mdx";
import Pagination from "../components/Pagination";

const POSTS_PER_PAGE = 6;

export default function PostList({
	posts: allPosts,
	page,
}: {
	posts: PostMeta[];
	page: number;
}) {
	const totalPages = Math.max(1, Math.ceil(allPosts.length / POSTS_PER_PAGE));
	const currentPage = Math.min(Math.max(1, page), totalPages);
	const posts = allPosts.slice(
		(currentPage - 1) * POSTS_PER_PAGE,
		currentPage * POSTS_PER_PAGE,
	);

	return (
		<>
			<div style={{ display: "grid", gap: "24px" }}>
				{posts.map((post: PostMeta) => (
					<Link
						href={`/blog/${post.slug}`}
						key={post.slug}
						style={{ textDecoration: "none" }}
					>
						<div className="card tool-card" style={{ cursor: "pointer" }}>
							<div
								style={{
									display: "flex",
									justifyContent: "space-between",
									alignItems: "flex-start",
									gap: "16px",
									marginBottom: "12px",
								}}
							>
								<h2
									style={{
										fontSize: "20px",
										color: "var(--primary)",
										margin: 0,
									}}
								>
									{post.title}
								</h2>
								<span
									style={{
										fontSize: "14px",
										color: "var(--text-secondary)",
										whiteSpace: "nowrap",
									}}
								>
									{post.updatedAt && post.updatedAt !== post.date
										? "Updated "
										: ""}
									{new Date(post.updatedAt || post.date).toLocaleDateString(
										"en-US",
										{ year: "numeric", month: "long", day: "numeric" },
									)}
									{" • "}
									{post.readingMinutes} min read
								</span>
							</div>
							<p
								style={{
									margin: "0 0 8px 0",
									fontSize: "14px",
									color: "var(--text-secondary)",
								}}
							>
								By {post.author}
							</p>
							<p
								style={{
									margin: 0,
									color: "var(--text-primary)",
									lineHeight: "1.6",
								}}
							>
								{post.description}
							</p>
						</div>
					</Link>
				))}

				{posts.length === 0 && (
					<div
						style={{
							padding: "40px",
							textAlign: "center",
							backgroundColor: "var(--surface-color)",
							borderRadius: "var(--border-radius-lg)",
							border: "1px dashed var(--border-color)",
						}}
					>
						<p style={{ color: "var(--text-secondary)" }}>
							No blog posts found. Create a .mdx file in src/content/blog to get
							started.
						</p>
					</div>
				)}
			</div>

			<Pagination
				currentPage={currentPage}
				totalPages={totalPages}
				baseHref="/blog"
			/>
		</>
	);
}

export function PagedPostList({ posts }: { posts: PostMeta[] }) {
	const page = Number(useSearchParams().get("page")) || 1;
	return <PostList posts={posts} page={page} />;
}
