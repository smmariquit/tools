"use client";

import { useState } from "react";
import ToolHeader from "../components/ToolHeader";
import ToolLayout from "../components/ToolLayout";

export default function MlbbWinrateClient() {
	const [totalMatches, setTotalMatches] = useState(150);
	const [currentWR, setCurrentWR] = useState(55.5);
	const [targetWR, setTargetWR] = useState(60.0);

	// Wins_needed = (Target_WR * Total_Matches - Current_WR * Total_Matches) / (100 - Target_WR)
	// If calculating using percentages (e.g. 60 instead of 0.6):
	const currentWins = Math.round((currentWR / 100) * totalMatches);
	let winsNeeded = 0;
	let impossible = false;

	if (targetWR >= 100) {
		impossible = true;
	} else if (targetWR <= currentWR) {
		winsNeeded = 0;
	} else {
		// (CurrentWins + x) / (TotalMatches + x) = TargetWR / 100
		// 100(CurrentWins + x) = TargetWR(TotalMatches + x)
		// 100CurrentWins + 100x = TargetWR*TotalMatches + TargetWR*x
		// x(100 - TargetWR) = TargetWR*TotalMatches - 100CurrentWins
		// x = (TargetWR*TotalMatches - 100CurrentWins) / (100 - TargetWR)
		winsNeeded = Math.ceil((targetWR * totalMatches - 100 * currentWins) / (100 - targetWR));
		if (winsNeeded < 0) winsNeeded = 0;
	}

	return (
		<ToolLayout>
			<ToolHeader
				title="MLBB Win Rate Calculator"
				subtitle="Find out exactly how many consecutive wins you need to reach your target win rate."
			/>
			
			<div className="tool-grid" style={{ marginTop: "24px" }}>
				<div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
					<div className="card">
						<h2 style={{ fontSize: "18px", marginBottom: "16px", color: "var(--primary)" }}>Current Stats</h2>

						<div className="form-group" style={{ marginBottom: "16px" }}>
							<label className="form-label">Total Matches Played</label>
							<input type="number" className="form-control" value={totalMatches || ""} onChange={(e) => setTotalMatches(Number(e.target.value))} />
						</div>

						<div className="form-group" style={{ marginBottom: "16px" }}>
							<label className="form-label">Current Win Rate (%)</label>
							<input type="number" step="0.1" className="form-control" value={currentWR || ""} onChange={(e) => setCurrentWR(Number(e.target.value))} />
						</div>

						<div className="form-group">
							<label className="form-label">Target Win Rate (%)</label>
							<input type="number" step="0.1" className="form-control" value={targetWR || ""} onChange={(e) => setTargetWR(Number(e.target.value))} />
						</div>
					</div>
				</div>

				<div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
					<div className="card" style={{ position: "sticky", top: "100px", backgroundColor: "var(--bg-color)" }}>
						<h2 style={{ fontSize: "20px", marginBottom: "16px", color: "var(--primary)" }}>Result</h2>
						
						<div style={{ display: "flex", justifyContent: "space-between", marginBottom: "12px", fontSize: "14px" }}>
							<span>Current Wins:</span>
							<strong>{currentWins} matches</strong>
						</div>
						
						<div style={{ padding: "16px", backgroundColor: "rgba(13, 71, 161, 0.05)", border: "1px solid rgba(13, 71, 161, 0.2)", borderRadius: "8px", marginTop: "16px" }}>
							<div style={{ fontSize: "14px", marginBottom: "8px", color: "var(--text-secondary)" }}>Consecutive wins required:</div>
							{impossible ? (
								<strong style={{ fontSize: "20px", color: "red" }}>Impossible (100% Target)</strong>
							) : (
								<strong style={{ fontSize: "32px", color: "var(--primary)" }}>{winsNeeded} wins</strong>
							)}
						</div>
						
						<p style={{ fontSize: "12px", color: "var(--text-secondary)", marginTop: "16px" }}>
							*This assumes you win every single game in a row without losing. Good luck in Solo Queue!
						</p>
					</div>
				</div>
			</div>
		</ToolLayout>
	);
}
