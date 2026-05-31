"use client";

import { useState } from "react";
import ToolHeader from "../components/ToolHeader";
import ToolLayout from "../components/ToolLayout";

// Standard CP draw costs in the PH server
const DRAW_COSTS = [10, 30, 50, 120, 200, 320, 520, 800, 1100, 1800];

export default function CodmLuckyDrawClient() {
	const [spinsCompleted, setSpinsCompleted] = useState(0);

	let remainingCP = 0;
	for (let i = spinsCompleted; i < DRAW_COSTS.length; i++) {
		remainingCP += DRAW_COSTS[i];
	}

	// Approximate PHP cost (1 PHP = ~1.6 CP on average via Codashop/Garena)
	const remainingPHP = remainingCP / 1.6;

	const formatPHP = (val: number) =>
		new Intl.NumberFormat("en-PH", { style: "currency", currency: "PHP" }).format(val);

	return (
		<ToolLayout>
			<ToolHeader
				title="CODM Lucky Draw Estimator"
				subtitle="Calculate the remaining CP and PHP cost required to complete a Legendary/Mythic Lucky Draw."
			/>
			
			<div className="tool-grid" style={{ marginTop: "24px" }}>
				<div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
					<div className="card">
						<h2 style={{ fontSize: "18px", marginBottom: "16px", color: "var(--primary)" }}>Draw Progress</h2>

						<div className="form-group" style={{ marginBottom: "16px" }}>
							<label className="form-label">How many spins have you completed?</label>
							<select className="form-control" value={spinsCompleted} onChange={(e) => setSpinsCompleted(Number(e.target.value))}>
								<option value={0}>0 Spins</option>
								<option value={1}>1 Spin</option>
								<option value={2}>2 Spins</option>
								<option value={3}>3 Spins</option>
								<option value={4}>4 Spins</option>
								<option value={5}>5 Spins</option>
								<option value={6}>6 Spins</option>
								<option value={7}>7 Spins</option>
								<option value={8}>8 Spins</option>
								<option value={9}>9 Spins</option>
								<option value={10}>10 Spins (Completed)</option>
							</select>
						</div>
					</div>
				</div>

				<div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
					<div className="card" style={{ position: "sticky", top: "100px", backgroundColor: "var(--bg-color)" }}>
						<h2 style={{ fontSize: "20px", marginBottom: "16px", color: "var(--primary)" }}>Remaining Cost</h2>
						
						<div style={{ display: "flex", justifyContent: "space-between", marginBottom: "12px", fontSize: "16px" }}>
							<span>Required COD Points (CP):</span>
							<strong>{remainingCP} CP</strong>
						</div>
						
						<div style={{ padding: "16px", backgroundColor: "rgba(239, 68, 68, 0.05)", border: "1px solid rgba(239, 68, 68, 0.2)", borderRadius: "8px", marginTop: "16px" }}>
							<div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
								<span style={{ fontSize: "14px", color: "var(--text-secondary)" }}>Est. PHP Cost:</span>
								<strong style={{ fontSize: "24px", color: "red" }}>{formatPHP(remainingPHP)}</strong>
							</div>
						</div>
						
						<p style={{ fontSize: "12px", color: "var(--text-secondary)", marginTop: "16px" }}>
							*Calculation is based on the standard Garena PH server draw rates starting at 10 CP. Mythic draws or redux draws may vary slightly.
						</p>
					</div>
				</div>
			</div>
		</ToolLayout>
	);
}
