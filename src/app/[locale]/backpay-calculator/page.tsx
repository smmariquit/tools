import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { Suspense } from "react";
import { ogImages } from "../../../lib/og";
import ToolPageBottom from "../../components/ToolPageBottom";
import BackpayClient from "./Client";

export async function generateMetadata({
	params,
}: {
	params: Promise<{ locale: string }>;
}): Promise<Metadata> {
	const { locale } = await params;
	const t = await getTranslations({ locale, namespace: "BackpayCalculator" });

	return {
		title: t("title"),
		description: t("subtitle"),
		openGraph: {
			images: ogImages({
				tool: "backpay-calculator",
				title: t("title"),
				desc: t("subtitle"),
			}),
		},
	};
}

export default function BackpayCalculatorPage() {
	return (
		<>
			<Suspense fallback={<div className="loading">Loading...</div>}>
				<BackpayClient />
			</Suspense>
			<ToolPageBottom slug="philippine-backpay-computation-guide" />
		</>
	);
}
