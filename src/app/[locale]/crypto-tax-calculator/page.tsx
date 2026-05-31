import type { Metadata } from "next";
import ToolFooter from "../../components/ToolFooter";
import Client from "./Client";

export async function generateMetadata(): Promise<Metadata> {
	const title = "BIR Crypto Tax Calculator | Philippines";
	const description = "Calculate your potential income tax liability on crypto trading profits and GameFi earnings under BIR regulations.";
	let ogUrl = `/api/og?title=${encodeURIComponent(title)}&desc=${encodeURIComponent(description)}`;
	ogUrl += "&s1l=Crypto&s1v=Tax&s2l=BIR&s2v=Computed";
	return { title, description, openGraph: { images: [{ url: ogUrl, width: 1200, height: 630 }] } };
}

export default function CryptoTaxPage() {
	return (
		<>
			<Client />
			<ToolFooter currentPath="/crypto-tax-calculator" />
		</>
	);
}
