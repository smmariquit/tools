"use client";

import { useTranslations } from "next-intl";
import { calculateBIRWithholdingTax } from "../../../core/calculators/bIRWithholdingTax";
import { useCalculatorState } from "../../../hooks/useCalculatorState";
import InteractiveSlider from "../components/InteractiveSlider";
import ToolHeader from "../components/ToolHeader";
import ToolLayout from "../components/ToolLayout";

export default function BIRWithholdingTaxClient() {
	const t = useTranslations("BIRWithholdingTax");

	const [state, updateState] = useCalculatorState(
		{ grossAmount: 50000, taxRate: 5, isVatInclusive: false },
		{ grossAmount: Number, taxRate: Number, isVatInclusive: Boolean },
	);

	const { grossAmount, taxRate, isVatInclusive } = state;
	const { taxBase, vatAmount, withholdingTax, netAmount } =
		calculateBIRWithholdingTax(grossAmount, taxRate, isVatInclusive);

	const formatCurrency = (amount: number) => {
		return new Intl.NumberFormat("en-PH", {
			style: "currency",
			currency: "PHP",
		}).format(amount);
	};

	return (
		<ToolLayout>
			<ToolHeader
				title={t("title")}
				subtitle={t("subtitle")}
				adSlotId="bir-wt-top"
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
						label={t("grossAmountLabel")}
						value={grossAmount}
						onChange={(val: number | string) =>
							updateState({ grossAmount: Number(val) })
						}
						min={0}
						max={500000}
						step={1000}
						formatValue={(val: number) => formatCurrency(val)}
					/>

					<div
						className="form-group"
						style={{ marginTop: "24px", marginBottom: "16px" }}
					>
						<label className="form-label" htmlFor="taxRate">
							{t("taxRateLabel")}
						</label>
						<select
							id="taxRate"
							className="form-control"
							value={taxRate}
							onChange={(e) => updateState({ taxRate: Number(e.target.value) })}
						>
							<option value={1}>{t("rate1")}</option>
							<option value={2}>{t("rate2")}</option>
							<option value={5}>{t("rate5")}</option>
							<option value={10}>{t("rate10")}</option>
							<option value={15}>{t("rate15")}</option>
						</select>
					</div>

					<div className="form-group" style={{ marginTop: "24px" }}>
						<div className="form-label">{t("vatInclusiveLabel")}</div>
						<div style={{ display: "flex", gap: "16px", marginTop: "8px" }}>
							<label
								style={{
									display: "flex",
									alignItems: "center",
									gap: "8px",
									cursor: "pointer",
									fontSize: "15px",
								}}
							>
								<input
									type="radio"
									checked={!isVatInclusive}
									onChange={() => updateState({ isVatInclusive: false })}
									style={{
										width: "18px",
										height: "18px",
										accentColor: "var(--primary)",
									}}
								/>
								No (Non-VAT)
							</label>
							<label
								style={{
									display: "flex",
									alignItems: "center",
									gap: "8px",
									cursor: "pointer",
									fontSize: "15px",
								}}
							>
								<input
									type="radio"
									checked={isVatInclusive}
									onChange={() => updateState({ isVatInclusive: true })}
									style={{
										width: "18px",
										height: "18px",
										accentColor: "var(--primary)",
									}}
								/>
								Yes (VAT Inclusive)
							</label>
						</div>
						<p className="form-hint" style={{ marginTop: "12px" }}>
							{t("vatHint")}
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
								marginBottom: "8px",
								textTransform: "uppercase",
								letterSpacing: "1px",
							}}
						>
							{t("netAmountLabel")}
						</span>

						<strong
							style={{
								display: "block",
								fontSize: "42px",
								color: "var(--primary)",
								lineHeight: 1,
							}}
						>
							{formatCurrency(netAmount)}
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
							{t("wtLabel")}
						</span>
						<strong style={{ fontSize: "16px", color: "#d32f2f" }}>
							- {formatCurrency(withholdingTax)}
						</strong>
					</div>

					{isVatInclusive && (
						<>
							<div
								style={{
									display: "flex",
									justifyContent: "space-between",
									alignItems: "center",
									padding: "12px 0",
									borderBottom: "1px dashed var(--border-color)",
								}}
							>
								<span
									style={{ fontSize: "14px", color: "var(--text-secondary)" }}
								>
									{t("vatAmountLabel")}
								</span>
								<strong style={{ fontSize: "16px" }}>
									{formatCurrency(vatAmount)}
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
								<span
									style={{ fontSize: "14px", color: "var(--text-secondary)" }}
								>
									{t("taxBaseLabel")}
								</span>
								<strong style={{ fontSize: "16px" }}>
									{formatCurrency(taxBase)}
								</strong>
							</div>
						</>
					)}

					<div
						style={{
							padding: "16px",
							marginTop: "24px",
							backgroundColor: "var(--surface-color)",
							borderLeft: "4px solid #1976d2",
							borderRadius: "4px",
						}}
					>
						<strong
							style={{
								display: "block",
								fontSize: "14px",
								marginBottom: "6px",
								color: "#0d47a1",
							}}
						>
							💡 Form 2307 Reminder
						</strong>
						<p
							style={{
								fontSize: "13px",
								color: "var(--text-secondary)",
								margin: 0,
								lineHeight: 1.5,
							}}
						>
							{t("wtHint")}
						</p>
					</div>
				</div>
			</div>
		</ToolLayout>
	);
}
