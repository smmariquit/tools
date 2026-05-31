"use client";

import { useTranslations } from "next-intl";
import { calculateGSISPension } from "../../../core/calculators/gSISPension";
import { useCalculatorState } from "../../../hooks/useCalculatorState";
import ToolFooter from "../../components/ToolFooter";
import InteractiveSlider from "../components/InteractiveSlider";
import ToolHeader from "../components/ToolHeader";
import ToolLayout from "../components/ToolLayout";

export default function GSISPensionClient() {
	const t = useTranslations("GSISPension");

	const [state, updateState] = useCalculatorState(
		{ amc: 30000, cvs: 20 },
		{ amc: parseFloat, cvs: parseFloat },
	);

	const { amc, cvs } = state;
	const { bmp } = calculateGSISPension(amc, cvs);

	const formatCurrency = (val: number) => {
		return (
			"₱" +
			val.toLocaleString("en-US", {
				minimumFractionDigits: 2,
				maximumFractionDigits: 2,
			})
		);
	};

	return (
		<ToolLayout>
			<ToolHeader
				title={t("title")}
				subtitle={t("subtitle")}
				adSlotId="gsis-pension-top"
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
						label={t("amcLabel")}
						value={amc}
						min={10000}
						max={200000}
						step={1000}
						onChange={(val) => updateState({ amc: val })}
					/>
					<div
						style={{
							fontSize: "12px",
							color: "var(--text-tertiary)",
							marginTop: "8px",
							marginBottom: "24px",
							textAlign: "left",
						}}
					>
						{t("amcDesc")}
					</div>

					<InteractiveSlider
						label={t("cvsLabel")}
						value={cvs}
						min={15}
						max={45}
						step={1}
						onChange={(val) => updateState({ cvs: val })}
					/>
					<div
						style={{
							fontSize: "12px",
							color: "var(--text-tertiary)",
							marginTop: "8px",
							textAlign: "left",
						}}
					>
						{t("cvsDesc")}
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
								fontSize: "16px",
								color: "var(--text-secondary)",
								marginBottom: "8px",
							}}
						>
							{t("bmpLabel")}
						</span>
						<strong
							style={{
								display: "block",
								fontSize: "36px",
								color: "var(--primary)",
							}}
						>
							{formatCurrency(bmp)}
						</strong>
						{bmp === 0 && (
							<span
								style={{
									display: "block",
									fontSize: "12px",
									color: "#d32f2f",
									marginTop: "8px",
								}}
							>
								{t("minServiceWarn")}
							</span>
						)}
						{bmp === amc * 0.9 && (
							<span
								style={{
									display: "block",
									fontSize: "12px",
									color: "var(--text-tertiary)",
									marginTop: "8px",
								}}
							>
								{t("capWarn")}
							</span>
						)}
					</div>
				</div>
			</div>

			<ToolFooter currentPath="/gsis-pension-calculator" />
		</ToolLayout>
	);
}
