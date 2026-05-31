import type { Metadata } from "next";
import ToolFooter from "../../components/ToolFooter";
import Client from "./Client";

export async function generateMetadata(): Promise<Metadata> {
	const title = "MLBB Win Rate Calculator | PHTools";
	const description = "Calculate exactly how many consecutive wins you need to reach your target win rate in Mobile Legends.";
	let ogUrl = `/api/og?title=${encodeURIComponent(title)}&desc=${encodeURIComponent(description)}`;
	ogUrl += "&s1l=MLBB&s1v=Win%20Rate&s2l=Calculator&s2v=Matches";
	return { title, description, openGraph: { images: [{ url: ogUrl, width: 1200, height: 630 }] } };
}

export default function MlbbWinratePage() {
	return (
		<>
			<Client />
			<ToolFooter currentPath="/mlbb-winrate-calculator" />
		</>
	);
}
