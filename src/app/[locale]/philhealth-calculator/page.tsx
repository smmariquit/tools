import type { Metadata } from "next";
import { Suspense } from "react";
import ToolFooter from "../../components/ToolFooter";
import Client from "./Client";

export async function generateMetadata({
	searchParams,
}: {
	searchParams: Promise<{ salary?: string }>;
}): Promise<Metadata> {
	const resolvedParams = await searchParams;
	const title = "PhilHealth Premium Calculator (2026) | PHTools";
	const description =
		"Calculate your exact monthly PhilHealth premium based on the latest 5% UHC rate.";

	let ogUrl = `/api/og?title=${encodeURIComponent(
		title,
	)}&desc=${encodeURIComponent(description)}`;

	if (resolvedParams.salary) {
		const basicSalary = parseFloat(resolvedParams.salary || "30000") || 0;
		const premiumRate = 0.05;
		const floorSalary = 10000;
		const ceilingSalary = 100000;

		let applicableSalary = basicSalary;
		if (basicSalary === 0) applicableSalary = 0;
		else if (basicSalary < floorSalary) applicableSalary = floorSalary;
		else if (basicSalary > ceilingSalary) applicableSalary = ceilingSalary;

		const totalPremium = applicableSalary * premiumRate;
		const employeeShare = totalPremium / 2;

		const formatAmount = (val: number) =>
			new Intl.NumberFormat("en-PH", {
				style: "currency",
				currency: "PHP",
				maximumFractionDigits: 0,
			}).format(val);

		ogUrl += `&s1l=Basic%20Salary&s1v=${encodeURIComponent(formatAmount(basicSalary))}`;
		ogUrl += `&s2l=Total%20Premium&s2v=${encodeURIComponent(formatAmount(totalPremium))}`;
		ogUrl += `&s3l=Your%20Share&s3v=${encodeURIComponent(formatAmount(employeeShare))}`;
	} else {
		ogUrl +=
			"&s1l=Basic%20Salary&s1v=%E2%82%B130%2C000&s2l=Total%20Premium&s2v=%E2%82%B11%2C500&s3l=Your%20Share&s3v=%E2%82%B1750";
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

export default async function PhilHealthPage() {
	const jsonLd = {
		"@context": "https://schema.org",
		"@type": "SoftwareApplication",
		name: "PhilHealth Premium Calculator",
		applicationCategory: "FinanceApplication",
		operatingSystem: "All",
		description:
			"Calculate your exact monthly PhilHealth premium based on the latest 5% UHC rate.",
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
			<ToolFooter currentPath="/philhealth-calculator" />
		</>
	);
}
