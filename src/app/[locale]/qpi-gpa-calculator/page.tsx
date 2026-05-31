import { Suspense } from "react";
import { setRequestLocale } from "next-intl/server";
import QPIGPAClient from "./Client";
import { getTranslations } from "next-intl/server";

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }) {
	const t = await getTranslations({ locale, namespace: "QPIGPA" });
	return {
		title: t("title"),
		description: t("subtitle"),
	};
}

export default function Page({ params: { locale } }: { params: { locale: string } }) {
	setRequestLocale(locale);
	return <Suspense fallback={<div className="loading">Loading...</div>}><QPIGPAClient /></Suspense>;
}
