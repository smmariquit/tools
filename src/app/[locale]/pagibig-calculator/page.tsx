import type { Metadata } from "next";
import { Suspense } from "react";
import ToolFooter from "../../components/ToolFooter";
import Client from "./Client";

export const metadata: Metadata = {
	title: "Pag-IBIG & MP2 Savings Calculator (2026) | PHTools",
	description:
		"Calculate your mandatory Pag-IBIG contributions and estimate your MP2 tax-free dividend returns over a 5-year compounding period.",
	openGraph: {
		images: [
			{
				url: `/api/og?title=Pag-IBIG%20%26%20MP2%20Savings%20Calculator%20%282026%29%20%7C%20PHTools&desc=Calculate%20your%20mandatory%20Pag-IBIG%20contributions%20and%20estimate%20your%20MP2%20tax-free%20dividend%20returns%20over%20a%205-year%20compounding%20period.&s1l=Savings&s1v=₱10k&s2l=Rate&s2v=7%25&s3l=Dividend&s3v=₱700`,
				width: 1200,
				height: 630,
			},
		],
	},
};

export default function PagIbigPage() {
	const jsonLd = {
		"@context": "https://schema.org",
		"@type": "SoftwareApplication",
		name: "Pag-IBIG MP2 Calculator",
		applicationCategory: "FinanceApplication",
		operatingSystem: "All",
		description: metadata.description,
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
			<Suspense
				fallback={
					<div
						className="tool-grid card"
						style={{ textAlign: "center", padding: "40px" }}
					>
						Loading calculator...
					</div>
				}
			>
				<Client />
			</Suspense>
			<ToolFooter currentPath="/pagibig-calculator" />
		</>
	);
}
