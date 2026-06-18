import type { Metadata } from "next";
import { Suspense } from "react";
import { ogImages } from "../../../lib/og";
import ToolPageBottom from "../../components/ToolPageBottom";
import Client from "./Client";

export const metadata: Metadata = {
	title: "Free ID Photo Maker (1x1, 2x2, Passport) | PHTools",
	description:
		"Free web tool to crop selfies into Philippine 2x2, 1x1, and Passport (35x45mm) sizes at 300 DPI. Processed securely on your device.",
	openGraph: {
		images: ogImages({
			tool: "id-photo-maker",
			title: "Free ID Photo Maker (1x1, 2x2, Passport) | PHTools",
			desc: "Free web tool to crop selfies into Philippine 2x2, 1x1, and Passport (35x45mm) sizes at 300 DPI. Processed securely on your device.",
		}),
	},
};

export default function IDPhotoMakerPage() {
	const jsonLd = {
		"@context": "https://schema.org",
		"@type": "SoftwareApplication",
		name: "ID Photo Maker",
		applicationCategory: "MultimediaApplication",
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
				<ToolPageBottom slug="id-picture-size-guide-philippines" />
			</Suspense>
		</>
	);
}
