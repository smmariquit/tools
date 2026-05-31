import type { Metadata } from "next";
import ToolFooter from "../../components/ToolFooter";
import Client from "./Client";

export async function generateMetadata(): Promise<Metadata> {
	const title =
		"Web3 Token to PHP Cash-Out Calculator (SLP, RON, PIXEL) | PHTools";
	const description =
		"Convert in-game web3 tokens like SLP, RON, and PIXEL to Philippine Pesos (PHP) factoring in exchange rates, gas fees, and P2P spreads.";
	let ogUrl = `/api/og?title=${encodeURIComponent(title)}&desc=${encodeURIComponent(description)}`;
	ogUrl += "&s1l=Web3&s1v=Tokens&s2l=to&s2v=PHP";
	return {
		title,
		description,
		openGraph: { images: [{ url: ogUrl, width: 1200, height: 630 }] },
	};
}

export default function Web3TokenPage() {
	return (
		<>
			<Client />
			<ToolFooter currentPath="/web3-token-calculator" />
		</>
	);
}
