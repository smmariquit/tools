import type { Metadata } from "next";
import { Suspense } from "react";
import Client from "./Client";
import ToolArticle from "../../components/ToolArticle";

export async function generateMetadata({
	searchParams,
}: {
	searchParams: Promise<{
		rate?: string;
		type?: string;
		worked?: string;
		hours?: string;
	}>;
}): Promise<Metadata> {
	const resolvedParams = await searchParams;
	const title = "Holiday & Overtime Pay Calculator (DOLE) | PHTools";
	const description =
		"Calculate your exact pay for working on Philippine Regular Holidays, Special Non-Working Days, and Rest Days.";

	let ogUrl = `/api/og?title=${encodeURIComponent(
		title,
	)}&desc=${encodeURIComponent(description)}`;

	if (
		resolvedParams.rate ||
		resolvedParams.type ||
		resolvedParams.worked ||
		resolvedParams.hours
	) {
		const dailyRate = parseFloat(resolvedParams.rate || "1000") || 0;
		const hoursWorked = parseFloat(resolvedParams.hours || "8") || 0;
		const dayType = (resolvedParams.type || "regular") as
			| "regular"
			| "special"
			| "regularRest"
			| "specialRest";
		const didWork = (resolvedParams.worked || "yes") as "yes" | "no";

		const hourlyRate = dailyRate / 8;
		let computedPay = 0;

		if (didWork === "no") {
			if (dayType === "regular" || dayType === "regularRest") {
				computedPay = dailyRate;
			} else {
				computedPay = 0;
			}
		} else {
			let baseMultiplier = 1;
			switch (dayType) {
				case "regular":
					baseMultiplier = 2.0;
					break;
				case "special":
					baseMultiplier = 1.3;
					break;
				case "regularRest":
					baseMultiplier = 2.6;
					break;
				case "specialRest":
					baseMultiplier = 1.5;
					break;
			}

			if (hoursWorked <= 8) {
				computedPay = hourlyRate * hoursWorked * baseMultiplier;
			} else {
				const regularPay = hourlyRate * 8 * baseMultiplier;
				const otHours = hoursWorked - 8;
				const otRate = hourlyRate * baseMultiplier * 1.3;
				const otPay = otHours * otRate;
				computedPay = regularPay + otPay;
			}
		}

		const formatAmount = (val: number) =>
			new Intl.NumberFormat("en-PH", {
				style: "currency",
				currency: "PHP",
				maximumFractionDigits: 0,
			}).format(val);

		const dayNames = {
			regular: "Regular Holiday",
			special: "Special Holiday",
			regularRest: "Regular (Rest Day)",
			specialRest: "Special (Rest Day)",
		};

		ogUrl += `&s1l=Daily%20Rate&s1v=${encodeURIComponent(formatAmount(dailyRate))}`;
		ogUrl += `&s2l=Type&s2v=${encodeURIComponent(dayNames[dayType] || "Holiday")}`;
		ogUrl += `&s3l=Holiday%20Pay&s3v=${encodeURIComponent(formatAmount(computedPay))}`;
	} else {
		ogUrl +=
			"&s1l=Daily%20Rate&s1v=%E2%82%B11,000&s2l=Type&s2v=Regular%20Holiday&s3l=Holiday%20Pay&s3v=%E2%82%B12,000";
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

export default async function HolidayPage() {
	const jsonLd = {
		"@context": "https://schema.org",
		"@type": "SoftwareApplication",
		name: "Holiday & Overtime Pay Calculator",
		applicationCategory: "FinanceApplication",
		operatingSystem: "All",
		description:
			"Calculate your exact pay for working on Philippine Regular Holidays, Special Non-Working Days, and Rest Days based on DOLE rules.",
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
			<ToolArticle slug="philippine-holiday-pay-rules" />
			</Suspense>
		</>
	);
}
