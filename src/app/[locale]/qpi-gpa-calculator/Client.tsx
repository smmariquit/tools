"use client";

import { useTranslations } from "next-intl";
import { useState } from "react";
import {
	type CourseEntry,
	calculateQPIGPA,
} from "../../../core/calculators/qPIGPA";
import ToolHeader from "../components/ToolHeader";
import ToolLayout from "../components/ToolLayout";

export default function QPIGPAClient() {
	const t = useTranslations("QPIGPA");

	const [courses, setCourses] = useState<CourseEntry[]>([
		{ grade: 3.5, units: 3 },
		{ grade: 3.0, units: 3 },
		{ grade: 2.5, units: 3 },
	]);

	const addCourse = () => {
		setCourses([...courses, { grade: 3.0, units: 3 }]);
	};

	const removeCourse = (index: number) => {
		setCourses(courses.filter((_, i) => i !== index));
	};

	const updateCourse = (
		index: number,
		field: keyof CourseEntry,
		value: string,
	) => {
		const updated = [...courses];
		updated[index] = { ...updated[index], [field]: Number(value) };
		setCourses(updated);
	};

	const { qpi, totalUnits, totalQualityPoints } = calculateQPIGPA(courses);

	return (
		<ToolLayout maxWidth="1200px">
			<ToolHeader
				title={t("title")}
				subtitle={t("subtitle")}
				adSlotId="qpi-gpa-top"
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

					<div
						style={{ display: "flex", flexDirection: "column", gap: "12px" }}
					>
						{courses.map((course, idx) => (
							<div
								key={idx}
								style={{
									display: "flex",
									gap: "12px",
									alignItems: "center",
									padding: "12px",
									backgroundColor: "var(--surface-color)",
									borderRadius: "8px",
									border: "1px solid var(--border-color)",
								}}
							>
								<div style={{ flex: 1 }}>
									<label
										className="form-label"
										htmlFor={`grade-${idx}`}
										style={{ fontSize: "12px" }}
									>
										{t("gradeLabel")}
									</label>
									<select
										id={`grade-${idx}`}
										className="form-control"
										value={course.grade}
										onChange={(e) => updateCourse(idx, "grade", e.target.value)}
										style={{ fontSize: "14px" }}
									>
										<option value={4.0}>A (4.0)</option>
										<option value={3.5}>B+ (3.5)</option>
										<option value={3.0}>B (3.0)</option>
										<option value={2.5}>C+ (2.5)</option>
										<option value={2.0}>C (2.0)</option>
										<option value={1.5}>D+ (1.5)</option>
										<option value={1.0}>D (1.0)</option>
										<option value={0.0}>F (0.0)</option>
									</select>
								</div>
								<div style={{ width: "80px" }}>
									<label
										className="form-label"
										htmlFor={`units-${idx}`}
										style={{ fontSize: "12px" }}
									>
										{t("unitsLabel")}
									</label>
									<input
										id={`units-${idx}`}
										type="number"
										className="form-control"
										value={course.units}
										onChange={(e) => updateCourse(idx, "units", e.target.value)}
										min="1"
										max="6"
										style={{ fontSize: "14px" }}
									/>
								</div>
								<button
									onClick={() => removeCourse(idx)}
									style={{
										marginTop: "18px",
										padding: "6px 10px",
										backgroundColor: "transparent",
										border: "1px solid var(--border-color)",
										borderRadius: "4px",
										cursor: "pointer",
										color: "var(--text-secondary)",
										fontSize: "13px",
									}}
								>
									✕
								</button>
							</div>
						))}
					</div>

					<button
						onClick={addCourse}
						className="btn-secondary"
						style={{ width: "100%", marginTop: "16px" }}
					>
						{t("addCourseBtn")}
					</button>
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
							{t("qpiLabel")}
						</span>
						<strong
							style={{
								display: "block",
								fontSize: "48px",
								color: "var(--primary)",
								lineHeight: 1,
							}}
						>
							{qpi.toFixed(3)}
						</strong>
					</div>

					<div
						style={{
							display: "flex",
							justifyContent: "space-between",
							padding: "12px 0",
							borderBottom: "1px dashed var(--border-color)",
						}}
					>
						<span style={{ fontSize: "14px", color: "var(--text-secondary)" }}>
							{t("totalUnitsLabel")}
						</span>
						<strong style={{ fontSize: "16px" }}>{totalUnits}</strong>
					</div>

					<div
						style={{
							display: "flex",
							justifyContent: "space-between",
							padding: "12px 0",
						}}
					>
						<span style={{ fontSize: "14px", color: "var(--text-secondary)" }}>
							{t("totalQPLabel")}
						</span>
						<strong style={{ fontSize: "16px" }}>{totalQualityPoints}</strong>
					</div>
				</div>
			</div>
		</ToolLayout>
	);
}
