"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { useId, useState } from "react";
import ToolFooter from "../../components/ToolFooter";
import InteractiveSlider from "../components/InteractiveSlider";
import TipCard from "../components/TipCard";
import ToolHeader from "../components/ToolHeader";
import ToolLayout from "../components/ToolLayout";

export default function SeparationPayClient() {
	const t = useTranslations("SeparationPay");
	const router = useRouter();
	const pathname = usePathname();
	const searchParams = useSearchParams();
	const selectReasonId = useId();

	// Default to 1 year ago for hire date
	const defaultHireDate = new Date();
	defaultHireDate.setFullYear(defaultHireDate.getFullYear() - 1);

	const [monthlySalary, setMonthlySalary] = useState(
		parseFloat(searchParams.get("salary") || "25000"),
	);
	const [hireDate, setHireDate] = useState(
		searchParams.get("start") || defaultHireDate.toISOString().split("T")[0],
	);
	const [separationDate, setSeparationDate] = useState(
		searchParams.get("end") || new Date().toISOString().split("T")[0],
	);
	const [reason, setReason] = useState(
		searchParams.get("reason") || "redundancy",
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

	// Logic for Years of Service
	const calculateYearsOfService = (start: string, end: string) => {
		const s = new Date(start);
		const e = new Date(end);
		if (e < s) return 0;

		let totalMonths =
			(e.getFullYear() - s.getFullYear()) * 12 + (e.getMonth() - s.getMonth());
		if (e.getDate() < s.getDate()) {
			totalMonths--;
		}

		if (totalMonths < 0) totalMonths = 0;

		const years = Math.floor(totalMonths / 12);
		const remainingMonths = totalMonths % 12;

		return remainingMonths >= 6 ? years + 1 : years;
	};

	const yearsOfService = calculateYearsOfService(hireDate, separationDate);

	// Multiplier logic
	const isOneMonthMultiplier = [
		"redundancy",
		"labor-saving",
		"impossible",
	].includes(reason);
	const multiplier = isOneMonthMultiplier ? 1 : 0.5;

	// Calculate Pay
	const calculatedPay = monthlySalary * yearsOfService * multiplier;
	// Minimum of 1 month salary for any separation pay according to DOLE
	const totalPay =
		yearsOfService > 0 ? Math.max(monthlySalary, calculatedPay) : 0;

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
				adSlotId="separation-top"
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
						<label className="form-label" htmlFor="hireDateInput">
							{t("hireDate")}
						</label>
						<input
							id="hireDateInput"
							type="date"
							className="form-control"
							value={hireDate}
							onChange={(e) => {
								setHireDate(e.target.value);
								updateUrl({ start: e.target.value });
							}}
						/>
					</div>

					<div className="form-group" style={{ marginTop: "16px" }}>
						<label className="form-label" htmlFor="separationDateInput">
							{t("separationDate")}
						</label>
						<input
							id="separationDateInput"
							type="date"
							className="form-control"
							value={separationDate}
							onChange={(e) => {
								setSeparationDate(e.target.value);
								updateUrl({ end: e.target.value });
							}}
						/>
					</div>

					<div className="form-group" style={{ marginTop: "32px" }}>
						<label className="form-label" htmlFor={selectReasonId}>
							{t("reason")}
						</label>
						<select
							id={selectReasonId}
							className="form-control"
							value={reason}
							onChange={(e) => {
								setReason(e.target.value);
								updateUrl({ reason: e.target.value });
							}}
						>
							<option value="redundancy">{t("reasonRedundancy")}</option>
							<option value="labor-saving">{t("reasonLaborSaving")}</option>
							<option value="impossible">{t("reasonImpossible")}</option>
							<option value="retrenchment">{t("reasonRetrenchment")}</option>
							<option value="closure">{t("reasonClosure")}</option>
							<option value="disease">{t("reasonDisease")}</option>
						</select>
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
							marginBottom: "4px",
							fontSize: "15px",
						}}
					>
						<span style={{ color: "var(--text-secondary)" }}>
							{t("yearsOfService")}
						</span>
						<strong style={{ color: "var(--text-primary)" }}>
							{yearsOfService} {yearsOfService === 1 ? "year" : "years"}
						</strong>
					</div>
					<div
						style={{
							fontSize: "12px",
							color: "var(--text-tertiary)",
							marginBottom: "16px",
							textAlign: "left",
						}}
					>
						{t("yearsOfServiceHint")}
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
							{t("multiplier")}
						</span>
						<strong style={{ color: "var(--text-primary)" }}>
							{multiplier === 1 ? "1 month" : "1/2 month"} per year
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
							{t("separationPay")}
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

					<TipCard title="Labor Code Compliant">{t("note")}</TipCard>
				</div>
			</div>

			<ToolFooter currentPath="/separation-pay-calculator" />
		</ToolLayout>
	);
}
