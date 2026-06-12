import type { Metadata } from "next";
import { Suspense } from "react";
import Client from "./Client";

export async function generateMetadata({
	searchParams,
}: {
	searchParams: Promise<{
		platform?: string;
		price?: string;
		shipping?: string;
		fss?: string;
		ccb?: string;
	}>;
}): Promise<Metadata> {
	const resolvedParams = await searchParams;
	const title = "TikTok, Shopee & Lazada Seller Fee Calculator | PHTools";
	const description =
		"Calculate exact seller deductions (Commission, FSS, TikTok fees) and net payout.";

	let ogUrl = `/api/og?title=${encodeURIComponent(
		title,
	)}&desc=${encodeURIComponent(description)}`;

	if (
		resolvedParams.platform ||
		resolvedParams.price ||
		resolvedParams.shipping ||
		resolvedParams.fss ||
		resolvedParams.ccb
	) {
		const platform = resolvedParams.platform || "shopee";
		const itemPrice = parseFloat(resolvedParams.price || "1000") || 0;
		const shippingFee = parseFloat(resolvedParams.shipping || "50") || 0;
		const isFss = resolvedParams.fss === "true";
		const isCcb = resolvedParams.ccb === "true";

		const totalOrderAmount = itemPrice + shippingFee;
		const transactionFeeRate = 0.0224;
		const transactionFee = totalOrderAmount * transactionFeeRate;

		const commissionFeeRate =
			platform === "shopee" ? 0.05 : platform === "lazada" ? 0.045 : 0.04;
		const commissionFee = itemPrice * commissionFeeRate;

		const programFeeRate =
			(isFss ? (platform === "tiktok" ? 0.1 : 0.056) : 0) +
			(isCcb ? 0.0336 : 0);
		const programFee = itemPrice * programFeeRate;

		const totalDeductions = transactionFee + commissionFee + programFee;
		const netPayout = itemPrice - totalDeductions;
		const profitMargin = itemPrice > 0 ? (netPayout / itemPrice) * 100 : 0;

		const formatAmount = (val: number) =>
			new Intl.NumberFormat("en-PH", {
				style: "currency",
				currency: "PHP",
				maximumFractionDigits: 0,
			}).format(val);

		const platformNames = {
			shopee: "Shopee",
			lazada: "Lazada",
			tiktok: "TikTok Shop",
		};

		ogUrl += `&s1l=Platform&s1v=${encodeURIComponent(
			platformNames[platform as keyof typeof platformNames] || "Shopee",
		)}`;
		ogUrl += `&s2l=Item%20Price&s2v=${encodeURIComponent(formatAmount(itemPrice))}`;
		ogUrl += `&s3l=Net%20Payout&s3v=${encodeURIComponent(formatAmount(netPayout))}`;
	} else {
		ogUrl +=
			"&s1l=Platform&s1v=Shopee&s2l=Item%20Price&s2v=%E2%82%B11,000&s3l=Net%20Payout&s3v=%E2%82%B1926";
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

export default async function EcommerceFeePage() {
	const jsonLd = {
		"@context": "https://schema.org",
		"@type": "SoftwareApplication",
		name: "E-Commerce Seller Fee Calculator",
		applicationCategory: "BusinessApplication",
		operatingSystem: "All",
		description:
			"Calculate exact seller deductions (Commission, FSS, TikTok fees) and net payout.",
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
