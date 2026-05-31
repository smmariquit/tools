import type { Metadata } from "next";
import ToolFooter from "../../components/ToolFooter";
import Client from "./Client";

export async function generateMetadata(): Promise<Metadata> {
	const title = "Roblox Robux to PHP Calculator | PHTools";
	const description =
		"Calculate how much Robux costs to buy in Philippine Pesos (PHP) or compute your earnings when cashing out via DevEx.";
	let ogUrl = `/api/og?title=${encodeURIComponent(title)}&desc=${encodeURIComponent(description)}`;
	ogUrl += "&s1l=Robux&s1v=PHP&s2l=DevEx&s2v=Cashout";
	return {
		title,
		description,
		openGraph: { images: [{ url: ogUrl, width: 1200, height: 630 }] },
	};
}

export default function RobloxRobuxPage() {
	return (
		<>
			<Client />
			<ToolFooter currentPath="/roblox-robux-calculator" />
		</>
	);
}
