import type { Metadata } from "next";
import Client from "./Client";

export const metadata: Metadata = {
	title: "Pag-IBIG & MP2 Savings Calculator (2026) | PHTools",
	description:
		"Calculate your mandatory Pag-IBIG contributions and estimate your MP2 tax-free dividend returns over a 5-year compounding period.",
};

export default function PagIbigPage() {
	const jsonLd = {
		"@context": "https://schema.org",
		"@type": "SoftwareApplication",
		name: "Pag-IBIG MP2 Calculator",
		applicationCategory: "FinanceApplication",
		operatingSystem: "All",
		description: metadata.description,
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
		</>
	);
}
