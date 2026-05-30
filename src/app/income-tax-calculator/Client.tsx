"use client";

import { useState } from "react";
import Link from "next/link";
import AdBanner from "../components/AdBanner";

export default function IncomeTaxCalculator() {
  const [incomeStr, setIncomeStr] = useState("400000");
  const [period, setPeriod] = useState<"annual" | "monthly">("annual");
  const [taxType, setTaxType] = useState<"graduated" | "flat8">("graduated");

  const inputIncome = parseFloat(incomeStr) || 0;
  
  // Convert to annual for calculation
  const annualIncome = period === "monthly" ? inputIncome * 12 : inputIncome;

  let annualTax = 0;
  let taxBracket = "";

  if (taxType === "flat8") {
    // 8% flat rate for self-employed/professionals (on excess of 250k)
    annualTax = Math.max(0, (annualIncome - 250000) * 0.08);
    taxBracket = "8% on excess of ₱250,000";
  } else {
    // Graduated TRAIN Law Table (Effective Jan 2023 - 2026)
    if (annualIncome > 8000000) {
      annualTax = 2202500 + (annualIncome - 8000000) * 0.35;
      taxBracket = "₱2,202,500 + 35% over ₱8M";
    } else if (annualIncome > 2000000) {
      annualTax = 402500 + (annualIncome - 2000000) * 0.30;
      taxBracket = "₱402,500 + 30% over ₱2M";
    } else if (annualIncome > 800000) {
      annualTax = 102500 + (annualIncome - 800000) * 0.25;
      taxBracket = "₱102,500 + 25% over ₱800k";
    } else if (annualIncome > 400000) {
      annualTax = 22500 + (annualIncome - 400000) * 0.20;
      taxBracket = "₱22,500 + 20% over ₱400k";
    } else if (annualIncome > 250000) {
      annualTax = (annualIncome - 250000) * 0.15;
      taxBracket = "15% over ₱250k";
    } else {
      annualTax = 0;
      taxBracket = "Exempt (0%)";
    }
  }

  const monthlyTax = annualTax / 12;
  const netAnnual = annualIncome - annualTax;
  const netMonthly = netAnnual / 12;

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-PH', { style: 'currency', currency: 'PHP' }).format(amount);
  };

  return (
    <div style={{ maxWidth: "800px", margin: "0 auto", paddingBottom: "40px" }}>
      <div style={{ marginBottom: "24px" }}>
        <Link href="/" style={{ fontSize: "14px", display: "inline-block", marginBottom: "16px" }}>&larr; Back to All Tools</Link>
        <h1 className="page-title">Philippine Income Tax Calculator (BIR)</h1>
        <p className="page-subtitle">Calculate your withholding and annual income tax based on the updated 2026 TRAIN Law brackets.</p>
      </div>

      <AdBanner dataAdSlot="6666666666" />

      <div className="tool-grid" style={{ marginTop: "24px" }}>
        {/* Input Card */}
        <div className="card">
          <h2 style={{ fontSize: "18px", marginBottom: "16px", borderBottom: "1px solid var(--border-color)", paddingBottom: "8px" }}>Income Details</h2>
          
          <div className="form-group">
            <label className="form-label">Tax Type</label>
            <div style={{ display: "flex", gap: "12px" }}>
              <label style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "14px", color: "var(--text-primary)" }}>
                <input 
                  type="radio" 
                  name="taxType" 
                  checked={taxType === "graduated"} 
                  onChange={() => setTaxType("graduated")} 
                />
                Graduated (Employees)
              </label>
            </div>
            <div style={{ display: "flex", gap: "12px", marginTop: "8px" }}>
              <label style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "14px", color: "var(--text-primary)" }}>
                <input 
                  type="radio" 
                  name="taxType" 
                  checked={taxType === "flat8"} 
                  onChange={() => setTaxType("flat8")} 
                />
                8% Flat Rate (Freelance/Self-Employed)
              </label>
            </div>
          </div>

          <div className="form-group" style={{ marginTop: "24px" }}>
            <label className="form-label" htmlFor="period">Input Period</label>
            <select 
              id="period"
              className="form-control"
              value={period}
              onChange={(e) => setPeriod(e.target.value as "annual" | "monthly")}
              style={{ backgroundColor: "var(--surface-color)", cursor: "pointer" }}
            >
              <option value="annual">Annual Income</option>
              <option value="monthly">Monthly Income</option>
            </select>
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="income">Taxable Income (PHP)</label>
            <input 
              type="number" 
              id="income"
              className="form-control" 
              value={incomeStr}
              onChange={(e) => setIncomeStr(e.target.value)}
              min="0"
              step="1000"
            />
            <span className="form-hint">Income after deducting mandatory contributions (SSS, PhilHealth, Pag-IBIG).</span>
          </div>
        </div>

        {/* Results Card */}
        <div className="card" style={{ backgroundColor: "var(--bg-color)" }}>
          <h2 style={{ fontSize: "18px", marginBottom: "16px", borderBottom: "1px solid var(--border-color)", paddingBottom: "8px", color: "var(--primary)" }}>Tax Breakdown</h2>
          
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "12px", fontSize: "14px" }}>
            <span>Annual Taxable Income</span>
            <span style={{ fontWeight: 600 }}>{formatCurrency(annualIncome)}</span>
          </div>

          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "16px", paddingBottom: "16px", borderBottom: "1px dashed var(--border-color)", fontSize: "14px" }}>
            <span>Applicable Tax Bracket</span>
            <span style={{ color: "var(--primary)" }}>{taxBracket}</span>
          </div>
          
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px", fontSize: "14px" }}>
            <span>Monthly Income Tax</span>
            <span style={{ color: "#b71c1c" }}>{formatCurrency(monthlyTax)}</span>
          </div>

          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "16px", paddingBottom: "16px", borderBottom: "1px solid var(--border-color)", fontSize: "16px", fontWeight: 600 }}>
            <span>Total Annual Tax Payable</span>
            <span style={{ color: "#b71c1c" }}>{formatCurrency(annualTax)}</span>
          </div>

          <h3 style={{ fontSize: "14px", color: "var(--text-secondary)", marginBottom: "12px", textTransform: "uppercase", marginTop: "24px" }}>Net Income After Tax</h3>

          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px", fontSize: "14px" }}>
            <span>Monthly Net Income</span>
            <span>{formatCurrency(netMonthly)}</span>
          </div>

          <div style={{ display: "flex", justifyContent: "space-between", marginTop: "8px", paddingTop: "12px", borderTop: "2px solid var(--border-color)", fontSize: "20px", fontWeight: 700, color: "var(--text-primary)" }}>
            <span>Annual Net Income</span>
            <span style={{ color: "#1b5e20" }}>{formatCurrency(netAnnual)}</span>
          </div>
        </div>
      </div>

      {/* SEO Content */}
      <div style={{ marginTop: "48px", paddingTop: "32px", borderTop: "1px solid var(--border-color)", color: "var(--text-primary)" }}>
        <h2 style={{ fontSize: "24px", marginBottom: "16px" }}>How Philippine Income Tax is Calculated (2026)</h2>
        <p style={{ marginBottom: "16px" }}>
          In the Philippines, income tax for regular employees is governed by the TRAIN Law (Republic Act No. 10963). The most recent tax brackets went into effect in January 2023 and continue to apply through 2026. 
        </p>
        
        <h3 style={{ fontSize: "18px", marginTop: "24px", marginBottom: "12px" }}>The ₱250,000 Tax Exemption</h3>
        <p style={{ marginBottom: "16px" }}>
          Every Filipino is entitled to an annual tax exemption of ₱250,000. If your taxable income (gross income minus mandatory deductions like SSS, PhilHealth, and Pag-IBIG) is ₱20,833 per month or less, you do not have to pay any income tax.
        </p>

        <h3 style={{ fontSize: "18px", marginTop: "24px", marginBottom: "12px" }}>8% Flat Rate for Freelancers and Self-Employed</h3>
        <p style={{ marginBottom: "16px" }}>
          If you are a freelancer, professional, or self-employed individual whose gross annual sales do not exceed the VAT threshold of ₱3,000,000, you have the option to avail of the 8% flat income tax rate. This 8% is applied to your gross receipts in excess of the ₱250,000 exemption, in lieu of the graduated tax rates and percentage tax.
        </p>
      </div>
    </div>
  );
}
