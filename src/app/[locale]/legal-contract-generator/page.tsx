import type { Metadata } from "next";
import Client from "./Client";

export async function generateMetadata(): Promise<Metadata> {
	const title = "Legal Contract Generator | Philippine Templates";
	const description =
		"Generate standard Philippine legal documents (Lease Agreements, Promissory Notes) securely in your browser.";
	let ogUrl = `/api/og?title=${encodeURIComponent(title)}&desc=${encodeURIComponent(description)}`;
	ogUrl += "&s1l=Legal&s1v=Contract&s2l=Generator&s2v=Free";
	return {
		title,
		description,
		openGraph: { images: [{ url: ogUrl, width: 1200, height: 630 }] },
	};
}

export default function LegalContractPage() {
	return (
		<>
			<Client />
		</>
	);
}
