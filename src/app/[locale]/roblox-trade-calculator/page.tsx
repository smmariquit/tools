import type { Metadata } from "next";
import ToolFooter from "../../components/ToolFooter";
import Client from "./Client";

export async function generateMetadata(): Promise<Metadata> {
	const title =
		"Roblox Trading Fairness Calculator (Adopt Me / Blox Fruits) | PHTools";
	const description =
		"Calculate trade fairness for Adopt Me, Blox Fruits, and other Roblox games using point values. Check if a trade is a Win, Loss, or Fair.";
	let ogUrl = `/api/og?title=${encodeURIComponent(title)}&desc=${encodeURIComponent(description)}`;
	ogUrl += "&s1l=Trading&s1v=Roblox&s2l=Win&s2v=Loss";
	return {
		title,
		description,
		openGraph: { images: [{ url: ogUrl, width: 1200, height: 630 }] },
	};
}

export default function RobloxTradePage() {
	return (
		<>
			<Client />
			<ToolFooter currentPath="/roblox-trade-calculator" />
		</>
	);
}
