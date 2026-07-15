"use client";

import { useState } from "react";

// Renders "try this" preset buttons above a calculator. Each preset fills the
// tool's real inputs and lets the tool compute the result live, so a sample
// case can never show a wrong hard-coded number.
export type SampleCase = { label: string; onSelect: () => void };

export default function SampleCases({
	cases,
	title = "Try a sample case:",
}: {
	cases: SampleCase[];
	title?: string;
}) {
	// ponytail: highlights last-clicked chip; does NOT clear when the user edits
	// inputs by hand, so it can show a stale "active" chip. Fine as a signifier.
	// Upgrade to derived-from-form matching if that staleness ever confuses.
	const [active, setActive] = useState<string | null>(null);
	return (
		<div style={{ margin: "0 0 20px" }}>
			<p
				style={{
					fontSize: "14px",
					color: "var(--text-secondary)",
					marginBottom: "8px",
				}}
			>
				{title}
			</p>
			<div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
				{cases.map((c) => (
					<button
						key={c.label}
						type="button"
						aria-pressed={active === c.label}
						onClick={() => {
							setActive(c.label);
							c.onSelect();
						}}
						style={{
							fontSize: "14px",
							fontWeight: active === c.label ? 600 : 500,
							color: active === c.label ? "#fff" : "var(--primary)",
							background:
								active === c.label
									? "var(--primary)"
									: "rgba(13, 71, 161, 0.06)",
							border: "1px solid var(--primary)",
							borderRadius: "999px",
							padding: "6px 14px",
							cursor: "pointer",
						}}
					>
						{c.label}
					</button>
				))}
			</div>
		</div>
	);
}
