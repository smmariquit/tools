"use client";

import React from "react";

export interface LegendItem {
	name: string;
	value: number;
	color: string;
}

interface PremiumLegendProps {
	items: LegendItem[];
	total: number;
	formatValue: (val: number) => string;
}

export default function PremiumLegend({
	items,
	total,
	formatValue,
}: PremiumLegendProps) {
	const safeTotal = total || 1;

	return (
		<div
			style={{
				display: "flex",
				flexWrap: "wrap",
				gap: "12px",
				justifyContent: "center",
				marginTop: "16px",
				padding: "16px",
				backgroundColor: "var(--bg-color)",
				border: "1px solid var(--border-color)",
				borderRadius: "var(--border-radius)",
			}}
		>
			{items.map((item, idx) => (
				<div
					key={idx}
					style={{
						display: "flex",
						alignItems: "center",
						gap: "8px",
						fontSize: "13px",
					}}
				>
					<span
						style={{
							display: "inline-block",
							width: "10px",
							height: "10px",
							borderRadius: "50%",
							backgroundColor: item.color,
							flexShrink: 0,
						}}
					/>
					<span style={{ color: "var(--text-secondary)" }}>
						{item.name}:{" "}
						<strong style={{ color: "var(--text-primary)" }}>
							{formatValue(item.value)} (
							{((item.value / safeTotal) * 100).toFixed(1)}%)
						</strong>
					</span>
				</div>
			))}
		</div>
	);
}
