import type { Metadata } from "next";
import ToolFooter from "../../components/ToolFooter";
import Client from "./Client";

export async function generateMetadata(): Promise<Metadata> {
	const title = "P2P Crypto Cash-Out Calculator | USDT to PHP";
	const description = "Calculate your actual PHP earnings when cashing out USDT via P2P (Binance, Bybit), factoring in merchant rates and bank/e-wallet limits.";
	let ogUrl = `/api/og?title=${encodeURIComponent(title)}&desc=${encodeURIComponent(description)}`;
	ogUrl += "&s1l=P2P&s1v=Cash-Out&s2l=USDT&s2v=to%20PHP";
	return { title, description, openGraph: { images: [{ url: ogUrl, width: 1200, height: 630 }] } };
}

export default function CryptoP2PPage() {
	return (
		<>
			<Client />
			<ToolFooter currentPath="/crypto-p2p-cashout-calculator" />
		</>
	);
}
