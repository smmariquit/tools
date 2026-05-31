import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import PagibigMP2Client from "./Client";

export async function generateMetadata({
	params: { locale },
}: {
	params: { locale: string };
}): Promise<Metadata> {
	const t = await getTranslations({ locale, namespace: "PagibigMP2" });

	return {
		title: t("title"),
		description: t("subtitle"),
		alternates: {
			canonical: `https://phtools.com/${locale}/pagibig-mp2-calculator`,
		},
	};
}

export default function PagibigMP2CalculatorPage() {
	return <PagibigMP2Client />;
}
