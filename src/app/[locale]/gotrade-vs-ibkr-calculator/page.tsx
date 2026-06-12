import type { Metadata } from "next";
import Client from "./Client";

export async function generateMetadata(): Promise<Metadata> {
	const title = "GoTrade vs IBKR Wise Fee Calculator";
	const description =
		"Compare FX conversion spreads and trading fees to find the break-even deposit amount for GoTrade and Interactive Brokers (IBKR) in the Philippines.";
	let ogUrl = `/api/og?title=${encodeURIComponent(title)}&desc=${encodeURIComponent(description)}`;
	ogUrl += "&s1l=GoTrade&s1v=IBKR&s2l=Fees&s2v=Compared";
	return {
		title,
		description,
		openGraph: { images: [{ url: ogUrl, width: 1200, height: 630 }] },
	};
}

export default function GotradeIbkrPage() {
	return (
		<>
			<Client />
		</>
	);
}
