import { describe, expect, it } from "vitest";
import { calculateBillSplitter } from "../src/core/calculators/billSplitter";

describe("Bill Splitter Logic", () => {
	it("should calculate correctly", () => {
		const res = calculateBillSplitter(100);
		expect(res.result).toBe(200);
	});
});
