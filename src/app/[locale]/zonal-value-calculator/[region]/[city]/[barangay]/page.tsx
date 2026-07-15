import { Metadata } from "next";
import { notFound } from "next/navigation";
import {
	getZonalDataBySlug,
	slugify,
	zonalData,
} from "../../../../../../data/zonalValues";
import ToolEyebrow from "../../../../../components/doodle/ToolEyebrow";
import ToolIllustration from "../../../../../components/illustrations/ToolIllustration";
import ToolFooterClient from "../../../../../components/ToolFooterClient";
import ToolLayout from "../../../../components/ToolLayout";
import ZonalTaxCalculator from "../../../components/ZonalTaxCalculator";

export async function generateStaticParams() {
	const params: { region: string; city: string; barangay: string }[] = [];

	for (const region of zonalData) {
		for (const city of region.cities) {
			for (const barangay of city.barangays) {
				params.push({
					region: slugify(region.region),
					city: slugify(city.name),
					barangay: slugify(barangay.name),
				});
			}
		}
	}

	return params;
}

export async function generateMetadata({
	params,
}: {
	params: Promise<{ region: string; city: string; barangay: string }>;
}): Promise<Metadata> {
	const resolvedParams = await params;
	const data = getZonalDataBySlug(
		resolvedParams.region,
		resolvedParams.city,
		resolvedParams.barangay,
	);
	if (!data) return {};

	return {
		title: `2026 BIR Zonal Value & Capital Gains Tax Calculator for ${data.barangay}, ${data.city} | PHTools`,
		description: `Instantly calculate Capital Gains Tax (6%) and Doc Stamp Tax (1.5%) using the official BIR Zonal Values (${data.doNumber}) for ${data.barangay}, ${data.city}.`,
		// ponytail: thinnest auto-generated pages on the site. noindex during
		// AdSense re-review so reviewers only sample the deep pages; drop this
		// once approved to reclaim the long-tail "zonal value <barangay>" traffic.
		robots: { index: false, follow: true },
	};
}

export default async function ZonalValueDynamicPage({
	params,
}: {
	params: Promise<{ region: string; city: string; barangay: string }>;
}) {
	const resolvedParams = await params;
	const data = getZonalDataBySlug(
		resolvedParams.region,
		resolvedParams.city,
		resolvedParams.barangay,
	);

	if (!data) {
		notFound();
	}

	return (
		<ToolLayout maxWidth="1000px">
			<div
				style={{
					marginBottom: "24px",
					color: "var(--text-secondary)",
					fontSize: "0.9rem",
				}}
			>
				Real Estate & Taxation / Zonal Values / {data.region} / {data.city} /{" "}
				{data.barangay}
			</div>

			<ToolIllustration name="/zonal-value-calculator" />
			<ToolEyebrow />
			<h1 style={{ fontSize: "2.4rem", marginBottom: "8px" }}>
				BIR Zonal Value & Tax Calculator
			</h1>
			<h2
				style={{
					fontSize: "1.4rem",
					color: "var(--primary)",
					marginBottom: "24px",
				}}
			>
				{data.barangay}, {data.city}
			</h2>

			<div
				style={{
					backgroundColor: "#fff3cd",
					color: "#856404",
					padding: "16px",
					borderRadius: "8px",
					border: "1px solid #ffeeba",
					marginBottom: "32px",
				}}
			>
				<strong>Official BIR Source:</strong> This calculator utilizes data from{" "}
				<strong>{data.doNumber}</strong> (RDO No. {data.rdo}), which took effect
				on {data.effectivityDate}.
			</div>

			<ZonalTaxCalculator streets={data.streets} />

			<div
				style={{
					marginTop: "48px",
					color: "var(--text-secondary)",
					lineHeight: 1.6,
				}}
			>
				<h3>Methodology & Legal Basis</h3>
				<p>
					Under the Philippine National Internal Revenue Code (NIRC), the basis
					for computing the 6% Capital Gains Tax (CGT) and 1.5% Documentary
					Stamp Tax (DST) on the sale of real property is the{" "}
					<strong>Actual Selling Price</strong> or the{" "}
					<strong>BIR Zonal Value</strong>—whichever is higher.
				</p>
				<p>
					This utility dynamically matches the specific street and property
					classification (e.g., RR for Residential Regular, CR for Commercial
					Regular) within {data.barangay} to strictly determine your tax basis.
					Ensure that your Classification exactly matches your property's tax
					declaration.
				</p>
			</div>
			<ToolFooterClient />
		</ToolLayout>
	);
}
