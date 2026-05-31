import { Suspense } from "react";
import { getTranslations, setRequestLocale } from "next-intl/server";
import GSISPensionClient from "./Client";

export async function generateMetadata({
	params: { locale },
}: {
	params: { locale: string };
}) {
	const t = await getTranslations({ locale, namespace: "GSISPension" });
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
	return <Suspense fallback={<div className="loading">Loading...</div>}><GSISPensionClient /></Suspense>;
}
