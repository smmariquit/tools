import type { Metadata } from "next";
import Client from "./Client";

export const metadata: Metadata = {
	title: "Philippine Income Tax Calculator (BIR 2026) | PHTools",
	description:
		"Official Philippine BIR income tax calculator. Compare the graduated TRAIN Law brackets against the 8% flat rate for freelancers.",
	openGraph: {
		images: [
			{
				url: `/api/og?title=Philippine%20Income%20Tax%20Calculator%20%28BIR%202026%29%20%7C%20PHTools&desc=Official%20Philippine%20BIR%20income%20tax%20calculator.%20Compare%20the%20graduated%20TRAIN%20Law%20brackets%20against%20the%208%25%20flat%20rate%20for%20freelancers.&s1l=Income&s1v=₱500k&s2l=Bracket&s2v=20%25&s3l=Tax&s3v=₱55k`,
				width: 1200,
				height: 630,
			},
		],
	},
};

export default function IncomeTaxCalculatorPage() {
	const jsonLd = {
		"@context": "https://schema.org",
		"@type": "SoftwareApplication",
		name: "Income Tax Calculator",
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
