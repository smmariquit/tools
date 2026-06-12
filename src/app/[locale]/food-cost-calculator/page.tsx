import type { Metadata } from "next";
import Client from "./Client";

export async function generateMetadata(): Promise<Metadata> {
	const title = "Food Cost & Pricing Calculator | Philippines";
	const description =
		"Calculate your recipe costs, maximize food business profit margins, and factor in VAT, service charge, and Senior/PWD discounts effortlessly.";

	let ogUrl = `/api/og?title=${encodeURIComponent(
		title,
	)}&desc=${encodeURIComponent(description)}`;
	ogUrl +=
		"&s1l=Food%20Cost&s1v=30%25&s2l=Margin&s2v=70%25&s3l=Price&s3v=%E2%82%B1150";

	return {
		title,
		description,
		openGraph: {
			images: [
				{
					url: ogUrl,
					width: 1200,
					height: 630,
				},
			],
		},
	};
}

export default function FoodCostCalculatorPage() {
	const jsonLd = {
		"@context": "https://schema.org",
		"@type": "SoftwareApplication",
		name: "Food Cost & Pricing Calculator",
		applicationCategory: "BusinessApplication",
		operatingSystem: "All",
		description:
			"Calculate your recipe costs, maximize food business profit margins, and factor in VAT, service charge, and Senior/PWD discounts effortlessly.",
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
