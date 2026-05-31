import type { Metadata } from "next";
import ToolFooter from "../../components/ToolFooter";
import Client from "./Client";

export async function generateMetadata(): Promise<Metadata> {
	const title = "Dota 2 Battle Pass PHP Calculator | PHTools";
	const description = "Calculate how much real money (PHP) you need to spend to reach specific levels in the Dota 2 Battle Pass or Compendium.";
	let ogUrl = `/api/og?title=${encodeURIComponent(title)}&desc=${encodeURIComponent(description)}`;
	ogUrl += "&s1l=Dota%202&s1v=Battle%20Pass&s2l=Cost&s2v=PHP";
	return { title, description, openGraph: { images: [{ url: ogUrl, width: 1200, height: 630 }] } };
}

export default function Dota2BattlepassPage() {
	return (
		<>
			<Client />
			<ToolFooter currentPath="/dota2-battlepass-calculator" />
		</>
	);
}
