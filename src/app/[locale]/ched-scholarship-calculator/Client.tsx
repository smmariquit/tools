"use client";

import { useTranslations } from "next-intl";
import {
	type CHEDScholarshipType,
	type CHEDSchoolType,
	calculateCHEDStipend,
} from "../../../core/calculators/chedScholarship";
import { useCalculatorState } from "../../../hooks/useCalculatorState";
import ToolFooter from "../../components/ToolFooter";
import ToolHeader from "../components/ToolHeader";
import ToolLayout from "../components/ToolLayout";

export default function CHEDScholarshipClient() {
	const t = useTranslations("CHEDScholarship");

	const [state, updateState] = useCalculatorState(
		{ scholarshipType: "merit_full", schoolType: "suc" },
		{ scholarshipType: String, schoolType: String },
	);

	const { scholarshipType, schoolType } = state;
	const result = calculateCHEDStipend(
		scholarshipType as CHEDScholarshipType,
		schoolType as CHEDSchoolType,
	);

	const formatCurrency = (amount: number) =>
		new Intl.NumberFormat("en-PH", {
			style: "currency",
			currency: "PHP",
		}).format(amount);

	const showSchoolType = scholarshipType !== "tdp";

	return (
		<ToolLayout>
			<ToolHeader
				title={t("title")}
				subtitle={t("subtitle")}
				adSlotId="ched-scholarship-top"
			/>

			<div className="tool-grid" style={{ marginTop: "24px" }}>
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

					<div className="form-group" style={{ marginBottom: "20px" }}>
						<label className="form-label" htmlFor="scholarshipType">
							{t("scholarshipTypeLabel")}
						</label>
						<select
							id="scholarshipType"
							className="form-control"
							value={scholarshipType}
							onChange={(e) => updateState({ scholarshipType: e.target.value })}
						>
							<option value="merit_full">{t("typeMeritFull")}</option>
							<option value="merit_half">{t("typeMeritHalf")}</option>
							<option value="tdp">{t("typeTDP")}</option>
						</select>
					</div>

					{showSchoolType && (
						<div className="form-group" style={{ marginBottom: "20px" }}>
							<label className="form-label" htmlFor="schoolType">
								{t("schoolTypeLabel")}
							</label>
							<select
								id="schoolType"
								className="form-control"
								value={schoolType}
								onChange={(e) => updateState({ schoolType: e.target.value })}
							>
								<option value="suc">{t("schoolSUC")}</option>
								<option value="private">{t("schoolPrivate")}</option>
							</select>
						</div>
					)}
				</div>

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

					{/* Line items */}
					{[
						{ label: t("stipendLabel"), value: result.stipendAnnual },
						...(result.tuitionSubsidyAnnual > 0
							? [
									{
										label: t("tuitionLabel"),
										value: result.tuitionSubsidyAnnual,
									},
								]
							: []),
						...(result.bookAllowanceAnnual > 0
							? [{ label: t("bookLabel"), value: result.bookAllowanceAnnual }]
							: []),
					].map((item) => (
						<div
							key={item.label}
							style={{
								display: "flex",
								justifyContent: "space-between",
								alignItems: "flex-start",
								padding: "12px 0",
								borderBottom: "1px dashed var(--border-color)",
							}}
						>
							<div>
								<span style={{ fontSize: "14px", fontWeight: 500 }}>
									{item.label}
								</span>
							</div>
							<strong
								style={{ fontSize: "16px", color: "var(--text-primary)" }}
							>
								{formatCurrency(item.value)}
							</strong>
						</div>
					))}

					{/* Total */}
					<div
						style={{
							display: "flex",
							justifyContent: "space-between",
							alignItems: "center",
							padding: "20px 0 0",
							marginTop: "8px",
							borderTop: "2px solid var(--border-color)",
						}}
					>
						<span style={{ fontSize: "16px", fontWeight: 700 }}>
							{t("totalLabel")}
						</span>
						<strong style={{ fontSize: "24px", color: "var(--primary)" }}>
							{formatCurrency(result.totalAnnual)}
						</strong>
					</div>
				</div>
			</div>

			<ToolFooter currentPath="/ched-scholarship-calculator" />
		</ToolLayout>
	);
}
