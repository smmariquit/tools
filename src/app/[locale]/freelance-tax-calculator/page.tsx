import type { Metadata } from "next";
import { Suspense } from "react";
import { ogImages } from "../../../lib/og";
import ToolPageBottom from "../../components/ToolPageBottom";
import Client from "./Client";

export function generateMetadata(): Metadata {
	const title = "Freelance 8% Tax Calculator (BIR) | PHTools";
	const description =
		"Calculate your net income and tax due as a freelancer or self-employed professional in the Philippines under the BIR 8% flat rate option.";

	return {
		title,
		description,
		openGraph: {
			images: ogImages({
				tool: "freelance-tax-calculator",
				title,
				desc: description,
			}),
		},
	};
}

export default async function FreelanceTaxPage() {
	const jsonLd = {
		"@context": "https://schema.org",
		"@type": "SoftwareApplication",
		name: "Freelance Tax Calculator",
		applicationCategory: "BusinessApplication",
		operatingSystem: "All",
		description:
			"Calculate your net income and tax due as a freelancer or self-employed professional in the Philippines under the BIR 8% flat rate option.",
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
				<ToolPageBottom slug="upwork-freelance-tax-guide" />
			</Suspense>
		</>
	);
}
