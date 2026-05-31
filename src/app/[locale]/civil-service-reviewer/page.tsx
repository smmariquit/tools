import type { Metadata } from "next";
import ToolFooter from "../../components/ToolFooter";
import Client from "./Client";

export async function generateMetadata(): Promise<Metadata> {
	const title = "Civil Service Exam Reviewer | Philippines";
	const description = "Offline-capable mock exams and flashcards for the Philippine Civil Service Examination (CSE).";
	let ogUrl = `/api/og?title=${encodeURIComponent(title)}&desc=${encodeURIComponent(description)}`;
	ogUrl += "&s1l=Civil&s1v=Service&s2l=Exam&s2v=Reviewer";
	return { title, description, openGraph: { images: [{ url: ogUrl, width: 1200, height: 630 }] } };
}

export default function CivilServicePage() {
	return (
		<>
			<Client />
			<ToolFooter currentPath="/civil-service-reviewer" />
		</>
	);
}
