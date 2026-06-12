"use client";

import Link from "next/link";
import { useState } from "react";
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
					<Link
						href="/"
						style={{
							fontSize: "14px",
							display: "inline-block",
							marginBottom: "16px",
						}}
					>
						&larr; Back to Tools
					</Link>
					<h1 className="page-title">UP / PUP GWA Calculator</h1>
					<p className="page-subtitle">
						Calculate your General Weighted Average for State Universities (1.0
						- 5.0 grading system).
					</p>
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
							<h2 style={{ fontSize: "18px" }}>Semester Grades</h2>
							<button
								onClick={addSubject}
								className="btn-secondary"
								style={{ padding: "6px 12px", fontSize: "12px" }}
							>
								+ Add Subject
							</button>
						</div>

						<div
							style={{
								display: "grid",
								gridTemplateColumns: "2fr 1fr 1fr auto",
								gap: "8px",
								marginBottom: "8px",
								fontSize: "12px",
								fontWeight: 600,
								color: "var(--text-secondary)",
							}}
						>
							<div>Subject (Optional)</div>
							<div>Grade</div>
							<div>Units</div>
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
										placeholder="e.g. CS 11"
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
										<option value="3.0">3.00 (Pass)</option>
										<option value="4.0">4.00 (Cond)</option>
										<option value="5.0">5.00 (Fail)</option>
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
										title="Remove subject"
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
								Current Semester GWA
							</h2>

							<div
								style={{
									display: "flex",
									justifyContent: "space-between",
									marginBottom: "16px",
									padding: "16px",
									backgroundColor: "#e8f5e9",
									borderRadius: "var(--border-radius-md)",
									border: "1px solid #c8e6c9",
								}}
							>
								<div style={{ width: "100%", textAlign: "center" }}>
									<span
										style={{
											display: "block",
											fontSize: "12px",
											color: "#2e7d32",
											textTransform: "uppercase",
											fontWeight: 600,
											marginBottom: "8px",
										}}
									>
										General Weighted Average
									</span>
									<strong
										style={{
											fontSize: "42px",
											color: "#1b5e20",
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
									Total Units: <strong>{totalUnits}</strong>
								</p>
								{gwa !== null && gwa <= 1.2 && (
									<p
										style={{
											color: "#f57f17",
											fontWeight: 600,
											marginTop: "8px",
										}}
									>
										🌟 University Scholar (US) Tier!
									</p>
								)}
								{gwa !== null && gwa > 1.2 && gwa <= 1.75 && (
									<p
										style={{
											color: "#1565c0",
											fontWeight: 600,
											marginTop: "8px",
										}}
									>
										✨ College Scholar (CS) Tier!
									</p>
								)}
								{gwa !== null && gwa > 3.0 && (
									<p
										style={{
											color: "#c62828",
											fontWeight: 600,
											marginTop: "8px",
										}}
									>
										Warning: Failing Average
									</p>
								)}
							</div>
						</div>

						<div className="card">
							<h2 style={{ fontSize: "16px", marginBottom: "12px" }}>
								Target GWA Predictor
							</h2>
							<p
								style={{
									fontSize: "12px",
									color: "var(--text-secondary)",
									marginBottom: "16px",
								}}
							>
								Find out what average you need on your remaining units to hit
								your target GWA.
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
										style={{ fontSize: "12px" }}
										htmlFor="current-total-units"
									>
										Current Total Units
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
										style={{ fontSize: "12px" }}
										htmlFor="current-gwa"
									>
										Current GWA
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
										style={{ fontSize: "12px" }}
										htmlFor="remaining-units"
									>
										Remaining Units
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
										style={{ fontSize: "12px" }}
										htmlFor="target-gwa"
									>
										Target GWA
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
											neededAverage < 1.0 ? "#ffebee" : "#fff8e1",
										border: `1px solid ${neededAverage < 1.0 ? "#ffcdd2" : "#ffecb3"}`,
										borderRadius: "var(--border-radius-sm)",
										textAlign: "center",
									}}
								>
									<div
										style={{ fontSize: "12px", color: "var(--text-secondary)" }}
									>
										Needed average for remaining units:
									</div>
									<div
										style={{
											fontSize: "20px",
											fontWeight: "bold",
											color:
												neededAverage < 1.0 ? "#c62828" : "var(--text-primary)",
										}}
									>
										{neededAverage.toFixed(4)}
									</div>
									{neededAverage < 1.0 && (
										<div
											style={{
												fontSize: "12px",
												color: "#c62828",
												marginTop: "4px",
											}}
										>
											Impossible (requires better than 1.0)
										</div>
									)}
									{neededAverage > 3.0 && (
										<div
											style={{
												fontSize: "12px",
												color: "var(--primary)",
												marginTop: "4px",
											}}
										>
											Very achievable (passing is 3.0)
										</div>
									)}
								</div>
							)}
						</div>
					</div>
				</div>

				<div
					style={{
						marginTop: "48px",
						paddingTop: "32px",
						borderTop: "1px solid var(--border-color)",
						color: "var(--text-primary)",
					}}
				>
					<h2 style={{ fontSize: "24px", marginBottom: "16px" }}>
						How the 1.0 - 5.0 GWA System Works
					</h2>
					<p style={{ marginBottom: "16px" }}>
						State universities in the Philippines like UP (University of the
						Philippines), PUP (Polytechnic University of the Philippines), and
						PLM (Pamantasan ng Lungsod ng Maynila) use an inverted grading
						system where <strong>1.00 is the highest grade</strong> (Excellent)
						and <strong>3.00 is the lowest passing grade</strong>. A grade of
						5.00 is a failure.
					</p>
					<h3
						style={{
							fontSize: "18px",
							marginBottom: "12px",
							marginTop: "24px",
						}}
					>
						GWA Formula
					</h3>
					<p style={{ marginBottom: "16px" }}>
						To calculate your General Weighted Average (GWA), multiply each
						subject's grade by its units to get the Grade Points. Sum all the
						Grade Points and divide by the Total Units.
					</p>
					<div
						style={{
							padding: "16px",
							backgroundColor: "var(--bg-color)",
							borderRadius: "var(--border-radius)",
							fontFamily: "monospace",
							marginBottom: "24px",
						}}
					>
						GWA = Σ(Grade × Units) ÷ Total Units
					</div>
					<h3 style={{ fontSize: "18px", marginBottom: "12px" }}>
						Latin Honors & Scholar Cutoffs (UP Standard)
					</h3>
					<ul
						style={{
							paddingLeft: "24px",
							marginBottom: "16px",
							lineHeight: "1.6",
						}}
					>
						<li>
							<strong>Summa Cum Laude:</strong> 1.2000 or better
						</li>
						<li>
							<strong>Magna Cum Laude:</strong> 1.4500 or better
						</li>
						<li>
							<strong>Cum Laude:</strong> 1.7500 or better
						</li>
						<li>
							<strong>University Scholar (US):</strong> 1.2000 or better (per
							semester)
						</li>
						<li>
							<strong>College Scholar (CS):</strong> 1.7500 or better (per
							semester)
						</li>
					</ul>
					<h3
						style={{
							fontSize: "18px",
							marginBottom: "12px",
							marginTop: "24px",
						}}
					>
						Other Universities Using the 1.0 – 5.0 Grading System
					</h3>
					<p style={{ marginBottom: "16px", fontSize: "15px" }}>
						Aside from the **University of the Philippines (UP)** and the
						**Polytechnic University of the Philippines (PUP)**, many other
						prominent higher education institutions in the country utilize this
						standard inverted scale where 1.0 is the highest mark and 3.0 is
						passing:
					</p>
					<ul
						style={{
							paddingLeft: "24px",
							marginBottom: "24px",
							lineHeight: "1.7",
							fontSize: "15px",
						}}
					>
						<li>
							<strong>Pamantasan ng Lungsod ng Maynila (PLM)</strong> — Standard
							1.00 to 5.00 scale.
						</li>
						<li>
							<strong>Technological University of the Philippines (TUP)</strong>{" "}
							— Excellent (1.0) to Failure (5.0).
						</li>
						<li>
							<strong>Rizal Technological University (RTU)</strong> — Inverted
							1.00 to 5.00 grading.
						</li>
						<li>
							<strong>Bulacan State University (BulSU)</strong> — Follows the
							1.0 to 5.0 grade brackets.
						</li>
						<li>
							<strong>Cavite State University (CvSU)</strong> — Inverted decimal
							system where 3.0 is passing.
						</li>
						<li>
							<strong>Batangas State University (BatStateU)</strong> — State
							university standard 1.00 to 5.00 system.
						</li>
					</ul>

					<p style={{ fontSize: "12px", color: "var(--text-secondary)" }}>
						Note: Grades like &quot;INC&quot; (Incomplete) or &quot;DRP&quot;
						(Dropped) are typically not included in the GWA computation. Consult
						your specific university&apos;s registrar for exact policies on 4.0
						(Conditional) grades.
					</p>
				</div>
			</div>
		</ToolLayout>
	);
}
