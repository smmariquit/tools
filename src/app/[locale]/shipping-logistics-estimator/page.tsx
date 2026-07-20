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
	const t = await getTranslations({ locale, namespace: "ShippingLogistics" });
	const title = t("metaTitle");
	const description = t("metaDescription");
	return {
		title,
		description,
		openGraph: {
			images: ogImages({
				tool: "shipping-logistics-estimator",
				title,
				desc: description,
			}),
		},
	};
}

export default function ShippingPage() {
	return (
		<>
			<Client />
			<ToolPageBottom slug="shipping-logistics-guide" />
		</>
	);
}
