"use client";

import { useState } from "react";
import ToolHeader from "../components/ToolHeader";
import ToolLayout from "../components/ToolLayout";
import TrustBadge from "../../components/TrustBadge";
import PrivacyGuarantee from "../../components/PrivacyGuarantee";

export default function DonorsTaxClient() {
	const [priorGifts, setPriorGifts] = useState(0);
	const [newGift, setNewGift] = useState(0);
	const [deductions, setDeductions] = useState(0);

	const netNewGift = Math.max(0, newGift - deductions);
	const totalCumulativeGifts = priorGifts + netNewGift;
	
	const EXEMPT_THRESHOLD = 250000;
	
	const taxableCumulative = Math.max(0, totalCumulativeGifts - EXEMPT_THRESHOLD);
	const totalTaxDue = taxableCumulative * 0.06;

	const priorTaxable = Math.max(0, priorGifts - EXEMPT_THRESHOLD);
	const priorTaxPaid = priorTaxable * 0.06;

	const taxPayableNow = Math.max(0, totalTaxDue - priorTaxPaid);

	const formatPHP = (val: number) =>
		new Intl.NumberFormat("en-PH", { style: "currency", currency: "PHP" }).format(val);

	return (
		<ToolLayout maxWidth="1200px">
			<ToolHeader
				title="BIR Donor's Tax Cumulative Calculator"
				subtitle="Calculate your tax liability on gifts and donations within a calendar year (RA 10963 / TRAIN Law)."
			/>
			
			<div style={{ marginTop: "24px", width: "100%" }}>
				<TrustBadge year={2026} lastReviewed="May 2026" />
			</div>

			<div className="tool-grid">
				<div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
					<div className="card">
						<h2 style={{ fontSize: "18px", marginBottom: "16px", color: "var(--primary)" }}>Donation Details</h2>
						<p style={{ fontSize: "14px", color: "var(--text-secondary)", marginBottom: "16px" }}>
							Donor's tax is computed on a <strong>cumulative basis</strong> per calendar year. Enter previous gifts made this year to get an accurate tax due.
						</p>

						<div className="form-group" style={{ marginBottom: "16px" }}>
							<label className="form-label">Total Net Gifts Made Earlier This Year</label>
							<input type="number" className="form-control" value={priorGifts || ""} onChange={(e) => setPriorGifts(Number(e.target.value))} placeholder="₱ 0.00" />
						</div>

						<div className="form-group" style={{ marginBottom: "16px" }}>
							<label className="form-label">Current Gross Gift / Donation</label>
							<input type="number" className="form-control" value={newGift || ""} onChange={(e) => setNewGift(Number(e.target.value))} placeholder="₱ 0.00" />
						</div>

						<div className="form-group">
							<label className="form-label">Allowable Deductions / Encumbrances</label>
							<input type="number" className="form-control" value={deductions || ""} onChange={(e) => setDeductions(Number(e.target.value))} placeholder="₱ 0.00" />
							<p style={{ fontSize: "12px", color: "var(--text-secondary)", marginTop: "4px" }}>
								E.g., Mortgages assumed by the donee.
							</p>
						</div>
					</div>
				</div>

				<div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
					<div className="card" style={{ position: "sticky", top: "100px", backgroundColor: "var(--bg-color)" }}>
						<h2 style={{ fontSize: "20px", marginBottom: "16px", color: "var(--primary)" }}>Donor's Tax Computation</h2>
						
						<div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px", fontSize: "14px" }}>
							<span>Current Net Gift:</span>
							<span>{formatPHP(netNewGift)}</span>
						</div>
						<div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px", fontSize: "14px" }}>
							<span>Total Cumulative Gifts (This Year):</span>
							<strong>{formatPHP(totalCumulativeGifts)}</strong>
						</div>
						<div style={{ display: "flex", justifyContent: "space-between", marginBottom: "16px", fontSize: "14px", color: "var(--text-secondary)" }}>
							<span>Less: Tax-Exempt Threshold:</span>
							<span>- {formatPHP(EXEMPT_THRESHOLD)}</span>
						</div>
						
						<div style={{ padding: "16px", backgroundColor: "rgba(16, 185, 129, 0.05)", border: "1px solid rgba(16, 185, 129, 0.2)", borderRadius: "8px", marginBottom: "16px" }}>
							<div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px", fontSize: "14px" }}>
								<span>Total Tax Due (6% of excess):</span>
								<strong>{formatPHP(totalTaxDue)}</strong>
							</div>
							<div style={{ display: "flex", justifyContent: "space-between", fontSize: "14px", color: "var(--text-secondary)" }}>
								<span>Less: Tax Paid on Prior Gifts:</span>
								<span>- {formatPHP(priorTaxPaid)}</span>
							</div>
						</div>

						<div style={{ display: "flex", justifyContent: "space-between", marginBottom: "16px", paddingTop: "12px", borderTop: "1px dashed rgba(13, 71, 161, 0.2)", fontSize: "18px", fontWeight: 700, color: "var(--primary)" }}>
							<span>Tax Payable for Current Gift:</span>
							<span>{formatPHP(taxPayableNow)}</span>
						</div>

						<PrivacyGuarantee />
					</div>
				</div>
			</div>
		</ToolLayout>
	);
}
