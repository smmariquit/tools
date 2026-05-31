"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import {
	Cell,
	Legend,
	Pie,
	PieChart,
	ResponsiveContainer,
	Tooltip,
} from "recharts";
import ToolFooter from "../../components/ToolFooter";
import InteractiveSlider from "../components/InteractiveSlider";
import TipCard from "../components/TipCard";
import ToolHeader from "../components/ToolHeader";
import ToolLayout from "../components/ToolLayout";

export default function BackpayClient() {
	const t = useTranslations("BackpayCalculator");
	const router = useRouter();
	const pathname = usePathname();
	const searchParams = useSearchParams();

	const [mounted, setMounted] = useState(false);
	const [salary, setSalary] = useState(
		parseFloat(searchParams.get("salary") || "30000"),
	);
	const [daysWorked, setDaysWorked] = useState(
		parseFloat(searchParams.get("days") || "0"),
	);
	const [monthsWorked, setMonthsWorked] = useState(
		parseFloat(searchParams.get("months") || "6"),
	);
	const [unusedLeaves, setUnusedLeaves] = useState(
		parseFloat(searchParams.get("leaves") || "0"),
	);
	const [deductions, setDeductions] = useState(
		parseFloat(searchParams.get("deductions") || "0"),
	);

	useEffect(() => {
		setMounted(true);
	}, []);

	const updateUrl = (updates: Record<string, string>) => {
		const newSearchParams = new URLSearchParams(searchParams.toString());
		for (const [key, value] of Object.entries(updates)) {
			if (value) {
				newSearchParams.set(key, value);
			} else {
				newSearchParams.delete(key);
			}
		}
		router.replace(`${pathname}?${newSearchParams.toString()}`, {
			scroll: false,
		});
	};

	// Computations
	const dailyRate = salary / 21.75; // Standard DOLE divisor (approximate average working days/month)
	const unpaidSalary = dailyRate * daysWorked;
	const prorated13th = (salary * monthsWorked) / 12;
	const leaveValue = dailyRate * unusedLeaves;
	const totalBackpay = unpaidSalary + prorated13th + leaveValue - deductions;

	const chartData = [
		{ name: t("unpaidSalary"), value: unpaidSalary, color: "var(--primary)" },
		{ name: t("prorated13thAmount"), value: prorated13th, color: "#4caf50" },
		{ name: t("leaveValue"), value: leaveValue, color: "#ff9800" },
	].filter((item) => item.value > 0);

	const formatCurrency = (val: number) => {
		return (
			"₱" +
			val.toLocaleString("en-US", {
				minimumFractionDigits: 2,
				maximumFractionDigits: 2,
			})
		);
	};

	return (
		<ToolLayout>
			<ToolHeader
				title={t("title")}
				subtitle={t("subtitle")}
				adSlotId="backpay-top"
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
						{t("salaryDetails")}
					</h2>

					<InteractiveSlider
						label={t("monthlySalary")}
						value={salary}
						min={0}
						max={150000}
						step={1000}
						onChange={(val) => {
							setSalary(val);
							updateUrl({ salary: val.toString() });
						}}
						hint={t("monthlySalaryHint")}
					/>

					<div className="form-group" style={{ marginTop: "16px" }}>
						<label className="form-label" htmlFor="days-worked">
							{t("daysWorked")}
						</label>
						<input
							id="days-worked"
							type="number"
							className="form-control"
							value={daysWorked || ""}
							onChange={(e) => {
								const val = parseFloat(e.target.value) || 0;
								setDaysWorked(val);
								updateUrl({ days: val.toString() });
							}}
							min="0"
							step="0.5"
						/>
						<span className="form-hint">{t("daysWorkedHint")}</span>
					</div>

					<h2
						style={{
							fontSize: "18px",
							marginTop: "32px",
							marginBottom: "16px",
							borderBottom: "1px solid var(--border-color)",
							paddingBottom: "8px",
						}}
					>
						{t("prorated13th")}
					</h2>

					<div className="form-group">
						<label className="form-label" htmlFor="months-worked">
							{t("monthsWorked")}
						</label>
						<input
							id="months-worked"
							type="number"
							className="form-control"
							value={monthsWorked || ""}
							onChange={(e) => {
								const val = parseFloat(e.target.value) || 0;
								setMonthsWorked(Math.min(12, val));
								updateUrl({ months: Math.min(12, val).toString() });
							}}
							min="0"
							max="12"
							step="0.5"
						/>
						<span className="form-hint">{t("monthsWorkedHint")}</span>
					</div>

					<h2
						style={{
							fontSize: "18px",
							marginTop: "32px",
							marginBottom: "16px",
							borderBottom: "1px solid var(--border-color)",
							paddingBottom: "8px",
						}}
					>
						{t("leaveConversion")}
					</h2>
					<div className="form-group">
						<label className="form-label" htmlFor="unused-leaves">
							{t("unusedLeaves")}
						</label>
						<input
							id="unused-leaves"
							type="number"
							className="form-control"
							value={unusedLeaves || ""}
							onChange={(e) => {
								const val = parseFloat(e.target.value) || 0;
								setUnusedLeaves(val);
								updateUrl({ leaves: val.toString() });
							}}
							min="0"
							step="0.5"
						/>
						<span className="form-hint">{t("unusedLeavesHint")}</span>
					</div>

					<h2
						style={{
							fontSize: "18px",
							marginTop: "32px",
							marginBottom: "16px",
							borderBottom: "1px solid var(--border-color)",
							paddingBottom: "8px",
						}}
					>
						{t("otherDeductions")}
					</h2>
					<div className="form-group">
						<label className="form-label" htmlFor="deductions">
							{t("totalDeductions")}
						</label>
						<input
							id="deductions"
							type="number"
							className="form-control"
							value={deductions || ""}
							onChange={(e) => {
								const val = parseFloat(e.target.value) || 0;
								setDeductions(val);
								updateUrl({ deductions: val.toString() });
							}}
							min="0"
						/>
						<span className="form-hint">{t("totalDeductionsHint")}</span>
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

					<div
						style={{
							display: "flex",
							flexDirection: "column",
							gap: "12px",
							marginBottom: "24px",
						}}
					>
						<div style={{ display: "flex", justifyContent: "space-between" }}>
							<span>{t("unpaidSalary")}</span>
							<strong style={{ color: "var(--primary)" }}>
								{formatCurrency(unpaidSalary)}
							</strong>
						</div>
						<div style={{ display: "flex", justifyContent: "space-between" }}>
							<span>{t("prorated13thAmount")}</span>
							<strong style={{ color: "#4caf50" }}>
								{formatCurrency(prorated13th)}
							</strong>
						</div>
						<div style={{ display: "flex", justifyContent: "space-between" }}>
							<span>{t("leaveValue")}</span>
							<strong style={{ color: "#ff9800" }}>
								{formatCurrency(leaveValue)}
							</strong>
						</div>
						<div
							style={{
								display: "flex",
								justifyContent: "space-between",
								color: "#f44336",
							}}
						>
							<span>{t("otherDeductions")}</span>
							<strong>- {formatCurrency(deductions)}</strong>
						</div>

						<div
							style={{
								display: "flex",
								justifyContent: "space-between",
								alignItems: "center",
								marginTop: "12px",
								paddingTop: "16px",
								borderTop: "1px dashed var(--border-color)",
							}}
						>
							<span style={{ fontSize: "16px", fontWeight: "bold" }}>
								{t("totalBackpay")}
							</span>
							<strong style={{ fontSize: "24px", color: "var(--primary)" }}>
								{formatCurrency(Math.max(0, totalBackpay))}
							</strong>
						</div>
					</div>

					{mounted && chartData.length > 0 && (
						<div style={{ height: "250px", width: "100%", marginTop: "24px" }}>
							<ResponsiveContainer width="100%" height="100%">
								<PieChart>
									<Pie
										data={chartData}
										cx="50%"
										cy="50%"
										innerRadius={60}
										outerRadius={80}
										paddingAngle={5}
										dataKey="value"
									>
										{chartData.map((entry, index) => (
											<Cell key={`cell-${index}`} fill={entry.color} />
										))}
									</Pie>
									<Tooltip
										formatter={(value: any) => formatCurrency(Number(value))}
										contentStyle={{
											backgroundColor: "var(--surface-color)",
											borderColor: "var(--border-color)",
											color: "var(--text-primary)",
											borderRadius: "8px",
										}}
									/>
									<Legend />
								</PieChart>
							</ResponsiveContainer>
						</div>
					)}

					<TipCard title="Important Note">
						Backpay typically takes 30 days to process according to DOLE
						regulations. The exact daily rate computation might differ depending
						on your company's divisor (e.g., 261, 313, or 365 days). This
						calculator uses DOLE's standard 21.75 average days/month divisor for
						estimation.
					</TipCard>
				</div>
			</div>

			<ToolFooter currentPath="/backpay-calculator" />
		</ToolLayout>
	);
}
