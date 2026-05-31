import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import PagibigAffordabilityClient from "./Client";

export async function generateMetadata({
	params: { locale },
}: {
	params: { locale: string };
}): Promise<Metadata> {
	const t = await getTranslations({
		locale,
		namespace: "PagibigAffordability",
	});

	return {
		title: t("title"),
		description: t("subtitle"),
		alternates: {
			canonical: `https://phtools.com/${locale}/pagibig-affordability-calculator`,
		},
	};
}

export default function PagibigAffordabilityCalculatorPage() {
	return <PagibigAffordabilityClient />;
}
