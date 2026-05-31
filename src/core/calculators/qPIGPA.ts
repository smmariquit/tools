export type GPASystem = "ateneo" | "dlsu" | "standard_4";

export interface CourseEntry {
	grade: number;
	units: number;
}

/**
 * Ateneo QPI: Uses letter grades mapped to 4.0 scale.
 *   A = 4.0, B+ = 3.5, B = 3.0, C+ = 2.5, C = 2.0, D = 1.0, F = 0.0
 *
 * DLSU CGPA: Similar 4.0 scale with half-point increments.
 *   4.0, 3.5, 3.0, 2.5, 2.0, 1.5, 1.0, 0.0
 *
 * Standard 4.0: For other schools using the American GPA system.
 */

export function calculateQPIGPA(courses: CourseEntry[]) {
	if (courses.length === 0) {
		return { qpi: 0, totalUnits: 0, totalQualityPoints: 0 };
	}

	let totalQualityPoints = 0;
	let totalUnits = 0;

	for (const course of courses) {
		if (course.units <= 0) continue;
		totalQualityPoints += course.grade * course.units;
		totalUnits += course.units;
	}

	if (totalUnits === 0) {
		return { qpi: 0, totalUnits: 0, totalQualityPoints: 0 };
	}

	const qpi = totalQualityPoints / totalUnits;

	return {
		qpi: Math.round(qpi * 1000) / 1000,
		totalUnits,
		totalQualityPoints: Math.round(totalQualityPoints * 100) / 100,
	};
}
