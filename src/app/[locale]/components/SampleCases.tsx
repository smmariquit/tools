"use client";

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
						onClick={c.onSelect}
						style={{
							fontSize: "14px",
							fontWeight: 500,
							color: "var(--primary)",
							background: "rgba(13, 71, 161, 0.06)",
							border: "1px solid rgba(13, 71, 161, 0.25)",
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
