import type { Metadata } from "next";
import { Suspense } from "react";
import Client from "./Client";
import ToolArticle from "../../components/ToolArticle";

export async function generateMetadata({
	searchParams,
}: {
	searchParams: Promise<{
		price?: string;
		down?: string;
		rate?: string;
		term?: string;
	}>;
}): Promise<Metadata> {
	const resolvedParams = await searchParams;
	const title = "Home Loan & Amortization Calculator | PHTools";
	const description =
		"Compute your monthly commercial bank home loan payments, interest rates, down payments, and loan terms in the Philippines.";

	let ogUrl = `/api/og?title=${encodeURIComponent(
		title,
	)}&desc=${encodeURIComponent(description)}`;

	if (resolvedParams.price) {
		const price = parseFloat(resolvedParams.price) || 0;
		const term = parseInt(resolvedParams.term || "20", 10) || 20;
		const formatAmount = (val: number) =>
			new Intl.NumberFormat("en-PH", {
				style: "currency",
				currency: "PHP",
				maximumFractionDigits: 0,
			}).format(val);

		ogUrl += `&s1l=Property%20Price&s1v=${encodeURIComponent(
			formatAmount(price),
		)}`;
		ogUrl += `&s2l=Loan%20Term&s2v=${encodeURIComponent(`${term.toString()}y`)}`;
	} else {
		ogUrl +=
			"&s1l=Property%20Price&s1v=%E2%82%B15%2C000%2C000&s2l=Loan%20Term&s2v=20y";
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
			<ToolArticle slug="philippine-home-loan-guide-bank-comparison" />
			</Suspense>
		</>
	);
}
