import type { Metadata } from "next";
import ToolFooter from "../../components/ToolFooter";
import Client from "./Client";

export async function generateMetadata(): Promise<Metadata> {
	const title = "LTO Car Registration Renewal Fee Calculator | Philippines";
	const description =
		"Estimate your annual LTO Motor Vehicle User's Charge (MVUC) and check for any late renewal penalties based on RA 8794.";

	let ogUrl = `/api/og?title=${encodeURIComponent(
		title,
	)}&desc=${encodeURIComponent(description)}`;
	ogUrl += "&s1l=LTO%20Fee&s1v=Estimate&s2l=Penalties&s2v=Checked";

	return {
		title,
		description,
		openGraph: {
			images: [{ url: ogUrl, width: 1200, height: 630 }],
		},
	};
}

export default function LtoCalculatorPage() {
	const jsonLd = {
		"@context": "https://schema.org",
		"@type": "FinancialProduct",
		name: "LTO Annual Registration Fee Estimator",
		description:
			"Estimate your annual LTO Motor Vehicle User's Charge (MVUC) and check for any late renewal penalties based on RA 8794.",
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
			<ToolFooter currentPath="/lto-registration-fee-calculator" />
		</>
	);
}
