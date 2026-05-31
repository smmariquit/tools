import type { Metadata } from "next";
import Client from "./Client";

export const metadata: Metadata = {
	title: "Fuel Cost & Trip Calculator (Ambagan) | PHTools",
	description:
		"Estimate gas expenses for your Philippine road trips. Calculate fuel consumption and divide the cost easily among friends.",
	openGraph: {
		images: [
			{
				url: `/api/og?title=Fuel%20Cost%20%26%20Trip%20Calculator%20%28Ambagan%29%20%7C%20PHTools&desc=Estimate%20gas%20expenses%20for%20your%20Philippine%20road%20trips.%20Calculate%20fuel%20consumption%20and%20divide%20the%20cost%20easily%20among%20friends.&s1l=Dist&s1v=250km&s2l=Efficiency&s2v=12km/L&s3l=Cost&s3v=₱1.3k`,
				width: 1200,
				height: 630,
			},
		],
	},
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
