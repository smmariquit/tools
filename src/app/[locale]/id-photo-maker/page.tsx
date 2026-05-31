import ToolFooter from "../../components/ToolFooter";
import type { Metadata } from "next";
import Client from "./Client";

export const metadata: Metadata = {
	title: "Free ID Photo Maker (1x1, 2x2, Passport) | PHTools",
	description:
		"Free web tool to crop selfies into Philippine 2x2, 1x1, and Passport (35x45mm) sizes at 300 DPI. Processed securely on your device.",
	openGraph: {
		images: [
			{
				url: `/api/og?title=Free%20ID%20Photo%20Maker%20%281x1%2C%202x2%2C%20Passport%29%20%7C%20PHTools&desc=Free%20web%20tool%20to%20crop%20selfies%20into%20Philippine%202x2%2C%201x1%2C%20and%20Passport%20%2835x45mm%29%20sizes%20at%20300%20DPI.%20Processed%20securely%20on%20your%20device.&s1l=Format&s1v=1x1&s2l=Format&s2v=2x2&s3l=Format&s3v=Passport`,
				width: 1200,
				height: 630,
			},
		],
	},
};

export default function IDPhotoMakerPage() {
	const jsonLd = {
		"@context": "https://schema.org",
		"@type": "SoftwareApplication",
		name: "ID Photo Maker",
		applicationCategory: "MultimediaApplication",
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
			<ToolFooter currentPath="/id-photo-maker" />
		</>
	);
}
