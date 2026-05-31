import type { Metadata } from "next";
import ToolFooter from "../../components/ToolFooter";
import Client from "./Client";

export async function generateMetadata(): Promise<Metadata> {
	const title = "PH Crypto Exchange Spread Calculator | Coins.ph, PDAX, GCash";
	const description = "Compare hidden spreads and buying costs across Philippine crypto exchanges (Coins.ph, PDAX, GCash, Maya) against global spot rates.";
	let ogUrl = `/api/og?title=${encodeURIComponent(title)}&desc=${encodeURIComponent(description)}`;
	ogUrl += "&s1l=Crypto&s1v=Spreads&s2l=Compare&s2v=PH%20Exchanges";
	return { title, description, openGraph: { images: [{ url: ogUrl, width: 1200, height: 630 }] } };
}

export default function CryptoSpreadPage() {
	return (
		<>
			<Client />
			<ToolFooter currentPath="/crypto-spread-calculator" />
		</>
	);
}
