"use client";

import { useState } from "react";
import ToolHeader from "../components/ToolHeader";
import ToolLayout from "../components/ToolLayout";
import TrustBadge from "../../components/TrustBadge";
import PrivacyGuarantee from "../../components/PrivacyGuarantee";

const GROUP_RATES = {
	1: { name: "Group 1 (Simple / Utilitarian)", daeds: 0.05, dads: 0.03 },
	2: { name: "Group 2 (Moderate Complexity)", daeds: 0.06, dads: 0.036 },
	3: { name: "Group 3 (Exceptional / High Complexity)", daeds: 0.10, dads: 0.06 },
	4: { name: "Group 4 (Residences)", daeds: 0.12, dads: 0.075 },
	5: { name: "Group 5 (Monumental)", daeds: 0.12, dads: 0.075 },
	8: { name: "Group 8 (Extensive Detailing / Interiors)", daeds: 0.15, dads: 0.15 },
};

export default function ArchitecturalFeeClient() {
	const [pcc, setPcc] = useState(10000000);
	const [group, setGroup] = useState<keyof typeof GROUP_RATES>(4);
	const [serviceMode, setServiceMode] = useState<"daeds" | "dads">("daeds");
	const [isAlteration, setIsAlteration] = useState(false);

	let baseRate = GROUP_RATES[group][serviceMode];
	
	// Group 9 (Alterations & Additions): Fee is increased by 50% (1.5x)
	if (isAlteration) {
		baseRate = baseRate * 1.5;
	}

	const totalProfessionalFee = pcc * baseRate;
	
	// UAP Standard Milestone Billing
	const designPhase = totalProfessionalFee * 0.60;
	const constructionPhase = totalProfessionalFee * 0.40;

	const formatPHP = (val: number) =>
		new Intl.NumberFormat("en-PH", { style: "currency", currency: "PHP" }).format(val);

	return (
		<ToolLayout>
			<ToolHeader
				title="Architectural Fee Calculator (UAP SPP 202)"
				subtitle="Dynamically compute minimum basic fees based on UAP Standards of Professional Practice Document 202."
			/>
			
			<div style={{ marginTop: "24px", maxWidth: "800px" }}>
				<TrustBadge year={2026} lastReviewed="May 2026" />
			</div>

			<div className="tool-grid">
				<div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
					<div className="card">
						<h2 style={{ fontSize: "18px", marginBottom: "16px", color: "var(--primary)" }}>Project Details</h2>

						<div className="form-group" style={{ marginBottom: "16px" }}>
							<label className="form-label">Project Construction Cost (PCC)</label>
							<input type="number" className="form-control" value={pcc || ""} onChange={(e) => setPcc(Number(e.target.value))} />
						</div>

						<div className="form-group" style={{ marginBottom: "16px" }}>
							<label className="form-label">Project Classification (UAP Group)</label>
							<select className="form-control" value={group} onChange={(e) => setGroup(Number(e.target.value) as keyof typeof GROUP_RATES)}>
								{Object.entries(GROUP_RATES).map(([key, val]) => (
									<option key={key} value={key}>{val.name}</option>
								))}
							</select>
						</div>

						<div className="form-group" style={{ marginBottom: "16px" }}>
							<label className="form-label">Mode of Service</label>
							<select className="form-control" value={serviceMode} onChange={(e) => setServiceMode(e.target.value as "daeds" | "dads")}>
								<option value="daeds">DAEDS (Architectural + Engineering Design)</option>
								<option value="dads">DADS (Architectural Design Only)</option>
							</select>
						</div>

						<div className="form-group">
							<label style={{ display: "flex", alignItems: "center", gap: "8px", cursor: "pointer" }}>
								<input type="checkbox" checked={isAlteration} onChange={(e) => setIsAlteration(e.target.checked)} />
								<span style={{ fontWeight: 500 }}>Group 9: Alterations & Additions (+50% premium on fee)</span>
							</label>
						</div>
					</div>
				</div>

				<div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
					<div className="card" style={{ position: "sticky", top: "100px", backgroundColor: "var(--bg-color)" }}>
						<h2 style={{ fontSize: "20px", marginBottom: "16px", color: "var(--primary)" }}>Standard Fee Computation</h2>
						
						<div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px", fontSize: "14px" }}>
							<span>Effective Fee Rate:</span>
							<strong>{(baseRate * 100).toFixed(2)}% of PCC</strong>
						</div>

						<div style={{ padding: "16px", backgroundColor: "rgba(16, 185, 129, 0.05)", border: "1px solid rgba(16, 185, 129, 0.2)", borderRadius: "8px", marginBottom: "16px", marginTop: "16px" }}>
							<h3 style={{ fontSize: "14px", marginBottom: "12px", color: "var(--primary)" }}>Milestone Billing Schedule</h3>
							<div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px", fontSize: "14px" }}>
								<span>Design Phase (60%):</span>
								<strong>{formatPHP(designPhase)}</strong>
							</div>
							<div style={{ display: "flex", justifyContent: "space-between", fontSize: "14px", color: "var(--text-secondary)" }}>
								<span>Construction Phase (40%):</span>
								<span>{formatPHP(constructionPhase)}</span>
							</div>
						</div>

						<div style={{ display: "flex", justifyContent: "space-between", marginBottom: "16px", paddingTop: "12px", borderTop: "1px dashed rgba(13, 71, 161, 0.2)", fontSize: "18px", fontWeight: 700, color: "var(--primary)" }}>
							<span>Total Professional Fee:</span>
							<span>{formatPHP(totalProfessionalFee)}</span>
						</div>

						<PrivacyGuarantee />
					</div>
				</div>
			</div>
		</ToolLayout>
	);
}
