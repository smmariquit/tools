import type { CSSProperties } from "react";

type Props = {
	/** Flip the wave's phase so stacked dividers don't look identical. */
	flip?: boolean;
	style?: CSSProperties;
};

/**
 * Hand-drawn wavy section divider. Inherits --border-color, re-themes for free.
 * Purely decorative; replaces flat <hr>-style separators.
 */
export default function WavyDivider({ flip, style }: Props) {
	const d = flip
		? "M0 14C90 26 180 26 270 16s180-16 270-6 180 18 270 12 180-16 290-8"
		: "M0 22C90 8 180 8 270 18s180 18 270 8 180-18 270-12 180 16 290 6";
	return (
		<svg
			aria-hidden="true"
			viewBox="0 0 1100 34"
			preserveAspectRatio="none"
			style={{
				display: "block",
				width: "100%",
				height: "26px",
				color: "var(--border-color)",
				...style,
			}}
			fill="none"
			stroke="currentColor"
			strokeWidth={2.5}
			strokeLinecap="round"
		>
			<path d={d} />
		</svg>
	);
}
