import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { ogImages } from "../../../lib/og";
import ToolPageBottom from "../../components/ToolPageBottom";
import Client from "./Client";

export async function generateMetadata({
	params,
}: {
	params: Promise<{ locale: string }>;
}): Promise<Metadata> {
	const { locale } = await params;
	const t = await getTranslations({ locale, namespace: "FoodCost" });
	const title = t("metaTitle");
	const description = t("metaDescription");

	return {
		title,
		description,
		openGraph: {
			images: ogImages({
				tool: "food-cost-calculator",
				title,
				desc: description,
			}),
		},
	};
}

export default function FoodCostCalculatorPage() {
	const jsonLd = {
		"@context": "https://schema.org",
		"@type": "SoftwareApplication",
		name: "Food Cost & Pricing Calculator",
		applicationCategory: "BusinessApplication",
		operatingSystem: "All",
		description:
			"Calculate recipe costs and food business profit margins, with VAT, service charge, and Senior/PWD discounts factored in.",
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
			<ToolPageBottom slug="food-costing-pricing-guide" />
		</>
	);
}
