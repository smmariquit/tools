"use client";

import { useTranslations } from "next-intl";
import { calculateBillSplit } from "../../../core/calculators/billSplitter";
import { useCalculatorState } from "../../../hooks/useCalculatorState";
import InteractiveSlider from "../components/InteractiveSlider";
import ToolHeader from "../components/ToolHeader";
import ToolLayout from "../components/ToolLayout";

export default function BillSplitterClient() {
	const t = useTranslations("BillSplitter");

	const [state, updateState] = useCalculatorState(
		{ receiptAmount: 1000, tipAmount: 0, pax: 4 },
		{ receiptAmount: Number, tipAmount: Number, pax: Number },
	);

	const { receiptAmount, tipAmount, pax } = state;
	const { totalToPay, amountPerPerson } = calculateBillSplit(
		receiptAmount,
		tipAmount,
		pax,
	);

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
				adSlotId="bill-splitter-top"
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
						label={t("receiptAmountLabel")}
						value={receiptAmount}
						onChange={(val: number | string) =>
							updateState({ receiptAmount: Number(val) })
						}
						min={0}
						max={20000}
						step={50}
						formatValue={(val: number) => formatCurrency(val)}
					/>

					<div style={{ marginTop: "24px" }}>
						<InteractiveSlider
							label={t("tipAmountLabel")}
							value={tipAmount}
							onChange={(val: number | string) =>
								updateState({ tipAmount: Number(val) })
							}
							min={0}
							max={2000}
							step={10}
							formatValue={(val: number) => formatCurrency(val)}
						/>
					</div>

					<div style={{ marginTop: "24px" }}>
						<InteractiveSlider
							label={t("paxLabel")}
							value={pax}
							onChange={(val: number | string) =>
								updateState({ pax: Number(val) })
							}
							min={1}
							max={20}
							step={1}
							formatValue={(val: number) => `${val} pax`}
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
							{t("perPersonLabel")}
						</span>

						<strong
							style={{
								display: "block",
								fontSize: "48px",
								color: "var(--primary)",
								lineHeight: 1,
							}}
						>
							{formatCurrency(amountPerPerson)}
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
						<span style={{ fontSize: "15px", color: "var(--text-secondary)" }}>
							{t("totalPayLabel")}
						</span>
						<strong style={{ fontSize: "16px" }}>
							{formatCurrency(totalToPay)}
						</strong>
					</div>

					<div
						style={{
							padding: "16px",
							marginTop: "20px",
							backgroundColor: "var(--surface-color)",
							borderRadius: "8px",
							border: "1px solid var(--border-color)",
						}}
					>
						<strong
							style={{
								display: "block",
								fontSize: "15px",
								marginBottom: "8px",
								color: "var(--text-primary)",
							}}
						>
							{t("sendViaLabel")}
						</strong>
						<p
							style={{
								fontSize: "14px",
								color: "var(--text-secondary)",
								margin: 0,
								lineHeight: 1.5,
							}}
						>
							{t("sendViaDesc")}{" "}
							<strong>{formatCurrency(amountPerPerson)}</strong>
						</p>
					</div>
				</div>
			</div>
		</ToolLayout>
	);
}
