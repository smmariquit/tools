import type React from "react";

/**
 * Shared MDX overrides for GFM tables. Used by both the blog post renderer and
 * the per-tool article so styling stays in one place.
 */
export const mdxTableComponents = {
	table: (props: React.TableHTMLAttributes<HTMLTableElement>) => (
		<div style={{ overflowX: "auto", marginBottom: "24px" }}>
			<table
				style={{
					width: "100%",
					borderCollapse: "collapse",
					fontSize: "15px",
					lineHeight: "1.6",
					color: "var(--text-primary)",
				}}
				{...props}
			/>
		</div>
	),
	th: (props: React.ThHTMLAttributes<HTMLTableCellElement>) => (
		<th
			style={{
				textAlign: "left",
				padding: "10px 14px",
				borderBottom: "2px solid var(--border-color)",
				backgroundColor: "var(--surface-color)",
				fontWeight: 700,
				color: "var(--text-primary)",
			}}
			{...props}
		/>
	),
	td: (props: React.TdHTMLAttributes<HTMLTableCellElement>) => (
		<td
			style={{
				padding: "10px 14px",
				borderBottom: "1px solid var(--border-color)",
				verticalAlign: "top",
			}}
			{...props}
		/>
	),
};
