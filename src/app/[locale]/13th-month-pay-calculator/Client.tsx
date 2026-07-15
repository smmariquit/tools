"use client";

import { useTranslations } from "next-intl";
import { calculateThirteenthMonth } from "../../../core/calculators/thirteenthMonth";
import { useCalculatorState } from "../../../hooks/useCalculatorState";
import BackButton from "../../components/BackButton";
import ToolEyebrow from "../../components/doodle/ToolEyebrow";
import ToolIllustration from "../../components/illustrations/ToolIllustration";
import AdBanner from "../components/AdBanner";
import SampleCases from "../components/SampleCases";
import ToolLayout from "../components/ToolLayout";

export default function ThirteenthMonthClient() {
	const t = useTranslations("ThirteenthMonth");

	const [state, updateState] = useCalculatorState(
		{ salary: 30000, months: 12, absences: 0 },
		{ salary: parseFloat, months: parseFloat, absences: parseFloat },
	);

	const {
		salary: basicSalary,
		months: monthsWorked,
		absences: unpaidAbsences,
	} = state;

	const { totalEarned, thirteenthMonthPay, taxableAmount, taxExemptAmount } =
		calculateThirteenthMonth(basicSalary, monthsWorked, unpaidAbsences);

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
						Back to Tools
					</BackButton>
					<ToolIllustration />
					<ToolEyebrow />
					<h1 className="page-title">{t("title")}</h1>
					<p className="page-subtitle">{t("subtitle")}</p>
				</div>

				<AdBanner dataAdSlot="13th-month-top" />

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

						<SampleCases
							cases={[
								{
									label: "Full year (₱30k)",
									onSelect: () =>
										updateState({ salary: 30000, months: 12, absences: 0 }),
								},
								{
									label: "New hire (6 months)",
									onSelect: () =>
										updateState({ salary: 30000, months: 6, absences: 0 }),
								},
								{
									label: "₱5k absence deduction",
									onSelect: () =>
										updateState({ salary: 30000, months: 12, absences: 5000 }),
								},
							]}
						/>

						<div className="form-group">
							<label className="form-label" htmlFor="basicSalary">
								{t("basicSalaryLabel")}
							</label>
							<input
								type="number"
								id="basicSalary"
								className="form-control"
								value={basicSalary || ""}
								onChange={(e) =>
									updateState({ salary: parseFloat(e.target.value) || 0 })
								}
								min="0"
							/>
							<p className="form-hint" style={{ marginTop: "4px" }}>
								{t("basicSalaryHint")}
							</p>
						</div>

						<div className="form-group" style={{ marginTop: "16px" }}>
							<label className="form-label" htmlFor="monthsWorked">
								{t("monthsWorkedLabel")}
							</label>
							<input
								type="number"
								id="monthsWorked"
								className="form-control"
								value={monthsWorked || ""}
								onChange={(e) =>
									updateState({ months: parseFloat(e.target.value) || 0 })
								}
								min="1"
								max="12"
							/>
						</div>

						<div className="form-group" style={{ marginTop: "16px" }}>
							<label className="form-label" htmlFor="unpaidAbsences">
								{t("unpaidAbsencesLabel")}
							</label>
							<input
								type="number"
								id="unpaidAbsences"
								className="form-control"
								value={unpaidAbsences || ""}
								onChange={(e) =>
									updateState({ absences: parseFloat(e.target.value) || 0 })
								}
								min="0"
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
								marginBottom: "16px",
								padding: "12px",
								backgroundColor: "var(--surface-color)",
								borderRadius: "var(--border-radius-sm)",
								border: "1px solid var(--border-color)",
							}}
						>
							<span style={{ fontWeight: 500 }}>{t("totalEarned")}</span>
							<strong style={{ color: "var(--text-primary)" }}>
								{formatCurrency(totalEarned)}
							</strong>
						</div>

						<div
							style={{
								display: "flex",
								justifyContent: "space-between",
								marginBottom: "8px",
								fontSize: "14px",
							}}
						>
							<span>{t("formula")}</span>
							<span>{t("formulaDesc")}</span>
						</div>

						<div
							style={{
								display: "flex",
								justifyContent: "space-between",
								marginTop: "16px",
								paddingTop: "16px",
								borderTop: "2px solid var(--border-color)",
								fontSize: "20px",
								fontWeight: 700,
								color: "var(--text-primary)",
							}}
						>
							<span>{t("netPay")}</span>
							<span style={{ color: "#1b5e20" }}>
								{formatCurrency(thirteenthMonthPay)}
							</span>
						</div>

						{/* Tax Breakdown */}
						<div
							style={{
								marginTop: "24px",
								paddingTop: "16px",
								borderTop: "1px dashed var(--border-color)",
							}}
						>
							<h3
								style={{
									fontSize: "14px",
									color: "var(--text-secondary)",
									marginBottom: "8px",
									textTransform: "uppercase",
								}}
							>
								{t("trainStatus")}
							</h3>
							<div
								style={{
									display: "flex",
									justifyContent: "space-between",
									marginBottom: "4px",
									fontSize: "14px",
								}}
							>
								<span>{t("taxExempt")}</span>
								<span style={{ color: "#1b5e20" }}>
									{formatCurrency(taxExemptAmount)}
								</span>
							</div>
							<div
								style={{
									display: "flex",
									justifyContent: "space-between",
									fontSize: "14px",
								}}
							>
								<span>{t("taxable")}</span>
								<span
									style={{
										color:
											taxableAmount > 0 ? "#b71c1c" : "var(--text-secondary)",
									}}
								>
									{formatCurrency(taxableAmount)}
								</span>
							</div>
						</div>
					</div>
				</div>
			</div>
		</ToolLayout>
	);
}
