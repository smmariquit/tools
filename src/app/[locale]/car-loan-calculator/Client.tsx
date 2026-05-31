"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { useCallback, useEffect, useState } from "react";
import {
	Cell,
	Legend,
	Pie,
	PieChart,
	ResponsiveContainer,
	Tooltip,
} from "recharts";
import ToolHeader from "../components/ToolHeader";
import ToolLayout from "../components/ToolLayout";

export default function CarLoanCalculator() {
	const t = useTranslations("CarLoanCalculator");
	const router = useRouter();
	const pathname = usePathname();
	const searchParams = useSearchParams();

	const [priceStr, setPriceStr] = useState(
		searchParams.get("price") || "1200000",
	);
	const [downPercentStr, setDownPercentStr] = useState(
		searchParams.get("down") || "20",
	);
	const [interestRateStr, setInterestRateStr] = useState(
		searchParams.get("rate") || "9.5",
	);
	const [termStr, setTermStr] = useState(searchParams.get("term") || "5");
	const [showAmortization, setShowAmortization] = useState(false);
	const [mounted, setMounted] = useState(false);

	useEffect(() => {
		setMounted(true);
	}, []);

	const updateUrl = useCallback(
		(updates: Record<string, string>) => {
			const newSearchParams = new URLSearchParams(searchParams.toString());
			for (const [key, value] of Object.entries(updates)) {
				if (value) newSearchParams.set(key, value);
				else newSearchParams.delete(key);
			}
			router.replace(`${pathname}?${newSearchParams.toString()}`, {
				scroll: false,
			});
		},
		[router, pathname, searchParams],
	);

	// Core math
	const price = parseFloat(priceStr) || 0;
	const downPercent = parseFloat(downPercentStr) || 0;
	const interestRate = parseFloat(interestRateStr) || 0;
	const termYears = parseFloat(termStr) || 0;

	const downPayment = price * (downPercent / 100);
	const loanAmount = price - downPayment;

	// Car Loan PMT logic
	// In the Philippines, car loans are calculated either:
	// A. Flat Interest Rate (simple interest, highly common for dealers)
	// B. Compounded Amortization (declining balance, highly common for banks)
	// Let's implement declining balance (PMT) since that is the standard for high-ticket bank financing comparisons.
	const monthlyRate = interestRate / 100 / 12;
	const totalMonths = termYears * 12;

	let monthlyAmortization = 0;
	if (loanAmount > 0 && totalMonths > 0) {
		if (monthlyRate === 0) {
			monthlyAmortization = loanAmount / totalMonths;
		} else {
			monthlyAmortization =
				(loanAmount * monthlyRate * (1 + monthlyRate) ** totalMonths) /
				((1 + monthlyRate) ** totalMonths - 1);
		}
	}

	const totalPaid = monthlyAmortization * totalMonths;
	const totalInterest = totalPaid - loanAmount;

	// In-House comparison mock
	// Typically, dealer in-house financing rates are ~16% flat, plus an additional 3-5% chattel mortgage fee!
	const inHouseRate = 16.5;
	const inHouseMonthlyRate = inHouseRate / 100 / 12;
	let inHouseMonthly = 0;
	if (loanAmount > 0 && totalMonths > 0) {
		inHouseMonthly =
			(loanAmount *
				inHouseMonthlyRate *
				(1 + inHouseMonthlyRate) ** totalMonths) /
			((1 + inHouseMonthlyRate) ** totalMonths - 1);
	}
	const inHouseTotalPaid = inHouseMonthly * totalMonths;
	const totalSavings = inHouseTotalPaid - totalPaid;

	const formatCurrency = (amount: number) => {
		return new Intl.NumberFormat("en-PH", {
			style: "currency",
			currency: "PHP",
		}).format(amount);
	};

	// Generate Amortization Table
	const amortizationSchedule = [];
	let remainingBalance = loanAmount;
	for (let month = 1; month <= totalMonths; month++) {
		const interestPayment = remainingBalance * monthlyRate;
		const principalPayment = monthlyAmortization - interestPayment;
		remainingBalance = Math.max(0, remainingBalance - principalPayment);
		amortizationSchedule.push({
			month,
			payment: monthlyAmortization,
			principal: principalPayment,
			interest: interestPayment,
			balance: remainingBalance,
		});
	}

	const chartData = [
		{ name: "Down Payment", value: downPayment, color: "#2e7d32" },
		{ name: "Principal Loan", value: loanAmount, color: "#1976d2" },
		{ name: "Total Interest", value: totalInterest, color: "#b71c1c" },
	];

	return (
		<ToolLayout>
			<ToolHeader
				title="Car Loan & Amortization Calculator"
				subtitle="Compute your monthly payment, total interest, and see why Bank Financing beats Dealer In-House Financing."
				adSlotId="1234567890"
			/>

			<div className="tool-grid" style={{ marginTop: "24px" }}>
				{/* Inputs */}
				<div className="card">
					<h2
						style={{
							fontSize: "18px",
							marginBottom: "16px",
							borderBottom: "1px solid var(--border-color)",
							paddingBottom: "8px",
						}}
					>
						{t("detailsTitle")}
					</h2>

					{/* Purchase Price Slider */}
					<div className="form-group" style={{ marginBottom: "20px" }}>
						<div style={{ display: "flex", justifyContent: "space-between" }}>
							<label className="form-label" htmlFor="car-price">
								{t("vehiclePriceLabel")}
							</label>
							<strong style={{ color: "var(--primary)" }}>
								{formatCurrency(price)}
							</strong>
						</div>
						<input
							type="range"
							id="car-price"
							min="300000"
							max="5000000"
							step="50000"
							value={priceStr}
							onChange={(e) => {
								setPriceStr(e.target.value);
								updateUrl({ price: e.target.value });
							}}
							style={{ width: "100%", accentColor: "var(--primary)" }}
						/>
						<input
							type="number"
							className="form-control"
							value={priceStr}
							aria-label="Purchase price in pesos"
							onChange={(e) => {
								setPriceStr(e.target.value);
								updateUrl({ price: e.target.value });
							}}
							style={{ marginTop: "8px", fontSize: "14px" }}
						/>
					</div>

					{/* Downpayment Slider */}
					<div className="form-group" style={{ marginBottom: "20px" }}>
						<div style={{ display: "flex", justifyContent: "space-between" }}>
							<label className="form-label" htmlFor="car-down">
								{t("downpaymentLabel")} ({downPercent}%)
							</label>
							<strong>{formatCurrency(downPayment)}</strong>
						</div>
						<input
							type="range"
							id="car-down"
							min="10"
							max="80"
							step="5"
							value={downPercentStr}
							onChange={(e) => {
								setDownPercentStr(e.target.value);
								updateUrl({ down: e.target.value });
							}}
							style={{ width: "100%", accentColor: "var(--primary)" }}
						/>
					</div>

					{/* Interest Rate */}
					<div className="form-group" style={{ marginBottom: "20px" }}>
						<div style={{ display: "flex", justifyContent: "space-between" }}>
							<label className="form-label" htmlFor="car-rate">
								{t("interestRateLabel")}
							</label>
							<strong style={{ color: "var(--primary)" }}>
								{interestRate}%
							</strong>
						</div>
						<input
							type="range"
							id="car-rate"
							min="5"
							max="25"
							step="0.1"
							value={interestRateStr}
							onChange={(e) => {
								setInterestRateStr(e.target.value);
								updateUrl({ rate: e.target.value });
							}}
							style={{ width: "100%", accentColor: "var(--primary)" }}
						/>
						<span className="form-hint">{t("interestRateHint")}</span>
					</div>

					{/* Term in Years */}
					<div className="form-group" style={{ marginBottom: "20px" }}>
						<label className="form-label" htmlFor="car-term">
							{t("loanTermLabel")}
						</label>
						<select
							id="car-term"
							className="form-control"
							value={termStr}
							onChange={(e) => {
								setTermStr(e.target.value);
								updateUrl({ term: e.target.value });
							}}
						>
							<option value="1">1 Year (12 months)</option>
							<option value="2">2 Years (24 months)</option>
							<option value="3">3 Years (36 months)</option>
							<option value="4">4 Years (48 months)</option>
							<option value="5">5 Years (60 months)</option>
							<option value="6">6 Years (72 months)</option>
						</select>
					</div>

					{/* BANK VS INHOUSE CARD */}
					{loanAmount > 0 && (
						<div
							className="card"
							style={{
								backgroundColor: "#e8f5e9",
								border: "1px solid #a5d6a7",
								borderLeft: "5px solid #2e7d32",
								marginTop: "20px",
							}}
						>
							<h3
								style={{
									fontSize: "15px",
									color: "#1b5e20",
									marginBottom: "8px",
								}}
							>
								💰 Bank Financing Savings
							</h3>
							<p
								style={{
									fontSize: "13px",
									color: "#2e7d32",
									lineHeight: 1.5,
									margin: "0 0 12px 0",
								}}
							>
								By getting a car loan from a commercial bank (at {interestRate}
								%) instead of dealer in-house financing (usually ~{inHouseRate}
								%), you will save:
							</p>
							<div
								style={{
									display: "flex",
									justifyContent: "space-between",
									alignItems: "center",
								}}
							>
								<div>
									<div
										style={{
											fontSize: "11px",
											color: "#388e3c",
											textTransform: "uppercase",
										}}
									>
										Total Savings
									</div>
									<strong style={{ fontSize: "20px", color: "#1b5e20" }}>
										{formatCurrency(totalSavings)}
									</strong>
								</div>
								<div>
									<div
										style={{
											fontSize: "11px",
											color: "#388e3c",
											textTransform: "uppercase",
										}}
									>
										Monthly Difference
									</div>
									<strong style={{ fontSize: "16px", color: "#1b5e20" }}>
										- {formatCurrency(inHouseMonthly - monthlyAmortization)}/mo
									</strong>
								</div>
							</div>
						</div>
					)}
				</div>

				{/* Results */}
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
						{t("resultsTitle")}
					</h2>

					<div
						style={{
							display: "flex",
							justifyContent: "space-between",
							marginBottom: "12px",
							fontSize: "14px",
						}}
					>
						<span style={{ color: "var(--text-secondary)" }}>
							{t("loanAmount")}
						</span>
						<strong>{formatCurrency(loanAmount)}</strong>
					</div>

					<div
						style={{
							display: "flex",
							justifyContent: "space-between",
							marginBottom: "12px",
							fontSize: "14px",
						}}
					>
						<span style={{ color: "var(--text-secondary)" }}>
							{t("totalInterest")}
						</span>
						<strong style={{ color: "#b71c1c" }}>
							{formatCurrency(totalInterest)}
						</strong>
					</div>

					<div
						style={{
							display: "flex",
							justifyContent: "space-between",
							marginBottom: "16px",
							fontSize: "14px",
						}}
					>
						<span style={{ color: "var(--text-secondary)" }}>
							{t("totalPaid")}
						</span>
						<strong>{formatCurrency(totalPaid)}</strong>
					</div>

					<div
						style={{
							display: "flex",
							justifyContent: "space-between",
							alignItems: "center",
							marginTop: "16px",
							paddingTop: "16px",
							borderTop: "2px solid var(--border-color)",
							fontSize: "24px",
							fontWeight: 700,
							color: "var(--text-primary)",
						}}
					>
						<span style={{ fontSize: "16px" }}>{t("monthlyAmortization")}</span>
						<span style={{ color: "#1976d2" }}>
							{formatCurrency(monthlyAmortization)}
						</span>
					</div>

					{/* Donut Chart */}
					{mounted && loanAmount > 0 && (
						<div style={{ marginTop: "24px" }}>
							<h3
								style={{
									fontSize: "14px",
									marginBottom: "16px",
									color: "var(--text-secondary)",
								}}
							>
								Total Cost Breakdown
							</h3>
							<ResponsiveContainer width="100%" height={200}>
								<PieChart>
									<Pie
										data={chartData}
										cx="50%"
										cy="50%"
										innerRadius={50}
										outerRadius={85}
										dataKey="value"
										paddingAngle={2}
										label={({ name, percent }) =>
											`${name} (${((percent ?? 0) * 100).toFixed(0)}%)`
										}
									>
										{chartData.map((entry, index) => (
											<Cell key={`cell-${index}`} fill={entry.color} />
										))}
									</Pie>
									<Tooltip
										formatter={(value) => formatCurrency(Number(value))}
									/>
								</PieChart>
							</ResponsiveContainer>
						</div>
					)}

					{/* Explanation */}
					<div
						className="card"
						style={{
							backgroundColor: "var(--bg-alt-color, #f8f9fa)",
							borderLeft: "4px solid var(--primary)",
							marginTop: "24px",
						}}
					>
						<h3
							style={{
								fontSize: "14px",
								marginBottom: "8px",
								color: "var(--primary)",
							}}
						>
							💡 {t("bankVsInhouseTitle")}
						</h3>
						<p
							style={{
								fontSize: "13px",
								color: "var(--text-secondary)",
								lineHeight: 1.6,
								margin: 0,
							}}
						>
							{t("bankVsInhouseDesc")}
						</p>
					</div>
				</div>
			</div>

			{/* Toggleable Amortization Schedule */}
			{loanAmount > 0 && (
				<div className="card" style={{ marginTop: "24px" }}>
					<button
						onClick={() => setShowAmortization(!showAmortization)}
						className="btn-secondary"
						style={{ width: "100%", padding: "12px", fontWeight: 600 }}
					>
						{showAmortization
							? "Hide Monthly Payment Schedule"
							: "View Monthly Payment Schedule"}
					</button>

					{showAmortization && (
						<div style={{ marginTop: "20px", overflowX: "auto" }}>
							<table
								className="table"
								style={{ width: "100%", fontSize: "14px" }}
							>
								<thead>
									<tr
										style={{
											borderBottom: "2px solid var(--border-color)",
											textAlign: "left",
										}}
									>
										<th style={{ padding: "8px" }}>Month</th>
										<th style={{ padding: "8px" }}>Principal</th>
										<th style={{ padding: "8px" }}>Interest</th>
										<th style={{ padding: "8px" }}>Remaining Balance</th>
									</tr>
								</thead>
								<tbody>
									{amortizationSchedule.map((row) => (
										<tr
											key={`amort-row-${row.month}`}
											style={{ borderBottom: "1px solid var(--border-color)" }}
										>
											<td style={{ padding: "8px" }}>{row.month}</td>
											<td style={{ padding: "8px" }}>
												{formatCurrency(row.principal)}
											</td>
											<td style={{ padding: "8px" }}>
												{formatCurrency(row.interest)}
											</td>
											<td style={{ padding: "8px" }}>
												{formatCurrency(row.balance)}
											</td>
										</tr>
									))}
								</tbody>
							</table>
						</div>
					)}
				</div>
			)}
		</ToolLayout>
	);
}
