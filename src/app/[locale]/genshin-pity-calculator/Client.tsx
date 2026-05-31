"use client";

import { useState } from "react";
import ToolHeader from "../components/ToolHeader";
import ToolLayout from "../components/ToolLayout";

export default function GenshinPityClient() {
	const [currentPity, setCurrentPity] = useState(0);
	const [isGuaranteed, setIsGuaranteed] = useState(false);
	const [primogems, setPrimogems] = useState(0);
	const [fates, setFates] = useState(0);

	const HARD_PITY = 90;
	const maxPullsNeeded = isGuaranteed ? HARD_PITY - currentPity : (HARD_PITY * 2) - currentPity;
	
	const currentTotalPulls = Math.floor(primogems / 160) + fates;
	
	const missingPulls = Math.max(0, maxPullsNeeded - currentTotalPulls);
	const missingPrimos = missingPulls * 160;

	// Approx cost of genesis crystals without first-time bonus (6480+1600 = 8080 crystals for ~₱4990) -> ~1.62 crystals per PHP
	const estimatedPHP = missingPrimos / 1.62;

	const formatPHP = (val: number) =>
		new Intl.NumberFormat("en-PH", { style: "currency", currency: "PHP" }).format(val);

	return (
		<ToolLayout>
			<ToolHeader
				title="Genshin Pity & Primogem Calculator"
				subtitle="Calculate the exact pulls, primogems, and PHP needed to guarantee your 5-star character."
			/>
			
			<div className="tool-grid" style={{ marginTop: "24px" }}>
				<div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
					<div className="card">
						<h2 style={{ fontSize: "18px", marginBottom: "16px", color: "var(--primary)" }}>Current Inventory</h2>

						<div className="form-group" style={{ marginBottom: "16px" }}>
							<label className="form-label">Current Pity (Pulls since last 5-star)</label>
							<input type="number" className="form-control" value={currentPity || ""} onChange={(e) => setCurrentPity(Number(e.target.value))} />
						</div>

						<div className="form-group" style={{ marginBottom: "16px", display: "flex", alignItems: "center", gap: "12px" }}>
							<input type="checkbox" id="guaranteed" checked={isGuaranteed} onChange={(e) => setIsGuaranteed(e.target.checked)} style={{ width: "20px", height: "20px" }} />
							<label htmlFor="guaranteed" style={{ fontSize: "14px", fontWeight: "bold", cursor: "pointer" }}>Is your next 5-star guaranteed?</label>
						</div>

						<div className="form-group" style={{ marginBottom: "16px" }}>
							<label className="form-label">Primogems Owned</label>
							<input type="number" className="form-control" value={primogems || ""} onChange={(e) => setPrimogems(Number(e.target.value))} />
						</div>

						<div className="form-group">
							<label className="form-label">Intertwined Fates Owned</label>
							<input type="number" className="form-control" value={fates || ""} onChange={(e) => setFates(Number(e.target.value))} />
						</div>
					</div>
				</div>

				<div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
					<div className="card" style={{ position: "sticky", top: "100px", backgroundColor: "var(--bg-color)" }}>
						<h2 style={{ fontSize: "20px", marginBottom: "16px", color: "var(--primary)" }}>Guarantee Cost</h2>
						
						<div style={{ display: "flex", justifyContent: "space-between", marginBottom: "12px", fontSize: "16px" }}>
							<span>Current Pulls Banked:</span>
							<strong>{currentTotalPulls} pulls</strong>
						</div>

						<div style={{ display: "flex", justifyContent: "space-between", marginBottom: "12px", fontSize: "16px" }}>
							<span>Missing Pulls for Hard Pity:</span>
							<strong>{missingPulls} pulls</strong>
						</div>
						
						<div style={{ padding: "16px", backgroundColor: "rgba(13, 71, 161, 0.05)", border: "1px solid rgba(13, 71, 161, 0.2)", borderRadius: "8px", marginTop: "16px" }}>
							<div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
								<span style={{ fontSize: "14px", color: "var(--text-secondary)" }}>Missing Primogems:</span>
								<strong style={{ fontSize: "18px", color: "var(--primary)" }}>{missingPrimos}</strong>
							</div>
							<div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingTop: "8px", borderTop: "1px dashed rgba(13, 71, 161, 0.2)" }}>
								<span style={{ fontSize: "14px", color: "var(--text-secondary)" }}>Swipe Cost (PHP):</span>
								<strong style={{ fontSize: "20px", color: "red" }}>{formatPHP(estimatedPHP)}</strong>
							</div>
						</div>
						
						<p style={{ fontSize: "12px", color: "var(--text-secondary)", marginTop: "16px" }}>
							*Calculations assume hard pity (90). Soft pity starts at 75, so you will likely get it earlier. PHP cost is estimated using the ₱4990 top-up tier without first-time bonuses.
						</p>
					</div>
				</div>
			</div>
		</ToolLayout>
	);
}
