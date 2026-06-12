"use client";

import { useTranslations } from "next-intl";
import { useCalculatorState } from "../../../hooks/useCalculatorState";
import { grossFromTax } from "../../../lib/reverseSalaryLogic";
import InteractiveSlider from "../components/InteractiveSlider";
import ToolHeader from "../components/ToolHeader";
import ToolLayout from "../components/ToolLayout";

export default function GrossFromTaxClient() {
	const t = useTranslations("GrossFromTax");

	const [state, updateState] = useCalculatorState(
		{ targetTax: 5000 },
		{ targetTax: Number },
	);

	const result = grossFromTax(state.targetTax);

	const formatCurrency = (amount: number) =>
		new Intl.NumberFormat("en-PH", {
			style: "currency",
			currency: "PHP",
		}).format(amount);

	return (
		<ToolLayout maxWidth="1200px">
			<ToolHeader
				title={t("title")}
				subtitle={t("subtitle")}
				adSlotId="gross-from-tax-top"
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
					<InteractiveSlider
						label={t("targetTaxLabel")}
						value={state.targetTax}
						onChange={(val: number | string) =>
							updateState({ targetTax: Number(val) })
						}
						min={0}
						max={150000}
						step={500}
						formatValue={(val: number) => formatCurrency(val)}
					/>
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

					<div
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
								{t("grossSalaryLabel")}
							</span>
						</div>
						<strong style={{ fontSize: "16px", color: "var(--text-primary)" }}>
							{formatCurrency(result.grossSalary)}
						</strong>
					</div>

					<div
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
								{t("sssLabel")}
							</span>
						</div>
						<strong
							style={{ fontSize: "16px", color: "var(--text-secondary)" }}
						>
							{formatCurrency(result.sss)}
						</strong>
					</div>

					<div
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
								{t("philhealthLabel")}
							</span>
						</div>
						<strong
							style={{ fontSize: "16px", color: "var(--text-secondary)" }}
						>
							{formatCurrency(result.philhealth)}
						</strong>
					</div>

					<div
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
								{t("pagibigLabel")}
							</span>
						</div>
						<strong
							style={{ fontSize: "16px", color: "var(--text-secondary)" }}
						>
							{formatCurrency(result.pagibig)}
						</strong>
					</div>

					<div
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
								{t("taxLabel")}
							</span>
						</div>
						<strong style={{ fontSize: "16px", color: "#b71c1c" }}>
							{formatCurrency(result.tax)}
						</strong>
					</div>

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
							{t("netPayLabel")}
						</span>
						<strong style={{ fontSize: "24px", color: "#1b5e20" }}>
							{formatCurrency(result.netPay)}
						</strong>
					</div>
				</div>
			</div>
		</ToolLayout>
	);
}
