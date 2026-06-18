import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { ogImages } from "../../../lib/og";
import ToolPageBottom from "../../components/ToolPageBottom";
import Client from "./Client";

export async function generateMetadata({
	params: { locale },
}: {
	params: { locale: string };
}): Promise<Metadata> {
	const t = await getTranslations({ locale, namespace: "GoTradeVsIBKR" });
	const title = t("metaTitle");
	const description = t("metaDescription");
	return {
		title,
		description,
		openGraph: {
			images: ogImages({
				tool: "gotrade-vs-ibkr-calculator",
				title,
				desc: description,
			}),
		},
	};
}

export default function GotradeIbkrPage() {
	return (
		<>
			<Client />
			<ToolPageBottom slug="gotrade-vs-ibkr-guide" />
		</>
	);
}
