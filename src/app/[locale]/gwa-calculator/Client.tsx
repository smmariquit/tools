"use client";

import { useTranslations } from "next-intl";
import { useState } from "react";
import BackButton from "../../components/BackButton";
import ToolEyebrow from "../../components/doodle/ToolEyebrow";
import ToolIllustration from "../../components/illustrations/ToolIllustration";
import AdBanner from "../components/AdBanner";
import ToolLayout from "../components/ToolLayout";
import { calculateGwa, calculateTargetAverage } from "./gwaLogic";

type Subject = {
	id: string;
	name: string;
	grade: number | "";
	units: number | "";
};

export default function GwaCalculatorClient() {
	const t = useTranslations("GWACalculator");
	const [subjects, setSubjects] = useState<Subject[]>([
		{ id: "1", name: "", grade: "", units: 3 },
		{ id: "2", name: "", grade: "", units: 3 },
		{ id: "3", name: "", grade: "", units: 3 },
		{ id: "4", name: "", grade: "", units: 3 },
	]);

	// Target Calculator State
	const [currentUnits, setCurrentUnits] = useState<number | "">("");
	const [currentGwa, setCurrentGwa] = useState<number | "">("");
	const [targetUnits, setTargetUnits] = useState<number | "">("");
	const [targetGwa, setTargetGwa] = useState<number | "">("");

	const addSubject = () => {
		setSubjects([
			...subjects,
			{ id: Math.random().toString(), name: "", grade: "", units: 3 },
		]);
	};

	const removeSubject = (id: string) => {
		if (subjects.length > 1) {
			setSubjects(subjects.filter((s) => s.id !== id));
		}
	};

	const updateSubject = (
		id: string,
		field: keyof Subject,
		value: string | number,
	) => {
		setSubjects(
			subjects.map((s) => (s.id === id ? { ...s, [field]: value } : s)),
		);
	};

	// Calculation
	const validSubjects = subjects.filter(
		(s) => s.grade !== "" && s.units !== "" && s.units > 0,
	);
	const { gwa, totalUnits } = calculateGwa(
		validSubjects as { grade: number; units: number }[],
	);

	const neededAverage =
		currentUnits !== "" &&
		currentGwa !== "" &&
		targetUnits !== "" &&
		targetGwa !== ""
			? calculateTargetAverage(currentUnits, currentGwa, targetUnits, targetGwa)
			: null;

	return (
		<ToolLayout maxWidth="1200px">
			<div style={{ width: "100%", margin: "0 auto" }}>
				<div style={{ marginBottom: "24px" }}>
					<BackButton style={{ marginBottom: "16px" }}>
						{t("backToTools")}
					</BackButton>
					<ToolIllustration />
					<ToolEyebrow />
					<h1 className="page-title">{t("title")}</h1>
					<p className="page-subtitle">{t("subtitle")}</p>
				</div>

				<AdBanner dataAdSlot="gwa-top" />

				<div className="tool-grid" style={{ marginTop: "24px" }}>
					{/* Input Card */}
					<div className="card" style={{ alignSelf: "start" }}>
						<div
							style={{
								display: "flex",
								justifyContent: "space-between",
								alignItems: "center",
								marginBottom: "16px",
								borderBottom: "1px solid var(--border-color)",
								paddingBottom: "8px",
							}}
						>
							<h2 style={{ fontSize: "18px" }}>{t("semesterGrades")}</h2>
							<button
								onClick={addSubject}
								className="btn-secondary"
								style={{ padding: "6px 12px", fontSize: "14px" }}
							>
								{t("addSubject")}
							</button>
						</div>

						<div
							style={{
								display: "grid",
								gridTemplateColumns: "2fr 1fr 1fr auto",
								gap: "8px",
								marginBottom: "8px",
								fontSize: "14px",
								fontWeight: 600,
								color: "var(--text-secondary)",
							}}
						>
							<div>{t("colSubject")}</div>
							<div>{t("colGrade")}</div>
							<div>{t("colUnits")}</div>
							<div></div>
						</div>

						<div
							style={{
								display: "flex",
								flexDirection: "column",
								gap: "12px",
								marginBottom: "16px",
							}}
						>
							{subjects.map((subject) => (
								<div
									key={subject.id}
									style={{
										display: "grid",
										gridTemplateColumns: "2fr 1fr 1fr auto",
										gap: "8px",
										alignItems: "center",
									}}
								>
									<input
										type="text"
										placeholder={t("subjectPlaceholder")}
										className="form-control"
										value={subject.name}
										onChange={(e) =>
											updateSubject(subject.id, "name", e.target.value)
										}
									/>
									<select
										className="form-control"
										value={subject.grade}
										onChange={(e) =>
											updateSubject(
												subject.id,
												"grade",
												e.target.value === "" ? "" : parseFloat(e.target.value),
											)
										}
									>
										<option value="">-</option>
										<option value="1.0">1.00</option>
										<option value="1.25">1.25</option>
										<option value="1.5">1.50</option>
										<option value="1.75">1.75</option>
										<option value="2.0">2.00</option>
										<option value="2.25">2.25</option>
										<option value="2.5">2.50</option>
										<option value="2.75">2.75</option>
										<option value="3.0">{t("optionPass")}</option>
										<option value="4.0">{t("optionCond")}</option>
										<option value="5.0">{t("optionFail")}</option>
									</select>
									<input
										type="number"
										min="1"
										step="0.5"
										className="form-control"
										value={subject.units}
										onChange={(e) =>
											updateSubject(
												subject.id,
												"units",
												e.target.value === "" ? "" : parseFloat(e.target.value),
											)
										}
									/>
									<button
										onClick={() => removeSubject(subject.id)}
										style={{
											background: "none",
											border: "none",
											color: "var(--text-secondary)",
											cursor: "pointer",
											fontSize: "18px",
											padding: "0 4px",
										}}
										title={t("removeSubject")}
										disabled={subjects.length <= 1}
									>
										&times;
									</button>
								</div>
							))}
						</div>
					</div>

					{/* Results Card */}
					<div
						style={{ display: "flex", flexDirection: "column", gap: "24px" }}
					>
						<div
							className="card"
							style={{ backgroundColor: "var(--bg-color)" }}
						>
							<h2
								style={{
									fontSize: "18px",
									marginBottom: "16px",
									borderBottom: "1px solid var(--border-color)",
									paddingBottom: "8px",
									color: "var(--primary)",
								}}
							>
								{t("currentSemesterGwa")}
							</h2>

							<div
								style={{
									display: "flex",
									justifyContent: "space-between",
									marginBottom: "16px",
									padding: "16px",
									backgroundColor: "var(--success-bg)",
									borderRadius: "var(--border-radius-md)",
									border: "1px solid var(--success-bg)",
								}}
							>
								<div style={{ width: "100%", textAlign: "center" }}>
									<span
										style={{
											display: "block",
											fontSize: "14px",
											color: "var(--success)",
											textTransform: "uppercase",
											fontWeight: 600,
											marginBottom: "8px",
										}}
									>
										{t("gwaLabel")}
									</span>
									<strong
										style={{
											fontSize: "42px",
											color: "var(--success)",
											lineHeight: 1,
										}}
									>
										{gwa !== null ? gwa.toFixed(4) : "0.0000"}
									</strong>
								</div>
							</div>

							<div
								style={{
									fontSize: "14px",
									color: "var(--text-secondary)",
									textAlign: "center",
								}}
							>
								<p>
									{t("totalUnitsLabel")} <strong>{totalUnits}</strong>
								</p>
								{gwa !== null && gwa <= 1.2 && (
									<p
										style={{
											color: "var(--warning-amber)",
											fontWeight: 600,
											marginTop: "8px",
										}}
									>
										{t("tierUS")}
									</p>
								)}
								{gwa !== null && gwa > 1.2 && gwa <= 1.75 && (
									<p
										style={{
											color: "var(--chart-2)",
											fontWeight: 600,
											marginTop: "8px",
										}}
									>
										{t("tierCS")}
									</p>
								)}
								{gwa !== null && gwa > 3.0 && (
									<p
										style={{
											color: "var(--danger)",
											fontWeight: 600,
											marginTop: "8px",
										}}
									>
										{t("warningFailing")}
									</p>
								)}
							</div>
						</div>

						<div className="card">
							<h2 style={{ fontSize: "16px", marginBottom: "12px" }}>
								{t("targetPredictorTitle")}
							</h2>
							<p
								style={{
									fontSize: "14px",
									color: "var(--text-secondary)",
									marginBottom: "16px",
								}}
							>
								{t("targetPredictorDesc")}
							</p>

							<div
								style={{
									display: "grid",
									gridTemplateColumns: "1fr 1fr",
									gap: "12px",
									marginBottom: "12px",
								}}
							>
								<div className="form-group" style={{ marginBottom: 0 }}>
									<label
										className="form-label"
										style={{ fontSize: "14px" }}
										htmlFor="current-total-units"
									>
										{t("currentTotalUnits")}
									</label>
									<input
										id="current-total-units"
										type="number"
										className="form-control"
										value={currentUnits}
										onChange={(e) =>
											setCurrentUnits(
												e.target.value === "" ? "" : parseFloat(e.target.value),
											)
										}
									/>
								</div>
								<div className="form-group" style={{ marginBottom: 0 }}>
									<label
										className="form-label"
										style={{ fontSize: "14px" }}
										htmlFor="current-gwa"
									>
										{t("currentGwa")}
									</label>
									<input
										id="current-gwa"
										type="number"
										className="form-control"
										step="0.01"
										value={currentGwa}
										onChange={(e) =>
											setCurrentGwa(
												e.target.value === "" ? "" : parseFloat(e.target.value),
											)
										}
									/>
								</div>
								<div className="form-group" style={{ marginBottom: 0 }}>
									<label
										className="form-label"
										style={{ fontSize: "14px" }}
										htmlFor="remaining-units"
									>
										{t("remainingUnits")}
									</label>
									<input
										id="remaining-units"
										type="number"
										className="form-control"
										value={targetUnits}
										onChange={(e) =>
											setTargetUnits(
												e.target.value === "" ? "" : parseFloat(e.target.value),
											)
										}
									/>
								</div>
								<div className="form-group" style={{ marginBottom: 0 }}>
									<label
										className="form-label"
										style={{ fontSize: "14px" }}
										htmlFor="target-gwa"
									>
										{t("targetGwa")}
									</label>
									<input
										id="target-gwa"
										type="number"
										className="form-control"
										step="0.01"
										value={targetGwa}
										onChange={(e) =>
											setTargetGwa(
												e.target.value === "" ? "" : parseFloat(e.target.value),
											)
										}
									/>
								</div>
							</div>

							{neededAverage !== null && (
								<div
									style={{
										marginTop: "16px",
										padding: "12px",
										backgroundColor:
											neededAverage < 1.0
												? "var(--danger-bg)"
												: "var(--warning-amber-bg)",
										border: `1px solid ${neededAverage < 1.0 ? "var(--danger-bg)" : "var(--warning-amber-bg)"}`,
										borderRadius: "var(--border-radius-sm)",
										textAlign: "center",
									}}
								>
									<div
										style={{ fontSize: "14px", color: "var(--text-secondary)" }}
									>
										{t("neededAverageLabel")}
									</div>
									<div
										style={{
											fontSize: "20px",
											fontWeight: "bold",
											color:
												neededAverage < 1.0
													? "var(--danger)"
													: "var(--text-primary)",
										}}
									>
										{neededAverage.toFixed(4)}
									</div>
									{neededAverage < 1.0 && (
										<div
											style={{
												fontSize: "14px",
												color: "var(--danger)",
												marginTop: "4px",
											}}
										>
											{t("impossible")}
										</div>
									)}
									{neededAverage > 3.0 && (
										<div
											style={{
												fontSize: "14px",
												color: "var(--primary)",
												marginTop: "4px",
											}}
										>
											{t("veryAchievable")}
										</div>
									)}
								</div>
							)}
						</div>
					</div>
				</div>
			</div>
		</ToolLayout>
	);
}
