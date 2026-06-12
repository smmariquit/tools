import type { Metadata } from "next";
import Client from "./Client";

export async function generateMetadata(): Promise<Metadata> {
	const title = "Philippine Estate Tax Calculator";
	const description =
		"Calculate the 6% flat estate tax under the TRAIN Law, factoring in standard deductions and family home allowance.";
	let ogUrl = `/api/og?title=${encodeURIComponent(title)}&desc=${encodeURIComponent(description)}`;
	ogUrl += "&s1l=Estate&s1v=Tax&s2l=Deductions&s2v=Computed";
	return {
		title,
		description,
		openGraph: { images: [{ url: ogUrl, width: 1200, height: 630 }] },
	};
}

export default function EstateTaxPage() {
	return (
		<>
			<Client />
		</>
	);
}
