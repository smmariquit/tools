"use client";

import { useTranslations } from "next-intl";
import { calculateAgeExact } from "../../../core/calculators/dFAAge";
import { useCalculatorState } from "../../../hooks/useCalculatorState";
import ToolHeader from "../components/ToolHeader";
import ToolLayout from "../components/ToolLayout";

export default function DFAAgeClient() {
	const t = useTranslations("DFAAge");

	// Default to exactly 20 years ago
	const defaultDate = new Date();
	defaultDate.setFullYear(defaultDate.getFullYear() - 20);
	const defaultDateStr = defaultDate.toISOString().split("T")[0];

	const [state, updateState] = useCalculatorState(
		{ birthDate: defaultDateStr, targetDate: "" },
		{ birthDate: String, targetDate: String },
	);

	const { birthDate, targetDate } = state;
	const { years, months, days, isMinor, isSenior, prcEligible } =
		calculateAgeExact(birthDate, targetDate);

	return (
		<ToolLayout maxWidth="1200px">
			<ToolHeader
				title={t("title")}
				subtitle={t("subtitle")}
				adSlotId="dfa-age-top"
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

					<div className="form-group" style={{ marginBottom: "20px" }}>
						<label className="form-label" htmlFor="birthDate">
							{t("birthDateLabel")}
						</label>
						<input
							type="date"
							id="birthDate"
							className="form-control"
							value={birthDate}
							onChange={(e) => updateState({ birthDate: e.target.value })}
							max={new Date().toISOString().split("T")[0]}
						/>
					</div>

					<div className="form-group" style={{ marginBottom: "20px" }}>
						<label className="form-label" htmlFor="targetDate">
							{t("targetDateLabel")}
						</label>
						<input
							type="date"
							id="targetDate"
							className="form-control"
							value={targetDate}
							onChange={(e) => updateState({ targetDate: e.target.value })}
						/>
						<p className="form-hint" style={{ marginTop: "6px" }}>
							{t("targetDateHint")}
						</p>
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
								fontSize: "14px",
								color: "var(--text-secondary)",
								marginBottom: "12px",
								textTransform: "uppercase",
								letterSpacing: "1px",
							}}
						>
							{t("exactAgeLabel")}
						</span>

						<div
							style={{ display: "flex", justifyContent: "center", gap: "24px" }}
						>
							<div>
								<strong
									style={{
										display: "block",
										fontSize: "42px",
										color: "var(--primary)",
										lineHeight: 1,
									}}
								>
									{years}
								</strong>
								<span
									style={{ fontSize: "14px", color: "var(--text-secondary)" }}
								>
									{t("yearsLabel")}
								</span>
							</div>
							<div
								style={{
									fontSize: "42px",
									color: "var(--border-color)",
									fontWeight: 200,
								}}
							>
								:
							</div>
							<div>
								<strong
									style={{
										display: "block",
										fontSize: "42px",
										color: "var(--primary)",
										lineHeight: 1,
									}}
								>
									{months}
								</strong>
								<span
									style={{ fontSize: "14px", color: "var(--text-secondary)" }}
								>
									{t("monthsLabel")}
								</span>
							</div>
							<div
								style={{
									fontSize: "42px",
									color: "var(--border-color)",
									fontWeight: 200,
								}}
							>
								:
							</div>
							<div>
								<strong
									style={{
										display: "block",
										fontSize: "42px",
										color: "var(--primary)",
										lineHeight: 1,
									}}
								>
									{days}
								</strong>
								<span
									style={{ fontSize: "14px", color: "var(--text-secondary)" }}
								>
									{t("daysLabel")}
								</span>
							</div>
						</div>
					</div>

					<h3
						style={{
							fontSize: "16px",
							marginBottom: "12px",
							color: "var(--text-primary)",
						}}
					>
						{t("eligibilityTitle")}
					</h3>

					<div
						style={{ display: "flex", flexDirection: "column", gap: "12px" }}
					>
						{isMinor ? (
							<div
								style={{
									padding: "12px",
									borderLeft: "4px solid #f57c00",
									backgroundColor: "var(--surface-color)",
									borderRadius: "4px",
								}}
							>
								<strong
									style={{
										color: "#e65100",
										display: "block",
										fontSize: "14px",
										marginBottom: "4px",
									}}
								>
									️ {t("statusMinor")}
								</strong>
								<span
									style={{ fontSize: "14px", color: "var(--text-secondary)" }}
								>
									{t("statusMinorDesc")}
								</span>
							</div>
						) : (
							<div
								style={{
									padding: "12px",
									borderLeft: "4px solid #2e7d32",
									backgroundColor: "var(--surface-color)",
									borderRadius: "4px",
								}}
							>
								<strong
									style={{
										color: "#1b5e20",
										display: "block",
										fontSize: "14px",
										marginBottom: "4px",
									}}
								>
									{t("statusAdult")}
								</strong>
								<span
									style={{ fontSize: "14px", color: "var(--text-secondary)" }}
								>
									{t("statusAdultDesc")}
								</span>
							</div>
						)}

						{prcEligible && !isSenior && !isMinor && (
							<div
								style={{
									padding: "12px",
									borderLeft: "4px solid #1976d2",
									backgroundColor: "var(--surface-color)",
									borderRadius: "4px",
								}}
							>
								<strong
									style={{
										color: "#0d47a1",
										display: "block",
										fontSize: "14px",
										marginBottom: "4px",
									}}
								>
									{t("statusPRC")}
								</strong>
								<span
									style={{ fontSize: "14px", color: "var(--text-secondary)" }}
								>
									{t("statusPRCDesc")}
								</span>
							</div>
						)}

						{isSenior && (
							<div
								style={{
									padding: "12px",
									borderLeft: "4px solid #7b1fa2",
									backgroundColor: "var(--surface-color)",
									borderRadius: "4px",
								}}
							>
								<strong
									style={{
										color: "#4a148c",
										display: "block",
										fontSize: "14px",
										marginBottom: "4px",
									}}
								>
									{t("statusSenior")}
								</strong>
								<span
									style={{ fontSize: "14px", color: "var(--text-secondary)" }}
								>
									{t("statusSeniorDesc")}
								</span>
							</div>
						)}
					</div>
				</div>
			</div>
		</ToolLayout>
	);
}
