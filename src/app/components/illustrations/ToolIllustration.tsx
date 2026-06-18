"use client";

import { usePathname } from "next/navigation";
import { useId } from "react";
import { toolKeyFromPathname } from "../../../lib/routes";
import { doodles } from "./doodles";

type Props = {
	/** Tool path key (e.g. "/salary-calculator"). Defaults to the current route. */
	name?: string;
	/** Rendered width in px. Height follows the 300x190 ratio. */
	width?: number;
};

export default function ToolIllustration({ name, width = 118 }: Props) {
	const pathname = usePathname();
	const rawId = useId();
	const filterId = `wob-${rawId.replace(/[^a-zA-Z0-9]/g, "")}`;

	const key = name ?? toolKeyFromPathname(pathname);
	const doodle = doodles[key];
	if (!doodle) return null;

	const height = Math.round((width * 190) / 300);

	return (
		<div
			aria-hidden="true"
			style={{
				display: "flex",
				justifyContent: "flex-start",
				marginBottom: "4px",
				color: "var(--primary)",
			}}
		>
			<svg
				viewBox="0 0 300 190"
				width={width}
				height={height}
				style={{ maxWidth: "100%", height: "auto", overflow: "visible" }}
				role="img"
			>
				<defs>
					<filter id={filterId} x="-16%" y="-16%" width="132%" height="132%">
						<feTurbulence
							type="fractalNoise"
							baseFrequency="0.026"
							numOctaves={3}
							seed={7}
							result="n"
						/>
						<feDisplacementMap
							in="SourceGraphic"
							in2="n"
							scale={7.2}
							xChannelSelector="R"
							yChannelSelector="G"
						/>
					</filter>
				</defs>
				<g
					filter={`url(#${filterId})`}
					transform="rotate(-1.6 150 95)"
					fill="none"
					stroke="currentColor"
					strokeWidth={5.4}
					strokeLinecap="round"
					strokeLinejoin="round"
				>
					{doodle}
				</g>
			</svg>
		</div>
	);
}
