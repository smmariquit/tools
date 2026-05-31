import type { Metadata } from "next";
import ToolFooter from "../../components/ToolFooter";
import Client from "./Client";

export async function generateMetadata(): Promise<Metadata> {
	const title = "Local Shipping & Logistics Rate Estimator | Philippines";
	const description = "Calculate standard delivery and logistics costs for local MSME e-commerce utilizing standard regional matrices.";
	let ogUrl = `/api/og?title=${encodeURIComponent(title)}&desc=${encodeURIComponent(description)}`;
	ogUrl += "&s1l=Local&s1v=Shipping&s2l=Rates&s2v=Estimated";
	return { title, description, openGraph: { images: [{ url: ogUrl, width: 1200, height: 630 }] } };
}

export default function ShippingPage() {
	return (
		<>
			<Client />
			<ToolFooter currentPath="/shipping-logistics-estimator" />
		</>
	);
}
