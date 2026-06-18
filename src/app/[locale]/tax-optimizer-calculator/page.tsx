import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { Suspense } from "react";
import { ogImages } from "../../../lib/og";
import ToolPageBottom from "../../components/ToolPageBottom";
import TaxOptimizerClient from "./Client";

export async function generateMetadata({
	params: { locale },
}: {
	params: { locale: string };
}): Promise<Metadata> {
	const t = await getTranslations({ locale, namespace: "TaxOptimizer" });

	return {
		title: t("title"),
		description: t("subtitle"),
		alternates: {
			canonical: `https://phtools.me/${locale}/tax-optimizer-calculator`,
		},
		openGraph: {
			images: ogImages({
				tool: "tax-optimizer-calculator",
				title: t("title"),
				desc: t("subtitle"),
			}),
		},
	};
}

export default function TaxOptimizerCalculatorPage() {
	return (
		<>
			<Suspense fallback={<div className="loading">Loading...</div>}>
				<TaxOptimizerClient />
			</Suspense>
			<ToolPageBottom slug="philippine-tax-classification-guide" />
		</>
	);
}
