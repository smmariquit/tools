import type { Metadata } from "next";
import ToolFooter from "../../components/ToolFooter";
import Client from "./Client";

export async function generateMetadata(): Promise<Metadata> {
	const title = "MLBB Diamond Top-Up Calculator | PHTools";
	const description = "Find the best PHP-to-Diamond ratio across Codashop, GCash, Maya, and UniPin for Mobile Legends Bang Bang.";
	let ogUrl = `/api/og?title=${encodeURIComponent(title)}&desc=${encodeURIComponent(description)}`;
	ogUrl += "&s1l=MLBB&s1v=Top-Up&s2l=Compare&s2v=Prices";
	return { title, description, openGraph: { images: [{ url: ogUrl, width: 1200, height: 630 }] } };
}

export default function MlbbDiamondPage() {
	return (
		<>
			<Client />
			<ToolFooter currentPath="/mlbb-diamond-calculator" />
		</>
	);
}
