import ToolFooter from "../../components/ToolFooter";
import { setRequestLocale } from "next-intl/server";
import GwaCalculatorClient from "./Client";

export const metadata = {
	title: "UP / PUP GWA Calculator | Target Grade Predictor",
	description:
		"Calculate your General Weighted Average (1.0 to 5.0 scale) for UP, PUP, and other Philippine state universities. Includes a target GWA predictor.",
	alternates: {
		canonical: "https://www.phtools.me/en/gwa-calculator",
		languages: {
			en: "https://www.phtools.me/en/gwa-calculator",
			tl: "https://www.phtools.me/tl/gwa-calculator",
		},
	},
};

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
		</>
	);
}
