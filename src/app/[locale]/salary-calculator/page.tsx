import type { Metadata } from "next";
import { computeSalary } from "../../../lib/salaryLogic";
import ToolFooter from "../../components/ToolFooter";
import Client from "./Client";

export async function generateMetadata({
	searchParams,
}: {
	searchParams: Promise<{ salary?: string }>;
}): Promise<Metadata> {
	const resolvedParams = await searchParams;
	const title = "Free 2026 Salary Net Pay Calculator | Philippines";
	const description =
		"Compute your exact 2026 net take-home pay in the Philippines. Accurately deducts SSS (with WISP), PhilHealth, Pag-IBIG, and TRAIN Law income tax.";

	let ogUrl = `/api/og?title=${encodeURIComponent(
		title,
	)}&desc=${encodeURIComponent(description)}`;

	if (resolvedParams.salary) {
		const { tax, netPay, salary } = computeSalary(resolvedParams.salary);
		const formatAmount = (val: number) =>
			new Intl.NumberFormat("en-PH", {
				style: "currency",
				currency: "PHP",
			}).format(val);

		ogUrl += `&s1l=Gross&s1v=${encodeURIComponent(formatAmount(salary))}`;
		ogUrl += `&s2l=Tax&s2v=${encodeURIComponent(formatAmount(tax))}`;
		ogUrl += `&s3l=Net&s3v=${encodeURIComponent(formatAmount(netPay))}`;
	} else {
		ogUrl +=
			"&s1l=Gross&s1v=%E2%82%B150k&s2l=Tax&s2v=%E2%82%B14.1k&s3l=Net&s3v=%E2%82%B143.2k";
	}

	return {
		title,
		description,
		openGraph: {
			images: [
				{
					url: ogUrl,
					width: 1200,
					height: 630,
				},
			],
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
			<ToolFooter currentPath="/salary-calculator" />
		</>
	);
}
