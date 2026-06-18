import type { CSSProperties } from "react";

type Props = {
	/** Rendered width in px. */
	width?: number;
	style?: CSSProperties;
};

/**
 * Hand-drawn squiggle underline accent. Sits under a heading/keyword.
 * Decorative only; uses --primary so it re-themes.
 */
export default function Squiggle({ width = 150, style }: Props) {
	return (
		<svg
			aria-hidden="true"
			viewBox="0 0 120 16"
			width={width}
			height={(16 / 120) * width}
			preserveAspectRatio="none"
			style={{ display: "block", color: "var(--primary)", ...style }}
			fill="none"
			stroke="currentColor"
			strokeWidth={3}
			strokeLinecap="round"
		>
			<path d="M3 11c20-7 48-8 70-4 14 2 30 4 44-1" />
		</svg>
	);
}
