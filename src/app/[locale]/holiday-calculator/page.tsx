import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { Suspense } from "react";
import { ogImages } from "../../../lib/og";
import ToolPageBottom from "../../components/ToolPageBottom";
import Client from "./Client";

export async function generateMetadata({
	params,
}: {
	params: Promise<{ locale: string }>;
}): Promise<Metadata> {
	const { locale } = await params;
	const t = await getTranslations({
		locale,
		namespace: "HolidayCalculator",
	});
	const title = t("metaTitle");
	const description = t("metaDescription");

	return {
		title,
		description,
		openGraph: {
			images: ogImages({
				tool: "holiday-calculator",
				title,
				desc: description,
			}),
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
				<ToolPageBottom slug="philippine-holiday-pay-rules" />
			</Suspense>
		</>
	);
}
