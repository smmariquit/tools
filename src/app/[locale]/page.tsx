import type { Metadata } from "next";
import { useTranslations } from "next-intl";
import { allToolPaths } from "../../lib/routes";
import Squiggle from "../components/doodle/Squiggle";
import WavyDivider from "../components/doodle/WavyDivider";
import VisitorCount from "../components/VisitorCount";
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
					marginBottom: "20px",
				}}
			>
				<span className="eyebrow">{t("heroEyebrow")}</span>
				<h1
					className="page-title"
					style={{ fontSize: "36px", marginBottom: "8px" }}
				>
					{t("title")}
				</h1>
				<div className="squiggle-center" style={{ marginBottom: "16px" }}>
					<Squiggle width={180} />
				</div>
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
						justifyContent: "center",
						flexWrap: "wrap",
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
						{allToolPaths.length} Tools Available
					</div>
					<VisitorCount counterKey="home" messageKey="helpedSite" badge />
					<a
						href="https://github.com/smmariquit/tools"
						target="_blank"
						rel="noopener noreferrer"
						style={{
							display: "inline-flex",
							alignItems: "center",
							gap: "8px",
							backgroundColor: "var(--text-primary)",
							color: "var(--surface-color)",
							padding: "8px 16px",
							borderRadius: "6px",
							fontSize: "14px",
							fontWeight: 600,
							textDecoration: "none",
							boxShadow: "0 2px 4px rgba(0,0,0,0.06)",
						}}
					>
						<svg
							width="16"
							height="16"
							viewBox="0 0 24 24"
							fill="currentColor"
							aria-hidden="true"
						>
							<path d="M12 2a10 10 0 0 0-3.16 19.49c.5.09.68-.22.68-.48v-1.7c-2.78.6-3.37-1.34-3.37-1.34-.45-1.16-1.11-1.46-1.11-1.46-.9-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.9 1.52 2.34 1.08 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.94 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.65 0 0 .84-.27 2.75 1.02a9.6 9.6 0 0 1 5 0c1.91-1.29 2.75-1.02 2.75-1.02.55 1.38.2 2.4.1 2.65.64.7 1.03 1.59 1.03 2.68 0 3.84-2.34 4.69-4.57 4.94.36.31.68.92.68 1.85v2.74c0 .27.18.58.69.48A10 10 0 0 0 12 2z" />
						</svg>
						View on GitHub
					</a>
				</div>
			</div>

			<div style={{ marginBottom: "40px" }}>
				<WavyDivider />
			</div>

			<ToolSearch />
		</>
	);
}
