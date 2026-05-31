import type { Metadata } from "next";
import Client from "./Client";

export const metadata: Metadata = {
	title: "Shopee & Lazada Seller Fee Calculator | PHTools",
	description:
		"Calculate your exact e-commerce seller deductions. Compute transaction fees, commission fees, and FSS/CCB deductions to find your net payout.",
};

export default function EcommerceFeePage() {
	const jsonLd = {
		"@context": "https://schema.org",
		"@type": "SoftwareApplication",
		name: "Shopee & Lazada Fee Calculator",
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
