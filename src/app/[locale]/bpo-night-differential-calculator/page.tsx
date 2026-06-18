import type { Metadata } from "next";
import { Suspense } from "react";
import { ogImages } from "../../../lib/og";
import ToolPageBottom from "../../components/ToolPageBottom";
import Client from "./Client";

export function generateMetadata(): Metadata {
	const title = "BPO Night Differential & Overtime Calculator | PHTools";
	const description =
		"Calculate your exact night differential, overtime, and holiday pay for your BPO shift.";

	return {
		title,
		description,
		openGraph: {
			images: ogImages({
				tool: "bpo-night-differential-calculator",
				title,
				desc: description,
			}),
		},
	};
}

export default async function BpoCalculatorPage() {
	const jsonLd = {
		"@context": "https://schema.org",
		"@type": "SoftwareApplication",
		name: "BPO Night Differential Calculator",
		applicationCategory: "FinanceApplication",
		operatingSystem: "All",
		description:
			"Calculate your exact night differential, overtime, and holiday pay for your BPO shift.",
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
				<ToolPageBottom slug="bpo-night-differential-philippines" />
			</Suspense>
		</>
	);
}
