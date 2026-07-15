"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import InteractiveSlider from "../components/InteractiveSlider";
import TipCard from "../components/TipCard";
import ToolHeader from "../components/ToolHeader";
import ToolLayout from "../components/ToolLayout";

export default function TaxOptimizerClient() {
	const t = useTranslations("TaxOptimizer");
	const router = useRouter();
	const pathname = usePathname();
	const searchParams = useSearchParams();

	const [mounted, setMounted] = useState(false);
	const [grossIncome, setGrossIncome] = useState(
		parseFloat(searchParams.get("gross") || "1000000"),
	);
	const [expenses, setExpenses] = useState(
		parseFloat(searchParams.get("expenses") || "250000"),
	);

	useEffect(() => {
		setMounted(true);
	}, []);

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

	const calculateGraduatedTax = (taxableIncome: number) => {
		if (taxableIncome <= 250000) return 0;
		if (taxableIncome <= 400000) return (taxableIncome - 250000) * 0.15;
		if (taxableIncome <= 800000) return 22500 + (taxableIncome - 400000) * 0.2;
		if (taxableIncome <= 2000000)
			return 102500 + (taxableIncome - 800000) * 0.25;
		if (taxableIncome <= 8000000)
			return 402500 + (taxableIncome - 2000000) * 0.3;
		return 2202500 + (taxableIncome - 8000000) * 0.35;
	};

	// --- 1. 8% Flat Rate ---
	const isVatRegistered = grossIncome > 3000000;
	const tax8Percent = isVatRegistered
		? null
		: Math.max(0, (grossIncome - 250000) * 0.08);
	const net8Percent = isVatRegistered
		? null
		: grossIncome - expenses - (tax8Percent || 0);

	// --- 2. Graduated (40% OSD) ---
	const osd = grossIncome * 0.4;
	const taxableOsd = Math.max(0, grossIncome - osd);
	const incomeTaxOsd = calculateGraduatedTax(taxableOsd);
	const percentageTaxOsd = grossIncome * 0.03;
	const totalTaxOsd = incomeTaxOsd + percentageTaxOsd;
	// The user's ACTUAL pocket net income is gross - actual expenses - tax
	const netOsd = grossIncome - expenses - totalTaxOsd;

	// --- 3. Graduated (Itemized) ---
	const taxableItemized = Math.max(0, grossIncome - expenses);
	const incomeTaxItemized = calculateGraduatedTax(taxableItemized);
	const percentageTaxItemized = grossIncome * 0.03;
	const totalTaxItemized = incomeTaxItemized + percentageTaxItemized;
	const netItemized = grossIncome - expenses - totalTaxItemized;

	const formatCurrency = (val: number | null) => {
		if (val === null) return t("notApplicable");
		return (
			"₱" +
			val.toLocaleString("en-US", {
				minimumFractionDigits: 2,
				maximumFractionDigits: 2,
			})
		);
	};

	// Determine winner
	const validTaxes = [
		{
			id: "8percent",
			tax: tax8Percent,
			net: net8Percent,
			title: t("option8Percent"),
		},
		{ id: "osd", tax: totalTaxOsd, net: netOsd, title: t("optionOsd") },
		{
			id: "itemized",
			tax: totalTaxItemized,
			net: netItemized,
			title: t("optionItemized"),
		},
	].filter((o) => o.tax !== null) as {
		id: string;
		tax: number;
		net: number;
		title: string;
	}[];

	const bestOption = validTaxes.reduce((prev, current) =>
		prev.net > current.net ? prev : current,
	);
	const worstOption = validTaxes.reduce((prev, current) =>
		prev.net < current.net ? prev : current,
	);
	const savings = bestOption.net - worstOption.net;

	return (
		<ToolLayout maxWidth="1200px">
			<ToolHeader
				title={t("title")}
				subtitle={t("subtitle")}
				adSlotId="tax-opt-top"
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
						{t("incomeDetails")}
					</h2>

					<InteractiveSlider
						label={t("grossIncome")}
						value={grossIncome}
						min={0}
						max={5000000}
						step={50000}
						onChange={(val) => {
							setGrossIncome(val);
							updateUrl({ gross: val.toString() });
						}}
						hint={t("grossIncomeHint")}
					/>

					<div style={{ marginTop: "32px" }}>
						<InteractiveSlider
							label={t("annualExpenses")}
							value={expenses}
							min={0}
							max={2000000}
							step={10000}
							onChange={(val) => {
								setExpenses(val);
								updateUrl({ expenses: val.toString() });
							}}
							hint={t("annualExpensesHint")}
						/>
					</div>

					{isVatRegistered && (
						<TipCard title="VAT Threshold Exceeded" type="warning">
							{t("warningVat")}
						</TipCard>
					)}
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
							padding: "16px",
							backgroundColor: "rgba(76, 175, 80, 0.1)",
							border: "1px solid var(--success)",
							borderRadius: "8px",
						}}
					>
						<span
							style={{
								display: "block",
								fontSize: "14px",
								color: "var(--success)",
								fontWeight: 600,
								marginBottom: "4px",
							}}
						>
							{t("bestOption")}
						</span>
						<strong
							style={{
								display: "block",
								fontSize: "24px",
								color: "var(--success)",
							}}
						>
							{bestOption.title}
						</strong>
						{savings > 0 && (
							<span
								style={{
									display: "block",
									fontSize: "14px",
									color: "var(--success)",
									marginTop: "4px",
								}}
							>
								{t("saveAmount", { amount: formatCurrency(savings) })}
							</span>
						)}
					</div>

					<div
						style={{ display: "flex", flexDirection: "column", gap: "16px" }}
					>
						{/* 8% Flat Rate */}
						<div
							style={{
								padding: "16px",
								border: `2px solid ${bestOption.id === "8percent" ? "var(--success)" : "var(--border-color)"}`,
								borderRadius: "8px",
								opacity: isVatRegistered ? 0.5 : 1,
							}}
						>
							<h3
								style={{
									fontSize: "16px",
									marginBottom: "12px",
									display: "flex",
									justifyContent: "space-between",
								}}
							>
								<span>{t("option8Percent")}</span>
								{bestOption.id === "8percent" && (
									<span
										style={{
											fontSize: "14px",
											backgroundColor: "var(--success)",
											color: "white",
											padding: "2px 8px",
											borderRadius: "12px",
										}}
									>
										Best
									</span>
								)}
							</h3>

							<div
								style={{
									display: "flex",
									justifyContent: "space-between",
									marginBottom: "8px",
									fontSize: "14px",
									color: "var(--text-secondary)",
								}}
							>
								<span>{t("totalTax")}</span>
								<strong>{formatCurrency(tax8Percent)}</strong>
							</div>

							<div
								style={{
									display: "flex",
									justifyContent: "space-between",
									paddingTop: "8px",
									borderTop: "1px dashed var(--border-color)",
								}}
							>
								<span style={{ fontWeight: 600 }}>{t("netIncome")}</span>
								<strong
									style={{
										color:
											bestOption.id === "8percent"
												? "var(--success)"
												: "var(--text-primary)",
									}}
								>
									{formatCurrency(net8Percent)}
								</strong>
							</div>
						</div>

						{/* OSD */}
						<div
							style={{
								padding: "16px",
								border: `2px solid ${bestOption.id === "osd" ? "var(--success)" : "var(--border-color)"}`,
								borderRadius: "8px",
							}}
						>
							<h3
								style={{
									fontSize: "16px",
									marginBottom: "12px",
									display: "flex",
									justifyContent: "space-between",
								}}
							>
								<span>{t("optionOsd")}</span>
								{bestOption.id === "osd" && (
									<span
										style={{
											fontSize: "14px",
											backgroundColor: "var(--success)",
											color: "white",
											padding: "2px 8px",
											borderRadius: "12px",
										}}
									>
										Best
									</span>
								)}
							</h3>

							<div
								style={{
									display: "flex",
									justifyContent: "space-between",
									fontSize: "14px",
									color: "var(--text-secondary)",
									marginBottom: "4px",
								}}
							>
								<span>{t("breakdownIncomeTax")}</span>
								<span>{formatCurrency(incomeTaxOsd)}</span>
							</div>
							<div
								style={{
									display: "flex",
									justifyContent: "space-between",
									fontSize: "14px",
									color: "var(--text-secondary)",
									marginBottom: "8px",
								}}
							>
								<span>{t("breakdownPercentageTax")}</span>
								<span>{formatCurrency(percentageTaxOsd)}</span>
							</div>

							<div
								style={{
									display: "flex",
									justifyContent: "space-between",
									marginBottom: "8px",
									fontSize: "14px",
								}}
							>
								<span>{t("totalTax")}</span>
								<strong>{formatCurrency(totalTaxOsd)}</strong>
							</div>

							<div
								style={{
									display: "flex",
									justifyContent: "space-between",
									paddingTop: "8px",
									borderTop: "1px dashed var(--border-color)",
								}}
							>
								<span style={{ fontWeight: 600 }}>{t("netIncome")}</span>
								<strong
									style={{
										color:
											bestOption.id === "osd"
												? "var(--success)"
												: "var(--text-primary)",
									}}
								>
									{formatCurrency(netOsd)}
								</strong>
							</div>
						</div>

						{/* Itemized */}
						<div
							style={{
								padding: "16px",
								border: `2px solid ${bestOption.id === "itemized" ? "var(--success)" : "var(--border-color)"}`,
								borderRadius: "8px",
							}}
						>
							<h3
								style={{
									fontSize: "16px",
									marginBottom: "12px",
									display: "flex",
									justifyContent: "space-between",
								}}
							>
								<span>{t("optionItemized")}</span>
								{bestOption.id === "itemized" && (
									<span
										style={{
											fontSize: "14px",
											backgroundColor: "var(--success)",
											color: "white",
											padding: "2px 8px",
											borderRadius: "12px",
										}}
									>
										Best
									</span>
								)}
							</h3>

							<div
								style={{
									display: "flex",
									justifyContent: "space-between",
									fontSize: "14px",
									color: "var(--text-secondary)",
									marginBottom: "4px",
								}}
							>
								<span>{t("breakdownIncomeTax")}</span>
								<span>{formatCurrency(incomeTaxItemized)}</span>
							</div>
							<div
								style={{
									display: "flex",
									justifyContent: "space-between",
									fontSize: "14px",
									color: "var(--text-secondary)",
									marginBottom: "8px",
								}}
							>
								<span>{t("breakdownPercentageTax")}</span>
								<span>{formatCurrency(percentageTaxItemized)}</span>
							</div>

							<div
								style={{
									display: "flex",
									justifyContent: "space-between",
									marginBottom: "8px",
									fontSize: "14px",
								}}
							>
								<span>{t("totalTax")}</span>
								<strong>{formatCurrency(totalTaxItemized)}</strong>
							</div>

							<div
								style={{
									display: "flex",
									justifyContent: "space-between",
									paddingTop: "8px",
									borderTop: "1px dashed var(--border-color)",
								}}
							>
								<span style={{ fontWeight: 600 }}>{t("netIncome")}</span>
								<strong
									style={{
										color:
											bestOption.id === "itemized"
												? "var(--success)"
												: "var(--text-primary)",
									}}
								>
									{formatCurrency(netItemized)}
								</strong>
							</div>
						</div>
					</div>
				</div>
			</div>
		</ToolLayout>
	);
}
