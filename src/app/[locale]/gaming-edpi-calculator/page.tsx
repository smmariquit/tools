import type { Metadata } from "next";
import ToolFooter from "../../components/ToolFooter";
import Client from "./Client";

export async function generateMetadata(): Promise<Metadata> {
	const title = "Gaming eDPI & Sensitivity Converter | PHTools";
	const description = "Convert mouse sensitivity and eDPI between Valorant, CS2, Apex Legends, and Overwatch.";
	let ogUrl = `/api/og?title=${encodeURIComponent(title)}&desc=${encodeURIComponent(description)}`;
	ogUrl += "&s1l=eDPI&s1v=Converter&s2l=Game&s2v=Sensitivity";
	return { title, description, openGraph: { images: [{ url: ogUrl, width: 1200, height: 630 }] } };
}

export default function GamingEdpiPage() {
	return (
		<>
			<Client />
			<ToolFooter currentPath="/gaming-edpi-calculator" />
		</>
	);
}
