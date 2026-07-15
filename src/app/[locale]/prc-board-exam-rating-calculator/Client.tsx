"use client";

import { useTranslations } from "next-intl";
import {
	BOARD_EXAM_CONFIGS,
	BoardExamType,
	calculatePRCRating,
} from "../../../core/calculators/pRCBoardExamRating";
import { useCalculatorState } from "../../../hooks/useCalculatorState";
import ToolHeader from "../components/ToolHeader";
import ToolLayout from "../components/ToolLayout";

export default function PRCBoardExamRatingClient() {
	const t = useTranslations("PRCBoardExamRating");

	// State for exam type and generic scores object
	const [state, updateState] = useCalculatorState(
		{ examType: "ce", scoresStr: "{}" },
		{ examType: String, scoresStr: String },
	);

	const { examType, scoresStr } = state;
	const currentExam = examType as BoardExamType;
	const config = BOARD_EXAM_CONFIGS[currentExam];

	let scores: Record<string, number> = {};
	try {
		scores = JSON.parse(scoresStr || "{}");
	} catch (e) {
		scores = {};
	}

	const handleScoreChange = (id: string, val: string) => {
		const newScores = { ...scores, [id]: Number(val) };
		updateState({ scoresStr: JSON.stringify(newScores) });
	};

	const { generalAverage, passed, remarks, failingSubjects } =
		calculatePRCRating(currentExam, scores);

	return (
		<ToolLayout maxWidth="1200px">
			<ToolHeader
				title={t("title")}
				subtitle={t("subtitle")}
				adSlotId="prc-board-top"
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

					<div className="form-group" style={{ marginBottom: "24px" }}>
						<label className="form-label" htmlFor="examType">
							{t("examTypeLabel")}
						</label>
						<select
							id="examType"
							className="form-control"
							value={examType}
							onChange={(e) =>
								updateState({ examType: e.target.value, scoresStr: "{}" })
							}
						>
							<option value="ce">{t("examCE")}</option>
							<option value="nle">{t("examNLE")}</option>
							<option value="medtech">{t("examMTLE")}</option>
							<option value="cpa">{t("examCPA")}</option>
						</select>
					</div>

					<div
						style={{ display: "flex", flexDirection: "column", gap: "16px" }}
					>
						{config.subjects.map((sub) => (
							<div key={sub.id} className="form-group">
								<label className="form-label" htmlFor={`score-${sub.id}`}>
									{sub.name}{" "}
									<span
										style={{ color: "var(--text-secondary)", fontWeight: 400 }}
									>
										({(sub.weight * 100).toFixed(0)}%)
									</span>
								</label>
								<input
									id={`score-${sub.id}`}
									type="number"
									className="form-control"
									value={scores[sub.id] || ""}
									onChange={(e) => handleScoreChange(sub.id, e.target.value)}
									min="0"
									max="100"
									placeholder="e.g. 85"
								/>
							</div>
						))}
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
							{t("averageLabel")}
						</span>

						<strong
							style={{
								display: "block",
								fontSize: "48px",
								color: passed ? "#1b5e20" : "var(--primary)",
								lineHeight: 1,
							}}
						>
							{generalAverage}%
						</strong>
					</div>

					<div
						style={{
							padding: "16px",
							backgroundColor: "var(--surface-color)",
							borderLeft: `4px solid ${passed ? "#2e7d32" : "#d32f2f"}`,
							borderRadius: "4px",
						}}
					>
						<strong
							style={{
								display: "block",
								fontSize: "14px",
								marginBottom: "6px",
								color: passed ? "#1b5e20" : "#b71c1c",
							}}
						>
							{t("statusLabel")}:{" "}
							{passed
								? t("passed")
								: remarks.includes("CONDITIONED")
									? t("conditioned")
									: t("failed")}
						</strong>
					</div>

					{failingSubjects.length > 0 && (
						<div
							style={{
								marginTop: "16px",
								padding: "16px",
								backgroundColor: "#ffebee",
								borderRadius: "4px",
								border: "1px solid #ffcdd2",
							}}
						>
							<strong
								style={{
									display: "block",
									fontSize: "14px",
									color: "#c62828",
									marginBottom: "8px",
								}}
							>
								{t("failingSubjectsTitle")}
							</strong>
							<ul
								style={{
									margin: 0,
									paddingLeft: "20px",
									fontSize: "14px",
									color: "#b71c1c",
								}}
							>
								{failingSubjects.map((sub, idx) => (
									<li key={idx}>{sub}</li>
								))}
							</ul>
						</div>
					)}
				</div>
			</div>
		</ToolLayout>
	);
}
