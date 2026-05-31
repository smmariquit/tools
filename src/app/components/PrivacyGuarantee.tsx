export default function PrivacyGuarantee() {
	return (
		<div style={{
			display: "flex",
			alignItems: "center",
			gap: "12px",
			padding: "16px",
			backgroundColor: "var(--bg-color)",
			borderTop: "1px solid var(--border-color)",
			marginTop: "24px"
		}}>
			<span style={{ fontSize: "24px" }}>🔒</span>
			<div>
				<strong style={{ fontSize: "14px", color: "var(--text-primary)" }}>Local Browser Processing Guaranteed</strong>
				<p style={{ margin: "4px 0 0 0", fontSize: "12px", color: "var(--text-secondary)", lineHeight: 1.4 }}>
					All inputs and financial calculations are executed locally within your web browser. 
					We do not collect, transmit, or store your personal data on external servers.
				</p>
			</div>
		</div>
	);
}
