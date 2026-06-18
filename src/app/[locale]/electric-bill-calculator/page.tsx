import type { Metadata } from "next";
import { Suspense } from "react";
import { ogImages } from "../../../lib/og";
import ToolPageBottom from "../../components/ToolPageBottom";
import Client from "./Client";

export const metadata: Metadata = {
	title: "Electric Bill Estimator (Meralco Rate) | PHTools",
	description:
		"Calculate the exact monthly electricity cost of your aircon, fan, or refrigerator based on wattage and Philippine Meralco rates.",
	openGraph: {
		images: ogImages({
			tool: "electric-bill-calculator",
			title: "Electric Bill Estimator (Meralco Rate) | PHTools",
			desc: "Calculate the exact monthly electricity cost of your aircon, fan, or refrigerator based on wattage and Philippine Meralco rates.",
		}),
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
			<Suspense
				fallback={
					<div
						className="tool-grid card"
						style={{ textAlign: "center", padding: "40px" }}
					>
						Loading calculator...
					</div>
				}
			>
				<Client />
				<ToolPageBottom slug="meralco-electric-bill-guide" />
			</Suspense>
		</>
	);
}
