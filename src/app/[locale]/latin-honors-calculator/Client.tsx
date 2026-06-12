"use client";

import { useTranslations } from "next-intl";
import {
	calculateLatinHonors,
	SCHOOL_CONFIGS,
	type SchoolSystem,
} from "../../../core/calculators/latinHonors";
import { useCalculatorState } from "../../../hooks/useCalculatorState";
import InteractiveSlider from "../components/InteractiveSlider";
import ToolHeader from "../components/ToolHeader";
import ToolLayout from "../components/ToolLayout";

export default function LatinHonorsClient() {
	const t = useTranslations("LatinHonors");

	const [state, updateState] = useCalculatorState(
		{ school: "up", gwa: 1.5 },
		{ school: String, gwa: Number },
	);

	const { school, gwa } = state;
	const currentSchool = school as SchoolSystem;
	const config = SCHOOL_CONFIGS[currentSchool];
	const { honor, nextHonor, gap } = calculateLatinHonors(currentSchool, gwa);

	const isHighest = honor === "Summa Cum Laude";
	const hasHonor = honor !== "No Honor";

	return (
		<ToolLayout maxWidth="1200px">
			<ToolHeader
				title={t("title")}
				subtitle={t("subtitle")}
				adSlotId="latin-honors-top"
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

					<div className="form-group" style={{ marginBottom: "24px" }}>
						<label className="form-label" htmlFor="school">
							{t("schoolLabel")}
						</label>
						<select
							id="school"
							className="form-control"
							value={school}
							onChange={(e) => {
								const newSchool = e.target.value as SchoolSystem;
								const newConfig = SCHOOL_CONFIGS[newSchool];
								const defaultGwa = newConfig.lowerIsBetter ? 1.5 : 3.3;
								updateState({ school: e.target.value, gwa: defaultGwa });
							}}
						>
							<option value="up">UP (University of the Philippines)</option>
							<option value="pup">PUP (Polytechnic University)</option>
							<option value="ust">UST (University of Santo Tomas)</option>
							<option value="ateneo">Ateneo de Manila University</option>
							<option value="dlsu">De La Salle University (DLSU)</option>
						</select>
					</div>

					<InteractiveSlider
						label={t("gwaLabel")}
						value={gwa}
						onChange={(val: number | string) =>
							updateState({ gwa: Number(val) })
						}
						min={config.lowerIsBetter ? 1.0 : 0.0}
						max={config.lowerIsBetter ? 3.0 : 4.0}
						step={0.01}
						formatValue={(val: number) => val.toFixed(2)}
						hint={`${t("scaleHint")}: ${config.scale}`}
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
							marginBottom: "24px",
							padding: "24px",
							backgroundColor: hasHonor
								? "rgba(46, 125, 50, 0.05)"
								: "rgba(13, 71, 161, 0.05)",
							border: `1px solid ${hasHonor ? "#2e7d32" : "var(--primary)"}`,
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
							{t("honorLabel")}
						</span>
						<strong
							style={{
								display: "block",
								fontSize: "28px",
								color: hasHonor ? "#1b5e20" : "var(--text-secondary)",
								lineHeight: 1.2,
							}}
						>
							{hasHonor ? `🎓 ${honor}` : t("noHonor")}
						</strong>
					</div>

					{!isHighest && nextHonor && (
						<div
							style={{
								padding: "16px",
								backgroundColor: "var(--surface-color)",
								borderLeft: "4px solid #f57c00",
								borderRadius: "4px",
								marginBottom: "20px",
							}}
						>
							<p
								style={{
									fontSize: "14px",
									color: "var(--text-secondary)",
									margin: 0,
									lineHeight: 1.5,
								}}
							>
								{t("gapLabel")}{" "}
								<strong style={{ color: "#e65100" }}>{gap.toFixed(3)}</strong>{" "}
								{t("gapSuffix")} <strong>{nextHonor}</strong>
							</p>
						</div>
					)}

					<h3
						style={{
							fontSize: "15px",
							marginBottom: "12px",
							color: "var(--text-primary)",
						}}
					>
						{t("cutoffsTitle")}
					</h3>
					<div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
						{config.honors.map((h) => {
							const isActive = honor === h.label;
							return (
								<div
									key={h.label}
									style={{
										display: "flex",
										justifyContent: "space-between",
										padding: "10px 12px",
										borderRadius: "6px",
										backgroundColor: isActive
											? "rgba(46, 125, 50, 0.08)"
											: "transparent",
										border: isActive
											? "1px solid #2e7d32"
											: "1px solid var(--border-color)",
									}}
								>
									<span
										style={{
											fontSize: "14px",
											fontWeight: isActive ? 600 : 400,
											color: isActive ? "#1b5e20" : "var(--text-secondary)",
										}}
									>
										{isActive && "✓ "}
										{h.label}
									</span>
									<span style={{ fontSize: "14px", fontWeight: 500 }}>
										{config.lowerIsBetter ? "≤" : "≥"} {h.cutoff.toFixed(2)}
									</span>
								</div>
							);
						})}
					</div>
				</div>
			</div>
		</ToolLayout>
	);
}
