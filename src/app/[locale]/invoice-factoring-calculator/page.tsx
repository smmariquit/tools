import type { Metadata } from "next";
import ToolFooter from "../../components/ToolFooter";
import Client from "./Client";

export async function generateMetadata(): Promise<Metadata> {
	const title = "Invoice Factoring & Discount Calculator | Philippines";
	const description = "Calculate Net Present Value (NPV), annualized discount rates (APR), and ROI when selling unpaid invoices for working capital.";
	let ogUrl = `/api/og?title=${encodeURIComponent(title)}&desc=${encodeURIComponent(description)}`;
	ogUrl += "&s1l=Invoice&s1v=Factoring&s2l=Discount&s2v=Calculator";
	return { title, description, openGraph: { images: [{ url: ogUrl, width: 1200, height: 630 }] } };
}

export default function InvoiceFactoringPage() {
	return (
		<>
			<Client />
			<ToolFooter currentPath="/invoice-factoring-calculator" />
		</>
	);
}
