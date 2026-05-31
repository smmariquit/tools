"use client";

import { useState } from "react";
import ToolHeader from "../components/ToolHeader";
import ToolLayout from "../components/ToolLayout";

export default function Web3ScholarClient() {
	const [tokenType, setTokenType] = useState<"pixel" | "slp" | "other">(
		"pixel",
	);
	const [tokensEarned, setTokensEarned] = useState(500);
	const [tokenPricePhp, setTokenPricePhp] = useState(22.6); // average price for PIXEL in PHP roughly
	const [managerSplit, setManagerSplit] = useState(40); // 40% Manager, 60% Scholar is typical

	const scholarSplit = 100 - managerSplit;

	// Computations
	const totalRevenuePhp = tokensEarned * tokenPricePhp;

	const managerTokens = tokensEarned * (managerSplit / 100);
	const managerPhp = totalRevenuePhp * (managerSplit / 100);

	const scholarTokens = tokensEarned * (scholarSplit / 100);
	const scholarPhp = totalRevenuePhp * (scholarSplit / 100);

	const formatPHP = (val: number) =>
		new Intl.NumberFormat("en-PH", {
			style: "currency",
			currency: "PHP",
		}).format(val);

	const handleManagerSplitChange = (val: number) => {
		setManagerSplit(Math.min(100, Math.max(0, val)));
	};

	const handleTokenTypeChange = (type: "pixel" | "slp" | "other") => {
		setTokenType(type);
		if (type === "pixel") {
			setTokenPricePhp(22.6);
		} else if (type === "slp") {
			setTokenPricePhp(0.17);
		} else {
			setTokenPricePhp(10);
		}
	};

	return (
		<ToolLayout>
			<ToolHeader
				title="Web3 Scholar-Manager Split Calculator"
				subtitle="Easily calculate and visualise earnings shares between game managers and scholars (for games like Pixels or Axie Infinity)."
			/>

			<div className="tool-grid" style={{ marginTop: "24px" }}>
				<div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
					<div className="card">
						<h2
							style={{
								fontSize: "18px",
								marginBottom: "16px",
								color: "var(--primary)",
							}}
						>
							Earnings Input
						</h2>

						<div className="form-group" style={{ marginBottom: "16px" }}>
							<label htmlFor="scholar-token-type" className="form-label">
								Gaming Token Type
							</label>
							<select
								id="scholar-token-type"
								className="form-control"
								value={tokenType}
								onChange={(e) =>
									handleTokenTypeChange(
										e.target.value as "pixel" | "slp" | "other",
									)
								}
							>
								<option value="pixel">Pixels (PIXEL)</option>
								<option value="slp">Smooth Love Potion (SLP)</option>
								<option value="other">Other Token</option>
							</select>
						</div>

						<div className="form-group" style={{ marginBottom: "16px" }}>
							<label htmlFor="scholar-tokens-earned" className="form-label">
								Total Tokens Earned
							</label>
							<input
								id="scholar-tokens-earned"
								type="number"
								className="form-control"
								value={tokensEarned || ""}
								onChange={(e) =>
									setTokensEarned(Math.max(0, Number(e.target.value)))
								}
								min="0"
							/>
						</div>

						<div className="form-group" style={{ marginBottom: "16px" }}>
							<label htmlFor="scholar-token-price" className="form-label">
								Token Price in PHP (₱)
							</label>
							<input
								id="scholar-token-price"
								type="number"
								step="0.01"
								className="form-control"
								value={tokenPricePhp || ""}
								onChange={(e) =>
									setTokenPricePhp(Math.max(0, Number(e.target.value)))
								}
								min="0"
							/>
						</div>

						<div className="form-group">
							<label htmlFor="manager-split-slider" className="form-label">
								Manager Share: {managerSplit}% (Scholar gets {scholarSplit}%)
							</label>
							<input
								id="manager-split-slider"
								type="range"
								min="0"
								max="100"
								style={{
									width: "100%",
									cursor: "pointer",
									height: "8px",
									borderRadius: "4px",
									accentColor: "var(--primary)",
								}}
								value={managerSplit}
								onChange={(e) =>
									handleManagerSplitChange(Number(e.target.value))
								}
							/>
							<div
								style={{
									display: "flex",
									justifyContent: "space-between",
									fontSize: "12px",
									color: "var(--text-secondary)",
									marginTop: "4px",
								}}
							>
								<span>0% (All to Scholar)</span>
								<span>50/50 Split</span>
								<span>100% (All to Guild)</span>
							</div>
						</div>
					</div>
				</div>

				<div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
					<div
						className="card"
						style={{ backgroundColor: "var(--surface-color)" }}
					>
						<h2
							style={{
								fontSize: "20px",
								marginBottom: "16px",
								color: "var(--primary)",
							}}
						>
							Payout Breakdown
						</h2>

						<div
							style={{
								display: "flex",
								justifyContent: "space-between",
								marginBottom: "8px",
								fontSize: "14px",
							}}
						>
							<span>Total Pool Value:</span>
							<strong>{formatPHP(totalRevenuePhp)}</strong>
						</div>

						{/* Split visual track bar */}
						<div
							style={{
								width: "100%",
								height: "24px",
								display: "flex",
								borderRadius: "6px",
								overflow: "hidden",
								marginTop: "16px",
								marginBottom: "24px",
							}}
						>
							<div
								style={{
									width: `${managerSplit}%`,
									backgroundColor: "var(--primary)",
									color: "white",
									display: "flex",
									alignItems: "center",
									justifyContent: "center",
									fontSize: "11px",
									fontWeight: "bold",
									transition: "width 0.3s ease",
								}}
							>
								{managerSplit > 15 ? `Manager ${managerSplit}%` : ""}
							</div>
							<div
								style={{
									width: `${scholarSplit}%`,
									backgroundColor: "#10b981",
									color: "white",
									display: "flex",
									alignItems: "center",
									justifyContent: "center",
									fontSize: "11px",
									fontWeight: "bold",
									transition: "width 0.3s ease",
								}}
							>
								{scholarSplit > 15 ? `Scholar ${scholarSplit}%` : ""}
							</div>
						</div>

						{/* Manager Card */}
						<div
							style={{
								padding: "12px",
								border: "1px solid var(--border-color)",
								borderRadius: "8px",
								marginBottom: "12px",
								borderLeft: "4px solid var(--primary)",
							}}
						>
							<div
								style={{
									fontSize: "14px",
									color: "var(--text-secondary)",
									fontWeight: 600,
								}}
							>
								🛡️ Guild Manager Share
							</div>
							<div
								style={{
									display: "flex",
									justifyContent: "space-between",
									marginTop: "8px",
									fontSize: "13px",
								}}
							>
								<span>Tokens:</span>
								<strong>{managerTokens.toFixed(2)}</strong>
							</div>
							<div
								style={{
									display: "flex",
									justifyContent: "space-between",
									marginTop: "4px",
									fontSize: "15px",
									fontWeight: "bold",
									color: "var(--primary)",
								}}
							>
								<span>Net Share (PHP):</span>
								<span>{formatPHP(managerPhp)}</span>
							</div>
						</div>

						{/* Scholar Card */}
						<div
							style={{
								padding: "12px",
								border: "1px solid var(--border-color)",
								borderRadius: "8px",
								borderLeft: "4px solid #10b981",
							}}
						>
							<div
								style={{
									fontSize: "14px",
									color: "var(--text-secondary)",
									fontWeight: 600,
								}}
							>
								🎓 Scholar Share
							</div>
							<div
								style={{
									display: "flex",
									justifyContent: "space-between",
									marginTop: "8px",
									fontSize: "13px",
								}}
							>
								<span>Tokens:</span>
								<strong>{scholarTokens.toFixed(2)}</strong>
							</div>
							<div
								style={{
									display: "flex",
									justifyContent: "space-between",
									marginTop: "4px",
									fontSize: "15px",
									fontWeight: "bold",
									color: "#10b981",
								}}
							>
								<span>Net Share (PHP):</span>
								<span>{formatPHP(scholarPhp)}</span>
							</div>
						</div>
					</div>
				</div>
			</div>
		</ToolLayout>
	);
}
