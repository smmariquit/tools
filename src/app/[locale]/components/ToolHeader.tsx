"use client";

import BackButton from "../../components/BackButton";
import ToolEyebrow from "../../components/doodle/ToolEyebrow";
import ToolIllustration from "../../components/illustrations/ToolIllustration";
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
				<BackButton fallbackHref={backLink} style={{ marginBottom: "16px" }}>
					{backText}
				</BackButton>
				<ToolIllustration />
				<ToolEyebrow />
				<h1 className="page-title">{title}</h1>
				<p className="page-subtitle">{subtitle}</p>
			</div>
			<AdBanner dataAdSlot={adSlotId} />
		</>
	);
}
