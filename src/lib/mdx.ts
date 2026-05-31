import fs from "fs";
import matter from "gray-matter";
import path from "path";

const rootDirectory = process.cwd();

export interface PostMeta {
	title: string;
	description: string;
	date: string;
	slug: string;
}

export const getPostBySlug = (slug: string) => {
	const realSlug = slug.replace(/\.mdx$/, "");
	const filePath = path.join(
		rootDirectory,
		"src/content/blog",
		`${realSlug}.mdx`,
	);

	const fileContent = fs.readFileSync(filePath, "utf8");
	const { data, content } = matter(fileContent);

	return { meta: { ...data, slug: realSlug } as PostMeta, content };
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
			const { data } = matter(fileContent);

			return { ...data, slug } as PostMeta;
		})
		.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

	return posts;
};
