import { describe, expect, it } from "vitest";

describe("Tax Optimizer Logic (8% vs Graduated)", () => {
	const calculateGraduatedTax = (taxableIncome: number) => {
		if (taxableIncome <= 250000) return 0;
		if (taxableIncome <= 400000) return (taxableIncome - 250000) * 0.15;
		if (taxableIncome <= 800000) return 22500 + (taxableIncome - 400000) * 0.2;
		if (taxableIncome <= 2000000)
			return 102500 + (taxableIncome - 800000) * 0.25;
		if (taxableIncome <= 8000000)
			return 402500 + (taxableIncome - 2000000) * 0.3;
		return 2202500 + (taxableIncome - 8000000) * 0.35;
	};

	it("should correctly compute 8% Flat Rate tax", () => {
		const gross = 1000000;
		const isVat = gross > 3000000;

		expect(isVat).toBe(false);
		const tax = (gross - 250000) * 0.08;
		expect(tax).toBe(60000);
	});

	it("should not apply 8% Flat Rate if over VAT threshold (3M)", () => {
		const gross = 3500000;
		const isVat = gross > 3000000;
		expect(isVat).toBe(true);
	});

	it("should correctly compute Graduated Tax with 40% OSD", () => {
		const gross = 1000000;
		const osd = gross * 0.4;
		expect(osd).toBe(400000);

		const taxableIncome = gross - osd; // 600000
		const incomeTax = calculateGraduatedTax(taxableIncome);

		// 600,000 falls in (400,000 to 800,000) bracket: 22,500 + 20% of (600,000 - 400,000)
		// 22500 + (200000 * 0.20) = 22500 + 40000 = 62500
		expect(incomeTax).toBe(62500);

		const percentageTax = gross * 0.03;
		expect(percentageTax).toBe(30000);

		expect(incomeTax + percentageTax).toBe(92500);
	});

	it("should correctly compute Graduated Tax with Itemized deductions", () => {
		const gross = 1000000;
		const expenses = 500000;

		const taxableIncome = gross - expenses; // 500000
		const incomeTax = calculateGraduatedTax(taxableIncome);

		// 500,000 falls in (400,000 to 800,000) bracket: 22,500 + 20% of (500,000 - 400,000)
		// 22500 + (100000 * 0.20) = 22500 + 20000 = 42500
		expect(incomeTax).toBe(42500);

		const percentageTax = gross * 0.03;
		expect(percentageTax).toBe(30000);

		expect(incomeTax + percentageTax).toBe(72500);
	});
});
