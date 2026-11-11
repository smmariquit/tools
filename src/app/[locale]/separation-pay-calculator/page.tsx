import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Suspense } from "react";
import { ogImages } from "../../../lib/og";
import ToolPageBottom from "../../components/ToolPageBottom";
import SeparationPayClient from "./Client";

export async function generateMetadata({
	params,
}: {
	params: Promise<{ locale: string }>;
}): Promise<Metadata> {
	const { locale } = await params;
	const t = await getTranslations({ locale, namespace: "SeparationPay" });

	return {
		title: t("title"),
		description: t("subtitle"),
		openGraph: {
			images: ogImages({
				tool: "separation-pay-calculator",
				title: t("title"),
				desc: t("subtitle"),
			}),
		},
	};
}

export default async function SeparationPayCalculatorPage({
	params,
}: {
	params: Promise<{ locale: string }>;
}) {
	setRequestLocale((await params).locale);
	return (
		<>
			<Suspense fallback={<div className="loading">Loading...</div>}>
				<SeparationPayClient />
			</Suspense>
			<ToolPageBottom slug="philippine-separation-pay-guide" />
		</>
	);
}
