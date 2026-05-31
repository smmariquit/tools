"use client";

import { useState } from "react";
import ToolHeader from "../components/ToolHeader";
import ToolLayout from "../components/ToolLayout";

export default function GamingEdpiClient() {
	const [dpi, setDpi] = useState(800);
	const [sensitivity, setSensitivity] = useState(1.5);
	const [gameFrom, setGameFrom] = useState("csgo");
	const [gameTo, setGameTo] = useState("valorant");

	// Multipliers relative to CS:GO (CS2) which has a multiplier of 1.0
	const multipliers: Record<string, number> = {
		csgo: 1.0,
		apex: 1.0,
		valorant: 3.181818,
		overwatch: 0.3,
		rainbow6: 0.26087, // Standard multiplier
	};

	// Convert "From" sensitivity to CS:GO baseline
	const csgoSens = sensitivity * multipliers[gameFrom];
	
	// Convert CS:GO baseline to "To" sensitivity
	const newSens = csgoSens / multipliers[gameTo];
	
	// eDPI is simply DPI * Sens
	const edpiFrom = dpi * sensitivity;
	const edpiTo = dpi * newSens;

	return (
		<ToolLayout>
			<ToolHeader
				title="Gaming eDPI & Sensitivity Converter"
				subtitle="Convert your mouse sensitivity seamlessly between Valorant, CS2, Apex Legends, and Overwatch."
			/>
			
			<div className="tool-grid" style={{ marginTop: "24px" }}>
				<div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
					<div className="card">
						<h2 style={{ fontSize: "18px", marginBottom: "16px", color: "var(--primary)" }}>Current Settings</h2>

						<div className="form-group" style={{ marginBottom: "16px" }}>
							<label className="form-label">Mouse DPI</label>
							<input type="number" className="form-control" value={dpi || ""} onChange={(e) => setDpi(Number(e.target.value))} />
						</div>

						<div className="form-group" style={{ marginBottom: "16px" }}>
							<label className="form-label">Convert From</label>
							<select className="form-control" value={gameFrom} onChange={(e) => setGameFrom(e.target.value)}>
								<option value="csgo">Counter-Strike 2 / CS:GO</option>
								<option value="valorant">Valorant</option>
								<option value="apex">Apex Legends</option>
								<option value="overwatch">Overwatch 2</option>
								<option value="rainbow6">Rainbow Six Siege</option>
							</select>
						</div>

						<div className="form-group" style={{ marginBottom: "16px" }}>
							<label className="form-label">In-Game Sensitivity</label>
							<input type="number" step="0.01" className="form-control" value={sensitivity || ""} onChange={(e) => setSensitivity(Number(e.target.value))} />
						</div>

						<div className="form-group">
							<label className="form-label">Convert To</label>
							<select className="form-control" value={gameTo} onChange={(e) => setGameTo(e.target.value)}>
								<option value="valorant">Valorant</option>
								<option value="csgo">Counter-Strike 2 / CS:GO</option>
								<option value="apex">Apex Legends</option>
								<option value="overwatch">Overwatch 2</option>
								<option value="rainbow6">Rainbow Six Siege</option>
							</select>
						</div>
					</div>
				</div>

				<div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
					<div className="card" style={{ position: "sticky", top: "100px", backgroundColor: "var(--bg-color)" }}>
						<h2 style={{ fontSize: "20px", marginBottom: "16px", color: "var(--primary)" }}>Conversion Result</h2>
						
						<div style={{ display: "flex", justifyContent: "space-between", marginBottom: "12px", fontSize: "14px", color: "var(--text-secondary)" }}>
							<span>Original eDPI:</span>
							<strong>{edpiFrom.toFixed(1)}</strong>
						</div>
						
						<div style={{ padding: "16px", backgroundColor: "rgba(13, 71, 161, 0.05)", border: "1px solid rgba(13, 71, 161, 0.2)", borderRadius: "8px", marginTop: "16px" }}>
							<div style={{ fontSize: "14px", marginBottom: "8px", color: "var(--text-secondary)" }}>New Sensitivity:</div>
							<strong style={{ fontSize: "32px", color: "var(--primary)" }}>{newSens.toFixed(3)}</strong>
						</div>
						
						<p style={{ fontSize: "12px", color: "var(--text-secondary)", marginTop: "16px" }}>
							*Your eDPI in the new game may appear numerically different depending on how the game engine scales sensitivity, but the physical 360-degree mouse movement distance will remain identical.
						</p>
					</div>
				</div>
			</div>
		</ToolLayout>
	);
}
