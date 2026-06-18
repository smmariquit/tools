import type { Metadata } from "next";
import { ogImages } from "../../../lib/og";
import ToolPageBottom from "../../components/ToolPageBottom";
import Client from "./Client";

export function generateMetadata(): Metadata {
	const title = "LTO Car Registration Renewal Fee Calculator | Philippines";
	const description =
		"Estimate your annual LTO Motor Vehicle User's Charge (MVUC) and check for any late renewal penalties based on RA 8794.";

	return {
		title,
		description,
		openGraph: {
			images: ogImages({
				tool: "lto-registration-fee-calculator",
				title,
				desc: description,
			}),
		},
	};
}

export default function LtoCalculatorPage() {
	const jsonLd = {
		"@context": "https://schema.org",
		"@type": "FinancialProduct",
		name: "LTO Annual Registration Fee Estimator",
		description:
			"Estimate your annual LTO Motor Vehicle User's Charge (MVUC) and check for any late renewal penalties based on RA 8794.",
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
			<ToolPageBottom slug="lto-registration-renewal-guide" />
		</>
	);
}
