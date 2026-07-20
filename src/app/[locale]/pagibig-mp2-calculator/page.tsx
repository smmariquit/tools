import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { Suspense } from "react";
import { ogImages } from "../../../lib/og";
import ToolPageBottom from "../../components/ToolPageBottom";
import PagibigMP2Client from "./Client";

export async function generateMetadata({
	params,
}: {
	params: Promise<{ locale: string }>;
}): Promise<Metadata> {
	const { locale } = await params;
	const t = await getTranslations({ locale, namespace: "PagibigMP2" });

	return {
		title: t("title"),
		description: t("subtitle"),
		openGraph: {
			images: ogImages({
				tool: "pagibig-mp2-calculator",
				title: t("title"),
				desc: t("subtitle"),
			}),
		},
	};
}

export default function PagibigMP2CalculatorPage() {
	return (
		<>
			<Suspense fallback={<div className="loading">Loading...</div>}>
				<PagibigMP2Client />
			</Suspense>
			<ToolPageBottom slug="pagibig-mp2-dividend-calculator" />
		</>
	);
}
