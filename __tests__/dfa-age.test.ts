import { describe, expect, it } from "vitest";
import { calculateDFAAge } from "../src/core/calculators/dFAAge";

describe("DFA Age Logic", () => {
	it("should calculate correctly", () => {
		const res = calculateDFAAge(100);
		expect(res.result).toBe(200);
	});
});
