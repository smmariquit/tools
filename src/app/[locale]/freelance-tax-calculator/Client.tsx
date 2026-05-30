"use client";

import { useState } from "react";
import Link from "next/link";
import AdBanner from "../components/AdBanner";

export default function FreelanceTaxClient() {
  const [currencyMode, setCurrencyMode] = useState<"php" | "usd">("usd");
  const [usdIncomeStr, setUsdIncomeStr] = useState("2000");
  const [forexRateStr, setForexRateStr] = useState("57.50");
  const [grossIncomeStr, setGrossIncomeStr] = useState("100000");
  const [includeUpwork, setIncludeUpwork] = useState(true);

  const usdIncome = parseFloat(usdIncomeStr) || 0;
  const forexRate = parseFloat(forexRateStr) || 0;
  const phpGrossIncome = parseFloat(grossIncomeStr) || 0;

  // Upwork charges a flat 10% fee on all contracts
  const platformFeeRate = 0.10;
  const platformFeeUsd = includeUpwork ? (usdIncome * platformFeeRate) : 0;
  const netUsd = usdIncome - platformFeeUsd;
  
  // Calculate total PHP equivalent before tax
  const totalPhp = currencyMode === "usd" ? (netUsd * forexRate) : phpGrossIncome;

  // 8% Flat Rate Logic (BIR for freelancers/self-employed)
  // Note: the 250k exemption is annual. For a monthly calculator, we assume they prorate it or we just show the raw monthly deduction.
  // We'll calculate it as a simple 8% of the gross receipt since most freelancers just set aside 8% of every payout.
  const eightPercentTax = totalPhp * 0.08;
  const netIncome8Percent = totalPhp - eightPercentTax;

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-PH', { style: 'currency', currency: 'PHP' }).format(amount);
  };

  return (
    <div style={{ maxWidth: "800px", margin: "0 auto" }}>
      <div style={{ marginBottom: "24px" }}>
        <Link href="/" style={{ fontSize: "14px", display: "inline-block", marginBottom: "16px" }}>&larr; Back to Tools</Link>
        <h1 className="page-title">Upwork & Freelance Tax Calculator</h1>
        <p className="page-subtitle">Calculate your net PHP after Upwork fees, forex spread, and the BIR 8% flat income tax rate.</p>
      </div>

      <AdBanner dataAdSlot="freelance-tax-top" />

      <div className="tool-grid" style={{ marginTop: "24px" }}>
        {/* Input Card */}
        <div className="card" style={{ alignSelf: "start" }}>
          <h2 style={{ fontSize: "18px", marginBottom: "16px", borderBottom: "1px solid var(--border-color)", paddingBottom: "8px" }}>Income Details (Monthly)</h2>
          
          <div className="form-group" style={{ marginBottom: "16px" }}>
            <label className="form-label">Currency</label>
            <div style={{ display: "flex", gap: "12px" }}>
              <button 
                className={`btn-secondary ${currencyMode === "usd" ? "active" : ""}`}
                style={{ flex: 1, backgroundColor: currencyMode === "usd" ? "#14a800" : "", color: currencyMode === "usd" ? "white" : "" }}
                onClick={() => setCurrencyMode("usd")}
              >USD (Upwork/Direct)</button>
              <button 
                className={`btn-secondary ${currencyMode === "php" ? "active" : ""}`}
                style={{ flex: 1, backgroundColor: currencyMode === "php" ? "#0f136d" : "", color: currencyMode === "php" ? "white" : "" }}
                onClick={() => setCurrencyMode("php")}
              >PHP (Local)</button>
            </div>
          </div>

          {currencyMode === "usd" ? (
            <>
              <div className="form-group">
                <label className="form-label" htmlFor="usdIncome">Total Gross Monthly Income (USD)</label>
                <input 
                  type="number" 
                  id="usdIncome"
                  className="form-control" 
                  value={usdIncomeStr}
                  onChange={(e) => setUsdIncomeStr(e.target.value)}
                  min="0"
                />
              </div>
              <div className="form-group" style={{ marginTop: "16px" }}>
                <label className="form-label" htmlFor="forexRate">Expected Forex Rate (PHP per USD)</label>
                <input 
                  type="number" 
                  id="forexRate"
                  className="form-control" 
                  value={forexRateStr}
                  onChange={(e) => setForexRateStr(e.target.value)}
                  min="0"
                  step="0.01"
                />
                <p className="form-hint" style={{ marginTop: "4px" }}>Banks typically take a ₱0.50 to ₱1.00 spread below the Google rate.</p>
              </div>
              <div style={{ marginTop: "16px", paddingTop: "16px", borderTop: "1px solid var(--border-color)" }}>
                <label style={{ display: "flex", alignItems: "center", gap: "8px", cursor: "pointer", fontSize: "14px" }}>
                  <input 
                    type="checkbox" 
                    checked={includeUpwork} 
                    onChange={(e) => setIncludeUpwork(e.target.checked)} 
                    style={{ width: "16px", height: "16px" }}
                  />
                  Deduct Upwork 10% Freelancer Service Fee
                </label>
              </div>
            </>
          ) : (
            <div className="form-group">
              <label className="form-label" htmlFor="grossIncome">Total Gross Monthly Income (PHP)</label>
              <input 
                type="number" 
                id="grossIncome"
                className="form-control" 
                value={grossIncomeStr}
                onChange={(e) => setGrossIncomeStr(e.target.value)}
                min="0"
                step="1000"
              />
            </div>
          )}
        </div>

        {/* Results Card */}
        <div className="card" style={{ backgroundColor: "var(--bg-color)" }}>
          <h2 style={{ fontSize: "18px", marginBottom: "16px", borderBottom: "1px solid var(--border-color)", paddingBottom: "8px", color: "var(--primary)" }}>Monthly Net Breakdown</h2>
          
          {currencyMode === "usd" && (
            <>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px", fontSize: "14px" }}>
                <span>Gross USD</span>
                <span>${usdIncome.toFixed(2)}</span>
              </div>
              {includeUpwork && (
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px", fontSize: "14px" }}>
                  <span>Upwork Fee (10%)</span>
                  <span style={{ color: "#d32f2f" }}>- ${platformFeeUsd.toFixed(2)}</span>
                </div>
              )}
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "16px", paddingBottom: "16px", borderBottom: "1px dashed var(--border-color)", fontSize: "14px" }}>
                <span>Net USD for Withdrawal</span>
                <span style={{ fontWeight: 600 }}>${netUsd.toFixed(2)}</span>
              </div>
            </>
          )}

          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px", fontSize: "14px" }}>
            <span>Gross PHP Receipts</span>
            <span style={{ fontWeight: 600 }}>{formatCurrency(totalPhp)}</span>
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
        <h2 style={{ fontSize: "24px", marginBottom: "16px" }}>Freelancing Taxes & Fees</h2>
        <p style={{ marginBottom: "16px" }}>
          Earning in USD looks great until the platform fees, conversion spreads, and BIR taxes eat into your take-home pay. Here is what you need to know:
        </p>
        <ul style={{ paddingLeft: "24px", marginBottom: "16px", lineHeight: "1.6" }}>
          <li><strong>Upwork Fees:</strong> As of 2023, Upwork charges a flat 10% fee on all contracts, regardless of lifetime billings.</li>
          <li><strong>Forex Spread:</strong> Direct-to-Local-Bank transfers usually have a spread of ₱0.50 to ₱1.00 lower than the real-time Google rate. Using Wise or Payoneer can sometimes yield better rates.</li>
          <li><strong>BIR 8% Tax:</strong> If you registered with the BIR as a professional under the 8% gross receipt tax rate, you don&apos;t deduct expenses. You simply pay 8% of your gross PHP income (Note: the first ₱250,000 of your annual income is exempt, but this calculator shows the flat 8% monthly set-aside for conservative budgeting).</li>
        </ul>
      </div>
    </div>
  );
}
