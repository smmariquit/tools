import { describe, expect, it } from "vitest";
import { calculateDOSTStipend } from "../src/core/calculators/dOSTScholarshipStipend";

describe("DOST Scholarship Stipend Logic", () => {
	it("should calculate SUC student stipend (no tuition)", () => {
		const res = calculateDOSTStipend("suc", 1, 2, 0);
		expect(res.livingAllowanceMonthly).toBe(7000);
		expect(res.livingAllowanceAnnual).toBe(70000); // 7k * 10 months
		expect(res.bookAllowanceAnnual).toBe(20000); // 10k * 2 sems
		expect(res.tuitionSubsidyAnnual).toBe(0);
		expect(res.thesisGrant).toBe(0); // not final year
		expect(res.totalAnnual).toBe(90000);
	});

	it("should calculate private HEI with tuition subsidy", () => {
		const res = calculateDOSTStipend("private_with_tuition", 2, 2, 50000);
		expect(res.tuitionSubsidyPerSem).toBe(40000); // capped at 40k
		expect(res.tuitionSubsidyAnnual).toBe(80000); // 40k * 2
		expect(res.totalAnnual).toBe(170000); // 70k + 20k + 80k
	});

	it("should include thesis and graduation for year 4+", () => {
		const res = calculateDOSTStipend("suc", 4, 2, 0);
		expect(res.thesisGrant).toBe(10000);
		expect(res.graduationClothing).toBe(2000);
		expect(res.totalAnnual).toBe(102000); // 70k + 20k + 10k + 2k
	});
});
