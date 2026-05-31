"use client";

import { useState } from "react";
import ToolHeader from "../components/ToolHeader";
import ToolLayout from "../components/ToolLayout";

export default function InvoiceFactoringClient() {
	const [invoiceAmount, setInvoiceAmount] = useState(100000);
	const [discountRateMonthly, setDiscountRateMonthly] = useState(2.0); // 2% per month
	const [daysOutstanding, setDaysOutstanding] = useState(60);
	const [processingFee, setProcessingFee] = useState(1500);

	// Formula calculations
	const discountRateDaily = (discountRateMonthly / 100) / 30;
	const totalDiscountFee = invoiceAmount * discountRateDaily * daysOutstanding;
	
	const netAdvance = invoiceAmount - totalDiscountFee - processingFee;
	
	// APR calculation: (Total Cost of Financing / Net Advance) * (365 / Days) * 100
	const totalCost = totalDiscountFee + processingFee;
	const apr = (totalCost / netAdvance) * (365 / daysOutstanding) * 100;

	const formatPHP = (val: number) =>
		new Intl.NumberFormat("en-PH", { style: "currency", currency: "PHP" }).format(val);

	return (
		<ToolLayout>
			<ToolHeader
				title="Invoice Factoring & Discount Calculator"
				subtitle="Calculate Net Present Value (NPV), discount fees, and APR when selling unpaid invoices for working capital."
			/>
			
			<div className="tool-grid" style={{ marginTop: "24px" }}>
				<div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
					<div className="card">
						<h2 style={{ fontSize: "18px", marginBottom: "16px", color: "var(--primary)" }}>Invoice Details</h2>

						<div className="form-group" style={{ marginBottom: "16px" }}>
							<label className="form-label">Total Invoice Amount (Face Value)</label>
							<input type="number" className="form-control" value={invoiceAmount || ""} onChange={(e) => setInvoiceAmount(Number(e.target.value))} />
						</div>

						<div className="form-group" style={{ marginBottom: "16px" }}>
							<label className="form-label">Monthly Discount Rate (%)</label>
							<input type="number" step="0.1" className="form-control" value={discountRateMonthly || ""} onChange={(e) => setDiscountRateMonthly(Number(e.target.value))} />
							<p style={{ fontSize: "12px", color: "var(--text-secondary)", marginTop: "4px" }}>Typical SME factoring rates range from 1.5% to 3.0% per month.</p>
						</div>

						<div className="form-group" style={{ marginBottom: "16px" }}>
							<label className="form-label">Days Until Invoice Due</label>
							<input type="number" className="form-control" value={daysOutstanding || ""} onChange={(e) => setDaysOutstanding(Number(e.target.value))} />
						</div>

						<div className="form-group">
							<label className="form-label">Fixed Processing Fee (PHP)</label>
							<input type="number" className="form-control" value={processingFee || ""} onChange={(e) => setProcessingFee(Number(e.target.value))} />
						</div>
					</div>
				</div>

				<div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
					<div className="card" style={{ position: "sticky", top: "100px", backgroundColor: "var(--bg-color)" }}>
						<h2 style={{ fontSize: "20px", marginBottom: "16px", color: "var(--primary)" }}>Factoring Analysis</h2>
						
						<div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px", fontSize: "14px" }}>
							<span>Invoice Face Value:</span>
							<strong>{formatPHP(invoiceAmount)}</strong>
						</div>
						<div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px", fontSize: "14px", color: "red" }}>
							<span>Time Discount Fee ({daysOutstanding} days):</span>
							<span>- {formatPHP(totalDiscountFee)}</span>
						</div>
						<div style={{ display: "flex", justifyContent: "space-between", marginBottom: "16px", fontSize: "14px", color: "red" }}>
							<span>Processing Fee:</span>
							<span>- {formatPHP(processingFee)}</span>
						</div>
						
						<div style={{ padding: "16px", backgroundColor: "rgba(16, 185, 129, 0.05)", border: "1px solid rgba(16, 185, 129, 0.2)", borderRadius: "8px", marginBottom: "16px" }}>
							<div style={{ display: "flex", justifyContent: "space-between", fontSize: "16px", fontWeight: "bold", color: "var(--primary)" }}>
								<span>Net Advance (Cash Received):</span>
								<span>{formatPHP(netAdvance)}</span>
							</div>
						</div>

						<div style={{ display: "flex", justifyContent: "space-between", fontSize: "16px", fontWeight: 700, color: "var(--primary)", marginTop: "16px", paddingTop: "16px", borderTop: "1px dashed rgba(13, 71, 161, 0.2)" }}>
							<span>Effective APR:</span>
							<span>{apr.toFixed(2)}%</span>
						</div>
						<p style={{ fontSize: "12px", color: "var(--text-secondary)", marginTop: "8px", textAlign: "right" }}>
							Annualized Percentage Rate reflects the true yearly cost of financing this invoice.
						</p>
					</div>
				</div>
			</div>
		</ToolLayout>
	);
}
