"use client";

import { useTranslations } from "next-intl";
import { useId } from "react";
import { calculateSeparationPay } from "../../../core/calculators/separationPay";
import { useCalculatorState } from "../../../hooks/useCalculatorState";
import InteractiveSlider from "../components/InteractiveSlider";
import TipCard from "../components/TipCard";
import ToolHeader from "../components/ToolHeader";
import ToolLayout from "../components/ToolLayout";

export default function SeparationPayClient() {
	const t = useTranslations("SeparationPay");
	const selectReasonId = useId();

	// Default to 1 year ago for hire date
	const defaultHireDate = new Date();
	defaultHireDate.setFullYear(defaultHireDate.getFullYear() - 1);

	const [state, updateState] = useCalculatorState(
		{
			salary: 25000,
			start: defaultHireDate.toISOString().split("T")[0],
			end: new Date().toISOString().split("T")[0],
			reason: "redundancy",
		},
		{
			salary: parseFloat,
			start: String,
			end: String,
			reason: String,
		},
	);

	const {
		salary: monthlySalary,
		start: hireDate,
		end: separationDate,
		reason,
	} = state;

	const { yearsOfService, multiplier, totalPay } = calculateSeparationPay(
		monthlySalary,
		hireDate,
		separationDate,
		reason,
	);

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
						onChange={(val) => updateState({ salary: val })}
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
							onChange={(e) => updateState({ start: e.target.value })}
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
							onChange={(e) => updateState({ end: e.target.value })}
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
							onChange={(e) => updateState({ reason: e.target.value })}
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
		</ToolLayout>
	);
}
