"use client";

import { useTranslations } from "next-intl";
import dynamic from "next/dynamic";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import BackButton from "../../components/BackButton";
import ToolEyebrow from "../../components/doodle/ToolEyebrow";
import ToolIllustration from "../../components/illustrations/ToolIllustration";
import AdBanner from "../components/AdBanner";
import ToolLayout from "../components/ToolLayout";

const Chart = dynamic(() => import("./Chart"), {
	ssr: false,
	loading: () => (
		<div
			style={{
				width: "100%",
				height: "100%",
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

export default function IncomeTaxCalculator() {
	const t = useTranslations("IncomeTaxCalculator");
	const router = useRouter();
	const pathname = usePathname();
	const searchParams = useSearchParams();

	const [incomeStr, setIncomeStr] = useState(
		searchParams.get("income") || "400000",
	);
	const [period, setPeriod] = useState<"annual" | "monthly">(
		(searchParams.get("period") as "annual" | "monthly") || "annual",
	);
	const [taxType, setTaxType] = useState<"graduated" | "flat8">(
		(searchParams.get("type") as "graduated" | "flat8") || "graduated",
	);
	const [mounted, setMounted] = useState(false);

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

	useEffect(() => {
		// eslint-disable-next-line react-hooks/set-state-in-effect
		setMounted(true);
	}, []);

	const inputIncome = parseFloat(incomeStr) || 0;

	// Convert to annual for calculation
	const annualIncome = period === "monthly" ? inputIncome * 12 : inputIncome;

	let annualTax = 0;
	let taxBracket = "";

	if (taxType === "flat8") {
		// 8% flat rate for self-employed/professionals (on excess of 250k)
		annualTax = Math.max(0, (annualIncome - 250000) * 0.08);
		taxBracket = t("bracket8");
	} else {
		// Graduated TRAIN Law Table (Effective Jan 2023 - 2026)
		if (annualIncome > 8000000) {
			annualTax = 2202500 + (annualIncome - 8000000) * 0.35;
			taxBracket = t("bracketOver8M");
		} else if (annualIncome > 2000000) {
			annualTax = 402500 + (annualIncome - 2000000) * 0.3;
			taxBracket = t("bracketOver2M");
		} else if (annualIncome > 800000) {
			annualTax = 102500 + (annualIncome - 800000) * 0.25;
			taxBracket = t("bracketOver800k");
		} else if (annualIncome > 400000) {
			annualTax = 22500 + (annualIncome - 400000) * 0.2;
			taxBracket = t("bracketOver400k");
		} else if (annualIncome > 250000) {
			annualTax = (annualIncome - 250000) * 0.15;
			taxBracket = t("bracketOver250k");
		} else {
			annualTax = 0;
			taxBracket = t("bracketExempt");
		}
	}

	const monthlyTax = annualTax / 12;
	const netAnnual = annualIncome - annualTax;
	const netMonthly = netAnnual / 12;

	const formatCurrency = (amount: number) => {
		return new Intl.NumberFormat("en-PH", {
			style: "currency",
			currency: "PHP",
		}).format(amount);
	};

	const pieData = [
		{ name: t("pieNetIncome"), value: netAnnual },
		{ name: t("pieIncomeTax"), value: annualTax },
	];

	const COLORS = ["#1b5e20", "#d32f2f"];

	return (
		<ToolLayout maxWidth="1200px">
			<div style={{ width: "100%", margin: "0 auto", paddingBottom: "40px" }}>
				<div style={{ marginBottom: "24px" }}>
					<BackButton style={{ marginBottom: "16px" }}>
						{t("backToTools")}
					</BackButton>
					<ToolIllustration />
					<ToolEyebrow />
					<h1 className="page-title">{t("title")}</h1>
					<p className="page-subtitle">{t("subtitle")}</p>
				</div>

				<AdBanner dataAdSlot="6666666666" />

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
							{t("incomeDetails")}
						</h2>

						<div className="form-group">
							<div className="form-label">{t("taxType")}</div>
							<div style={{ display: "flex", gap: "12px" }}>
								<label
									style={{
										display: "flex",
										alignItems: "center",
										gap: "6px",
										fontSize: "14px",
										color: "var(--text-primary)",
									}}
								>
									<input
										type="radio"
										name="taxType"
										checked={taxType === "graduated"}
										onChange={() => {
											setTaxType("graduated");
											updateUrl({ type: "graduated" });
										}}
									/>
									{t("graduatedLabel")}
								</label>
							</div>
							<div style={{ display: "flex", gap: "12px", marginTop: "8px" }}>
								<label
									style={{
										display: "flex",
										alignItems: "center",
										gap: "6px",
										fontSize: "14px",
										color: "var(--text-primary)",
									}}
								>
									<input
										type="radio"
										name="taxType"
										checked={taxType === "flat8"}
										onChange={() => {
											setTaxType("flat8");
											updateUrl({ type: "flat8" });
										}}
									/>
									{t("flat8Label")}
								</label>
							</div>
						</div>

						<div className="form-group" style={{ marginTop: "24px" }}>
							<label className="form-label" htmlFor="period">
								{t("inputPeriod")}
							</label>
							<select
								id="period"
								className="form-control"
								value={period}
								onChange={(e) => {
									const val = e.target.value as "annual" | "monthly";
									setPeriod(val);
									updateUrl({ period: val });
								}}
								style={{
									backgroundColor: "var(--surface-color)",
									cursor: "pointer",
								}}
							>
								<option value="annual">{t("annualIncomeOption")}</option>
								<option value="monthly">{t("monthlyIncomeOption")}</option>
							</select>
						</div>

						<div className="form-group">
							<label className="form-label" htmlFor="income">
								{t("taxableIncomeLabel")}
							</label>
							<input
								type="number"
								id="income"
								className="form-control"
								value={incomeStr}
								onChange={(e) => {
									setIncomeStr(e.target.value);
									updateUrl({ income: e.target.value });
								}}
								min="0"
								step="any"
							/>
							<span className="form-hint">{t("taxableIncomeHint")}</span>
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
							{t("taxBreakdown")}
						</h2>

						<div
							style={{
								display: "flex",
								justifyContent: "space-between",
								marginBottom: "12px",
								fontSize: "14px",
							}}
						>
							<span>{t("annualTaxableIncome")}</span>
							<span style={{ fontWeight: 600 }}>
								{formatCurrency(annualIncome)}
							</span>
						</div>

						<div
							style={{
								display: "flex",
								justifyContent: "space-between",
								marginBottom: "16px",
								paddingBottom: "16px",
								borderBottom: "1px dashed var(--border-color)",
								fontSize: "14px",
							}}
						>
							<span>{t("applicableTaxBracket")}</span>
							<span style={{ color: "var(--primary)" }}>{taxBracket}</span>
						</div>

						<div
							style={{
								display: "flex",
								justifyContent: "space-between",
								marginBottom: "8px",
								fontSize: "14px",
							}}
						>
							<span>{t("monthlyIncomeTax")}</span>
							<span style={{ color: "#b71c1c" }}>
								{formatCurrency(monthlyTax)}
							</span>
						</div>

						<div
							style={{
								display: "flex",
								justifyContent: "space-between",
								marginBottom: "16px",
								paddingBottom: "16px",
								borderBottom: "1px solid var(--border-color)",
								fontSize: "16px",
								fontWeight: 600,
							}}
						>
							<span>{t("totalAnnualTaxPayable")}</span>
							<span style={{ color: "#b71c1c" }}>
								{formatCurrency(annualTax)}
							</span>
						</div>

						<h3
							style={{
								fontSize: "14px",
								color: "var(--text-secondary)",
								marginBottom: "12px",
								textTransform: "uppercase",
								marginTop: "24px",
							}}
						>
							{t("netIncomeAfterTax")}
						</h3>

						<div
							style={{
								display: "flex",
								justifyContent: "space-between",
								marginBottom: "8px",
								fontSize: "14px",
							}}
						>
							<span>{t("monthlyNetIncome")}</span>
							<span>{formatCurrency(netMonthly)}</span>
						</div>

						<div
							style={{
								display: "flex",
								justifyContent: "space-between",
								marginTop: "8px",
								paddingTop: "12px",
								borderTop: "2px solid var(--border-color)",
								fontSize: "20px",
								fontWeight: 700,
								color: "var(--text-primary)",
							}}
						>
							<span>{t("annualNetIncome")}</span>
							<span style={{ color: "#1b5e20" }}>
								{formatCurrency(netAnnual)}
							</span>
						</div>

						{/* Visual Chart */}
						{mounted && annualIncome > 0 && (
							<div
								style={{
									height: "250px",
									marginTop: "32px",
									marginBottom: "8px",
								}}
							>
								<Chart
									data={pieData}
									colors={COLORS}
									formatValue={formatCurrency}
								/>
							</div>
						)}
					</div>
				</div>
			</div>
		</ToolLayout>
	);
}
