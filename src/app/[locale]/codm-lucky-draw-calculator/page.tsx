import type { Metadata } from "next";
import ToolFooter from "../../components/ToolFooter";
import Client from "./Client";

export async function generateMetadata(): Promise<Metadata> {
	const title = "CODM Lucky Draw Estimator | PHTools";
	const description = "Calculate the total CP and PHP cost required to complete a Mythic or Legendary Lucky Draw in Call of Duty: Mobile.";
	let ogUrl = `/api/og?title=${encodeURIComponent(title)}&desc=${encodeURIComponent(description)}`;
	ogUrl += "&s1l=CODM&s1v=Lucky%20Draw&s2l=CP&s2v=Cost";
	return { title, description, openGraph: { images: [{ url: ogUrl, width: 1200, height: 630 }] } };
}

export default function CodmLuckyDrawPage() {
	return (
		<>
			<Client />
			<ToolFooter currentPath="/codm-lucky-draw-calculator" />
		</>
	);
}
