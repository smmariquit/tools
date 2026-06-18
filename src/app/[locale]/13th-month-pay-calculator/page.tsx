import type { Metadata } from "next";
import { Suspense } from "react";
import { ogImages } from "../../../lib/og";
import ToolPageBottom from "../../components/ToolPageBottom";
import Client from "./Client";

export function generateMetadata(): Metadata {
	const title = "13th Month Pay Calculator (Philippines 2026) | PHTools";
	const description =
		"Accurately compute your prorated 13th month pay. Automatically excludes overtime and checks the ₱90k TRAIN law tax exemption limit.";

	return {
		title,
		description,
		openGraph: {
			images: ogImages({
				tool: "13th-month-pay-calculator",
				title,
				desc: description,
			}),
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
				<ToolPageBottom slug="how-to-compute-13th-month-pay" />
			</Suspense>
		</>
	);
}
