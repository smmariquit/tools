import type { Metadata } from "next";
import { Suspense } from "react";
import Client from "./Client";
import ToolArticle from "../../components/ToolArticle";

export async function generateMetadata({
	searchParams,
}: {
	searchParams: Promise<{
		currency?: string;
		usd?: string;
		rate?: string;
		php?: string;
		upwork?: string;
	}>;
}): Promise<Metadata> {
	const resolvedParams = await searchParams;
	const title = "Freelance 8% Tax Calculator (BIR) | PHTools";
	const description =
		"Calculate your net income and tax due as a freelancer or self-employed professional in the Philippines under the BIR 8% flat rate option.";

	let ogUrl = `/api/og?title=${encodeURIComponent(
		title,
	)}&desc=${encodeURIComponent(description)}`;

	if (resolvedParams.currency || resolvedParams.usd || resolvedParams.php) {
		const currencyMode = resolvedParams.currency || "usd";
		const usdIncome = parseFloat(resolvedParams.usd || "2000") || 0;
		const forexRate = parseFloat(resolvedParams.rate || "57.50") || 0;
		const phpGrossIncome = parseFloat(resolvedParams.php || "100000") || 0;
		const includeUpwork = resolvedParams.upwork !== "false";

		const platformFeeRate = 0.1;
		const platformFeeUsd = includeUpwork ? usdIncome * platformFeeRate : 0;
		const netUsd = usdIncome - platformFeeUsd;

		const totalPhp =
			currencyMode === "usd" ? netUsd * forexRate : phpGrossIncome;
		const eightPercentTax = totalPhp * 0.08;
		const netIncome8Percent = totalPhp - eightPercentTax;

		const formatAmount = (val: number) =>
			new Intl.NumberFormat("en-PH", {
				style: "currency",
				currency: "PHP",
				maximumFractionDigits: 0,
			}).format(val);

		ogUrl += `&s1l=Gross%20Income&s1v=${encodeURIComponent(currencyMode === "usd" ? `$${usdIncome}` : formatAmount(phpGrossIncome))}`;
		ogUrl += `&s2l=8%25%20BIR%20Tax&s2v=${encodeURIComponent(formatAmount(eightPercentTax))}`;
		ogUrl += `&s3l=Net%20Take%20Home&s3v=${encodeURIComponent(formatAmount(netIncome8Percent))}`;
	} else {
		ogUrl +=
			"&s1l=Gross%20Income&s1v=%242%2C000&s2l=8%25%20BIR%20Tax&s2v=%E2%82%B18%2C280&s3l=Net%20Take%20Home&s3v=%E2%82%B195%2C220";
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
			<ToolArticle slug="upwork-freelance-tax-guide" />
			</Suspense>
		</>
	);
}
