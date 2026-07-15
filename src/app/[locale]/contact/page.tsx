"use client";

import { FaGithub, FaLinkedin } from "react-icons/fa";

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
				<p
					style={{
						color: "var(--text-secondary)",
						margin: "24px 0 8px",
						fontSize: "16px",
					}}
				>
					Or connect on LinkedIn:
				</p>
				<a
					href="https://www.linkedin.com/in/stimmie"
					target="_blank"
					rel="noopener noreferrer"
					style={{
						display: "inline-flex",
						alignItems: "center",
						gap: "6px",
						fontSize: "18px",
						fontWeight: "bold",
						color: "var(--primary)",
						textDecoration: "none",
					}}
				>
					<FaLinkedin size={18} aria-hidden="true" />
					linkedin.com/in/stimmie
				</a>
				<p
					style={{
						color: "var(--text-secondary)",
						margin: "24px 0 8px",
						fontSize: "16px",
					}}
				>
					Or on GitHub:
				</p>
				<a
					href="https://github.com/smmariquit"
					target="_blank"
					rel="noopener noreferrer"
					style={{
						display: "inline-flex",
						alignItems: "center",
						gap: "6px",
						fontSize: "18px",
						fontWeight: "bold",
						color: "var(--primary)",
						textDecoration: "none",
					}}
				>
					<FaGithub size={18} aria-hidden="true" />
					github.com/smmariquit
				</a>
			</div>
		</div>
	);
}
