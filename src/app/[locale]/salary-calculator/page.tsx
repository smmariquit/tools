import type { Metadata } from "next";
import Client from "./Client";

export const metadata: Metadata = {
	title: "Free 2026 Salary Net Pay Calculator | Philippines",
	description:
		"Compute your exact 2026 net take-home pay in the Philippines. Accurately deducts SSS (with WISP), PhilHealth, Pag-IBIG, and TRAIN Law income tax.",
	openGraph: {
		images: [
			{
				url: `/api/og?title=Free%202026%20Salary%20Net%20Pay%20Calculator%20%7C%20Philippines&desc=Compute%20your%20exact%202026%20net%20take-home%20pay%20in%20the%20Philippines.%20Accurately%20deducts%20SSS%20%28with%20WISP%29%2C%20PhilHealth%2C%20Pag-IBIG%2C%20and%20TRAIN%20Law%20income%20tax.&s1l=Gross&s1v=₱50k&s2l=Tax&s2v=₱4.1k&s3l=Net&s3v=₱43.2k`,
				width: 1200,
				height: 630,
			},
		],
	},
};

export default function SalaryCalculatorPage() {
	const jsonLd = {
		"@context": "https://schema.org",
		"@type": "SoftwareApplication",
		name: "Salary Net Pay Calculator",
		applicationCategory: "BusinessApplication",
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
			<Client />
		</>
	);
}
