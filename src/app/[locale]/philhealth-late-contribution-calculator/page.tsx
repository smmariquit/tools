import type { Metadata } from "next";
import Client from "./Client";

export async function generateMetadata(): Promise<Metadata> {
	const title = "PhilHealth Late Contribution Penalty Estimator";
	const description =
		"Estimate interest penalties on missed PhilHealth premium payments for voluntary members.";
	let ogUrl = `/api/og?title=${encodeURIComponent(title)}&desc=${encodeURIComponent(description)}`;
	ogUrl += "&s1l=PhilHealth&s1v=Late&s2l=Penalty&s2v=Computed";
	return {
		title,
		description,
		openGraph: { images: [{ url: ogUrl, width: 1200, height: 630 }] },
	};
}

export default function PhilhealthLatePage() {
	return (
		<>
			<Client />
		</>
	);
}
