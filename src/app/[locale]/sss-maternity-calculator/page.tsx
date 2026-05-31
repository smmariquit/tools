import { Suspense } from "react";
import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import SSSMaternityClient from "./Client";

export async function generateMetadata({
	params: { locale },
}: {
	params: { locale: string };
}): Promise<Metadata> {
	const t = await getTranslations({ locale, namespace: "SSSMaternity" });

	return {
		title: t("title"),
		description: t("subtitle"),
		alternates: {
			canonical: `https://phtools.com/${locale}/sss-maternity-calculator`,
		},
	};
}

export default function SSSMaternityCalculatorPage() {
	return <Suspense fallback={<div className="loading">Loading...</div>}><SSSMaternityClient /></Suspense>;
}
