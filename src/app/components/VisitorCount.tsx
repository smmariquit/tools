"use client";

import { usePathname } from "next/navigation";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";

/**
 * Subtle "people helped" counter backed by Abacus (https://jasoncameron.dev/abacus/),
 * a free, stateless hit-counter API. GET /hit/:namespace/:key increments and
 * returns { value }, creating the counter on first call. No key/auth needed for
 * incrementing, so this is safe to call straight from the client.
 */
const NAMESPACE = "phtools.me";
const LOCALES = ["en", "tl", "ceb"];

/** Derive a stable counter key from the (locale-stripped) pathname. */
function keyFromPath(pathname: string): string {
	const parts = pathname.split("/").filter(Boolean);
	if (parts.length > 0 && LOCALES.includes(parts[0])) parts.shift();
	return parts.join("--") || "home";
}

type Props = {
	/** Override the counter key. Defaults to the current path slug. */
	counterKey?: string;
	/** Which translation string to show. */
	messageKey?: "helped" | "helpedSite";
	/** Render as a pill badge (home hero) instead of subtle inline text. */
	badge?: boolean;
};

const Heart = () => (
	<svg
		width="13"
		height="13"
		viewBox="0 0 24 24"
		fill="currentColor"
		aria-hidden="true"
	>
		<path d="M12 21s-7.5-4.9-10-9.3C.4 8.9 1.6 5.5 4.8 5.1 6.9 4.8 8.6 6 9.6 7.4L12 10l2.4-2.6C15.4 6 17.1 4.8 19.2 5.1c3.2.4 4.4 3.8 2.8 6.6C19.5 16.1 12 21 12 21z" />
	</svg>
);

export default function VisitorCount({
	counterKey,
	messageKey = "helped",
	badge = false,
}: Props) {
	const pathname = usePathname();
	const t = useTranslations("VisitorCount");
	const [count, setCount] = useState<number | null>(null);

	useEffect(() => {
		const key = counterKey ?? keyFromPath(pathname);
		const controller = new AbortController();
		fetch(
			`https://abacus.jasoncameron.dev/hit/${NAMESPACE}/${encodeURIComponent(key)}`,
			{ signal: controller.signal },
		)
			.then((r) => (r.ok ? r.json() : null))
			.then((d) => {
				if (d && typeof d.value === "number") setCount(d.value);
			})
			.catch(() => {});
		return () => controller.abort();
	}, [counterKey, pathname]);

	if (count == null) return null;

	const formatted = count.toLocaleString();
	const label = t(messageKey, { count: formatted });
	const aria = t("aria", { count: formatted });

	if (badge) {
		return (
			<span
				role="status"
				style={{
					display: "inline-flex",
					alignItems: "center",
					gap: "8px",
					backgroundColor: "#fce7f3",
					color: "#831843",
					padding: "8px 16px",
					borderRadius: "6px",
					fontSize: "14px",
					fontWeight: 600,
					border: "1px solid #f9a8d4",
					boxShadow: "0 2px 4px rgba(0,0,0,0.02)",
				}}
			>
				<Heart />
				{label}
			</span>
		);
	}

	return (
		<span
			role="status"
			title={aria}
			style={{
				display: "inline-flex",
				alignItems: "center",
				gap: "5px",
				fontSize: "13px",
				fontWeight: 500,
				color: "var(--text-secondary)",
			}}
		>
			<span style={{ color: "#c2255c", display: "inline-flex" }}>
				<Heart />
			</span>
			{label}
		</span>
	);
}
