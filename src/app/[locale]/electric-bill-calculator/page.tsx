import type { Metadata } from "next";
import Client from "./Client";

export const metadata: Metadata = {
	title: "Electric Bill Estimator (Meralco Rate) | PHTools",
	description:
		"Calculate the exact monthly electricity cost of your aircon, fan, or refrigerator based on wattage and Philippine Meralco rates.",
};

export default function ElectricBillPage() {
	const jsonLd = {
		"@context": "https://schema.org",
		"@type": "SoftwareApplication",
		name: "Electric Bill Estimator",
		applicationCategory: "UtilitiesApplication",
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
