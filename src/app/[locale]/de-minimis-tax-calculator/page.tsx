import type { Metadata } from "next";
import ToolFooter from "../../components/ToolFooter";
import Client from "./Client";

export async function generateMetadata(): Promise<Metadata> {
	const title = "De Minimis Tax Savings Calculator | Philippines";
	const description =
		"Maximize your tax-exempt allowances and bonuses with our De Minimis Optimization Estimator based on 2025-2026 BIR regulations.";

	let ogUrl = `/api/og?title=${encodeURIComponent(
		title,
	)}&desc=${encodeURIComponent(description)}`;
	ogUrl += "&s1l=Exempt&s1v=100%25&s2l=Savings&s2v=Maximized";

	return {
		title,
		description,
		openGraph: {
			images: [{ url: ogUrl, width: 1200, height: 630 }],
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
			<ToolFooter currentPath="/de-minimis-tax-calculator" />
		</>
	);
}
