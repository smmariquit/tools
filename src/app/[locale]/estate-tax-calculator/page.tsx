import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { ogImages } from "../../../lib/og";
import ToolPageBottom from "../../components/ToolPageBottom";
import Client from "./Client";

export function generateMetadata(): Metadata {
	const title = "Philippine Estate Tax Calculator";
	const description =
		"Calculate the 6% flat estate tax under the TRAIN Law, factoring in standard deductions and family home allowance.";
	return {
		title,
		description,
		openGraph: {
			images: ogImages({
				tool: "estate-tax-calculator",
				title,
				desc: description,
			}),
		},
	};
}

export default async function EstateTaxPage({
	params,
}: {
	params: Promise<{ locale: string }>;
}) {
	setRequestLocale((await params).locale);
	return (
		<>
			<Client />
			<ToolPageBottom slug="estate-tax-guide" />
		</>
	);
}
