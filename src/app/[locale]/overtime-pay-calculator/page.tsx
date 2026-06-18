import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { Suspense } from "react";
import { ogImages } from "../../../lib/og";
import ToolPageBottom from "../../components/ToolPageBottom";
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
			canonical: `https://phtools.me/${locale}/overtime-pay-calculator`,
		},
		openGraph: {
			images: ogImages({
				tool: "overtime-pay-calculator",
				title: t("title"),
				desc: t("subtitle"),
			}),
		},
	};
}

export default function OvertimePayCalculatorPage() {
	return (
		<>
			<Suspense fallback={<div className="loading">Loading...</div>}>
				<OvertimePayClient />
			</Suspense>
			<ToolPageBottom slug="philippine-overtime-holiday-pay-guide" />
		</>
	);
}
