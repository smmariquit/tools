import type { Metadata } from "next";
import ToolFooter from "../../components/ToolFooter";
import Client from "./Client";

export async function generateMetadata(): Promise<Metadata> {
	const title = "Dota 2 MMR to Rank Calculator | PHTools";
	const description = "Convert your Dota 2 MMR to its corresponding Medal (Herald to Immortal) and estimate wins needed to rank up.";
	let ogUrl = `/api/og?title=${encodeURIComponent(title)}&desc=${encodeURIComponent(description)}`;
	ogUrl += "&s1l=Dota%202&s1v=MMR&s2l=Rank&s2v=Calculator";
	return { title, description, openGraph: { images: [{ url: ogUrl, width: 1200, height: 630 }] } };
}

export default function Dota2MmrPage() {
	return (
		<>
			<Client />
			<ToolFooter currentPath="/dota2-mmr-calculator" />
		</>
	);
}
