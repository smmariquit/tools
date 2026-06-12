"use client";

export default function Contact() {
	return (
		<div style={{ maxWidth: "600px", margin: "0 auto", paddingBottom: "40px" }}>
			<div
				className="page-header"
				style={{ marginBottom: "24px", textAlign: "center" }}
			>
				<h1 className="page-title">Contact Us</h1>
				<p className="page-subtitle">
					Have a question or a feature request? Let us know.
				</p>
			</div>

			<div
				className="card"
				style={{ textAlign: "center", padding: "40px 20px" }}
			>
				<p
					style={{
						color: "var(--text-primary)",
						marginBottom: "16px",
						fontSize: "16px",
					}}
				>
					You can reach us directly at:
				</p>
				<a
					href="mailto:semariquit@gmail.com"
					style={{
						fontSize: "20px",
						fontWeight: "bold",
						color: "var(--primary)",
						textDecoration: "none",
					}}
				>
					semariquit@gmail.com
				</a>
			</div>
		</div>
	);
}
