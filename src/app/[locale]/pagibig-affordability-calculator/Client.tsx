"use client";

import { useTranslations } from "next-intl";
import { useId } from "react";
import { calculatePagibigAffordability } from "../../../core/calculators/pagibigAffordability";
import { useCalculatorState } from "../../../hooks/useCalculatorState";
import InteractiveSlider from "../components/InteractiveSlider";
import TipCard from "../components/TipCard";
import ToolHeader from "../components/ToolHeader";
import ToolLayout from "../components/ToolLayout";

export default function PagibigAffordabilityClient() {
	const t = useTranslations("PagibigAffordability");
	const rateId = useId();

	const [state, updateState] = useCalculatorState(
		{ income: 35000, age: 30, rate: 6.25 },
		{ income: parseFloat, age: parseFloat, rate: parseFloat },
	);
	const { income: grossIncome, age, rate: interestRate } = state;

	const { maxTermYears, maxAmortization, maxLoanAmount } =
		calculatePagibigAffordability(grossIncome, age, interestRate);

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
				adSlotId="pagibig-affordability-top"
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
						label={t("grossIncome")}
						value={grossIncome}
						min={10000}
						max={300000}
						step={1000}
						onChange={(val) => updateState({ income: val })}
					/>

					<div style={{ marginTop: "32px" }}>
						<InteractiveSlider
							label={t("age")}
							value={age}
							min={18}
							max={70}
							step={1}
							onChange={(val) => updateState({ age: val })}
						/>
					</div>

					<div className="form-group" style={{ marginTop: "32px" }}>
						<label className="form-label" htmlFor={rateId}>
							{t("fixingPeriod")}
						</label>
						<select
							id={rateId}
							className="form-control"
							value={interestRate}
							onChange={(e) =>
								updateState({ rate: parseFloat(e.target.value) })
							}
						>
							<option value="5.75">1 Year Fixed (5.75%)</option>
							<option value="6.25">3 Years Fixed (6.25%)</option>
							<option value="6.50">5 Years Fixed (6.50%)</option>
							<option value="7.125">10 Years Fixed (7.125%)</option>
							<option value="7.75">15 Years Fixed (7.75%)</option>
						</select>
					</div>
					<div
						style={{
							fontSize: "12px",
							color: "var(--text-tertiary)",
							marginTop: "8px",
							textAlign: "left",
						}}
					>
						{t("fixingPeriodHint")}
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
							{t("maxTerm")}
						</span>
						<strong style={{ color: "var(--text-primary)" }}>
							{maxTermYears} {t("yearsSuffix")}
						</strong>
					</div>
					<div
						style={{
							fontSize: "12px",
							color: "var(--text-tertiary)",
							marginBottom: "24px",
							textAlign: "left",
						}}
					>
						{t("maxTermHint")}
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
							{t("maxAmortization")}
						</span>
						<strong style={{ color: "var(--text-primary)" }}>
							{formatCurrency(maxAmortization)} / mo
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
							{t("maxLoanAmount")}
						</span>
						<strong
							style={{
								display: "block",
								fontSize: "36px",
								color: "var(--primary)",
							}}
						>
							{formatCurrency(maxLoanAmount)}
						</strong>
						{maxLoanAmount === 6000000 && (
							<span
								style={{
									display: "block",
									fontSize: "12px",
									color: "var(--text-tertiary)",
									marginTop: "8px",
								}}
							>
								* {t("cappedHint")}
							</span>
						)}
					</div>

					<TipCard title="Pag-IBIG Rule of Thumb">{t("note")}</TipCard>
				</div>
			</div>
		</ToolLayout>
	);
}
