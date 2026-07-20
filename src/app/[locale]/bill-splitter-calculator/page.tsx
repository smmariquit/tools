import { getTranslations, setRequestLocale } from "next-intl/server";
import { Suspense } from "react";
import { ogImages } from "../../../lib/og";
import ToolPageBottom from "../../components/ToolPageBottom";
import BillSplitterClient from "./Client";

export async function generateMetadata({
	params,
}: {
	params: Promise<{ locale: string }>;
}) {
	const { locale } = await params;
	const t = await getTranslations({ locale, namespace: "BillSplitter" });
	return {
		title: t("title"),
		description: t("subtitle"),
		openGraph: {
			images: ogImages({
				tool: "bill-splitter-calculator",
				title: t("title"),
				desc: t("subtitle"),
			}),
		},
	};
}

export default async function Page({
	params,
}: {
	params: Promise<{ locale: string }>;
}) {
	const { locale } = await params;
	setRequestLocale(locale);
	return (
		<>
			<Suspense fallback={<div className="loading">Loading...</div>}>
				<BillSplitterClient />
			</Suspense>
			<ToolPageBottom slug="how-to-split-bills-properly" />
		</>
	);
}
