import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { Suspense } from "react";
import { ogImages } from "../../../lib/og";
import ToolPageBottom from "../../components/ToolPageBottom";
import FreelanceRateClient from "./Client";

export async function generateMetadata({
	params,
}: {
	params: Promise<{ locale: string }>;
}): Promise<Metadata> {
	const { locale } = await params;
	const t = await getTranslations({ locale, namespace: "FreelanceRate" });

	return {
		title: t("title"),
		description: t("subtitle"),
		openGraph: {
			images: ogImages({
				tool: "freelance-rate-calculator",
				title: t("title"),
				desc: t("subtitle"),
			}),
		},
	};
}

export default function FreelanceRateCalculatorPage() {
	return (
		<>
			<Suspense fallback={<div className="loading">Loading...</div>}>
				<FreelanceRateClient />
			</Suspense>
			<ToolPageBottom slug="freelance-hourly-rate-guide" />
		</>
	);
}
