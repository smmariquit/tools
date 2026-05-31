import type { Metadata } from "next";
import Client from "./Client";

export const metadata: Metadata = {
	title: "Expressway Toll Calculator (Skyway, SLEX) | PHTools",
	description:
		"Calculate toll fees for Philippine expressways including Skyway Stage 3, SLEX, and NLEX. Check TRB-approved rates for Class 1, 2, and 3 vehicles.",
	openGraph: {
		images: [
			{
				url: `/api/og?title=Expressway%20Toll%20Calculator%20%28Skyway%2C%20SLEX%29%20%7C%20PHTools&desc=Calculate%20toll%20fees%20for%20Philippine%20expressways%20including%20Skyway%20Stage%203%2C%20SLEX%2C%20and%20NLEX.%20Check%20TRB-approved%20rates%20for%20Class%201%2C%202%2C%20and%203%20vehicles.&s1l=Entry&s1v=Balintawak&s2l=Exit&s2v=Baguio&s3l=Fee&s3v=₱1.3k`,
				width: 1200,
				height: 630,
			},
		],
	},
};

export default function TollCalculatorPage() {
	const jsonLd = {
		"@context": "https://schema.org",
		"@type": "SoftwareApplication",
		name: "Philippine Toll Calculator",
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
