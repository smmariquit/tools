import type { Metadata } from "next";
import Client from "./Client";

export const metadata: Metadata = {
	title: "Amilyar (Real Property Tax) Calculator Philippines | PHTools",
	description:
		"Estimate your annual Amilyar or Real Property Tax (RPT) in the Philippines, including the Special Education Fund (SEF) for residential and commercial properties.",
	openGraph: {
		images: [
			{
				url: `/api/og?title=Amilyar%20%28Real%20Property%20Tax%29%20Calculator%20Philippines%20%7C%20PHTools&desc=Estimate%20your%20annual%20Amilyar%20or%20Real%20Property%20Tax%20%28RPT%29%20in%20the%20Philippines%2C%20including%20the%20Special%20Education%20Fund%20%28SEF%29%20for%20residential%20and%20commercial%20properties.&s1l=Assessed&s1v=₱1M&s2l=Rate&s2v=2%25&s3l=Tax&s3v=₱20k`,
				width: 1200,
				height: 630,
			},
		],
	},
};

export default function AmilyarPage() {
	const jsonLd = {
		"@context": "https://schema.org",
		"@type": "SoftwareApplication",
		name: "Amilyar Calculator",
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
