import type { Metadata } from "next";
import Client from "./Client";

export const metadata: Metadata = {
	title: "Freelance 8% Tax Calculator (BIR) | PHTools",
	description:
		"Calculate your net income and tax due as a freelancer or self-employed professional in the Philippines under the BIR 8% flat rate option.",
	openGraph: {
		images: [
			{
				url: `/api/og?title=Freelance%208%25%20Tax%20Calculator%20%28BIR%29%20%7C%20PHTools&desc=Calculate%20your%20net%20income%20and%20tax%20due%20as%20a%20freelancer%20or%20self-employed%20professional%20in%20the%20Philippines%20under%20the%20BIR%208%25%20flat%20rate%20option.&s1l=Income&s1v=₱80k&s2l=Rate&s2v=8%25&s3l=Tax&s3v=₱4.3k`,
				width: 1200,
				height: 630,
			},
		],
	},
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
