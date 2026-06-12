"use client";

import { useTranslations } from "next-intl";
import {
	calculateDOSTStipend,
	type DOSTSchoolType,
} from "../../../core/calculators/dOSTScholarshipStipend";
import { useCalculatorState } from "../../../hooks/useCalculatorState";
import InteractiveSlider from "../components/InteractiveSlider";
import ToolHeader from "../components/ToolHeader";
import ToolLayout from "../components/ToolLayout";

export default function DOSTScholarshipStipendClient() {
	const t = useTranslations("DOSTScholarshipStipend");

	const [state, updateState] = useCalculatorState(
		{
			schoolType: "suc",
			yearLevel: 1,
			semesters: 2,
			tuition: 30000,
			isFinalYear: false,
		},
		{
			schoolType: String,
			yearLevel: Number,
			semesters: Number,
			tuition: Number,
			isFinalYear: Boolean,
		},
	);

	const { schoolType, yearLevel, semesters, tuition, isFinalYear } = state;
	const result = calculateDOSTStipend(
		schoolType as DOSTSchoolType,
		yearLevel,
		semesters,
		tuition,
		isFinalYear,
	);

	const formatCurrency = (amount: number) =>
		new Intl.NumberFormat("en-PH", {
			style: "currency",
			currency: "PHP",
		}).format(amount);

	const showTuition = schoolType === "private_with_tuition";

	return (
		<ToolLayout>
			<ToolHeader
				title={t("title")}
				subtitle={t("subtitle")}
				adSlotId="dost-stipend-top"
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
							<option value="private_with_tuition">{t("schoolPrivate")}</option>
							<option value="private_no_tuition">
								{t("schoolPrivateNoTuition")}
							</option>
						</select>
					</div>

					<InteractiveSlider
						label={t("yearLabel")}
						value={yearLevel}
						onChange={(val: number | string) =>
							updateState({ yearLevel: Number(val) })
						}
						min={1}
						max={5}
						step={1}
						formatValue={(val: number) => `Year ${val}`}
					/>

					<div
						className="form-group"
						style={{
							marginTop: "20px",
							display: "flex",
							alignItems: "center",
							gap: "8px",
						}}
					>
						<input
							type="checkbox"
							id="isFinalYear"
							checked={isFinalYear}
							onChange={(e) => updateState({ isFinalYear: e.target.checked })}
							style={{
								width: "20px",
								height: "20px",
								accentColor: "var(--primary)",
							}}
						/>
						<label
							htmlFor="isFinalYear"
							style={{
								margin: 0,
								fontWeight: 500,
								cursor: "pointer",
								color: "var(--text-primary)",
							}}
						>
							{t("isFinalYearLabel")}
						</label>
					</div>

					<div style={{ marginTop: "20px" }}>
						<InteractiveSlider
							label={t("semLabel")}
							value={semesters}
							onChange={(val: number | string) =>
								updateState({ semesters: Number(val) })
							}
							min={2}
							max={3}
							step={1}
							formatValue={(val: number) => `${val} semesters`}
						/>
					</div>

					{showTuition && (
						<div style={{ marginTop: "20px" }}>
							<InteractiveSlider
								label={t("tuitionLabel")}
								value={tuition}
								onChange={(val: number | string) =>
									updateState({ tuition: Number(val) })
								}
								min={10000}
								max={100000}
								step={1000}
								formatValue={(val: number) => formatCurrency(val)}
								hint={t("tuitionHint")}
							/>
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
						{
							label: t("livingLabel"),
							desc: `${formatCurrency(result.livingAllowanceMonthly)} ${t("livingDesc")}`,
							value: result.livingAllowanceAnnual,
						},
						{
							label: t("bookLabel"),
							desc: `${formatCurrency(result.bookAllowancePerSem)} ${t("bookDesc")}`,
							value: result.bookAllowanceAnnual,
						},
						...(showTuition
							? [
									{
										label: t("tuitionLabel2"),
										desc: `${formatCurrency(result.tuitionSubsidyPerSem)} ${t("tuitionDesc")}`,
										value: result.tuitionSubsidyAnnual,
									},
								]
							: []),
						...(result.uniformAllowance > 0
							? [
									{
										label: t("uniformLabel"),
										desc: t("uniformDesc"),
										value: result.uniformAllowance,
									},
								]
							: []),
						...(result.thesisGrant > 0
							? [
									{
										label: t("thesisLabel"),
										desc: t("thesisDesc"),
										value: result.thesisGrant,
									},
								]
							: []),
						...(result.graduationClothing > 0
							? [
									{
										label: t("gradLabel"),
										desc: t("gradDesc"),
										value: result.graduationClothing,
									},
								]
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
								<span
									style={{
										display: "block",
										fontSize: "12px",
										color: "var(--text-secondary)",
										marginTop: "2px",
									}}
								>
									{item.desc}
								</span>
							</div>
							<strong
								style={{
									fontSize: "16px",
									color: "#1b5e20",
									whiteSpace: "nowrap",
								}}
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
		</ToolLayout>
	);
}
