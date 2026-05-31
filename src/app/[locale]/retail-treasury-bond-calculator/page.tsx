import type { Metadata } from "next";
import ToolFooter from "../../components/ToolFooter";
import Client from "./Client";

export async function generateMetadata(): Promise<Metadata> {
	const title = "Retail Treasury Bond (RTB) Yield Estimator | Philippines";
	const description = "Calculate your net quarterly payouts and total yield on Philippine Retail Treasury Bonds after the 20% final withholding tax.";
	let ogUrl = `/api/og?title=${encodeURIComponent(title)}&desc=${encodeURIComponent(description)}`;
	ogUrl += "&s1l=RTB&s1v=Yield&s2l=Tax&s2v=20%25";
	return { title, description, openGraph: { images: [{ url: ogUrl, width: 1200, height: 630 }] } };
}

export default function RtbPage() {
	return (
		<>
			<Client />
			<ToolFooter currentPath="/retail-treasury-bond-calculator" />
		</>
	);
}
