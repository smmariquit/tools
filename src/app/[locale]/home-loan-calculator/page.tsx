import type { Metadata } from "next";
import { Suspense } from "react";
import { ogImages } from "../../../lib/og";
import ToolPageBottom from "../../components/ToolPageBottom";
import Client from "./Client";

export function generateMetadata(): Metadata {
	const title = "Home Loan & Amortization Calculator | PHTools";
	const description =
		"Compute your monthly commercial bank home loan payments, interest rates, down payments, and loan terms in the Philippines.";

	return {
		title,
		description,
		openGraph: {
			images: ogImages({
				tool: "home-loan-calculator",
				title,
				desc: description,
			}),
		},
	};
}

export default async function HomeLoanCalculatorPage() {
	const jsonLd = {
		"@context": "https://schema.org",
		"@type": "SoftwareApplication",
		name: "Home Loan & Amortization Calculator",
		applicationCategory: "FinanceApplication",
		operatingSystem: "All",
		description:
			"Calculate commercial bank mortgage amortization, monthly interest breakdowns, and home loan payoffs.",
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
				<ToolPageBottom slug="philippine-home-loan-guide-bank-comparison" />
			</Suspense>
		</>
	);
}
