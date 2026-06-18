import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { Suspense } from "react";
import { ogImages } from "../../../lib/og";
import ToolPageBottom from "../../components/ToolPageBottom";
import SssPensionClient from "./Client";

export async function generateMetadata({
	params: { locale },
}: {
	params: { locale: string };
}): Promise<Metadata> {
	const t = await getTranslations({ locale, namespace: "SSSPension" });

	return {
		title: t("title"),
		description: t("subtitle"),
		alternates: {
			canonical: `https://phtools.me/${locale}/sss-pension-calculator`,
		},
		openGraph: {
			images: ogImages({
				tool: "sss-pension-calculator",
				title: t("title"),
				desc: t("subtitle"),
			}),
		},
	};
}

export default function SssPensionCalculatorPage() {
	return (
		<>
			<Suspense fallback={<div className="loading">Loading...</div>}>
				<SssPensionClient />
			</Suspense>
			<ToolPageBottom slug="how-to-compute-sss-pension" />
		</>
	);
}
