import type { Metadata } from "next";
import Client from "./Client";

export const metadata: Metadata = {
	title: "PhilHealth Contribution Calculator 2026 | PHTools",
	description:
		"Calculate your exact PhilHealth monthly premium deduction based on the latest 5% contribution table mandated by the Universal Health Care Law.",
	openGraph: {
		images: [
			{
				url: `/api/og?title=PhilHealth%20Contribution%20Calculator%202026%20%7C%20PHTools&desc=Calculate%20your%20exact%20PhilHealth%20monthly%20premium%20deduction%20based%20on%20the%20latest%205%25%20contribution%20table%20mandated%20by%20the%20Universal%20Health%20Care%20Law.&s1l=Salary&s1v=₱30k&s2l=Rate&s2v=5%25&s3l=Share&s3v=₱750`,
				width: 1200,
				height: 630,
			},
		],
	},
};

export default function PhilHealthPage() {
	const jsonLd = {
		"@context": "https://schema.org",
		"@type": "SoftwareApplication",
		name: "PhilHealth Contribution Calculator",
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
