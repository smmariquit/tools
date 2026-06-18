import { getTranslations, setRequestLocale } from "next-intl/server";
import { Suspense } from "react";
import { ogImages } from "../../../lib/og";
import ToolPageBottom from "../../components/ToolPageBottom";
import LatinHonorsClient from "./Client";

export async function generateMetadata({
	params: { locale },
}: {
	params: { locale: string };
}) {
	const t = await getTranslations({ locale, namespace: "LatinHonors" });
	return {
		title: t("title"),
		description: t("subtitle"),
		openGraph: {
			images: ogImages({
				tool: "latin-honors-calculator",
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
				<LatinHonorsClient />
			</Suspense>
			<ToolPageBottom slug="philippine-latin-honors-guide" />
		</>
	);
}
