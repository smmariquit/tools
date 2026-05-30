"use client";

import { useState } from "react";
import Link from "next/link";
import AdBanner from "../components/AdBanner";

export default function ElectricBillClient() {
  const [wattsStr, setWattsStr] = useState("1500");
  const [hoursStr, setHoursStr] = useState("8");
  const [daysStr, setDaysStr] = useState("30");
  const [rateStr, setRateStr] = useState("11.50"); // Meralco avg approx 11-12 pesos per kWh

  const watts = parseFloat(wattsStr) || 0;
  const hours = parseFloat(hoursStr) || 0;
  const days = parseFloat(daysStr) || 0;
  const rate = parseFloat(rateStr) || 0;

  // Formula: (Watts / 1000) * Hours * Days * Rate
  const kilowattHours = (watts / 1000) * hours * days;
  const estimatedCost = kilowattHours * rate;

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-PH', { style: 'currency', currency: 'PHP' }).format(amount);
  };

  return (
    <div style={{ maxWidth: "800px", margin: "0 auto" }}>
      <div style={{ marginBottom: "24px" }}>
        <Link href="/" style={{ fontSize: "14px", display: "inline-block", marginBottom: "16px" }}>&larr; Back to Tools</Link>
        <h1 className="page-title">Electric Bill Estimator (Meralco)</h1>
        <p className="page-subtitle">Calculate the monthly electricity cost of specific appliances (e.g., Aircon, Refrigerator) based on their wattage.</p>
      </div>

      <AdBanner dataAdSlot="electric-bill-top" />

      <div className="tool-grid" style={{ marginTop: "24px" }}>
        {/* Input Card */}
        <div className="card" style={{ alignSelf: "start" }}>
          <h2 style={{ fontSize: "18px", marginBottom: "16px", borderBottom: "1px solid var(--border-color)", paddingBottom: "8px" }}>Appliance Details</h2>
          
          <div className="form-group">
            <label className="form-label" htmlFor="watts">Power Rating (Watts)</label>
            <input 
              type="number" 
              id="watts"
              className="form-control" 
              value={wattsStr}
              onChange={(e) => setWattsStr(e.target.value)}
              min="0"
            />
            <p className="form-hint" style={{ marginTop: "4px" }}>Usually found on the back sticker of the appliance (e.g., 1.0HP Aircon = ~1000W).</p>
          </div>

          <div className="form-group" style={{ marginTop: "16px" }}>
            <label className="form-label" htmlFor="hours">Daily Usage (Hours/Day)</label>
            <input 
              type="number" 
              id="hours"
              className="form-control" 
              value={hoursStr}
              onChange={(e) => setHoursStr(e.target.value)}
              min="0"
              max="24"
            />
          </div>

          <div className="form-group" style={{ marginTop: "16px" }}>
            <label className="form-label" htmlFor="days">Monthly Usage (Days/Month)</label>
            <input 
              type="number" 
              id="days"
              className="form-control" 
              value={daysStr}
              onChange={(e) => setDaysStr(e.target.value)}
              min="0"
              max="31"
            />
          </div>

          <div className="form-group" style={{ marginTop: "16px" }}>
            <label className="form-label" htmlFor="rate">Electricity Rate (₱ per kWh)</label>
            <input 
              type="number" 
              id="rate"
              className="form-control" 
              value={rateStr}
              onChange={(e) => setRateStr(e.target.value)}
              min="0"
              step="0.01"
            />
            <p className="form-hint" style={{ marginTop: "4px" }}>Check your latest Meralco bill for the exact blended rate.</p>
          </div>
        </div>

        {/* Results Card */}
        <div className="card" style={{ backgroundColor: "var(--bg-color)" }}>
          <h2 style={{ fontSize: "18px", marginBottom: "16px", borderBottom: "1px solid var(--border-color)", paddingBottom: "8px", color: "var(--primary)" }}>Estimated Monthly Cost</h2>
          
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px", fontSize: "14px" }}>
            <span>Monthly Consumption</span>
            <span style={{ fontWeight: 600 }}>{kilowattHours.toFixed(2)} kWh</span>
          </div>

          <div style={{ display: "flex", justifyContent: "space-between", marginTop: "16px", paddingTop: "16px", borderTop: "2px solid var(--border-color)", fontSize: "20px", fontWeight: 700, color: "var(--text-primary)" }}>
            <span>Cost for this Appliance</span>
            <span style={{ color: "#b71c1c" }}>{formatCurrency(estimatedCost)}</span>
          </div>

          <div style={{ marginTop: "24px", padding: "12px", backgroundColor: "var(--surface-color)", borderRadius: "var(--border-radius-sm)", border: "1px dashed var(--border-color)", fontSize: "13px", color: "var(--text-secondary)" }}>
            <strong>Quick Reference (Approximate Wattage):</strong>
            <ul style={{ paddingLeft: "20px", marginTop: "8px", marginBottom: 0 }}>
              <li>1.0 HP Non-Inverter Aircon: 1000W</li>
              <li>1.0 HP Inverter Aircon: ~600W (varies)</li>
              <li>Electric Fan: 60W</li>
              <li>Refrigerator (Medium): 150W</li>
              <li>LED TV (40&quot;): 70W</li>
            </ul>
          </div>
        </div>
      </div>

      <div style={{ marginTop: "48px", paddingTop: "32px", borderTop: "1px solid var(--border-color)", color: "var(--text-primary)" }}>
        <h2 style={{ fontSize: "24px", marginBottom: "16px" }}>How is Meralco Electricity Computed?</h2>
        <p style={{ marginBottom: "16px" }}>
          In the Philippines, electricity is billed based on <strong>Kilowatt-Hours (kWh)</strong>. The basic formula is:
        </p>
        <div style={{ padding: "16px", backgroundColor: "var(--surface-color)", borderRadius: "var(--border-radius-md)", border: "1px solid var(--border-color)", marginBottom: "16px", fontFamily: "monospace", textAlign: "center", fontSize: "16px" }}>
          (Appliance Wattage ÷ 1000) × Hours Used × Days Used × Cost per kWh
        </div>
        <h3 style={{ fontSize: "18px", marginTop: "24px", marginBottom: "12px" }}>Why does my Meralco bill fluctuate?</h3>
        <ul style={{ paddingLeft: "24px", marginBottom: "16px", lineHeight: "1.6" }}>
          <li><strong>Generation Charge:</strong> The cost of power purchased from suppliers changes monthly based on global fuel prices.</li>
          <li><strong>System Loss Charge:</strong> Consumers pay for the power lost during transmission over the grid.</li>
          <li><strong>Taxes and Subsidies:</strong> VAT, local franchise taxes, and lifeline subsidies are baked into the final per-kWh rate.</li>
        </ul>
      </div>
    </div>
  );
}
