"use client";

import { useState } from "react";
import ToolHeader from "../components/ToolHeader";
import ToolLayout from "../components/ToolLayout";

export default function Web3TokenClient() {
	const [token, setToken] = useState<"slp" | "ron" | "pixel">("pixel");
	const [amount, setAmount] = useState(150);
	const [customPrice, setCustomPrice] = useState<number | null>(null);
	const [p2pRate, setP2pRate] = useState(56.5);
	const [p2pSpreadPercent, setP2pSpreadPercent] = useState(1.5); // Slippage + Spread

	// Typical token price guides in USD
	const defaultPrices = {
		slp: 0.003,
		ron: 2.5,
		pixel: 0.4,
	};

	// Typical gas costs in RON
	const gasFeeRon = 0.005;
	const currentRonPrice =
		customPrice !== null && token === "ron" ? customPrice : defaultPrices.ron;
	const gasCostPhp = gasFeeRon * currentRonPrice * p2pRate;

	// Calculate dollar value
	const tokenPriceUsd =
		customPrice !== null ? customPrice : defaultPrices[token];
	const grossUsd = amount * tokenPriceUsd;
	const grossPhp = grossUsd * p2pRate;

	// Deduct P2P spread + slippage
	const p2pSpreadPhp = grossPhp * (p2pSpreadPercent / 100);

	// Net PHP cashout
	const netPhp = Math.max(0, grossPhp - p2pSpreadPhp - gasCostPhp);

	const formatPHP = (val: number) =>
		new Intl.NumberFormat("en-PH", {
			style: "currency",
			currency: "PHP",
		}).format(val);

	const formatUSD = (val: number) =>
		new Intl.NumberFormat("en-US", {
			style: "currency",
			currency: "USD",
		}).format(val);

	const handleTokenChange = (t: "slp" | "ron" | "pixel") => {
		setToken(t);
		setCustomPrice(null); // Reset custom price to default when switching tokens
	};

	return (
		<ToolLayout>
			<ToolHeader
				title="Web3 Token to PHP Cash-Out Calculator"
				subtitle="Estimate the net cash value in GCash/Bank when off-ramping gaming tokens like SLP, RON, and PIXEL to Philippine Pesos (PHP) via P2P markets."
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
							Transaction Details
						</h2>

						<div className="form-group" style={{ marginBottom: "16px" }}>
							<label htmlFor="token-selector" className="form-label">
								Select Gaming Token
							</label>
							<select
								id="token-selector"
								className="form-control"
								value={token}
								onChange={(e) =>
									handleTokenChange(e.target.value as "slp" | "ron" | "pixel")
								}
							>
								<option value="pixel">Pixels (PIXEL)</option>
								<option value="ron">Ronin (RON)</option>
								<option value="slp">Smooth Love Potion (SLP)</option>
							</select>
						</div>

						<div className="form-group" style={{ marginBottom: "16px" }}>
							<label htmlFor="token-amount-input" className="form-label">
								Amount of Tokens to Cash Out
							</label>
							<input
								id="token-amount-input"
								type="number"
								className="form-control"
								value={amount || ""}
								onChange={(e) => setAmount(Math.max(0, Number(e.target.value)))}
								min="0"
							/>
						</div>

						<div className="form-group" style={{ marginBottom: "16px" }}>
							<label htmlFor="token-price-input" className="form-label">
								Token Price (USD)
							</label>
							<input
								id="token-price-input"
								type="number"
								step="0.0001"
								className="form-control"
								value={
									customPrice !== null ? customPrice : defaultPrices[token]
								}
								onChange={(e) =>
									setCustomPrice(Math.max(0, Number(e.target.value)))
								}
							/>
							<span
								style={{
									fontSize: "12px",
									color: "var(--text-secondary)",
									marginTop: "4px",
									display: "block",
								}}
							>
								*Pre-filled with latest typical prices. You can override with
								the current coin market price.
							</span>
						</div>

						<div className="form-group" style={{ marginBottom: "16px" }}>
							<label htmlFor="p2p-rate-input" className="form-label">
								Binance P2P USD/PHP Rate (₱)
							</label>
							<input
								id="p2p-rate-input"
								type="number"
								step="0.01"
								className="form-control"
								value={p2pRate || ""}
								onChange={(e) =>
									setP2pRate(Math.max(0, Number(e.target.value)))
								}
							/>
						</div>

						<div className="form-group">
							<label htmlFor="p2p-spread-input" className="form-label">
								Estimated P2P Spread & Fees (%)
							</label>
							<input
								id="p2p-spread-input"
								type="number"
								step="0.1"
								className="form-control"
								value={p2pSpreadPercent || ""}
								onChange={(e) =>
									setP2pSpreadPercent(Math.max(0, Number(e.target.value)))
								}
							/>
							<span
								style={{
									fontSize: "12px",
									color: "var(--text-secondary)",
									marginTop: "4px",
									display: "block",
								}}
							>
								Covers Binance P2P maker-taker fee + merchant bid/ask spread
								(normally 1.0% to 2.0%).
							</span>
						</div>
					</div>
				</div>

				<div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
					<div
						className="card"
						style={{
							position: "sticky",
							top: "100px",
							backgroundColor: "var(--bg-color)",
						}}
					>
						<h2
							style={{
								fontSize: "20px",
								marginBottom: "16px",
								color: "var(--primary)",
							}}
						>
							Off-Ramp Summary
						</h2>

						<div
							style={{
								display: "flex",
								justifyContent: "space-between",
								marginBottom: "8px",
								fontSize: "14px",
							}}
						>
							<span>Gross Asset Value (USD):</span>
							<strong>{formatUSD(grossUsd)}</strong>
						</div>

						<div
							style={{
								display: "flex",
								justifyContent: "space-between",
								marginBottom: "8px",
								fontSize: "14px",
							}}
						>
							<span>Gross Cash Value (PHP):</span>
							<strong>{formatPHP(grossPhp)}</strong>
						</div>

						<div
							style={{
								display: "flex",
								justifyContent: "space-between",
								marginBottom: "8px",
								fontSize: "14px",
								color: "red",
							}}
						>
							<span>Ronin Gas Fee (0.005 RON):</span>
							<span>- {formatPHP(gasCostPhp)}</span>
						</div>

						<div
							style={{
								display: "flex",
								justifyContent: "space-between",
								marginBottom: "16px",
								fontSize: "14px",
								color: "red",
							}}
						>
							<span>P2P Spread/Slippage ({p2pSpreadPercent}%):</span>
							<span>- {formatPHP(p2pSpreadPhp)}</span>
						</div>

						<div
							style={{
								padding: "16px",
								backgroundColor: "rgba(16, 185, 129, 0.05)",
								border: "1px solid rgba(16, 185, 129, 0.2)",
								borderRadius: "8px",
								marginTop: "16px",
							}}
						>
							<div
								style={{
									fontSize: "14px",
									marginBottom: "4px",
									color: "var(--text-secondary)",
								}}
							>
								Net Payout Received (PHP):
							</div>
							<strong style={{ fontSize: "28px", color: "#10b981" }}>
								{formatPHP(netPhp)}
							</strong>
							<span
								style={{
									fontSize: "12px",
									color: "var(--text-secondary)",
									display: "block",
									marginTop: "8px",
								}}
							>
								Expected payout transferred directly to your GCash, Maya, or
								Bank account.
							</span>
						</div>
					</div>
				</div>
			</div>
		</ToolLayout>
	);
}
