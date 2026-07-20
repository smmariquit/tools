import { getTranslations, setRequestLocale } from "next-intl/server";
import { ogImages } from "../../../lib/og";
import ToolPageBottom from "../../components/ToolPageBottom";
import GwaCalculatorClient from "./Client";

export async function generateMetadata(props: {
	params: Promise<{ locale: string }>;
}) {
	const { locale } = await props.params;
	const t = await getTranslations({ locale, namespace: "GWACalculator" });
	return {
		title: t("metaTitle"),
		description: t("metaDescription"),
		openGraph: {
			images: ogImages({
				tool: "gwa-calculator",
				title: t("metaTitle"),
				desc: t("metaDescription"),
			}),
		},
	};
}

export default async function GwaCalculatorPage(props: {
	params: Promise<{ locale: string }>;
}) {
	const params = await props.params;
	setRequestLocale(params.locale);

	return (
		<>
			<script
				type="application/ld+json"
				dangerouslySetInnerHTML={{
					__html: JSON.stringify({
						"@context": "https://schema.org",
						"@type": "WebApplication",
						name: "UP/PUP GWA Calculator",
						url: "https://www.phtools.me/en/gwa-calculator",
						applicationCategory: "EducationalApplication",
						description:
							"Calculate your General Weighted Average (1.0 to 5.0 scale) for Philippine state universities. Includes a target GWA predictor to see what grade you need.",
						operatingSystem: "All",
						offers: {
							"@type": "Offer",
							price: "0",
							priceCurrency: "PHP",
						},
					}),
				}}
			/>
			<GwaCalculatorClient />
			<ToolPageBottom slug="how-to-compute-gwa-college" />
		</>
	);
}
