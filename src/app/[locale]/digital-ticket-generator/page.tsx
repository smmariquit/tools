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
	const t = await getTranslations({
		locale,
		namespace: "DigitalTicketGenerator",
	});
	const title = t("metaTitle");
	const description = t("metaDescription");
	return {
		title,
		description,
		openGraph: {
			images: ogImages({
				tool: "digital-ticket-generator",
				title,
				desc: description,
			}),
		},
	};
}

export default function DigitalTicketPage() {
	return (
		<>
			<Client />
			<ToolPageBottom slug="digital-ticket-guide" />
		</>
	);
}
