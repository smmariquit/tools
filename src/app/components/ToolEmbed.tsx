"use client";

import dynamic from "next/dynamic";
import { Suspense } from "react";

// Mapping of tool names to their respective Client components
const tools = {
	"salary-calculator": dynamic(
		() => import("../[locale]/salary-calculator/Client"),
	),
	"13th-month-pay-calculator": dynamic(
		() => import("../[locale]/13th-month-pay-calculator/Client"),
	),
	"backpay-calculator": dynamic(
		() => import("../[locale]/backpay-calculator/Client"),
	),
	"amilyar-calculator": dynamic(
		() => import("../[locale]/amilyar-calculator/Client"),
	),
	"digital-bank-calculator": dynamic(
		() => import("../[locale]/digital-bank-calculator/Client"),
	),
	"electric-bill-calculator": dynamic(
		() => import("../[locale]/electric-bill-calculator/Client"),
	),
	"freelance-tax-calculator": dynamic(
		() => import("../[locale]/freelance-tax-calculator/Client"),
	),
	"fuel-cost-calculator": dynamic(
		() => import("../[locale]/fuel-cost-calculator/Client"),
	),
	"gwa-calculator": dynamic(() => import("../[locale]/gwa-calculator/Client")),
	"holiday-calculator": dynamic(
		() => import("../[locale]/holiday-calculator/Client"),
	),
	"income-tax-calculator": dynamic(
		() => import("../[locale]/income-tax-calculator/Client"),
	),
	"lto-penalty-calculator": dynamic(
		() => import("../[locale]/lto-penalty-calculator/Client"),
	),
	"overtime-pay-calculator": dynamic(
		() => import("../[locale]/overtime-pay-calculator/Client"),
	),
	"pagibig-calculator": dynamic(
		() => import("../[locale]/pagibig-calculator/Client"),
	),
	"pagibig-foreclosed-roi-calculator": dynamic(
		() => import("../[locale]/pagibig-foreclosed-roi-calculator/Client"),
	),
	"pagibig-mp2-calculator": dynamic(
		() => import("../[locale]/pagibig-mp2-calculator/Client"),
	),
	"philhealth-calculator": dynamic(
		() => import("../[locale]/philhealth-calculator/Client"),
	),
	"shopee-lazada-fee-calculator": dynamic(
		() => import("../[locale]/shopee-lazada-fee-calculator/Client"),
	),
	"sss-contribution-calculator": dynamic(
		() => import("../[locale]/sss-contribution-calculator/Client"),
	),
	"sss-pension-calculator": dynamic(
		() => import("../[locale]/sss-pension-calculator/Client"),
	),
	"tax-optimizer-calculator": dynamic(
		() => import("../[locale]/tax-optimizer-calculator/Client"),
	),
	"toll-calculator": dynamic(
		() => import("../[locale]/toll-calculator/Client"),
	),
};

interface ToolEmbedProps {
	tool: keyof typeof tools;
}

export default function ToolEmbed({ tool }: ToolEmbedProps) {
	const Component = tools[tool];

	if (!Component) {
		return (
			<div style={{ color: "red", padding: "20px" }}>
				Error: Tool "{tool}" not found.
			</div>
		);
	}

	return (
		<div
			style={{
				margin: "32px 0",
				padding: "24px",
				border: "2px solid var(--primary)",
				borderRadius: "12px",
				backgroundColor: "var(--bg-color)",
				boxShadow: "var(--shadow-md)",
			}}
		>
			<div
				style={{
					fontSize: "14px",
					textTransform: "uppercase",
					color: "var(--primary)",
					fontWeight: "bold",
					marginBottom: "16px",
					textAlign: "center",
					letterSpacing: "1px",
				}}
			>
				Interactive Tool Example
			</div>
			<Suspense
				fallback={
					<div style={{ textAlign: "center", padding: "40px" }}>
						Loading interactive tool...
					</div>
				}
			>
				<Component />
			</Suspense>
		</div>
	);
}
