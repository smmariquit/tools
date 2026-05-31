import { describe, expect, it } from "vitest";

describe("SSS Maternity Logic", () => {
	const calculateMaternityBenefit = (msc: number, type: string) => {
		const cappedMsc = Math.min(msc, 30000);
		const totalMsc = cappedMsc * 6;
		const adsc = totalMsc / 180;

		let days = 105;
		if (type === "solo-parent") days = 120;
		if (type === "miscarriage") days = 60;

		return {
			cappedMsc,
			adsc,
			days,
			benefit: adsc * days,
		};
	};

	it("should calculate max benefit for normal delivery", () => {
		const result = calculateMaternityBenefit(50000, "normal");
		expect(result.cappedMsc).toBe(30000);
		expect(result.adsc).toBe(1000);
		expect(result.days).toBe(105);
		expect(result.benefit).toBe(105000);
	});

	it("should calculate max benefit for solo parent", () => {
		const result = calculateMaternityBenefit(50000, "solo-parent");
		expect(result.benefit).toBe(120000);
	});

	it("should calculate lower benefit for lower salary", () => {
		const result = calculateMaternityBenefit(20000, "normal");
		expect(result.cappedMsc).toBe(20000);
		// adsc = 20000 * 6 / 180 = 666.666
		expect(result.benefit).toBeCloseTo(69999.99, 1);
	});

	it("should calculate correctly for miscarriage", () => {
		const result = calculateMaternityBenefit(30000, "miscarriage");
		expect(result.benefit).toBe(60000);
	});
});
