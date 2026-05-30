"use client";

import { useState } from "react";
import Link from "next/link";
import AdBanner from "../components/AdBanner";

export default function PhilHealthClient() {
  const [basicSalaryStr, setBasicSalaryStr] = useState("30000");

  const basicSalary = parseFloat(basicSalaryStr) || 0;

  // PhilHealth 2026 Rates (5% premium rate, 10k floor, 100k ceiling)
  const premiumRate = 0.05;
  const floorSalary = 10000;
  const ceilingSalary = 100000;

  let applicableSalary = basicSalary;
  if (basicSalary < floorSalary) applicableSalary = floorSalary;
  if (basicSalary > ceilingSalary) applicableSalary = ceilingSalary;

  const totalPremium = applicableSalary * premiumRate;
  const employeeShare = totalPremium / 2;
  const employerShare = totalPremium / 2;

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-PH', { style: 'currency', currency: 'PHP' }).format(amount);
  };

  return (
    <div style={{ maxWidth: "800px", margin: "0 auto" }}>
      <div style={{ marginBottom: "24px" }}>
        <Link href="/" style={{ fontSize: "14px", display: "inline-block", marginBottom: "16px" }}>&larr; Back to Tools</Link>
        <h1 className="page-title">PhilHealth Contribution Calculator (2026)</h1>
        <p className="page-subtitle">Calculate your exact monthly PhilHealth premium based on the latest 5% rate scheduled by the Universal Health Care Act.</p>
      </div>

      <AdBanner dataAdSlot="philhealth-top" />

      <div className="tool-grid" style={{ marginTop: "24px" }}>
        {/* Input Card */}
        <div className="card" style={{ alignSelf: "start" }}>
          <h2 style={{ fontSize: "18px", marginBottom: "16px", borderBottom: "1px solid var(--border-color)", paddingBottom: "8px" }}>Monthly Salary</h2>
          
          <div className="form-group">
            <label className="form-label" htmlFor="basicSalary">Basic Monthly Salary (PHP)</label>
            <input 
              type="number" 
              id="basicSalary"
              className="form-control" 
              value={basicSalaryStr}
              onChange={(e) => setBasicSalaryStr(e.target.value)}
              min="0"
            />
            <p className="form-hint" style={{ marginTop: "4px" }}>Input your basic pay excluding allowances and overtime.</p>
            {basicSalary > 0 && basicSalary < floorSalary && (
              <div style={{ marginTop: "8px", padding: "6px 10px", backgroundColor: "#fff3e0", borderRadius: "6px", fontSize: "12px", color: "#e65100", border: "1px solid #ffe0b2", display: "flex", alignItems: "center", gap: "6px" }}>
                <span>⚠️</span> Below ₱10,000 floor — minimum premium of ₱500 applies
              </div>
            )}
            {basicSalary >= ceilingSalary && (
              <div style={{ marginTop: "8px", padding: "6px 10px", backgroundColor: "#e3f2fd", borderRadius: "6px", fontSize: "12px", color: "#0d47a1", border: "1px solid #bbdefb", display: "flex", alignItems: "center", gap: "6px" }}>
                <span>ℹ️</span> Above ₱100,000 ceiling — maximum premium of ₱5,000 applies
              </div>
            )}
          </div>
        </div>

        {/* Results Card */}
        <div className="card" style={{ backgroundColor: "var(--bg-color)" }}>
          <h2 style={{ fontSize: "18px", marginBottom: "16px", borderBottom: "1px solid var(--border-color)", paddingBottom: "8px", color: "var(--primary)" }}>Monthly Contribution Breakdown</h2>
          
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px", fontSize: "14px" }}>
            <span>Total Premium (5%)</span>
            <span>{formatCurrency(totalPremium)}</span>
          </div>

          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "16px", fontSize: "14px" }}>
            <span>Employer Share (50%)</span>
            <span style={{ color: "var(--text-secondary)" }}>{formatCurrency(employerShare)}</span>
          </div>

          <div style={{ display: "flex", justifyContent: "space-between", marginTop: "16px", paddingTop: "16px", borderTop: "2px solid var(--border-color)", fontSize: "20px", fontWeight: 700, color: "var(--text-primary)" }}>
            <span>Your Share (Deducted)</span>
            <span style={{ color: "#b71c1c" }}>- {formatCurrency(employeeShare)}</span>
          </div>
        </div>
      </div>

      {/* Interactive Contribution Table */}
      <div style={{ marginTop: "48px", paddingTop: "32px", borderTop: "1px solid var(--border-color)", color: "var(--text-primary)" }}>
        <h2 style={{ fontSize: "24px", marginBottom: "16px" }}>PhilHealth 2026 Contribution Table</h2>
        <p style={{ marginBottom: "16px" }}>
          Under the Universal Health Care (UHC) Law (Republic Act No. 11223), the premium rate for direct contributors is 5.0%. Your bracket is <strong>highlighted</strong> below.
        </p>

        <div style={{ overflowX: "auto", marginBottom: "24px" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "13px" }}>
            <thead>
              <tr style={{ borderBottom: "2px solid var(--border-color)", textAlign: "right" }}>
                <th style={{ padding: "10px 8px", textAlign: "left" }}>Monthly Salary Range</th>
                <th style={{ padding: "10px 8px" }}>Total Premium</th>
                <th style={{ padding: "10px 8px" }}>Employee Share</th>
                <th style={{ padding: "10px 8px" }}>Employer Share</th>
              </tr>
            </thead>
            <tbody>
              {[
                { min: 0, max: 10000, label: "₱10,000 and below" },
                { min: 10001, max: 20000, label: "₱10,001 – ₱20,000" },
                { min: 20001, max: 30000, label: "₱20,001 – ₱30,000" },
                { min: 30001, max: 40000, label: "₱30,001 – ₱40,000" },
                { min: 40001, max: 50000, label: "₱40,001 – ₱50,000" },
                { min: 50001, max: 60000, label: "₱50,001 – ₱60,000" },
                { min: 60001, max: 70000, label: "₱60,001 – ₱70,000" },
                { min: 70001, max: 80000, label: "₱70,001 – ₱80,000" },
                { min: 80001, max: 90000, label: "₱80,001 – ₱90,000" },
                { min: 90001, max: 100000, label: "₱90,001 – ₱100,000" },
                { min: 100001, max: Infinity, label: "₱100,001 and above" },
              ].map((bracket) => {
                const isActive = basicSalary >= bracket.min && basicSalary <= bracket.max;
                const salForCalc = bracket.max === Infinity ? 100000 : (bracket.min <= 10000 ? 10000 : bracket.max);
                const premium = salForCalc * 0.05;
                return (
                  <tr
                    key={bracket.label}
                    style={{
                      borderBottom: "1px solid var(--border-color)",
                      textAlign: "right",
                      backgroundColor: isActive ? "rgba(13, 71, 161, 0.08)" : "transparent",
                      fontWeight: isActive ? 600 : 400,
                      transition: "background-color 0.2s ease",
                    }}
                  >
                    <td style={{ padding: "10px 8px", textAlign: "left" }}>
                      {isActive && <span style={{ color: "var(--primary)", marginRight: "4px" }}>▸</span>}
                      {bracket.label}
                    </td>
                    <td style={{ padding: "10px 8px" }}>{formatCurrency(premium)}</td>
                    <td style={{ padding: "10px 8px", color: isActive ? "#b71c1c" : "inherit" }}>{formatCurrency(premium / 2)}</td>
                    <td style={{ padding: "10px 8px", color: "var(--text-secondary)" }}>{formatCurrency(premium / 2)}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <ul style={{ paddingLeft: "24px", marginBottom: "16px", lineHeight: "1.6", fontSize: "14px" }}>
          <li><strong>Salary Floor:</strong> ₱10,000 (Minimum contribution is ₱500/month).</li>
          <li><strong>Salary Ceiling:</strong> ₱100,000 (Maximum contribution is ₱5,000/month).</li>
          <li><strong>Sharing:</strong> The total premium is split evenly (50/50) between the employee and the employer.</li>
        </ul>
        <p style={{ fontSize: "12px", color: "var(--text-secondary)" }}>
          Note: Voluntary members, freelancers, and OFWs are required to pay the full 100% of the premium rate out-of-pocket.
        </p>
      </div>
    </div>
  );
}
