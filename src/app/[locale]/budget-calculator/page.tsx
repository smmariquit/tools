import type { Metadata } from "next";
import { Suspense } from "react";
import { ogImages } from "../../../lib/og";
import ToolPageBottom from "../../components/ToolPageBottom";
import Client from "./Client";

export function generateMetadata(): Metadata {
	const title = "Budget & Reverse Salary Calculator | PHTools";
	const description =
		"List your monthly expenses and find out what gross salary you should ask for in your next job interview.";

	return {
		title,
		description,
		openGraph: {
			images: ogImages({
				tool: "budget-calculator",
				title,
				desc: description,
			}),
		},
	};
}

export default async function BudgetCalculatorPage() {
	const jsonLd = {
		"@context": "https://schema.org",
		"@type": "SoftwareApplication",
		name: "Budget & Reverse Salary Calculator",
		applicationCategory: "FinanceApplication",
		operatingSystem: "All",
		description:
			"List your monthly expenses and find out what gross salary you should negotiate in the Philippines.",
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
				<ToolPageBottom slug="budget-reverse-salary-calculator-guide" />
			</Suspense>
		</>
	);
}
