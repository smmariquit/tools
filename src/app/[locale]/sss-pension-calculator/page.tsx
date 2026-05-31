import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
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
			canonical: `https://phtools.com/${locale}/sss-pension-calculator`,
		},
	};
}

export default function SssPensionCalculatorPage() {
	return <SssPensionClient />;
}
