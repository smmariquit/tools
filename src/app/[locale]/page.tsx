import type { Metadata } from "next";
import { useTranslations } from "next-intl";
import { allToolPaths } from "../../lib/routes";
import ToolSearch from "./components/ToolSearch";

export const metadata: Metadata = {
	title: "PH Tools & Calculators | Free Online Utilities",
	description:
		"Free, accurate calculators and tools for Filipinos. Compute your SSS, PhilHealth, Pag-IBIG, tax, net pay, and more.",
	openGraph: {
		images: [
			{
				url: `/api/og?title=PH%20Tools%20%26%20Calculators%20%7C%20Free%20Online%20Utilities&desc=Free%2C%20accurate%20calculators%20and%20tools%20for%20Filipinos.%20Compute%20your%20SSS%2C%20PhilHealth%2C%20Pag-IBIG%2C%20tax%2C%20net%20pay%2C%20and%20more.&s1l=Total%20Tools&s1v=${allToolPaths.length}&s2l=App%20Type&s2v=PWA&s3l=Cost&s3v=Free`,
				width: 1200,
				height: 630,
			},
		],
	},
};

export default function Home() {
	const t = useTranslations("Index");
	return (
		<>
			<div
				className="page-header"
				style={{
					textAlign: "center",
					borderBottom: "none",
					marginBottom: "48px",
				}}
			>
				<h1
					className="page-title"
					style={{ fontSize: "36px", marginBottom: "16px" }}
				>
					{t("title")}
				</h1>
				<p
					className="page-subtitle"
					style={{
						maxWidth: "600px",
						margin: "0 auto",
						fontSize: "18px",
						marginBottom: "24px",
					}}
				>
					{t("subtitle")}
				</p>
				<div
					style={{
						display: "inline-flex",
						alignItems: "center",
						gap: "12px",
					}}
				>
					<div
						style={{
							display: "inline-flex",
							alignItems: "center",
							gap: "8px",
							backgroundColor: "rgba(13, 71, 161, 0.08)",
							color: "var(--primary)",
							padding: "8px 16px",
							borderRadius: "6px",
							fontSize: "14px",
							fontWeight: 600,
							border: "1px solid rgba(13, 71, 161, 0.15)",
							boxShadow: "0 2px 4px rgba(0,0,0,0.02)",
						}}
					>
						<svg
							width="16"
							height="16"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							strokeWidth="2"
							strokeLinecap="round"
							strokeLinejoin="round"
						>
							<path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"></path>
						</svg>
						{t("worksOffline")}
					</div>
					<div
						style={{
							display: "inline-flex",
							alignItems: "center",
							gap: "8px",
							backgroundColor: "rgba(16, 185, 129, 0.08)",
							color: "#10b981",
							padding: "8px 16px",
							borderRadius: "6px",
							fontSize: "14px",
							fontWeight: 600,
							border: "1px solid rgba(16, 185, 129, 0.15)",
							boxShadow: "0 2px 4px rgba(0,0,0,0.02)",
						}}
					>
						🔧 {allToolPaths.length} Tools Available
					</div>
				</div>
			</div>

			<ToolSearch />
		</>
	);
}
