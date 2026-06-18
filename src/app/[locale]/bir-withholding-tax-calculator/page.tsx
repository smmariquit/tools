import { getTranslations, setRequestLocale } from "next-intl/server";
import { Suspense } from "react";
import { ogImages } from "../../../lib/og";
import ToolPageBottom from "../../components/ToolPageBottom";
import BIRWithholdingTaxClient from "./Client";

export async function generateMetadata({
	params: { locale },
}: {
	params: { locale: string };
}) {
	const t = await getTranslations({ locale, namespace: "BIRWithholdingTax" });
	return {
		title: t("title"),
		description: t("subtitle"),
		openGraph: {
			images: ogImages({
				tool: "bir-withholding-tax-calculator",
				title: t("title"),
				desc: t("subtitle"),
			}),
		},
	};
}

export default function Page({
	params: { locale },
}: {
	params: { locale: string };
}) {
	setRequestLocale(locale);
	return (
		<>
			<Suspense fallback={<div className="loading">Loading...</div>}>
				<BIRWithholdingTaxClient />
			</Suspense>
			<ToolPageBottom slug="bir-withholding-tax-guide" />
		</>
	);
}
