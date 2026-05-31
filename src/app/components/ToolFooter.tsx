import Link from "next/link";
import { toolCategories } from "../../lib/routes";

const toolToBlogMap: Record<string, string> = {
	"/salary-calculator": "/blog/salary-tax-deductions-guide",
	"/sss-contribution-calculator": "/blog/sss-contribution-table-2026",
	"/philhealth-calculator": "/blog/philhealth-contribution-table-2026",
	"/income-tax-calculator": "/blog/income-tax-brackets-2026",
	"/13th-month-pay-calculator": "/blog/how-to-compute-13th-month-pay",
	"/freelance-tax-calculator": "/blog/upwork-freelance-tax-guide",
	"/shopee-lazada-fee-calculator": "/blog/shopee-lazada-seller-fees-explained",
	"/electric-bill-calculator": "/blog/meralco-electric-bill-guide",
	"/amilyar-calculator": "/blog/amilyar-real-property-tax-guide",
	"/pagibig-calculator": "/blog/pagibig-mp2-dividend-calculator",
	"/pagibig-foreclosed-roi-calculator": "/blog/pagibig-foreclosed-property-roi",
	"/gwa-calculator": "/blog/how-to-compute-gwa-college",
	"/id-photo-maker": "/blog/id-picture-size-guide-philippines",
	"/holiday-calculator": "/blog/philippine-holiday-pay-rules",
	"/fuel-cost-calculator": "/blog/philippine-fuel-cost-trip-calculator",
	"/lto-penalty-calculator": "/blog/lto-late-registration-penalty",
	"/toll-calculator": "/blog/philippine-toll-fees-guide",
};

export default function ToolFooter({ currentPath }: { currentPath: string }) {
	const blogPath = toolToBlogMap[currentPath];

	// Find the category of the current tool
	let currentCategory = "";
	for (const cat of toolCategories) {
		if (cat.items.find((item) => item.path === currentPath)) {
			currentCategory = cat.category;
			break;
		}
	}

	// Find 3 related tools (same category preferred)
	let relatedTools: any[] = [];
	const categoryObj = toolCategories.find((c) => c.category === currentCategory);
	if (categoryObj) {
		relatedTools = categoryObj.items.filter((item) => item.path !== currentPath).slice(0, 3);
	}
	
	// If less than 3, fill from other categories
	if (relatedTools.length < 3) {
		for (const cat of toolCategories) {
			if (cat.category !== currentCategory) {
				const extras = cat.items.filter((item) => item.path !== currentPath && !relatedTools.includes(item));
				relatedTools.push(...extras);
				if (relatedTools.length >= 3) break;
			}
		}
		relatedTools = relatedTools.slice(0, 3);
	}

	return (
		<div style={{ marginTop: "48px", borderTop: "1px solid var(--border-color)", paddingTop: "32px", paddingBottom: "32px", maxWidth: "800px", margin: "48px auto 0 auto" }}>
			<h2 style={{ fontSize: "24px", marginBottom: "16px" }}>Read the Full Guide</h2>
			<div className="card" style={{ marginBottom: "32px", borderLeft: "4px solid var(--primary)" }}>
				<p style={{ marginBottom: "12px" }}>
					Want to know the exact formula behind this calculator? Check out our comprehensive, human-written guide that explains the law, computations, and exact rules.
				</p>
				<Link href={blogPath || "/blog"} style={{ fontWeight: 600, display: "inline-block", backgroundColor: "var(--primary)", color: "white", padding: "8px 16px", borderRadius: "4px", textDecoration: "none" }}>
					Read the Guide &rarr;
				</Link>
			</div>

			<h2 style={{ fontSize: "20px", marginBottom: "16px", color: "var(--text-secondary)" }}>Related Tools</h2>
			<div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: "16px" }}>
				{relatedTools.map((tool) => (
					<Link href={tool.path} key={tool.path} style={{ textDecoration: "none" }}>
						<div className="card tool-card" style={{ height: "100%", padding: "16px" }}>
							<h3 style={{ fontSize: "16px", color: "var(--primary)", marginBottom: "8px" }}>{tool.name}</h3>
							<p style={{ fontSize: "12px", color: "var(--text-secondary)" }}>{tool.desc}</p>
						</div>
					</Link>
				))}
			</div>
		</div>
	);
}
