import type { Metadata } from "next";
import ToolFooter from "../../components/ToolFooter";
import Client from "./Client";

export async function generateMetadata(): Promise<Metadata> {
	const title = "Genshin Pity & Primogem Calculator | PHTools";
	const description = "Calculate how many Primogems, Fates, and PHP you need to guarantee a 5-star character in Genshin Impact.";
	let ogUrl = `/api/og?title=${encodeURIComponent(title)}&desc=${encodeURIComponent(description)}`;
	ogUrl += "&s1l=Genshin&s1v=Pity&s2l=Primogems&s2v=Calculator";
	return { title, description, openGraph: { images: [{ url: ogUrl, width: 1200, height: 630 }] } };
}

export default function GenshinPityPage() {
	return (
		<>
			<Client />
			<ToolFooter currentPath="/genshin-pity-calculator" />
		</>
	);
}
