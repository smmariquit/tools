import type { Metadata } from "next";
import Client from "./Client";
import ToolFooter from "../../components/ToolFooter";

export async function generateMetadata({
	searchParams,
}: {
	searchParams: Promise<{ mv?: string; type?: string; loc?: string }>;
}): Promise<Metadata> {
	const resolvedParams = await searchParams;
	const title = "Amilyar (Real Property Tax) Calculator | PHTools";
	const description =
		"Estimate your annual Philippine Real Property Tax (RPT) including the Special Education Fund (SEF) based on Local Government Code rates.";

	let ogUrl = `/api/og?title=${encodeURIComponent(
		title,
	)}&desc=${encodeURIComponent(description)}`;

	if (resolvedParams.mv || resolvedParams.type || resolvedParams.loc) {
		const marketValue = parseFloat(resolvedParams.mv || "2000000") || 0;
		const propertyType = resolvedParams.type || "residential";
		const location = resolvedParams.loc || "metroManila";

		const assessmentLevels: Record<string, number> = {
			residential: 0.2,
			commercial: 0.5,
			agricultural: 0.4,
		};
		const rptRates: Record<string, number> = {
			metroManila: 0.02,
			province: 0.01,
		};

		const assessmentLevel = assessmentLevels[propertyType] || 0.2;
		const basicRptRate = rptRates[location] || 0.02;

		const assessedValue = marketValue * assessmentLevel;
		const basicRpt = assessedValue * basicRptRate;
		const sefTax = assessedValue * 0.01;
		const totalAmilyar = basicRpt + sefTax;

		const formatAmount = (val: number) =>
			new Intl.NumberFormat("en-PH", {
				style: "currency",
				currency: "PHP",
				maximumFractionDigits: 0,
			}).format(val);

		ogUrl += `&s1l=Market%20Value&s1v=${encodeURIComponent(formatAmount(marketValue))}`;
		ogUrl += `&s2l=Type&s2v=${encodeURIComponent(propertyType.charAt(0).toUpperCase() + propertyType.slice(1))}`;
		ogUrl += `&s3l=Annual%20Tax&s3v=${encodeURIComponent(formatAmount(totalAmilyar))}`;
	} else {
		ogUrl += "&s1l=Market%20Value&s1v=%E2%82%B12%2C000%2C000&s2l=Type&s2v=Residential&s3l=Annual%20Tax&s3v=%E2%82%B112%2C000";
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

export default async function AmilyarPage() {
	const jsonLd = {
		"@context": "https://schema.org",
		"@type": "SoftwareApplication",
		name: "Amilyar (Real Property Tax) Calculator",
		applicationCategory: "BusinessApplication",
		operatingSystem: "All",
		description:
			"Estimate your annual Philippine Real Property Tax (RPT) including the Special Education Fund (SEF) based on Local Government Code rates.",
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
			<Client />
			<ToolFooter currentPath="/amilyar-calculator" />
		</>
	);
}
