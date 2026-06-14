import { Suspense } from "react";
import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import BackpayClient from "./Client";
import ToolArticle from "../../components/ToolArticle";

export async function generateMetadata({
	params: { locale },
}: {
	params: { locale: string };
}): Promise<Metadata> {
	const t = await getTranslations({ locale, namespace: "BackpayCalculator" });

	return {
		title: t("title"),
		description: t("subtitle"),
		alternates: {
			canonical: `https://phtools.com/${locale}/backpay-calculator`,
		},
	};
}

export default function BackpayCalculatorPage() {
	return <Suspense fallback={<div className="loading">Loading...</div>}><BackpayClient /></Suspense>;
}
