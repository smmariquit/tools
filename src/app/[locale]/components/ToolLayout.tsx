"use client";

type ToolLayoutProps = {
	children: React.ReactNode;
};

export default function ToolLayout({ children }: ToolLayoutProps) {
	return (
		<div style={{ maxWidth: "1200px", margin: "0 auto", width: "100%" }}>
			{children}
		</div>
	);
}
