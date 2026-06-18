import type { Metadata } from "next";
import { ogImages } from "../../../lib/og";
import ToolPageBottom from "../../components/ToolPageBottom";
import Client from "./Client";

export function generateMetadata(): Metadata {
	const title =
		"Standard Customs Brokerage Fee Calculator (CAO No. 1-2001) | Philippines";
	const description =
		"Calculate minimum professional fees for customs brokers based on the Dutiable Value (DV) of your shipment under BOC CAO No. 1-2001.";

	return {
		title,
		description,
		openGraph: {
			images: ogImages({
				tool: "customs-brokerage-fee-calculator",
				title,
				desc: description,
			}),
		},
	};
}

export default function CustomsBrokerageCalculatorPage() {
	const jsonLd = {
		"@context": "https://schema.org",
		"@type": "FinancialProduct",
		name: "Customs Brokerage Fee Calculator (CAO 1-2001)",
		description:
			"Calculate minimum professional fees for customs brokers based on the Dutiable Value (DV) of your shipment under BOC CAO No. 1-2001.",
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
			<ToolPageBottom slug="customs-brokerage-fee-guide" />
		</>
	);
}
