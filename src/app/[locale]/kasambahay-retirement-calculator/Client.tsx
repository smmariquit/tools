"use client";

import { useState } from "react";
import ToolHeader from "../components/ToolHeader";
import ToolLayout from "../components/ToolLayout";

export default function KasambahayRetirementClient() {
	const [monthlyWage, setMonthlyWage] = useState(6000);
	const [yearsOfService, setYearsOfService] = useState(10);
	
	const dailyWage = monthlyWage / 30; // standard approximation

	// One-Half Month Salary Formula
	const halfMonthBase = dailyWage * 15;
	const thirteenthMonthEquivalent = monthlyWage / 12;
	const silEquivalent = dailyWage * 5;
	
	const totalHalfMonth = halfMonthBase + thirteenthMonthEquivalent + silEquivalent;
	const totalRetirementPay = totalHalfMonth * yearsOfService;

	const formatPHP = (val: number) =>
		new Intl.NumberFormat("en-PH", { style: "currency", currency: "PHP" }).format(val);

	return (
		<ToolLayout>
			<ToolHeader
				title="Kasambahay Statutory Retirement Pay Calculator"
				subtitle="Calculate retirement pay for domestic workers under Article 302 of the Labor Code."
			/>
			
			<div className="tool-grid" style={{ marginTop: "24px" }}>
				<div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
					<div className="card">
						<h2 style={{ fontSize: "18px", marginBottom: "16px", color: "var(--primary)" }}>Employment Details</h2>

						<div className="form-group" style={{ marginBottom: "16px" }}>
							<label className="form-label">Current Monthly Wage</label>
							<input type="number" className="form-control" value={monthlyWage || ""} onChange={(e) => setMonthlyWage(Number(e.target.value))} />
						</div>

						<div className="form-group" style={{ marginBottom: "16px" }}>
							<label className="form-label">Total Years of Service</label>
							<input type="number" className="form-control" value={yearsOfService || ""} onChange={(e) => setYearsOfService(Number(e.target.value))} />
							<p style={{ fontSize: "12px", color: "var(--text-secondary)", marginTop: "4px" }}>
								Must have served at least 5 years to qualify for retirement pay.
							</p>
						</div>
					</div>
				</div>

				<div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
					<div className="card" style={{ position: "sticky", top: "100px", backgroundColor: "var(--bg-color)" }}>
						<h2 style={{ fontSize: "20px", marginBottom: "16px", color: "var(--primary)" }}>Retirement Pay Breakdown</h2>
						
						<div style={{ padding: "16px", backgroundColor: "rgba(13, 71, 161, 0.05)", borderRadius: "8px", marginBottom: "16px" }}>
							<h3 style={{ fontSize: "14px", marginBottom: "12px", color: "var(--primary)" }}>"One-Half Month Salary" Equivalent</h3>
							<div style={{ display: "flex", justifyContent: "space-between", fontSize: "14px" }}><span>15 Days Basic Wage:</span> <span>{formatPHP(halfMonthBase)}</span></div>
							<div style={{ display: "flex", justifyContent: "space-between", fontSize: "14px" }}><span>1/12 of 13th Month:</span> <span>{formatPHP(thirteenthMonthEquivalent)}</span></div>
							<div style={{ display: "flex", justifyContent: "space-between", fontSize: "14px" }}><span>5 Days SIL Cash:</span> <span>{formatPHP(silEquivalent)}</span></div>
							<div style={{ display: "flex", justifyContent: "space-between", fontSize: "14px", fontWeight: "bold", marginTop: "8px" }}><span>Total Equivalent:</span> <span>{formatPHP(totalHalfMonth)}</span></div>
						</div>

						<div style={{ display: "flex", justifyContent: "space-between", marginBottom: "16px", paddingTop: "12px", borderTop: "1px dashed rgba(13, 71, 161, 0.2)", fontSize: "18px", fontWeight: 700, color: "var(--primary)" }}>
							<span>Total Retirement Pay:</span>
							<span>{formatPHP(totalRetirementPay)}</span>
						</div>
					</div>
				</div>
			</div>
		</ToolLayout>
	);
}
