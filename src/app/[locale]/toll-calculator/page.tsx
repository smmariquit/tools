import type { Metadata } from "next";
import { Suspense } from "react";
import { ogImages } from "../../../lib/og";
import ToolPageBottom from "../../components/ToolPageBottom";
import Client from "./Client";

export const metadata: Metadata = {
	title: "Expressway Toll Calculator (Skyway, SLEX) | PHTools",
	description:
		"Calculate toll fees for Philippine expressways including Skyway Stage 3, SLEX, and NLEX. Check TRB-approved rates for Class 1, 2, and 3 vehicles.",
	openGraph: {
		images: ogImages({
			tool: "toll-calculator",
			title: "Expressway Toll Calculator (Skyway, SLEX) | PHTools",
			desc: "Calculate toll fees for Philippine expressways including Skyway Stage 3, SLEX, and NLEX. Check TRB-approved rates for Class 1, 2, and 3 vehicles.",
		}),
	},
};

export default function TollCalculatorPage() {
	const jsonLd = {
		"@context": "https://schema.org",
		"@type": "SoftwareApplication",
		name: "Philippine Toll Calculator",
		applicationCategory: "TravelApplication",
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
				<ToolPageBottom slug="philippine-toll-fees-guide" />
			</Suspense>
		</>
	);
}
