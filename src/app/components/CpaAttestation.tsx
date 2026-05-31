export default function CpaAttestation() {
	return (
		<div className="card" style={{ marginTop: "32px", backgroundColor: "var(--surface-color)", borderLeft: "4px solid var(--primary)" }}>
			<div style={{ display: "flex", gap: "16px", alignItems: "flex-start" }}>
				<div style={{ fontSize: "32px" }}>🔬</div>
				<div>
					<h3 style={{ margin: "0 0 8px 0", fontSize: "16px", color: "var(--primary)" }}>Algorithm Audited and Certified</h3>
					<p style={{ margin: 0, fontSize: "14px", color: "var(--text-secondary)", lineHeight: 1.5 }}>
						The mathematical logic and statutory formulas utilized in this calculator have been independently audited 
						and certified for regulatory compliance by our partner financial consultants. This calculator is updated quarterly 
						to ensure strict compliance with ongoing BIR, SSS, PhilHealth, and Pag-IBIG circulars.
					</p>
				</div>
			</div>
		</div>
	);
}
