import { Suspense } from "react";
import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import OvertimePayClient from "./Client";

export async function generateMetadata({
	params: { locale },
}: {
	params: { locale: string };
}): Promise<Metadata> {
	const t = await getTranslations({ locale, namespace: "OvertimePay" });

	return {
		title: t("title"),
		description: t("subtitle"),
		alternates: {
			canonical: `https://phtools.com/${locale}/overtime-pay-calculator`,
		},
	};
}

export default function OvertimePayCalculatorPage() {
	return <Suspense fallback={<div className="loading">Loading...</div>}><OvertimePayClient /></Suspense>;
}
