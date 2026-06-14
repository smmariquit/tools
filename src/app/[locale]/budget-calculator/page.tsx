import type { Metadata } from "next";
import { Suspense } from "react";
import Client from "./Client";
import ToolArticle from "../../components/ToolArticle";

export async function generateMetadata({
	searchParams,
}: {
	searchParams: Promise<{ net?: string }>;
}): Promise<Metadata> {
	const resolvedParams = await searchParams;
	const title = "Budget & Reverse Salary Calculator | PHTools";
	const description =
		"List your monthly expenses and find out what gross salary you should ask for in your next job interview.";

	let ogUrl = `/api/og?title=${encodeURIComponent(
		title,
	)}&desc=${encodeURIComponent(description)}`;

	if (resolvedParams.net) {
		const targetNet = parseFloat(resolvedParams.net) || 0;
		const formatAmount = (val: number) =>
			new Intl.NumberFormat("en-PH", {
				style: "currency",
				currency: "PHP",
				maximumFractionDigits: 0,
			}).format(val);

		ogUrl += `&s1l=Target%20Net%20Pay&s1v=${encodeURIComponent(
			formatAmount(targetNet),
		)}`;
		ogUrl += `&s2l=Ask%20For&s2v=${encodeURIComponent("See Result")}`;
	} else {
		ogUrl +=
			"&s1l=Target%20Net%20Pay&s1v=%E2%82%B130%2C000&s2l=Ask%20For&s2v=%E2%82%B140%2C000%2B";
	}

	return {
		title,
		description,
		openGraph: {
			images: [
				{
					url: ogUrl,
					width: 1200,
					height: 630,
				},
			],
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
			<ToolArticle slug="budget-reverse-salary-calculator-guide" />
			</Suspense>
		</>
	);
}
