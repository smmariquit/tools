"use client";

import { useState } from "react";
import ToolHeader from "../components/ToolHeader";
import ToolLayout from "../components/ToolLayout";

export default function ValorantVpClient() {
	const [vpAmount, setVpAmount] = useState(1775); // Premium Edition Skin

	// Philippine VP Top-up Tiers (Codashop/In-game approx)
	const tiers = [
		{ php: 2490, vp: 7300 },
		{ php: 1490, vp: 4150 },
		{ php: 999, vp: 2800 },
		{ php: 499, vp: 1350 },
		{ php: 299, vp: 770 },
		{ php: 149, vp: 375 },
		{ php: 49, vp: 115 },
	];

	// Find the minimum PHP to cover the requested VP using a greedy approach for simplicity
	let remainingVP = vpAmount;
	let totalPHP = 0;
	let packages: string[] = [];

	while (remainingVP > 0) {
		// Find the smallest tier that satisfies the remaining VP, 
		// or if none satisfies it, take the largest tier.
		let selectedTier = tiers[0];
		
		for (let i = tiers.length - 1; i >= 0; i--) {
			if (tiers[i].vp >= remainingVP) {
				selectedTier = tiers[i];
				break;
			}
		}

		// If remaining is larger than the largest package, just buy the largest
		if (remainingVP > tiers[0].vp) {
			selectedTier = tiers[0];
		}

		totalPHP += selectedTier.php;
		remainingVP -= selectedTier.vp;
		packages.push(\`₱\${selectedTier.php} (\${selectedTier.vp} VP)\`);
	}

	// Exact proportionate cost (just for theoretical reference, using highest efficiency tier)
	const exactCost = vpAmount * (2490 / 7300);

	const formatPHP = (val: number) =>
		new Intl.NumberFormat("en-PH", { style: "currency", currency: "PHP" }).format(val);

	return (
		<ToolLayout>
			<ToolHeader
				title="Valorant VP to PHP Calculator"
				subtitle="Convert Valorant Points (VP) to Philippine Pesos and find the optimal top-up combination."
			/>
			
			<div className="tool-grid" style={{ marginTop: "24px" }}>
				<div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
					<div className="card">
						<h2 style={{ fontSize: "18px", marginBottom: "16px", color: "var(--primary)" }}>Item Cost</h2>

						<div className="form-group" style={{ marginBottom: "16px" }}>
							<label className="form-label">Valorant Points (VP) Needed</label>
							<input type="number" className="form-control" value={vpAmount || ""} onChange={(e) => setVpAmount(Number(e.target.value))} />
							<p style={{ fontSize: "12px", color: "var(--text-secondary)", marginTop: "4px" }}>E.g., 1775 for a Premium Skin, 4350 for a Bundle.</p>
						</div>
					</div>
				</div>

				<div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
					<div className="card" style={{ position: "sticky", top: "100px", backgroundColor: "var(--bg-color)" }}>
						<h2 style={{ fontSize: "20px", marginBottom: "16px", color: "var(--primary)" }}>Conversion Result</h2>
						
						<div style={{ display: "flex", justifyContent: "space-between", marginBottom: "12px", fontSize: "14px" }}>
							<span>Theoretical Exact Cost:</span>
							<strong>{formatPHP(exactCost)}</strong>
						</div>
						
						<div style={{ padding: "16px", backgroundColor: "rgba(16, 185, 129, 0.05)", border: "1px solid rgba(16, 185, 129, 0.2)", borderRadius: "8px", marginTop: "16px" }}>
							<div style={{ fontSize: "14px", marginBottom: "8px", color: "var(--text-secondary)" }}>Actual Top-Up Required (PHP):</div>
							<strong style={{ fontSize: "28px", color: "var(--primary)" }}>{formatPHP(totalPHP)}</strong>
							
							<div style={{ marginTop: "12px", fontSize: "12px", color: "var(--text-secondary)" }}>
								<strong>Recommended Purchase Combo:</strong>
								<ul style={{ paddingLeft: "16px", marginTop: "4px" }}>
									{packages.map((pkg, idx) => (
										<li key={idx}>{pkg}</li>
									))}
								</ul>
							</div>
						</div>
					</div>
				</div>
			</div>
		</ToolLayout>
	);
}
