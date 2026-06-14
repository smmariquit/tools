import type { Metadata } from "next";
import { Suspense } from "react";
import Client from "./Client";
import ToolArticle from "../../components/ToolArticle";

export async function generateMetadata({
	searchParams,
}: {
	searchParams: Promise<{ salary?: string; mp2?: string; rate?: string }>;
}): Promise<Metadata> {
	const resolvedParams = await searchParams;
	const title = "Pag-IBIG MP2 & Regular Contribution Calculator | PHTools";
	const description =
		"Estimate your Pag-IBIG MP2 savings dividends and standard housing loan amortization.";

	let ogUrl = `/api/og?title=${encodeURIComponent(
		title,
	)}&desc=${encodeURIComponent(description)}`;

	if (resolvedParams.salary || resolvedParams.mp2 || resolvedParams.rate) {
		const basicSalary = parseFloat(resolvedParams.salary || "20000") || 0;
		const mp2Monthly = parseFloat(resolvedParams.mp2 || "1000") || 0;
		const dividendRate = parseFloat(resolvedParams.rate || "7") || 0;

		const formatAmount = (val: number) =>
			new Intl.NumberFormat("en-PH", {
				style: "currency",
				currency: "PHP",
				maximumFractionDigits: 0,
			}).format(val);

		// Regular Pag-IBIG
		const regularFundSalary =
			basicSalary > 0 ? Math.min(basicSalary, 10000) : 0;
		const employeeRate =
			basicSalary === 0 ? 0 : basicSalary <= 1500 ? 0.01 : 0.02;
		const regularEE = regularFundSalary * employeeRate;

		// MP2 logic
		let cumulativeSavings = 0;
		let cumulativeDividends = 0;
		const annualDeposit = mp2Monthly * 12;
		const rate = dividendRate / 100;

		for (let year = 1; year <= 5; year++) {
			const previousTotal = cumulativeSavings + cumulativeDividends;
			const dividendForYear = previousTotal * rate + annualDeposit * rate * 0.5;
			cumulativeDividends += dividendForYear;
			cumulativeSavings += annualDeposit;
		}

		const mp2Total = cumulativeSavings + cumulativeDividends;

		ogUrl += `&s1l=MP2%20Total&s1v=${encodeURIComponent(formatAmount(mp2Total))}`;
		ogUrl += `&s2l=Reg%20Contribution&s2v=${encodeURIComponent(formatAmount(regularEE))}`;
		ogUrl += `&s3l=Div%20Rate&s3v=${encodeURIComponent(`${dividendRate}%`)}`;
	} else {
		ogUrl +=
			"&s1l=MP2%20Total&s1v=%E2%82%B171k&s2l=Reg%20Contribution&s2v=%E2%82%B1200&s3l=Div%20Rate&s3v=7%25";
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

export default async function PagIbigPage() {
	const jsonLd = {
		"@context": "https://schema.org",
		"@type": "SoftwareApplication",
		name: "Pag-IBIG Contribution & MP2 Calculator",
		applicationCategory: "FinanceApplication",
		operatingSystem: "All",
		description:
			"Estimate your Pag-IBIG MP2 savings dividends and standard housing loan amortization.",
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
			<ToolArticle slug="pagibig-contribution-table-2026" />
			</Suspense>
		</>
	);
}
