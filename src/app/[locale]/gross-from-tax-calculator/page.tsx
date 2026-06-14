import { getTranslations, setRequestLocale } from "next-intl/server";
import { Suspense } from "react";
import GrossFromTaxClient from "./Client";
import ToolArticle from "../../components/ToolArticle";

export async function generateMetadata({
	params,
}: {
	params: Promise<{ locale: string }>;
}) {
	const p = await params;
	const t = await getTranslations({
		locale: p.locale,
		namespace: "GrossFromTax",
	});

	return {
		title: `${t("title")} | PHTools`,
		description: t("subtitle"),
	};
}

export default async function GrossFromTaxPage({
	params,
}: {
	params: Promise<{ locale: string }>;
}) {
	const p = await params;
	setRequestLocale(p.locale);

	return (
		<Suspense fallback={<div>Loading...</div>}>
			<GrossFromTaxClient />
		</Suspense>
	);
}
