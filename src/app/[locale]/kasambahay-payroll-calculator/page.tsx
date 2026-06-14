import type { Metadata } from "next";
import Client from "./Client";
import ToolArticle from "../../components/ToolArticle";

export async function generateMetadata(): Promise<Metadata> {
	const title = "Kasambahay Monthly Contribution & Payroll Calculator";
	const description =
		"Compute the SSS, PhilHealth, and Pag-IBIG contributions for household employees based on the Batas Kasambahay.";
	let ogUrl = `/api/og?title=${encodeURIComponent(title)}&desc=${encodeURIComponent(description)}`;
	ogUrl += "&s1l=Kasambahay&s1v=Payroll&s2l=Contributions&s2v=Computed";
	return {
		title,
		description,
		openGraph: { images: [{ url: ogUrl, width: 1200, height: 630 }] },
	};
}

export default function KasambahayPayrollPage() {
	return (
		<>
			<Client />
			<ToolArticle slug="kasambahay-payroll-guide" />
		</>
	);
}
