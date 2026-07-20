import { getTranslations, setRequestLocale } from "next-intl/server";
import { Suspense } from "react";
import { ogImages } from "../../../lib/og";
import ToolPageBottom from "../../components/ToolPageBottom";
import PRCBoardExamRatingClient from "./Client";

export async function generateMetadata({
	params,
}: {
	params: Promise<{ locale: string }>;
}) {
	const { locale } = await params;
	const t = await getTranslations({ locale, namespace: "PRCBoardExamRating" });
	return {
		title: t("title"),
		description: t("subtitle"),
		openGraph: {
			images: ogImages({
				tool: "prc-board-exam-rating-calculator",
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
				<PRCBoardExamRatingClient />
			</Suspense>
			<ToolPageBottom slug="prc-board-exam-rating-guide" />
		</>
	);
}
