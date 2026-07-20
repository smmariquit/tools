import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { ogImages } from "../../../lib/og";
import ToolPageBottom from "../../components/ToolPageBottom";
import Client from "./Client";

export async function generateMetadata({
	params,
}: {
	params: Promise<{ locale: string }>;
}): Promise<Metadata> {
	const { locale } = await params;
	const t = await getTranslations({ locale, namespace: "PDICInsurance" });
	const title = t("metaTitle");
	const description = t("metaDescription");
	return {
		title,
		description,
		openGraph: {
			images: ogImages({
				tool: "pdic-insurance-calculator",
				title,
				desc: description,
			}),
		},
	};
}

export default function PdicPage() {
	return (
		<>
			<Client />
			<ToolPageBottom slug="pdic-insurance-guide" />
		</>
	);
}
