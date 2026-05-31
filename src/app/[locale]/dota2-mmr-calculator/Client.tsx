"use client";

import { useState } from "react";
import ToolHeader from "../components/ToolHeader";
import ToolLayout from "../components/ToolLayout";

export default function Dota2MmrClient() {
	const [mmr, setMmr] = useState(2500);

	// Approximate Dota 2 MMR thresholds
	const MEDALS = [
		{ name: "Herald", max: 770 },
		{ name: "Guardian", max: 1540 },
		{ name: "Crusader", max: 2310 },
		{ name: "Archon", max: 3080 },
		{ name: "Legend", max: 3850 },
		{ name: "Ancient", max: 4620 },
		{ name: "Divine", max: 5420 },
		{ name: "Immortal", max: Infinity }
	];

	let currentMedal = "Herald";
	let nextMedal = "Guardian";
	let mmrForNext = 770;

	for (let i = 0; i < MEDALS.length; i++) {
		if (mmr < MEDALS[i].max) {
			currentMedal = MEDALS[i].name;
			if (i < MEDALS.length - 1) {
				nextMedal = MEDALS[i + 1].name;
				mmrForNext = MEDALS[i].max;
			} else {
				nextMedal = "None (Max)";
				mmrForNext = mmr; // Immortal
			}
			break;
		}
	}

	const mmrDiff = Math.max(0, mmrForNext - mmr);
	const winsNeeded = Math.ceil(mmrDiff / 25); // Average 25 MMR per win

	return (
		<ToolLayout>
			<ToolHeader
				title="Dota 2 MMR to Rank Calculator"
				subtitle="Convert your raw MMR into the corresponding medal and calculate how many wins you need to rank up."
			/>
			
			<div className="tool-grid" style={{ marginTop: "24px" }}>
				<div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
					<div className="card">
						<h2 style={{ fontSize: "18px", marginBottom: "16px", color: "var(--primary)" }}>Your MMR</h2>

						<div className="form-group" style={{ marginBottom: "16px" }}>
							<label className="form-label">Current Matchmaking Rating (MMR)</label>
							<input type="number" className="form-control" value={mmr || ""} onChange={(e) => setMmr(Number(e.target.value))} />
							<p style={{ fontSize: "12px", color: "var(--text-secondary)", marginTop: "4px" }}>You can find this in your Dota 2 profile stats page.</p>
						</div>
					</div>
				</div>

				<div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
					<div className="card" style={{ position: "sticky", top: "100px", backgroundColor: "var(--bg-color)" }}>
						<h2 style={{ fontSize: "20px", marginBottom: "16px", color: "var(--primary)" }}>Rank Analysis</h2>
						
						<div style={{ display: "flex", justifyContent: "space-between", marginBottom: "12px", fontSize: "16px" }}>
							<span>Current Medal:</span>
							<strong style={{ color: "var(--primary)" }}>{currentMedal}</strong>
						</div>
						
						{currentMedal !== "Immortal" && (
							<div style={{ padding: "16px", backgroundColor: "rgba(239, 68, 68, 0.05)", border: "1px solid rgba(239, 68, 68, 0.2)", borderRadius: "8px", marginTop: "16px" }}>
								<div style={{ fontSize: "14px", marginBottom: "8px", color: "var(--text-secondary)" }}>To reach {nextMedal}:</div>
								<strong style={{ fontSize: "24px", color: "red" }}>{winsNeeded} Net Wins</strong>
								<div style={{ marginTop: "4px", fontSize: "12px", color: "var(--text-secondary)" }}>
									({mmrDiff} MMR required)
								</div>
							</div>
						)}

						{currentMedal === "Immortal" && (
							<div style={{ padding: "16px", backgroundColor: "rgba(16, 185, 129, 0.05)", border: "1px solid rgba(16, 185, 129, 0.2)", borderRadius: "8px", marginTop: "16px" }}>
								<strong style={{ fontSize: "20px", color: "#10b981" }}>Welcome to Immortal!</strong>
								<div style={{ marginTop: "4px", fontSize: "12px", color: "var(--text-secondary)" }}>
									You are now grinding for leaderboard placement.
								</div>
							</div>
						)}
					</div>
				</div>
			</div>
		</ToolLayout>
	);
}
