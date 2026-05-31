import type { Metadata } from "next";
import ToolFooter from "../../components/ToolFooter";
import Client from "./Client";

export async function generateMetadata(): Promise<Metadata> {
	const title = "Digital Ticketing QR Generator";
	const description = "Generate secure QR code tickets for events instantly without needing a heavy database.";
	let ogUrl = `/api/og?title=${encodeURIComponent(title)}&desc=${encodeURIComponent(description)}`;
	ogUrl += "&s1l=Digital&s1v=Ticket&s2l=QR&s2v=Generator";
	return { title, description, openGraph: { images: [{ url: ogUrl, width: 1200, height: 630 }] } };
}

export default function DigitalTicketPage() {
	return (
		<>
			<Client />
			<ToolFooter currentPath="/digital-ticket-generator" />
		</>
	);
}
