export default function TrustBadge({ year, lastReviewed, message }: { year: number; lastReviewed: string; message?: string }) {
	const displayMessage = message || `Tax brackets and statutory formulas are fully updated in accordance with ${year} official schedules.`;
	return (
		<div style={{
			display: "flex",
			alignItems: "flex-start",
			gap: "12px",
			backgroundColor: "rgba(16, 185, 129, 0.1)",
			border: "1px solid rgba(16, 185, 129, 0.3)",
			padding: "12px 16px",
			borderRadius: "8px",
			marginBottom: "24px"
		}}>
			<span style={{ fontSize: "20px" }}>🟢</span>
			<div>
				<strong style={{ display: "block", color: "#065f46", fontSize: "14px", marginBottom: "4px" }}>
					Verified Active for {year}
				</strong>
				<p style={{ margin: 0, fontSize: "13px", color: "var(--text-secondary)", lineHeight: 1.4 }}>
					{displayMessage} (Last reviewed: {lastReviewed})
				</p>
			</div>
		</div>
	);
}
