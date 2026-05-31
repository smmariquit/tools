import { describe, expect, it } from "vitest";
import { calculateBIRWithholdingTax } from "../src/core/calculators/bIRWithholdingTax";

describe("BIR Withholding Tax Logic", () => {
	it("should calculate Non-VAT 5% correctly", () => {
		const res = calculateBIRWithholdingTax(10000, 5, false);
		expect(res.taxBase).toBe(10000);
		expect(res.vatAmount).toBe(0);
		expect(res.withholdingTax).toBe(500);
		expect(res.netAmount).toBe(9500);
	});

	it("should calculate VAT Inclusive 5% correctly", () => {
		const res = calculateBIRWithholdingTax(11200, 5, true);
		expect(res.taxBase).toBeCloseTo(10000, 2); // 11200 / 1.12
		expect(res.vatAmount).toBeCloseTo(1200, 2);
		expect(res.withholdingTax).toBeCloseTo(500, 2); // 5% of 10k
		expect(res.netAmount).toBeCloseTo(10700, 2); // 11200 - 500
	});
});
