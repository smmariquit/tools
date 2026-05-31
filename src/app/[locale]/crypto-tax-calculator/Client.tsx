"use client";

import { useState } from "react";
import ToolHeader from "../components/ToolHeader";
import ToolLayout from "../components/ToolLayout";

export default function CryptoTaxClient() {
	const [annualSalary, setAnnualSalary] = useState(0);
	const [cryptoProfits, setCryptoProfits] = useState(150000);
	const [businessExpenses, setBusinessExpenses] = useState(0);

	// Currently BIR treats crypto trading profits as ordinary income, added to regular salary
	const taxableCrypto = Math.max(0, cryptoProfits - businessExpenses);
	const totalTaxableIncome = annualSalary + taxableCrypto;
	
	let annualTaxDue = 0;
	if (totalTaxableIncome <= 250000) annualTaxDue = 0;
	else if (totalTaxableIncome <= 400000) annualTaxDue = (totalTaxableIncome - 250000) * 0.15;
	else if (totalTaxableIncome <= 800000) annualTaxDue = 22500 + (totalTaxableIncome - 400000) * 0.20;
	else if (totalTaxableIncome <= 2000000) annualTaxDue = 102500 + (totalTaxableIncome - 800000) * 0.25;
	else if (totalTaxableIncome <= 8000000) annualTaxDue = 402500 + (totalTaxableIncome - 2000000) * 0.30;
	else annualTaxDue = 2202500 + (totalTaxableIncome - 8000000) * 0.35;

	// Calculate baseline tax without crypto to find the marginal tax purely due to crypto
	let baselineTaxDue = 0;
	if (annualSalary <= 250000) baselineTaxDue = 0;
	else if (annualSalary <= 400000) baselineTaxDue = (annualSalary - 250000) * 0.15;
	else if (annualSalary <= 800000) baselineTaxDue = 22500 + (annualSalary - 400000) * 0.20;
	else if (annualSalary <= 2000000) baselineTaxDue = 102500 + (annualSalary - 800000) * 0.25;
	else if (annualSalary <= 8000000) baselineTaxDue = 402500 + (annualSalary - 2000000) * 0.30;
	else baselineTaxDue = 2202500 + (annualSalary - 8000000) * 0.35;

	const marginalCryptoTax = annualTaxDue - baselineTaxDue;

	const formatPHP = (val: number) =>
		new Intl.NumberFormat("en-PH", { style: "currency", currency: "PHP" }).format(val);

	return (
		<ToolLayout>
			<ToolHeader
				title="BIR Crypto Tax Calculator (Philippines)"
				subtitle="Estimate income tax liability on crypto profits treated as ordinary income under BIR rules."
			/>
			
			<div className="tool-grid" style={{ marginTop: "24px" }}>
				<div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
					<div className="card">
						<h2 style={{ fontSize: "18px", marginBottom: "16px", color: "var(--primary)" }}>Income Declaration</h2>

						<div className="form-group" style={{ marginBottom: "16px" }}>
							<label className="form-label">Annual Salary from Employment (PHP)</label>
							<input type="number" className="form-control" value={annualSalary || ""} onChange={(e) => setAnnualSalary(Number(e.target.value))} />
							<p style={{ fontSize: "12px", color: "var(--text-secondary)", marginTop: "4px" }}>Required to determine your progressive tax bracket.</p>
						</div>

						<div className="form-group" style={{ marginBottom: "16px" }}>
							<label className="form-label">Net Crypto Trading / Web3 Profits (PHP)</label>
							<input type="number" className="form-control" value={cryptoProfits || ""} onChange={(e) => setCryptoProfits(Number(e.target.value))} />
						</div>

						<div className="form-group">
							<label className="form-label">Allowable Business Expenses</label>
							<input type="number" className="form-control" value={businessExpenses || ""} onChange={(e) => setBusinessExpenses(Number(e.target.value))} />
							<p style={{ fontSize: "12px", color: "var(--text-secondary)", marginTop: "4px" }}>Trading fees, internet costs, etc. (Requires receipts if itemizing).</p>
						</div>
					</div>
				</div>

				<div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
					<div className="card" style={{ position: "sticky", top: "100px", backgroundColor: "var(--bg-color)" }}>
						<h2 style={{ fontSize: "20px", marginBottom: "16px", color: "var(--primary)" }}>Tax Liability</h2>
						
						<div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px", fontSize: "14px" }}>
							<span>Taxable Crypto Income:</span>
							<strong>{formatPHP(taxableCrypto)}</strong>
						</div>
						<div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px", fontSize: "14px" }}>
							<span>Total Taxable Income (Crypto + Salary):</span>
							<strong>{formatPHP(totalTaxableIncome)}</strong>
						</div>
						
						<div style={{ padding: "16px", backgroundColor: "rgba(239, 68, 68, 0.05)", border: "1px solid rgba(239, 68, 68, 0.2)", borderRadius: "8px", marginBottom: "16px", marginTop: "16px" }}>
							<div style={{ display: "flex", justifyContent: "space-between", fontSize: "14px", color: "var(--text-secondary)", marginBottom: "8px" }}>
								<span>Total Annual Tax Due:</span>
								<span>{formatPHP(annualTaxDue)}</span>
							</div>
							<div style={{ display: "flex", justifyContent: "space-between", fontSize: "16px", fontWeight: "bold", color: "red" }}>
								<span>Tax Burden from Crypto Alone:</span>
								<span>{formatPHP(marginalCryptoTax)}</span>
							</div>
						</div>
					</div>
				</div>
			</div>
		</ToolLayout>
	);
}
