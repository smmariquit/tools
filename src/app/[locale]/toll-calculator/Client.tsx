"use client";

import { useState } from "react";
import Link from "next/link";
import AdBanner from "../components/AdBanner";
import { expressways, getTollFee } from "./tollData";

export default function TollCalculatorClient() {
  const [selectedExpressway, setSelectedExpressway] = useState(expressways[0].name);
  const [origin, setOrigin] = useState(expressways[0].exits[0]);
  const [destination, setDestination] = useState(expressways[0].exits[expressways[0].exits.length - 1]);
  const [vehicleClass, setVehicleClass] = useState<"class1" | "class2" | "class3">("class1");

  const currentExpressway = expressways.find((e) => e.name === selectedExpressway) || expressways[0];
  
  // Reset origin/destination when expressway changes
  const handleExpresswayChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const val = e.target.value;
    setSelectedExpressway(val);
    const newExits = expressways.find((exp) => exp.name === val)?.exits || [];
    if (newExits.length > 0) {
      setOrigin(newExits[0]);
      setDestination(newExits[newExits.length - 1]);
    }
  };

  const tollFee = getTollFee(selectedExpressway, origin, destination, vehicleClass);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-PH', { style: 'currency', currency: 'PHP' }).format(amount);
  };

  return (
    <div style={{ maxWidth: "800px", margin: "0 auto" }}>
      <div style={{ marginBottom: "24px" }}>
        <Link href="/" style={{ fontSize: "14px", display: "inline-block", marginBottom: "16px" }}>&larr; Back to Tools</Link>
        <h1 className="page-title">PH Expressway Toll Calculator</h1>
        <p className="page-subtitle">Check TRB-approved toll fees for Skyway, SLEX, and other major Philippine expressways.</p>
      </div>

      <AdBanner dataAdSlot="toll-top" />

      <div className="tool-grid" style={{ marginTop: "24px" }}>
        {/* Input Card */}
        <div className="card" style={{ alignSelf: "start" }}>
          <h2 style={{ fontSize: "18px", marginBottom: "16px", borderBottom: "1px solid var(--border-color)", paddingBottom: "8px" }}>Trip Details</h2>
          
          <div className="form-group">
            <label className="form-label" htmlFor="expressway">Select Expressway</label>
            <select 
              id="expressway"
              className="form-control" 
              value={selectedExpressway}
              onChange={handleExpresswayChange}
            >
              {expressways.map((exp) => (
                <option key={exp.name} value={exp.name}>{exp.name}</option>
              ))}
            </select>
          </div>

          <div className="form-group" style={{ marginTop: "16px" }}>
            <label className="form-label" htmlFor="origin">Entry Point (Origin)</label>
            <select 
              id="origin"
              className="form-control" 
              value={origin}
              onChange={(e) => setOrigin(e.target.value)}
            >
              {currentExpressway.exits.map((exit) => (
                <option key={exit} value={exit}>{exit}</option>
              ))}
            </select>
          </div>

          <div className="form-group" style={{ marginTop: "16px" }}>
            <label className="form-label" htmlFor="destination">Exit Point (Destination)</label>
            <select 
              id="destination"
              className="form-control" 
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
            >
              {currentExpressway.exits.map((exit) => (
                <option key={exit} value={exit}>{exit}</option>
              ))}
            </select>
          </div>

          <div className="form-group" style={{ marginTop: "16px" }}>
            <label className="form-label" htmlFor="vehicleClass">Vehicle Class</label>
            <select 
              id="vehicleClass"
              className="form-control" 
              value={vehicleClass}
              onChange={(e) => setVehicleClass(e.target.value as "class1" | "class2" | "class3")}
            >
              <option value="class1">🚗🚙 Class 1 (Cars, Jeepneys, Vans, Pickups, Motorcycles &gt;400cc)</option>
              <option value="class2">🚌🚐 Class 2 (Buses, Light Trucks)</option>
              <option value="class3">🚛🚜 Class 3 (Heavy Trucks, Trailers)</option>
            </select>
          </div>
        </div>

        {/* Results Card */}
        <div className="card" style={{ backgroundColor: "var(--bg-color)" }}>
          <h2 style={{ fontSize: "18px", marginBottom: "16px", borderBottom: "1px solid var(--border-color)", paddingBottom: "8px", color: "var(--primary)" }}>Estimated Toll Fee</h2>
          
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "16px", padding: "16px", backgroundColor: "#e3f2fd", borderRadius: "var(--border-radius-md)", border: "1px solid #bbdefb" }}>
            <div style={{ width: "100%", textAlign: "center" }}>
              <span style={{ display: "block", fontSize: "12px", color: "#1565c0", textTransform: "uppercase", fontWeight: 600, marginBottom: "8px" }}>Total Amount Due</span>
              {origin === destination ? (
                <strong style={{ fontSize: "18px", color: "var(--text-secondary)" }}>N/A (Same Entry/Exit)</strong>
              ) : tollFee !== null ? (
                <strong style={{ fontSize: "42px", color: "#0d47a1", lineHeight: 1 }}>{formatCurrency(tollFee)}</strong>
              ) : (
                <strong style={{ fontSize: "16px", color: "#c62828" }}>Route Not Found in Matrix</strong>
              )}
            </div>
          </div>
          
          <div style={{ fontSize: "14px", color: "var(--text-secondary)", textAlign: "center" }}>
            <p><strong>Route:</strong> {origin} to {destination}</p>
            <p><strong>Class:</strong> {vehicleClass.toUpperCase()}</p>
          </div>
        </div>
      </div>

      <div style={{ marginTop: "48px", paddingTop: "32px", borderTop: "1px solid var(--border-color)", color: "var(--text-primary)" }}>
        <h2 style={{ fontSize: "24px", marginBottom: "16px" }}>Vehicle Classification Guide</h2>
        <p style={{ marginBottom: "16px" }}>
          Toll fees in the Philippines are regulated by the Toll Regulatory Board (TRB). Prices vary strictly based on your vehicle classification.
        </p>
        <ul style={{ paddingLeft: "24px", marginBottom: "16px", lineHeight: "1.6" }}>
          <li><strong>🚗🚙 Class 1:</strong> 2-axle vehicles up to 7ft high. Includes sedans, hatchbacks, SUVs, vans, pick-up trucks, and expressways-legal motorcycles (400cc and above).</li>
          <li><strong>🚌🚐 Class 2:</strong> 2-axle vehicles over 7ft high, or 3-axle vehicles. Includes buses, tourist vans, and light cargo trucks.</li>
          <li><strong>🚛🚜 Class 3:</strong> Vehicles with 4 or more axles. Includes heavy cargo trucks and multi-axle trailers.</li>
        </ul>
        <p style={{ fontSize: "14px", marginBottom: "8px" }}>
          <strong>Official Source:</strong> <a href="https://trb.gov.ph/index.php/toll-rates" target="_blank" rel="noopener noreferrer" style={{ color: "var(--primary)", textDecoration: "underline" }}>Toll Regulatory Board (TRB) Toll Rates</a>
        </p>
        <p style={{ fontSize: "12px", color: "var(--text-secondary)" }}>Last Updated: May 2026. Note: This calculator uses publicly available data from TRB. Prices are subject to change without prior notice. Some complex segmented routes may not be perfectly represented.</p>
      </div>
    </div>
  );
}
