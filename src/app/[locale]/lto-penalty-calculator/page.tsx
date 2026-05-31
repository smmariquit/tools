import type { Metadata } from "next";
import Client from "./Client";

export const metadata: Metadata = {
	title: "LTO Late Registration Penalty Calculator | PHTools",
	description:
		"Calculate the exact fines, MVUC surcharges, and total fees for late LTO vehicle or motorcycle registration renewal in the Philippines.",
	openGraph: {
		images: [
			{
				url: `/api/og?title=LTO%20Late%20Registration%20Penalty%20Calculator%20%7C%20PHTools&desc=Calculate%20the%20exact%20fines%2C%20MVUC%20surcharges%2C%20and%20total%20fees%20for%20late%20LTO%20vehicle%20or%20motorcycle%20registration%20renewal%20in%20the%20Philippines.&s1l=Vehicle&s1v=Car&s2l=Delay&s2v=1%20Mo&s3l=Penalty&s3v=₱200`,
				width: 1200,
				height: 630,
			},
		],
	},
};

export default function LtoPenaltyPage() {
	const jsonLd = {
		"@context": "https://schema.org",
		"@type": "SoftwareApplication",
		name: "LTO Penalty Calculator",
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
