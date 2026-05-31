import type { Metadata } from "next";
import { Suspense } from "react";
import ToolFooter from "../../components/ToolFooter";
import Client from "./Client";

export async function generateMetadata({
	searchParams,
}: {
	searchParams: Promise<{ salary?: string; type?: string }>;
}): Promise<Metadata> {
	const resolvedParams = await searchParams;
	const title = "SSS Contribution Calculator (2026) | PHTools";
	const description =
		"Calculate your exact Social Security System (SSS) monthly contribution breakdown (EE, ER, EC, MPF/WISP) based on the latest 2026 Philippine table.";

	let ogUrl = `/api/og?title=${encodeURIComponent(
		title,
	)}&desc=${encodeURIComponent(description)}`;

	if (resolvedParams.salary || resolvedParams.type) {
		const salary = parseFloat(resolvedParams.salary || "30000") || 0;
		const memberType = resolvedParams.type || "employed";

		const getMSC = (s: number) => {
			if (s === 0) return 0;
			if (s < 5000) return 5000;
			if (s >= 34750) return 35000;
			return Math.round(s / 500) * 500;
		};

		const msc = getMSC(salary);
		const regularMSC = Math.min(msc, 20000);
		const mpfMSC = Math.max(0, msc - 20000);

		let eeRegular = 0,
			eeMPF = 0,
			erRegular = 0,
			erMPF = 0,
			ecFee = 0;

		if (msc > 0) {
			if (memberType === "employed") {
				eeRegular = regularMSC * 0.05;
				eeMPF = mpfMSC * 0.05;
				erRegular = regularMSC * 0.1;
				erMPF = mpfMSC * 0.1;
				ecFee = msc < 15000 ? 10 : 30;
			} else {
				eeRegular = regularMSC * 0.15;
				eeMPF = mpfMSC * 0.15;
			}
		}

		const eeTotal = eeRegular + eeMPF;
		const erTotal = erRegular + erMPF + ecFee;
		const grandTotal = eeTotal + erTotal;

		const formatAmount = (val: number) =>
			new Intl.NumberFormat("en-PH", {
				style: "currency",
				currency: "PHP",
				maximumFractionDigits: 0,
			}).format(val);

		ogUrl += `&s1l=Employee%20Share&s1v=${encodeURIComponent(formatAmount(eeTotal))}`;
		if (memberType === "employed") {
			ogUrl += `&s2l=Employer%20Share&s2v=${encodeURIComponent(formatAmount(erTotal))}`;
		} else {
			ogUrl += `&s2l=Total%20Contribution&s2v=${encodeURIComponent(formatAmount(eeTotal))}`;
		}
		ogUrl += `&s3l=MPF%20Savings&s3v=${encodeURIComponent(formatAmount(eeMPF + erMPF))}`;
	} else {
		ogUrl +=
			"&s1l=Employee%20Share&s1v=%E2%82%B11%2C500&s2l=Employer%20Share&s2v=%E2%82%B13%2C030&s3l=MPF%20Savings&s3v=%E2%82%B11%2C500";
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

export default async function SssCalculatorPage() {
	const jsonLd = {
		"@context": "https://schema.org",
		"@type": "SoftwareApplication",
		name: "SSS Contribution Calculator",
		applicationCategory: "FinanceApplication",
		operatingSystem: "All",
		description:
			"Calculate your exact Social Security System (SSS) monthly contribution breakdown (EE, ER, EC, MPF/WISP) based on the latest 2026 Philippine table.",
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
			<ToolFooter currentPath="/sss-contribution-calculator" />
		</>
	);
}
