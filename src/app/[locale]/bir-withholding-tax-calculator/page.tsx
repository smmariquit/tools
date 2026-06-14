import { Suspense } from "react";
import { getTranslations, setRequestLocale } from "next-intl/server";
import BIRWithholdingTaxClient from "./Client";
import ToolArticle from "../../components/ToolArticle";

export async function generateMetadata({
	params: { locale },
}: {
	params: { locale: string };
}) {
	const t = await getTranslations({ locale, namespace: "BIRWithholdingTax" });
	return {
		title: t("title"),
		description: t("subtitle"),
	};
}

export default function Page({
	params: { locale },
}: {
	params: { locale: string };
}) {
	setRequestLocale(locale);
	return <Suspense fallback={<div className="loading">Loading...</div>}><BIRWithholdingTaxClient /></Suspense>;
}
