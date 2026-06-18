import { getTranslations, setRequestLocale } from "next-intl/server";
import { Suspense } from "react";
import { ogImages } from "../../../lib/og";
import ToolPageBottom from "../../components/ToolPageBottom";
import CHEDScholarshipClient from "./Client";

export async function generateMetadata({
	params,
}: {
	params: Promise<{ locale: string }>;
}) {
	const p = await params;
	const t = await getTranslations({
		locale: p.locale,
		namespace: "CHEDScholarship",
	});

	return {
		title: `${t("title")} | PHTools`,
		description: t("subtitle"),
		openGraph: {
			images: ogImages({
				tool: "ched-scholarship-calculator",
				title: `${t("title")} | PHTools`,
				desc: t("subtitle"),
			}),
		},
	};
}

export default async function CHEDScholarshipPage({
	params,
}: {
	params: Promise<{ locale: string }>;
}) {
	const p = await params;
	setRequestLocale(p.locale);

	return (
		<>
			<Suspense fallback={<div>Loading...</div>}>
				<CHEDScholarshipClient />
			</Suspense>
			<ToolPageBottom slug="ched-scholarship-guide" />
		</>
	);
}
