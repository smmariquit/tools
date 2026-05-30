"use client";

import { useState } from "react";
import Link from "next/link";
import AdBanner from "../components/AdBanner";

export default function SSSCalculator() {
  const [salaryStr, setSalaryStr] = useState("30000");
  const [memberType, setMemberType] = useState("employed"); // 'employed' or 'voluntary'

  const salary = parseFloat(salaryStr) || 0;

  // SSS Calculation Logic (2026 Table)
  // MSC increments by 500 in the official table, but for a calculator, standard capping is accurate enough
  // to get the exact MSC bracket.
  // Official SSS brackets round to the nearest 500.
  const getMSC = (salary: number) => {
    if (salary < 5000) return 5000;
    if (salary >= 34750) return 35000; // Anything above 34,750 falls into the max 35,000 bracket
    // Round to nearest 500
    return Math.round(salary / 500) * 500;
  };

  const msc = getMSC(salary);
  
  // Base MSC capped at 20,000 for regular SSS, anything above goes to MPF (WISP)
  const regularMSC = Math.min(msc, 20000);
  const mpfMSC = Math.max(0, msc - 20000);

  let eeRegular = 0, eeMPF = 0, erRegular = 0, erMPF = 0, ecFee = 0;

  if (memberType === "employed") {
    eeRegular = regularMSC * 0.05;
    eeMPF = mpfMSC * 0.05;
    
    erRegular = regularMSC * 0.10;
    erMPF = mpfMSC * 0.10;
    
    ecFee = msc < 15000 ? 10 : 30;
  } else {
    // Voluntary / Self-Employed pays the full 15%
    eeRegular = regularMSC * 0.15;
    eeMPF = mpfMSC * 0.15;
  }

  const eeTotal = eeRegular + eeMPF;
  const erTotal = erRegular + erMPF + ecFee;
  const grandTotal = eeTotal + erTotal;

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-PH', { style: 'currency', currency: 'PHP' }).format(amount);
  };

  return (
    <div style={{ maxWidth: "800px", margin: "0 auto" }}>
      <div style={{ marginBottom: "24px" }}>
        <Link href="/" style={{ fontSize: "14px", display: "inline-block", marginBottom: "16px" }}>&larr; Back to All Tools</Link>
        <h1 className="page-title">SSS Contribution Calculator (2026)</h1>
        <p className="page-subtitle">Find your exact SSS Monthly Salary Credit (MSC), employer share, and MPF breakdown based on the updated 15% rate schedule.</p>
      </div>

      <AdBanner dataAdSlot="0987654321" />

      <div className="tool-grid" style={{ marginTop: "24px" }}>
        {/* Input Card */}
        <div className="card">
          <h2 style={{ fontSize: "18px", marginBottom: "16px", borderBottom: "1px solid var(--border-color)", paddingBottom: "8px" }}>Your Details</h2>
          
          <div className="form-group">
            <label className="form-label" htmlFor="memberType">Membership Type</label>
            <select 
              id="memberType"
              className="form-control"
              value={memberType}
              onChange={(e) => setMemberType(e.target.value)}
              style={{ backgroundColor: "var(--surface-color)", cursor: "pointer" }}
            >
              <option value="employed">Private Employee</option>
              <option value="voluntary">Voluntary / Self-Employed / OFW</option>
            </select>
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="salary">Actual Monthly Income (PHP)</label>
            <input 
              type="number" 
              id="salary"
              className="form-control" 
              value={salaryStr}
              onChange={(e) => setSalaryStr(e.target.value)}
              min="0"
              step="500"
            />
          </div>
        </div>

        {/* Results Card */}
        <div className="card" style={{ backgroundColor: "var(--bg-color)" }}>
          <h2 style={{ fontSize: "18px", marginBottom: "16px", borderBottom: "1px solid var(--border-color)", paddingBottom: "8px", color: "var(--primary)" }}>Contribution Breakdown</h2>
          
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "16px", padding: "12px", backgroundColor: "var(--surface-color)", borderRadius: "var(--border-radius-sm)", border: "1px solid var(--border-color)" }}>
            <span style={{ fontWeight: 500 }}>Monthly Salary Credit (MSC)</span>
            <strong style={{ color: "var(--primary)" }}>{formatCurrency(msc)}</strong>
          </div>
          
          {/* Employee Share Section */}
          <div style={{ marginBottom: "20px" }}>
            <h3 style={{ fontSize: "14px", color: "var(--text-secondary)", marginBottom: "8px", textTransform: "uppercase" }}>
              {memberType === "employed" ? "Employee Share (Your Deduction)" : "Your Total Contribution"}
            </h3>
            
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "4px", fontSize: "14px" }}>
              <span>Regular SSS ({memberType === "employed" ? "5%" : "15%"})</span>
              <span>{formatCurrency(eeRegular)}</span>
            </div>
            
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px", fontSize: "14px" }}>
              <span>Mandatory Provident Fund (MPF)</span>
              <span>{formatCurrency(eeMPF)}</span>
            </div>

            <div style={{ display: "flex", justifyContent: "space-between", paddingTop: "8px", borderTop: "1px dashed var(--border-color)", fontSize: "16px", fontWeight: 600 }}>
              <span>Total {memberType === "employed" ? "Employee" : ""} Share</span>
              <span style={{ color: "#b71c1c" }}>{formatCurrency(eeTotal)}</span>
            </div>
          </div>

          {/* Employer Share Section */}
          {memberType === "employed" && (
            <div style={{ marginBottom: "20px" }}>
              <h3 style={{ fontSize: "14px", color: "var(--text-secondary)", marginBottom: "8px", textTransform: "uppercase" }}>Employer Share (Company Pays)</h3>
              
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "4px", fontSize: "14px" }}>
                <span>Regular SSS (10%)</span>
                <span>{formatCurrency(erRegular)}</span>
              </div>
              
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "4px", fontSize: "14px" }}>
                <span>Mandatory Provident Fund (MPF)</span>
                <span>{formatCurrency(erMPF)}</span>
              </div>

              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px", fontSize: "14px" }}>
                <span>EC (Employees&apos; Compensation)</span>
                <span>{formatCurrency(ecFee)}</span>
              </div>

              <div style={{ display: "flex", justifyContent: "space-between", paddingTop: "8px", borderTop: "1px dashed var(--border-color)", fontSize: "16px", fontWeight: 600 }}>
                <span>Total Employer Share</span>
                <span style={{ color: "var(--text-primary)" }}>{formatCurrency(erTotal)}</span>
              </div>
            </div>
          )}

          <div style={{ display: "flex", justifyContent: "space-between", marginTop: "16px", paddingTop: "16px", borderTop: "2px solid var(--border-color)", fontSize: "20px", fontWeight: 700, color: "var(--text-primary)" }}>
            <span>Total Remittance to SSS</span>
            <span style={{ color: "#1b5e20" }}>{formatCurrency(grandTotal)}</span>
          </div>
        </div>
      </div>

      {/* SEO Content */}
      <div style={{ marginTop: "48px", paddingTop: "32px", borderTop: "1px solid var(--border-color)", color: "var(--text-primary)" }}>
        <h2 style={{ fontSize: "24px", marginBottom: "16px" }}>Understanding the 2026 SSS Contribution Table</h2>
        <p style={{ marginBottom: "16px" }}>
          In accordance with the Social Security Act of 2018 (RA 11199), the SSS contribution rate remains at <strong>15%</strong> for 2026. The Monthly Salary Credit (MSC) minimum is ₱5,000, and the maximum ceiling is ₱35,000.
        </p>
        
        <h3 style={{ fontSize: "18px", marginTop: "24px", marginBottom: "12px" }}>For Private Employees</h3>
        <ul style={{ paddingLeft: "24px", marginBottom: "16px", lineHeight: "1.6" }}>
          <li><strong>Employee Share:</strong> 5% of your MSC is deducted from your salary.</li>
          <li><strong>Employer Share:</strong> 10% of your MSC is paid by your employer.</li>
          <li><strong>EC Fee:</strong> Your employer also pays the Employees&apos; Compensation (EC) fee, which is ₱10 for MSCs below ₱15,000, and ₱30 for MSCs ₱15,000 and above.</li>
        </ul>

        <h3 style={{ fontSize: "18px", marginTop: "24px", marginBottom: "12px" }}>The Mandatory Provident Fund (MPF / WISP)</h3>
        <p style={{ marginBottom: "16px" }}>
          Also known as the Workers&apos; Investment and Savings Program (WISP), the MPF is an automatic retirement savings program for members with a Monthly Salary Credit exceeding ₱20,000. Any portion of your MSC between ₱20,000 and the ₱35,000 ceiling goes directly into this fund, which earns tax-free dividends.
        </p>
      </div>
    </div>
  );
}
