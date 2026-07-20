"use client";

import { usePathname } from "next/navigation";

/**
 * Self-referencing canonical for every route, hoisted into <head> by React.
 * Blog posts are the one exception: a post embedded on a tool page declares
 * that tool page as its canonical via generateMetadata (see
 * articleCanonicals.ts), so this component stays silent there to avoid
 * emitting two competing canonical tags.
 */
export default function Canonical() {
	const pathname = usePathname();
	if (/^\/[a-z]{2,3}\/blog\/./.test(pathname)) return null;
	return <link rel="canonical" href={`https://www.phtools.me${pathname}`} />;
}
