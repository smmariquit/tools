export type DOSTSchoolType = "suc" | "private_with_tuition" | "private_no_tuition";

/**
 * DOST-SEI Merit Scholarship (RA 7687) Benefits as of 2024-2026.
 * Updated per DOST-SEI Memorandum. Amounts may be subject to annual adjustments.
 *
 * Source: DOST-SEI official guidelines
 */
const ANNUAL_STIPEND = {
	livingAllowance: 7000, // per month
	bookAllowance: 10000, // per semester (2 semesters per year)
	tuitionCeiling: 40000, // per semester for private HEIs
	thesisGrant: 10000, // one-time, final year only
	graduationClothing: 2000, // one-time, final year only
	msAllowance: 7000, // per month for MS
};

export function calculateDOSTStipend(
	schoolType: DOSTSchoolType,
	yearLevel: number,
	semestersPerYear: number,
	actualTuition: number
) {
	const monthsPerYear = 10; // DOST pays for 10 months (2 semesters)

	const livingAllowanceAnnual = ANNUAL_STIPEND.livingAllowance * monthsPerYear;
	const bookAllowanceAnnual = ANNUAL_STIPEND.bookAllowance * semestersPerYear;

	let tuitionSubsidyAnnual = 0;
	if (schoolType === "suc") {
		// SUCs are free tuition under RA 10931. DOST does not pay tuition for SUC students.
		tuitionSubsidyAnnual = 0;
	} else if (schoolType === "private_with_tuition") {
		// Private HEIs: DOST pays up to the ceiling per semester
		const perSemester = Math.min(actualTuition, ANNUAL_STIPEND.tuitionCeiling);
		tuitionSubsidyAnnual = perSemester * semestersPerYear;
	}
	// private_no_tuition: student in a private school but with a separate tuition scholarship

	const isFinalYear = yearLevel >= 4;
	const thesisGrant = isFinalYear ? ANNUAL_STIPEND.thesisGrant : 0;
	const graduationClothing = isFinalYear ? ANNUAL_STIPEND.graduationClothing : 0;

	const totalAnnual =
		livingAllowanceAnnual +
		bookAllowanceAnnual +
		tuitionSubsidyAnnual +
		thesisGrant +
		graduationClothing;

	return {
		livingAllowanceMonthly: ANNUAL_STIPEND.livingAllowance,
		livingAllowanceAnnual,
		bookAllowancePerSem: ANNUAL_STIPEND.bookAllowance,
		bookAllowanceAnnual,
		tuitionSubsidyPerSem: tuitionSubsidyAnnual / (semestersPerYear || 1),
		tuitionSubsidyAnnual,
		thesisGrant,
		graduationClothing,
		totalAnnual,
	};
}
