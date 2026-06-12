import type { Metadata } from "next";
import Client from "./Client";

export async function generateMetadata(): Promise<Metadata> {
	const title = "PDIC Deposit Insurance Calculator | Philippines";
	const description =
		"Calculate your maximum PDIC deposit insurance coverage (up to ₱500,000) for single and joint bank accounts.";
	let ogUrl = `/api/og?title=${encodeURIComponent(title)}&desc=${encodeURIComponent(description)}`;
	ogUrl += "&s1l=PDIC&s1v=Coverage&s2l=Max&s2v=500K";
	return {
		title,
		description,
		openGraph: { images: [{ url: ogUrl, width: 1200, height: 630 }] },
	};
}

export default function PdicPage() {
	return (
		<>
			<Client />
		</>
	);
}
