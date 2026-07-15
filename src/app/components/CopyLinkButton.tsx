"use client";

import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";

/** Small icon button that copies the current page URL to the clipboard. */
export default function CopyLinkButton() {
	const t = useTranslations("Share");
	const [copied, setCopied] = useState(false);

	useEffect(() => {
		if (!copied) return;
		const id = setTimeout(() => setCopied(false), 1800);
		return () => clearTimeout(id);
	}, [copied]);

	async function copy() {
		try {
			await navigator.clipboard.writeText(window.location.href);
			setCopied(true);
		} catch {
			// Fallback for older browsers / insecure contexts.
			const ta = document.createElement("textarea");
			ta.value = window.location.href;
			ta.style.position = "fixed";
			ta.style.opacity = "0";
			document.body.appendChild(ta);
			ta.select();
			try {
				document.execCommand("copy");
				setCopied(true);
			} catch {
				/* no-op */
			}
			document.body.removeChild(ta);
		}
	}

	const label = copied ? t("copied") : t("copyLink");

	return (
		<button
			type="button"
			onClick={copy}
			aria-label={label}
			title={label}
			style={{
				display: "inline-flex",
				alignItems: "center",
				gap: "5px",
				padding: "3px 4px",
				fontSize: "14px",
				fontWeight: 500,
				lineHeight: 1.2,
				color: copied ? "#1b5e20" : "var(--text-secondary)",
				background: "transparent",
				border: "none",
				borderRadius: "6px",
				cursor: "pointer",
			}}
		>
			{copied ? (
				<svg
					width="14"
					height="14"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					strokeWidth="2.4"
					strokeLinecap="round"
					strokeLinejoin="round"
					aria-hidden="true"
				>
					<path d="M20 6 9 17l-5-5" />
				</svg>
			) : (
				<svg
					width="14"
					height="14"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					strokeWidth="2"
					strokeLinecap="round"
					strokeLinejoin="round"
					aria-hidden="true"
				>
					<path d="M10 13a5 5 0 0 0 7 0l3-3a5 5 0 0 0-7-7l-1 1" />
					<path d="M14 11a5 5 0 0 0-7 0l-3 3a5 5 0 0 0 7 7l1-1" />
				</svg>
			)}
			{label}
		</button>
	);
}
