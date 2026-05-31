import Link from "next/link";

export default function About() {
	return (
		<div style={{ maxWidth: "800px", margin: "0 auto", paddingBottom: "40px" }}>
			<div className="page-header" style={{ marginBottom: "24px" }}>
				<h1 className="page-title">About PHTools</h1>
				<p className="page-subtitle">Built for Filipinos, by Filipinos.</p>
			</div>

			<div className="card" style={{ color: "var(--text-primary)" }}>
				<p
					style={{ marginBottom: "16px", fontSize: "16px", lineHeight: "1.7" }}
				>
					Welcome to PHTools. Our mission is simple: to provide accurate,
					easy-to-use, and completely free online utilities designed
					specifically for the Philippines.
				</p>

				<h2
					style={{ fontSize: "20px", marginTop: "32px", marginBottom: "16px" }}
				>
					Why We Built This
				</h2>
				<p style={{ marginBottom: "16px", lineHeight: "1.7" }}>
					Calculating your net pay, SSS contributions, or dealing with TRAIN Law
					tax brackets shouldn't require a degree in accounting. While there are
					other calculators out there, many are outdated, filled with intrusive
					pop-ups, or simply confusing.
				</p>
				<p style={{ marginBottom: "16px", lineHeight: "1.7" }}>
					We wanted to build a centralized hub of tools that are fast, modern,
					and completely transparent about how the math is done. Whether you're
					an employee checking your payslip, an HR officer verifying deductions,
					or a freelancer calculating your 8% flat tax, PHTools is built for
					you.
				</p>

				<h2
					style={{ fontSize: "20px", marginTop: "32px", marginBottom: "16px" }}
				>
					Our Commitment to Accuracy
				</h2>
				<p style={{ marginBottom: "16px", lineHeight: "1.7" }}>
					We continuously monitor updates from the Bureau of Internal Revenue
					(BIR), Social Security System (SSS), PhilHealth, and Pag-IBIG Fund.
					When contribution tables or tax laws change, we update our algorithms
					to ensure you get the most accurate estimates possible.
				</p>

				<div
					style={{
						marginTop: "40px",
						padding: "24px",
						backgroundColor: "var(--bg-color)",
						borderRadius: "var(--border-radius)",
						border: "1px solid var(--border-color)",
						textAlign: "center",
					}}
				>
					<h3
						style={{
							fontSize: "18px",
							marginBottom: "12px",
							color: "var(--primary)",
						}}
					>
						Have a suggestion?
					</h3>
					<p style={{ marginBottom: "16px", color: "var(--text-secondary)" }}>
						Is there a specific calculator or tool you wish existed? We're
						always looking to add more value.
					</p>
					<Link
						href="/contact"
						className="btn-primary"
						style={{ display: "inline-block" }}
					>
						Contact Us
					</Link>
				</div>
			</div>
		</div>
	);
}
