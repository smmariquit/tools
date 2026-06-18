"use client";

import { useRouter } from "next/navigation";
import type { CSSProperties, ReactNode } from "react";

type Props = {
	/** Where to go if there's no history to go back to (e.g. direct landing). */
	fallbackHref?: string;
	children: ReactNode;
	style?: CSSProperties;
};

/**
 * Pops browser history when possible, otherwise navigates to a fallback so a
 * direct landing still has somewhere to go.
 */
export default function BackButton({
	fallbackHref = "/",
	children,
	style,
}: Props) {
	const router = useRouter();

	const handleClick = () => {
		if (window.history.length > 1) {
			router.back();
		} else {
			router.push(fallbackHref);
		}
	};

	return (
		<button
			type="button"
			onClick={handleClick}
			className="back-button"
			style={style}
		>
			<span aria-hidden="true">&larr;</span> {children}
		</button>
	);
}
