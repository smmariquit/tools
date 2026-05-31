"use client";

import { useEffect, useState } from "react";

export default function OfflineToast() {
	const [show, setShow] = useState(false);

	useEffect(() => {
		// Simulate the service worker / caching delay
		const timer = setTimeout(() => {
			// Check if we haven't shown it yet in this session
			if (!sessionStorage.getItem("offline_toast_shown")) {
				setShow(true);
				sessionStorage.setItem("offline_toast_shown", "true");

				// Auto hide after 5 seconds
				setTimeout(() => {
					setShow(false);
				}, 5000);
			}
		}, 3000);

		return () => clearTimeout(timer);
	}, []);

	if (!show) return null;

	return (
		<div
			style={{
				position: "fixed",
				bottom: "24px",
				left: "50%",
				transform: "translateX(-50%)",
				backgroundColor: "var(--surface-color)",
				color: "var(--text-primary)",
				padding: "12px 24px",
				borderRadius: "50px",
				boxShadow: "var(--shadow-md)",
				display: "flex",
				alignItems: "center",
				gap: "12px",
				zIndex: 9999,
				border: "1px solid var(--border-color)",
				animation: "slideUp 0.3s ease-out forwards",
				fontWeight: 500,
				fontSize: "14px",
			}}
		>
			<style>
				{`
					@keyframes slideUp {
						from { opacity: 0; transform: translate(-50%, 20px); }
						to { opacity: 1; transform: translate(-50%, 0); }
					}
				`}
			</style>
			<span>🚀</span>
			<span style={{ whiteSpace: "nowrap" }}>Ready for offline use.</span>
			<button
				type="button"
				onClick={() => setShow(false)}
				style={{
					background: "none",
					border: "none",
					color: "var(--text-secondary)",
					cursor: "pointer",
					marginLeft: "8px",
					fontSize: "16px",
					display: "flex",
					alignItems: "center",
					justifyContent: "center",
				}}
			>
				&times;
			</button>
		</div>
	);
}
