"use client";

import { useState } from "react";
import ToolHeader from "../components/ToolHeader";
import ToolLayout from "../components/ToolLayout";

export default function Dota2BattlepassClient() {
	const [targetLevel, setTargetLevel] = useState(1000);
	const [currentLevel, setCurrentLevel] = useState(1);
	
	// Typical TI Battlepass metrics:
	// Lvl 1 = $9.99 (~₱500)
	// 24 Levels = $9.99 (~₱500) -> ~₱20.83 per level

	const levelsNeeded = Math.max(0, targetLevel - currentLevel);
	
	// Assume they buy the 24-level packs for efficiency
	const packsNeeded = Math.ceil(levelsNeeded / 24);
	const estimatedPHP = packsNeeded * 500;

	const formatPHP = (val: number) =>
		new Intl.NumberFormat("en-PH", { style: "currency", currency: "PHP" }).format(val);

	return (
		<ToolLayout>
			<ToolHeader
				title="Dota 2 Battle Pass PHP Calculator"
				subtitle="Estimate the real-world cost to reach the Aegis (Lvl 1000) or an Arcana in the Dota 2 Compendium."
			/>
			
			<div className="tool-grid" style={{ marginTop: "24px" }}>
				<div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
					<div className="card">
						<h2 style={{ fontSize: "18px", marginBottom: "16px", color: "var(--primary)" }}>Level Goals</h2>

						<div className="form-group" style={{ marginBottom: "16px" }}>
							<label className="form-label">Current Level</label>
							<input type="number" className="form-control" value={currentLevel || ""} onChange={(e) => setCurrentLevel(Number(e.target.value))} />
						</div>

						<div className="form-group" style={{ marginBottom: "16px" }}>
							<label className="form-label">Target Level</label>
							<input type="number" className="form-control" value={targetLevel || ""} onChange={(e) => setTargetLevel(Number(e.target.value))} />
							<p style={{ fontSize: "12px", color: "var(--text-secondary)", marginTop: "4px" }}>E.g., 330 for Arcana, 1000 for Physical Aegis.</p>
						</div>
					</div>
				</div>

				<div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
					<div className="card" style={{ position: "sticky", top: "100px", backgroundColor: "var(--bg-color)" }}>
						<h2 style={{ fontSize: "20px", marginBottom: "16px", color: "var(--primary)" }}>Estimated Cost</h2>
						
						<div style={{ display: "flex", justifyContent: "space-between", marginBottom: "12px", fontSize: "14px" }}>
							<span>Levels to Buy:</span>
							<strong>{levelsNeeded}</strong>
						</div>
						
						<div style={{ padding: "16px", backgroundColor: "rgba(239, 68, 68, 0.05)", border: "1px solid rgba(239, 68, 68, 0.2)", borderRadius: "8px", marginTop: "16px" }}>
							<div style={{ fontSize: "14px", marginBottom: "8px", color: "var(--text-secondary)" }}>Total PHP Required:</div>
							<strong style={{ fontSize: "32px", color: "red" }}>{formatPHP(estimatedPHP)}</strong>
							<div style={{ marginTop: "8px", fontSize: "12px", color: "var(--text-secondary)" }}>
								Based on purchasing {packsNeeded}x 24-Level Packs (₱500 each).
							</div>
						</div>
						
						<p style={{ fontSize: "12px", color: "var(--text-secondary)", marginTop: "16px" }}>
							*This is an estimate based on historical TI Battle Pass pricing. Actual Steam Store conversion rates may vary.
						</p>
					</div>
				</div>
			</div>
		</ToolLayout>
	);
}
