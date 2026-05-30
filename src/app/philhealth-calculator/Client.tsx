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

      <div style={{ marginTop: "48px", paddingTop: "32px", borderTop: "1px solid var(--border-color)", color: "var(--text-primary)" }}>
        <h2 style={{ fontSize: "24px", marginBottom: "16px" }}>PhilHealth 2026 Contribution Table</h2>
        <p style={{ marginBottom: "16px" }}>
          Under the Universal Health Care (UHC) Law (Republic Act No. 11223), the premium rate for direct contributors increases gradually until it caps at 5.0%.
        </p>
        <ul style={{ paddingLeft: "24px", marginBottom: "16px", lineHeight: "1.6" }}>
          <li><strong>Premium Rate:</strong> 5.0% of your basic monthly salary.</li>
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
