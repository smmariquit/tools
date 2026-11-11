import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Suspense } from "react";
import { ogImages } from "../../../lib/og";
import ToolPageBottom from "../../components/ToolPageBottom";
import TaxOptimizerClient from "./Client";

export async function generateMetadata({
	params,
}: {
	params: Promise<{ locale: string }>;
}): Promise<Metadata> {
	const { locale } = await params;
	const t = await getTranslations({ locale, namespace: "TaxOptimizer" });

	return {
		title: t("title"),
		description: t("subtitle"),
		openGraph: {
			images: ogImages({
				tool: "tax-optimizer-calculator",
				title: t("title"),
				desc: t("subtitle"),
			}),
		},
	};
}

export default async function TaxOptimizerCalculatorPage({
	params,
}: {
	params: Promise<{ locale: string }>;
}) {
	setRequestLocale((await params).locale);
	return (
		<>
			<Suspense fallback={<div className="loading">Loading...</div>}>
				<TaxOptimizerClient />
			</Suspense>
			<ToolPageBottom slug="philippine-tax-classification-guide" />
		</>
	);
}
