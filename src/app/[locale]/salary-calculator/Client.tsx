"use client";

import dynamic from "next/dynamic";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { useCalculatorState } from "../../../hooks/useCalculatorState";
import { computeSalary, EmploymentType } from "../../../lib/salaryLogic";
import InteractiveSlider from "../components/InteractiveSlider";
import PremiumLegend from "../components/PremiumLegend";
import ToolHeader from "../components/ToolHeader";
import ToolLayout from "../components/ToolLayout";

const Chart = dynamic(() => import("./Chart"), {
	ssr: false,
	loading: () => (
		<div
			style={{
				width: "100%",
				height: 200,
				display: "flex",
				alignItems: "center",
				justifyContent: "center",
				color: "var(--text-secondary)",
			}}
		>
			…
		</div>
	),
});

export default function SalaryCalculator({
	initialSalary = "30000",
}: {
	initialSalary?: string;
}) {
	const t = useTranslations("SalaryCalculator");

	const [state, updateState] = useCalculatorState(
		{
			salary: initialSalary,
			period: "Monthly",
			taxable: "",
			nontaxable: "",
			empType: "Private",
		},
		{
			salary: String,
			period: String,
			taxable: String,
			nontaxable: String,
			empType: String,
		},
	);

	const {
		salary: salaryStr,
		period: payrollPeriod,
		taxable: taxableAllowance,
		nontaxable: nonTaxableAllowance,
		empType: employmentType,
	} = state;

	const [shareText, setShareText] = useState("Share Computation");
	const [mounted, setMounted] = useState(false);

	useEffect(() => {
		setMounted(true);
	}, []);

	const {
		salary,
		sssDeduction,
		philhealthDeduction,
		pagibigDeduction,
		totalContributions,
		taxableIncome,
		tax,
		netPay,
		taxableAllowance: computedTaxableAllow,
		nonTaxableAllowance: computedNonTaxableAllow,
	} = computeSalary(
		salaryStr,
		payrollPeriod,
		taxableAllowance,
		nonTaxableAllowance,
		employmentType as EmploymentType,
	);

	const handleShare = async () => {
		const shareData = {
			title: "My Philippine Salary Computation",
			text: `My gross salary is ₱${salary.toLocaleString()}, and my net take-home pay is ₱${netPay.toLocaleString()} after taxes and deductions! Calculate yours here:`,
			url: window.location.href,
		};

		if (navigator.share) {
			try {
				await navigator.share(shareData);
			} catch (error) {
				console.log("Error sharing", error);
			}
		} else {
			try {
				await navigator.clipboard.writeText(
					`${shareData.text} ${shareData.url}`,
				);
				setShareText(t("shareTextCopied"));
				setTimeout(() => setShareText(t("shareText")), 2500);
			} catch (err) {
				console.error("Failed to copy text: ", err);
			}
		}
	};

	const formatCurrency = (amount: number) => {
		return new Intl.NumberFormat("en-PH", {
			style: "currency",
			currency: "PHP",
		}).format(amount);
	};

	const chartData = [
		{ name: t("chartNetPay"), value: netPay, color: "var(--primary)" },
		{ name: t("chartTax"), value: tax, color: "#d32f2f" },
		{
			name: employmentType === "Government" ? "GSIS" : t("chartSSS"),
			value: sssDeduction,
			color: "#f57c00",
		},
		{
			name: t("chartPhilhealth"),
			value: philhealthDeduction,
			color: "#0288d1",
		},
		{ name: t("chartPagibig"), value: pagibigDeduction, color: "#7b1fa2" },
	].filter((item) => item.value > 0);

	return (
		<ToolLayout maxWidth="1200px">
			<ToolHeader
				title="Salary Net Pay Calculator (2026)"
				subtitle="Calculate your take-home pay after SSS, PhilHealth, Pag-IBIG, and Withholding Tax deductions."
				adSlotId="1234567890"
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
						{t("detailsTitle")}
					</h2>
					<div className="form-group" style={{ marginBottom: "16px" }}>
						<label className="form-label" htmlFor="employmentType">
							{t("empTypeLabel")}
						</label>
						<select
							id="employmentType"
							className="form-control"
							value={employmentType}
							onChange={(e) => updateState({ empType: e.target.value })}
						>
							<option value="Private">{t("empTypePrivate")}</option>
							<option value="Government">{t("empTypeGovt")}</option>
							<option value="Minimum Wage">{t("empTypeMinWage")}</option>
							<option value="Self-Employed">{t("empTypeSelf")}</option>
							<option value="Kasambahay">{t("empTypeKasambahay")}</option>
						</select>
					</div>

					<div className="form-group" style={{ marginBottom: "16px" }}>
						<label className="form-label" htmlFor="payrollPeriod">
							{t("payrollPeriodLabel")}
						</label>
						<select
							id="payrollPeriod"
							className="form-control"
							value={payrollPeriod}
							onChange={(e) => updateState({ period: e.target.value })}
						>
							<option value="Monthly">{t("periodMonthly")}</option>
							<option value="Semi-Monthly">{t("periodSemiMonthly")}</option>
							<option value="Weekly">{t("periodWeekly")}</option>
							<option value="Daily">{t("periodDaily")}</option>
							<option value="Annually">{t("periodAnnually")}</option>
						</select>
					</div>
					<InteractiveSlider
						label={t("grossSalaryLabel")}
						value={salary}
						min={0}
						max={
							payrollPeriod === "Annually"
								? 3000000
								: payrollPeriod === "Daily"
									? 10000
									: payrollPeriod === "Weekly"
										? 50000
										: payrollPeriod === "Semi-Monthly"
											? 125000
											: 250000
						}
						step={
							payrollPeriod === "Annually"
								? 10000
								: payrollPeriod === "Daily"
									? 100
									: 1000
						}
						onChange={(val) => updateState({ salary: val.toString() })}
						hint={t("grossSalaryHint")}
					/>

					<InteractiveSlider
						label={t("taxableAllowanceLabel")}
						value={Number(taxableAllowance) || 0}
						min={0}
						max={100000}
						step={500}
						onChange={(val) => updateState({ taxable: val.toString() })}
						hint={t("taxableAllowanceHint")}
					/>

					<InteractiveSlider
						label={t("nonTaxableAllowanceLabel")}
						value={Number(nonTaxableAllowance) || 0}
						min={0}
						max={100000}
						step={500}
						onChange={(val) => updateState({ nontaxable: val.toString() })}
						hint={t("nonTaxableAllowanceHint")}
					/>
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
						}}
					>
						<span>{t("grossSalaryResult")}</span>
						<strong>{formatCurrency(salary)}</strong>
					</div>

					{Number(computedTaxableAllow) > 0 && (
						<div
							style={{
								display: "flex",
								justifyContent: "space-between",
								marginBottom: "8px",
								fontSize: "14px",
							}}
						>
							<span>{t("taxableAllowanceLabel")}</span>
							<span>+ {formatCurrency(computedTaxableAllow)}</span>
						</div>
					)}
					{Number(computedNonTaxableAllow) > 0 && (
						<div
							style={{
								display: "flex",
								justifyContent: "space-between",
								marginBottom: "8px",
								fontSize: "14px",
							}}
						>
							<span>{t("nonTaxableAllowanceLabel")}</span>
							<span>+ {formatCurrency(computedNonTaxableAllow)}</span>
						</div>
					)}

					<div
						style={{
							margin: "16px 0",
							padding: "16px 0",
							borderTop: "1px dashed var(--border-color)",
							borderBottom: "1px dashed var(--border-color)",
						}}
					>
						<h3
							style={{
								fontSize: "14px",
								color: "var(--text-secondary)",
								marginBottom: "12px",
								textTransform: "uppercase",
							}}
						>
							{t("mandatoryDeductions")}
						</h3>

						<div
							style={{
								display: "flex",
								justifyContent: "space-between",
								marginBottom: "8px",
							}}
						>
							<span
								style={{ fontSize: "14px", color: "var(--text-secondary)" }}
							>
								{employmentType === "Government" ? "GSIS" : t("sss")}
							</span>
							<span style={{ fontSize: "14px", fontWeight: 500 }}>
								- {formatCurrency(sssDeduction)}
							</span>
						</div>

						<div
							style={{
								display: "flex",
								justifyContent: "space-between",
								marginBottom: "8px",
								fontSize: "14px",
							}}
						>
							<span>{t("philhealth")}</span>
							<span style={{ color: "#b71c1c" }}>
								- {formatCurrency(philhealthDeduction)}
							</span>
						</div>

						<div
							style={{
								display: "flex",
								justifyContent: "space-between",
								marginBottom: "8px",
								fontSize: "14px",
							}}
						>
							<span>{t("pagibig")}</span>
							<span style={{ color: "#b71c1c" }}>
								- {formatCurrency(pagibigDeduction)}
							</span>
						</div>

						<div
							style={{
								display: "flex",
								justifyContent: "space-between",
								marginTop: "12px",
								paddingTop: "12px",
								borderTop: "1px solid var(--border-color)",
								fontSize: "14px",
								fontWeight: 600,
							}}
						>
							<span>{t("totalContributions")}</span>
							<span>{formatCurrency(totalContributions)}</span>
						</div>
					</div>

					<div
						style={{
							display: "flex",
							justifyContent: "space-between",
							marginBottom: "12px",
							fontSize: "14px",
						}}
					>
						<span>{t("taxableIncome")}</span>
						<span>{formatCurrency(taxableIncome)}</span>
					</div>

					<div
						style={{
							display: "flex",
							justifyContent: "space-between",
							marginBottom: "16px",
							fontSize: "14px",
						}}
					>
						<span>{t("tax")}</span>
						<span style={{ color: "#b71c1c" }}>- {formatCurrency(tax)}</span>
					</div>

					<div
						style={{
							display: "flex",
							justifyContent: "space-between",
							marginTop: "16px",
							paddingTop: "16px",
							borderTop: "2px solid var(--border-color)",
							fontSize: "24px",
							fontWeight: 700,
							color: "var(--text-primary)",
						}}
					>
						<span>{t("netPay")}</span>
						<span style={{ color: "#1b5e20" }}>{formatCurrency(netPay)}</span>
					</div>

					<button
						onClick={handleShare}
						className="btn-secondary"
						style={{
							width: "100%",
							marginTop: "16px",
							display: "flex",
							justifyContent: "center",
							alignItems: "center",
							gap: "8px",
						}}
					>
						{shareText === "Copied to Clipboard!" ? (
							<svg
								width="18"
								height="18"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								strokeWidth="2"
								strokeLinecap="round"
								strokeLinejoin="round"
							>
								<polyline points="20 6 9 17 4 12"></polyline>
							</svg>
						) : (
							<svg
								width="18"
								height="18"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								strokeWidth="2"
								strokeLinecap="round"
								strokeLinejoin="round"
							>
								<circle cx="18" cy="5" r="3"></circle>
								<circle cx="6" cy="12" r="3"></circle>
								<circle cx="18" cy="19" r="3"></circle>
								<line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line>
								<line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line>
							</svg>
						)}
						{t("shareText") === "Share Computation" &&
						shareText === "Share Computation"
							? "Share Computation"
							: shareText}
					</button>

					<p
						style={{
							textAlign: "center",
							fontSize: "14px",
							color: "var(--text-secondary)",
							marginTop: "16px",
						}}
					>
						{t("estimateDisclaimer")}
					</p>
				</div>
			</div>

			{/* Recharts Visualization */}
			{mounted && salary > 0 && (
				<div className="card" style={{ marginTop: "24px", padding: "24px" }}>
					<h2
						style={{
							fontSize: "18px",
							marginBottom: "16px",
							textAlign: "center",
						}}
					>
						{t("chartTitle")}
					</h2>
					<Chart data={chartData} formatValue={formatCurrency} />

					{/* Clean Deduction Legend Grid */}
					<PremiumLegend
						items={chartData}
						total={salary}
						formatValue={formatCurrency}
					/>
				</div>
			)}
		</ToolLayout>
	);
}
