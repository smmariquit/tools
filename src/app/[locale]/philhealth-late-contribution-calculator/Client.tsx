"use client";

import { useState } from "react";
import ToolHeader from "../components/ToolHeader";
import ToolLayout from "../components/ToolLayout";

export default function PhilhealthLateClient() {
	const [missedPremium, setMissedPremium] = useState(500);
	const [monthsLate, setMonthsLate] = useState(3);

	// Resolution: 1% for 1-6 months, 2% for 7-12 months? Or 1.5%? 
	// The prompt specified: "1% simple interest for 2-6 months, or 2% for 7-12 months"
	let interestRate = 0;
	if (monthsLate >= 7) {
		interestRate = 0.02;
	} else if (monthsLate >= 1) {
		interestRate = 0.01;
	}

	const penaltyAmount = missedPremium * interestRate * monthsLate;
	const totalAmountDue = missedPremium + penaltyAmount;

	const formatPHP = (val: number) =>
		new Intl.NumberFormat("en-PH", { style: "currency", currency: "PHP" }).format(val);

	return (
		<ToolLayout maxWidth="1200px">
			<ToolHeader
				title="PhilHealth Late Contribution Penalty Estimator"
				subtitle="Estimate the interest penalties on missed PhilHealth premium payments."
			/>
			
			<div className="tool-grid" style={{ marginTop: "24px" }}>
				<div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
					<div className="card">
						<h2 style={{ fontSize: "18px", marginBottom: "16px", color: "var(--primary)" }}>Missed Payment Details</h2>

						<div className="form-group" style={{ marginBottom: "16px" }}>
							<label className="form-label">Missed Monthly Premium (Principal)</label>
							<input type="number" className="form-control" value={missedPremium || ""} onChange={(e) => setMissedPremium(Number(e.target.value))} />
						</div>

						<div className="form-group">
							<label className="form-label">Months Late</label>
							<input type="number" className="form-control" value={monthsLate || ""} onChange={(e) => setMonthsLate(Number(e.target.value))} />
							<p style={{ fontSize: "12px", color: "var(--text-secondary)", marginTop: "4px" }}>1% for 1-6 months, 2% for 7 months or more.</p>
						</div>
					</div>
				</div>

				<div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
					<div className="card" style={{ position: "sticky", top: "100px", backgroundColor: "var(--bg-color)" }}>
						<h2 style={{ fontSize: "20px", marginBottom: "16px", color: "var(--primary)" }}>Settlement Computation</h2>
						
						<div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px", fontSize: "14px" }}>
							<span>Principal Amount:</span>
							<strong>{formatPHP(missedPremium)}</strong>
						</div>
						<div style={{ display: "flex", justifyContent: "space-between", marginBottom: "16px", fontSize: "14px", color: "red" }}>
							<span>Interest Penalty ({interestRate * 100}% per month):</span>
							<span>+ {formatPHP(penaltyAmount)}</span>
						</div>

						<div style={{ display: "flex", justifyContent: "space-between", marginBottom: "16px", paddingTop: "12px", borderTop: "1px dashed rgba(13, 71, 161, 0.2)", fontSize: "18px", fontWeight: 700, color: "var(--primary)" }}>
							<span>Total Settlement Due:</span>
							<span>{formatPHP(totalAmountDue)}</span>
						</div>
					</div>
				</div>
			</div>
		</ToolLayout>
	);
}
