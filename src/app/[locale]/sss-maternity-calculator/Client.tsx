"use client";

import { useTranslations } from "next-intl";
import { useId } from "react";
import { calculateSSSMaternity } from "../../../core/calculators/sssMaternity";
import { useCalculatorState } from "../../../hooks/useCalculatorState";
import InteractiveSlider from "../components/InteractiveSlider";
import TipCard from "../components/TipCard";
import ToolHeader from "../components/ToolHeader";
import ToolLayout from "../components/ToolLayout";

export default function SSSMaternityClient() {
	const t = useTranslations("SSSMaternity");
	const selectTypeId = useId();

	const [state, updateState] = useCalculatorState(
		{ salary: 30000, type: "normal" },
		{ salary: parseFloat, type: String },
	);
	const { salary: monthlySalary, type: deliveryType } = state;

	const {
		adsc,
		days,
		benefit: maternityBenefit,
	} = calculateSSSMaternity(monthlySalary, deliveryType);

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
				adSlotId="maternity-top"
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
						min={4000}
						max={100000}
						step={1000}
						onChange={(val) => updateState({ salary: val })}
					/>
					<div
						style={{
							fontSize: "12px",
							color: "var(--text-tertiary)",
							marginTop: "8px",
							textAlign: "left",
						}}
					>
						{t("monthlySalaryHint")}
					</div>

					<div className="form-group" style={{ marginTop: "32px" }}>
						<label className="form-label" htmlFor={selectTypeId}>
							{t("deliveryType")}
						</label>
						<select
							id={selectTypeId}
							className="form-control"
							value={deliveryType}
							onChange={(e) => updateState({ type: e.target.value })}
						>
							<option value="normal">{t("typeNormal")}</option>
							<option value="solo-parent">{t("typeSoloParent")}</option>
							<option value="miscarriage">{t("typeMiscarriage")}</option>
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
							marginBottom: "12px",
							fontSize: "15px",
						}}
					>
						<span style={{ color: "var(--text-secondary)" }}>{t("adsc")}</span>
						<strong style={{ color: "var(--text-primary)" }}>
							{formatCurrency(adsc)}
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
							{t("daysAllocated")}
						</span>
						<strong style={{ color: "var(--text-primary)" }}>
							{days} days
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
							{t("maternityBenefit")}
						</span>
						<strong
							style={{
								display: "block",
								fontSize: "36px",
								color: "var(--primary)",
							}}
						>
							{formatCurrency(maternityBenefit)}
						</strong>
					</div>

					<TipCard title="SSS Eligibility">{t("note")}</TipCard>
				</div>
			</div>
		</ToolLayout>
	);
}
