import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import SeparationPayClient from "./Client";

export async function generateMetadata({
	params: { locale },
}: {
	params: { locale: string };
}): Promise<Metadata> {
	const t = await getTranslations({ locale, namespace: "SeparationPay" });

	return {
		title: t("title"),
		description: t("subtitle"),
		alternates: {
			canonical: `https://phtools.com/${locale}/separation-pay-calculator`,
		},
	};
}

export default function SeparationPayCalculatorPage() {
	return <SeparationPayClient />;
}
