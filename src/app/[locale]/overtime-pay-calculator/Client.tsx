"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";
import { useId, useState } from "react";
import {
	getHolidays,
	getHolidayByDate,
	payCategoryForHoliday,
	type PayCategory,
} from "@/data/holidays";
import InteractiveSlider from "../components/InteractiveSlider";
import TipCard from "../components/TipCard";
import ToolHeader from "../components/ToolHeader";
import ToolLayout from "../components/ToolLayout";

const HOLIDAYS = getHolidays();

function categoryToOvertimeDayType(category: PayCategory): string {
	switch (category) {
		case "regular-holiday":
			return "regular";
		case "special-non-working":
			return "special";
		case "ordinary":
			return "ordinary";
	}
}

function formatHolidayDate(iso: string, locale: string) {
	const [y, m, d] = iso.split("-").map(Number);
	return new Date(y, m - 1, d).toLocaleDateString(locale, {
		month: "short",
		day: "numeric",
	});
}

export default function OvertimePayClient() {
	const t = useTranslations("OvertimePay");
	const th = useTranslations("Holidays");
	const locale = useLocale();
	const router = useRouter();
	const pathname = usePathname();
	const searchParams = useSearchParams();
	const selectWorkDaysId = useId();
	const selectDayTypeId = useId();
	const selectHolidayId = useId();

	const [monthlySalary, setMonthlySalary] = useState(
		parseFloat(searchParams.get("salary") || "25000"),
	);
	const [workDays, setWorkDays] = useState(
		parseFloat(searchParams.get("days") || "21.75"),
	);
	const [dayType, setDayType] = useState(
		searchParams.get("type") || "ordinary",
	);
	const [selectedHolidayDate, setSelectedHolidayDate] = useState(
		searchParams.get("holiday") || "",
	);
	const [hoursWorked, setHoursWorked] = useState(
		parseFloat(searchParams.get("hours") || "10"),
	);

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

	// DOLE Multipliers computation
	// Basic Daily Rate = Monthly Salary / Days Divisor
	const dailyRate = monthlySalary / workDays;
	const hourlyRate = dailyRate / 8;

	let first8Multiplier = 1.0;
	let otMultiplier = 1.25; // Base OT multiplier is +25% on ordinary days

	switch (dayType) {
		case "ordinary":
			first8Multiplier = 1.0;
			otMultiplier = 1.25;
			break;
		case "rest":
			first8Multiplier = 1.3;
			otMultiplier = 1.3 * 1.3; // 1.69
			break;
		case "special":
			first8Multiplier = 1.3;
			otMultiplier = 1.3 * 1.3; // 1.69
			break;
		case "special_rest":
			first8Multiplier = 1.5;
			otMultiplier = 1.5 * 1.3; // 1.95
			break;
		case "regular":
			first8Multiplier = 2.0;
			otMultiplier = 2.0 * 1.3; // 2.60
			break;
		case "regular_rest":
			first8Multiplier = 2.6;
			otMultiplier = 2.6 * 1.3; // 3.38
			break;
	}

	const hoursRegular = Math.min(hoursWorked, 8);
	const hoursOT = Math.max(0, hoursWorked - 8);

	const payRegular = hoursRegular * hourlyRate * first8Multiplier;
	const payOT = hoursOT * hourlyRate * otMultiplier;
	const totalPay = payRegular + payOT;

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
		<ToolLayout maxWidth="1200px">
			<ToolHeader
				title={t("title")}
				subtitle={t("subtitle")}
				adSlotId="overtime-top"
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
						{t("inputDetails")}
					</h2>

					<InteractiveSlider
						label={t("monthlySalary")}
						value={monthlySalary}
						min={10000}
						max={200000}
						step={1000}
						onChange={(val) => {
							setMonthlySalary(val);
							updateUrl({ salary: val.toString() });
						}}
					/>

					<div className="form-group" style={{ marginTop: "32px" }}>
						<label className="form-label" htmlFor={selectWorkDaysId}>
							{t("workDays")}
						</label>
						<select
							id={selectWorkDaysId}
							className="form-control"
							value={workDays}
							onChange={(e) => {
								setWorkDays(parseFloat(e.target.value));
								updateUrl({ days: e.target.value });
							}}
						>
							<option value="21.75">{t("workDays5")}</option>
							<option value="26">{t("workDays6")}</option>
						</select>
					</div>

					<div className="form-group" style={{ marginTop: "32px" }}>
						<label className="form-label" htmlFor={selectHolidayId}>
							{th("pickLabel")}
						</label>
						<select
							id={selectHolidayId}
							className="form-control"
							value={selectedHolidayDate}
							onChange={(e) => {
								const iso = e.target.value;
								setSelectedHolidayDate(iso);
								const holiday = iso ? getHolidayByDate(iso) : undefined;
								if (holiday) {
									const val = categoryToOvertimeDayType(
										payCategoryForHoliday(holiday),
									);
									setDayType(val);
									updateUrl({ holiday: iso, type: val });
								} else {
									updateUrl({ holiday: "" });
								}
							}}
						>
							<option value="">{th("pickPlaceholder")}</option>
							{HOLIDAYS.map((h) => (
								<option key={h.date} value={h.date}>
									{formatHolidayDate(h.date, locale)} — {th(`names.${h.key}`)}
									{h.approximate ? ` ${th("approximate")}` : ""}
								</option>
							))}
						</select>
						<p className="form-hint" style={{ marginTop: "4px" }}>
							{th("sourceNote")}
						</p>
					</div>

					<div className="form-group" style={{ marginTop: "32px" }}>
						<label className="form-label" htmlFor={selectDayTypeId}>
							{t("dayType")}
						</label>
						<select
							id={selectDayTypeId}
							className="form-control"
							value={dayType}
							onChange={(e) => {
								setDayType(e.target.value);
								setSelectedHolidayDate("");
								updateUrl({ type: e.target.value, holiday: "" });
							}}
						>
							<option value="ordinary">{t("ordinaryDay")}</option>
							<option value="rest">{t("restDay")}</option>
							<option value="special">{t("specialHoliday")}</option>
							<option value="special_rest">{t("specialHolidayRestDay")}</option>
							<option value="regular">{t("regularHoliday")}</option>
							<option value="regular_rest">{t("regularHolidayRestDay")}</option>
						</select>
					</div>

					<div style={{ marginTop: "32px" }}>
						<InteractiveSlider
							label={t("hoursWorked")}
							value={hoursWorked}
							min={1}
							max={24}
							step={0.5}
							onChange={(val) => {
								setHoursWorked(val);
								updateUrl({ hours: val.toString() });
							}}
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
						{t("resultsTitle")}
					</h2>

					<div
						style={{
							display: "flex",
							justifyContent: "space-between",
							marginBottom: "12px",
							fontSize: "15px",
						}}
					>
						<span style={{ color: "var(--text-secondary)" }}>
							{t("hourlyRate")}
						</span>
						<strong style={{ color: "var(--text-primary)" }}>
							{formatCurrency(hourlyRate)} / hr
						</strong>
					</div>

					<div
						style={{
							display: "flex",
							justifyContent: "space-between",
							marginBottom: "12px",
							fontSize: "15px",
						}}
					>
						<span style={{ color: "var(--text-secondary)" }}>
							{t("regularPay")} ({hoursRegular} hrs) @{" "}
							{Math.round(first8Multiplier * 100)}%
						</span>
						<strong style={{ color: "var(--text-primary)" }}>
							{formatCurrency(payRegular)}
						</strong>
					</div>

					<div
						style={{
							display: "flex",
							justifyContent: "space-between",
							marginBottom: "24px",
							fontSize: "15px",
						}}
					>
						<span style={{ color: "var(--text-secondary)" }}>
							{t("otPay")} ({hoursOT} hrs) @ {Math.round(otMultiplier * 100)}%
						</span>
						<strong style={{ color: "#4caf50" }}>
							+ {formatCurrency(payOT)}
						</strong>
					</div>

					<div
						style={{
							marginBottom: "24px",
							padding: "24px",
							backgroundColor: "rgba(13, 71, 161, 0.05)",
							border: "1px solid var(--primary)",
							borderRadius: "8px",
							textAlign: "center",
						}}
					>
						<span
							style={{
								display: "block",
								fontSize: "16px",
								color: "var(--text-secondary)",
								marginBottom: "8px",
							}}
						>
							{t("totalPay")}
						</span>
						<strong
							style={{
								display: "block",
								fontSize: "36px",
								color: "var(--primary)",
							}}
						>
							{formatCurrency(totalPay)}
						</strong>
					</div>

					<TipCard title="DOLE Compliance">{t("note")}</TipCard>
				</div>
			</div>
		</ToolLayout>
	);
}
