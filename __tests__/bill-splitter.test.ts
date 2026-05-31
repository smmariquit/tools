import { describe, expect, it } from "vitest";
import { calculateBillSplit } from "../src/core/calculators/billSplitter";

describe("Bill Splitter Logic", () => {
	it("should calculate simple split correctly", () => {
		const res = calculateBillSplit(1000, 0, 4);
		expect(res.totalToPay).toBe(1000);
		expect(res.amountPerPerson).toBe(250);
	});

	it("should calculate split with tip correctly", () => {
		const res = calculateBillSplit(1000, 200, 4);
		expect(res.totalToPay).toBe(1200);
		expect(res.amountPerPerson).toBe(300);
		expect(res.totalTip).toBe(200);
	});
});
