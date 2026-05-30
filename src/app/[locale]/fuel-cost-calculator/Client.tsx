"use client";

import { useState } from "react";
import Link from "next/link";
import AdBanner from "../components/AdBanner";

export default function FuelCostClient() {
  const [distanceStr, setDistanceStr] = useState("250");
  const [efficiencyStr, setEfficiencyStr] = useState("12");
  const [fuelPriceStr, setFuelPriceStr] = useState("65");
  const [passengersStr, setPassengersStr] = useState("4");

  const distance = parseFloat(distanceStr) || 0;
  const efficiency = parseFloat(efficiencyStr) || 0;
  const fuelPrice = parseFloat(fuelPriceStr) || 0;
  const passengers = parseInt(passengersStr) || 1;

  // Math
  const litersNeeded = efficiency > 0 ? distance / efficiency : 0;
  const totalFuelCost = litersNeeded * fuelPrice;
  const costPerPerson = passengers > 0 ? totalFuelCost / passengers : totalFuelCost;

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-PH', { style: 'currency', currency: 'PHP' }).format(amount);
  };

  return (
    <div style={{ maxWidth: "800px", margin: "0 auto" }}>
      <div style={{ marginBottom: "24px" }}>
        <Link href="/" style={{ fontSize: "14px", display: "inline-block", marginBottom: "16px" }}>&larr; Back to Tools</Link>
        <h1 className="page-title">Fuel Cost & Trip Calculator</h1>
        <p className="page-subtitle">Estimate your gas expenses for road trips in the Philippines. Perfect for dividing costs among friends (ambagan).</p>
      </div>

      <AdBanner dataAdSlot="fuel-top" />

      <div className="tool-grid" style={{ marginTop: "24px" }}>
        {/* Input Card */}
        <div className="card" style={{ alignSelf: "start" }}>
          <h2 style={{ fontSize: "18px", marginBottom: "16px", borderBottom: "1px solid var(--border-color)", paddingBottom: "8px" }}>Trip Details</h2>
          
          <div className="form-group">
            <label className="form-label" htmlFor="distance">Total Distance (Kilometers)</label>
            <input 
              type="number" 
              id="distance"
              className="form-control" 
              value={distanceStr}
              onChange={(e) => setDistanceStr(e.target.value)}
              min="0"
            />
            <p className="form-hint" style={{ marginTop: "4px" }}>E.g., Manila to Baguio is approx 250 km.</p>
          </div>

          <div className="form-group" style={{ marginTop: "16px" }}>
            <label className="form-label" htmlFor="efficiency">Vehicle Fuel Efficiency (km/L)</label>
            <input 
              type="number" 
              id="efficiency"
              className="form-control" 
              value={efficiencyStr}
              onChange={(e) => setEfficiencyStr(e.target.value)}
              min="0"
            />
            <p className="form-hint" style={{ marginTop: "4px" }}>Average sedan gets 10-14 km/L. SUVs get 7-10 km/L.</p>
          </div>

          <div className="form-group" style={{ marginTop: "16px" }}>
            <label className="form-label" htmlFor="fuelPrice">Fuel Price (₱ per Liter)</label>
            <input 
              type="number" 
              id="fuelPrice"
              className="form-control" 
              value={fuelPriceStr}
              onChange={(e) => setFuelPriceStr(e.target.value)}
              min="0"
              step="0.01"
            />
          </div>

          <div className="form-group" style={{ marginTop: "16px" }}>
            <label className="form-label" htmlFor="passengers">Number of Passengers (for Ambagan)</label>
            <input 
              type="number" 
              id="passengers"
              className="form-control" 
              value={passengersStr}
              onChange={(e) => setPassengersStr(e.target.value)}
              min="1"
            />
          </div>
        </div>

        {/* Results Card */}
        <div className="card" style={{ backgroundColor: "var(--bg-color)" }}>
          <h2 style={{ fontSize: "18px", marginBottom: "16px", borderBottom: "1px solid var(--border-color)", paddingBottom: "8px", color: "var(--primary)" }}>Estimated Expenses</h2>
          
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px", fontSize: "14px" }}>
            <span>Fuel Required</span>
            <span style={{ fontWeight: 600 }}>{litersNeeded.toFixed(2)} Liters</span>
          </div>

          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "16px", padding: "16px", backgroundColor: "#e8f5e9", borderRadius: "var(--border-radius-md)", border: "1px solid #c8e6c9" }}>
            <div style={{ width: "100%", textAlign: "center" }}>
              <span style={{ display: "block", fontSize: "12px", color: "#2e7d32", textTransform: "uppercase", fontWeight: 600, marginBottom: "8px" }}>Total Gas Cost</span>
              <strong style={{ fontSize: "42px", color: "#1b5e20", lineHeight: 1 }}>{formatCurrency(totalFuelCost)}</strong>
            </div>
          </div>

          {passengers > 1 && (
             <div style={{ display: "flex", justifyContent: "space-between", marginTop: "16px", paddingTop: "16px", borderTop: "2px dashed var(--border-color)", fontSize: "16px", fontWeight: 600, color: "var(--text-primary)" }}>
               <span>Cost per Person (Ambagan)</span>
               <span style={{ color: "var(--text-secondary)" }}>{formatCurrency(costPerPerson)}</span>
             </div>
          )}
        </div>
      </div>

      <div style={{ marginTop: "48px", paddingTop: "32px", borderTop: "1px solid var(--border-color)", color: "var(--text-primary)" }}>
        <h2 style={{ fontSize: "24px", marginBottom: "16px" }}>How to compute Fuel Consumption</h2>
        <p style={{ marginBottom: "16px" }}>
          The math behind fuel expenses is straightforward. Just divide the total distance by your car&apos;s efficiency, then multiply by the price of gas.
        </p>
        <div style={{ padding: "16px", backgroundColor: "var(--surface-color)", borderRadius: "var(--border-radius-md)", border: "1px solid var(--border-color)", marginBottom: "16px", fontFamily: "monospace", textAlign: "center", fontSize: "16px" }}>
          (Distance in km ÷ Efficiency in km/L) × Price per Liter
        </div>
        <p style={{ fontSize: "12px", color: "var(--text-secondary)" }}>
          Note: Traffic congestion in Metro Manila can heavily reduce your km/L efficiency. If driving in heavy traffic, adjust your efficiency number downwards (e.g., from 12 km/L to 7 km/L) for a more accurate cost estimate.
        </p>
      </div>
    </div>
  );
}
