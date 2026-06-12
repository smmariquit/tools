import type { Metadata } from "next";
import { Suspense } from "react";
import Client from "./Client";

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
	const title = "Car Loan & Amortization Calculator | PHTools";
	const description =
		"Compare bank vs in-house auto loans, down payment, monthly amortization, and interest costs in the Philippines.";

	let ogUrl = `/api/og?title=${encodeURIComponent(
		title,
	)}&desc=${encodeURIComponent(description)}`;

	if (resolvedParams.price) {
		const price = parseFloat(resolvedParams.price) || 0;
		const term = parseInt(resolvedParams.term || "5", 10) || 5;
		const formatAmount = (val: number) =>
			new Intl.NumberFormat("en-PH", {
				style: "currency",
				currency: "PHP",
				maximumFractionDigits: 0,
			}).format(val);

		ogUrl += `&s1l=Vehicle%20Price&s1v=${encodeURIComponent(
			formatAmount(price),
		)}`;
		ogUrl += `&s2l=Loan%20Term&s2v=${encodeURIComponent(`${term.toString()}y`)}`;
	} else {
		ogUrl +=
			"&s1l=Vehicle%20Price&s1v=%E2%82%B11%2C200%2C000&s2l=Loan%20Term&s2v=5y";
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
			</Suspense>
		</>
	);
}
