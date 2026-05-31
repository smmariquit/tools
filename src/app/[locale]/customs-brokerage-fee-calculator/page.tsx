import type { Metadata } from "next";
import ToolFooter from "../../components/ToolFooter";
import Client from "./Client";

export async function generateMetadata(): Promise<Metadata> {
	const title = "Standard Customs Brokerage Fee Calculator (CAO No. 1-2001) | Philippines";
	const description =
		"Calculate minimum professional fees for customs brokers based on the Dutiable Value (DV) of your shipment under BOC CAO No. 1-2001.";

	let ogUrl = `/api/og?title=${encodeURIComponent(
		title,
	)}&desc=${encodeURIComponent(description)}`;
	ogUrl += "&s1l=Formal&s1v=Entry&s2l=Brokerage&s2v=Fee";

	return {
		title,
		description,
		openGraph: {
			images: [{ url: ogUrl, width: 1200, height: 630 }],
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
			<ToolFooter currentPath="/customs-brokerage-fee-calculator" />
		</>
	);
}
