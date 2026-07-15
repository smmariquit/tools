/**
 * Helpers for building consistent, complete OpenGraph image URLs and metadata.
 *
 * The OG image (`/api/og`) renders: the tool's hand-drawn SVG → tool title +
 * description → the PHTools site strip. Pass `tool` (the slug, e.g.
 * "salary-calculator") so the matching doodle is drawn; omit it for generic
 * pages (blog, legal, etc.) to get the branded wordmark fallback.
 */
import type { Metadata } from "next";

export interface OgImageOptions {
	title: string;
	desc: string;
	/** Tool slug (folder name) whose doodle should be drawn, if any. */
	tool?: string;
}

/** Build the `/api/og` URL. */
export function ogImageUrl({ title, desc, tool }: OgImageOptions): string {
	const params = new URLSearchParams();
	if (tool) params.set("tool", tool.replace(/^\//, ""));
	params.set("title", title);
	params.set("desc", desc);
	return `/api/og?${params.toString()}`;
}

/** Build a ready-to-spread `openGraph.images` array. */
export function ogImages(
	opts: OgImageOptions,
): NonNullable<NonNullable<Metadata["openGraph"]>["images"]> {
	return [{ url: ogImageUrl(opts), width: 1200, height: 630 }];
}
