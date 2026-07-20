import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { Suspense } from "react";
import { ogImages } from "../../../lib/og";
import ToolPageBottom from "../../components/ToolPageBottom";
import DigitalBankClient from "./Client";

export async function generateMetadata({
	params,
}: {
	params: Promise<{ locale: string }>;
}): Promise<Metadata> {
	const { locale } = await params;
	const t = await getTranslations({ locale, namespace: "DigitalBank" });

	return {
		title: t("title"),
		description: t("subtitle"),
		openGraph: {
			images: ogImages({
				tool: "digital-bank-calculator",
				title: t("title"),
				desc: t("subtitle"),
			}),
		},
	};
}

export default function DigitalBankCalculatorPage() {
	return (
		<>
			<Suspense fallback={<div className="loading">Loading...</div>}>
				<DigitalBankClient />
			</Suspense>
			<ToolPageBottom slug="digital-banks-philippines-interest-rates" />
		</>
	);
}
