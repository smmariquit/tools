"use client";

import { useState } from "react";
import ToolHeader from "../components/ToolHeader";
import ToolLayout from "../components/ToolLayout";

export default function CryptoP2PClient() {
	const [usdtAmount, setUsdtAmount] = useState(1000);
	const [p2pRate, setP2pRate] = useState(58.50); // often higher than spot
	const [merchantFee, setMerchantFee] = useState(0);

	const grossPHP = usdtAmount * p2pRate;
	const netPHP = grossPHP - merchantFee;

	const formatPHP = (val: number) =>
		new Intl.NumberFormat("en-PH", { style: "currency", currency: "PHP" }).format(val);

	return (
		<ToolLayout>
			<ToolHeader
				title="P2P Crypto Cash-Out Calculator"
				subtitle="Calculate exact PHP earnings when selling USDT via P2P on Binance or Bybit."
			/>
			
			<div className="tool-grid" style={{ marginTop: "24px" }}>
				<div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
					<div className="card">
						<h2 style={{ fontSize: "18px", marginBottom: "16px", color: "var(--primary)" }}>P2P Sell Order</h2>

						<div className="form-group" style={{ marginBottom: "16px" }}>
							<label className="form-label">Amount of USDT to Sell</label>
							<input type="number" className="form-control" value={usdtAmount || ""} onChange={(e) => setUsdtAmount(Number(e.target.value))} />
						</div>

						<div className="form-group" style={{ marginBottom: "16px" }}>
							<label className="form-label">Merchant P2P Rate (PHP/USDT)</label>
							<input type="number" step="0.01" className="form-control" value={p2pRate || ""} onChange={(e) => setP2pRate(Number(e.target.value))} />
						</div>

						<div className="form-group">
							<label className="form-label">Additional Merchant/Bank Transfer Fees (PHP)</label>
							<input type="number" className="form-control" value={merchantFee || ""} onChange={(e) => setMerchantFee(Number(e.target.value))} />
							<p style={{ fontSize: "12px", color: "var(--text-secondary)", marginTop: "4px" }}>Some P2P merchants deduct ₱15 for PESONet/InstaPay.</p>
						</div>
					</div>
				</div>

				<div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
					<div className="card" style={{ position: "sticky", top: "100px", backgroundColor: "var(--bg-color)" }}>
						<h2 style={{ fontSize: "20px", marginBottom: "16px", color: "var(--primary)" }}>Cash-Out Result</h2>
						
						<div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px", fontSize: "14px" }}>
							<span>Gross PHP Value:</span>
							<strong>{formatPHP(grossPHP)}</strong>
						</div>
						<div style={{ display: "flex", justifyContent: "space-between", marginBottom: "16px", fontSize: "14px", color: "red" }}>
							<span>Less Transfer Fees:</span>
							<span>- {formatPHP(merchantFee)}</span>
						</div>
						
						<div style={{ padding: "16px", backgroundColor: "rgba(16, 185, 129, 0.05)", border: "1px solid rgba(16, 185, 129, 0.2)", borderRadius: "8px" }}>
							<div style={{ display: "flex", justifyContent: "space-between", fontSize: "18px", fontWeight: "bold", color: "var(--primary)" }}>
								<span>Net PHP to Receive:</span>
								<span>{formatPHP(netPHP)}</span>
							</div>
						</div>
					</div>
				</div>
			</div>
		</ToolLayout>
	);
}
