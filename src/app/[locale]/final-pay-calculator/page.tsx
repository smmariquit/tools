import type { Metadata } from "next";
import Client from "./Client";
import ToolArticle from "../../components/ToolArticle";

export async function generateMetadata(): Promise<Metadata> {
	const title = "Pro-Rated 13th Month & Final Pay Calculator";
	const description =
		"Calculate your final pay, prorated 13th-month bonus, and unused SIL conversion for resigning or terminated employees in the Philippines.";
	let ogUrl = `/api/og?title=${encodeURIComponent(title)}&desc=${encodeURIComponent(description)}`;
	ogUrl += "&s1l=Final&s1v=Pay&s2l=13th%20Month&s2v=Prorated";
	return {
		title,
		description,
		openGraph: { images: [{ url: ogUrl, width: 1200, height: 630 }] },
	};
}

export default function FinalPayPage() {
	return (
		<>
			<Client />
			<ToolArticle slug="final-pay-guide" />
		</>
	);
}
