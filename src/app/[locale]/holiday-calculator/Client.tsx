"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";
import { useState } from "react";
import {
	getHolidays,
	getHolidayByDate,
	payCategoryForHoliday,
} from "@/data/holidays";
import BackButton from "../../components/BackButton";
import ToolEyebrow from "../../components/doodle/ToolEyebrow";
import ToolIllustration from "../../components/illustrations/ToolIllustration";
import AdBanner from "../components/AdBanner";
import ToolLayout from "../components/ToolLayout";

// Holidays with an actual DOLE premium (special working days carry none).
const PREMIUM_HOLIDAYS = getHolidays().filter(
	(h) => payCategoryForHoliday(h) !== "ordinary",
);

function formatHolidayDate(iso: string, locale: string) {
	const [y, m, d] = iso.split("-").map(Number);
	return new Date(y, m - 1, d).toLocaleDateString(locale, {
		month: "short",
		day: "numeric",
	});
}

export default function HolidayClient() {
	const t = useTranslations("HolidayCalculator");
	const th = useTranslations("Holidays");
	const locale = useLocale();
	const router = useRouter();
	const pathname = usePathname();
	const searchParams = useSearchParams();

	const [dailyRateStr, setDailyRateStr] = useState(
		searchParams.get("rate") || "1000",
	);
	const [dayType, setDayType] = useState<
		"regular" | "special" | "regularRest" | "specialRest"
	>(
		(searchParams.get("type") as
			| "regular"
			| "special"
			| "regularRest"
			| "specialRest") || "regular",
	);
	const [didWork, setDidWork] = useState<"yes" | "no">(
		(searchParams.get("worked") as "yes" | "no") || "yes",
	);
	const [hoursWorkedStr, setHoursWorkedStr] = useState(
		searchParams.get("hours") || "8",
	);
	const [selectedHolidayDate, setSelectedHolidayDate] = useState(
		searchParams.get("holiday") || "",
	);

	const updateUrl = (updates: Record<string, string>) => {
		const newSearchParams = new URLSearchParams(searchParams.toString());
		for (const [key, value] of Object.entries(updates)) {
			if (value) newSearchParams.set(key, value);
			else newSearchParams.delete(key);
		}
		router.replace(`${pathname}?${newSearchParams.toString()}`, {
			scroll: false,
		});
	};

	const dailyRate = parseFloat(dailyRateStr) || 0;
	const hoursWorked = parseFloat(hoursWorkedStr) || 0;
	const hourlyRate = dailyRate / 8;

	let multiplier = 1;
	let computedPay = 0;
	let breakdown = "";

	// DOLE Holiday Pay Logic
	if (didWork === "no") {
		if (dayType === "regular" || dayType === "regularRest") {
			multiplier = 1.0; // 100%
			computedPay = dailyRate;
			breakdown = t("ruleUnworkedRegular");
		} else {
			multiplier = 0.0; // 0%
			computedPay = 0;
			breakdown = t("ruleUnworkedSpecial");
		}
	} else {
		// They worked
		let baseMultiplier = 1;

		switch (dayType) {
			case "regular":
				baseMultiplier = 2.0; // 200%
				breakdown = t("ruleRegular");
				break;
			case "special":
				baseMultiplier = 1.3; // 130%
				breakdown = t("ruleSpecial");
				break;
			case "regularRest":
				baseMultiplier = 2.6; // 260%
				breakdown = t("ruleRegularRest");
				break;
			case "specialRest":
				baseMultiplier = 1.5; // 150%
				breakdown = t("ruleSpecialRest");
				break;
		}

		// Overtime logic (>8 hours)
		if (hoursWorked <= 8) {
			computedPay = hourlyRate * hoursWorked * baseMultiplier;
		} else {
			// First 8 hours
			const regularPay = hourlyRate * 8 * baseMultiplier;
			// Overtime hours (extra 30% on top of the holiday hourly rate)
			const otHours = hoursWorked - 8;
			const otRate = hourlyRate * baseMultiplier * 1.3;
			const otPay = otHours * otRate;

			computedPay = regularPay + otPay;
			breakdown += t("otPremium", { hours: otHours });
		}
		// multiplier = baseMultiplier; (removed to pass ESLint no-unused-vars)
	}

	const formatCurrency = (amount: number) => {
		return new Intl.NumberFormat("en-PH", {
			style: "currency",
			currency: "PHP",
		}).format(amount);
	};

	return (
		<ToolLayout maxWidth="1200px">
			<div style={{ width: "100%", margin: "0 auto" }}>
				<div style={{ marginBottom: "24px" }}>
					<BackButton style={{ marginBottom: "16px" }}>
						{t("backToTools")}
					</BackButton>
					<ToolIllustration />
					<ToolEyebrow />
					<h1 className="page-title">{t("title")}</h1>
					<p className="page-subtitle">{t("subtitle")}</p>
				</div>

				<AdBanner dataAdSlot="holiday-top" />

				<div className="tool-grid" style={{ marginTop: "24px" }}>
					{/* Input Card */}
					<div className="card" style={{ alignSelf: "start" }}>
						<h2
							style={{
								fontSize: "18px",
								marginBottom: "16px",
								borderBottom: "1px solid var(--border-color)",
								paddingBottom: "8px",
							}}
						>
							{t("workDetails")}
						</h2>

						<div className="form-group">
							<label className="form-label" htmlFor="dailyRate">
								{t("dailyRate")}
							</label>
							<input
								type="number"
								id="dailyRate"
								className="form-control"
								value={dailyRateStr}
								onChange={(e) => {
									setDailyRateStr(e.target.value);
									updateUrl({ rate: e.target.value });
								}}
								min="0"
							/>
						</div>

						<div className="form-group">
							<label className="form-label" htmlFor="holidayPick">
								{th("pickLabel")}
							</label>
							<select
								id="holidayPick"
								className="form-control"
								value={selectedHolidayDate}
								onChange={(e) => {
									const iso = e.target.value;
									setSelectedHolidayDate(iso);
									const holiday = iso ? getHolidayByDate(iso) : undefined;
									if (holiday) {
										const newType =
											payCategoryForHoliday(holiday) === "regular-holiday"
												? "regular"
												: "special";
										setDayType(newType);
										updateUrl({ holiday: iso, type: newType });
									} else {
										updateUrl({ holiday: "" });
									}
								}}
							>
								<option value="">{th("pickPlaceholder")}</option>
								{PREMIUM_HOLIDAYS.map((h) => (
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

						<div className="form-group" style={{ marginTop: "16px" }}>
							<label className="form-label" htmlFor="dayType">
								{t("holidayType")}
							</label>
							<select
								id="dayType"
								className="form-control"
								value={dayType}
								onChange={(e) => {
									const val = e.target.value as
										| "regular"
										| "special"
										| "regularRest"
										| "specialRest";
									setDayType(val);
									setSelectedHolidayDate("");
									updateUrl({ type: val, holiday: "" });
								}}
							>
								<option value="regular">{t("optRegular")}</option>
								<option value="special">{t("optSpecial")}</option>
								<option value="regularRest">{t("optRegularRest")}</option>
								<option value="specialRest">{t("optSpecialRest")}</option>
							</select>
						</div>

						<div className="form-group" style={{ marginTop: "16px" }}>
							<div className="form-label">{t("didWorkQuestion")}</div>
							<div style={{ display: "flex", gap: "16px", marginTop: "8px" }}>
								<label
									style={{
										display: "flex",
										alignItems: "center",
										gap: "8px",
										cursor: "pointer",
									}}
								>
									<input
										type="radio"
										name="didWork"
										value="yes"
										checked={didWork === "yes"}
										onChange={() => {
											setDidWork("yes");
											updateUrl({ worked: "yes" });
										}}
									/>{" "}
									{t("yes")}
								</label>
								<label
									style={{
										display: "flex",
										alignItems: "center",
										gap: "8px",
										cursor: "pointer",
									}}
								>
									<input
										type="radio"
										name="didWork"
										value="no"
										checked={didWork === "no"}
										onChange={() => {
											setDidWork("no");
											updateUrl({ worked: "no" });
										}}
									/>{" "}
									{t("noRestLeave")}
								</label>
							</div>
						</div>

						{didWork === "yes" && (
							<div className="form-group" style={{ marginTop: "16px" }}>
								<label className="form-label" htmlFor="hoursWorked">
									{t("hoursWorked")}
								</label>
								<input
									type="number"
									id="hoursWorked"
									className="form-control"
									value={hoursWorkedStr}
									onChange={(e) => {
										setHoursWorkedStr(e.target.value);
										updateUrl({ hours: e.target.value });
									}}
									min="1"
									max="24"
								/>
								<p className="form-hint" style={{ marginTop: "4px" }}>
									{t("overtimeHint")}
								</p>
							</div>
						)}
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
								marginBottom: "16px",
								padding: "16px",
								backgroundColor: "#fff8e1",
								borderRadius: "var(--border-radius-md)",
								border: "1px solid #ffecb3",
							}}
						>
							<div style={{ width: "100%", textAlign: "center" }}>
								<span
									style={{
										display: "block",
										fontSize: "12px",
										color: "#f57f17",
										textTransform: "uppercase",
										fontWeight: 600,
										marginBottom: "8px",
									}}
								>
									{t("totalHolidayPay")}
								</span>
								<strong
									style={{ fontSize: "42px", color: "#e65100", lineHeight: 1 }}
								>
									{formatCurrency(computedPay)}
								</strong>
							</div>
						</div>

						<div
							style={{
								fontSize: "14px",
								color: "var(--text-secondary)",
								textAlign: "center",
								lineHeight: "1.6",
							}}
						>
							<p>
								<strong>{t("ruleApplied")}</strong>
								<br />
								{breakdown}
							</p>
						</div>
					</div>
				</div>
			</div>
		</ToolLayout>
	);
}
