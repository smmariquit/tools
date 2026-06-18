import type { Metadata } from "next";
import { Suspense } from "react";
import { ogImages } from "../../../lib/og";
import ToolPageBottom from "../../components/ToolPageBottom";
import Client from "./Client";

export function generateMetadata(): Metadata {
	const title = "Amilyar (Real Property Tax) Calculator | PHTools";
	const description =
		"Estimate your annual Philippine Real Property Tax (RPT) including the Special Education Fund (SEF) based on Local Government Code rates.";

	return {
		title,
		description,
		openGraph: {
			images: ogImages({
				tool: "amilyar-calculator",
				title,
				desc: description,
			}),
		},
	};
}

export default async function AmilyarPage() {
	const jsonLd = {
		"@context": "https://schema.org",
		"@type": "SoftwareApplication",
		name: "Amilyar (Real Property Tax) Calculator",
		applicationCategory: "BusinessApplication",
		operatingSystem: "All",
		description:
			"Estimate your annual Philippine Real Property Tax (RPT) including the Special Education Fund (SEF) based on Local Government Code rates.",
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
				<ToolPageBottom slug="amilyar-real-property-tax-guide" />
			</Suspense>
		</>
	);
}
