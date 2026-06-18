import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import readingTime from "reading-time";

const rootDirectory = process.cwd();

export const DEFAULT_AUTHOR = "Simonee Ezekiel Mariquit";
export const AUTHOR_URL = "https://stimmie.dev";

export interface PostMeta {
	title: string;
	description: string;
	date: string;
	updatedAt?: string;
	slug: string;
	/** Byline author; falls back to the site author. */
	author: string;
	/** Estimated read time in whole minutes (min. 1). */
	readingMinutes: number;
}

/** Estimate reading time from raw markdown, rounded up to whole minutes. */
const estimateReadingMinutes = (content: string): number =>
	Math.max(1, Math.ceil(readingTime(content).minutes));

export const getPostBySlug = (slug: string) => {
	const realSlug = slug.replace(/\.mdx$/, "");
	const filePath = path.join(
		rootDirectory,
		"src/content/blog",
		`${realSlug}.mdx`,
	);

	const fileContent = fs.readFileSync(filePath, "utf8");
	const { data, content } = matter(fileContent);

	return {
		meta: {
			...data,
			slug: realSlug,
			author: (data.author as string | undefined) ?? DEFAULT_AUTHOR,
			readingMinutes: estimateReadingMinutes(content),
		} as PostMeta,
		content,
	};
};

export const getAllPostsMeta = (): PostMeta[] => {
	const postsDirectory = path.join(rootDirectory, "src/content/blog");

	if (!fs.existsSync(postsDirectory)) return [];

	const files = fs.readdirSync(postsDirectory);
	const posts = files
		.filter((fileName) => fileName.endsWith(".mdx"))
		.map((fileName) => {
			const slug = fileName.replace(/\.mdx$/, "");
			const filePath = path.join(postsDirectory, fileName);
			const fileContent = fs.readFileSync(filePath, "utf8");
			const { data, content } = matter(fileContent);

			return {
				...data,
				slug,
				author: (data.author as string | undefined) ?? DEFAULT_AUTHOR,
				readingMinutes: estimateReadingMinutes(content),
			} as PostMeta;
		})
		.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

	return posts;
};
