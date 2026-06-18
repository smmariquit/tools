import type { Metadata } from "next";
import { ogImages } from "../../../lib/og";
import ToolPageBottom from "../../components/ToolPageBottom";
import Client from "./Client";

export function generateMetadata(): Metadata {
	const title = "Architectural Fee Calculator (UAP SPP 202) | Philippines";
	const description =
		"Calculate minimum basic fees for architectural design (DAEDS & DADS) based on UAP Standards of Professional Practice Document 202.";

	return {
		title,
		description,
		openGraph: {
			images: ogImages({
				tool: "architectural-fee-calculator",
				title,
				desc: description,
			}),
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
			<ToolPageBottom slug="architectural-fee-guide" />
		</>
	);
}
