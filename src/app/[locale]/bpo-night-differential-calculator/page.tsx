import type { Metadata } from "next";
import { Suspense } from "react";
import ToolFooter from "../../components/ToolFooter";
import Client from "./Client";

export async function generateMetadata({
	searchParams,
}: {
	searchParams: Promise<{
		salary?: string;
		shiftStart?: string;
		shiftEnd?: string;
		type?: string;
	}>;
}): Promise<Metadata> {
	const resolvedParams = await searchParams;
	const title = "BPO Night Differential & Overtime Calculator | PHTools";
	const description =
		"Calculate your exact night differential, overtime, and holiday pay for your BPO shift.";

	let ogUrl = `/api/og?title=${encodeURIComponent(
		title,
	)}&desc=${encodeURIComponent(description)}`;

	if (
		resolvedParams.salary ||
		resolvedParams.shiftStart ||
		resolvedParams.shiftEnd ||
		resolvedParams.type
	) {
		const baseSalary = parseFloat(resolvedParams.salary || "25000") || 0;
		const shiftStart = parseInt(resolvedParams.shiftStart || "20", 10) || 0; // default 8pm
		const shiftEnd = parseInt(resolvedParams.shiftEnd || "5", 10) || 0; // default 5am
		const dayType = resolvedParams.type || "regular";

		// simplified hourly computation
		const hourlyRate = baseSalary / 21.6667 / 8;

		// calculate hours
		let totalHours = 0;
		if (shiftEnd >= shiftStart) {
			totalHours = shiftEnd - shiftStart;
		} else {
			totalHours = 24 - shiftStart + shiftEnd;
		}
		// deduct 1 hr lunch if > 4 hrs
		if (totalHours >= 5) totalHours -= 1;

		// Calculate ND hours (10PM to 6AM, which is 22 to 6)
		let ndHours = 0;
		for (let h = 0; h < totalHours + 1; h++) {
			// simplistic check for each hour slot
			const currentHour = (shiftStart + h) % 24;
			if (currentHour >= 22 || currentHour < 6) {
				if (h < totalHours) {
					// Don't count the exact end hour if it's the 1 hour unpaid lunch
					ndHours++;
				}
			}
		}

		// Let's just mock the display to show the breakdown in the OG image
		const formatAmount = (val: number) =>
			new Intl.NumberFormat("en-PH", {
				style: "currency",
				currency: "PHP",
				maximumFractionDigits: 0,
			}).format(val);

		ogUrl += `&s1l=Hourly%20Rate&s1v=${encodeURIComponent(formatAmount(hourlyRate))}`;
		ogUrl += `&s2l=Total%20Hours&s2v=${encodeURIComponent(`${totalHours.toString()}h`)}`;
		ogUrl += `&s3l=ND%20Hours&s3v=${encodeURIComponent(`${ndHours.toString()}h`)}`;
	} else {
		ogUrl +=
			"&s1l=Hourly%20Rate&s1v=%E2%82%B1144&s2l=Total%20Hours&s2v=8h&s3l=ND%20Hours&s3v=7h";
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

export default async function BpoCalculatorPage() {
	const jsonLd = {
		"@context": "https://schema.org",
		"@type": "SoftwareApplication",
		name: "BPO Night Differential Calculator",
		applicationCategory: "FinanceApplication",
		operatingSystem: "All",
		description:
			"Calculate your exact night differential, overtime, and holiday pay for your BPO shift.",
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
			<ToolFooter currentPath="/bpo-night-differential-calculator" />
		</>
	);
}
