"use client";

import { useTranslations } from "next-intl";
import CopyLinkButton from "../CopyLinkButton";
import VisitorCount from "../VisitorCount";

/** Hand-drawn accent label shown above a tool's title. */
export default function ToolEyebrow() {
	const t = useTranslations("Doodle");
	return (
		<span
			style={{
				display: "flex",
				alignItems: "center",
				justifyContent: "space-between",
				flexWrap: "wrap",
				gap: "8px 16px",
			}}
		>
			<span className="eyebrow">{t("toolEyebrow")}</span>
			{/* Quiet utility cluster, visually separated from the playful eyebrow. */}
			<span
				style={{
					display: "inline-flex",
					alignItems: "center",
					gap: "12px",
					marginLeft: "auto",
				}}
			>
				<VisitorCount />
				<span aria-hidden="true" style={{ color: "var(--border-color)" }}>
					·
				</span>
				<CopyLinkButton />
			</span>
		</span>
	);
}
