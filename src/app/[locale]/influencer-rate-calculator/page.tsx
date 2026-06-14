import type { Metadata } from "next";
import Client from "./Client";
import ToolArticle from "../../components/ToolArticle";

export async function generateMetadata(): Promise<Metadata> {
	const title = "Philippine Influencer & Talent Rate Calculator";
	const description =
		"Calculate standard creator rates based on engagement metrics (ER), follower count, and Philippine market multipliers.";
	let ogUrl = `/api/og?title=${encodeURIComponent(title)}&desc=${encodeURIComponent(description)}`;
	ogUrl += "&s1l=Engagement&s1v=Rate&s2l=Pricing&s2v=Calculated";
	return {
		title,
		description,
		openGraph: { images: [{ url: ogUrl, width: 1200, height: 630 }] },
	};
}

export default function InfluencerRatePage() {
	return (
		<>
			<Client />
			<ToolArticle slug="influencer-rate-guide" />
		</>
	);
}
