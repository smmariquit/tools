import { Metadata } from "next";

export const metadata: Metadata = {
	title: "Editorial Policy | PHTools",
	description:
		"Our strict guidelines for algorithm accuracy, statutory sourcing, and peer-review processes.",
};

export default function EditorialPolicyPage() {
	return (
		<div style={{ maxWidth: "800px", margin: "0 auto", padding: "40px 20px" }}>
			<h1 style={{ marginBottom: "24px" }}>PHTools Editorial Policy & Methodology</h1>
			
			<section style={{ marginBottom: "32px" }}>
				<h2>1. Purpose and Mission</h2>
				<p>
					PHTools was built to provide the Philippine digital ecosystem with free, fast, and mathematically accurate utility calculators. Because our tools directly calculate financial, academic, and tax data (falling strictly under Google's Your Money or Your Life criteria), we adhere to the highest standards of journalistic and algorithmic accuracy.
				</p>
			</section>

			<section style={{ marginBottom: "32px" }}>
				<h2>2. Formula Sourcing and Statutory Reality</h2>
				<p>
					We do not rely on generative AI or untested mathematical models to build our calculators. Every financial calculation algorithm on PHTools is strictly derived from official primary sources:
				</p>
				<ul>
					<li><strong>Taxation:</strong> Sourced directly from Republic Act No. 10963 (TRAIN Law) and official Bureau of Internal Revenue (BIR) Revenue Memorandum Circulars.</li>
					<li><strong>Labor & Payroll:</strong> Derived from the Philippine Labor Code, Department of Labor and Employment (DOLE) Handbook on Workers' Statutory Monetary Benefits, and official circulars from SSS, PhilHealth, and Pag-IBIG.</li>
					<li><strong>Academe:</strong> Modeled explicitly after the official grading systems published by the University of the Philippines system and the Commission on Higher Education (CHED).</li>
				</ul>
			</section>

			<section style={{ marginBottom: "32px" }}>
				<h2>3. The "Fact-Checked By PHTools" Process</h2>
				<p>
					Before any calculator is pushed to production, it undergoes a rigorous lifecycle:
				</p>
				<ol>
					<li><strong>Conceptualization:</strong> The specific statutory framework is analyzed by our Lead Developer, an ABM (Accountancy, Business, and Management) Scholar.</li>
					<li><strong>Code Engineering:</strong> The algorithm is written in strict TypeScript to prevent rounding errors and float precision bugs common in JavaScript.</li>
					<li><strong>Edge-Case Testing:</strong> The calculator is subjected to automated unit tests (using Jest/Vitest) spanning minimum wage earners up to executive-tier salaries to ensure the tax brackets scale perfectly.</li>
					<li><strong>Contextual Writing:</strong> A comprehensive 1,000+ word methodological guide is appended below the tool to explain the underlying formulas to our users.</li>
				</ol>
			</section>

			<section style={{ marginBottom: "32px" }}>
				<h2>4. Corrections and Updates</h2>
				<p>
					Our calculators are updated annually or immediately upon the passage of new legislation (e.g., scheduled PhilHealth premium increases). If you discover a calculation discrepancy, please reach out to our Lead Developer, Simonee Ezekiel Mariquit, at <strong>semariquit@gmail.com</strong>. Upon acknowledgment, the algorithm will be audited and patched immediately.
				</p>
			</section>
		</div>
	);
}
