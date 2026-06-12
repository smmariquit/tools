"use client";

import { useState } from "react";
import ToolHeader from "../components/ToolHeader";
import ToolLayout from "../components/ToolLayout";
import TrustBadge from "../../components/TrustBadge";
import PrivacyGuarantee from "../../components/PrivacyGuarantee";

export default function CustomsBrokerageClient() {
	const [dv, setDv] = useState(250000);
	const [isExport, setIsExport] = useState(false);

	let baseFee = 0;
	if (dv <= 10000) baseFee = 1300;
	else if (dv <= 20000) baseFee = 2000;
	else if (dv <= 30000) baseFee = 2700;
	else if (dv <= 40000) baseFee = 3300;
	else if (dv <= 50000) baseFee = 3600;
	else if (dv <= 60000) baseFee = 4000;
	else if (dv <= 100000) baseFee = 4700;
	else if (dv <= 200000) baseFee = 5300;
	else baseFee = 5300 + 0.00125 * (dv - 200000);

	const totalFee = isExport ? baseFee * 0.5 : baseFee;

	const formatPHP = (val: number) =>
		new Intl.NumberFormat("en-PH", { style: "currency", currency: "PHP" }).format(val);

	return (
		<ToolLayout maxWidth="1200px">
			<ToolHeader
				title="Standard Customs Brokerage Fee Calculator"
				subtitle="Calculate the professional fees for customs brokers based on CAO No. 1-2001."
			/>
			
			<div style={{ marginTop: "24px", width: "100%" }}>
				<TrustBadge year={2026} lastReviewed="May 2026" />
			</div>

			<div className="tool-grid">
				<div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
					<div className="card">
						<h2 style={{ fontSize: "18px", marginBottom: "16px", color: "var(--primary)" }}>Shipment Details</h2>

						<div className="form-group" style={{ marginBottom: "16px" }}>
							<label className="form-label">Dutiable Value (DV) of Shipment in PHP</label>
							<input type="number" className="form-control" value={dv || ""} onChange={(e) => setDv(Number(e.target.value))} />
							<p style={{ fontSize: "12px", color: "var(--text-secondary)", marginTop: "4px" }}>
								Used to compute the bracketed fee structure.
							</p>
						</div>

						<div className="form-group">
							<label style={{ display: "flex", alignItems: "center", gap: "8px", cursor: "pointer" }}>
								<input type="checkbox" checked={isExport} onChange={(e) => setIsExport(e.target.checked)} />
								<span style={{ fontWeight: 500 }}>Export Declaration / Permit (50% of Formal Entry Rate)</span>
							</label>
						</div>
					</div>
				</div>

				<div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
					<div className="card" style={{ position: "sticky", top: "100px", backgroundColor: "var(--bg-color)" }}>
						<h2 style={{ fontSize: "20px", marginBottom: "16px", color: "var(--primary)" }}>Computed Brokerage Fee</h2>
						
						<div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px", fontSize: "14px" }}>
							<span>Formal / Warehousing Entry Rate:</span>
							<strong>{formatPHP(baseFee)}</strong>
						</div>
						
						{isExport && (
							<div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px", fontSize: "14px", color: "var(--text-secondary)" }}>
								<span>Export Adjustment (50%):</span>
								<span>- {formatPHP(baseFee * 0.5)}</span>
							</div>
						)}

						<div style={{ display: "flex", justifyContent: "space-between", marginBottom: "16px", paddingTop: "12px", borderTop: "1px dashed rgba(13, 71, 161, 0.2)", fontSize: "18px", fontWeight: 700, color: "var(--primary)" }}>
							<span>Total Brokerage Fee:</span>
							<span>{formatPHP(totalFee)}</span>
						</div>
						<p style={{ fontSize: "12px", color: "var(--text-secondary)", marginTop: "4px", textAlign: "right" }}>
							Based on CAO No. 1-2001
						</p>

						<PrivacyGuarantee />
					</div>
				</div>
			</div>
		</ToolLayout>
	);
}
