import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { Suspense } from "react";
import { ogImages } from "../../../lib/og";
import ToolPageBottom from "../../components/ToolPageBottom";
import PagibigAffordabilityClient from "./Client";

export async function generateMetadata({
	params,
}: {
	params: Promise<{ locale: string }>;
}): Promise<Metadata> {
	const { locale } = await params;
	const t = await getTranslations({
		locale,
		namespace: "PagibigAffordability",
	});

	return {
		title: t("title"),
		description: t("subtitle"),
		openGraph: {
			images: ogImages({
				tool: "pagibig-affordability-calculator",
				title: t("title"),
				desc: t("subtitle"),
			}),
		},
	};
}

export default function PagibigAffordabilityCalculatorPage() {
	return (
		<>
			<Suspense fallback={<div className="loading">Loading...</div>}>
				<PagibigAffordabilityClient />
			</Suspense>
			<ToolPageBottom slug="pagibig-housing-loan-affordability-guide" />
		</>
	);
}
