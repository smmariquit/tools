import type { Metadata } from "next";
import { Suspense } from "react";
import { ogImages } from "../../../lib/og";
import ToolPageBottom from "../../components/ToolPageBottom";
import Client from "./Client";

export function generateMetadata(): Metadata {
	const title = "LTO Late Registration Penalty Calculator | PHTools";
	const description =
		"Check exactly how much your MVUC fine is for late vehicle registration in the Philippines.";

	return {
		title,
		description,
		openGraph: {
			images: ogImages({
				tool: "lto-penalty-calculator",
				title,
				desc: description,
			}),
		},
	};
}

export default async function LtoPenaltyPage() {
	const jsonLd = {
		"@context": "https://schema.org",
		"@type": "SoftwareApplication",
		name: "LTO Penalty Calculator",
		applicationCategory: "UtilityApplication",
		operatingSystem: "All",
		description:
			"Check exactly how much your MVUC fine is for late vehicle registration in the Philippines.",
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
				<ToolPageBottom slug="lto-late-registration-penalty" />
			</Suspense>
		</>
	);
}
