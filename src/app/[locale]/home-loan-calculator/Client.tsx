"use client";

import dynamic from "next/dynamic";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { useCallback, useEffect, useState } from "react";
import TipCard from "../components/TipCard";
import ToolHeader from "../components/ToolHeader";
import ToolLayout from "../components/ToolLayout";

const Chart = dynamic(() => import("./Chart"), {
	ssr: false,
	loading: () => (
		<div
			style={{
				width: "100%",
				height: 200,
				display: "flex",
				alignItems: "center",
				justifyContent: "center",
				color: "var(--text-secondary)",
			}}
		>
			…
		</div>
	),
});

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

	useEffect(() => {
		setMounted(true);
		// Check if URL parameters are missing and initialize them
		if (
			!searchParams.has("price") ||
			!searchParams.has("down") ||
			!searchParams.has("rate") ||
			!searchParams.has("term")
		) {
			updateUrl({
				price: priceStr,
				down: downPercentStr,
				rate: interestRateStr,
				term: termStr,
			});
		}
	}, [
		searchParams,
		updateUrl,
		priceStr,
		downPercentStr,
		interestRateStr,
		termStr,
	]);

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
		{ name: "Down Payment", value: downPayment, color: "var(--success)" },
		{ name: "Loan Principal", value: loanAmount, color: "var(--chart-2)" },
		{ name: "Total Interest", value: totalInterest, color: "var(--danger)" },
	];

	return (
		<ToolLayout maxWidth="1200px">
			<ToolHeader
				title={t("title")}
				subtitle={t("subtitle")}
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
						<strong style={{ color: "var(--danger)" }}>
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
						<span style={{ color: "var(--chart-2)" }}>
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
								{t("totalHouseCostBreakdown")}
							</h3>
							<Chart data={chartData} formatValue={formatCurrency} />
						</div>
					)}

					{/* Home Loan Tip */}
					<TipCard
						title={t("refinancingTitle")}
						description={t("refinancingDesc")}
						icon=""
					/>
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
						{showSchedule ? t("hideSchedule") : t("viewSchedule")}
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
										<th style={{ padding: "8px" }}>{t("month")}</th>
										<th style={{ padding: "8px" }}>{t("principal")}</th>
										<th style={{ padding: "8px" }}>{t("interest")}</th>
										<th style={{ padding: "8px" }}>{t("remainingBalance")}</th>
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
