import type { Metadata } from "next";
import Client from "./Client";
import ToolArticle from "../../components/ToolArticle";

export async function generateMetadata(): Promise<Metadata> {
	const title = "Year-End Tax Refund Estimator | Philippines";
	const description =
		"Calculate your potential year-end tax refund by reconciling your YTD withheld taxes against the TRAIN Law progressive brackets.";
	let ogUrl = `/api/og?title=${encodeURIComponent(title)}&desc=${encodeURIComponent(description)}`;
	ogUrl += "&s1l=Tax&s1v=Refund&s2l=Annual&s2v=Reconciliation";
	return {
		title,
		description,
		openGraph: { images: [{ url: ogUrl, width: 1200, height: 630 }] },
	};
}

export default function TaxRefundPage() {
	return (
		<>
			<Client />
			<ToolArticle slug="tax-refund-guide" />
		</>
	);
}
