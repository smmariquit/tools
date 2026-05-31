import type { Metadata } from "next";
import Client from "./Client";

export const metadata: Metadata = {
	title: "SSS Contribution Calculator (2026 Table) | PHTools",
	description:
		"Calculate your 2026 SSS monthly salary credit (MSC), employer share, and Mandatory Provident Fund (WISP) breakdown based on the 15% rate.",
	openGraph: {
		images: [
			{
				url: `/api/og?title=SSS%20Contribution%20Calculator%20%282026%20Table%29%20%7C%20PHTools&desc=Calculate%20your%202026%20SSS%20monthly%20salary%20credit%20%28MSC%29%2C%20employer%20share%2C%20and%20Mandatory%20Provident%20Fund%20%28WISP%29%20breakdown%20based%20on%20the%2015%25%20rate.&s1l=Salary&s1v=₱20k&s2l=Rate&s2v=14%25&s3l=Share&s3v=₱900`,
				width: 1200,
				height: 630,
			},
		],
	},
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
