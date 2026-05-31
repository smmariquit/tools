import type { Metadata } from "next";
import ToolFooter from "../../components/ToolFooter";
import Client from "./Client";

export async function generateMetadata(): Promise<Metadata> {
	const title = "BIR Donor's Tax Calculator | Philippines";
	const description =
		"Calculate your cumulative donor's tax liability based on the BIR TRAIN Law (RA 10963) with the ₱250,000 tax-exempt threshold.";

	let ogUrl = `/api/og?title=${encodeURIComponent(
		title,
	)}&desc=${encodeURIComponent(description)}`;
	ogUrl += "&s1l=Exempt&s1v=250k&s2l=Tax%20Rate&s2v=6%25";

	return {
		title,
		description,
		openGraph: {
			images: [{ url: ogUrl, width: 1200, height: 630 }],
		},
	};
}

export default function DonorsTaxCalculatorPage() {
	const jsonLd = {
		"@context": "https://schema.org",
		"@type": "FinancialProduct",
		name: "BIR Donor's Tax Calculator",
		description:
			"Calculate your cumulative donor's tax liability based on the BIR TRAIN Law (RA 10963) with the ₱250,000 tax-exempt threshold.",
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
			<ToolFooter currentPath="/bir-donors-tax-calculator" />
		</>
	);
}
