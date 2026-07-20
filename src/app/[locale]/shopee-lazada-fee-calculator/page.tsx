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
	const t = await getTranslations({ locale, namespace: "ShopeeLazadaFee" });
	const title = t("metaTitle");
	const description = t("metaDescription");

	return {
		title,
		description,
		openGraph: {
			images: ogImages({
				tool: "shopee-lazada-fee-calculator",
				title,
				desc: description,
			}),
		},
	};
}

export default async function EcommerceFeePage() {
	const jsonLd = {
		"@context": "https://schema.org",
		"@type": "SoftwareApplication",
		name: "E-Commerce Seller Fee Calculator",
		applicationCategory: "BusinessApplication",
		operatingSystem: "All",
		description:
			"Calculate exact seller deductions (Commission, FSS, TikTok fees) and net payout.",
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
				<ToolPageBottom slug="shopee-lazada-seller-fees-explained" />
			</Suspense>
		</>
	);
}
