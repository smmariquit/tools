import type { Metadata } from "next";
import ToolFooter from "../../components/ToolFooter";
import Client from "./Client";

export async function generateMetadata(): Promise<Metadata> {
	const title = "Batas Kasambahay Statutory Retirement Pay Calculator";
	const description = "Calculate retirement pay for domestic workers under Article 302 of the Labor Code and Batas Kasambahay.";
	let ogUrl = `/api/og?title=${encodeURIComponent(title)}&desc=${encodeURIComponent(description)}`;
	ogUrl += "&s1l=Retirement&s1v=Pay&s2l=Kasambahay&s2v=Computed";
	return { title, description, openGraph: { images: [{ url: ogUrl, width: 1200, height: 630 }] } };
}

export default function KasambahayRetirementPage() {
	return (
		<>
			<Client />
			<ToolFooter currentPath="/kasambahay-retirement-calculator" />
		</>
	);
}
