import type { Metadata } from "next";
import Client from "./Client";

export const metadata: Metadata = {
	title: "Freelance 8% Tax Calculator (BIR) | PHTools",
	description:
		"Calculate your net income and tax due as a freelancer or self-employed professional in the Philippines under the BIR 8% flat rate option.",
};

export default function FreelanceTaxPage() {
	const jsonLd = {
		"@context": "https://schema.org",
		"@type": "SoftwareApplication",
		name: "Freelance Tax Calculator",
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
