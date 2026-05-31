import Link from "next/link";
import { useTranslations } from "next-intl";
import { toolCategories } from "../../lib/routes";

const toolToBlogMap: Record<string, string> = {
	"/salary-calculator": "/blog/salary-tax-deductions-guide",
	"/bpo-night-differential-calculator":
		"/blog/bpo-night-differential-philippines",
	"/budget-calculator": "/blog/budget-reverse-salary-calculator-guide",
	"/sss-contribution-calculator": "/blog/sss-contribution-table-2026",
	"/sss-pension-calculator": "/blog/how-to-compute-sss-pension",
	"/philhealth-calculator": "/blog/philhealth-contribution-table-2026",
	"/income-tax-calculator": "/blog/income-tax-brackets-2026",
	"/overtime-pay-calculator": "/blog/philippine-overtime-holiday-pay-guide",
	"/13th-month-pay-calculator": "/blog/how-to-compute-13th-month-pay",
	"/backpay-calculator": "/blog/philippine-backpay-computation-guide",
	"/digital-bank-calculator": "/blog/digital-banks-philippines-interest-rates",
	"/tax-optimizer-calculator": "/blog/philippine-tax-classification-guide",
	"/freelance-tax-calculator": "/blog/upwork-freelance-tax-guide",
	"/shopee-lazada-fee-calculator": "/blog/shopee-lazada-seller-fees-explained",
	"/electric-bill-calculator": "/blog/meralco-electric-bill-guide",
	"/amilyar-calculator": "/blog/amilyar-real-property-tax-guide",
	"/car-loan-calculator": "/blog/philippine-car-loan-guide-bank-vs-dealer",
	"/home-loan-calculator": "/blog/philippine-home-loan-guide-bank-comparison",
	"/pagibig-calculator": "/blog/pagibig-contribution-table-2026",
	"/pagibig-mp2-calculator": "/blog/pagibig-mp2-dividend-calculator",
	"/pagibig-foreclosed-roi-calculator": "/blog/pagibig-foreclosed-property-roi",
	"/gwa-calculator": "/blog/how-to-compute-gwa-college",
	"/id-photo-maker": "/blog/id-picture-size-guide-philippines",
	"/holiday-calculator": "/blog/philippine-holiday-pay-rules",
	"/fuel-cost-calculator": "/blog/philippine-fuel-cost-trip-calculator",
	"/lto-penalty-calculator": "/blog/lto-late-registration-penalty",
	"/toll-calculator": "/blog/philippine-toll-fees-guide",
	"/food-cost-calculator": "/blog/food-costing-pricing-guide",
	"/de-minimis-tax-calculator": "/blog/de-minimis-benefits-guide",
	"/lto-registration-fee-calculator": "/blog/lto-registration-renewal-guide",
	"/sss-maternity-benefit-calculator": "/blog/sss-maternity-benefit-guide",
	"/bir-donors-tax-calculator": "/blog/bir-donors-tax-guide",
	"/architectural-fee-calculator": "/blog/architectural-fee-guide",
	"/customs-brokerage-fee-calculator": "/blog/customs-brokerage-fee-guide",
	"/influencer-rate-calculator": "/blog/influencer-rate-guide",
	"/final-pay-calculator": "/blog/final-pay-guide",
	"/tax-refund-calculator": "/blog/tax-refund-guide",
	"/kasambahay-payroll-calculator": "/blog/kasambahay-payroll-guide",
	"/kasambahay-retirement-calculator": "/blog/kasambahay-retirement-guide",
	"/estate-tax-calculator": "/blog/estate-tax-guide",
	"/gotrade-vs-ibkr-calculator": "/blog/gotrade-vs-ibkr-guide",
	"/pdic-insurance-calculator": "/blog/pdic-insurance-guide",
	"/philhealth-late-contribution-calculator": "/blog/philhealth-late-contribution-guide",
	"/retail-treasury-bond-calculator": "/blog/retail-treasury-bond-guide",
	"/shipping-logistics-estimator": "/blog/shipping-logistics-guide",
	"/crypto-spread-calculator": "/blog/crypto-spread-guide",
	"/crypto-p2p-cashout-calculator": "/blog/crypto-p2p-cashout-guide",
	"/crypto-tax-calculator": "/blog/crypto-tax-guide",
	"/civil-service-reviewer": "/blog/civil-service-reviewer-guide",
	"/legal-contract-generator": "/blog/legal-contract-guide",
	"/invoice-factoring-calculator": "/blog/invoice-factoring-guide",
	"/digital-ticket-generator": "/blog/digital-ticket-guide",

	"/gsis-pension-calculator": "/blog/how-to-compute-gsis-pension",
	"/sss-maternity-calculator": "/blog/sss-maternity-benefit-guide",
	"/gross-from-tax-calculator": "/blog/gross-from-tax-computation-guide",
	"/separation-pay-calculator": "/blog/philippine-separation-pay-guide",
	"/freelance-rate-calculator": "/blog/freelance-hourly-rate-guide",
	"/bir-withholding-tax-calculator": "/blog/bir-withholding-tax-guide",
	"/motorcycle-loan-calculator": "/blog/philippine-car-loan-guide-bank-vs-dealer",
	"/pagibig-affordability-calculator": "/blog/pagibig-housing-loan-affordability-guide",
	"/prc-board-exam-rating-calculator": "/blog/prc-board-exam-rating-guide",
	"/latin-honors-calculator": "/blog/philippine-latin-honors-guide",
	"/dost-scholarship-stipend-calculator": "/blog/dost-scholarship-stipend-guide",
	"/ched-scholarship-calculator": "/blog/ched-scholarship-guide",
	"/qpi-gpa-calculator": "/blog/qpi-gpa-calculator-guide",
	"/dfa-age-calculator": "/blog/dfa-age-requirements-guide",
	"/bill-splitter-calculator": "/blog/how-to-split-bills-properly",

	"/mlbb-diamond-calculator": "/blog/mlbb-diamond-topup-guide",
	"/mlbb-winrate-calculator": "/blog/mlbb-winrate-guide",
	"/codm-lucky-draw-calculator": "/blog/codm-lucky-draw-guide",
	"/genshin-pity-calculator": "/blog/genshin-pity-guide",
	"/valorant-vp-calculator": "/blog/valorant-vp-guide",
	"/gaming-edpi-calculator": "/blog/gaming-edpi-guide",
	"/dota2-mmr-calculator": "/blog/dota2-mmr-guide",
	"/dota2-battlepass-calculator": "/blog/dota2-battlepass-guide",
};



export default function ToolFooter({ currentPath }: { currentPath: string }) {
	const t = useTranslations("ToolFooter");
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
				maxWidth: "800px",
				margin: "48px auto 0 auto",
			}}
		>
			<h2 style={{ fontSize: "24px", marginBottom: "16px" }}>
				{t("readGuideTitle")}
			</h2>
			<div
				className="card"
				style={{ marginBottom: "32px", borderLeft: "4px solid var(--primary)" }}
			>
				<p style={{ marginBottom: "12px" }}>{t("readGuideDesc")}</p>
				<Link
					href={blogPath || "/blog"}
					style={{
						fontWeight: 600,
						display: "inline-block",
						backgroundColor: "var(--primary)",
						color: "white",
						padding: "8px 16px",
						borderRadius: "4px",
						textDecoration: "none",
					}}
				>
					{t("readGuideBtn")}
				</Link>
			</div>

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
							style={{ height: "100%", padding: "16px" }}
						>
							<h3
								style={{
									fontSize: "16px",
									color: "var(--primary)",
									marginBottom: "8px",
								}}
							>
								{tool.name}
							</h3>
							<p style={{ fontSize: "12px", color: "var(--text-secondary)" }}>
								{tool.desc}
							</p>
						</div>
					</Link>
				))}
			</div>
		</div>
	);
}
