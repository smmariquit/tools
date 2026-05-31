import type { Metadata } from "next";
import ToolFooter from "../../components/ToolFooter";
import Client from "./Client";

export async function generateMetadata(): Promise<Metadata> {
	const title = "Web3 Scholar-Manager Split Calculator | PHTools";
	const description =
		"Calculate how much each person gets from Axie Infinity, Pixels, and other web3 gaming guilds under different scholar/manager percentages.";
	let ogUrl = `/api/og?title=${encodeURIComponent(title)}&desc=${encodeURIComponent(description)}`;
	ogUrl += "&s1l=Web3&s1v=Scholar&s2l=Split&s2v=Manager";
	return {
		title,
		description,
		openGraph: { images: [{ url: ogUrl, width: 1200, height: 630 }] },
	};
}

export default function Web3ScholarPage() {
	return (
		<>
			<Client />
			<ToolFooter currentPath="/web3-scholar-calculator" />
		</>
	);
}
