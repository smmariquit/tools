import type { Metadata } from "next";
import Client from "./Client";
import ToolArticle from "../../components/ToolArticle";

export async function generateMetadata(): Promise<Metadata> {
	const title = "Architectural Fee Calculator (UAP SPP 202) | Philippines";
	const description =
		"Calculate minimum basic fees for architectural design (DAEDS & DADS) based on UAP Standards of Professional Practice Document 202.";

	let ogUrl = `/api/og?title=${encodeURIComponent(
		title,
	)}&desc=${encodeURIComponent(description)}`;
	ogUrl += "&s1l=Standard&s1v=SPP%20202&s2l=Fee&s2v=Calculated";

	return {
		title,
		description,
		openGraph: {
			images: [{ url: ogUrl, width: 1200, height: 630 }],
		},
	};
}

export default function ArchitecturalFeePage() {
	const jsonLd = {
		"@context": "https://schema.org",
		"@type": "FinancialProduct",
		name: "Architectural Fee Calculator (UAP SPP 202)",
		description:
			"Calculate minimum basic fees for architectural design (DAEDS & DADS) based on UAP Standards of Professional Practice Document 202.",
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
			<ToolArticle slug="architectural-fee-guide" />
		</>
	);
}
