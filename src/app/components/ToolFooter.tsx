import Link from "next/link";
import { useTranslations } from "next-intl";
import { toolCategories } from "../../lib/routes";
import ToolIcon from "./ToolIcon";

export default function ToolFooter({ currentPath }: { currentPath: string }) {
	const t = useTranslations("ToolFooter");

	// Find the category of the current tool
	let currentCategory = "";
	for (const cat of toolCategories) {
		if (cat.items.find((item) => item.path === currentPath)) {
			currentCategory = cat.category;
			break;
		}
	}

	// Find 3 related tools (same category preferred)
	type ToolItem = (typeof toolCategories)[number]["items"][number];
	let relatedTools: ToolItem[] = [];
	const categoryObj = toolCategories.find(
		(c) => c.category === currentCategory,
	);
	if (categoryObj) {
		relatedTools = categoryObj.items
			.filter((item) => item.path !== currentPath)
			.slice(0, 3);
	}

	// If less than 3, fill from other categories
	if (relatedTools.length < 3) {
		for (const cat of toolCategories) {
			if (cat.category !== currentCategory) {
				const extras = cat.items.filter(
					(item) => item.path !== currentPath && !relatedTools.includes(item),
				);
				relatedTools.push(...extras);
				if (relatedTools.length >= 3) break;
			}
		}
		relatedTools = relatedTools.slice(0, 3);
	}

	return (
		<div
			style={{
				marginTop: "48px",
				borderTop: "1px solid var(--border-color)",
				paddingTop: "32px",
				paddingBottom: "32px",
			}}
		>
			<h2
				style={{
					fontSize: "20px",
					marginBottom: "16px",
					color: "var(--text-secondary)",
				}}
			>
				{t("relatedToolsTitle")}
			</h2>
			<div
				style={{
					display: "grid",
					gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
					gap: "16px",
				}}
			>
				{relatedTools.map((tool) => (
					<Link
						href={tool.path}
						key={tool.path}
						style={{ textDecoration: "none" }}
					>
						<div
							className="card tool-card"
							style={{
								height: "100%",
								padding: "16px",
								display: "flex",
								flexDirection: "column",
							}}
						>
							<ToolIcon path={tool.path} />
							<h3
								style={{
									fontSize: "16px",
									color: "var(--primary)",
									marginBottom: "8px",
								}}
							>
								{tool.name}
							</h3>
							<p
								style={{
									fontSize: "14px",
									color: "var(--text-secondary)",
									marginTop: "auto",
									lineHeight: "1.5",
								}}
							>
								{tool.desc}
							</p>
						</div>
					</Link>
				))}
			</div>

			<p
				style={{
					marginTop: "32px",
					fontSize: "13px",
					lineHeight: "1.6",
					color: "var(--text-secondary)",
				}}
			>
				{t("disclaimer")}
			</p>
		</div>
	);
}
