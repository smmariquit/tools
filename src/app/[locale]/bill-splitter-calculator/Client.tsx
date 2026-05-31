"use client";

import { useTranslations } from "next-intl";
import { calculateBillSplitter } from "../../../core/calculators/billSplitter";
import { useCalculatorState } from "../../../hooks/useCalculatorState";
import ToolFooter from "../../components/ToolFooter";
import InteractiveSlider from "../components/InteractiveSlider";
import ToolHeader from "../components/ToolHeader";
import ToolLayout from "../components/ToolLayout";

export default function BillSplitterClient() {
	const t = useTranslations("BillSplitter");

	const [state, updateState] = useCalculatorState(
		{ amount: 100 },
		{ amount: parseFloat },
	);

	const { result } = calculateBillSplitter(state.amount);

	return (
		<ToolLayout>
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
						label={t("amountLabel")}
						value={state.amount}
						min={0}
						max={1000}
						step={10}
						onChange={(val) => updateState({ amount: val })}
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
							fontSize: "15px",
						}}
					>
						<span style={{ color: "var(--text-secondary)" }}>
							{t("resultLabel")}
						</span>
						<strong style={{ color: "var(--text-primary)" }}>{result}</strong>
					</div>
				</div>
			</div>

			<ToolFooter currentPath="/bill-splitter-calculator" />
		</ToolLayout>
	);
}
