"use client";

import { useState } from "react";
import Link from "next/link";
import AdBanner from "../components/AdBanner";

export default function SalaryCalculator() {
  const [salaryStr, setSalaryStr] = useState("30000");

  const salary = parseFloat(salaryStr) || 0;

  // Contributions
  const sssMSC = Math.min(Math.max(salary, 5000), 35000);
  const sssDeduction = sssMSC * 0.05;

  const philhealthBase = Math.min(Math.max(salary, 10000), 100000);
  const philhealthDeduction = philhealthBase * 0.025;

  const pagibigDeduction = Math.min(salary * 0.02, 200);

  const totalContributions = sssDeduction + philhealthDeduction + pagibigDeduction;
  const taxableIncome = Math.max(0, salary - totalContributions);

  // Tax computation (Monthly based on Jan 2023 TRAIN Law)
  let tax = 0;
  if (taxableIncome > 666667) {
    tax = 183541.67 + (taxableIncome - 666667) * 0.35;
  } else if (taxableIncome > 166667) {
    tax = 33541.67 + (taxableIncome - 166667) * 0.30;
  } else if (taxableIncome > 66667) {
    tax = 8541.67 + (taxableIncome - 66667) * 0.25;
  } else if (taxableIncome > 33333) {
    tax = 1875 + (taxableIncome - 33333) * 0.20;
  } else if (taxableIncome > 20833) {
    tax = (taxableIncome - 20833) * 0.15;
  }

  const netPay = salary - totalContributions - tax;

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-PH', { style: 'currency', currency: 'PHP' }).format(amount);
  };

  return (
    <div style={{ maxWidth: "800px", margin: "0 auto" }}>
      <div style={{ marginBottom: "24px" }}>
        <Link href="/" style={{ fontSize: "14px", display: "inline-block", marginBottom: "16px" }}>&larr; Back to All Tools</Link>
        <h1 className="page-title">Salary Net Pay Calculator (2026)</h1>
        <p className="page-subtitle">Calculate your take-home pay after SSS, PhilHealth, Pag-IBIG, and Withholding Tax deductions.</p>
      </div>

      <AdBanner dataAdSlot="1234567890" />

      <div className="tool-grid" style={{ marginTop: "24px" }}>
        {/* Input Card */}
        <div className="card">
          <h2 style={{ fontSize: "18px", marginBottom: "16px", borderBottom: "1px solid var(--border-color)", paddingBottom: "8px" }}>Your Details</h2>
          <div className="form-group">
            <label className="form-label" htmlFor="salary">Gross Monthly Salary (PHP)</label>
            <input 
              type="number" 
              id="salary"
              className="form-control" 
              value={salaryStr}
              onChange={(e) => setSalaryStr(e.target.value)}
              min="0"
              step="500"
            />
            <span className="form-hint">Your basic salary before any deductions.</span>
          </div>
          <button className="btn-primary" style={{ width: "100%" }}>Calculate</button>
        </div>

        {/* Results Card */}
        <div className="card" style={{ backgroundColor: "var(--bg-color)" }}>
          <h2 style={{ fontSize: "18px", marginBottom: "16px", borderBottom: "1px solid var(--border-color)", paddingBottom: "8px", color: "var(--primary)" }}>Computation Results</h2>
          
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "12px" }}>
            <span>Gross Salary</span>
            <strong>{formatCurrency(salary)}</strong>
          </div>
          
          <div style={{ margin: "16px 0", padding: "16px 0", borderTop: "1px dashed var(--border-color)", borderBottom: "1px dashed var(--border-color)" }}>
            <h3 style={{ fontSize: "14px", color: "var(--text-secondary)", marginBottom: "12px", textTransform: "uppercase" }}>Mandatory Deductions</h3>
            
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px", fontSize: "14px" }}>
              <span>SSS Contribution (5%)</span>
              <span style={{ color: "#b71c1c" }}>- {formatCurrency(sssDeduction)}</span>
            </div>
            
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px", fontSize: "14px" }}>
              <span>PhilHealth (2.5%)</span>
              <span style={{ color: "#b71c1c" }}>- {formatCurrency(philhealthDeduction)}</span>
            </div>
            
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px", fontSize: "14px" }}>
              <span>Pag-IBIG</span>
              <span style={{ color: "#b71c1c" }}>- {formatCurrency(pagibigDeduction)}</span>
            </div>

            <div style={{ display: "flex", justifyContent: "space-between", marginTop: "12px", paddingTop: "12px", borderTop: "1px solid var(--border-color)", fontSize: "14px", fontWeight: 600 }}>
              <span>Total Contributions</span>
              <span>{formatCurrency(totalContributions)}</span>
            </div>
          </div>

          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "12px", fontSize: "14px" }}>
            <span>Taxable Income</span>
            <span>{formatCurrency(taxableIncome)}</span>
          </div>

          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "16px", fontSize: "14px" }}>
            <span>Withholding Tax (BIR)</span>
            <span style={{ color: "#b71c1c" }}>- {formatCurrency(tax)}</span>
          </div>

          <div style={{ display: "flex", justifyContent: "space-between", marginTop: "16px", paddingTop: "16px", borderTop: "2px solid var(--border-color)", fontSize: "24px", fontWeight: 700, color: "var(--text-primary)" }}>
            <span>Net Take-Home Pay</span>
            <span style={{ color: "#1b5e20" }}>{formatCurrency(netPay)}</span>
          </div>
          
          <p style={{ fontSize: "12px", color: "var(--text-secondary)", marginTop: "16px", textAlign: "center" }}>
            * This is an estimate based on standard 2026 rates.
          </p>
        </div>
      </div>

      {/* SEO Content */}
      <div style={{ marginTop: "48px", paddingTop: "32px", borderTop: "1px solid var(--border-color)", color: "var(--text-primary)" }}>
        <h2 style={{ fontSize: "24px", marginBottom: "16px" }}>How to Compute Your Net Salary in the Philippines</h2>
        <p style={{ marginBottom: "16px" }}>
          Calculating your take-home pay involves deducting your mandatory government contributions (SSS, PhilHealth, Pag-IBIG) and withholding tax from your gross basic salary.
        </p>
        
        <h3 style={{ fontSize: "18px", marginTop: "24px", marginBottom: "12px" }}>1. Government Contributions (2026 Rates)</h3>
        <ul style={{ paddingLeft: "24px", marginBottom: "16px", lineHeight: "1.6" }}>
          <li><strong>SSS:</strong> The employee share is <strong>5%</strong> of the Monthly Salary Credit (MSC). The maximum MSC is ₱35,000, meaning the maximum employee deduction is ₱1,750.</li>
          <li><strong>PhilHealth:</strong> The premium rate is <strong>5%</strong> of your basic salary, split equally between you and your employer (<strong>2.5% each</strong>). The salary floor is ₱10,000 and the ceiling is ₱100,000.</li>
          <li><strong>Pag-IBIG:</strong> The standard employee contribution is <strong>₱200</strong> per month (2% of the ₱10,000 maximum fund salary).</li>
        </ul>

        <h3 style={{ fontSize: "18px", marginTop: "24px", marginBottom: "12px" }}>2. Taxable Income & Withholding Tax</h3>
        <p style={{ marginBottom: "16px" }}>
          To find your taxable income, subtract your total contributions from your gross salary. Then, apply the TRAIN Law tax brackets to compute your withholding tax. If your taxable income is below ₱20,833 per month (₱250,000 annually), you are exempt from income tax.
        </p>
      </div>
    </div>
  );
}
