import type { Metadata } from "next";
import { ogImages } from "../../../lib/og";
import ToolPageBottom from "../../components/ToolPageBottom";
import Client from "./Client";

export function generateMetadata(): Metadata {
	const title = "De Minimis Tax Savings Calculator | Philippines";
	const description =
		"Maximize your tax-exempt allowances and bonuses with our De Minimis Optimization Estimator based on 2025-2026 BIR regulations.";

	return {
		title,
		description,
		openGraph: {
			images: ogImages({
				tool: "de-minimis-tax-calculator",
				title,
				desc: description,
			}),
		},
	};
}

export default function DeMinimisCalculatorPage() {
	const jsonLd = {
		"@context": "https://schema.org",
		"@type": "FinancialProduct",
		name: "De Minimis Tax Optimization Estimator",
		description:
			"Maximize your tax-exempt allowances and bonuses with our De Minimis Optimization Estimator based on 2025-2026 BIR regulations.",
		offers: {
			"@type": "Offer",
			price: "0",
			priceCurrency: "PHP",
		},
	};

	return (
		<>
			<script
				type="application/ld+json"
				dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
			/>
			<Client />
			<ToolPageBottom slug="de-minimis-benefits-guide" />
		</>
	);
}
