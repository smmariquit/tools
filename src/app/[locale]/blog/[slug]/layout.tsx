import type { Metadata } from "next";

export function generateMetadata({
	params,
}: {
	params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
	return params.then(({ locale, slug }) => ({
		alternates: { canonical: `/en/blog/${slug}` },
		robots: { index: locale === "en", follow: true },
	}));
}

export default function BlogPostLayout({
	children,
}: Readonly<{ children: React.ReactNode }>) {
	return children;
}
