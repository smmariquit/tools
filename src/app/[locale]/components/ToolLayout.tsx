"use client";

type ToolLayoutProps = {
	children: React.ReactNode;
};

export default function ToolLayout({ children }: ToolLayoutProps) {
	return <div style={{ maxWidth: "800px", margin: "0 auto" }}>{children}</div>;
}
