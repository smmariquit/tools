"use client";

type ToolLayoutProps = {
	children: React.ReactNode;
	maxWidth?: string;
};

export default function ToolLayout({
	children,
	maxWidth = "800px",
}: ToolLayoutProps) {
	return (
		<div style={{ maxWidth, margin: "0 auto", width: "100%" }}>
			{children}
		</div>
	);
}
