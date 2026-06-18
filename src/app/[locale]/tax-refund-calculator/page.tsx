import type { Metadata } from "next";
import { ogImages } from "../../../lib/og";
import ToolPageBottom from "../../components/ToolPageBottom";
import Client from "./Client";

export function generateMetadata(): Metadata {
	const title = "Year-End Tax Refund Estimator | Philippines";
	const description =
		"Calculate your potential year-end tax refund by reconciling your YTD withheld taxes against the TRAIN Law progressive brackets.";
	return {
		title,
		description,
		openGraph: {
			images: ogImages({
				tool: "tax-refund-calculator",
				title,
				desc: description,
			}),
		},
	};
}

export default function TaxRefundPage() {
	return (
		<>
			<Client />
			<ToolPageBottom slug="tax-refund-guide" />
		</>
	);
}
