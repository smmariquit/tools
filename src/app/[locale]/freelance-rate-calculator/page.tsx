import { Suspense } from "react";
import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import FreelanceRateClient from "./Client";
import ToolArticle from "../../components/ToolArticle";

export async function generateMetadata({
	params: { locale },
}: {
	params: { locale: string };
}): Promise<Metadata> {
	const t = await getTranslations({ locale, namespace: "FreelanceRate" });

	return {
		title: t("title"),
		description: t("subtitle"),
		alternates: {
			canonical: `https://phtools.com/${locale}/freelance-rate-calculator`,
		},
	};
}

export default function FreelanceRateCalculatorPage() {
	return <Suspense fallback={<div className="loading">Loading...</div>}><FreelanceRateClient /></Suspense>;
}
