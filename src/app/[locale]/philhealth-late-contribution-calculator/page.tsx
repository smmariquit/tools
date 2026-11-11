import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { ogImages } from "../../../lib/og";
import ToolPageBottom from "../../components/ToolPageBottom";
import Client from "./Client";

export async function generateMetadata({
	params,
}: {
	params: Promise<{ locale: string }>;
}): Promise<Metadata> {
	const { locale } = await params;
	const t = await getTranslations({ locale, namespace: "PhilHealthLate" });
	const title = t("metaTitle");
	const description = t("metaDescription");
	return {
		title,
		description,
		openGraph: {
			images: ogImages({
				tool: "philhealth-late-contribution-calculator",
				title,
				desc: description,
			}),
		},
	};
}

export default async function PhilhealthLatePage({
	params,
}: {
	params: Promise<{ locale: string }>;
}) {
	setRequestLocale((await params).locale);
	return (
		<>
			<Client />
			<ToolPageBottom slug="philhealth-late-contribution-guide" />
		</>
	);
}
