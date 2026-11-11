import { getTranslations, setRequestLocale } from "next-intl/server";
import { Suspense } from "react";
import SearchClient from "./Client";

export async function generateMetadata() {
	const t = await getTranslations("Search");
	return { title: t("title") };
}

export default async function SearchPage({
	params,
}: {
	params: Promise<{ locale: string }>;
}) {
	setRequestLocale((await params).locale);
	// params.locale exists in this app routes setup
	return (
		<Suspense fallback={<div>Loading search...</div>}>
			<SearchClient />
		</Suspense>
	);
}
