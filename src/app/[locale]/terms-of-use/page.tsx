export default function TermsOfUse() {
	return (
		<div style={{ maxWidth: "800px", margin: "0 auto", paddingBottom: "40px" }}>
			<div className="page-header" style={{ marginBottom: "24px" }}>
				<h1 className="page-title">Terms of Use & Financial Disclaimer</h1>
				<p className="page-subtitle">Last Updated: June 1, 2026</p>
			</div>

			<div className="card" style={{ color: "var(--text-primary)" }}>
				<p style={{ marginBottom: "16px" }}>
					Welcome to PHTools. By accessing this website, we assume you accept
					these terms and conditions. Do not continue to use PHTools if you do
					not agree to take all of the terms and conditions stated on this page.
				</p>

				<h2
					style={{
						fontSize: "18px",
						marginTop: "24px",
						marginBottom: "12px",
						color: "var(--warning-text)",
					}}
				>
					1. Financial & Legal Disclaimer (No Professional Advice)
				</h2>
				<div
					style={{
						backgroundColor: "var(--warning-bg)",
						borderLeft: "4px solid var(--warning-border)",
						padding: "16px",
						marginBottom: "24px",
						borderRadius: "0 4px 4px 0",
					}}
				>
					<p style={{ margin: 0, fontWeight: 500 }}>
						The calculators and tools provided on PHTools (including but not
						limited to salary, tax, SSS, PhilHealth, and Pag-IBIG calculators)
						are for <strong>informational and estimation purposes only</strong>.
					</p>
					<p style={{ marginTop: "12px", marginBottom: 0 }}>
						PHTools is not a certified public accountant, financial advisor, or
						legal professional. While we strive to use the most up-to-date and
						accurate formulas based on Philippine laws (e.g., TRAIN Law, RA
						11199), your actual deductions and net pay will depend on your
						employer's specific payroll systems, localized policies, and
						personal financial situations. Always consult a qualified
						professional or your HR department for official computations.
					</p>
				</div>

				<h2
					style={{ fontSize: "18px", marginTop: "24px", marginBottom: "12px" }}
				>
					2. Limitation of Liability
				</h2>
				<p style={{ marginBottom: "16px" }}>
					Under no circumstances shall PHTools or its developers be held liable
					for any direct, indirect, incidental, consequential, or special
					damages arising out of or in connection with your use of our
					calculators or reliance on the information provided on this website.
					You use the tools entirely at your own risk.
				</p>

				<h2
					style={{ fontSize: "18px", marginTop: "24px", marginBottom: "12px" }}
				>
					3. Open Source & Public Domain
				</h2>
				<p style={{ marginBottom: "16px" }}>
					PHTools is built on the philosophy of open access to information. The
					underlying calculator code, mathematical algorithms, and logic are
					open-source and released into the public domain. You are entirely free
					to:
				</p>
				<ul style={{ paddingLeft: "24px", marginBottom: "16px" }}>
					<li>Use our calculators for any personal or commercial purpose</li>
					<li>View, learn from, and duplicate our mathematical formulas</li>
					<li>Share and distribute our tools without restriction</li>
				</ul>

				<h2
					style={{ fontSize: "18px", marginTop: "24px", marginBottom: "12px" }}
				>
					4. External Links
				</h2>
				<p style={{ marginBottom: "16px" }}>
					Our website may contain links to third-party websites or services that
					are not owned or controlled by PHTools. PHTools has no control over,
					and assumes no responsibility for, the content, privacy policies, or
					practices of any third party websites or services.
				</p>
			</div>
		</div>
	);
}
