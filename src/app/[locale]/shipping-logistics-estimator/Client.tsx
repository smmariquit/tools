"use client";

import { useState } from "react";
import ToolHeader from "../components/ToolHeader";
import ToolLayout from "../components/ToolLayout";

export default function ShippingClient() {
	const [origin, setOrigin] = useState("NCR");
	const [destination, setDestination] = useState("VIS");
	const [weightKg, setWeightKg] = useState(2);
	const [isCod, setIsCod] = useState(false);
	const [itemValue, setItemValue] = useState(1500);

	// Mock Regional Base Matrix (First 1 KG)
	const baseRates: Record<string, Record<string, number>> = {
		NCR: { NCR: 80, LUZ: 120, VIS: 150, MIN: 170 },
		LUZ: { NCR: 120, LUZ: 100, VIS: 160, MIN: 180 },
		VIS: { NCR: 150, LUZ: 160, VIS: 100, MIN: 150 },
		MIN: { NCR: 170, LUZ: 180, VIS: 150, MIN: 120 },
	};

	const baseFee = baseRates[origin][destination];
	
	// Exceeding weight (per extra KG)
	const excessWeight = Math.max(0, weightKg - 1);
	const excessFee = excessWeight * 50; // PHP 50 per additional KG

	// COD Fee (Typically 1.5% to 2.5% of item value or min 50)
	const codFee = isCod ? Math.max(50, itemValue * 0.02) : 0;

	const totalShipping = baseFee + excessFee + codFee;

	const formatPHP = (val: number) =>
		new Intl.NumberFormat("en-PH", { style: "currency", currency: "PHP" }).format(val);

	return (
		<ToolLayout maxWidth="1200px">
			<ToolHeader
				title="Local Shipping & Logistics Estimator"
				subtitle="Estimate freight and Cash-On-Delivery (COD) fees for MSME e-commerce shipments."
			/>
			
			<div className="tool-grid" style={{ marginTop: "24px" }}>
				<div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
					<div className="card">
						<h2 style={{ fontSize: "18px", marginBottom: "16px", color: "var(--primary)" }}>Shipment Route</h2>

						<div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginBottom: "16px" }}>
							<div className="form-group">
								<label className="form-label">Origin</label>
								<select className="form-control" value={origin} onChange={(e) => setOrigin(e.target.value)}>
									<option value="NCR">Metro Manila (NCR)</option>
									<option value="LUZ">Luzon</option>
									<option value="VIS">Visayas</option>
									<option value="MIN">Mindanao</option>
								</select>
							</div>
							<div className="form-group">
								<label className="form-label">Destination</label>
								<select className="form-control" value={destination} onChange={(e) => setDestination(e.target.value)}>
									<option value="NCR">Metro Manila (NCR)</option>
									<option value="LUZ">Luzon</option>
									<option value="VIS">Visayas</option>
									<option value="MIN">Mindanao</option>
								</select>
							</div>
						</div>

						<div className="form-group" style={{ marginBottom: "16px" }}>
							<label className="form-label">Package Weight (KG)</label>
							<input type="number" step="0.5" className="form-control" value={weightKg || ""} onChange={(e) => setWeightKg(Number(e.target.value))} />
						</div>

						<div className="form-group" style={{ marginBottom: "16px" }}>
							<label style={{ display: "flex", alignItems: "center", gap: "8px", cursor: "pointer", marginBottom: "8px" }}>
								<input type="checkbox" checked={isCod} onChange={(e) => setIsCod(e.target.checked)} />
								<span style={{ fontSize: "14px", fontWeight: 500 }}>Cash On Delivery (COD)</span>
							</label>
						</div>

						{isCod && (
							<div className="form-group">
								<label className="form-label">Item Value for COD (PHP)</label>
								<input type="number" className="form-control" value={itemValue || ""} onChange={(e) => setItemValue(Number(e.target.value))} />
							</div>
						)}
					</div>
				</div>

				<div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
					<div className="card" style={{ position: "sticky", top: "100px", backgroundColor: "var(--bg-color)" }}>
						<h2 style={{ fontSize: "20px", marginBottom: "16px", color: "var(--primary)" }}>Estimated Cost</h2>
						
						<div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px", fontSize: "14px" }}>
							<span>Base Fare (First 1 KG):</span>
							<strong>{formatPHP(baseFee)}</strong>
						</div>
						
						{excessFee > 0 && (
							<div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px", fontSize: "14px" }}>
								<span>Excess Weight Fee:</span>
								<strong>{formatPHP(excessFee)}</strong>
							</div>
						)}

						{isCod && (
							<div style={{ display: "flex", justifyContent: "space-between", marginBottom: "16px", fontSize: "14px" }}>
								<span>COD Handling Fee:</span>
								<strong>{formatPHP(codFee)}</strong>
							</div>
						)}

						<div style={{ display: "flex", justifyContent: "space-between", marginBottom: "16px", paddingTop: "12px", borderTop: "1px dashed rgba(13, 71, 161, 0.2)", fontSize: "18px", fontWeight: 700, color: "var(--primary)" }}>
							<span>Total Estimated Shipping:</span>
							<span>{formatPHP(totalShipping)}</span>
						</div>
					</div>
				</div>
			</div>
		</ToolLayout>
	);
}
