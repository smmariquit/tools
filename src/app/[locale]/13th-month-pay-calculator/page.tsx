import type { Metadata } from "next";
import Client from "./Client";

export const metadata: Metadata = {
	title: "13th Month Pay Calculator (Philippines 2026) | PHTools",
	description:
		"Accurately compute your prorated 13th month pay. Automatically excludes overtime and checks the ₱90k TRAIN law tax exemption limit.",
	openGraph: {
		images: [
			{
				url: `/api/og?title=13th%20Month%20Pay%20Calculator%20%28Philippines%202026%29%20%7C%20PHTools&desc=Accurately%20compute%20your%20prorated%2013th%20month%20pay.%20Automatically%20excludes%20overtime%20and%20checks%20the%20%E2%82%B190k%20TRAIN%20law%20tax%20exemption%20limit.&s1l=Basic&s1v=₱30k&s2l=Months&s2v=12&s3l=13th%20Month&s3v=₱30k`,
				width: 1200,
				height: 630,
			},
		],
	},
};

export default function ThirteenthMonthPage() {
	const jsonLd = {
		"@context": "https://schema.org",
		"@type": "SoftwareApplication",
		name: "13th Month Pay Calculator",
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
