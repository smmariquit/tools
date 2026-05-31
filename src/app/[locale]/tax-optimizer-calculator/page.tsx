import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
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
			canonical: `https://phtools.com/${locale}/tax-optimizer-calculator`,
		},
	};
}

export default function TaxOptimizerCalculatorPage() {
	return <TaxOptimizerClient />;
}
