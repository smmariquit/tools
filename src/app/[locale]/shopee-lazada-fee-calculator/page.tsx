import type { Metadata } from "next";
import { Suspense } from "react";
import ToolFooter from "../../components/ToolFooter";
import Client from "./Client";

export const metadata: Metadata = {
	title: "Shopee & Lazada Seller Fee Calculator | PHTools",
	description:
		"Calculate your exact e-commerce seller deductions. Compute transaction fees, commission fees, and FSS/CCB deductions to find your net payout.",
	openGraph: {
		images: [
			{
				url: `/api/og?title=Shopee%20%26%20Lazada%20Seller%20Fee%20Calculator%20%7C%20PHTools&desc=Calculate%20your%20exact%20e-commerce%20seller%20deductions.%20Compute%20transaction%20fees%2C%20commission%20fees%2C%20and%20FSS/CCB%20deductions%20to%20find%20your%20net%20payout.&s1l=Price&s1v=₱1k&s2l=Fees&s2v=10%25&s3l=Payout&s3v=₱900`,
				width: 1200,
				height: 630,
			},
		],
	},
};

export default function EcommerceFeePage() {
	const jsonLd = {
		"@context": "https://schema.org",
		"@type": "SoftwareApplication",
		name: "Shopee & Lazada Fee Calculator",
		applicationCategory: "BusinessApplication",
		operatingSystem: "All",
		description: metadata.description,
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
			<ToolFooter currentPath="/shopee-lazada-fee-calculator" />
		</>
	);
}
