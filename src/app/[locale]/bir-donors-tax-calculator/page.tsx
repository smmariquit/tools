import type { Metadata } from "next";
import { ogImages } from "../../../lib/og";
import ToolPageBottom from "../../components/ToolPageBottom";
import Client from "./Client";

export function generateMetadata(): Metadata {
	const title = "BIR Donor's Tax Calculator | Philippines";
	const description =
		"Calculate your cumulative donor's tax liability based on the BIR TRAIN Law (RA 10963) with the ₱250,000 tax-exempt threshold.";

	return {
		title,
		description,
		openGraph: {
			images: ogImages({
				tool: "bir-donors-tax-calculator",
				title,
				desc: description,
			}),
		},
	};
}

export default function DonorsTaxCalculatorPage() {
	const jsonLd = {
		"@context": "https://schema.org",
		"@type": "FinancialProduct",
		name: "BIR Donor's Tax Calculator",
		description:
			"Calculate your cumulative donor's tax liability based on the BIR TRAIN Law (RA 10963) with the ₱250,000 tax-exempt threshold.",
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
			<ToolPageBottom slug="bir-donors-tax-guide" />
		</>
	);
}
