"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { useCallback, useEffect, useState } from "react";
import {
	Bar,
	BarChart,
	Cell,
	ResponsiveContainer,
	Tooltip,
	XAxis,
	YAxis,
} from "recharts";
import ToolHeader from "../components/ToolHeader";
import ToolLayout from "../components/ToolLayout";

type DayType =
	| "regular"
	| "rest"
	| "special"
	| "specialRest"
	| "regularHoliday"
	| "regularHolidayRest";

// DOLE-mandated multipliers
const DAY_MULTIPLIERS: Record<DayType, number> = {
	regular: 1.0,
	rest: 1.3,
	special: 1.3,
	specialRest: 1.5,
	regularHoliday: 2.0,
	regularHolidayRest: 2.6,
};

// Night Differential is 10% of the applicable hourly rate
const ND_PREMIUM_RATE = 0.1;

// Night Differential applies from 10:00 PM (22) to 6:00 AM (6)
const ND_START = 22;
const ND_END = 6;

function generateTimeOptions() {
	const options = [];
	for (let h = 0; h < 24; h++) {
		const ampm = h < 12 ? "AM" : "PM";
		const displayHour = h === 0 ? 12 : h > 12 ? h - 12 : h;
		options.push({
			value: h.toString(),
			label: `${displayHour}:00 ${ampm}`,
		});
	}
	return options;
}

function calculateNDHours(
	shiftStart: number,
	_shiftEnd: number,
	totalWorkHours: number,
): number {
	let ndHours = 0;
	for (let i = 0; i < totalWorkHours; i++) {
		const hour = (shiftStart + i) % 24;
		if (hour >= ND_START || hour < ND_END) {
			ndHours++;
		}
	}
	return ndHours;
}

function calculateTotalWorkHours(shiftStart: number, shiftEnd: number): number {
	let totalHours: number;
	if (shiftEnd > shiftStart) {
		totalHours = shiftEnd - shiftStart;
	} else if (shiftEnd < shiftStart) {
		totalHours = 24 - shiftStart + shiftEnd;
	} else {
		totalHours = 0; // Same start/end = 0 hours
	}
	// Deduct 1 hour for unpaid lunch break if shift is 5+ hours
	if (totalHours >= 5) {
		totalHours -= 1;
	}
	return Math.max(0, totalHours);
}

const TIME_OPTIONS = generateTimeOptions();

export default function BpoCalculator() {
	const t = useTranslations("BpoCalculator");
	const router = useRouter();
	const pathname = usePathname();
	const searchParams = useSearchParams();

	const [salaryStr, setSalaryStr] = useState(
		searchParams.get("salary") || "25000",
	);
	const [shiftStart, setShiftStart] = useState(
		searchParams.get("shiftStart") || "20",
	);
	const [shiftEnd, setShiftEnd] = useState(searchParams.get("shiftEnd") || "5");
	const [dayType, setDayType] = useState<DayType>(
		(searchParams.get("type") as DayType) || "regular",
	);
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
			!searchParams.has("salary") ||
			!searchParams.has("shiftStart") ||
			!searchParams.has("shiftEnd") ||
			!searchParams.has("type")
		) {
			updateUrl({
				salary: salaryStr,
				shiftStart: shiftStart,
				shiftEnd: shiftEnd,
				type: dayType,
			});
		}
	}, [searchParams, updateUrl, salaryStr, shiftStart, shiftEnd, dayType]);

	// Core computations
	const monthlySalary = parseFloat(salaryStr) || 0;
	const dailyRate = monthlySalary / 21.6667; // Standard working days
	const hourlyRate = dailyRate / 8;

	const shiftStartNum = parseInt(shiftStart, 10);
	const shiftEndNum = parseInt(shiftEnd, 10);

	const totalWorkHours = calculateTotalWorkHours(shiftStartNum, shiftEndNum);
	const ndHours = calculateNDHours(shiftStartNum, shiftEndNum, totalWorkHours);
	const regularHours = totalWorkHours - ndHours;

	const dayMultiplier = DAY_MULTIPLIERS[dayType];

	// Base pay: all hours × hourly rate × day multiplier
	const basePay = totalWorkHours * hourlyRate * dayMultiplier;

	// ND premium: ND hours × hourly rate × day multiplier × 10%
	const ndPremium = ndHours * hourlyRate * dayMultiplier * ND_PREMIUM_RATE;

	// Holiday/Rest Day premium is already baked into the multiplier via basePay
	// The "holiday premium" line shows how much MORE the user earns vs. a regular day
	const regularDayPay = totalWorkHours * hourlyRate * 1.0;
	const holidayPremium = basePay - regularDayPay;

	const totalShiftPay = basePay + ndPremium;

	const formatCurrency = (amount: number) => {
		return new Intl.NumberFormat("en-PH", {
			style: "currency",
			currency: "PHP",
		}).format(amount);
	};

	const chartData = [
		{
			name: "Base Pay",
			value: basePay - holidayPremium,
			color: "var(--primary)",
		},
		{ name: "Holiday Premium", value: holidayPremium, color: "#f57c00" },
		{ name: "ND Premium", value: ndPremium, color: "#7c4dff" },
	].filter((item) => item.value > 0);

	return (
		<ToolLayout maxWidth="1200px">
			<ToolHeader
				title="BPO Night Differential & Overtime Calculator (2026)"
				subtitle="Calculate your exact night differential, overtime, and holiday pay for your BPO shift."
				adSlotId="1234567890"
			/>

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
						{t("detailsTitle")}
					</h2>

					{/* Monthly Salary Input with Slider */}
					<div className="form-group" style={{ marginBottom: "20px" }}>
						<div style={{ display: "flex", justifyContent: "space-between" }}>
							<label className="form-label" htmlFor="bpo-salary">
								{t("salaryLabel")}
							</label>
							<strong style={{ color: "var(--primary)" }}>
								{formatCurrency(monthlySalary)}
							</strong>
						</div>
						<input
							type="range"
							min="10000"
							max="150000"
							step="1000"
							value={salaryStr}
							onChange={(e) => {
								setSalaryStr(e.target.value);
								updateUrl({ salary: e.target.value });
							}}
							style={{
								width: "100%",
								accentColor: "var(--primary)",
								marginBottom: "8px",
							}}
						/>
						<input
							type="number"
							id="bpo-salary"
							className="form-control"
							value={salaryStr}
							onChange={(e) => {
								setSalaryStr(e.target.value);
								updateUrl({ salary: e.target.value });
							}}
							min="0"
							step="any"
							placeholder="e.g., 25000"
							style={{ fontSize: "14px" }}
						/>
						<span className="form-hint">{t("salaryHint")}</span>
					</div>

					<div className="form-group" style={{ marginBottom: "16px" }}>
						<label className="form-label" htmlFor="bpo-shift-start">
							{t("shiftStartLabel")}
						</label>
						<select
							id="bpo-shift-start"
							className="form-control"
							value={shiftStart}
							onChange={(e) => {
								setShiftStart(e.target.value);
								updateUrl({ shiftStart: e.target.value });
							}}
						>
							{TIME_OPTIONS.map((opt) => (
								<option key={`start-${opt.value}`} value={opt.value}>
									{opt.label}
								</option>
							))}
						</select>
					</div>

					<div className="form-group" style={{ marginBottom: "16px" }}>
						<label className="form-label" htmlFor="bpo-shift-end">
							{t("shiftEndLabel")}
						</label>
						<select
							id="bpo-shift-end"
							className="form-control"
							value={shiftEnd}
							onChange={(e) => {
								setShiftEnd(e.target.value);
								updateUrl({ shiftEnd: e.target.value });
							}}
						>
							{TIME_OPTIONS.map((opt) => (
								<option key={`end-${opt.value}`} value={opt.value}>
									{opt.label}
								</option>
							))}
						</select>
					</div>

					<div className="form-group" style={{ marginBottom: "20px" }}>
						<label className="form-label" htmlFor="bpo-day-type">
							{t("dayTypeLabel")}
						</label>
						<select
							id="bpo-day-type"
							className="form-control"
							value={dayType}
							onChange={(e) => {
								const val = e.target.value as DayType;
								setDayType(val);
								updateUrl({ type: val });
							}}
						>
							<option value="regular">{t("dayRegular")}</option>
							<option value="rest">{t("dayRest")}</option>
							<option value="special">{t("daySpecial")}</option>
							<option value="specialRest">{t("daySpecialRest")}</option>
							<option value="regularHoliday">{t("dayRegularHoliday")}</option>
							<option value="regularHolidayRest">
								{t("dayRegularHolidayRest")}
							</option>
						</select>
					</div>

					{/* Explainer Card */}
					<div
						className="card"
						style={{
							backgroundColor: "var(--bg-color)",
							border: "1px solid var(--border-color)",
							borderLeft: "4px solid #7c4dff",
							marginTop: "16px",
						}}
					>
						<h3
							style={{
								fontSize: "14px",
								marginBottom: "8px",
								color: "#7c4dff",
								fontWeight: 600,
							}}
						>
							️ What is Night Differential?
						</h3>
						<p
							style={{
								fontSize: "13px",
								color: "var(--text-secondary)",
								lineHeight: 1.6,
								margin: 0,
							}}
						>
							Under Philippine Labor Law (Art. 86), employees working between{" "}
							<strong>10:00 PM and 6:00 AM</strong> are entitled to an
							additional <strong>10% premium</strong> on top of their regular
							hourly rate. This applies to all employment types, including BPO
							and call center workers.
						</p>
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
						{t("resultsTitle")}
					</h2>

					{/* Hourly Rate */}
					<div
						style={{
							display: "flex",
							justifyContent: "space-between",
							marginBottom: "12px",
							fontSize: "14px",
						}}
					>
						<span style={{ color: "var(--text-secondary)" }}>
							{t("basicHourlyRate")}
						</span>
						<strong>{formatCurrency(hourlyRate)}</strong>
					</div>

					{/* Total Hours */}
					<div
						style={{
							display: "flex",
							justifyContent: "space-between",
							marginBottom: "12px",
							fontSize: "14px",
						}}
					>
						<span style={{ color: "var(--text-secondary)" }}>
							{t("totalHours")}
						</span>
						<strong>{totalWorkHours}h</strong>
					</div>

					{/* ND Hours */}
					<div
						style={{
							display: "flex",
							justifyContent: "space-between",
							marginBottom: "16px",
							fontSize: "14px",
						}}
					>
						<span style={{ color: "var(--text-secondary)" }}>
							{t("ndHours")}
						</span>
						<strong style={{ color: "#7c4dff" }}>{ndHours}h</strong>
					</div>

					{/* Breakdown Section */}
					<div
						style={{
							margin: "16px 0",
							padding: "16px 0",
							borderTop: "1px dashed var(--border-color)",
							borderBottom: "1px dashed var(--border-color)",
						}}
					>
						<h3
							style={{
								fontSize: "14px",
								color: "var(--text-secondary)",
								marginBottom: "12px",
								textTransform: "uppercase",
							}}
						>
							Pay Breakdown
						</h3>

						<div
							style={{
								display: "flex",
								justifyContent: "space-between",
								marginBottom: "8px",
								fontSize: "14px",
							}}
						>
							<span>{t("basePay")}</span>
							<span>{formatCurrency(basePay)}</span>
						</div>

						{holidayPremium > 0 && (
							<div
								style={{
									display: "flex",
									justifyContent: "space-between",
									marginBottom: "8px",
									fontSize: "14px",
								}}
							>
								<span style={{ color: "#f57c00" }}>{t("holidayPremium")}</span>
								<span style={{ color: "#f57c00" }}>
									+ {formatCurrency(holidayPremium)}
								</span>
							</div>
						)}

						<div
							style={{
								display: "flex",
								justifyContent: "space-between",
								marginBottom: "8px",
								fontSize: "14px",
							}}
						>
							<span style={{ color: "#7c4dff" }}>{t("ndPremium")}</span>
							<span style={{ color: "#7c4dff" }}>
								+ {formatCurrency(ndPremium)}
							</span>
						</div>
					</div>

					{/* Total */}
					<div
						style={{
							display: "flex",
							justifyContent: "space-between",
							marginTop: "16px",
							paddingTop: "16px",
							borderTop: "2px solid var(--border-color)",
							fontSize: "24px",
							fontWeight: 700,
							color: "var(--text-primary)",
						}}
					>
						<span>{t("totalShiftPay")}</span>
						<span style={{ color: "var(--primary)" }}>
							{formatCurrency(totalShiftPay)}
						</span>
					</div>

					{/* Visual Shift Timeline */}
					<div
						style={{
							marginTop: "24px",
							padding: "16px",
							borderRadius: "8px",
							border: "1px solid var(--border-color)",
							backgroundColor: "var(--bg-color)",
						}}
					>
						<h3
							style={{
								fontSize: "14px",
								marginBottom: "12px",
								color: "var(--text-secondary)",
							}}
						>
							Shift Timeline
						</h3>
						<div
							style={{
								display: "flex",
								borderRadius: "6px",
								overflow: "hidden",
								height: "32px",
								fontSize: "11px",
								fontWeight: 600,
							}}
						>
							{totalWorkHours > 0 &&
								Array.from({ length: totalWorkHours }).map((_, i) => {
									const hour = (shiftStartNum + i) % 24;
									const isND = hour >= ND_START || hour < ND_END;
									const ampm = hour < 12 ? "a" : "p";
									const displayHour =
										hour === 0 ? 12 : hour > 12 ? hour - 12 : hour;
									return (
										<div
											key={i}
											style={{
												flex: 1,
												backgroundColor: isND ? "#7c4dff" : "var(--primary)",
												color: "white",
												display: "flex",
												alignItems: "center",
												justifyContent: "center",
												borderRight:
													i < totalWorkHours - 1
														? "1px solid rgba(255,255,255,0.3)"
														: "none",
											}}
											title={`${displayHour}${ampm} — ${isND ? "Night Differential" : "Regular"}`}
										>
											{totalWorkHours <= 12 ? `${displayHour}${ampm}` : ""}
										</div>
									);
								})}
						</div>
						<div
							style={{
								display: "flex",
								gap: "16px",
								marginTop: "12px",
								fontSize: "13px",
								fontWeight: 500,
								color: "var(--text-secondary)",
							}}
						>
							<span style={{ display: "flex", alignItems: "center" }}>
								<span
									style={{
										display: "inline-block",
										width: "12px",
										height: "12px",
										borderRadius: "2px",
										backgroundColor: "var(--primary)",
										marginRight: "6px",
									}}
								/>
								Regular ({regularHours}h)
							</span>
							<span style={{ display: "flex", alignItems: "center" }}>
								<span
									style={{
										display: "inline-block",
										width: "12px",
										height: "12px",
										borderRadius: "2px",
										backgroundColor: "#7c4dff",
										marginRight: "6px",
									}}
								/>
								Night Diff ({ndHours}h)
							</span>
						</div>
					</div>

					{/* Chart */}
					{mounted && chartData.length > 0 && (
						<div style={{ marginTop: "24px" }}>
							<h3
								style={{
									fontSize: "16px",
									marginBottom: "16px",
									color: "var(--text-primary)",
								}}
							>
								Pay Composition
							</h3>
							<ResponsiveContainer width="100%" height={200}>
								<BarChart data={chartData} layout="vertical">
									<XAxis type="number" hide />
									<YAxis
										type="category"
										dataKey="name"
										width={120}
										tick={{ fontSize: 12, fill: "var(--text-secondary)" }}
										axisLine={false}
										tickLine={false}
									/>
									<Tooltip
										contentStyle={{
											backgroundColor: "var(--surface-color)",
											borderColor: "var(--border-color)",
											borderRadius: "var(--border-radius-sm)",
											color: "var(--text-primary)",
										}}
										itemStyle={{ color: "var(--text-primary)" }}
										labelStyle={{ color: "var(--text-secondary)" }}
										formatter={(value) => formatCurrency(Number(value))}
									/>
									<Bar dataKey="value" radius={[0, 4, 4, 0]}>
										{chartData.map((entry, index) => (
											<Cell key={`cell-${index}`} fill={entry.color} />
										))}
									</Bar>
								</BarChart>
							</ResponsiveContainer>
						</div>
					)}

					<p
						style={{
							fontSize: "12px",
							color: "var(--text-secondary)",
							marginTop: "16px",
							fontStyle: "italic",
						}}
					>
						* Based on DOLE Labor Code Art. 86-87, Art. 93-94. Rates are
						per-shift estimates. Actual payslip may vary based on company
						policy.
					</p>
				</div>
			</div>
		</ToolLayout>
	);
}
