import type { Metadata } from "next";
import Client from "./Client";

export const metadata: Metadata = {
	title: "Fuel Cost & Trip Calculator (Ambagan) | PHTools",
	description:
		"Estimate gas expenses for your Philippine road trips. Calculate fuel consumption and divide the cost easily among friends.",
};

export default function FuelCostPage() {
	const jsonLd = {
		"@context": "https://schema.org",
		"@type": "SoftwareApplication",
		name: "Fuel Cost Calculator",
		applicationCategory: "TravelApplication",
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
