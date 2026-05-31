import { getTranslations, setRequestLocale } from "next-intl/server";
import PRCBoardExamRatingClient from "./Client";

export async function generateMetadata({
	params: { locale },
}: {
	params: { locale: string };
}) {
	const t = await getTranslations({ locale, namespace: "PRCBoardExamRating" });
	return {
		title: t("title"),
		description: t("subtitle"),
	};
}

export default function Page({
	params: { locale },
}: {
	params: { locale: string };
}) {
	setRequestLocale(locale);
	return <PRCBoardExamRatingClient />;
}
