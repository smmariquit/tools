"use client";

import { useState } from "react";

export default function Contact() {
	const [status, setStatus] = useState<"idle" | "sending" | "success">("idle");

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setStatus("sending");

		const formData = new FormData(e.currentTarget);
		const name = formData.get("name");
		const subject = formData.get("subject");
		const message = formData.get("message");
		const email = formData.get("email");

		const mailtoLink = `mailto:parazeez@proton.me?subject=${encodeURIComponent(`[${subject}] PHTools Contact: ${name}`)}&body=${encodeURIComponent(`From: ${name} <${email}>\n\n${message}`)}`;
		window.location.href = mailtoLink;

		setStatus("success");
	};

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

			<div className="card">
				{status === "success" ? (
					<div style={{ textAlign: "center", padding: "40px 20px" }}>
						<div style={{ fontSize: "48px", marginBottom: "16px" }}>✅</div>
						<h2
							style={{
								fontSize: "20px",
								marginBottom: "8px",
								color: "var(--text-primary)",
							}}
						>
							Message Sent!
						</h2>
						<p style={{ color: "var(--text-secondary)" }}>
							Thank you for reaching out. We will get back to you as soon as
							possible.
						</p>
						<button
							onClick={() => setStatus("idle")}
							className="btn-secondary"
							style={{ marginTop: "24px" }}
						>
							Send Another Message
						</button>
					</div>
				) : (
					<form onSubmit={handleSubmit}>
						<div className="form-group">
							<label className="form-label" htmlFor="name">
								Name
							</label>
							<input
								type="text"
								id="name"
								name="name"
								className="form-control"
								required
								placeholder="Juan Dela Cruz"
							/>
						</div>

						<div className="form-group">
							<label className="form-label" htmlFor="email">
								Email Address
							</label>
							<input
								type="email"
								id="email"
								name="email"
								className="form-control"
								required
								placeholder="juan@example.com"
							/>
						</div>

						<div className="form-group">
							<label className="form-label" htmlFor="subject">
								Subject
							</label>
							<select
								id="subject"
								name="subject"
								className="form-control"
								required
							>
								<option value="feedback">General Feedback</option>
								<option value="bug">Report a Calculation Error / Bug</option>
								<option value="feature">Request a New Tool</option>
								<option value="business">Business / Advertising Inquiry</option>
							</select>
						</div>

						<div className="form-group" style={{ marginBottom: "24px" }}>
							<label className="form-label" htmlFor="message">
								Message
							</label>
							<textarea
								id="message"
								name="message"
								className="form-control"
								rows={5}
								required
								placeholder="How can we help you?"
								style={{ resize: "vertical" }}
							></textarea>
						</div>

						<button
							type="submit"
							className="btn-primary"
							style={{ width: "100%" }}
							disabled={status === "sending"}
						>
							{status === "sending" ? "Sending..." : "Send Message"}
						</button>
					</form>
				)}
			</div>
		</div>
	);
}
