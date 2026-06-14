import { Suspense } from "react";
import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import PagibigMP2Client from "./Client";
import ToolArticle from "../../components/ToolArticle";

export async function generateMetadata({
	params: { locale },
}: {
	params: { locale: string };
}): Promise<Metadata> {
	const t = await getTranslations({ locale, namespace: "PagibigMP2" });

	return {
		title: t("title"),
		description: t("subtitle"),
		alternates: {
			canonical: `https://phtools.com/${locale}/pagibig-mp2-calculator`,
		},
	};
}

export default function PagibigMP2CalculatorPage() {
	return <Suspense fallback={<div className="loading">Loading...</div>}><PagibigMP2Client /></Suspense>;
}
