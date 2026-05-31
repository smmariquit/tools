import { Suspense } from "react";
import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import DigitalBankClient from "./Client";

export async function generateMetadata({
	params: { locale },
}: {
	params: { locale: string };
}): Promise<Metadata> {
	const t = await getTranslations({ locale, namespace: "DigitalBank" });

	return {
		title: t("title"),
		description: t("subtitle"),
		alternates: {
			canonical: `https://phtools.com/${locale}/digital-bank-calculator`,
		},
	};
}

export default function DigitalBankCalculatorPage() {
	return <Suspense fallback={<div className="loading">Loading...</div>}><DigitalBankClient /></Suspense>;
}
