"use client";

import { useTranslations } from "next-intl";
import { calculateMotorcycleLoan } from "../../../core/calculators/motorcycleLoan";
import { useCalculatorState } from "../../../hooks/useCalculatorState";
import InteractiveSlider from "../components/InteractiveSlider";
import ToolHeader from "../components/ToolHeader";
import ToolLayout from "../components/ToolLayout";

export default function MotorcycleLoanClient() {
	const t = useTranslations("MotorcycleLoan");

	const [state, updateState] = useCalculatorState(
		{ cashPrice: 90000, downPayment: 15000, termMonths: 36, interestRate: 2 },
		{
			cashPrice: Number,
			downPayment: Number,
			termMonths: Number,
			interestRate: Number,
		},
	);

	const { cashPrice, downPayment, termMonths, interestRate } = state;
	const { amountFinanced, totalInterest, totalCost, monthlyAmortization } =
		calculateMotorcycleLoan(cashPrice, downPayment, termMonths, interestRate);

	const formatCurrency = (amount: number) => {
		return new Intl.NumberFormat("en-PH", {
			style: "currency",
			currency: "PHP",
		}).format(amount);
	};

	return (
		<ToolLayout maxWidth="1200px">
			<ToolHeader
				title={t("title")}
				subtitle={t("subtitle")}
				adSlotId="motorcycle-loan-top"
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
						label={t("cashPriceLabel")}
						value={cashPrice}
						onChange={(val: number | string) =>
							updateState({ cashPrice: Number(val) })
						}
						min={30000}
						max={500000}
						step={1000}
						formatValue={(val: number) => formatCurrency(val)}
					/>

					<div style={{ marginTop: "24px" }}>
						<InteractiveSlider
							label={t("downPaymentLabel")}
							value={downPayment}
							onChange={(val: number | string) =>
								updateState({ downPayment: Number(val) })
							}
							min={0}
							max={cashPrice - 1000}
							step={1000}
							formatValue={(val: number) => formatCurrency(val)}
						/>
					</div>

					<div style={{ marginTop: "24px" }}>
						<InteractiveSlider
							label={t("termMonthsLabel")}
							value={termMonths}
							onChange={(val: number | string) =>
								updateState({ termMonths: Number(val) })
							}
							min={6}
							max={48}
							step={6}
							formatValue={(val: number) => `${val} Months`}
						/>
					</div>

					<div style={{ marginTop: "24px" }}>
						<InteractiveSlider
							label={t("interestRateLabel")}
							value={interestRate}
							onChange={(val: number | string) =>
								updateState({ interestRate: Number(val) })
							}
							min={0.5}
							max={4}
							step={0.1}
							formatValue={(val: number) => `${val}% per month`}
							hint={t("interestRateHint")}
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
								marginBottom: "8px",
								textTransform: "uppercase",
								letterSpacing: "1px",
							}}
						>
							{t("monthlyAmortizationLabel")}
						</span>

						<strong
							style={{
								display: "block",
								fontSize: "42px",
								color: "var(--primary)",
								lineHeight: 1,
							}}
						>
							{formatCurrency(monthlyAmortization)}
						</strong>
					</div>

					<div
						style={{
							display: "flex",
							justifyContent: "space-between",
							alignItems: "center",
							padding: "12px 0",
							borderBottom: "1px dashed var(--border-color)",
						}}
					>
						<span style={{ fontSize: "14px", color: "var(--text-secondary)" }}>
							{t("amountFinancedLabel")}
						</span>
						<strong style={{ fontSize: "16px" }}>
							{formatCurrency(amountFinanced)}
						</strong>
					</div>

					<div
						style={{
							display: "flex",
							justifyContent: "space-between",
							alignItems: "center",
							padding: "12px 0",
							borderBottom: "1px dashed var(--border-color)",
						}}
					>
						<span style={{ fontSize: "14px", color: "var(--text-secondary)" }}>
							{t("totalInterestLabel")}
						</span>
						<strong style={{ fontSize: "16px", color: "#d32f2f" }}>
							+ {formatCurrency(totalInterest)}
						</strong>
					</div>

					<div
						style={{
							display: "flex",
							justifyContent: "space-between",
							alignItems: "center",
							padding: "16px 0",
							marginTop: "8px",
							borderTop: "1px solid var(--border-color)",
						}}
					>
						<span style={{ fontSize: "16px", fontWeight: 600 }}>
							{t("totalCostLabel")}
						</span>
						<strong style={{ fontSize: "20px", color: "#1b5e20" }}>
							{formatCurrency(totalCost)}
						</strong>
					</div>

					<div
						style={{
							padding: "16px",
							marginTop: "24px",
							backgroundColor: "var(--surface-color)",
							borderLeft: "4px solid #f57c00",
							borderRadius: "4px",
						}}
					>
						<strong
							style={{
								display: "block",
								fontSize: "14px",
								marginBottom: "6px",
								color: "#e65100",
							}}
						>
							⚠️ {t("warningTitle")}
						</strong>
						<p
							style={{
								fontSize: "13px",
								color: "var(--text-secondary)",
								margin: 0,
								lineHeight: 1.5,
							}}
						>
							{t("warningDesc")}
						</p>
					</div>
				</div>
			</div>
		</ToolLayout>
	);
}
