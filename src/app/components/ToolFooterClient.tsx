"use client";

import { usePathname } from "next/navigation";
import { toolKeyFromPathname } from "../../lib/routes";
import ToolFooter from "./ToolFooter";

export default function ToolFooterClient() {
	const currentPath = toolKeyFromPathname(usePathname());

	return <ToolFooter currentPath={currentPath} />;
}
