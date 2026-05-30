"use client";

import { useState } from "react";
import Link from "next/link";
import AdBanner from "../components/AdBanner";

export default function FreelanceTaxClient() {
  const [grossIncomeStr, setGrossIncomeStr] = useState("500000");

  const grossIncome = parseFloat(grossIncomeStr) || 0;

  // 8% Flat Rate Logic (BIR for freelancers/self-employed)
  // 250k is exempt
  const eightPercentTax = Math.max(0, (grossIncome - 250000) * 0.08);
  const netIncome8Percent = grossIncome - eightPercentTax;

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-PH', { style: 'currency', currency: 'PHP' }).format(amount);
  };

  return (
    <div style={{ maxWidth: "800px", margin: "0 auto" }}>
      <div style={{ marginBottom: "24px" }}>
        <Link href="/" style={{ fontSize: "14px", display: "inline-block", marginBottom: "16px" }}>&larr; Back to Tools</Link>
        <h1 className="page-title">Freelance 8% Tax Calculator</h1>
        <p className="page-subtitle">Calculate your net income as a freelancer or self-employed professional under the BIR 8% flat income tax rate.</p>
      </div>

      <AdBanner dataAdSlot="freelance-tax-top" />

      <div className="tool-grid" style={{ marginTop: "24px" }}>
        {/* Input Card */}
        <div className="card" style={{ alignSelf: "start" }}>
          <h2 style={{ fontSize: "18px", marginBottom: "16px", borderBottom: "1px solid var(--border-color)", paddingBottom: "8px" }}>Annual Income</h2>
          
          <div className="form-group">
            <label className="form-label" htmlFor="grossIncome">Total Gross Annual Income (PHP)</label>
            <input 
              type="number" 
              id="grossIncome"
              className="form-control" 
              value={grossIncomeStr}
              onChange={(e) => setGrossIncomeStr(e.target.value)}
              min="0"
              step="10000"
            />
            <p className="form-hint" style={{ marginTop: "4px" }}>Total earnings for the entire calendar year.</p>
          </div>
        </div>

        {/* Results Card */}
        <div className="card" style={{ backgroundColor: "var(--bg-color)" }}>
          <h2 style={{ fontSize: "18px", marginBottom: "16px", borderBottom: "1px solid var(--border-color)", paddingBottom: "8px", color: "var(--primary)" }}>Tax Breakdown (8% Option)</h2>
          
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px", fontSize: "14px" }}>
            <span>Gross Income</span>
            <span>{formatCurrency(grossIncome)}</span>
          </div>
          
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px", fontSize: "14px" }}>
            <span>BIR Exemption Limit</span>
            <span style={{ color: "#2e7d32" }}>- ₱250,000.00</span>
          </div>

          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "16px", fontSize: "14px" }}>
            <span>Taxable Amount</span>
            <span>{formatCurrency(Math.max(0, grossIncome - 250000))}</span>
          </div>

          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "16px", padding: "12px", backgroundColor: "#ffebee", borderRadius: "var(--border-radius-sm)", border: "1px solid #ffcdd2" }}>
            <span style={{ fontWeight: 500, color: "#b71c1c" }}>Total Tax Due (8%)</span>
            <strong style={{ color: "#b71c1c" }}>{formatCurrency(eightPercentTax)}</strong>
          </div>

          <div style={{ display: "flex", justifyContent: "space-between", marginTop: "16px", paddingTop: "16px", borderTop: "2px solid var(--border-color)", fontSize: "20px", fontWeight: 700, color: "var(--text-primary)" }}>
            <span>Net Take-Home Pay</span>
            <span style={{ color: "#1b5e20" }}>{formatCurrency(netIncome8Percent)}</span>
          </div>
        </div>
      </div>

      <div style={{ marginTop: "48px", paddingTop: "32px", borderTop: "1px solid var(--border-color)", color: "var(--text-primary)" }}>
        <h2 style={{ fontSize: "24px", marginBottom: "16px" }}>The 8% Flat Tax Rate for Freelancers</h2>
        <p style={{ marginBottom: "16px" }}>
          Under the TRAIN Law, self-employed individuals and freelancers whose gross sales/receipts do not exceed the VAT threshold of ₱3,000,000 have the option to avail of the 8% flat income tax rate instead of the graduated income tax bracket.
        </p>
        <ul style={{ paddingLeft: "24px", marginBottom: "16px", lineHeight: "1.6" }}>
          <li><strong>Simplicity:</strong> You don&apos;t need to list down business expenses. The 8% applies directly to your gross receipts (minus the 250k exemption).</li>
          <li><strong>Exemption:</strong> The first ₱250,000 of your annual income is completely tax-free.</li>
          <li><strong>Opting In:</strong> You must explicitly signify your intention to avail of the 8% rate in your 1st Quarter Income Tax Return (BIR Form 1701Q). If you fail to do so, you will automatically be taxed under the graduated rates.</li>
        </ul>
      </div>
    </div>
  );
}
