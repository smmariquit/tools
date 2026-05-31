"use client";

import Link from "next/link";
import AdBanner from "./AdBanner";

type ToolHeaderProps = {
	title: string;
	subtitle: string;
	adSlotId?: string;
	backLink?: string;
	backText?: string;
};

export default function ToolHeader({
	title,
	subtitle,
	adSlotId = "1234567890",
	backLink = "/",
	backText = "Back to Tools",
}: ToolHeaderProps) {
	return (
		<>
			<div style={{ marginBottom: "24px" }}>
				<Link
					href={backLink}
					style={{
						fontSize: "14px",
						display: "inline-block",
						marginBottom: "16px",
					}}
				>
					&larr; {backText}
				</Link>
				<h1 className="page-title">{title}</h1>
				<p className="page-subtitle">{subtitle}</p>
			</div>
			<AdBanner dataAdSlot={adSlotId} />
		</>
	);
}
