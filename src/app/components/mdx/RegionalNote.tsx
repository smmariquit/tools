import type { ReactNode } from "react";

/**
 * Callout box for sub-national (LGU / regional) legal nuance inside MDX guides.
 * Used to flag where a national rule has a regional/city-level variable so
 * readers don't treat a single national figure as gospel.
 */
export default function RegionalNote({
	title = "Regional context",
	children,
}: {
	title?: string;
	children: ReactNode;
}) {
	return (
		<aside
			style={{
				display: "flex",
				gap: "14px",
				alignItems: "flex-start",
				margin: "24px 0",
				padding: "18px 20px",
				borderRadius: "12px",
				border: "1px solid var(--border-color)",
				borderLeft: "4px solid var(--primary)",
				backgroundColor: "var(--surface-color)",
			}}
		>
			<svg
				width="22"
				height="22"
				viewBox="0 0 24 24"
				fill="none"
				stroke="var(--primary)"
				strokeWidth="2"
				strokeLinecap="round"
				strokeLinejoin="round"
				aria-hidden="true"
				style={{ flexShrink: 0, marginTop: "2px" }}
			>
				<path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0z" />
				<circle cx="12" cy="10" r="3" />
			</svg>
			<div>
				<strong
					style={{
						display: "block",
						color: "var(--primary)",
						fontSize: "14px",
						textTransform: "uppercase",
						letterSpacing: "0.04em",
						marginBottom: "6px",
					}}
				>
					{title}
				</strong>
				<div className="regional-note-body">{children}</div>
			</div>
		</aside>
	);
}
