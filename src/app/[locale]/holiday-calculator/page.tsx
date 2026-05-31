import ToolFooter from "../../components/ToolFooter";
import type { Metadata } from "next";
import Client from "./Client";

export const metadata: Metadata = {
	title: "Holiday & Overtime Pay Calculator (DOLE Rules) | PHTools",
	description:
		"Calculate your exact pay for working on Regular Holidays, Special Non-Working Days, and Rest Days based on DOLE Philippine labor rules.",
	openGraph: {
		images: [
			{
				url: `/api/og?title=Holiday%20%26%20Overtime%20Pay%20Calculator%20%28DOLE%20Rules%29%20%7C%20PHTools&desc=Calculate%20your%20exact%20pay%20for%20working%20on%20Regular%20Holidays%2C%20Special%20Non-Working%20Days%2C%20and%20Rest%20Days%20based%20on%20DOLE%20Philippine%20labor%20rules.&s1l=Rate&s1v=₱1k&s2l=Multiplier&s2v=200%25&s3l=Pay&s3v=₱2k`,
				width: 1200,
				height: 630,
			},
		],
	},
};

export default function HolidayPage() {
	const jsonLd = {
		"@context": "https://schema.org",
		"@type": "SoftwareApplication",
		name: "Holiday Pay Calculator",
		applicationCategory: "BusinessApplication",
		operatingSystem: "All",
		description: metadata.description,
		offers: {
			"@type": "Offer",
			price: "0",
			priceCurrency: "PHP",
		},
	};

	return (
		<>
			<script
				type="application/ld+json"
				dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
			/>
			<Client />
			<ToolFooter currentPath="/holiday-calculator" />
		</>
	);
}
