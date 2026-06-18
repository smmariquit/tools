import type { Metadata } from "next";
import { Suspense } from "react";
import { ogImages } from "../../../lib/og";
import ToolPageBottom from "../../components/ToolPageBottom";
import Client from "./Client";

export function generateMetadata(): Metadata {
	const title = "Car Loan & Amortization Calculator | PHTools";
	const description =
		"Compare bank vs in-house auto loans, down payment, monthly amortization, and interest costs in the Philippines.";

	return {
		title,
		description,
		openGraph: {
			images: ogImages({
				tool: "car-loan-calculator",
				title,
				desc: description,
			}),
		},
	};
}

export default async function CarLoanCalculatorPage() {
	const jsonLd = {
		"@context": "https://schema.org",
		"@type": "SoftwareApplication",
		name: "Car Loan & Amortization Calculator",
		applicationCategory: "FinanceApplication",
		operatingSystem: "All",
		description:
			"Calculate monthly payments, down payments, interest costs, and bank vs in-house comparisons for car purchases.",
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
				<ToolPageBottom slug="philippine-car-loan-guide-bank-vs-dealer" />
			</Suspense>
		</>
	);
}
