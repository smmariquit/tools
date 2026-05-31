import type { Metadata } from "next";
import { Suspense } from "react";
import ToolFooter from "../../components/ToolFooter";
import Client from "./Client";

export async function generateMetadata({
	searchParams,
}: {
	searchParams: Promise<{
		dist?: string;
		eff?: string;
		price?: string;
		pax?: string;
	}>;
}): Promise<Metadata> {
	const resolvedParams = await searchParams;
	const title = "Philippine Fuel Cost & Trip Calculator | PHTools";
	const description =
		"Estimate your gas expenses for road trips in the Philippines. Perfect for dividing costs among friends (ambagan).";

	let ogUrl = `/api/og?title=${encodeURIComponent(
		title,
	)}&desc=${encodeURIComponent(description)}`;

	if (resolvedParams.dist || resolvedParams.eff || resolvedParams.price) {
		const distance = parseFloat(resolvedParams.dist || "250") || 0;
		const efficiency = parseFloat(resolvedParams.eff || "12") || 0;
		const fuelPrice = parseFloat(resolvedParams.price || "65") || 0;
		const passengers = parseInt(resolvedParams.pax || "4", 10) || 1;

		const litersNeeded = efficiency > 0 ? distance / efficiency : 0;
		const totalFuelCost = litersNeeded * fuelPrice;
		const costPerPerson =
			passengers > 0 ? totalFuelCost / passengers : totalFuelCost;

		const formatAmount = (val: number) =>
			new Intl.NumberFormat("en-PH", {
				style: "currency",
				currency: "PHP",
				maximumFractionDigits: 0,
			}).format(val);

		ogUrl += `&s1l=Distance&s1v=${encodeURIComponent(`${distance} km`)}`;
		ogUrl += `&s2l=Total%20Cost&s2v=${encodeURIComponent(formatAmount(totalFuelCost))}`;
		ogUrl += `&s3l=Cost%20per%20Pax&s3v=${encodeURIComponent(formatAmount(costPerPerson))}`;
	} else {
		ogUrl +=
			"&s1l=Distance&s1v=250%20km&s2l=Total%20Cost&s2v=%E2%82%B11%2C354&s3l=Cost%20per%20Pax&s3v=%E2%82%B1338";
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

export default async function FuelCostPage() {
	const jsonLd = {
		"@context": "https://schema.org",
		"@type": "SoftwareApplication",
		name: "Philippine Fuel Cost Calculator",
		applicationCategory: "TravelApplication",
		operatingSystem: "All",
		description:
			"Estimate your gas expenses for road trips in the Philippines. Perfect for dividing costs among friends (ambagan).",
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
			<ToolFooter currentPath="/fuel-cost-calculator" />
		</>
	);
}
