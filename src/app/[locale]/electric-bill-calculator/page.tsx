import ToolFooter from "../../components/ToolFooter";
import type { Metadata } from "next";
import Client from "./Client";

export const metadata: Metadata = {
	title: "Electric Bill Estimator (Meralco Rate) | PHTools",
	description:
		"Calculate the exact monthly electricity cost of your aircon, fan, or refrigerator based on wattage and Philippine Meralco rates.",
	openGraph: {
		images: [
			{
				url: `/api/og?title=Electric%20Bill%20Estimator%20%28Meralco%20Rate%29%20%7C%20PHTools&desc=Calculate%20the%20exact%20monthly%20electricity%20cost%20of%20your%20aircon%2C%20fan%2C%20or%20refrigerator%20based%20on%20wattage%20and%20Philippine%20Meralco%20rates.&s1l=Usage&s1v=200kWh&s2l=Rate&s2v=₱11.5&s3l=Bill&s3v=₱2.3k`,
				width: 1200,
				height: 630,
			},
		],
	},
};

export default function ElectricBillPage() {
	const jsonLd = {
		"@context": "https://schema.org",
		"@type": "SoftwareApplication",
		name: "Electric Bill Estimator",
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
			<ToolFooter currentPath="/electric-bill-calculator" />
		</>
	);
}
