import type { Metadata } from "next";
import Client from "./Client";

export const metadata: Metadata = {
	title: "SSS Contribution Calculator (2026 Table) | PHTools",
	description:
		"Calculate your 2026 SSS monthly salary credit (MSC), employer share, and Mandatory Provident Fund (WISP) breakdown based on the 15% rate.",
};

export default function SSSCalculatorPage() {
	const jsonLd = {
		"@context": "https://schema.org",
		"@type": "SoftwareApplication",
		name: "SSS Contribution Calculator",
		applicationCategory: "BusinessApplication",
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
