"use client";

import { useTranslations } from "next-intl";
import { calculateFreelanceRate } from "../../../core/calculators/freelanceRate";
import { useCalculatorState } from "../../../hooks/useCalculatorState";
import ToolFooter from "../../components/ToolFooter";
import InteractiveSlider from "../components/InteractiveSlider";
import TipCard from "../components/TipCard";
import ToolHeader from "../components/ToolHeader";
import ToolLayout from "../components/ToolLayout";

export default function FreelanceRateClient() {
	const t = useTranslations("FreelanceRate");

	const [state, updateState] = useCalculatorState(
		{ net: 50000, expenses: 5000, hours: 30, vacation: 15 },
		{
			net: parseFloat,
			expenses: parseFloat,
			hours: parseFloat,
			vacation: parseFloat,
		},
	);
	const {
		net: targetNet,
		expenses: monthlyExpenses,
		hours: billableHours,
		vacation: vacationDays,
	} = state;

	const { grossAnnual, billableHoursPerYear, hourlyRatePhp, hourlyRateUsd } =
		calculateFreelanceRate(
			targetNet,
			monthlyExpenses,
			billableHours,
			vacationDays,
		);

	const formatCurrency = (val: number, isUsd = false) => {
		return (
			(isUsd ? "$" : "₱") +
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
				adSlotId="freelance-rate-top"
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
						label={t("targetNet")}
						value={targetNet}
						min={10000}
						max={300000}
						step={5000}
						onChange={(val) => updateState({ net: val })}
					/>
					<div
						style={{
							fontSize: "12px",
							color: "var(--text-tertiary)",
							marginTop: "8px",
							marginBottom: "24px",
							textAlign: "left",
						}}
					>
						{t("targetNetHint")}
					</div>

					<InteractiveSlider
						label={t("monthlyExpenses")}
						value={monthlyExpenses}
						min={0}
						max={100000}
						step={1000}
						onChange={(val) => updateState({ expenses: val })}
					/>
					<div
						style={{
							fontSize: "12px",
							color: "var(--text-tertiary)",
							marginTop: "8px",
							marginBottom: "24px",
							textAlign: "left",
						}}
					>
						{t("monthlyExpensesHint")}
					</div>

					<InteractiveSlider
						label={t("billableHours")}
						value={billableHours}
						min={5}
						max={80}
						step={5}
						onChange={(val) => updateState({ hours: val })}
					/>
					<div
						style={{
							fontSize: "12px",
							color: "var(--text-tertiary)",
							marginTop: "8px",
							marginBottom: "24px",
							textAlign: "left",
						}}
					>
						{t("billableHoursHint")}
					</div>

					<InteractiveSlider
						label={t("vacationDays")}
						value={vacationDays}
						min={0}
						max={100}
						step={1}
						onChange={(val) => updateState({ vacation: val })}
					/>
					<div
						style={{
							fontSize: "12px",
							color: "var(--text-tertiary)",
							marginTop: "8px",
							marginBottom: "16px",
							textAlign: "left",
						}}
					>
						{t("vacationDaysHint")}
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
							{t("grossAnnual")}
						</span>
						<strong style={{ color: "var(--text-primary)" }}>
							{formatCurrency(grossAnnual)}
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
							{t("hoursPerYear")}
						</span>
						<strong style={{ color: "var(--text-primary)" }}>
							{billableHoursPerYear} {t("hoursSuffix")}
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
							{t("hourlyRatePhp")}
						</span>
						<strong style={{ color: "var(--primary)" }}>
							{formatCurrency(hourlyRatePhp)} / hr
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
							{t("hourlyRateUsd")}
						</span>
						<strong
							style={{
								display: "block",
								fontSize: "36px",
								color: "#4caf50",
							}}
						>
							{formatCurrency(hourlyRateUsd, true)} / hr
						</strong>
						<span
							style={{
								display: "block",
								fontSize: "12px",
								color: "var(--text-tertiary)",
								marginTop: "8px",
							}}
						>
							* {t("exchangeRateNote")}
						</span>
					</div>

					<TipCard title="Freelance Tax Included">{t("note")}</TipCard>
				</div>
			</div>

			<ToolFooter currentPath="/freelance-rate-calculator" />
		</ToolLayout>
	);
}
