"use client";

import Link from "next/link";
import { useState } from "react";
import AdBanner from "../components/AdBanner";

export default function ThirteenthMonthClient() {
	const [basicSalaryStr, setBasicSalaryStr] = useState("30000");
	const [monthsWorkedStr, setMonthsWorkedStr] = useState("12");
	const [unpaidAbsencesStr, setUnpaidAbsencesStr] = useState("0");

	const basicSalary = parseFloat(basicSalaryStr) || 0;
	const monthsWorked = parseFloat(monthsWorkedStr) || 0;
	const unpaidAbsences = parseFloat(unpaidAbsencesStr) || 0;

	// 13th Month Computation Logic
	const totalEarned = basicSalary * monthsWorked - unpaidAbsences;
	const thirteenthMonthPay = totalEarned / 12;

	// Tax Logic: 90k exemption
	const taxableAmount = Math.max(0, thirteenthMonthPay - 90000);
	const taxExemptAmount = Math.min(thirteenthMonthPay, 90000);

	const formatCurrency = (amount: number) => {
		return new Intl.NumberFormat("en-PH", {
			style: "currency",
			currency: "PHP",
		}).format(amount);
	};

	return (
		<div style={{ maxWidth: "800px", margin: "0 auto" }}>
			<div style={{ marginBottom: "24px" }}>
				<Link
					href="/"
					style={{
						fontSize: "14px",
						display: "inline-block",
						marginBottom: "16px",
					}}
				>
					&larr; Back to Tools
				</Link>
				<h1 className="page-title">13th Month Pay Calculator</h1>
				<p className="page-subtitle">
					Calculate your prorated 13th month pay and check if it exceeds the
					₱90k tax exemption limit.
				</p>
			</div>

			<AdBanner dataAdSlot="13th-month-top" />

			<div className="tool-grid" style={{ marginTop: "24px" }}>
				{/* Input Card */}
				<div className="card">
					<h2
						style={{
							fontSize: "18px",
							marginBottom: "16px",
							borderBottom: "1px solid var(--border-color)",
							paddingBottom: "8px",
						}}
					>
						Your Details
					</h2>

					<div className="form-group">
						<label className="form-label" htmlFor="basicSalary">
							Monthly Basic Salary (PHP)
						</label>
						<input
							type="number"
							id="basicSalary"
							className="form-control"
							value={basicSalaryStr}
							onChange={(e) => setBasicSalaryStr(e.target.value)}
							min="0"
						/>
						<p className="form-hint" style={{ marginTop: "4px" }}>
							Exclude overtime, holiday pay, and allowances.
						</p>
					</div>

					<div className="form-group" style={{ marginTop: "16px" }}>
						<label className="form-label" htmlFor="monthsWorked">
							Months Worked This Year
						</label>
						<input
							type="number"
							id="monthsWorked"
							className="form-control"
							value={monthsWorkedStr}
							onChange={(e) => setMonthsWorkedStr(e.target.value)}
							min="1"
							max="12"
						/>
					</div>

					<div className="form-group" style={{ marginTop: "16px" }}>
						<label className="form-label" htmlFor="unpaidAbsences">
							Total Unpaid Absences (PHP Deduction)
						</label>
						<input
							type="number"
							id="unpaidAbsences"
							className="form-control"
							value={unpaidAbsencesStr}
							onChange={(e) => setUnpaidAbsencesStr(e.target.value)}
							min="0"
						/>
					</div>
				</div>

				{/* Results Card */}
				<div className="card" style={{ backgroundColor: "var(--bg-color)" }}>
					<h2
						style={{
							fontSize: "18px",
							marginBottom: "16px",
							borderBottom: "1px solid var(--border-color)",
							paddingBottom: "8px",
							color: "var(--primary)",
						}}
					>
						Computed 13th Month Pay
					</h2>

					<div
						style={{
							display: "flex",
							justifyContent: "space-between",
							marginBottom: "16px",
							padding: "12px",
							backgroundColor: "var(--surface-color)",
							borderRadius: "var(--border-radius-sm)",
							border: "1px solid var(--border-color)",
						}}
					>
						<span style={{ fontWeight: 500 }}>Total Basic Salary Earned</span>
						<strong style={{ color: "var(--text-primary)" }}>
							{formatCurrency(totalEarned)}
						</strong>
					</div>

					<div
						style={{
							display: "flex",
							justifyContent: "space-between",
							marginBottom: "8px",
							fontSize: "14px",
						}}
					>
						<span>Formula</span>
						<span>Total Earned ÷ 12</span>
					</div>

					<div
						style={{
							display: "flex",
							justifyContent: "space-between",
							marginTop: "16px",
							paddingTop: "16px",
							borderTop: "2px solid var(--border-color)",
							fontSize: "20px",
							fontWeight: 700,
							color: "var(--text-primary)",
						}}
					>
						<span>Net 13th Month Pay</span>
						<span style={{ color: "#1b5e20" }}>
							{formatCurrency(thirteenthMonthPay)}
						</span>
					</div>

					{/* Tax Breakdown */}
					<div
						style={{
							marginTop: "24px",
							paddingTop: "16px",
							borderTop: "1px dashed var(--border-color)",
						}}
					>
						<h3
							style={{
								fontSize: "14px",
								color: "var(--text-secondary)",
								marginBottom: "8px",
								textTransform: "uppercase",
							}}
						>
							TRAIN Law Tax Status
						</h3>
						<div
							style={{
								display: "flex",
								justifyContent: "space-between",
								marginBottom: "4px",
								fontSize: "14px",
							}}
						>
							<span>Tax-Exempt Portion (Max ₱90k)</span>
							<span style={{ color: "#1b5e20" }}>
								{formatCurrency(taxExemptAmount)}
							</span>
						</div>
						<div
							style={{
								display: "flex",
								justifyContent: "space-between",
								fontSize: "14px",
							}}
						>
							<span>Taxable Portion (Added to Gross)</span>
							<span
								style={{
									color:
										taxableAmount > 0 ? "#b71c1c" : "var(--text-secondary)",
								}}
							>
								{formatCurrency(taxableAmount)}
							</span>
						</div>
					</div>
				</div>
			</div>

			<div
				style={{
					marginTop: "48px",
					paddingTop: "32px",
					borderTop: "1px solid var(--border-color)",
					color: "var(--text-primary)",
				}}
			>
				<h2 style={{ fontSize: "24px", marginBottom: "16px" }}>
					How is 13th Month Pay Computed?
				</h2>
				<p style={{ marginBottom: "16px" }}>
					By Philippine Law (P.D. 851), your 13th month pay is strictly 1/12th
					of the total <strong>basic salary</strong> you earned within a
					calendar year.
				</p>
				<h3
					style={{ fontSize: "18px", marginTop: "24px", marginBottom: "12px" }}
				>
					Exclusions from Basic Salary
				</h3>
				<ul
					style={{
						paddingLeft: "24px",
						marginBottom: "16px",
						lineHeight: "1.6",
					}}
				>
					<li>Overtime Pay</li>
					<li>Holiday Pay</li>
					<li>Night Shift Differential (NSD)</li>
					<li>Allowances (COLA, Transportation)</li>
					<li>Cash equivalent of unused leaves</li>
				</ul>
				<h3
					style={{ fontSize: "18px", marginTop: "24px", marginBottom: "12px" }}
				>
					Taxability (₱90,000 Exemption Limit)
				</h3>
				<p style={{ marginBottom: "16px" }}>
					Under the TRAIN Law, the 13th month pay and other equivalent bonuses
					are tax-exempt up to ₱90,000. Any amount exceeding this limit is added
					to your taxable income for the year.
				</p>
			</div>
		</div>
	);
}
