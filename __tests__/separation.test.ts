import { describe, expect, it } from "vitest";

describe("Separation Pay Logic", () => {
	const calculateSeparationPay = (
		monthlySalary: number,
		yearsOfService: number,
		reason: string,
	) => {
		const multiplier = [
			"redundancy",
			"labor-saving",
			"impossible-reinstatement",
		].includes(reason)
			? 1
			: 0.5;
		const calculatedPay = monthlySalary * yearsOfService * multiplier;
		return Math.max(monthlySalary, calculatedPay);
	};

	const calculateYearsOfService = (
		hireDateStr: string,
		separationDateStr: string,
	) => {
		const hireDate = new Date(hireDateStr);
		const separationDate = new Date(separationDateStr);
		let totalMonths =
			(separationDate.getFullYear() - hireDate.getFullYear()) * 12 +
			(separationDate.getMonth() - hireDate.getMonth());

		// Adjust for exact day
		if (separationDate.getDate() < hireDate.getDate()) {
			totalMonths--;
		}

		const years = Math.floor(totalMonths / 12);
		const remainingMonths = totalMonths % 12;

		return remainingMonths >= 6 ? years + 1 : years;
	};

	it("should calculate redundancy pay correctly", () => {
		expect(calculateSeparationPay(20000, 5, "redundancy")).toBe(100000);
	});

	it("should calculate retrenchment pay correctly", () => {
		expect(calculateSeparationPay(20000, 5, "retrenchment")).toBe(50000);
	});

	it("should apply minimum 1-month pay rule for retrenchment with 1 year service", () => {
		expect(calculateSeparationPay(20000, 1, "retrenchment")).toBe(20000);
	});

	it("should apply minimum 1-month pay rule for disease with 1 year service", () => {
		expect(calculateSeparationPay(20000, 1, "disease")).toBe(20000);
	});

	it("should round up 6 months fraction to 1 year", () => {
		expect(calculateYearsOfService("2020-01-01", "2022-07-02")).toBe(3); // 2 years 6 months 1 day
	});

	it("should not round up 5 months fraction", () => {
		expect(calculateYearsOfService("2020-01-01", "2022-06-01")).toBe(2); // 2 years 5 months
	});
});
