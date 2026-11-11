import { setRequestLocale } from "next-intl/server";
import { Suspense } from "react";
import { getAllPostsMeta } from "../../../lib/mdx";
import PostList, { PagedPostList } from "./PostList";

export const metadata = {
	title: "PHTools Blog | Financial Guides & Tax Tips for Filipinos",
	description:
		"Read the latest guides on how to calculate your 13th month pay, SSS contributions, and navigate Philippine tax laws.",
};

export default async function BlogIndex({
	params,
}: {
	params: Promise<{ locale: string }>;
}) {
	setRequestLocale((await params).locale);
	const allPosts = getAllPostsMeta();

	return (
		<div style={{ maxWidth: "800px", margin: "0 auto", paddingBottom: "40px" }}>
			<div style={{ marginBottom: "40px" }}>
				<h1 className="page-title">The PHTools Blog</h1>
				<p className="page-subtitle">
					Clear, well-researched guides on Philippine taxes, mandatory
					contributions, and payroll rules.
				</p>
			</div>

			{/* Static HTML renders page 1; ?page=N swaps in client-side. */}
			<Suspense fallback={<PostList posts={allPosts} page={1} />}>
				<PagedPostList posts={allPosts} />
			</Suspense>
		</div>
	);
}
