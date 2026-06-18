import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { Suspense } from "react";
import { ogImages } from "../../../lib/og";
import ToolPageBottom from "../../components/ToolPageBottom";
import Client from "./Client";

export async function generateMetadata({
	params,
}: {
	params: Promise<{ locale: string }>;
}): Promise<Metadata> {
	const { locale } = await params;
	const t = await getTranslations({ locale, namespace: "PagibigCalculator" });
	const title = t("metaTitle");
	const description = t("metaDescription");

	return {
		title,
		description,
		openGraph: {
			images: ogImages({
				tool: "pagibig-calculator",
				title,
				desc: description,
			}),
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
				<ToolPageBottom slug="pagibig-contribution-table-2026" />
			</Suspense>
		</>
	);
}
