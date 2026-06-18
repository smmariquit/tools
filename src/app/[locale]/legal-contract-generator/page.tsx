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
		namespace: "LegalContractGenerator",
	});
	const title = t("metaTitle");
	const description = t("metaDescription");
	return {
		title,
		description,
		openGraph: {
			images: ogImages({
				tool: "legal-contract-generator",
				title,
				desc: description,
			}),
		},
	};
}

export default function LegalContractPage() {
	return (
		<>
			<Client />
			<ToolPageBottom slug="legal-contract-guide" />
		</>
	);
}
