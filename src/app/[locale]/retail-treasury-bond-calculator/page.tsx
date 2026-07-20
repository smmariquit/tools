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
	const t = await getTranslations({ locale, namespace: "RetailTreasuryBond" });
	const title = t("metaTitle");
	const description = t("metaDescription");
	return {
		title,
		description,
		openGraph: {
			images: ogImages({
				tool: "retail-treasury-bond-calculator",
				title,
				desc: description,
			}),
		},
	};
}

export default function RtbPage() {
	return (
		<>
			<Client />
			<ToolPageBottom slug="retail-treasury-bond-guide" />
		</>
	);
}
