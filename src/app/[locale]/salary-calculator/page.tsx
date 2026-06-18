import type { Metadata } from "next";
import { ogImages } from "../../../lib/og";
import ToolPageBottom from "../../components/ToolPageBottom";
import Client from "./Client";

export function generateMetadata(): Metadata {
	const title = "Free 2026 Salary Net Pay Calculator | Philippines";
	const description =
		"Compute your exact 2026 net take-home pay in the Philippines. Accurately deducts SSS (with WISP), PhilHealth, Pag-IBIG, and TRAIN Law income tax.";

	return {
		title,
		description,
		openGraph: {
			images: ogImages({ tool: "salary-calculator", title, desc: description }),
		},
	};
}

export default async function SalaryCalculatorPage(props: {
	searchParams: Promise<{ salary?: string }>;
}) {
	const searchParams = await props.searchParams;
	const initialSalary = searchParams.salary || "30000";

	const jsonLd = {
		"@context": "https://schema.org",
		"@type": "SoftwareApplication",
		name: "Salary Net Pay Calculator",
		applicationCategory: "BusinessApplication",
		operatingSystem: "All",
		description:
			"Compute your exact 2026 net take-home pay in the Philippines. Accurately deducts SSS (with WISP), PhilHealth, Pag-IBIG, and TRAIN Law income tax.",
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
			<Client initialSalary={initialSalary} />
			<ToolPageBottom slug="salary-tax-deductions-guide" />
		</>
	);
}
