import type { Metadata } from "next";
import { Suspense } from "react";
import { ogImages } from "../../../lib/og";
import ToolPageBottom from "../../components/ToolPageBottom";
import Client from "./Client";

export function generateMetadata(): Metadata {
	const title = "Philippine Fuel Cost & Trip Calculator | PHTools";
	const description =
		"Estimate your gas expenses for road trips in the Philippines. Perfect for dividing costs among friends (ambagan).";

	return {
		title,
		description,
		openGraph: {
			images: ogImages({
				tool: "fuel-cost-calculator",
				title,
				desc: description,
			}),
		},
	};
}

export default async function FuelCostPage() {
	const jsonLd = {
		"@context": "https://schema.org",
		"@type": "SoftwareApplication",
		name: "Philippine Fuel Cost Calculator",
		applicationCategory: "TravelApplication",
		operatingSystem: "All",
		description:
			"Estimate your gas expenses for road trips in the Philippines. Perfect for dividing costs among friends (ambagan).",
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
				<ToolPageBottom slug="philippine-fuel-cost-trip-calculator" />
			</Suspense>
		</>
	);
}
