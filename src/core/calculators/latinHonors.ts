export type SchoolSystem = "up" | "pup" | "ust" | "ateneo" | "dlsu";

/**
 * GWA cutoffs for Latin Honors per school.
 * UP/PUP: 1.0 is highest, 5.0 is lowest.
 * Ateneo (QPI) / DLSU (CGPA): 4.0 is highest, 0.0 is lowest.
 * UST: Uses weighted average, 1.0 is highest.
 *
 * For "lower is better" systems (UP, PUP, UST), Summa ≤ X means the cutoff is a ceiling.
 * For "higher is better" systems (Ateneo, DLSU), Summa ≥ X means the cutoff is a floor.
 */
export const SCHOOL_CONFIGS: Record<
	SchoolSystem,
	{
		name: string;
		scale: string;
		lowerIsBetter: boolean;
		honors: { label: string; cutoff: number }[];
	}
> = {
	up: {
		name: "University of the Philippines (UP)",
		scale: "1.0 – 5.0 (1.0 = Highest)",
		lowerIsBetter: true,
		honors: [
			{ label: "Summa Cum Laude", cutoff: 1.2 },
			{ label: "Magna Cum Laude", cutoff: 1.45 },
			{ label: "Cum Laude", cutoff: 1.75 },
		],
	},
	pup: {
		name: "Polytechnic University of the Philippines (PUP)",
		scale: "1.0 – 5.0 (1.0 = Highest)",
		lowerIsBetter: true,
		honors: [
			{ label: "Summa Cum Laude", cutoff: 1.2 },
			{ label: "Magna Cum Laude", cutoff: 1.45 },
			{ label: "Cum Laude", cutoff: 1.75 },
		],
	},
	ust: {
		name: "University of Santo Tomas (UST)",
		scale: "1.0 – 5.0 (1.0 = Highest)",
		lowerIsBetter: true,
		honors: [
			{ label: "Summa Cum Laude", cutoff: 1.15 },
			{ label: "Magna Cum Laude", cutoff: 1.35 },
			{ label: "Cum Laude", cutoff: 1.6 },
		],
	},
	ateneo: {
		name: "Ateneo de Manila University",
		scale: "0.0 – 4.0 QPI (4.0 = Highest)",
		lowerIsBetter: false,
		honors: [
			{ label: "Summa Cum Laude", cutoff: 3.85 },
			{ label: "Magna Cum Laude", cutoff: 3.5 },
			{ label: "Cum Laude", cutoff: 3.2 },
		],
	},
	dlsu: {
		name: "De La Salle University (DLSU)",
		scale: "0.0 – 4.0 CGPA (4.0 = Highest)",
		lowerIsBetter: false,
		honors: [
			{ label: "Summa Cum Laude", cutoff: 3.8 },
			{ label: "Magna Cum Laude", cutoff: 3.5 },
			{ label: "Cum Laude", cutoff: 3.2 },
		],
	},
};

export function calculateLatinHonors(school: SchoolSystem, gwa: number) {
	const config = SCHOOL_CONFIGS[school];
	if (!config) {
		return { honor: "No Honor", nextHonor: null, gap: 0 };
	}

	let honor = "No Honor";
	let nextHonor: string | null = null;
	let gap = 0;

	// Honors are ordered Summa > Magna > Cum Laude
	for (let i = 0; i < config.honors.length; i++) {
		const h = config.honors[i];
		const qualifies = config.lowerIsBetter ? gwa <= h.cutoff : gwa >= h.cutoff;

		if (qualifies) {
			honor = h.label;
			break;
		}
		// Track how far from this honor
		nextHonor = h.label;
		gap = Math.abs(gwa - h.cutoff);
	}

	// If no honor at all, gap to Cum Laude (last in list)
	if (honor === "No Honor") {
		const cumLaude = config.honors[config.honors.length - 1];
		nextHonor = cumLaude.label;
		gap = Math.abs(gwa - cumLaude.cutoff);
	}

	return {
		honor,
		nextHonor: honor === "Summa Cum Laude" ? null : nextHonor,
		gap: Math.round(gap * 1000) / 1000,
	};
}
