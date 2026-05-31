export type BoardExamType = "nle" | "ce" | "medtech" | "cpa";

export const BOARD_EXAM_CONFIGS: Record<
	BoardExamType,
	{ name: string; subjects: { id: string; name: string; weight: number }[] }
> = {
	nle: {
		name: "Nursing (NLE)",
		subjects: [
			{ id: "np1", name: "Nursing Practice I (Community)", weight: 0.2 },
			{
				id: "np2",
				name: "Nursing Practice II (Maternal & Child)",
				weight: 0.2,
			},
			{
				id: "np3",
				name: "Nursing Practice III (Medical-Surgical 1)",
				weight: 0.2,
			},
			{
				id: "np4",
				name: "Nursing Practice IV (Medical-Surgical 2)",
				weight: 0.2,
			},
			{ id: "np5", name: "Nursing Practice V (Psychiatric)", weight: 0.2 },
		],
	},
	ce: {
		name: "Civil Engineering (CE)",
		subjects: [
			{
				id: "math",
				name: "Mathematics, Surveying & Transportation",
				weight: 0.35,
			},
			{ id: "hydro", name: "Hydraulics & Geotechnical", weight: 0.3 },
			{
				id: "design",
				name: "Structural Engineering & Construction",
				weight: 0.35,
			},
		],
	},
	medtech: {
		name: "Medical Technology (MTLE)",
		subjects: [
			{ id: "cc", name: "Clinical Chemistry", weight: 0.2 },
			{ id: "micro", name: "Microbiology & Parasitology", weight: 0.2 },
			{ id: "hema", name: "Hematology", weight: 0.2 },
			{ id: "bb", name: "Blood Banking & Serology", weight: 0.2 },
			{ id: "cm", name: "Clinical Microscopy", weight: 0.1 },
			{ id: "histo", name: "Histopath & MT Laws", weight: 0.1 },
		],
	},
	cpa: {
		name: "Certified Public Accountant (CPALE)",
		subjects: [
			{ id: "far", name: "FAR", weight: 0.16666 },
			{ id: "afar", name: "AFAR", weight: 0.16666 },
			{ id: "ms", name: "MAS", weight: 0.16666 },
			{ id: "aud", name: "Auditing", weight: 0.16666 },
			{ id: "tax", name: "Taxation", weight: 0.16666 },
			{ id: "rfbt", name: "RFBT", weight: 0.1667 }, // Adjusting to total 100%
		],
	},
};

export function calculatePRCRating(
	examType: BoardExamType,
	scores: Record<string, number>,
) {
	const config = BOARD_EXAM_CONFIGS[examType];
	if (!config) {
		return {
			generalAverage: 0,
			passed: false,
			remarks: "Invalid Exam",
			failingSubjects: [] as string[],
		};
	}

	let totalRating = 0;
	let hasFailingSubject = false;
	const failingSubjects: string[] = [];

	for (const subject of config.subjects) {
		const score = scores[subject.id] || 0;
		totalRating += score * subject.weight;

		// General PRC rule: No subject below 50%
		// CPA specifically has a 65% rule, but we'll stick to a general 50% for standard PRC rules here.
		const minimumGrade = examType === "cpa" ? 65 : 50;
		if (score < minimumGrade) {
			hasFailingSubject = true;
			failingSubjects.push(subject.name);
		}
	}

	// CPA uses 75% overall with no grade below 65%.
	// Nursing uses 75% overall with no grade below 50%.
	const passed = totalRating >= 75 && !hasFailingSubject;

	let remarks = passed ? "PASSED" : "FAILED";
	if (totalRating >= 75 && hasFailingSubject) {
		remarks = "CONDITIONED (Failed due to a subject below minimum grade)";
	}

	return {
		generalAverage: Math.round(totalRating * 100) / 100,
		passed,
		remarks,
		failingSubjects,
	};
}
