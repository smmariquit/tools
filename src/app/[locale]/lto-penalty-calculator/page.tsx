import type { Metadata } from "next";
import { Suspense } from "react";
import Client from "./Client";
import ToolArticle from "../../components/ToolArticle";

export async function generateMetadata({
	searchParams,
}: {
	searchParams: Promise<{ vehicle?: string; months?: string }>;
}): Promise<Metadata> {
	const resolvedParams = await searchParams;
	const title = "LTO Late Registration Penalty Calculator | PHTools";
	const description =
		"Check exactly how much your MVUC fine is for late vehicle registration in the Philippines.";

	let ogUrl = `/api/og?title=${encodeURIComponent(
		title,
	)}&desc=${encodeURIComponent(description)}`;

	if (resolvedParams.vehicle || resolvedParams.months) {
		const vehicleType =
			(resolvedParams.vehicle as
				| "motorcycle"
				| "carLight"
				| "carMedium"
				| "carHeavy") || "motorcycle";
		const monthsLate = parseInt(resolvedParams.months || "1", 10) || 0;

		const mvucRates = {
			motorcycle: 240,
			carLight: 1600,
			carMedium: 3600,
			carHeavy: 8000,
		};

		const baseMvuc = mvucRates[vehicleType] || 240;
		let penalty = 0;

		if (monthsLate > 0) {
			if (monthsLate <= 12) {
				penalty = baseMvuc * 0.5;
			} else {
				const yearsLate = Math.ceil(monthsLate / 12);
				penalty = baseMvuc * (0.5 * yearsLate);
			}
		}

		const lrfFee = 10;
		const computerFee = 169.06;
		const totalDue = baseMvuc + penalty + lrfFee + computerFee;

		const formatAmount = (val: number) =>
			new Intl.NumberFormat("en-PH", {
				style: "currency",
				currency: "PHP",
				maximumFractionDigits: 0,
			}).format(val);

		const vehicleNames = {
			motorcycle: "Motorcycle",
			carLight: "Light Car",
			carMedium: "Medium Car",
			carHeavy: "Heavy Car",
		};

		ogUrl += `&s1l=Vehicle&s1v=${encodeURIComponent(vehicleNames[vehicleType])}`;
		ogUrl += `&s2l=Penalty&s2v=${encodeURIComponent(formatAmount(penalty))}`;
		ogUrl += `&s3l=Total%20Due&s3v=${encodeURIComponent(formatAmount(totalDue))}`;
	} else {
		ogUrl +=
			"&s1l=Vehicle&s1v=Motorcycle&s2l=Penalty&s2v=%E2%82%B1120&s3l=Total%20Due&s3v=%E2%82%B1539";
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

export default async function LtoPenaltyPage() {
	const jsonLd = {
		"@context": "https://schema.org",
		"@type": "SoftwareApplication",
		name: "LTO Penalty Calculator",
		applicationCategory: "UtilityApplication",
		operatingSystem: "All",
		description:
			"Check exactly how much your MVUC fine is for late vehicle registration in the Philippines.",
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
			<ToolArticle slug="lto-late-registration-penalty" />
			</Suspense>
		</>
	);
}
