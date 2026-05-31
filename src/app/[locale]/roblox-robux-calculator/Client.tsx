"use client";

import { useState } from "react";
import ToolHeader from "../components/ToolHeader";
import ToolLayout from "../components/ToolLayout";

export default function RobloxRobuxClient() {
	const [activeTab, setActiveTab] = useState<"buy" | "devex">("buy");

	// Buy Robux Calculator States
	const [robuxToBuy, setRobuxToBuy] = useState(800);

	// DevEx Cashout States
	const [robuxToCashout, setRobuxToCashout] = useState(30000);
	const [usdToPhpRate, setUsdToPhpRate] = useState(56.5);

	// Buy prices in Philippines (standard Mobile / App Store pricing roughly)
	const buyTiers = [
		{ robux: 10000, php: 5999 },
		{ robux: 4500, php: 2999 },
		{ robux: 1700, php: 1199 },
		{ robux: 800, php: 599 },
		{ robux: 400, php: 299 },
	];

	// Greedy algorithm for purchase packs optimization
	let remaining = robuxToBuy;
	let totalCostPhp = 0;
	const recommendedPacks: string[] = [];

	while (remaining > 0) {
		let chosenTier = buyTiers[0];
		for (let i = buyTiers.length - 1; i >= 0; i--) {
			if (buyTiers[i].robux >= remaining) {
				chosenTier = buyTiers[i];
				break;
			}
		}
		if (remaining > buyTiers[0].robux) {
			chosenTier = buyTiers[0];
		}
		totalCostPhp += chosenTier.php;
		remaining -= chosenTier.robux;
		recommendedPacks.push(
			`₱${chosenTier.php.toLocaleString()} Pack (${chosenTier.robux.toLocaleString()} Robux)`,
		);
	}

	// DevEx Math
	const DEVEX_RATE_USD = 0.0035; // Roblox DevEx rate: $0.0035 per Robux
	const isEligible = robuxToCashout >= 30000;
	const rawUsd = robuxToCashout * DEVEX_RATE_USD;

	// PayPal/Tipalti Wire Fee: typical 2% fee capped at $20
	const wireFeeUsd = Math.min(20, rawUsd * 0.02);
	const netUsd = rawUsd - wireFeeUsd;
	const netPhp = netUsd * usdToPhpRate;

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

	return (
		<ToolLayout>
			<ToolHeader
				title="Roblox Robux to PHP Calculator"
				subtitle="Optimize your Roblox spend or estimate your game development earnings when cashing out Robux in the Philippines."
			/>

			{/* Custom interactive premium tab switcher */}
			<div
				style={{
					display: "flex",
					gap: "12px",
					borderBottom: "1px solid var(--border-color)",
					marginBottom: "24px",
					marginTop: "24px",
				}}
			>
				<button
					type="button"
					onClick={() => setActiveTab("buy")}
					style={{
						padding: "12px 24px",
						backgroundColor: "transparent",
						border: "none",
						borderBottom:
							activeTab === "buy" ? "3px solid var(--primary)" : "none",
						color:
							activeTab === "buy" ? "var(--primary)" : "var(--text-secondary)",
						fontWeight: 600,
						cursor: "pointer",
						fontSize: "16px",
					}}
				>
					🛍️ Buying Robux
				</button>
				<button
					type="button"
					onClick={() => setActiveTab("devex")}
					style={{
						padding: "12px 24px",
						backgroundColor: "transparent",
						border: "none",
						borderBottom:
							activeTab === "devex" ? "3px solid var(--primary)" : "none",
						color:
							activeTab === "devex"
								? "var(--primary)"
								: "var(--text-secondary)",
						fontWeight: 600,
						cursor: "pointer",
						fontSize: "16px",
					}}
				>
					💸 Developer Exchange (DevEx)
				</button>
			</div>

			<div className="tool-grid">
				<div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
					{activeTab === "buy" ? (
						<div className="card">
							<h2
								style={{
									fontSize: "18px",
									marginBottom: "16px",
									color: "var(--primary)",
								}}
							>
								Purchase Parameters
							</h2>

							<div className="form-group" style={{ marginBottom: "16px" }}>
								<label htmlFor="robux-buy-input" className="form-label">
									Robux Wanted
								</label>
								<input
									id="robux-buy-input"
									type="number"
									className="form-control"
									value={robuxToBuy || ""}
									onChange={(e) =>
										setRobuxToBuy(Math.max(0, Number(e.target.value)))
									}
									min="0"
								/>
								<p
									style={{
										fontSize: "12px",
										color: "var(--text-secondary)",
										marginTop: "4px",
									}}
								>
									E.g. 400 for Starter Pack, 800 for Standard, 10,000 for
									high-end.
								</p>
							</div>
						</div>
					) : (
						<div className="card">
							<h2
								style={{
									fontSize: "18px",
									marginBottom: "16px",
									color: "var(--primary)",
								}}
							>
								DevEx Parameters
							</h2>

							<div className="form-group" style={{ marginBottom: "16px" }}>
								<label htmlFor="robux-cashout-input" className="form-label">
									Robux to Cash Out
								</label>
								<input
									id="robux-cashout-input"
									type="number"
									className="form-control"
									value={robuxToCashout || ""}
									onChange={(e) =>
										setRobuxToCashout(Math.max(0, Number(e.target.value)))
									}
									min="0"
								/>
								<p
									style={{
										fontSize: "12px",
										color: "var(--text-secondary)",
										marginTop: "4px",
									}}
								>
									Roblox DevEx minimum requirements is{" "}
									<strong>30,000 earned Robux</strong>.
								</p>
							</div>

							<div className="form-group">
								<label htmlFor="usd-php-rate-input" className="form-label">
									USD to PHP Exchange Rate (₱)
								</label>
								<input
									id="usd-php-rate-input"
									type="number"
									step="0.01"
									className="form-control"
									value={usdToPhpRate || ""}
									onChange={(e) =>
										setUsdToPhpRate(Math.max(0, Number(e.target.value)))
									}
								/>
							</div>
						</div>
					)}
				</div>

				<div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
					{activeTab === "buy" ? (
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
								Optimization Summary
							</h2>

							<div
								style={{
									display: "flex",
									justifyContent: "space-between",
									marginBottom: "12px",
									fontSize: "14px",
								}}
							>
								<span>Theoretical Cost (1 R$ ≈ ₱0.75):</span>
								<strong>{formatPHP(robuxToBuy * 0.7487)}</strong>
							</div>

							<div
								style={{
									padding: "16px",
									backgroundColor: "rgba(13, 71, 161, 0.05)",
									border: "1px solid rgba(13, 71, 161, 0.2)",
									borderRadius: "8px",
									marginTop: "16px",
								}}
							>
								<div
									style={{
										fontSize: "14px",
										marginBottom: "8px",
										color: "var(--text-secondary)",
									}}
								>
									Optimal Pack Purchase Cost (PHP):
								</div>
								<strong style={{ fontSize: "28px", color: "var(--primary)" }}>
									{formatPHP(totalCostPhp)}
								</strong>

								<div
									style={{
										marginTop: "12px",
										fontSize: "12px",
										color: "var(--text-secondary)",
									}}
								>
									<strong>Recommended Purchases:</strong>
									<ul style={{ paddingLeft: "16px", marginTop: "4px" }}>
										{recommendedPacks.map((pack, idx) => (
											<li key={idx}>{pack}</li>
										))}
									</ul>
								</div>
							</div>
						</div>
					) : (
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
								Earnings Summary
							</h2>

							{!isEligible ? (
								<div
									style={{
										padding: "16px",
										backgroundColor: "var(--warning-bg)",
										border: "1px solid var(--warning-border)",
										color: "var(--warning-text)",
										borderRadius: "8px",
										fontSize: "14px",
									}}
								>
									⚠️ <strong>Not Eligible:</strong> You must have a minimum of{" "}
									<strong>30,000 Robux</strong> to request a cash out under the
									official Roblox Developer Exchange rules.
								</div>
							) : (
								<>
									<div
										style={{
											display: "flex",
											justifyContent: "space-between",
											marginBottom: "8px",
											fontSize: "14px",
										}}
									>
										<span>DevEx Earnings (USD):</span>
										<strong>{formatUSD(rawUsd)}</strong>
									</div>

									<div
										style={{
											display: "flex",
											justifyContent: "space-between",
											marginBottom: "12px",
											fontSize: "14px",
											color: "red",
										}}
									>
										<span>PayPal / Wire Transfer Fees (2% Cap $20):</span>
										<span>- {formatUSD(wireFeeUsd)}</span>
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
											Net Payout (USD):
										</div>
										<strong
											style={{ fontSize: "20px", color: "var(--text-primary)" }}
										>
											{formatUSD(netUsd)}
										</strong>

										<div
											style={{
												fontSize: "14px",
												marginTop: "12px",
												marginBottom: "4px",
												color: "var(--text-secondary)",
											}}
										>
											Net Payout in Philippine Pesos:
										</div>
										<strong style={{ fontSize: "28px", color: "#10b981" }}>
											{formatPHP(netPhp)}
										</strong>
									</div>
								</>
							)}
						</div>
					)}
				</div>
			</div>
		</ToolLayout>
	);
}
