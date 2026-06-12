"use client";
import { usePathname } from "next/navigation";
import ToolFooter from "../../components/ToolFooter";

type ToolLayoutProps = {
	children: React.ReactNode;
	maxWidth?: string;
};

export default function ToolLayout({ children, maxWidth = "800px" }: ToolLayoutProps) {
	const pathname = usePathname();
	const currentPath = pathname ? pathname.replace(/^\/[a-z]{2}/, "") : "";

	return (
		<div style={{ maxWidth, margin: "0 auto", width: "100%" }}>
			{children}
			<ToolFooter currentPath={currentPath} />
		</div>
	);
}
