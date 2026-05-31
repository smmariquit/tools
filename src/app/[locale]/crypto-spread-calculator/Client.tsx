"use client";

import { useState } from "react";
import ToolHeader from "../components/ToolHeader";
import ToolLayout from "../components/ToolLayout";

export default function CryptoSpreadClient() {
	const [globalSpotUSD, setGlobalSpotUSD] = useState(65000); // BTC price example
	const [usdPhpRate, setUsdPhpRate] = useState(56.00); // Forex rate
	const [localAppPricePHP, setLocalAppPricePHP] = useState(3750000);

	const trueSpotPHP = globalSpotUSD * usdPhpRate;
	
	const spreadPHP = localAppPricePHP - trueSpotPHP;
	const spreadPercentage = trueSpotPHP > 0 ? (spreadPHP / trueSpotPHP) * 100 : 0;

	const formatPHP = (val: number) =>
		new Intl.NumberFormat("en-PH", { style: "currency", currency: "PHP" }).format(val);
	const formatUSD = (val: number) =>
		new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(val);

	return (
		<ToolLayout>
			<ToolHeader
				title="PH Crypto Exchange Spread Calculator"
				subtitle="Compare the hidden spread when buying crypto on local apps like Coins.ph, PDAX, Maya, and GCash."
			/>
			
			<div className="tool-grid" style={{ marginTop: "24px" }}>
				<div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
					<div className="card">
						<h2 style={{ fontSize: "18px", marginBottom: "16px", color: "var(--primary)" }}>Current Rates</h2>

						<div className="form-group" style={{ marginBottom: "16px" }}>
							<label className="form-label">Global Spot Price (USD)</label>
							<input type="number" className="form-control" value={globalSpotUSD || ""} onChange={(e) => setGlobalSpotUSD(Number(e.target.value))} />
							<p style={{ fontSize: "12px", color: "var(--text-secondary)", marginTop: "4px" }}>Check Binance or CoinMarketCap for true spot.</p>
						</div>

						<div className="form-group" style={{ marginBottom: "16px" }}>
							<label className="form-label">Current USD/PHP Forex Rate</label>
							<input type="number" className="form-control" value={usdPhpRate || ""} onChange={(e) => setUsdPhpRate(Number(e.target.value))} />
						</div>

						<div className="form-group">
							<label className="form-label">Quoted Buying Price on Local App (PHP)</label>
							<input type="number" className="form-control" value={localAppPricePHP || ""} onChange={(e) => setLocalAppPricePHP(Number(e.target.value))} />
						</div>
					</div>
				</div>

				<div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
					<div className="card" style={{ position: "sticky", top: "100px", backgroundColor: "var(--bg-color)" }}>
						<h2 style={{ fontSize: "20px", marginBottom: "16px", color: "var(--primary)" }}>Spread Analysis</h2>
						
						<div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px", fontSize: "14px" }}>
							<span>True Spot Price (PHP):</span>
							<strong>{formatPHP(trueSpotPHP)}</strong>
						</div>
						
						<div style={{ padding: "16px", backgroundColor: "rgba(239, 68, 68, 0.05)", border: "1px solid rgba(239, 68, 68, 0.2)", borderRadius: "8px", marginBottom: "16px", marginTop: "16px" }}>
							<div style={{ display: "flex", justifyContent: "space-between", fontSize: "14px", color: "red" }}>
								<span>Hidden Markup / Spread:</span>
								<strong>{formatPHP(spreadPHP)}</strong>
							</div>
						</div>

						<div style={{ display: "flex", justifyContent: "space-between", fontSize: "18px", fontWeight: 700, color: "var(--primary)" }}>
							<span>Effective Spread %:</span>
							<span>{spreadPercentage.toFixed(2)}%</span>
						</div>
					</div>
				</div>
			</div>
		</ToolLayout>
	);
}
