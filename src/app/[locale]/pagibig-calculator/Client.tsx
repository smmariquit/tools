"use client";

import { useState } from "react";
import Link from "next/link";
import AdBanner from "../components/AdBanner";

export default function PagIbigClient() {
  const [basicSalaryStr, setBasicSalaryStr] = useState("20000");
  const [mp2MonthlyStr, setMp2MonthlyStr] = useState("1000");
  const [dividendRateStr, setDividendRateStr] = useState("7"); // Historical avg is around 6-7%

  const basicSalary = parseFloat(basicSalaryStr) || 0;
  const mp2Monthly = parseFloat(mp2MonthlyStr) || 0;
  const dividendRate = parseFloat(dividendRateStr) || 0;

  // Regular Pag-IBIG Computation (2024/2026 update: 2% up to 10k max MFS = P200)
  const maxFundSalary = 10000;
  const applicableSalary = Math.min(basicSalary, maxFundSalary);
  
  // If salary <= 1500, EE is 1%, ER is 2%. But min wage is way higher, so assume 2% for both.
  const regularEE = basicSalary <= 1500 ? applicableSalary * 0.01 : applicableSalary * 0.02;
  const regularER = applicableSalary * 0.02;

  // MP2 Computation (5 Year Term, compounded annually)
  // Simplified compound interest for monthly deposits:
  // We calculate year by year to show the table.
  let cumulativeSavings = 0;
  let cumulativeDividends = 0;
  const annualDeposit = mp2Monthly * 12;
  const rate = dividendRate / 100;
  
  const mp2Table = [];
  for (let year = 1; year <= 5; year++) {
    cumulativeSavings += annualDeposit;
    // Average balance during the year gets half the interest for that year's deposits, plus full interest on previous balance
    const yearlyDividend = (cumulativeSavings - (annualDeposit / 2)) * rate;
    cumulativeDividends += yearlyDividend;
    cumulativeSavings += yearlyDividend; // Dividends are reinvested
    
    mp2Table.push({
      year,
      totalSaved: mp2Monthly * 12 * year,
      dividendsEarned: cumulativeDividends,
      totalValue: cumulativeSavings
    });
  }

  const finalValue = mp2Table[4]?.totalValue || 0;
  const totalDividends = mp2Table[4]?.dividendsEarned || 0;
  const totalPrincipal = mp2Monthly * 12 * 5;

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-PH', { style: 'currency', currency: 'PHP' }).format(amount);
  };

  return (
    <div style={{ maxWidth: "800px", margin: "0 auto" }}>
      <div style={{ marginBottom: "24px" }}>
        <Link href="/" style={{ fontSize: "14px", display: "inline-block", marginBottom: "16px" }}>&larr; Back to Tools</Link>
        <h1 className="page-title">Pag-IBIG & MP2 Savings Calculator</h1>
        <p className="page-subtitle">Calculate your mandatory Pag-IBIG contributions and estimate your MP2 tax-free dividend returns over 5 years.</p>
      </div>

      <AdBanner dataAdSlot="pagibig-top" />

      <div className="tool-grid" style={{ marginTop: "24px" }}>
        {/* Input Card */}
        <div className="card" style={{ alignSelf: "start" }}>
          <h2 style={{ fontSize: "18px", marginBottom: "16px", borderBottom: "1px solid var(--border-color)", paddingBottom: "8px" }}>Mandatory Pag-IBIG</h2>
          
          <div className="form-group">
            <label className="form-label" htmlFor="basicSalary">Monthly Basic Salary (PHP)</label>
            <input 
              type="number" 
              id="basicSalary"
              className="form-control" 
              value={basicSalaryStr}
              onChange={(e) => setBasicSalaryStr(e.target.value)}
              min="0"
            />
          </div>

          <div style={{ marginTop: "16px", padding: "12px", backgroundColor: "var(--surface-color)", borderRadius: "var(--border-radius-sm)", border: "1px solid var(--border-color)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px", fontSize: "14px" }}>
              <span>Employee Share (You pay)</span>
              <span style={{ color: "#b71c1c", fontWeight: 600 }}>{formatCurrency(regularEE)}</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: "14px" }}>
              <span>Employer Share</span>
              <span style={{ color: "var(--text-secondary)" }}>{formatCurrency(regularER)}</span>
            </div>
          </div>

          <h2 style={{ fontSize: "18px", marginTop: "32px", marginBottom: "16px", borderBottom: "1px solid var(--border-color)", paddingBottom: "8px" }}>MP2 Voluntary Savings</h2>
          
          <div className="form-group">
            <label className="form-label" htmlFor="mp2Monthly">Monthly MP2 Deposit (PHP)</label>
            <input 
              type="number" 
              id="mp2Monthly"
              className="form-control" 
              value={mp2MonthlyStr}
              onChange={(e) => setMp2MonthlyStr(e.target.value)}
              min="500"
              step="500"
            />
            <p className="form-hint" style={{ marginTop: "4px" }}>Minimum of ₱500 per month.</p>
          </div>

          <div className="form-group" style={{ marginTop: "16px" }}>
            <label className="form-label" htmlFor="dividendRate">Estimated Annual Dividend Rate (%)</label>
            <input 
              type="number" 
              id="dividendRate"
              className="form-control" 
              value={dividendRateStr}
              onChange={(e) => setDividendRateStr(e.target.value)}
              min="1"
              max="15"
              step="0.1"
            />
            <p className="form-hint" style={{ marginTop: "4px" }}>Historical average is between 6% and 8%.</p>
          </div>
        </div>

        {/* Results Card */}
        <div className="card" style={{ backgroundColor: "var(--bg-color)" }}>
          <h2 style={{ fontSize: "18px", marginBottom: "16px", borderBottom: "1px solid var(--border-color)", paddingBottom: "8px", color: "var(--primary)" }}>5-Year MP2 Projection</h2>
          
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "16px", padding: "16px", backgroundColor: "#e8f5e9", borderRadius: "var(--border-radius-md)", border: "1px solid #c8e6c9" }}>
            <div>
              <span style={{ display: "block", fontSize: "12px", color: "#2e7d32", textTransform: "uppercase", fontWeight: 600, marginBottom: "4px" }}>Final Value after 5 Years</span>
              <strong style={{ fontSize: "28px", color: "#1b5e20", lineHeight: 1 }}>{formatCurrency(finalValue)}</strong>
            </div>
          </div>

          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px", fontSize: "14px" }}>
            <span>Total Principal Saved</span>
            <span>{formatCurrency(totalPrincipal)}</span>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "24px", fontSize: "14px" }}>
            <span>Total Tax-Free Dividends</span>
            <span style={{ color: "#2e7d32", fontWeight: 600 }}>+ {formatCurrency(totalDividends)}</span>
          </div>

          {/* Table */}
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "13px" }}>
              <thead>
                <tr style={{ borderBottom: "2px solid var(--border-color)", textAlign: "right" }}>
                  <th style={{ padding: "8px 4px", textAlign: "left" }}>Year</th>
                  <th style={{ padding: "8px 4px" }}>Principal</th>
                  <th style={{ padding: "8px 4px" }}>Dividends</th>
                  <th style={{ padding: "8px 4px" }}>Total Value</th>
                </tr>
              </thead>
              <tbody>
                {mp2Table.map((row) => (
                  <tr key={row.year} style={{ borderBottom: "1px solid var(--border-color)", textAlign: "right" }}>
                    <td style={{ padding: "12px 4px", textAlign: "left", fontWeight: 600 }}>{row.year}</td>
                    <td style={{ padding: "12px 4px", color: "var(--text-secondary)" }}>{formatCurrency(row.totalSaved)}</td>
                    <td style={{ padding: "12px 4px", color: "#2e7d32" }}>{formatCurrency(row.dividendsEarned)}</td>
                    <td style={{ padding: "12px 4px", fontWeight: 500 }}>{formatCurrency(row.totalValue)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div style={{ marginTop: "48px", paddingTop: "32px", borderTop: "1px solid var(--border-color)", color: "var(--text-primary)" }}>
        <h2 style={{ fontSize: "24px", marginBottom: "16px" }}>How Does MP2 Work?</h2>
        <p style={{ marginBottom: "16px" }}>
          The Modified Pag-IBIG II (MP2) Savings Program is a voluntary savings facility with a 5-year maturity, designed for active Pag-IBIG Fund members who wish to save more and earn higher tax-free dividends than the regular Pag-IBIG Savings Program.
        </p>
        <ul style={{ paddingLeft: "24px", marginBottom: "16px", lineHeight: "1.6" }}>
          <li><strong>Tax-Free:</strong> All dividends earned are 100% tax-free. You don&apos;t pay the standard 20% withholding tax applied to bank deposits.</li>
          <li><strong>Government Guaranteed:</strong> Your principal is fully guaranteed by the Philippine government.</li>
          <li><strong>Compound Interest:</strong> If you choose to have dividends paid at the end of the 5-year term, your money compounds annually, growing exponentially.</li>
        </ul>
      </div>
    </div>
  );
}
