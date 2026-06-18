import type { Metadata } from "next";
import { Suspense } from "react";
import { ogImages } from "../../../lib/og";
import ToolPageBottom from "../../components/ToolPageBottom";
import Client from "./Client";

export function generateMetadata(): Metadata {
	const title = "Philippine Income Tax Calculator (BIR) | PHTools";
	const description =
		"Calculate your withholding and annual income tax based on the updated 2026 TRAIN Law brackets.";

	return {
		title,
		description,
		openGraph: {
			images: ogImages({
				tool: "income-tax-calculator",
				title,
				desc: description,
			}),
		},
	};
}

export default async function IncomeTaxPage() {
	const jsonLd = {
		"@context": "https://schema.org",
		"@type": "SoftwareApplication",
		name: "Philippine Income Tax Calculator (BIR)",
		applicationCategory: "BusinessApplication",
		operatingSystem: "All",
		description:
			"Calculate your withholding and annual income tax based on the updated 2026 TRAIN Law brackets.",
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
				<ToolPageBottom slug="income-tax-brackets-2026" />
			</Suspense>
		</>
	);
}
