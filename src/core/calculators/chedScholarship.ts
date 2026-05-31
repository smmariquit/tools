export type CHEDScholarshipType = "tdp" | "merit_half" | "merit_full";
export type CHEDSchoolType = "suc" | "private";

export function calculateCHEDStipend(
	scholarshipType: CHEDScholarshipType,
	schoolType: CHEDSchoolType,
) {
	if (scholarshipType === "tdp") {
		return {
			stipendAnnual: 15000,
			stipendPerSem: 7500,
			tuitionSubsidyAnnual: 0,
			tuitionSubsidyPerSem: 0,
			bookAllowanceAnnual: 0,
			totalAnnual: 15000,
		};
	}

	if (scholarshipType === "merit_half") {
		const tuitionSubsidyAnnual = schoolType === "private" ? 20000 : 0;
		return {
			stipendAnnual: 35000,
			stipendPerSem: 17500,
			tuitionSubsidyAnnual,
			tuitionSubsidyPerSem: tuitionSubsidyAnnual / 2,
			bookAllowanceAnnual: 5000,
			totalAnnual: 35000 + 5000 + tuitionSubsidyAnnual,
		};
	}

	if (scholarshipType === "merit_full") {
		const tuitionSubsidyAnnual = schoolType === "private" ? 40000 : 0;
		return {
			stipendAnnual: 70000,
			stipendPerSem: 35000,
			tuitionSubsidyAnnual,
			tuitionSubsidyPerSem: tuitionSubsidyAnnual / 2,
			bookAllowanceAnnual: 10000,
			totalAnnual: 70000 + 10000 + tuitionSubsidyAnnual,
		};
	}

	return {
		stipendAnnual: 0,
		stipendPerSem: 0,
		tuitionSubsidyAnnual: 0,
		tuitionSubsidyPerSem: 0,
		bookAllowanceAnnual: 0,
		totalAnnual: 0,
	};
}
