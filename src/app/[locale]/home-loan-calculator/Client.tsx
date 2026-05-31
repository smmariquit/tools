"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { useCallback, useEffect, useState } from "react";
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import ToolHeader from "../components/ToolHeader";
import ToolLayout from "../components/ToolLayout";

export default function HomeLoanCalculator() {
	const t = useTranslations("HomeLoanCalculator");
	const router = useRouter();
	const pathname = usePathname();
	const searchParams = useSearchParams();

	const [priceStr, setPriceStr] = useState(
		searchParams.get("price") || "5000000",
	);
	const [downPercentStr, setDownPercentStr] = useState(
		searchParams.get("down") || "20",
	);
	const [interestRateStr, setInterestRateStr] = useState(
		searchParams.get("rate") || "7.0",
	);
	const [termStr, setTermStr] = useState(searchParams.get("term") || "20");
	const [showSchedule, setShowSchedule] = useState(false);
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

	// Core Math
	const price = parseFloat(priceStr) || 0;
	const downPercent = parseFloat(downPercentStr) || 0;
	const interestRate = parseFloat(interestRateStr) || 0;
	const termYears = parseFloat(termStr) || 0;

	const downPayment = price * (downPercent / 100);
	const loanAmount = price - downPayment;

	const monthlyRate = interestRate / 100 / 12;
	const totalMonths = termYears * 12;

	let monthlyPayment = 0;
	if (loanAmount > 0 && totalMonths > 0) {
		if (monthlyRate === 0) {
			monthlyPayment = loanAmount / totalMonths;
		} else {
			monthlyPayment =
				(loanAmount * monthlyRate * (1 + monthlyRate) ** totalMonths) /
				((1 + monthlyRate) ** totalMonths - 1);
		}
	}

	const totalPaid = monthlyPayment * totalMonths;
	const totalInterest = totalPaid - loanAmount;
	const totalCost = downPayment + totalPaid;

	const formatCurrency = (amount: number) => {
		return new Intl.NumberFormat("en-PH", {
			style: "currency",
			currency: "PHP",
		}).format(amount);
	};

	// Amortization schedule
	const schedule = [];
	let remaining = loanAmount;
	for (let m = 1; m <= Math.min(totalMonths, 360); m++) {
		const interest = remaining * monthlyRate;
		const principal = monthlyPayment - interest;
		remaining = Math.max(0, remaining - principal);
		schedule.push({
			month: m,
			payment: monthlyPayment,
			principal,
			interest,
			balance: remaining,
		});
	}

	const chartData = [
		{ name: "Down Payment", value: downPayment, color: "#2e7d32" },
		{ name: "Loan Principal", value: loanAmount, color: "#1976d2" },
		{ name: "Total Interest", value: totalInterest, color: "#b71c1c" },
	];

	return (
		<ToolLayout>
			<ToolHeader
				title="Home Loan & Amortization Calculator"
				subtitle="Estimate your monthly mortgage payments, down payment options, and total interest charges for commercial bank home loans."
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

					{/* Purchase Price Input */}
					<div className="form-group" style={{ marginBottom: "20px" }}>
						<div style={{ display: "flex", justifyContent: "space-between" }}>
							<label className="form-label" htmlFor="home-price">
								{t("propertyPriceLabel")}
							</label>
							<strong style={{ color: "var(--primary)" }}>
								{formatCurrency(price)}
							</strong>
						</div>
						<input
							type="range"
							id="home-price"
							min="1000000"
							max="30000000"
							step="250000"
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
							aria-label="Property purchase price in pesos"
							onChange={(e) => {
								setPriceStr(e.target.value);
								updateUrl({ price: e.target.value });
							}}
							style={{ marginTop: "8px", fontSize: "14px" }}
						/>
						<span className="form-hint">{t("propertyPriceHint")}</span>
					</div>

					{/* Downpayment Slider */}
					<div className="form-group" style={{ marginBottom: "20px" }}>
						<div style={{ display: "flex", justifyContent: "space-between" }}>
							<label className="form-label" htmlFor="home-down">
								{t("downpaymentLabel")} ({downPercent}%)
							</label>
							<strong>{formatCurrency(downPayment)}</strong>
						</div>
						<input
							type="range"
							id="home-down"
							min="10"
							max="50"
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
							<label className="form-label" htmlFor="home-rate">
								{t("interestRateLabel")}
							</label>
							<strong style={{ color: "var(--primary)" }}>
								{interestRate}%
							</strong>
						</div>
						<input
							type="range"
							id="home-rate"
							min="4.0"
							max="12.0"
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
						<label className="form-label" htmlFor="home-term">
							{t("loanTermLabel")}
						</label>
						<select
							id="home-term"
							className="form-control"
							value={termStr}
							onChange={(e) => {
								setTermStr(e.target.value);
								updateUrl({ term: e.target.value });
							}}
						>
							<option value="5">5 Years (60 months)</option>
							<option value="10">10 Years (120 months)</option>
							<option value="15">15 Years (180 months)</option>
							<option value="20">20 Years (240 months)</option>
							<option value="25">25 Years (300 months)</option>
							<option value="30">30 Years (360 months)</option>
						</select>
					</div>
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
						<strong>{formatCurrency(totalCost)}</strong>
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
							{formatCurrency(monthlyPayment)}
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
								Total House Cost Breakdown
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

					{/* Home Loan Tip */}
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
							💡 {t("refinancingTitle")}
						</h3>
						<p
							style={{
								fontSize: "13px",
								color: "var(--text-secondary)",
								lineHeight: 1.6,
								margin: 0,
							}}
						>
							{t("refinancingDesc")}
						</p>
					</div>
				</div>
			</div>

			{/* Toggleable Schedule */}
			{loanAmount > 0 && (
				<div className="card" style={{ marginTop: "24px" }}>
					<button
						onClick={() => setShowSchedule(!showSchedule)}
						className="btn-secondary"
						style={{ width: "100%", padding: "12px", fontWeight: 600 }}
					>
						{showSchedule
							? "Hide Amortization Schedule"
							: "View Amortization Schedule"}
					</button>

					{showSchedule && (
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
									{schedule.map((row) => (
										<tr
											key={`schedule-row-${row.month}`}
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
