"use client";

import Link from "next/link";

interface PaginationProps {
	currentPage: number;
	totalPages: number;
	/** Button mode (client lists). */
	onPageChange?: (page: number) => void;
	/** Link mode (server lists): builds `${baseHref}?page=N`. */
	baseHref?: string;
	prevLabel?: string;
	nextLabel?: string;
	ariaLabel?: string;
}

/** Builds a windowed page list, e.g. [1, "…", 4, 5, 6, "…", 12]. */
function pageItems(current: number, total: number): (number | "…")[] {
	if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);
	const items: (number | "…")[] = [1];
	const start = Math.max(2, current - 1);
	const end = Math.min(total - 1, current + 1);
	if (start > 2) items.push("…");
	for (let p = start; p <= end; p++) items.push(p);
	if (end < total - 1) items.push("…");
	items.push(total);
	return items;
}

export default function Pagination({
	currentPage,
	totalPages,
	onPageChange,
	baseHref,
	prevLabel = "Previous",
	nextLabel = "Next",
	ariaLabel = "Pagination",
}: PaginationProps) {
	if (totalPages <= 1) return null;

	const hrefFor = (p: number) =>
		p <= 1 ? (baseHref ?? "#") : `${baseHref}?page=${p}`;

	const btnStyle = (
		active: boolean,
		disabled = false,
	): React.CSSProperties => ({
		minWidth: "40px",
		height: "40px",
		padding: "0 12px",
		display: "inline-flex",
		alignItems: "center",
		justifyContent: "center",
		borderRadius: "8px",
		border: "1px solid var(--border-color)",
		background: active ? "var(--primary)" : "var(--surface-color)",
		color: active ? "#fff" : "var(--text-primary)",
		fontSize: "14px",
		fontWeight: active ? 700 : 500,
		textDecoration: "none",
		cursor: disabled ? "not-allowed" : "pointer",
		opacity: disabled ? 0.5 : 1,
	});

	const renderCell = (
		key: string,
		label: React.ReactNode,
		page: number,
		opts: { active?: boolean; disabled?: boolean; rel?: string } = {},
	) => {
		const { active = false, disabled = false, rel } = opts;
		if (disabled) {
			return (
				<span key={key} style={btnStyle(active, true)} aria-disabled="true">
					{label}
				</span>
			);
		}
		if (baseHref) {
			return (
				<Link
					key={key}
					href={hrefFor(page)}
					rel={rel}
					aria-current={active ? "page" : undefined}
					style={btnStyle(active)}
				>
					{label}
				</Link>
			);
		}
		return (
			<button
				key={key}
				type="button"
				onClick={() => onPageChange?.(page)}
				aria-current={active ? "page" : undefined}
				style={btnStyle(active)}
			>
				{label}
			</button>
		);
	};

	return (
		<nav
			aria-label={ariaLabel}
			style={{
				display: "flex",
				flexWrap: "wrap",
				gap: "8px",
				justifyContent: "center",
				alignItems: "center",
				marginTop: "32px",
			}}
		>
			{renderCell("prev", prevLabel, currentPage - 1, {
				disabled: currentPage <= 1,
				rel: "prev",
			})}
			{pageItems(currentPage, totalPages).map((it, i) => {
				if (it === "…") {
					return (
						<span
							// biome-ignore lint/suspicious/noArrayIndexKey: static ellipsis markers
							key={`ellipsis-${i}`}
							style={{ color: "var(--text-secondary)", padding: "0 4px" }}
						>
							…
						</span>
					);
				}
				return renderCell(`p-${it}`, it, it, { active: it === currentPage });
			})}
			{renderCell("next", nextLabel, currentPage + 1, {
				disabled: currentPage >= totalPages,
				rel: "next",
			})}
		</nav>
	);
}
