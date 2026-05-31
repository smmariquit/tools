"use client";

import React from "react";

interface TipCardProps {
	title: string;
	description?: string;
	icon?: string;
	type?: "info" | "warning" | "success";
	style?: React.CSSProperties;
	children?: React.ReactNode;
}

export default function TipCard({
	title,
	description,
	icon = "💡",
	type = "info",
	style,
	children,
}: TipCardProps) {
	const getBorderColor = () => {
		if (type === "warning") return "#ff9800";
		if (type === "success") return "#4caf50";
		return "var(--primary)";
	};

	return (
		<div
			style={{
				padding: "16px",
				backgroundColor: "var(--bg-color)",
				borderRadius: "var(--border-radius)",
				border: "1px solid var(--border-color)",
				borderLeft: `4px solid ${getBorderColor()}`,
				marginTop: "20px",
				...style,
			}}
		>
			<h3
				style={{
					fontSize: "16px",
					fontWeight: 600,
					marginBottom: "8px",
					color: "var(--text-primary)",
					display: "flex",
					alignItems: "center",
					gap: "8px",
				}}
			>
				<span>{icon}</span>
				{title}
			</h3>
			<p
				style={{
					fontSize: "15px",
					color: "var(--text-secondary)",
					lineHeight: 1.6,
					margin: 0,
				}}
			>
				{children || description}
			</p>
		</div>
	);
}
