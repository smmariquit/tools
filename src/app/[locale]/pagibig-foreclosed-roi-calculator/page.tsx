import type { Metadata } from "next";
import { Suspense } from "react";
import Client from "./Client";
import ToolArticle from "../../components/ToolArticle";

export async function generateMetadata({
	searchParams,
}: {
	searchParams: Promise<{
		price?: string;
		repair?: string;
		rent?: string;
		resale?: string;
	}>;
}): Promise<Metadata> {
	const resolvedParams = await searchParams;
	const title = "Pag-IBIG Foreclosed Property ROI Calculator | PHTools";
	const description =
		"Calculate potential rental yield and flipping returns for Pag-IBIG Acquired Assets.";

	let ogUrl = `/api/og?title=${encodeURIComponent(
		title,
	)}&desc=${encodeURIComponent(description)}`;

	if (
		resolvedParams.price ||
		resolvedParams.repair ||
		resolvedParams.rent ||
		resolvedParams.resale
	) {
		const purchasePrice = parseFloat(resolvedParams.price || "1000000") || 0;
		const repairCost = parseFloat(resolvedParams.repair || "200000") || 0;
		const monthlyRent = parseFloat(resolvedParams.rent || "12000") || 0;
		const resalePrice = parseFloat(resolvedParams.resale || "1800000") || 0;

		const totalInvestment = purchasePrice + repairCost;
		const annualRent = monthlyRent * 12;
		const grossRentalYield =
			totalInvestment > 0 ? (annualRent / totalInvestment) * 100 : 0;

		const capitalGainsTax = resalePrice * 0.06;
		const brokerFee = resalePrice * 0.05;
		const netResale = resalePrice - capitalGainsTax - brokerFee;

		const flippingProfit = netResale - totalInvestment;
		const flippingRoi =
			totalInvestment > 0 ? (flippingProfit / totalInvestment) * 100 : 0;

		const formatAmount = (val: number) =>
			new Intl.NumberFormat("en-PH", {
				style: "currency",
				currency: "PHP",
				maximumFractionDigits: 0,
			}).format(val);

		ogUrl += `&s1l=Total%20Capital&s1v=${encodeURIComponent(formatAmount(totalInvestment))}`;
		ogUrl += `&s2l=Rental%20Yield&s2v=${encodeURIComponent(`${grossRentalYield.toFixed(2)}%`)}`;
		ogUrl += `&s3l=Flipping%20ROI&s3v=${encodeURIComponent(`${flippingRoi.toFixed(2)}%`)}`;
	} else {
		ogUrl +=
			"&s1l=Total%20Capital&s1v=%E2%82%B11.2M&s2l=Rental%20Yield&s2v=12.00%25&s3l=Flipping%20ROI&s3v=33.50%25";
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

export default async function PagibigRoiPage() {
	const jsonLd = {
		"@context": "https://schema.org",
		"@type": "SoftwareApplication",
		name: "Pag-IBIG Foreclosed Property ROI Calculator",
		applicationCategory: "FinanceApplication",
		operatingSystem: "All",
		description:
			"Calculate potential rental yield and flipping returns for Pag-IBIG Acquired Assets.",
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
			<ToolArticle slug="pagibig-foreclosed-property-roi" />
			</Suspense>
		</>
	);
}
