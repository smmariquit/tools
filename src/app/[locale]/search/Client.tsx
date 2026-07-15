"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { useMemo } from "react";
import { toolCategories } from "../../../lib/routes";
import { rankTools } from "../../../lib/toolSearch";

export default function SearchClient() {
	const t = useTranslations("Search");
	const searchParams = useSearchParams();
	const q = searchParams?.get("query") || "";
	const pathname = usePathname();
	const parts = (pathname || "").split("/").filter(Boolean);
	const localePrefix = parts.length ? `/${parts[0]}` : "";

	const results = useMemo(() => {
		if (!q) return [];
		const items = toolCategories.flatMap((c) => c.items);
		return rankTools(q, items)
			.slice(0, 50)
			.map((r) => r.tool);
	}, [q]);

	return (
		<div className="container" style={{ padding: "24px 0" }}>
			<h1 style={{ marginBottom: 12 }}>
				{t("resultsFor")} “{searchParams?.get("query")}"
			</h1>
			{!q && <p>{t("enterSearch")}</p>}
			{q && results.length === 0 && <p>{t("noResults")}</p>}
			<ul style={{ listStyle: "none", padding: 0, marginTop: 12 }}>
				{results.map((r) => (
					<li key={r.path} style={{ marginBottom: 12 }}>
						<Link
							href={`${localePrefix}${r.path}`}
							className="card"
							style={{ padding: 12, display: "block" }}
						>
							<strong>{r.name}</strong>
							<div style={{ color: "var(--text-secondary)" }}>{r.desc}</div>
						</Link>
					</li>
				))}
			</ul>
		</div>
	);
}
