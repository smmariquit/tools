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
    if (salary === 0) return 0;
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

  if (msc > 0) {
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
              step="any"
              placeholder="e.g., 35000 (Max MSC)"
            />
            {salary > 0 && salary < 5000 && (
              <div style={{ marginTop: "8px", padding: "6px 10px", backgroundColor: "#fff3e0", borderRadius: "6px", fontSize: "12px", color: "#e65100", border: "1px solid #ffe0b2", display: "flex", alignItems: "center", gap: "6px" }}>
                <span>⚠️</span> Below MSC floor — minimum MSC of ₱5,000 applies
              </div>
            )}
            {salary >= 34750 && (
              <div style={{ marginTop: "8px", padding: "6px 10px", backgroundColor: "#e3f2fd", borderRadius: "6px", fontSize: "12px", color: "#0d47a1", border: "1px solid #bbdefb", display: "flex", alignItems: "center", gap: "6px" }}>
                <span>ℹ️</span> Above MSC ceiling — maximum MSC of ₱35,000 applies
              </div>
            )}
          </div>
        </div>

        {/* Results Card */}
        <div className="card" style={{ backgroundColor: "var(--bg-color)" }}>
          <h2 style={{ fontSize: "18px", marginBottom: "16px", borderBottom: "1px solid var(--border-color)", paddingBottom: "8px", color: "var(--primary)" }}>Contribution Breakdown</h2>
          
          <div style={{ display: "flex", justifyContent: "space-between", padding: "12px", backgroundColor: "var(--surface-color)", borderRadius: "var(--border-radius-sm)", border: "1px solid var(--border-color)" }}>
            <span style={{ fontWeight: 500 }}>Monthly Salary Credit (MSC)</span>
            <strong style={{ color: "var(--primary)" }}>{formatCurrency(msc)}</strong>
          </div>
          {msc >= 35000 && (
            <p style={{ fontSize: "12px", color: "var(--text-secondary)", marginTop: "4px", marginBottom: "16px", textAlign: "right", fontStyle: "italic" }}>
              * By law, the maximum MSC is capped at ₱35,000.
            </p>
          )}
          {msc < 35000 && <div style={{ marginBottom: "16px" }}></div>}
          
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

      {/* Interactive SSS Contribution Table */}
      <div style={{ marginTop: "48px", paddingTop: "32px", borderTop: "1px solid var(--border-color)", color: "var(--text-primary)" }}>
        <h2 style={{ fontSize: "24px", marginBottom: "16px" }}>Complete 2026 SSS Contribution Table</h2>
        <p style={{ marginBottom: "16px" }}>
          Your MSC bracket is <strong>highlighted</strong> below. The total contribution rate is 15% (5% Employee + 10% Employer for private employees).
        </p>

        <div style={{ overflowX: "auto", marginBottom: "24px" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "12px" }}>
            <thead>
              <tr style={{ borderBottom: "2px solid var(--border-color)", textAlign: "right" }}>
                <th style={{ padding: "8px 6px", textAlign: "left" }}>Salary Range</th>
                <th style={{ padding: "8px 6px" }}>MSC</th>
                <th style={{ padding: "8px 6px" }}>EE (5%)</th>
                <th style={{ padding: "8px 6px" }}>ER (10%)</th>
                <th style={{ padding: "8px 6px" }}>EC</th>
                <th style={{ padding: "8px 6px", fontWeight: 700 }}>Total</th>
              </tr>
            </thead>
            <tbody>
              {(() => {
                const rows = [];
                const mscValues = [
                  5000, 5500, 6000, 6500, 7000, 7500, 8000, 8500, 9000, 9500, 10000,
                  10500, 11000, 11500, 12000, 12500, 13000, 13500, 14000, 14500, 15000,
                  15500, 16000, 16500, 17000, 17500, 18000, 18500, 19000, 19500, 20000,
                  20500, 21000, 21500, 22000, 22500, 23000, 23500, 24000, 24500, 25000,
                  25500, 26000, 26500, 27000, 27500, 28000, 28500, 29000, 29500, 30000,
                  30500, 31000, 31500, 32000, 32500, 33000, 33500, 34000, 34500, 35000,
                ];
                for (let i = 0; i < mscValues.length; i++) {
                  const currentMSC = mscValues[i];
                  const low = i === 0 ? 0 : mscValues[i - 1] + 250.01;
                  const high = i === mscValues.length - 1 ? Infinity : currentMSC + 249.99;
                  const isActive = currentMSC === msc;
                  
                  const regMSC = Math.min(currentMSC, 20000);
                  const mpf = Math.max(0, currentMSC - 20000);
                  const ee = (regMSC * 0.05) + (mpf * 0.05);
                  const er = (regMSC * 0.10) + (mpf * 0.10);
                  const ec = currentMSC < 15000 ? 10 : 30;
                  const total = ee + er + ec;
                  
                  const label = i === 0 
                    ? "Below ₱5,250"
                    : i === mscValues.length - 1 
                      ? "₱34,750 and above"
                      : `₱${(low).toLocaleString(undefined, {maximumFractionDigits: 0})} – ₱${(high).toLocaleString(undefined, {maximumFractionDigits: 0})}`;

                  rows.push(
                    <tr
                      key={currentMSC}
                      style={{
                        borderBottom: "1px solid var(--border-color)",
                        textAlign: "right",
                        backgroundColor: isActive ? "rgba(13, 71, 161, 0.08)" : "transparent",
                        fontWeight: isActive ? 600 : 400,
                        transition: "background-color 0.2s ease",
                      }}
                    >
                      <td style={{ padding: "6px", textAlign: "left", whiteSpace: "nowrap" }}>
                        {isActive && <span style={{ color: "var(--primary)", marginRight: "2px" }}>▸</span>}
                        {label}
                      </td>
                      <td style={{ padding: "6px", color: isActive ? "var(--primary)" : "inherit" }}>{formatCurrency(currentMSC)}</td>
                      <td style={{ padding: "6px", color: isActive ? "#b71c1c" : "inherit" }}>{formatCurrency(ee)}</td>
                      <td style={{ padding: "6px" }}>{formatCurrency(er)}</td>
                      <td style={{ padding: "6px" }}>{formatCurrency(ec)}</td>
                      <td style={{ padding: "6px", fontWeight: 600 }}>{formatCurrency(total)}</td>
                    </tr>
                  );
                }
                return rows;
              })()}
            </tbody>
          </table>
        </div>
        
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
