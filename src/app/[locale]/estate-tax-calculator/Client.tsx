"use client";

import { useState } from "react";
import ToolHeader from "../components/ToolHeader";
import ToolLayout from "../components/ToolLayout";

export default function EstateTaxClient() {
	const [grossEstate, setGrossEstate] = useState(15000000);
	const [familyHome, setFamilyHome] = useState(8000000);
	const [medicalExpenses, setMedicalExpenses] = useState(500000);
	const [otherDeductions, setOtherDeductions] = useState(0);

	const STANDARD_DEDUCTION = 5000000;
	const allowedFamilyHome = Math.min(familyHome, 10000000);
	const allowedMedical = Math.min(medicalExpenses, 500000);

	const totalDeductions = STANDARD_DEDUCTION + allowedFamilyHome + allowedMedical + otherDeductions;
	const netEstate = Math.max(0, grossEstate - totalDeductions);
	const estateTaxDue = netEstate * 0.06;

	const formatPHP = (val: number) =>
		new Intl.NumberFormat("en-PH", { style: "currency", currency: "PHP" }).format(val);

	return (
		<ToolLayout>
			<ToolHeader
				title="Philippine Estate Tax Calculator"
				subtitle="Estimate the 6% flat estate tax under the TRAIN Law."
			/>
			
			<div className="tool-grid" style={{ marginTop: "24px" }}>
				<div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
					<div className="card">
						<h2 style={{ fontSize: "18px", marginBottom: "16px", color: "var(--primary)" }}>Estate Details</h2>

						<div className="form-group" style={{ marginBottom: "16px" }}>
							<label className="form-label">Gross Estate (FMV or Zonal Value)</label>
							<input type="number" className="form-control" value={grossEstate || ""} onChange={(e) => setGrossEstate(Number(e.target.value))} />
						</div>

						<h2 style={{ fontSize: "16px", marginBottom: "12px", marginTop: "24px", color: "var(--primary)" }}>Deductions</h2>
						
						<div className="form-group" style={{ marginBottom: "16px" }}>
							<label className="form-label">Standard Deduction</label>
							<input type="text" className="form-control" value="₱ 5,000,000.00" disabled />
						</div>
						
						<div className="form-group" style={{ marginBottom: "16px" }}>
							<label className="form-label">Family Home Value</label>
							<input type="number" className="form-control" value={familyHome || ""} onChange={(e) => setFamilyHome(Number(e.target.value))} />
							<p style={{ fontSize: "12px", color: "var(--text-secondary)", marginTop: "4px" }}>Max deductible is ₱10,000,000.</p>
						</div>

						<div className="form-group" style={{ marginBottom: "16px" }}>
							<label className="form-label">Medical Expenses</label>
							<input type="number" className="form-control" value={medicalExpenses || ""} onChange={(e) => setMedicalExpenses(Number(e.target.value))} />
							<p style={{ fontSize: "12px", color: "var(--text-secondary)", marginTop: "4px" }}>Max deductible is ₱500,000.</p>
						</div>

						<div className="form-group">
							<label className="form-label">Other Allowed Deductions</label>
							<input type="number" className="form-control" value={otherDeductions || ""} onChange={(e) => setOtherDeductions(Number(e.target.value))} />
						</div>
					</div>
				</div>

				<div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
					<div className="card" style={{ position: "sticky", top: "100px", backgroundColor: "var(--bg-color)" }}>
						<h2 style={{ fontSize: "20px", marginBottom: "16px", color: "var(--primary)" }}>Tax Computation</h2>
						
						<div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px", fontSize: "14px" }}>
							<span>Gross Estate:</span>
							<strong>{formatPHP(grossEstate)}</strong>
						</div>
						<div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px", fontSize: "14px", color: "red" }}>
							<span>Total Deductions:</span>
							<span>- {formatPHP(totalDeductions)}</span>
						</div>
						<div style={{ display: "flex", justifyContent: "space-between", marginBottom: "16px", fontSize: "14px" }}>
							<span>Net Taxable Estate:</span>
							<strong>{formatPHP(netEstate)}</strong>
						</div>

						<div style={{ display: "flex", justifyContent: "space-between", marginBottom: "16px", paddingTop: "12px", borderTop: "1px dashed rgba(13, 71, 161, 0.2)", fontSize: "18px", fontWeight: 700, color: "var(--primary)" }}>
							<span>Estate Tax Due (6%):</span>
							<span>{formatPHP(estateTaxDue)}</span>
						</div>
					</div>
				</div>
			</div>
		</ToolLayout>
	);
}
