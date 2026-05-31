"use client";

import { useState } from "react";
import ToolHeader from "../components/ToolHeader";
import ToolLayout from "../components/ToolLayout";

export default function MlbbDiamondClient() {
	const [diamondsNeeded, setDiamondsNeeded] = useState(599); // Starlight Pass

	// Approximate standard rates in the Philippines (1 PHP = ~1.05 to 1.15 Diamonds depending on promo)
	// Base standard: 112 Dia = 100 PHP (Codashop)
	
	const codashopRatio = 100 / 112; 
	const gcashRatio = 100 / 115; // Sometimes slightly cheaper in app
	const razorRatio = 100 / 120; // Razor Gold with promo

	const codashopCost = diamondsNeeded * codashopRatio;
	const gcashCost = diamondsNeeded * gcashRatio;
	const razorCost = diamondsNeeded * razorRatio;

	const formatPHP = (val: number) =>
		new Intl.NumberFormat("en-PH", { style: "currency", currency: "PHP" }).format(val);

	return (
		<ToolLayout>
			<ToolHeader
				title="MLBB Diamond Top-Up Optimizer"
				subtitle="Compare real-time PHP-to-Diamond ratios across Codashop, GCash, and Razor Gold to find the cheapest top-up."
			/>
			
			<div className="tool-grid" style={{ marginTop: "24px" }}>
				<div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
					<div className="card">
						<h2 style={{ fontSize: "18px", marginBottom: "16px", color: "var(--primary)" }}>Top-Up Goal</h2>

						<div className="form-group" style={{ marginBottom: "16px" }}>
							<label className="form-label">Diamonds Needed</label>
							<input type="number" className="form-control" value={diamondsNeeded || ""} onChange={(e) => setDiamondsNeeded(Number(e.target.value))} />
							<p style={{ fontSize: "12px", color: "var(--text-secondary)", marginTop: "4px" }}>E.g., 599 for Starlight, 899 for Epic Skin.</p>
						</div>
					</div>
				</div>

				<div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
					<div className="card" style={{ position: "sticky", top: "100px", backgroundColor: "var(--bg-color)" }}>
						<h2 style={{ fontSize: "20px", marginBottom: "16px", color: "var(--primary)" }}>Cost Comparison</h2>
						
						<div style={{ display: "flex", justifyContent: "space-between", marginBottom: "12px", fontSize: "16px" }}>
							<span>Codashop (Standard):</span>
							<strong>{formatPHP(codashopCost)}</strong>
						</div>
						<div style={{ display: "flex", justifyContent: "space-between", marginBottom: "12px", fontSize: "16px" }}>
							<span>GCash (A+ Rewards):</span>
							<strong>{formatPHP(gcashCost)}</strong>
						</div>
						<div style={{ display: "flex", justifyContent: "space-between", marginBottom: "16px", fontSize: "16px" }}>
							<span>Razor Gold (w/ Promo):</span>
							<strong style={{ color: "#10b981" }}>{formatPHP(razorCost)}</strong>
						</div>
						
						<p style={{ fontSize: "12px", color: "var(--text-secondary)", marginTop: "16px" }}>
							*Prices are estimates based on standard conversion ratios. Actual prices may vary depending on active flash sales or platform fees.
						</p>
					</div>
				</div>
			</div>
		</ToolLayout>
	);
}
