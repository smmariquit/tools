import ToolFooter from "../../components/ToolFooter";
import type { Metadata } from "next";
import Client from "./Client";

export async function generateMetadata({
	searchParams,
}: {
	searchParams: Promise<{ income?: string; period?: string; type?: string }>;
}): Promise<Metadata> {
	const resolvedParams = await searchParams;
	const title = "Philippine Income Tax Calculator (BIR) | PHTools";
	const description =
		"Calculate your withholding and annual income tax based on the updated 2026 TRAIN Law brackets.";

	let ogUrl = `/api/og?title=${encodeURIComponent(
		title,
	)}&desc=${encodeURIComponent(description)}`;

	if (resolvedParams.income || resolvedParams.period || resolvedParams.type) {
		const inputIncome = parseFloat(resolvedParams.income || "400000") || 0;
		const period = resolvedParams.period || "annual";
		const taxType = resolvedParams.type || "graduated";

		const annualIncome = period === "monthly" ? inputIncome * 12 : inputIncome;
		let annualTax = 0;

		if (taxType === "flat8") {
			annualTax = Math.max(0, (annualIncome - 250000) * 0.08);
		} else {
			if (annualIncome > 8000000) {
				annualTax = 2202500 + (annualIncome - 8000000) * 0.35;
			} else if (annualIncome > 2000000) {
				annualTax = 402500 + (annualIncome - 2000000) * 0.3;
			} else if (annualIncome > 800000) {
				annualTax = 102500 + (annualIncome - 800000) * 0.25;
			} else if (annualIncome > 400000) {
				annualTax = 22500 + (annualIncome - 400000) * 0.2;
			} else if (annualIncome > 250000) {
				annualTax = (annualIncome - 250000) * 0.15;
			} else {
				annualTax = 0;
			}
		}

		const formatAmount = (val: number) =>
			new Intl.NumberFormat("en-PH", {
				style: "currency",
				currency: "PHP",
				maximumFractionDigits: 0,
			}).format(val);

		ogUrl += `&s1l=Annual%20Income&s1v=${encodeURIComponent(formatAmount(annualIncome))}`;
		ogUrl += `&s2l=Tax%20Type&s2v=${encodeURIComponent(taxType === "flat8" ? "8% Flat Rate" : "Graduated")}`;
		ogUrl += `&s3l=Annual%20Tax&s3v=${encodeURIComponent(formatAmount(annualTax))}`;
	} else {
		ogUrl += "&s1l=Annual%20Income&s1v=%E2%82%B1400%2C000&s2l=Tax%20Type&s2v=Graduated&s3l=Annual%20Tax&s3v=%E2%82%B10";
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

export default async function IncomeTaxPage() {
	const jsonLd = {
		"@context": "https://schema.org",
		"@type": "SoftwareApplication",
		name: "Philippine Income Tax Calculator (BIR)",
		applicationCategory: "BusinessApplication",
		operatingSystem: "All",
		description:
			"Calculate your withholding and annual income tax based on the updated 2026 TRAIN Law brackets.",
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
			<ToolFooter currentPath="/income-tax-calculator" />
		</>
	);
}
