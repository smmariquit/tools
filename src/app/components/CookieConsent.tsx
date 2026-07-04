"use client";

import { useEffect, useState } from "react";

export default function CookieConsent() {
	const [visible, setVisible] = useState(false);

	useEffect(() => {
		const consent = localStorage.getItem("phtools-cookie-consent");
		if (!consent) {
			setVisible(true);
		}
	}, []);

	const handleAccept = () => {
		localStorage.setItem("phtools-cookie-consent", "accepted");
		setVisible(false);
	};

	if (!visible) return null;

	return (
		<div
			style={{
				position: "fixed",
				bottom: 0,
				left: 0,
				right: 0,
				zIndex: 9999,
				backgroundColor: "var(--surface-color)",
				borderTop: "1px solid var(--border-color)",
				boxShadow: "0 -4px 20px rgba(0, 0, 0, 0.15)",
				padding: "20px 0",
			}}
		>
			<div
				className="container"
				style={{
					display: "flex",
					alignItems: "center",
					justifyContent: "space-between",
					gap: "20px",
					flexWrap: "wrap",
				}}
			>
				<div style={{ flex: 1, minWidth: "280px" }}>
					<strong
						style={{ fontSize: "15px", display: "block", marginBottom: "6px" }}
					>
						Cookies on PHTools
					</strong>
					<p
						style={{
							fontSize: "13px",
							color: "var(--text-secondary)",
							lineHeight: 1.5,
							margin: 0,
						}}
					>
						We use cookies for analytics and advertising (Google Analytics &amp;
						AdSense). No salary or financial data you enter is collected: all
						computation runs entirely in your browser.{" "}
						<a href="/privacy-policy" style={{ color: "var(--primary)" }}>
							Privacy Policy
						</a>
					</p>
				</div>
				<button
					type="button"
					onClick={handleAccept}
					className="btn-primary"
					style={{
						border: "none",
						padding: "10px 24px",
						borderRadius: "6px",
						fontSize: "14px",
						fontWeight: 600,
						cursor: "pointer",
						whiteSpace: "nowrap",
					}}
				>
					Got it
				</button>
			</div>
		</div>
	);
}
