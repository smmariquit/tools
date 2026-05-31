import type { Metadata } from "next";
import ToolFooter from "../../components/ToolFooter";
import Client from "./Client";

export async function generateMetadata(): Promise<Metadata> {
	const title = "SSS Maternity Benefit Calculator | Philippines";
	const description =
		"Calculate your expected SSS Maternity Cash Benefit based on the Expanded Maternity Leave Law (RA 11210).";

	let ogUrl = `/api/og?title=${encodeURIComponent(
		title,
	)}&desc=${encodeURIComponent(description)}`;
	ogUrl += "&s1l=Leave&s1v=105%20Days&s2l=Benefit&s2v=Calculated";

	return {
		title,
		description,
		openGraph: {
			images: [{ url: ogUrl, width: 1200, height: 630 }],
		},
	};
}

export default function SssMaternityCalculatorPage() {
	const jsonLd = {
		"@context": "https://schema.org",
		"@type": "FinancialProduct",
		name: "SSS Maternity Benefit Estimator",
		description:
			"Calculate your expected SSS Maternity Cash Benefit based on the Expanded Maternity Leave Law (RA 11210).",
		offers: {
			"@type": "Offer",
			price: "0",
			priceCurrency: "PHP",
		},
	};

	return (
		<>
			<script
				type="application/ld+json"
				dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
			/>
			<Client />
			<ToolFooter currentPath="/sss-maternity-benefit-calculator" />
		</>
	);
}
