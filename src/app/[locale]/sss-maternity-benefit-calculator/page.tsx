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
	const t = await getTranslations({ locale, namespace: "SSSMaternity" });
	const title = t("metaTitle");
	const description = t("metaDescription");

	return {
		title,
		description,
		openGraph: {
			images: ogImages({
				tool: "sss-maternity-benefit-calculator",
				title,
				desc: description,
			}),
		},
	};
}

export default function SssMaternityCalculatorPage() {
	const jsonLd = {
		"@context": "https://schema.org",
		"@type": "FinancialProduct",
		name: "SSS Maternity Benefit Estimator",
		description:
			"Calculate your expected SSS Maternity Cash Benefit based on the Expanded Maternity Leave Law (RA 11210).",
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
			<ToolPageBottom slug="sss-maternity-benefit-guide" />
		</>
	);
}
