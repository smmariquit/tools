import ToolFooter from "../../components/ToolFooter";
import type { Metadata } from "next";
import Client from "./Client";

export async function generateMetadata({
	searchParams,
}: {
	searchParams: Promise<{ salary?: string; months?: string; absences?: string }>;
}): Promise<Metadata> {
	const resolvedParams = await searchParams;
	const title = "13th Month Pay Calculator (Philippines 2026) | PHTools";
	const description =
		"Accurately compute your prorated 13th month pay. Automatically excludes overtime and checks the ₱90k TRAIN law tax exemption limit.";

	let ogUrl = `/api/og?title=${encodeURIComponent(
		title,
	)}&desc=${encodeURIComponent(description)}`;

	if (resolvedParams.salary || resolvedParams.months || resolvedParams.absences) {
		const basicSalary = parseFloat(resolvedParams.salary || "30000") || 0;
		const monthsWorked = parseFloat(resolvedParams.months || "12") || 0;
		const unpaidAbsences = parseFloat(resolvedParams.absences || "0") || 0;

		const totalEarned = basicSalary * monthsWorked - unpaidAbsences;
		const thirteenthMonthPay = totalEarned / 12;

		const formatAmount = (val: number) =>
			new Intl.NumberFormat("en-PH", {
				style: "currency",
				currency: "PHP",
			}).format(val);

		ogUrl += `&s1l=Basic&s1v=${encodeURIComponent(formatAmount(basicSalary))}`;
		ogUrl += `&s2l=Months&s2v=${encodeURIComponent(monthsWorked.toString())}`;
		ogUrl += `&s3l=13th%20Month&s3v=${encodeURIComponent(formatAmount(thirteenthMonthPay))}`;
	} else {
		ogUrl += "&s1l=Basic&s1v=%E2%82%B130k&s2l=Months&s2v=12&s3l=13th%20Month&s3v=%E2%82%B130k";
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

export default async function ThirteenthMonthPage() {
	const jsonLd = {
		"@context": "https://schema.org",
		"@type": "SoftwareApplication",
		name: "13th Month Pay Calculator",
		applicationCategory: "BusinessApplication",
		operatingSystem: "All",
		description:
			"Accurately compute your prorated 13th month pay. Automatically excludes overtime and checks the ₱90k TRAIN law tax exemption limit.",
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
			<ToolFooter currentPath="/13th-month-pay-calculator" />
		</>
	);
}
