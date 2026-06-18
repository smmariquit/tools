import { Metadata } from "next";

export const metadata: Metadata = {
	title: "Editorial Policy | PHTools",
	description:
		"Our strict guidelines for algorithm accuracy, statutory sourcing, and peer-review processes.",
};

export default function EditorialPolicyPage() {
	return (
		<div style={{ maxWidth: "800px", margin: "0 auto", paddingBottom: "40px" }}>
			<div className="page-header" style={{ marginBottom: "24px" }}>
				<h1 className="page-title">Editorial Policy & Methodology</h1>
				<p className="page-subtitle">Last Updated: June 2026</p>
			</div>

			<div className="card" style={{ color: "var(--text-primary)" }}>
				<p style={{ marginBottom: "16px" }}>
					PHTools was built to provide the Philippine digital ecosystem with
					free, fast, and mathematically accurate utility calculators. Because
					our tools directly calculate financial, academic, and tax data
					(falling strictly under Google&apos;s Your Money or Your Life
					criteria), we adhere to the highest standards of journalistic and
					algorithmic accuracy.
				</p>

				<h2
					style={{ fontSize: "18px", marginTop: "24px", marginBottom: "12px" }}
				>
					1. Formula Sourcing and Statutory Reality
				</h2>
				<p style={{ marginBottom: "16px" }}>
					Our calculators are built with the help of modern tooling, including
					AI, but no number is ever taken on trust. Every financial calculation
					algorithm on PHTools is traced back to, and verified against, official
					primary sources, and reviewed by a human before publishing:
				</p>
				<ul style={{ paddingLeft: "24px", marginBottom: "16px" }}>
					<li>
						<strong>Taxation:</strong> Sourced directly from Republic Act No.
						10963 (TRAIN Law) and official Bureau of Internal Revenue (BIR)
						Revenue Memorandum Circulars.
					</li>
					<li>
						<strong>Labor &amp; Payroll:</strong> Derived from the Philippine
						Labor Code, Department of Labor and Employment (DOLE) Handbook on
						Workers&apos; Statutory Monetary Benefits, and official circulars
						from SSS, PhilHealth, and Pag-IBIG.
					</li>
					<li>
						<strong>Academe:</strong> Modeled explicitly after the official
						grading systems published by the University of the Philippines system
						and the Commission on Higher Education (CHED).
					</li>
				</ul>

				<h2
					style={{ fontSize: "18px", marginTop: "24px", marginBottom: "12px" }}
				>
					2. The &quot;Fact-Checked By PHTools&quot; Process
				</h2>
				<p style={{ marginBottom: "16px" }}>
					Before any calculator is pushed to production, it undergoes a rigorous
					lifecycle:
				</p>
				<ol style={{ paddingLeft: "24px", marginBottom: "16px" }}>
					<li>
						<strong>Conceptualization:</strong> The relevant statutory framework
						&mdash; the governing law and the official issuances from BIR, SSS,
						PhilHealth, Pag-IBIG, and DOLE &mdash; is studied in detail, and the
						calculator&apos;s logic is derived directly from those primary
						sources.
					</li>
					<li>
						<strong>Code Engineering:</strong> The algorithm is written in strict
						TypeScript to prevent rounding errors and float precision bugs common
						in JavaScript.
					</li>
					<li>
						<strong>Edge-Case Testing:</strong> The calculator is subjected to
						automated unit tests (using Jest/Vitest) spanning minimum wage
						earners up to executive-tier salaries to ensure the tax brackets
						scale perfectly.
					</li>
					<li>
						<strong>Contextual Writing:</strong> A comprehensive 1,000+ word
						methodological guide is appended below the tool to explain the
						underlying formulas to our users.
					</li>
				</ol>

				<h2
					style={{ fontSize: "18px", marginTop: "24px", marginBottom: "12px" }}
				>
					3. Corrections and Updates
				</h2>
				<p style={{ marginBottom: "16px" }}>
					Our calculators are updated whenever new legislation or revised
					official rates take effect (e.g., scheduled PhilHealth premium
					increases). If you discover a calculation discrepancy, please reach
					out to our Lead Developer, Simonee Ezekiel Mariquit, at{" "}
					<strong>semariquit@gmail.com</strong>. Upon acknowledgment, the
					algorithm will be audited and patched immediately.
				</p>
			</div>
		</div>
	);
}
