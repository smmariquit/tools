"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import AdBanner from "../components/AdBanner";

export default function SalaryCalculator() {
  const [salaryStr, setSalaryStr] = useState("30000");
  const [shareText, setShareText] = useState("Share Computation");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

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

  const handleShare = async () => {
    const shareData = {
      title: 'My Philippine Salary Computation',
      text: `My gross salary is ₱${salary.toLocaleString()}, and my net take-home pay is ₱${netPay.toLocaleString()} after taxes and deductions! Calculate yours here:`,
      url: window.location.href,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (error) {
        console.log('Error sharing', error);
      }
    } else {
      // Fallback for PC/Desktop: Copy to clipboard
      try {
        await navigator.clipboard.writeText(`${shareData.text} ${shareData.url}`);
        setShareText("Copied to Clipboard!");
        setTimeout(() => setShareText("Share Computation"), 2500);
      } catch (err) {
        console.error('Failed to copy text: ', err);
      }
    }
  };

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
              step="any"
            />
            <span className="form-hint">Your basic salary before any deductions.</span>
          </div>
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
          
          <button 
            onClick={handleShare}
            className="btn-secondary" 
            style={{ width: "100%", marginTop: "16px", display: "flex", justifyContent: "center", alignItems: "center", gap: "8px" }}
          >
            {shareText === "Copied to Clipboard!" ? (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
            ) : (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="18" cy="5" r="3"></circle>
                <circle cx="6" cy="12" r="3"></circle>
                <circle cx="18" cy="19" r="3"></circle>
                <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line>
                <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line>
              </svg>
            )}
            {shareText}
          </button>
          
          <p style={{ textAlign: "center", fontSize: "12px", color: "var(--text-secondary)", marginTop: "16px" }}>
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
