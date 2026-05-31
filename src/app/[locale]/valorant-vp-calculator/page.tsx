import type { Metadata } from "next";
import ToolFooter from "../../components/ToolFooter";
import Client from "./Client";

export async function generateMetadata(): Promise<Metadata> {
	const title = "Valorant VP to PHP Calculator | PHTools";
	const description = "Convert Valorant Points (VP) directly to Philippine Pesos to check the real cost of Night Market and Store skins.";
	let ogUrl = `/api/og?title=${encodeURIComponent(title)}&desc=${encodeURIComponent(description)}`;
	ogUrl += "&s1l=Valorant&s1v=VP&s2l=to&s2v=PHP";
	return { title, description, openGraph: { images: [{ url: ogUrl, width: 1200, height: 630 }] } };
}

export default function ValorantVpPage() {
	return (
		<>
			<Client />
			<ToolFooter currentPath="/valorant-vp-calculator" />
		</>
	);
}
